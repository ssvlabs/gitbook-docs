---
sidebar_position: 4
---

# Generate and validate keyshares

This page shows how to generate keyshares from a set of keystore files.&#x20;

These keyshares will then be validated with a different function to ensure they will register correctly.&#x20;

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

