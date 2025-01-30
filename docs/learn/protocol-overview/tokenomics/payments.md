---
description: Understanding payments in the SSV Network
sidebar_position: 2
---

# Payments

Payments are facilitated by maintaining a cluster balance in the SSV network smart contract, which keeps a balance sheet for all clusters. All balances are in the unit of the SSV token itself.

Clusters are created when registering validators to the network are accessible and owned by the wallet address that transmitted the transaction. This means that the address is the cluster's owner, enabling it to manage its balance and its chosen validators/operators.

The most important concept behind cluster balance calculation is that it depends on essentially three factors:

* Network fee
* Operator fees
* Number of validators

And all of them can change at any point in time. So in order to maintain an up-to-date cluster balance, one would have to keep track of such factors, and the period for which they applied.

These are tracked using an essential component called an Index.

:::info
Cluster balance and payments are in a tight relation with two other essential concepts: liquidation collateral threshold, and operational runway, both explained [here](../../../stakers/clusters/cluster-balance.md).
:::

### Indexes

Indexes can be defined as:

> The aggregated sum of fees, valid until the last change that impacted fees calculation

These indexes are retroactively calculated every time there is an event that influences them. When a on-chain action occurs later on, the previous index and the amount of blocks since the last change can be used to calculate the new index. Indexes are a generic concept used for fee calculation.

It is important to note that indexes are calculated for both the [Network Fee](fees) and the [Operator Fees](fees), and these two indexes are calculated for each cluster, as well as "protocol-wide".

This means, whenever the Network Fee is changed by the SSV DAO, a new _**"protocol-wide" Network Fee Index**_ is calculated and stored in the smart contract. The same applies to the _**"protocol-wide" Operator Fee Index**_, when an operator changes their fee.

Similarly, whenever an event changes fee calculations for a cluster (e.g. adding or removing validators), the Network Fee Index and the sum of all Operator Fee Indexes, referred to as Cluster Index are calculated. These indexes are stored in a [Cluster Snapshot](../../../build/tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), which includes the [Cluster Balance](../../../stakers/clusters/cluster-balance.md), updated to the block where the cluster-changing event happened.

**Indexes are calculated using this generalized formula:**

$$
index_n =index_{n-1} + (b - b_{n-1}) * f
$$


#### Legend
  * $$index_p$$​ - previous index
  * $$b$$​ - current block
  * $$b_p$$​ - block number of previous index
  * $$f$$ - fee ($SSV per block) applicable to the block interval ("previous fee")

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

This process is repeated for any indexes that need calculated.
