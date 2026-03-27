---
title: Migrating to ETH
sidebar_position: 6
---

# Migrating to ETH

## Overview

Legacy SSV-based clusters must be migrated to ETH-based fees to continue operating and to use current cluster-management actions.

### What happens during migration

1. You deposit ETH to fund the cluster's runway.
2. Your remaining SSV balance is refunded automatically.
3. The cluster switches to ETH-based fee accounting.
4. Validators continue operating without interruption.

:::info Automatic SSV refund
You do not need to withdraw SSV manually before migration. The migration flow returns the full SSV balance to your wallet automatically.
:::

### Before you begin

Make sure you have:
- access to the wallet that owns the cluster
- enough ETH for the initial runway and gas fees
- a funding target that gives you comfortable runway; 90 days is a common starting point

## Migrate in the Web App

#### 1. Connect your wallet

Connect the cluster owner wallet in the [Web App](https://app.ssv.network/).

#### 2. Select the cluster

Open the non-migrated cluster and click **Switch to ETH**.

![Migrate cluster to ETH](/img/migrate-eth-1.png)

#### 3. Acknowledge the fee warnings

Review and acknowledge the fee warnings and comparison.

![Migrate cluster to ETH](/img/migrate-eth-4.png)

#### 4. Enter the effective balance

Enter the total effective balance for all validators in the cluster. If you do not know the exact value, the Web App defaults to 32 ETH per validator.

![Migrate cluster to ETH](/img/migrate-eth-5.png)

#### 5. Choose the operational runway

Choose the runway based on the ETH-based yearly fees for the cluster.

![Migrate cluster to ETH](/img/migrate-eth-6.png)

#### 6. Review the balance warning

Review the fee and balance notice. For more context, see [Effective Balance accounting](/learn/network-overview/clusters/effective-balance).

![Migrate cluster to ETH](/img/migrate-eth-7.png)

#### 7. Confirm the migration

Review the summary, click **Switch Cluster to ETH**, and sign the transaction.

![Migrate cluster to ETH](/img/migrate-eth-8.png)

#### 8. Confirm completion

After on-chain confirmation, review the post-migration summary. The cluster is now using ETH-based fees.

![Migrate cluster to ETH](/img/migrate-eth-9.png)
![Migrate cluster to ETH](/img/migrate-eth-10.png)

## Migrate through the smart contract

If you prefer a contract-level flow, call `migrateClusterToETH()` directly. See the [SDK module reference](/developers/SSV-SDK/module-reference/cluster-module#migrateclustertoeth).

The transaction:
1. validates the cluster snapshot
2. refunds the SSV balance to your wallet
3. accepts your ETH deposit
4. converts the cluster to ETH-based accounting
5. emits the `ClusterMigratedToETH` event
