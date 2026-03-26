---
description: Key Splitting
sidebar_position: 1
---

# Key Splitting

This page describes the security aspect of Key Splitting procedure. The focus is on the exploring functions presented in `ssv-keys` library of [the SSV-SDK](https://github.com/ssvlabs/ssv-sdk), that is used to split the validator keys.

## Flow Overview
  <!--- ![Key Splitting Flow](/img/flow_chart_keysplit.png) --->

The whole flow can be described in 4 steps:
1. Prepare `keystore-m` files and their respective password(s).
2. Split the keys into `keyshares-*.json` (the payload ready for registration).
3. Register the key shares to SSV Network via a Smart Contract interaction.
4. SSV Nodes fetch registration events and start performing duties for a new validator as a cluster.

### Security
A couple of important points to understand about the security of the key splitting procedure:
- [SSV-SDK](https://github.com/ssvlabs/ssv-sdk) defines the logic of key splitting procedure, described in detail in [Code Overview](#code-overview).
- Key splitting can (and **should**) be done on an offline machine, ensuring the data is not transmitted elsewhere.
- Private keys are loaded in RAM and decrypted, they are not logged or stored anywhere.
- Key shares, the product of key splitting, are then broadcast to the network during the validator registration process, through the event emitted by the smart contract.
- You can find the [structure of `keyshares.json` explained on this page](https://docs.ssv.network/developers/keyshares-structure/).
- Operator nodes fetch smart contract events and extract encrypted key shares from them. 
- Each share can only be decrypted only by the operator's private key. So although everything is broadcast in public, it is impossible to reconstruct the full key from events alone.
- Old keyshares remain valid. Take this into consideration when splitting a key more than once.   
*Example scenario:* a key split across 4 operators, then split again to 1 old and 3 new operators. If the 3 operators that were left out are malicious, technically they can conspire and reconstruct the key.

## Code Overview
Before diving into code details, here is a short description of processes that are happening during key splitting:

SSV-SDK reads an Ethereum validator keystore ([EIP-2335](https://eips.ethereum.org/EIPS/eip-2335)), decrypts it in RAM using the password. The validator private key is then split into shares using Shamir Secret Sharing, each share is then encrypted with the corresponding operator’s public key, and finally a JSON payload is built, all of this happening on the local machine. The payload (written to `keyshares-*.json`) is ready for on‑chain registration.

The [SSV-SDK](https://github.com/ssvlabs/ssv-sdk) is a TypeScript library to help developers build on the SSV network. [`ssv-keys`](https://github.com/ssvlabs/ssv-sdk/tree/main/src/libs/ssv-keys) is the library of SSV-SDK responsible for generating key shares. It relies for the most part on a well known and trusted library [`bls-eth-wasm`](https://www.npmjs.com/package/bls-eth-wasm). 

We’ll review 4 functions and 1 class that are the most important for this process. Their respective GitHub files are linked in their names. Below are the key points to learn:


### [`extractKeys`](https://github.com/ssvlabs/ssv-sdk/blob/498b2611739354ed8e92aff51da44e5b0b3d4146/src/libs/ssv-keys/SSVKeys.ts#L40)
- **Keystore decryption** (`extractKeys`) - The validator keystore is read from disk and decrypted in memory using the provided password, via the `EthereumKeyStore` class [defined here](https://github.com/ssvlabs/ssv-sdk/blob/498b2611739354ed8e92aff51da44e5b0b3d4146/src/libs/ssv-keys/EthereumKeyStore/EthereumKeyStore.ts#L54). 
- Both the keystore data and password only exist in RAM during execution. The validator’s private key is never written to disk or transmitted externally.
- BLS imported from [`bls-eth-wasm`](https://www.npmjs.com/package/bls-eth-wasm), it is used to deserialize the private key.

```typescript
import bls from 'bls-eth-wasm';

// ...

// Extract private key from keystore data using keystore password.
// Generally can be used in browsers when the keystore data has been provided by browser.
// @param data
// @param password
async extractKeys(data: string, password: string): Promise<ExtractedKeys> {
  const privateKey = await new EthereumKeyStore(data).getPrivateKey(password);
  if (!bls.deserializeHexStrToSecretKey) {
    await bls.init(bls.BLS12_381);
  }
  return {
    privateKey: `0x${privateKey}`,
    publicKey: `0x${bls.deserializeHexStrToSecretKey(privateKey).getPublicKey().serializeToHexStr()}`
  };
}
```
### [`buildShares`](https://github.com/ssvlabs/ssv-sdk/blob/498b2611739354ed8e92aff51da44e5b0b3d4146/src/libs/ssv-keys/SSVKeys.ts#L78)
- **Key splitting** (`buildShares`) - The decrypted private key is locally split into shares using Shamir Secret Sharing (SSS). Each share is then encrypted with the corresponding operator’s public key, ensuring that only that operator can recover its own share.
- `encryptShares` encrypts shares with the provided operators’ keys, described in detail below.
- `getThreshold` depends on the number of operators in the cluster, also described below.
```typescript
// Build shares from private key, operators list
// @param privateKey
// @param operators
async buildShares(privateKey: string, operators: IOperator[]): Promise<IEncryptShare[]> {
  const threshold = await this.createThreshold(privateKey, operators);
  return this.encryptShares(operators, threshold.shares);
}
```
### [`encryptShares`](https://github.com/ssvlabs/ssv-sdk/blob/498b2611739354ed8e92aff51da44e5b0b3d4146/src/libs/ssv-keys/SSVKeys.ts#L67)
- Is called within the `buildShares` function.
- Creates a list of operators, decodes their public keys to base64, then calls the `Encryption` function to encrypt shares.
- `Encryption` function loops through the list of operators and encrypts shares using each operator's public key. So that only a particular operator can decrypt a share.
- You can find the full `Encryption` function in [this separate github file](https://github.com/ssvlabs/ssv-sdk/blob/498b2611739354ed8e92aff51da44e5b0b3d4146/src/libs/ssv-keys/Encryption/Encryption.ts).
```typescript
async encryptShares(operators: IOperator[], shares: IShares[]): Promise<IEncryptShare[]> {
  const sortedOperators = operatorSortedList(operators);
  const decodedOperatorPublicKeys = sortedOperators.map(item => Buffer.from(item.operatorKey, 'base64').toString());
  return new Encryption(decodedOperatorPublicKeys, shares).encrypt();
}
```


### [`Threshold`](https://github.com/ssvlabs/ssv-sdk/blob/498b2611739354ed8e92aff51da44e5b0b3d4146/src/libs/ssv-keys/Threshold/Threshold.ts#L29)
- Is called within the  `buildShares` function.
- With this class, the actual shares are created with [Shamir Secret Sharing](/learn/tech-overview), according to the threshold defined by protocol fault tolerance, and put into an array.
```typescript
class Threshold {
  async create(privateKeyString: string, operatorIds: number[]): Promise<ISharesKeyPairs> {

    // ...

    // Evaluate shares - starting from 1 because 0 is master key
    for (const operatorId of operatorIds) {
      const id = new bls.Id();
      id.setInt(operatorId);
      const shareSecretKey = new bls.SecretKey();
      shareSecretKey.share(msk, id);

      const sharePublicKey = new bls.PublicKey();
      sharePublicKey.share(mpk, id);

      this.shares.push({
        privateKey: `0x${shareSecretKey.serializeToHexStr()}`,
        publicKey: `0x${sharePublicKey.serializeToHexStr()}`,
        id,
      });
    }

    const response: ISharesKeyPairs = {
      privateKey: `0x${this.privateKey.serializeToHexStr()}`,
      publicKey: `0x${this.publicKey.serializeToHexStr()}`,
      shares: this.shares,
    };

    return response;
  }
}
```


### `buildPayload`
Payload construction (buildPayload) - A KeySharesItem object is created containing the cluster metadata (owner address, owner nonce, operators, validator public key) along with the encrypted shares. This step builds the registration payload required by the SSV smart contract and outputs it to a keyshares-*.json file.
Detailed description of key shares structure can be found on our documentation page. 
```typescript
async buildPayload(
metaData: IKeySharesPayloadData,
toSignatureData: IKeySharesToSignatureData,
): Promise<any> {
  const { ownerAddress, ownerNonce, privateKey } = toSignatureData

  if (!Number.isInteger(ownerNonce) || ownerNonce < 0) {
    throw new OwnerNonceFormatError(ownerNonce, 'Owner nonce is not positive integer')
  }

  let address
  try {
    address = getAddress(ownerAddress)
  } catch {
    throw new OwnerAddressFormatError(
      ownerAddress,
      'Owner address is not a valid Ethereum address',
    )
  }

  const payload = this.payload.build({
    publicKey: metaData.publicKey,
    operatorIds: operatorSortedList(metaData.operators).map((operator) => operator.id),
    encryptedShares: metaData.encryptedShares,
  })

  // ...

  return payload
}
```


### SSV Keys CLI
SSV Keys CLI is a key splitting tool built in TypeScript, it only uses classes and methods defined in the SSV-SDK. The functions from the SSV-SDK used by SSV Keys CLI are exactly the ones explained above: extractKeys, buildShares , and buildPayload. 
```typescript
private async processFile(
  keystoreFilePath: string,
  password: string,
  operators: Operator[],
  ownerAddress: string,
  ownerNonce: number
): Promise<KeySharesItem> {
  const keystoreData = await readFile(keystoreFilePath);

  const ssvKeys = new SSVKeys();
  const { privateKey, publicKey } = await ssvKeys.extractKeys(
    keystoreData,
    password
  );
  const encryptedShares = await ssvKeys.buildShares(privateKey, operators);

  const keySharesItem = new KeySharesItem();
  await keySharesItem.update({
    ownerAddress,
    ownerNonce,
    operators,
    publicKey,
  });
  await keySharesItem.buildPayload(
    { publicKey, operators, encryptedShares },
    { ownerAddress, ownerNonce, privateKey }
  );

  return keySharesItem;
}
```

## Keyshares Structure
The detailed explanation of the payload or `keyshares.json` is pressented on [this separate page](/learn/security/keyshares-structure).

## Key Splitting Instructions
You can follow the step-by-step instructions in the [**Validator Onboarding section**](/stakers/validator-onboarding/).