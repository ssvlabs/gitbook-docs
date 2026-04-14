---
title: DKG Operator Migration
sidebar_position: 4
---

If you need to migrate the DKG Operator node to a different machine, you need to know what to move, in what order, and which files must be preserved.

### Procedure

To migrate the DKG Operator node to a different machine, shut down the current setup before starting the new one.

The recommended migration process is:

* Backup DKG files (if applicable)
* Shut down DKG operator (if applicable) on the current machine
* [Start DKG operator on the new machine](/operators/operator-node/setup-sidecars/enabling-dkg/start-dkg-node/)
* [Update Operator metadata in the Web App](/operators/operator-node/setup-sidecars/enabling-dkg/final-steps#update-operator-metadata)

:::info
Because the DKG node does not need to run on the same machine as SSV Node, you can migrate one without migrating the other.
:::

### DKG backup (if necessary)

If you have followed [the dedicated guide to enable DKG for your operator](/operators/operator-node/setup-sidecars/enabling-dkg/start-dkg-node/), you most likely have (at least) these files in the folder with your node configuration:

```
⇒   tree
.
├── config.yaml
├── debug.log
├── encrypted_private_key.json
├── output
... (could be multiple ceremony folders)
│   └── ceremony-<DATE>--<TIME>--<RANDOM_ID>
│       └── NONCE-<PUBKEY>
│           ├── deposit_data.json
│           ├── keyshares.json
│           └── proofs.json
└── password
```

#### Configuration file

The configuration file (`config.yaml` in the example above) is required for the DKG Operator to run. You can copy the old file and update any values that need to change, such as key file paths.

#### Operator keys

As with SSV Node, Operator keys are required to run the DKG Operator because they link it to the SSV Node itself.

The files in question are `encrypted_private_key.json` and `password` in the snippet above and the filenames should be the same for you.

#### Output folder (optional)

The output folder contains artifacts from DKG ceremonies the Operator node participated in. You can treat these files as trace or debug artifacts.

They can be useful to keep, but they are optional. The DKG Operator node will still work if you do not back them up.
