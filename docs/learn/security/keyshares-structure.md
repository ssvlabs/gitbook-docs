---
sidebar_label: 'Keyshares file structure'
sidebar_position: 4
---

# Keyshares file structure

Using [Distributed Key Generation](/learn/tech-overview#distributed-key-generation), the SSV protocol encrypts and splits a validator key into multiple “KeyShares”. The KeyShares are then distributed to multiple non-trusting nodes, run by operators.

Since each element is encrypted, no one can temper with the file. For example, if anyone would change `ownerAddress` or `ownerNonce` and try to submit such file to the ssv network - the KeyShares would be deemed as invalid and ignored by network participants. That is because the signature and the contents of the file are not matching.

Find more details about each element of keyshares structure below.

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

### Details about `sharesData` field
Below is an example of `sharesData` from a Hoodi validator with 4 operators. Each segment is highlighted with color:

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/sharesData.png" alt="" />
</div>

### Explanation of each segment:
- <span style={{ color: 'black', backgroundColor: '#d4d4d4', fontWeight: 'bold' }}>Signature</span>  - First 192 characters (excluding `0x`) is a serialized BLS signed message ([read more about SSZ here](https://ethereum.org/en/developers/docs/data-structures-and-encoding/ssz/)). The message itself is `ownerAddress:ownerNonce`, it's signed by the validator private key and consequently can be verified using validator's `publicKey`.
- <span style={{ color: 'black', backgroundColor: '#bad6a7', fontWeight: 'bold' }}>Share</span><span style={{ color: 'black', backgroundColor: '#fbe6a2', fontWeight: 'bold' }}>s' pu</span><span style={{ color: 'black', backgroundColor: '#de9d9b', fontWeight: 'bold' }}>blic </span><span style={{ color: 'black', backgroundColor: '#aac1f0', fontWeight: 'bold' }}>keys</span> - An array of concatenated BLS public keys. Each element is a public share of a validator's key and is 96 characters long. The number of shares depends on the number of chosen operators.
- <span style={{ color: 'black', backgroundColor: '#dce9d5', fontWeight: 'bold' }}>Encr</span><span style={{ color: 'black', backgroundColor: '#fcf5d9', fontWeight: 'bold' }}>ypte</span><span style={{ color: 'black', backgroundColor: '#edcece', fontWeight: 'bold' }}>d sh</span><span style={{ color: 'black', backgroundColor: '#d5e0f5', fontWeight: 'bold' }}>ares</span> - An array of concatenated BLS encrypted keys. Each element is a private share of a validator's key and is 512 characters long. The number of shares depends on the number of chosen operators. Shares are encrypted with each operator's public key and can only be decrypted with the respective private key.

**If you want to learn more about keyshare verification**, you can dissect [verify-keyshare repository  on GitHub](https://github.com/RaekwonIII/verify-keyshares):
- `validateSingleShares` function in `ssv-keys.ts`  does the signature verification.
- `buildSharesFromBytes` function breaks down each operators' keyshare.
- `areKeysharesValid` function then checks the signature and operators' keyshares agains the validator public key.