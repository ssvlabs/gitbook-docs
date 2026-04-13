---
sidebar_label: 'Ceremony Output Summary'
sidebar_position: 3
---

# Ceremony Output Summary

After the `ssv-dkg` ceremony finishes successfully, the tool creates a `ceremony-[timestamp]` folder in the directory where you ran the command.

Example output:

```text
ceremony-[timestamp]/
├── 0..[nonce]-0x...[validator-public-key]/
│   ├── deposit_data.json
│   ├── keyshares.json
│   └── proof.json
├── 0..[nonce]-0x...[validator-public-key]/
│   ├── deposit_data.json
│   ├── keyshares.json
│   └── proof.json
├── deposit_data.json
├── keyshares.json
└── proofs.json
```

## What each file is for

- `deposit_data.json`: deposit data used to activate validators on Ethereum
- `keyshares.json`: key shares used to register validators on SSV Network
- `proof.json`: the per-validator proof file stored inside each validator subfolder
- `proofs.json`: the aggregated proof file for the whole ceremony, stored at the top level

## `proof.json` vs `proofs.json`

Both files are valid artifacts, but they are used differently:

- `proof.json` is the proof file for **one validator** inside that validator's own subfolder.
- `proofs.json` is the **aggregated ceremony-level file** that contains proofs for all validators generated in that ceremony.

When docs or tools refer to retaining `proofs.json`, they usually mean the top-level aggregated file. Keep it safe. You need it later if you want to [reshare to a new operator set](change-operator-set-and-reshare-validator-key-shares) or [update the owner nonce in key shares](update-owner-nonce-in-key-shares).

## Proof structure

Example `proofs.json` structure:

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

### Notes about the structure

- Each validator has one proof from each operator in the ceremony.
- A single aggregated file can include proofs for multiple validators.
- Each proof includes:
  - `validator`: the validator public key
  - `encrypted_share`: the encrypted share for one operator
  - `share_pub`: the operator public key for that share
  - `owner`: the validator owner address
- `signature` is the operator signature over the proof content.

## Why the proofs matter

The proofs protect both sides of the ceremony:
- the owner cannot change the owner address later without breaking the signed proof
- the operator signatures can be verified against the included operator public keys

## Key shares

For the `keyshares.json` format, see [Keyshares Structure](/learn/security/keyshares-structure).
