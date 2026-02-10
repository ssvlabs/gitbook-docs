---
title: Migrating to ETH
sidebar_position: 8
---

# Migrating to ETH

## Overview 
Legacy SSV-based clusters should be migrated to ETH payments to continue active operations. Migration is the only path forward for maintaining and modifying existing clusters.

### What Happens During Migration

1. **ETH Deposit**: You deposit ETH to fund your cluster's operational runway
2. **SSV Refund**: Your entire SSV balance is automatically refunded to your wallet
3. **Cluster Conversion**: Your cluster switches to ETH-based fee accounting
4. **Continued Operation**: Your validators continue running without interruption

:::info Automatic SSV Refund
You do **not** need to manually withdraw SSV before migrating. The migration process automatically returns your full SSV balance to your wallet address.
:::

### Prerequisites

Before migrating, ensure you have:

- Access to the wallet that owns the cluster
- Sufficient ETH to cover:
  - Initial cluster funding (operational runway)
  - Gas fees for the migration transaction
  - We recommend depositing enough ETH for at least 90 days of operations to avoid frequent top-ups.

## Migration Process

### Via WebApp

#### 1. Connect Web3 Wallet
Connect your Web3 wallet with the [WebApp](https://app.ssv.network/), use the same address used for validator registration.

#### 2. Choose the Cluster
Select a non-migrated cluster from the list and click “Switch to ETH”.

![Migrate cluster to ETH](/img/migrate-eth-1.png)

#### 3. Acknowledge Fee Warnings
Review and acknowledge the fee warnings and comparison.

![Migrate cluster to ETH](/img/migrate-eth-4.png)

#### 4. Enter Effective Balance
Enter the total Effective Balance for all validators in the cluster. The default is 32 ETH per validator. Acknowledge the warnings and continue.

![Migrate cluster to ETH](/img/migrate-eth-5.png)

#### 5. Choose Operational Runway
Choose an operational runway based on the new yearly operator fees.

![Migrate cluster to ETH](/img/migrate-eth-6.png)

#### 6. Acknowledge Balance Warnings
Review the balance and fee calculation notice. You can read more about [Effective Balance accounting here](/stakers/clusters/effective-balance.md).

![Migrate cluster to ETH](/img/migrate-eth-7.png)

#### 7. Switch Cluster to ETH
Review the migration summary and confirm by selecting “Switch Cluster to ETH”. Sign the transaction with your wallet.

![Migrate cluster to ETH](/img/migrate-eth-8.png)

#### 8. Finish Migration
After on-chain confirmation, review the post-migration summary. The migration is complete.

![Migrate cluster to ETH](/img/migrate-eth-9.png)
![Migrate cluster to ETH](/img/migrate-eth-10.png)

### Via Smart Contract

If you prefer to migrate directly via the smart contract, use the `migrateClusterToETH()` function in a transaction. Refer to [Developers documentation](/developers/SSV-SDK/module-reference/cluster-module#migrateclustertoeth) for more details.

**The transaction will:**
1. Validate your cluster snapshot
2. Transfer your SSV balance back to your wallet
3. Accept your ETH deposit
4. Convert the cluster to ETH-based accounting
5. Emit `ClusterMigratedToETH` event