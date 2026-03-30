---
description: Understanding payments in the SSV Network
sidebar_position: 2
---

# Payments

Payments are handled through a cluster balance in the SSV Network smart contract, which keeps a balance sheet for all clusters. All payments are made in native ETH.

Clusters are created when validators are registered to the network. The wallet address that sends the transaction owns the cluster and can manage its balance, validators, and operators.

The most important concept behind cluster balance calculation is that it depends on essentially three factors:

* Network fee
* Operator fees
* Effective balance

All of these factors can change at any point in time. To maintain an up-to-date cluster balance, the system tracks these factors and the period for which they applied.

These factors are tracked using indexes.

:::info
Cluster balance and payments are in a tight relation with two other essential concepts: liquidation collateral threshold, and operational runway, both explained [here](/learn/network-overview/clusters/cluster-balance).
:::

### Indexes

Indexes can be defined as:

> The aggregated sum of fees, valid until the last change that impacted fees calculation

These indexes are updated retroactively whenever an event affects fee calculation. When a later on-chain action occurs, the previous index and the number of blocks since the last change are used to calculate the new index. Indexes are a general mechanism used for fee accounting.

Indexes are calculated for both [network fees](/learn/tokenomics/fees) and [operator fees](/learn/tokenomics/fees). They are tracked both per cluster and protocol-wide.

This means, whenever the Network Fee is changed by the SSV DAO, a new _**"protocol-wide" Network Fee Index**_ is calculated and stored in the smart contract. The same applies to the _**"protocol-wide" Operator Fee Index**_, when an operator changes their fee.

Similarly, whenever an event changes fee calculations for a cluster, such as adding or removing validators, the Network Fee Index and the sum of all Operator Fee Indexes, referred to as the Cluster Index, are calculated. These indexes are stored in a [Cluster Snapshot](/developers/api/subgraph-examples#cluster-snapshot), which includes the [cluster balance](/learn/network-overview/clusters/cluster-balance) updated to the block where the cluster-changing event occurred.

**Indexes are calculated using this generalized formula:**

$$
index_n =index_{n-1} + (b - b_{n-1}) * f
$$


#### Legend
  * $$index_p$$​ - previous index
  * $$b$$​ - current block
  * $$b_p$$​ - block number of previous index
  * $$f$$ - fee (ETH per block) applicable to the block interval ("previous fee")

### **Index Calculation Example**

![Alt text](/img/payments-calculation.avif)

In this example the cluster index is updated each time a new validator is registered.

When the first validator is registered, the index is 0, the previous block is 100, and the current block is 170. Let's say the fee is 5 for this example. This means we can put it into our formula:

$$
index =0 + (170 - 100) * 5
$$

Which gets us **350.** This process can be repeated for the next action, when a validator is removed.

$$
index =350 + (220 - 170) * 5
$$

Which gets us the second index, **600.** We can repeat the process once more to get the last index on the chart.

$$
index =600 + (300 - 220) * 5
$$

Which gets us our third index, 1100.

This process is repeated for any indexes that need to be calculated.
