---
description: Understanding cluster balance in the SSV network
sidebar_position: 2
---

# Cluster Balance

The cluster balance needs to be kept in check to ensure the continued operation of its validator(s). This page explains how to calculate cluster balance at a specific blockchain block.

It is important to be aware that the cluster balance must **always be higher than the required** collateral for the cluster, so only the portion of the cluster balance exceeding the Liquidation Collateral can be used to calculate the Operational Runway.

![Operational Runway](/img/cluster-balance-1.avif)

Since operator and network fees are dynamic, the required [**Liquidation Collateral**](/learn/tokenomics/liquidations.md#liquidation-collateral) could vary between different clusters. To calculate how much funding is needed as collateral for a cluster, please refer to the [Liquidations page](/learn/tokenomics/liquidations.md).

### Cluster Balance Formula

As explained in the documentation page related to [Payments](/learn/tokenomics/payments.md), cluster balance is affected by three main factors:

* Network fee
* Operator fees
* Effective balance

To track changes over time, the concept of [Indexes](/learn/tokenomics/payments.md#indexes) has been introduced. Indexes for network fees and operator fees are necessary to calculate the cluster balance, along with [the "snapshot" of the cluster status](/developers/api/subgraph-examples#cluster-snapshot), taken the last time it was updated (the cluster snapshot is also used in smart contract transactions).

#### Cluster balance

To calculate the updated cluster balance, given the cluster balance from most recent snapshot, you can use this formula:

$$
balance_n = balance_{snapshot} - (\Delta_{network\ fee} + \Delta_{operators\ fee}) * eb / 32
$$

Legend:

* $$balance_n$$ - cluster balance at block number `n` in ETH
* $$balance_{snapshot}$$ - value of the cluster balance on its latest snapshot
* $$\Delta_{network\ fee}$$ - Change in network fees paid since the last snapshot
* $$\Delta_{operators\ fee}$$ - Change in operator fees paid since the last snapshot
* $$eb$$ - [total effective balance](effective-balance.md) of validators managed by the cluster

#### Network fees delta

Below is the formula used to calculate the network fees owed since the last cluster snapshot:


$$
\Delta_{network\ fee} = nfi_p + (b - nfb_p) * nf - nfi_c
$$

Legend:

* $$\Delta_{network\ fee}$$ - Change in network fees paid since the last snapshot
* $$nfi_p$$ - Protocol Network Fee Index, the latest protocol-wide network fee index
* $$b$$ - Block number of the latest blockchain block
* $$nfb_p$$ - The block number at which the Protocol Network Fee Index was taken
* $$nf$$ - The current network fee
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

Have a look at how to collect the necessary data to calculate the balance on the [Subgraph Examples page](/developers/api/subgraph-examples#cluster-balance-values).

A programmatic example of calculating the cluster balance has been added to the [SSV SDK](/developers/SSV-SDK/module-reference/api-module#getclusterbalanceclusterid-daoaddress-operatorids).

### Burn Rate

The rate at which a cluster spends ETH per block. It is the sum of all operators' fees with the current network fee, divided by effective balance of a cluster.

$$
Burn\;Rate_{cluster} = (\sum(ofi_n) + {nf}) * eb / 32
$$

Legend:

* $$of_n$$ - The current operator fee for the nth operator
* $$nf$$ - The current network fee
* $$eb$$ - [total effective balance](effective-balance.md) of validators managed by the cluster

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

