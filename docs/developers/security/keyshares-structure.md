---
sidebar_label: 'Keyshares file structure'
sidebar_position: 4
---

# Keyshares file structure

Using [Distributed Key Generation](/learn/tech-overview#distributed-key-generation), the SSV protocol encrypts and splits a validator key into multiple key shares. The key shares are then distributed to multiple non-trusting nodes run by operators.

The file also includes signed data that helps detect tampering. For example, if someone changed `ownerAddress` or `ownerNonce` and tried to submit the modified file to SSV Network, the key shares would be considered invalid and ignored by network participants because the signature would no longer match the contents.

More details about each element of the keyshares structure are below.

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

### Details about the `sharesData` field
Below is an example of `sharesData` from a Hoodi validator with 4 operators. Each segment is highlighted with color:

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/sharesData.png" alt="" />
</div>

### Explanation of each segment
- <span style={{ color: 'black', backgroundColor: '#d4d4d4', fontWeight: 'bold' }}>Signature</span> - The first 192 characters, excluding `0x`, are a serialized BLS-signed message ([read more about SSZ](https://ethereum.org/en/developers/docs/data-structures-and-encoding/ssz/)). The message is `ownerAddress:ownerNonce`, signed by the validator private key, and can therefore be verified using the validator `publicKey`.
- <span style={{ color: 'black', backgroundColor: '#bad6a7', fontWeight: 'bold' }}>Share</span><span style={{ color: 'black', backgroundColor: '#fbe6a2', fontWeight: 'bold' }}>s' pu</span><span style={{ color: 'black', backgroundColor: '#de9d9b', fontWeight: 'bold' }}>blic </span><span style={{ color: 'black', backgroundColor: '#aac1f0', fontWeight: 'bold' }}>keys</span> - An array of concatenated BLS public keys. Each element is a public share of the validator key and is 96 characters long. The number of shares depends on the number of selected operators.
- <span style={{ color: 'black', backgroundColor: '#dce9d5', fontWeight: 'bold' }}>Encr</span><span style={{ color: 'black', backgroundColor: '#fcf5d9', fontWeight: 'bold' }}>ypte</span><span style={{ color: 'black', backgroundColor: '#edcece', fontWeight: 'bold' }}>d sh</span><span style={{ color: 'black', backgroundColor: '#d5e0f5', fontWeight: 'bold' }}>ares</span> - An array of concatenated encrypted shares. Each element is a private share of the validator key and is 512 characters long. The number of shares depends on the number of selected operators. Shares are encrypted with each operator’s public key and can only be decrypted with the corresponding private key.

**If you want to learn more about keyshare verification**, you can review the [verify-keyshare repository on GitHub](https://github.com/RaekwonIII/verify-keyshares):
- The `validateSingleShares` function in `ssv-keys.ts` performs signature verification.
- The `buildSharesFromBytes` function breaks down each operator’s key share.
- The `areKeysharesValid` function then checks the signature and operators’ key shares against the validator public key.
