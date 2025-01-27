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
* `keyshares.json` - this file contains the keyshares necessary to register the validator on the ssv.network
* `proof.json` - contains the signed proofs that a DKG client participated in a DKG ceremony, generating key shares for a certain owner. This file is crucial for [resharing your validator to a different set of operators](change-operator-set-and-reshare-validator-key-shares.md), or to [regenerate the signature portion of key shares](update-owner-nonce-in-key-shares.md) in the future.
