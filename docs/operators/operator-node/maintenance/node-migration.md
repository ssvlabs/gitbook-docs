---
title: Node Migration
sidebar_position: 3
---

You may need to migrate your software stack to a different machine. This page summarizes the process.

## Procedure

:::danger
Two nodes with the same public key should never run at the same time. Ignoring this warning can lead to unexpected behavior.
:::

To migrate an SSV Node to a different machine, shut down the current setup **before** starting the new one.


The migration process can be summarized as follows:

1. Backup node files
2. Shut down SSV Node on the current machine
3. Setup SSV Node on the new machine using backups
4. Wait at least one epoch
5. Start SSV Node service on the new machine

:::note DKG node migration
If you also run a DKG Operator node, you may need to [follow the DKG Operator migration guide](dkg-operator-migration) as well.
:::

## Node backup

### SSV Stack setup

If you used the [SSV Stack setup](/operators/operator-node/node-setup/), the files to backup should be in `/ssv-stack/ssv-node-data`.

### Manual Node setup

If you have followed [the Manual Node setup guide](/operators/operator-node/node-setup/manual-setup), you most likely have (at least) these files in the folder with your node configuration:

```
⇒   tree
.
├── config.yaml
├── data
│   ├── db
│   │   ├── 000840.vlog
│   │   ├── 000841.vlog
│   │   ├── 001038.sst
│   │   ├── 001044.sst
│   │   ├── 001045.sst
│   │   ├── 001046.sst
│   │   ├── 001047.sst
│   │   ├── 00841.mem
│   │   ├── DISCARD
│   │   ├── KEYREGISTRY
│   │   ├── LOCK
│   │   └── MANIFEST
│   ├── debug-2023-11-24T16-16-11.497.log
│   ├── debug-2023-11-28T13-15-17.557.log
│   └── debug.log
├── encrypted_private_key.json
└── password
```

#### Configuration file

The configuration file (`config.yaml` in the example above) is required for the node to run. You can copy the old file and update any values that need to change, such as Ethereum client endpoints and key file paths.

#### Operator keys

Operator keys identify the SSV Node and link it to an Operator ID. When you move a node to a different machine, these files **must** be preserved and copied over.

The files in question are `encrypted_private_key.json` and `password` in the snippet above and if you have followed [the Manual Node setup guide](/operators/operator-node/node-setup/manual-setup), the filenames should be the same for you.

#### Node database (optional)

The node database stores duty-related state. It can be re-synced from scratch within minutes, but if you want to save time, you can back it up and move it as well.

In the example above, the database is stored in `data/db`. If you are not sure where yours is located, check the `db.Path` value in the node configuration file. If you run the node in Docker, remember that this path is relative to the container and any mounted volumes.
