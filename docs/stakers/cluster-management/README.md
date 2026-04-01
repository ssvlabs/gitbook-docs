---
description: Management
sidebar_position: 5
---

# Management

:::note Automations
Many of these actions can be automated. See the [Developers Tutorials](/developers/examples).
:::

This section covers the main actions you can perform on an existing cluster:
- [Add More Validators](adding-validator-to-existing-cluster) 
- [Deposit ETH](depositing-eth)
- [Set Fee Recipient](setting-fee-recipient-address) — update the address that receives execution-layer rewards
- [Reactivate a Cluster](re-activating-a-cluster) — restore a liquidated cluster
- [Update Operators](update-operators) — move validators to a different operator set
- [Migrate to ETH](migrating-to-eth-clusters) — convert a legacy SSV-based cluster to ETH
- [Consolidate Validators](consolidate-validators)

:::warning Legacy SSV Clusters
Existing SSV-based clusters are treated as legacy. **This means the following actions are no longer supported:**
- Adding new validators to SSV cluster
- Depositing additional SSV to extend runway
- Exiting validators from SSV clusters

**The only forward path is [migration to ETH](migrating-to-eth-clusters).** Migration automatically refunds your SSV balance.
:::