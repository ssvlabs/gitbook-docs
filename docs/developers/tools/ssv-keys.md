---
sidebar_label: 'SSV Keys'
sidebar_position: 2
---

:::warning
Please note: SSV Keys SDK will soon be deprecated as it is becoming part of the SSV SDK.
:::

# SSV Keys SDK

The SSV Keys SDK enable users to split a validator key into a predefined threshold of shares via [Shamir-Secret-Sharing (SSS)](https://en.wikipedia.org/wiki/Shamir's\_Secret\_Sharing), and encrypts them with a set of operator keys.

In addition to the generation of shares, the tool also uses the validator key to sign the validator’s owner address and his registration nonce to ensure that only the legitimate owner of the validator can register it to the network.

The shares and the signature are constructed as **sharesData** which is used during [validator registration](../../smart-contracts/ssvnetwork) through the SSV smart contract in order to facilitate their distribution from stakers to operators.

:::info
Please note that **shares** can be shared publicly since only assigned operators are able to decrypt them.
:::

## Installation

The SSV Keys library is distributed as a Javascript package, and it can be directly installed with the `npm` command (or `yarn`, if you prefer) using the repository's URL:

```bash
npm i https://github.com/ssvlabs/ssv-keys.git
```

:::info
The library is not yet maintained in a stable manner on npmjs.com so for the time being, it is advised to use repository's URL, until this documentation page is updated to indicate otherwise.
:::

## Import library

The two main components of the `ssv-keys` library are the `SSVKeys` and `KeyShares` objects. Once the library has been intstalled, they can be imported like so:

```javascript
const { SSVKeys, KeyShares, KeySharesItem, SSVKeysException } = require('ssv-keys');
```

## Usage

Using the `ssv-keys` SDK can be simply summarized in 3 steps:

1. Reading the keystore file (validator set of keys), to extract public and private keys
2. Build the keyshares configuration, given the chosen operators to which the validator will be distributed
3. Build the payload for the web3 transaction, and add it to the newly created keyshare file.

:::info
A requirement for splitting the keys of a validator, is to know the validator key owner's nonce (how many times this address has callded the registerValidator() function of the SSV contract) and their address.

These can be obtained via the [SSV SDK](../SSV-SDK/examples/api-calls/#get-nonce), or the [SSV Subgraph](./ssv-subgraph/subgraph-examples/#account-nonce).
:::

## Example

Here's an example highlighting the 4 steps described above:

```javascript
const { SSVKeys, KeyShares, KeySharesItem, SSVKeysException } = require('ssv-keys');
const path = require('path');
const fsp = require('fs').promises;

// These would probably come from your DApp
const operatorKeys = ["LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi..."];
const operatorIds = [12, 34, 56, 78];
// These can be either provided by the user (Staking-as-a-Service) or auto-generated (Staking Pool)
const keystore = require('./path-to-keystore.json');
const keystorePassword = 'XYZ';

// The nonce of the owner within the SSV contract (increments after each validator registration), obtained using the ssv-scanner tool
const TEST_OWNER_NONCE = 0;
// The cluster owner address
const TEST_OWNER_ADDRESS = '0x81592c3de184a3e2c0dcb5a261bc107bfa91f494';

const getKeySharesFilePath = () => {
  return `${path.join(process.cwd(), 'data')}${path.sep}keyshares.json`;
};

/**
 * This is more complex example demonstrating usage of SSVKeys SDK together with
 * KeyShares file which can be useful in a different flows for solo staker, staking provider or web developer.
 */
async function main() {
  // 1. Initialize SSVKeys SDK and read the keystore file
  const ssvKeys = new SSVKeys();
  const { publicKey, privateKey } = await ssvKeys.extractKeys(keystore, keystorePassword);

  const operators = operatorKeys.map((operatorKey, index) => ({
    id: operatorIds[index],
    operatorKey,
  }));
  
  // 2. Build shares from operator IDs and public keys
  const encryptedShares = await ssvKeys.buildShares(privateKey, operators);
  
  const keySharesItem = new KeySharesItem();
  await fsp.writeFile(getKeySharesFilePath(1), keySharesItem.toJson(), { encoding: 'utf-8' });
  await keySharesItem.update({ operators });
  await fsp.writeFile(getKeySharesFilePath(2), keySharesItem.toJson(), { encoding: 'utf-8' });
  await keySharesItem.update({ ownerAddress: TEST_OWNER_ADDRESS, ownerNonce: TEST_OWNER_NONCE, publicKey });
  await fsp.writeFile(getKeySharesFilePath(3), keySharesItem.toJson(), { encoding: 'utf-8' });

  // 3. Build final web3 transaction payload and update keyshares file with payload data
  await keySharesItem.buildPayload({
    publicKey,
    operators,
    encryptedShares,
  }, {
    ownerAddress: TEST_OWNER_ADDRESS,
    ownerNonce: TEST_OWNER_NONCE,
    privateKey
  });

  const keyShares = new KeyShares();
  keyShares.add(keySharesItem);

  // Most times, you'd want to save the result in a file
  await fsp.writeFile(getKeySharesFilePath(4), keyShares.toJson(), { encoding: 'utf-8' });
}

void main();
```

Here's an example of the printed output:

:::info
It is important to notice that this format is a breaking change with respect to previous versions of `ssv-keys` as it contains an array (`"shares"`) of shares data, where each single item represents one validator key, its related keyshares, and the payload necessary for the on-chain transaction.

This is true also in the case of a single validator key, where the array will only contain one item. It was done so, to maintain consistency across various use cases.
:::

```json
{
  "version": "v1.0.10",
  "createdAt": "2024-01-30T16:39:04.028Z",
  "shares": [
    {
      "data": {
        "ownerNonce": 22,
        "ownerAddress": "0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5c",
        "publicKey": "0xa6f245cab776aa282e268fc1e8c2896f149985bb1851846a37c7d0d001374905551c2871d4504fe88b5b0adc68db6a8f",
        "operators": [
          {
            "id": 1,
            "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBMVg2MUFXY001QUNLaGN5MTlUaEIKby9HMWlhN1ByOVUralJ5aWY5ZjAyRG9sd091V2ZLLzdSVUlhOEhEbHBvQlVERDkwRTVQUGdJSy9sTXB4RytXbwpwQ2N5bTBpWk9UT0JzNDE5bEh3TzA4bXFja1JsZEg5WExmbmY2UThqWFR5Ym1yYzdWNmwyNVprcTl4U0owbHR1CndmTnVTSzNCZnFtNkQxOUY0aTVCbmVaSWhjRVJTYlFLWDFxbWNqYnZFL2cyQko4TzhaZUgrd0RzTHJiNnZXQVIKY3BYWG1uelE3Vlp6ZklHTGVLVU1CTTh6SW0rcXI4RGZ4SEhSeVU1QTE3cFU4cy9MNUp5RXE1RGJjc2Q2dHlnbQp5UE9BYUNzWldVREI3UGhLOHpUWU9WYi9MM1lnSTU4bjFXek5IM0s5cmFreUppTmUxTE9GVVZzQTFDUnhtQ2YzCmlRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
          },
          {
            "id": 2,
            "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
          },
          {
            "id": 3,
            "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBNWVUNUwwV0h6ZTdyTWZPb2xtVHMKdWtIQ2E4K3dtbUw2OTFJQ1RpREE1UkJ1TkxqSVQ2WkE0YzMxcVRIY3FBVHl5eVkwLzk3R3lKZ2doYnlFR2RoZQovalh6aWVTOXJ2RytJVGF1QjhMVlhkekxGYVQxWEZWeFlnN2x2TlB4OURPL1ZoRkhkWWxnT3I2d0RtV3FjRGo3ClhWUWFOWEFtRng3NjVQNTlXNXZzVGRXVWFHRWxXSm93SkZKdnc2UlRISkZ1TVhjSzZVaWJ0cUZMSmJwOW5kdUgKQjlLSzNWcmYrZmtJOWRBZ2txRDFHOElxQ0tKMVl3bjUyeGxxbTRCNitOOGZUZE1MS1JucWpFZmRzV1dwMFVzMQpLTW9vSXcyc3BoaXAzUFpNYnJaaU0wNjJ2ZUo0U3ovYjBObWdPTnhTd0JJTnNxcG54QjhFUVQxSTNjNklqNXhhCm5RSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
          },
          {
            "id": 4,
            "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdXZleUpUMURwM21mQ3FRTUora2YKZHdhV0d1bkRURUFaWmNTOHdtUTJBcjU1bE5venl5cHRwb1lGSTgxaW1RSmpwdVV0akR2am15RDRQSmt1SzFXRQovZG9TSzFraWlTSEYvZFBaeE5ZT2swMlRiTGIvTXBjMG12VE1nZmRsVDBoTlVOWDZIMnJzZzNlc2NEOStENEdDCmxtZGpCdmdxUDQydXdDbFlQUVhuN3Z6OWlOOEpXdEFtd1JkQ25USkZ6M2tYSEFPVGMyMjJGYXp4ZGJVNEVPYkIKVmJNejd2UXRmMWtNSGtacEh5UXNpL3F0WmhQaThtTlNQTWpMTDBtcmc4Ly9xVjIyeEVPNENmSHFKZkZOWEhKVwpEbU85M2h2QXE2dDFZOGN5UVZkSGZ2WEp5VzRxR29MY25HZzV1S2ZSYWVCSSt1aXFSeExOL2dtTnA2RzdpZVNkCkl3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
          }
        ]
      },
      "payload": {
        "publicKey": "0xa6f245cab776aa282e268fc1e8c2896f149985bb1851846a37c7d0d001374905551c2871d4504fe88b5b0adc68db6a8f",
        "operatorIds": [
          1,
          2,
          3,
          4
        ],
        "sharesData": "0xb944a6e76addfc72c583b0e316393f5079b1269396a72060d22f20a4400aaedbfaa1da6e0fdd5539d03e64cd68d28c430ec51ae54b8de26e6540dbee26b01eafb2697850d96f2399412c089bcb1f24a45aafb113c33ebfdbb32fcd9126851bee9386547c45be98927e9155d1fdb6f254118c332b1e7839b30c35dddb4c77c9433ca72a6a1ad09694a83ed5844b25d00c97005af7d8b2b8afb3c11e14f338e5e4f94112e85eda0c25f933371a830862103bd7a3e51d300e0937420499cea5727f873d3d52f91600535d41e34c01fae731151a6ddf67b5d1c3d2844a5a0a98bbebd76203270246bb043502dc0888bf7b3aa8e8c484df59ea72d8784b9d51e457c9c6547b02709b9dbb81bfeb04c5d2258973c34d013aa4c6aa24f4d6e8c2f6cf0a6224badb008cd0947787a5c2bdd139dcf47776724a63ca7be02e0d2dd0c9ade1ebeb3e8760ecb3afb054880438c66f201b85d3902d1c2fc02e3a455aae29d84cc219985716a312723b1cebfa6b358050af6061d19f94e4f33fbf269bd1a2920e3aed0c52886eb3c3dd8571116d5eddc2361e3f99e52eb8a3314027c8831e39064c41fb2aa470485242626daefc4746286d514092bcc0662418cb3914727e2d47b51884bde882523b0018c0d32f621dcf5659912bdda154f7f73d346538a40350b9e83e010043ac2c60f9c6a6adfc2e0c38cb74e0cd9b074d3633ab55f79e8e2291267101c4a1f3cfccae66138aa4798460dc8e25b792baed869d857b95fb741542c26d5a6b3cd803746b5e9169cd3ec75ab591c5da34251f09d429489371946922b3d3a8123f4c161204ab127d78d53cb939fc2542c0b22d530989f7daba7304e3aa65ffcd547df38091b0d63314476995eb4cdc351db4ac2aff9b75199f45e2827a1fad43a0db73e2a5abf2b147c01e063449e6b17d3c0bc9e704b5ad5ddb66f8c0ac56785c0cf9494e28bed1abe3ccd07af4adbf62ac8473437449a133f618945607f1afbfc4eed50974e47106c89001aa66a51a4cca0cacac3bd789e9304cd65204d2e8d5ff4b75fd606fbfb2aac37244f2f76fd8296220731c6ca743285492559ed45630578d6d07ae584b1a066e46ed4b42b1a83dd6fc6c697ccb545d8726665f19343b8b3a220711e8a2ebd7e2eb8c48ab5d8a1f20ea2296864738e9504506ada904f5c4cb4f92acb9ae0296e3a5391570e277d994662099699f0c34db7cee740f5b552b47e27121db36bf2d3362f4df49d41285522285aab5704623a1165f71c9a5bfc6f4d0275c174784d6c557301749bc06388b29c0e705e585eab5f30d0d28c9da0d8f1ad1ee0ddf27c11c86f5292c9fe417a52802aba8a36bd54f017452d65ca0046b53aa50f7406b462d90b74b37381dd349a0296d96615fd29c63e107637da48233de3437b0927137855ecb4a99e882de4482f8dea233c3dd5382a877dcfb14be890c785fa1161e273910215c4c8c16ea907367418995bd141d23ab2949fffe2bfaed2b1bb056b14532ac83ba6a095f6aa915c430b7321177eac75459e6d0e1cbf34b337fbf8b2ca29033d248837769d984dcba9497a8477f0fc886695f0ec76d0f2350db9aa8751a7db2b0e86bd02ff2aaf5d5d39a9e1c0a3963694db4b6a711a5a006bb3ece185eca921234f2e0a0bf9745fa3e67fdcce8ca6e04489397897405802be15a6c76d76e3648b298220b46e1aaef610f9818dc0f5911a8b21741d9e2c95d451449c87218b4392654ff8a300c699222b1ec31ba1b44ae1a07157f13dffc0a6f875786ac1df8e2ff6ad2c0a25002bf5ae3ceb52229e2fa9bba95c06d7a88ae35f0bd8963d9bd543fb37da6dd18c6d9bc27d0837c09"
      }
    }
  ]
}
```

## Conclusions

Thanks to the `ssv-keys`, it's possible to programmatically split a set of validator keys into key-shares, which can be then given to the operators assigned to run the distributed validator.

This is the foundation for building complex products like Staking Services or Staking Pools on top of SSV.
