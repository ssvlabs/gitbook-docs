---
sidebar_label: 'Ceremony Output Summary'
sidebar_position: 3
---

# Ceremony Output Summary

After launching the `ssv-dkg` tool as shown above, it will commence a DKG ceremony with the selected operators.
Following the successful completion of the DKG ceremony, several files have been generated and placed in the directory where the command was launched from:
```
ceremony-[timestamp]
├── 0..[nonce]-0x...[validator public key]
    ├── deposit_data.json
    ├── keyshares.json
    └── proof.json
├── 0..[nonce]-0x...[validator public key] ...
    ├── deposit_data.json
    ├── keyshares.json
    └── proof.json
.....
├── deposit_data.json # aggregated
├── keyshares.json # aggregated
└── proofs.json  # aggregated
```
### Files:
* `deposit_data.json` - this file contains the deposit data necessary to perform the transaction on the Deposit contract and activate the validator on the Beacon layer
* [`keyshares.json`](#keyshares) - this file contains the keyshares necessary to register the validator on the ssv.network
* [`proof.json`](#proofs) - contains the signed proofs that a DKG client participated in a DKG ceremony, generating key shares for a certain owner. This file is crucial for [resharing your validator to a different set of operators](change-operator-set-and-reshare-validator-key-shares.md), or to [regenerate the signature portion of key shares](update-owner-nonce-in-key-shares.md) in the future.

### Proofs
#### An example of `proofs.json` structure:
```json
[
  {
  "proof": {
    "validator": "VALIDATOR_PUBKEY",
    "encrypted_share": "ENCRYPTED_SHARE_FOR_I-TH_OPERATOR_IN_CEREMONY",
    "share_pub": "PUB_KEY_OF_OPERATOR_THAT_ENCRYPTED_THE_SHARE",
    "owner": "OWNER_ADDRESS_USED_IN_CEREMONY"
  },
  "signature": "CONTENT_OF_PROOF_SIGNED_BY_OPERATOR_PRIVATE_KEY"
  },
  {
  "proof": {...},
  "signature": "..."
  },
...
]
```
#### Details about the structure:
- Each validator will have X proofs, where X is the number of operators in the cluster
- X proofs of a validator are in an array `[]`
- One file can contain proofs for multiple validators, by having nested arrays `[[],[],[]]`
- Each proof has 4 parameters:
  - `validator` - validator's public key, not encrypted
  - `encrypted_share`- validator share for i-th operator, encrypted by operator's private key
  - `share_pub` - Public key of i-th operator, not encrypted
  - `owner` - Address of validator owner, not encrypted
- Last parameter `signature` is the content of `proof` signed by private key of i-th operator.

#### How `proofs` secure the ceremony for both parties:
- Owner/initiator can't change their owner address, because the address is part of proof's content and this is signed by operator's private key.
- Operator signs the proof with their private key and the proof itself has their public key which can be used to verify the signature.

### Keyshares
#### An example of `keyshares.json` structure:
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

#### Details about `sharesData` field
Below is an example of `sharesData` from a Hoodi validator broken down:

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/sharesData.png" alt="" />
</div>

#### Explanation of each segment:
- <span style={{ color: 'black', backgroundColor: '#d4d4d4', fontWeight: 'bold' }}>Signature</span>  - First 192 characters (excluding `0x`) is a serialized BLS signed message ([read more about SSZ here](https://ethereum.org/en/developers/docs/data-structures-and-encoding/ssz/)). The message itself is `ownerAddress:ownerNonce`, it's signed by the validator private key and consequently can be verified using validator's `publicKey`.
- <span style={{ color: 'black', backgroundColor: '#bad6a7', fontWeight: 'bold' }}>Share</span><span style={{ color: 'black', backgroundColor: '#fbe6a2', fontWeight: 'bold' }}>s' pu</span><span style={{ color: 'black', backgroundColor: '#de9d9b', fontWeight: 'bold' }}>blic </span><span style={{ color: 'black', backgroundColor: '#aac1f0', fontWeight: 'bold' }}>keys</span> - An array of concatenated BLS public keys. Each element is a public share of a validator's key and is 96 characters long. The number of shares depends on the number of chosen operators.
- <span style={{ color: 'black', backgroundColor: '#dce9d5', fontWeight: 'bold' }}>Encr</span><span style={{ color: 'black', backgroundColor: '#fcf5d9', fontWeight: 'bold' }}>ypte</span><span style={{ color: 'black', backgroundColor: '#edcece', fontWeight: 'bold' }}>d sh</span><span style={{ color: 'black', backgroundColor: '#d5e0f5', fontWeight: 'bold' }}>ares</span> - An array of concatenated BLS encrypted keys. Each element is a private share of a validator's key and is 512 characters long. The number of shares depends on the number of chosen operators. Shares are encrypted with each operator's public key and can only be decrypted with the respective private key.

**If you want to learn more about keyshare verification**, you can dissect [verify-keyshare repository  on GitHub](https://github.com/RaekwonIII/verify-keyshares):
- `validateSingleShares` function in `ssv-keys.ts`  does the signature verification.
- `buildSharesFromBytes` function breaks down each operators' keyshare.
- `areKeysharesValid` function then checks the signature and operators' keyshares agains the validator public key.