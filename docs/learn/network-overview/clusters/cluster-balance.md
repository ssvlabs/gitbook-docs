---
description: Understanding cluster balance in SSV Network
sidebar_position: 2
---

# Cluster Balance

The cluster balance must be maintained to keep its validators operating. This page explains how to calculate a cluster balance at a specific block.

The cluster balance must **always remain above the required** collateral for that cluster. Only the portion above the liquidation collateral counts toward operational runway.

![Operational Runway](/img/cluster-balance-1.avif)

Because operator and network fees are dynamic, the required [**liquidation collateral**](/learn/tokenomics/liquidations#liquidation-collateral) can vary between clusters. To calculate how much ETH is needed as collateral for a cluster, see [Liquidations](/learn/tokenomics/liquidations).

### Cluster Balance Formula

As explained in the documentation page related to [Payments](/learn/tokenomics/payments), cluster balance is affected by three main factors:

* Network fee
* Operator fees
* Effective balance

To track changes over time, the protocol uses [indexes](/learn/tokenomics/payments#indexes). Network-fee and operator-fee indexes are both needed to calculate cluster balance, together with the [cluster snapshot](/developers/api/subgraph-examples#cluster-snapshot) recorded the last time the cluster was updated.

#### Cluster balance

To calculate the updated cluster balance from the most recent snapshot, use:

$$
balance_n = balance_{snapshot} - (\Delta_{network\ fee} + \Delta_{operators\ fee}) * eb / 32
$$

Legend:

* $$balance_n$$ - cluster balance at block number `n` in ETH
* $$balance_{snapshot}$$ - value of the cluster balance on its latest snapshot
* $$\Delta_{network\ fee}$$ - Change in network fees paid since the last snapshot
* $$\Delta_{operators\ fee}$$ - Change in operator fees paid since the last snapshot
* $$eb$$ - [total effective balance](/learn/network-overview/clusters/effective-balance) of validators managed by the cluster

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

* $$\Delta_{operators\ fee}$$ - Change in operator fees paid since the last snapshot
* $$ofi_n$$ - Operator Fee Index, the latest protocol-wide operator fee index
* $$b$$ - Block number of the latest blockchain block
* $$ofb_n$$ - The block number at which the Operator Fee Index was taken
* $$of_n$$ - The current operator fee for the nth operator
* $$ofi_c$$ - Cluster Index, the latest index for the given cluster

Have a look at how to collect the necessary data to calculate the balance on the [Subgraph Examples page](/developers/api/subgraph-examples#cluster-balance-values).

A programmatic example of calculating the cluster balance has been added to the [SSV SDK](/developers/SSV-SDK/module-reference/api-module#getclusterbalanceclusterid-daoaddress-operatorids).

### Burn Rate

The burn rate is the rate at which a cluster spends ETH per block. It is the sum of all operator fees plus the current network fee, scaled by the cluster’s effective balance.

$$
Burn\;Rate_{cluster} = (\sum(of_n) + nf) * eb / 32
$$

Legend:

* $$of_n$$ - The current operator fee for the nth operator
* $$nf$$ - The current network fee
* $$eb$$ - [total effective balance](/learn/network-overview/clusters/effective-balance) of validators managed by the cluster

### Operational Runway

Any funds added above the required collateral prolong the operation of the cluster’s validators and are usually referred to as operational runway. Cluster owners can manage cluster balance by depositing or withdrawing funds, with the understanding that only excess balance contributes to runway.

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

Withdrawals allow cluster owners to remove excess balance for capital efficiency. Cluster owners may not withdraw a cluster’s liquidation collateral. That collateral can be withdrawn only when offboarding the cluster by removing all validators from it. In practice, this means cluster owners can withdraw only from the portion of balance counted as runway.
