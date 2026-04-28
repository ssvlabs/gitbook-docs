---
sidebar_label: 'Ceremony Output Summary'
sidebar_position: 4
---

# Ceremony Output Summary

After the `ssv-dkg` ceremony finishes successfully, the tool creates a `ceremony-[timestamp]` folder inside the configured `outputPath`.

## Example output

```text
ceremony-[timestamp]/
├── 0..[nonce]-0x...[validator-public-key]/
│   ├── deposit_data.json
│   ├── keyshares.json
│   └── proofs.json
├── 0..[nonce]-0x...[validator-public-key]/
│   ├── deposit_data.json
│   ├── keyshares.json
│   └── proofs.json
├── deposit_data.json
├── keyshares.json
└── proofs.json         # present when >1 validators were generated
```

## What each file is for

- `deposit_data.json`: deposit data used to activate validators on Ethereum. When compounding is enabled, the withdrawal credentials in this file use the `0x02` compounding format.
- `keyshares.json`: key shares used to register validators on SSV Network. [Keyshares files structure](/developers/security/keyshares-structure) is outlined on a separate page.
- `proofs.json` inside each validator subfolder: the proof file for that validator
- top-level `proofs.json`: a combined proof file for the ceremony when top-level combined artifacts are written

### Key shares

For the `keyshares.json` format, see [Keyshares Structure](/developers/security/keyshares-structure).

### Proofs

The proofs protect both sides of the ceremony:
- the owner cannot change the owner address later without breaking the signed proof
- the operator signatures can be verified against the included operator public keys

Keep the relevant `proofs.json` file safe. You need it later if you want to [reshare to a new operator set](change-operator-set-and-reshare-validator-key-shares) or [update the owner nonce in key shares](update-owner-nonce-in-key-shares).

**Example `proofs.json` structure:**

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
    "proof": { "...": "..." },
    "signature": "..."
  }
]
```

- Each proof includes:
  - `validator`: the validator public key
  - `encrypted_share`: the encrypted share for one operator
  - `share_pub`: the operator public key for that share
  - `owner`: the validator owner address
- `signature` is the operator signature over the proof content.
