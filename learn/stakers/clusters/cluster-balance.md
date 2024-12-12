# Cluster Balance

With the SSV token serving as the payment layer of the network, the cash flow between stakers and operators is facilitated by maintaining an SSV balance in a cluster.The cluster balance needs to be kept in check to ensure the continued operation of its validator(s) and below it is explained how to calculate the balance of a cluster at a specific blockchain block.

It is important to be aware that the cluster balance must **always be higher than the required** collateral for the cluster, so only the portion of the cluster balance exceeding the Liquidation Collateral can be used to calculate the Operational Runway, as shown in the picture below:

![](<../../../.gitbook/assets/0 (1).png>)

Since operator and network fees are dynamic, the required [**Liquidation Collateral**](../../protocol-overview/tokenomics/liquidations.md#liquidation-collateral) could vary between different clusters. To calculate how much funding is needed as collateral for a cluster, please refer to the [Liquidations page](../../protocol-overview/tokenomics/liquidations.md#liquidators).

### Cluster Balance Formula

As explained in the documentation page related to [Payments](../../protocol-overview/tokenomics/payments.md), the cluster balance is affected by three factors, mainly:

* Network fee
* Operator fees
* Number of validators

And to keep track of their changes over time, the concept of [Indexes](../../protocol-overview/tokenomics/payments.md#indexes) have been introduced. This, in turn, means that indexes for network fees and operator fees are necessary to calculate the cluster balance, as well as [the "snapshot" of the cluster status](../../../developers/tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), taken the last time this was updated (the cluster snapshot is also used in smart contract transactions).

#### Cluster balance

To calculate the updated cluster balance, given the cluster balance from most recent snapshot, you can use this formula:

$$
balance_n = balance_{snapshot}-(\Delta_{network\;fee}+\Delta_{operators\;fee})*v_c
$$

Legend:

* $$balance_n$$- cluster balance at block number `n`
* $$\Delta_{network\;fee}$$ - Change in network fees paid since the last snapshot (see below)
* $$\Delta_{operator\;fee}$$ - Change in network fees paid since the last snapshot (see below)
* $$balance_{snapshot}$$ - value of the cluster balance on its latest snapshot ([see here](../../../developers/tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot))
* $$v_c$$ - Validator Count, the number of validators in the cluster

#### Network fees delta

Below is the formula used to calculate the network fees owed since the last cluster snapshot:

$$
\Delta_{network\;fee} = nfi_p+(b-nfb_{p})*nf-nfi_c
$$

Legend:

* $$\Delta_{network\;fee}$$ - Change in network fees paid since the last snapshot
* $$nfi_p$$ - Protocol Network Fee Index, the latest protocol-wide network fee index ([see here](../../../learn/protocol-overview/tokenomics/payments.md#indexes))
* $$b$$ - Block number of the latest blockchain block, for which the cluster balance needs to be calculated
* $$nf$$ - The current network fee
* $$nfb_{p}$$ - The block number at which the Protocol Network Fee Index $$nfi_p$$ was taken
* $$nfi_c$$ - Cluster Network Fee Index, the latest network fee index for the given cluster ([see here](../../../developers/tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot))

#### Operators fees delta

Similarly, below is the formula used to calculate the operators fees owed since the last cluster snapshot:

$$
\Delta_{operators\;fee} = \sum(ofi_{n}+(b-ofb_{n})*of_{n})-ofi_c
$$

Legend (the $$_n$$ nomenclature designates the $$nth$$ operator in this cluster):

* $$\Delta_{operator\;fee}$$ - Change in operator fees paid since the last snapshot
* $$ofi_n$$ - Operator Network Fee Index, the latest protocol-wide operator fee index ([see here](../../../learn/protocol-overview/tokenomics/payments.md#indexes))
* $$b$$ - Block number of the latest blockchain block, for which the cluster balance needs to be calculated
* $$ofb_n$$ - The block number at which the Operator Network Fee Index $$ofi_n$$ was taken
* $$of_{n}$$ - The current operator fee, for the $$nth$$ operator in this cluster
* $$ofi_c$$ - Cluster Index, the latest index for the given cluster ([see here](../../../developers/tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot))

Have a look at how to collect the necessary data to calculate the balance on the [Subgraph Examples page](../../../developers/tools/ssv-subgraph/subgraph-examples.md#cluster-balance-values).

A programmatic example of calculating the cluster balance has been added to the [Code examples](../../../developers/code-examples-and-snippets/cluster-balance-script.md) section.

### Operational Runway <a href="#id-4d33wiukw2ss" id="id-4d33wiukw2ss"></a>

Any additional funds added to the cluster balance on top of the required collateral will prolong the operation of its validators and are usually referred to as Operational Runway. Users can manage their clusters balance by depositing or withdrawing funds at will, knowing that all extra funds added to the cluster balance will increase its operational runway.

To calculate the effects of deposits and withdrawals on your cluster’s operational runway:

$$
Operational\;Runway =Residual\;Balance/ Burn\;Rate_{cluster}
$$

* Legend
  * $$Residual\;Balance$$ - Amount of $SSV in the cluster balance, exceeding the [Liquidation Collateral](../../protocol-overview/tokenomics/liquidations.md#liquidation-collateral)
  * $$Burn\;Rate_{cluster}$$ - the rate at which a cluster spends (denominated in _SSV tokens per block,_ [see here](../../protocol-overview/tokenomics/liquidations.md#burn-rate)).

### Deposits <a href="#id-2a5wkxdov2fm" id="id-2a5wkxdov2fm"></a>

Deposits can be made to a cluster's balance to ensure the cluster avoids liquidation and to extend its operational runway.

### Withdrawals <a href="#geljnqrbr73h" id="geljnqrbr73h"></a>

Withdrawals allow users to remove any excess balance they have for capital efficiency. Users may not withdraw a cluster's liquidation collateral. The collateral can only be withdrawn only when off-boarding the cluster (by removing all validators in the cluster). This means that in order to maintain a validator’s operation, a user can only withdraw in the range of their runway.

