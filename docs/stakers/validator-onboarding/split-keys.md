---
description: Split Keys
sidebar_position: 2
---

# Split Keys

There are two ways to split keys:
- [SSV-Keys CLI](#split-keys-with-the-cli)
- [SSV-SDK](#split-keys-with-the-ssv-sdk-alternative), for programmatic flows / automations
:::warning Keep Keys Safe (Essential)
- **Do all key operations offline.** Disable network interfaces while handling private keystore/keyshare files.
- **One batch = one password.** All keys processed in a single batch must share the same password.
- **Use HSM/KMS/Vault where possible.** Archive originals to cold storage immediately after processing.
:::
## Split Keys with the CLI
### **Preparation**
- Download the [SSV-Keys CLI](https://github.com/ssvlabs/ssv-keys/releases) binary for your OS (Linux, MacOS, Windows)
- Place all keystores for migration in a single folder (e.g., ` ./keystores`)

### **Generate the CLI Command**
- Navigate to the [SSV Webapp](http://app.ssv.network)
- **Connect your wallet** → **[My Account](https://app.ssv.network/clusters)** → **Validators** → **Add Cluster**
- Choose **Generate new key shares** → select your 4 operators → **Offline** → **CLI**
- Copy the generate command for SSV-Keys CLI

### **Execute the Command** (*Offline*)
- Start a `tmux` / `screen`  session in case of terminal disconnects
- Paste the generated command. The tool will ask for:
  1. Path to keystores (e.g., `./keystores`)
  2. Keystores password (typed/pasted; file‑based input is not accepted)
  3. Output path (e.g., `./shares`)
:::info Note
 The tool validates `keystore-m` files and may appear idle — this is normal. **For ~1000 keys in a single run, expect ~20–40 minutes** on a modern server. Wait for the “Key distribution successful!” message.
:::

### **Post-Execution**
After a successful run, the tool creates a `shares/` folder alongside your keystore folder. For 1,000 keys in a single run you will produce one keyshares file:
```
.
├── keyshares 
│   └── ... 1000 keystore files
└── shares
     └── generated shares file
```

**Archive** the original keystores to an offline storage.

## Split Keys with the SSV SDK (*Alternative*)
If you prefer a programmatic path, follow the official [SSV-SDK Quickstart](/developers/) to produce keyshares from keystores or check out [SSV-SDK Overview](/developers/SSV-SDK/) here. 

Same safety precautions apply here: Ensure password policy and offline handling of the keys.

## Next Steps
Once your keyshare files are prepared — you can [**Calculate and understand the Costs**](./calculate-costs) for your cluster. 

If you are aware of the expected fees, you can skip right to [Registering your Validators](./register-validators).