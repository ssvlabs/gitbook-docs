---
description: Management
sidebar_position: 5
---

# Management

:::note Automations
Most of these steps can be automated programmatically. If you wish to do so, please check out [Developers Tutorials page](/developers/examples/).
:::

This section explains the actions that can be performed with an existing cluster:
- [Add More Validators](adding-validator-to-existing-cluster.md)
- [Consolidate Validators](consolidate-validators.md)
- [Deposit ETH](depositing-eth.md)
- [Set Fee Recepient](setting-fee-recipient-address.md) for execution layer (block proposals) rewards
- [Reactivate a Cluster](re-activating-a-cluster.md) if your balance went to 0
- [Update Operator Set](update-operators.md) when you need to change the operator set
- [Migrate to ETH](migrating-to-eth-clusters.md), only for legacy SSV clusters

:::warning Legacy SSV Clusters
Existing SSV-based clusters are treated as legacy. **This means the following actions are no longer supported:**
- Adding new validators to SSV cluster
- Depositing additional SSV to extend runway
- Removing or exiting validators from SSV clusters

**The only forward path is [migration to ETH](migrating-to-eth-clusters.md).** Migration automatically refunds your SSV balance.
:::