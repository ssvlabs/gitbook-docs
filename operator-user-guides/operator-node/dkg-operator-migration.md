# DKG operator migration

If you need to migrate the DKG operator node to a different machine, you need to know what operations must be performed, in which order, and what are the sensitive pieces of data that need to be preserved and copied over to the new hardware.

### Procedure

In order to migrate the DKG operator node to a different machine, it is advised to shut down the current setup, before launching the new one.

The recommended migration process could be summarised in the following steps:

* Backup DKG files (if applicable)
* Shut down DKG operator (if applicable) on the current machine
* [Start DKG operator on the new machine](enabling-dkg.md#start-ssv-dkg)
* [Update operator metadata on the SSV WebApp](enabling-dkg.md#update-operator-metadata)

{% hint style="info" %}
Please note: since the DKG node does not have to be on the same machine as the SSV node, one can be migrated without having to migrate the other.
{% endhint %}

### DKG backup (if necessary)

If you have followed [the dedicated guide to enable DKG for your operator](enabling-dkg.md), you most likely have (at least) these files in the folder with your node configuration:

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

The configuration file (`config.yaml` in the code snippet above), is necessary for the DKG operator to work. You can copy the old configuration file and use it as a template, making sure to change any parameter that needs changing, such as paths to the Operator Keys.

#### Operator keys

Similarly to the SSV Node, Operator keys are a vital requirement to run the DKG operator server, as they are the link that connects it to the SSV node itself.

The files in question are `encrypted_private_key.json` and `password` in the snippet above and the filenames should be the same for you.

#### Output folder (optional)

The output folder represents the product of various DKG ceremonies the operator node was involved in. These files can be thought as "traces" or debug artefacts.

They are useful, and it could be convenient to have a backup as well, but it is not mandatory, and the DKG operator node will not lose any of its functionality if this was not done.
