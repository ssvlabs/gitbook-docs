---
description: Understanding cluster balance in the SSV network
sidebar_position: 2
---

# Cluster Balance

With the SSV token serving as the payment layer of the network, the cash flow between stakers and operators is facilitated by maintaining an SSV balance in a cluster. The cluster balance needs to be kept in check to ensure the continued operation of its validator(s) and below it is explained how to calculate the balance of a cluster at a specific blockchain block.

It is important to be aware that the cluster balance must **always be higher than the required** collateral for the cluster, so only the portion of the cluster balance exceeding the Liquidation Collateral can be used to calculate the Operational Runway.

![Operational Runway](/img/cluster-balance-1.avif)

Since operator and network fees are dynamic, the required [**Liquidation Collateral**](../../learn/protocol-overview/tokenomics/liquidations.md#liquidation-collateral) could vary between different clusters. To calculate how much funding is needed as collateral for a cluster, please refer to the [Liquidations page](../../learn/protocol-overview/tokenomics/liquidations.md#liquidators).

### Cluster Balance Formula

As explained in the documentation page related to [Payments](../../learn/protocol-overview/tokenomics/payments.md), the cluster balance is affected by three factors, mainly:

* Network fee
* Operator fees
* Number of validators

And to keep track of their changes over time, the concept of [Indexes](../../learn/protocol-overview/tokenomics/payments.md#indexes) have been introduced. This, in turn, means that indexes for network fees and operator fees are necessary to calculate the cluster balance, as well as [the "snapshot" of the cluster status](/developers/tools/ssv-subgraph/subgraph-examples#cluster-snapshot), taken the last time this was updated (the cluster snapshot is also used in smart contract transactions).

#### Cluster balance

To calculate the updated cluster balance, given the cluster balance from most recent snapshot, you can use this formula:

$$
balance_n = balance_{snapshot} - (\Delta_{network\ fee} + \Delta_{operators\ fee}) * v_c
$$

Legend:

* $$balance_n$$ - cluster balance at block number `n`
* $$\Delta_{network\ fee}$$ - Change in network fees paid since the last snapshot
* $$\Delta_{operators\ fee}$$ - Change in network fees paid since the last snapshot
* $$balance_{snapshot}$$ - value of the cluster balance on its latest snapshot
* $$v_c$$ - Validator Count, the number of validators in the cluster

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

* $$Residual\;Balance$$ - Amount of SSV in the cluster balance, exceeding the Liquidation Collateral
* $$Burn\;Rate_{cluster}$$ - The rate at which a cluster spends (denominated in SSV tokens per block)

### Deposits

Deposits can be made to a cluster's balance to ensure the cluster avoids liquidation and to extend its operational runway.

### Withdrawals

Withdrawals allow users to remove any excess balance they have for capital efficiency. Users may not withdraw a cluster's liquidation collateral. The collateral can only be withdrawn only when off-boarding the cluster (by removing all validators in the cluster). This means that in order to maintain a validator’s operation, a user can only withdraw in the range of their runway.

