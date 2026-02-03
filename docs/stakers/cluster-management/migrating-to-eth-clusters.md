---
title: Migrating to ETH Clusters
sidebar_position: 8
---

# Migrating to ETH Clusters

Legacy SSV clusters can be migrated to ETH clusters to continue active operations. Migration is the only path forward for maintaining and modifying SSV-based clusters.

:::danger One-Way Migration
**Migration from SSV to ETH is permanent and cannot be reverted.** Once you migrate, your cluster will exclusively use ETH for fee payments and cannot return to the SSV payment model.
:::

## Why Migrate?

After the network upgrade, legacy SSV clusters have limited functionality:

**❌ NOT Supported for SSV Clusters:**
- Adding new validators
- Depositing additional SSV
- Removing validators
- Re-activating liquidated clusters
- Updating operators (resharing)

**✅ Still Supported for SSV Clusters:**
- Running existing validators (until liquidation)
- Exiting validators

**✅ Fully Supported After Migration to ETH:**
- All cluster operations
- Adding/removing validators
- Depositing/withdrawing ETH
- Updating operators
- Re-activating if liquidated

## What Happens During Migration

When you migrate your cluster to ETH:

1. **ETH Deposit**: You deposit ETH to fund your cluster's operational runway
2. **SSV Refund**: Your entire SSV balance is automatically refunded to your wallet
3. **Cluster Conversion**: Your cluster switches to ETH-based fee accounting
4. **Continued Operation**: Your validators continue running without interruption

:::info Automatic SSV Refund
You do **not** need to manually withdraw SSV before migrating. The migration process automatically returns your full SSV balance to your wallet address.
:::

## Prerequisites

Before migrating, ensure you have:

- Access to the wallet that owns the cluster
- Sufficient ETH to cover:
  - Initial cluster funding (operational runway)
  - Gas fees for the migration transaction
  - We recommend depositing enough ETH for at least 90 days of operations to avoid frequent top-ups.

## Migration Process

### Via WebApp

:::info Coming Soon
The SSV WebApp will provide a guided migration flow. 
:::

<!-- TODO: Add screenshots and instructions here -->

### Via Smart Contract

If you prefer to migrate directly via the smart contract, use the `migrateClusterToETH()` function:

```solidity
function migrateClusterToETH(
    bytes calldata publicKey,
    uint64[] calldata operatorIds,
    Cluster calldata cluster
) external payable
```

**Parameters:**
- `publicKey` - Public key of any validator in the cluster
- `operatorIds` - Array of operator IDs managing the cluster
- `cluster` - Current cluster snapshot
- `msg.value` - ETH amount to deposit for operational runway

**The transaction will:**
1. Validate your cluster snapshot
2. Transfer your SSV balance back to your wallet
3. Accept your ETH deposit
4. Convert the cluster to ETH-based accounting
5. Emit `ClusterMigratedToETH` event

:::warning Cluster Snapshot Required
You need the current cluster snapshot (balance, index, active status, etc.) to call this function. Retrieve this from the [SSV Subgraph](/developers/tools/ssv-subgraph/subgraph-examples#cluster-snapshot) or [SSV Scanner](/developers/tools/ssv-scanner).
:::

## After Migration

Once migration is complete:

✅ **Your cluster is now ETH-based** and has full functionality

✅ **Your SSV balance has been refunded** to your wallet

✅ **You can:**
- Add new validators to the cluster
- Deposit or withdraw ETH as needed
- Update operators (reshare)
- Remove validators
- Perform all standard cluster operations

## FAQ

**Q: What happens to my SSV balance?**  
A: Your full SSV balance is automatically refunded to your wallet during migration. You don't need to withdraw it first.

**Q: Can I migrate back to SSV after migrating to ETH?**  
A: No. Migration is one-way and permanent.

**Q: Will my validators experience downtime during migration?**  
A: No. Your validators continue running without interruption throughout the migration process.

**Q: What if I have insufficient SSV runway before I can migrate?**  
A: Ensure you deposit sufficient SSV in advance to maintain operations until you complete the migration. If your cluster is liquidated before migration, you'll need to reactivate it with ETH directly.

**Q: Do I need to inform my operators about migration?**  
A: No. Operators can serve both SSV and ETH clusters during the transition. Your migration happens automatically from their perspective.

**Q: Can I deposit more ETH after migrating?**  
A: Yes. After migration, you can [deposit ETH](./depositing-eth.md) at any time to extend your operational runway.