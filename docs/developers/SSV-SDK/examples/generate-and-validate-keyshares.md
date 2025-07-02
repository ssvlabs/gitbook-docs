---
sidebar_position: 4
---

# Generate and validate keyshares


This part of the SDK enable users to programmatically generate validator keys and split them into threshold of shares via [Shamir-Secret-Sharing (SSS)](https://en.wikipedia.org/wiki/Shamir's\_Secret\_Sharing), encrypted with a set of operator keys.

The shares and the signature are constructed as **sharesData** which is used during [validator registration](/developers/smart-contracts/ssvnetwork) through the SSV smart contract in order to facilitate their distribution from stakers to operators.

In addition to the generation of shares, the SDK also takes the keyshares file and the operator IDs, and validates that the following registration will succeed. 

### Generate keyshares

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
let nonce = Number(await sdk.api.getOwnerNonce({ owner: ownerAddress}))

const keysharesPayload = await sdk.utils.generateKeyShares({
  keystore: keystoresObject, 
  keystore_password: 'your_password' ,
  operator_keys: ['LS0...','LS1...','LS2...','LS3...',],
  operator_ids: ['1', '2', '3', '4'],
  owner_address: ownerAddress as string,
  nonce: nonce,
})
```

### Validate keyshares

```typescript
const validatedShares = await sdk.utils.validateSharesPreRegistration({
    keyshares: keysharesJsonFile,
    operatorIds: ['101','102','103','105'],
});

console.log(validatedShares)
```

A valid keyshare can then be used to [register a validator.](register-validator.md)

