---
title: Node Migration
sidebar_position: 3
---

As a node operator, it may happen that the software stack needs to be migrated to a different machine, for various reasons.

In such a scenario, it is very important to know what operations must be performed, in which order, and what are the sensitive pieces of data that need to be preserved and copied over to the new hardware. Here is a summary:

## Procedure

In order to migrate the SSV Node to a different machine, it is necessary to shut down the current setup, **before** launching the new one.

:::danger
Two nodes with the same public key should never be running at the same time. The protocol is resilient to slashing, but ignoring this warning could lead to unexpected behaviours.
:::

So, for this reason, the migration process could be easily summarised in the following steps:

1. Backup node files
2. Shut down SSV Node on the current machine
3. Setup SSV Node on the new machine using backups
4. Wait at least one epoch
5. Start SSV Node service on the new machine

:::warning
Please note: if you are also running a DKG operator node, you may have to [follow the DKG operator migration guide](./dkg-operator-migration), if it is running on the same machine as the SSV node, or if it is running on a different machine, but you need to decommission that machine as well.
:::

## Node backup

### SSV Stack setup

If you have followed the [automatic node setup with SSV Stack](../node-setup), your files should be in `/ssv-stack/ssv-node-data` directory.

### Manual Node setup

If you have followed [the Manual Node setup guide](../node-setup/manual-setup), you most likely have (at least) these files in the folder with your node configuration:

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

The configuration file (`config.yaml` in the code snippet above), is necessary for the node to work. You can copy the old configuration file and use it as a template, making sure to change any parameter that needs changing, such as Ethereum client endpoints, and paths to the Operator Keys.

#### Operator keys

Operator keys are, essentially, the authentication method to identify an SSV node, and link it to an operator ID. As a consequence, whenever a node is moved to a different machine, they **absolutely must** be preserved and copied from the existing setup to the new one.

The files in question are `encrypted_private_key.json` and `password` in the snippet above and if you have followed [the Manual Node setup guide](../node-setup/manual-setup), the filenames should be the same for you.

#### Node database (optional)

The node database persists information about duties performed. It can be synced from scratch within minutes, if you want to save time - you can back it up and move to the new machine too.

The `data/db` folder in the snippet above represents such database. If you are unsure where to find it in your specific setup, please have a look at the `db.Path` parameter of the node configuration file, to understand where it is store (be mindful, if you are running the SSV node in Docker container, this path will be relative to the container itself, and any volumes mounted to it).
