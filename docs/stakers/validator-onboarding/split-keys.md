---
description: Split Keys
sidebar_position: 2
---

# Split Keys

You can split validator keys in two ways:
- [SSV-Keys CLI](#split-keys-with-the-cli)
- [SSV-SDK](#split-keys-with-the-ssv-sdk-alternative) for programmatic flows and automation

:::warning Keep keys safe
- Do all key operations offline.
- Process only keystores that share the same password in one batch.
- Store original keystores in cold storage after the split.
:::

## Split Keys with the CLI

### Prepare the input folder

1. Download the [SSV-Keys CLI](https://github.com/ssvlabs/ssv-keys/releases) binary for your OS.
2. Put all validator keystore files you want to process into one input folder, for example `./keystores`.
3. Make sure every keystore in that batch uses the same password.

### Generate the command in the Web App

1. Open the [SSV Web App](https://app.ssv.network).
2. Connect your wallet and go to **My Account** → **Validators** → **Add Cluster**.
3. Select **Generate new key shares**.
4. Choose your four operators.
5. Select **Offline** → **CLI**.
6. Copy the generated SSV-Keys CLI command.

### Run the command offline

1. Start a `tmux` or `screen` session, so a terminal disconnect does not interrupt the run.
2. Paste the command.
3. Provide the requested values:
   1. **Input folder**: the folder that contains your keystores, for example `./keystores`
   2. **Password**: the shared password for that batch of keystores
   3. **Output folder**: the folder where the generated key shares should be written, for example `./shares`

:::info Note
The tool validates the keystores before it writes output, so it may appear idle for a while. For about 1,000 validators, expect roughly 20-40 minutes on a modern server. Wait for the `Key distribution successful!` message.
:::

### Review the output

After a successful run, you will have:
- an **input folder** such as `keystores/` that still contains your original keystores
- an **output folder** such as `shares/`
- one generated `keyshares-...json` file in the output folder for that batch

```text
.
├── keystores/
│   ├── keystore-m_12381_3600_...
│   └── keystore-m_12381_3600_...
└── shares/
    └── keyshares-YYYY-MM-DD-HH-MM-SS.json
```

Archive the original keystores in offline storage after the split.

## Split Keys with the SSV-SDK (Alternative)

If you prefer a programmatic flow, use the [SSV-SDK Quickstart](/developers) or the [SSV-SDK Overview](/developers/SSV-SDK) to generate key shares from keystores.

The same safety rules apply: keep key handling offline and use a clear password policy.

## Next Steps

After you generate the key shares, continue to [Calculate Costs](./calculate-costs) or go directly to [Register Validators](./register-validators).
