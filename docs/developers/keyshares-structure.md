---
sidebar_label: 'Keyshares file structure'
sidebar_position: 7
---

# Keyshares file structure


### An example of `keyshares.json` structure:
```json
{
  "version": "v1.1.0",
  "createdAt": "2025-05-14T10:23:43.794Z",
  "shares": [
    {
      "data": {
        "ownerNonce": 0,
        "ownerAddress": "OWNER_ADDRESS",
        "publicKey": "VALIDATOR_PUBKEY",
        "operators": [
          {
            "id": 1,
            "operatorKey": "OPERATOR_PUBKEY"
          },
          {...},
          {...},
          {...}
        ]
      },
      "payload": {
        "publicKey": "VALIDATOR_PUBKEY",
        "operatorIds": [1,2,3,4],
        "sharesData": "ENCRYPTED_SHARES_DATA"
      }
    }
  ]
}
```