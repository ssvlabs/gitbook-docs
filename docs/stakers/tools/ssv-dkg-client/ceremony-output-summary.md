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
Keyshares file structure can be found [on this separate page](/developers/keyshares-structure.md).