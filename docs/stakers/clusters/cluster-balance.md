---
description: Understanding cluster balance in the SSV network
sidebar_position: 2
---

# Cluster Balance

:::danger Legacy SSV Clusters
**SSV-based payments are frozen.** Existing SSV clusters cannot be actively maintained under the SSV payment model. The only forward path is to [migrate to ETH](../../stakers/cluster-management/migrating-to-eth-clusters.md).

While this documentation primarily focuses on **ETH clusters** (the current standard), the formulas and concepts also apply to legacy SSV clusters during the transition period. Where payment currency matters, substitute SSV for ETH in legacy clusters.
:::

The cluster balance needs to be kept in check to ensure the continued operation of its validator(s). This page explains how to calculate cluster balance at a specific blockchain block.

It is important to be aware that the cluster balance must **always be higher than the required** collateral for the cluster, so only the portion of the cluster balance exceeding the Liquidation Collateral can be used to calculate the Operational Runway.

![Operational Runway](/img/cluster-balance-1.avif)

Since operator and network fees are dynamic, the required [**Liquidation Collateral**](../../learn/protocol-overview/tokenomics/liquidations.md#liquidation-collateral) could vary between different clusters. To calculate how much funding is needed as collateral for a cluster, please refer to the [Liquidations page](../../learn/protocol-overview/tokenomics/liquidations.md#liquidators).

### Cluster Balance Formula

As explained in the documentation page related to [Payments](../../learn/protocol-overview/tokenomics/payments.md), cluster balance is affected by three main factors:

* Network fee
* Operator fees
* Number of validators (weighted by effective balance)

To track changes over time, the concept of [Indexes](../../learn/protocol-overview/tokenomics/payments.md#indexes) has been introduced. Indexes for network fees and operator fees are necessary to calculate the cluster balance, along with [the "snapshot" of the cluster status](/developers/tools/ssv-subgraph/subgraph-examples#cluster-snapshot), taken the last time it was updated (the cluster snapshot is also used in smart contract transactions).

#### Cluster balance

To calculate the updated cluster balance, given the cluster balance from most recent snapshot, you can use this formula:

$$
balance_n = balance_{snapshot} - (\Delta_{network\ fee} + \Delta_{operators\ fee}) * v_c
$$

Legend:

* $$balance_n$$ - cluster balance at block number `n` in ETH
* $$\Delta_{network\ fee}$$ - Change in network fees paid since the last snapshot
* $$\Delta_{operators\ fee}$$ - Change in operator fees paid since the last snapshot
* $$balance_{snapshot}$$ - value of the cluster balance on its latest snapshot
* $$v_c$$ - vUnits based on effective balance

#### Network fees delta

Below is the formula used to calculate the network fees owed since the last cluster snapshot:


$$
\Delta_{network\ fee} = nfi_p + (b - nfb_p) * nf - nfi_c
$$

Legend:

* $$\Delta_{network\ fee}$$ - Change in network fees paid since the last snapshot
* $$nfi_p$$ - Protocol Network Fee Index, the latest protocol-wide network fee index
* $$b$$ - Block number of the latest blockchain block
* $$nf$$ - The current network fee
* $$nfb_p$$ - The block number at which the Protocol Network Fee Index was taken
* $$nfi_c$$ - Cluster Network Fee Index, the latest network fee index for the given cluster

#### Operators fees delta

Similarly, below is the formula used to calculate the operators fees owed since the last cluster snapshot:

$$
\Delta_{operators\ fee} = \sum(ofi_n + (b - ofb_n) * of_n) - ofi_c
$$

Legend (n represents the nth operator in this cluster):

* $$\Delta_{operators\ fee}$$ - Change in network fees paid since the last snapshot
* $$ofi_n$$ - Operator Fee Index, the latest protocol-wide network fee index
* $$b$$ - Block number of the latest blockchain block
* $$ofb_n$$ - The block number at which the Operator Fee Index was taken
* $$of_n$$ - The current operator fee for the nth operator
* $$ofi_c$$ - Cluster Index, the latest index for the given cluster

Have a look at how to collect the necessary data to calculate the balance on the [Subgraph Examples page](/developers/tools/ssv-subgraph/subgraph-examples#cluster-balance-values).

A programmatic example of calculating the cluster balance has been added to the [SSV SDK](/developers/SSV-SDK/module-reference/api-module#getclusterbalanceclusterid-daoaddress-operatorids).

### Operational Runway

Any additional funds added to the cluster balance on top of the required collateral will prolong the operation of its validators and are usually referred to as Operational Runway. Users can manage their clusters balance by depositing or withdrawing funds at will, knowing that all extra funds added to the cluster balance will increase its operational runway.

To calculate the effects of deposits and withdrawals on your cluster’s operational runway:

$$
Operational\;Runway = Residual\;Balance / Burn\;Rate_{cluster}
$$

Legend:

* $$Residual\;Balance$$ - Amount of ETH in the cluster balance, exceeding the Liquidation Collateral
* $$Burn\;Rate_{cluster}$$ - The rate at which a cluster spends ETH per block

### Deposits

Deposits can be made to a cluster's balance to ensure the cluster avoids liquidation and to extend its operational runway.

### Withdrawals

Withdrawals allow users to remove any excess balance they have for capital efficiency. Users may not withdraw a cluster's liquidation collateral. The collateral can only be withdrawn only when off-boarding the cluster (by removing all validators in the cluster). This means that in order to maintain a validator’s operation, a user can only withdraw in the range of their runway.

