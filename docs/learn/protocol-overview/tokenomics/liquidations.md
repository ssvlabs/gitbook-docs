---
description: Understanding liquidations in the SSV Network
sidebar_position: 3
---

# Liquidations

Since the payments between validators and operators are a zero-sum game (revenue of operators is the expenses of validators) and payments are paid as an ongoing process that is calculated in retrospect, there can't be a case where a user has insufficient funds in their balance to cover the validator's operational costs.

To use the ssv.network, stakers are required to deposit a sufficient balance of SSV tokens into their cluster balance proportional to the number of validator in the cluster itself. This balance is known as _Liquidation Collateral_, whereas the exceeding portion is usually referred to as Operational Runway.

![Liquidation Collateral](/img/liquidation-1.avif)

### Liquidators

Since transactions on Ethereum aren't free, and users can't incur additional costs if their account runs out of balance, an incentivization model is required to keep the system solvent.

This requires additional actors called [Liquidators](../../../operators/liquidator-bot/) to work behind the scenes to keep the system functioning by flagging users that have insufficient balances to carry their expenses.

The ssv network rewards liquidators for the costs and risks associated with liquidating insolvent clusters. The provided collateral serves as a liquidation penalty for clusters and a reward to liquidators for their efforts.

### Liquidation Collateral

The required collateral amount is the highest value between a fixed amount called [_Minimum Liquidation Collateral_](liquidations.md#minimum-liquidation-collateral), and a dynamic amount (derived from the fees paid by each cluster) which must be sufficient for a predefined period of time called the [_Liquidation Threshold Period_](liquidations.md#liquidation-threshold-period). Because fees can very between different cluster formations this amount is dynamically calculated for each cluster.

Another way to explain it is to reverse the logic: _Clusters that drop below the liquidation collateral threshold are deemed **Liquidatable** and are at risk of being liquidated._

$$
liquidatable = balance<max(MLC, burn\;rate * LTP)
$$

#### Legend:
* $balance$ - cluster balance, [please refer to this page for exact calculation](../../../stakers/clusters/cluster-balance.md)) (denominated in SSV tokens)
* $burn\;rate$ - projected cluster expenses (denominated in SSV tokens per block)
* [$MLC$](liquidations.md#minimum-liquidation-collateral) - minimum liquidation collateral (denominated in SSV tokens)
* [$LTP$](liquidations.md#liquidation-threshold-period) - liquidation threshold period (denominated in blocks)

Liquidated clusters will no longer be managed by operators and will become inactive to perform their duties; this could lead to severe penalties on the Beacon Chain.

### Minimum Liquidation Collateral

This is a fixed constant, set by the SSV DAO and accessible through the [SSV Network Views smart contract](../../../build/smart-contracts/ssvnetworkviews.md#getminimumliquidationcollateral) or via the [Subgraph](../../../build/tools/ssv-subgraph/subgraph-examples.md#dao-constants-and-protocol-network-fee-index).

### **Liquidation Threshold Period**

This is another fixed constant, set by the SSV DAO and accessible through the [SSV Network Views smart contract](../../../build/smart-contracts/ssvnetworkviews.md#getliquidationthresholdperiod-) or via the [Subgraph](../../../build/tools/ssv-subgraph/subgraph-examples.md#dao-constants-and-protocol-network-fee-index). This can be defined as:

> The minimum period (in blocks) for a cluster to maintain sufficient balance before they can be liquidated

This duration is denominated in blocks and is aimed at looking ahead and making sure the cluster maintains a sufficient balance to cover operator and costs for at least a certain period.

To understand how to calculate when a cluster can be considered _**Liquidatable**_, another concept needs to be introduced: a cluster's _Burn Rate_.

### Burn Rate

Considering that clusters vary in the number of validators and the fees paid to operators, to estimate whether an account has a sufficient balance to pay for this period is determined dynamically for each cluster by calculating its "burn rate".

The "burn rate" is the rate in which an cluster spends SSV per block, calculated by:

$$
burn\;rate = (\sum f_{o}  + f_{n}) * n_{v}
$$

#### Legend:
  * $$f_o$$ - [operator fees](fees.md) - the fees of all operators in the cluster (denominated in _SSV tokens per block_)
  * $$f_n$$ - [network fees](fees.md) - the fees owed to the ssv network (denominated in _SSV tokens per block_)
  * $$n_v$$ - number of validators managed by the cluster

### Liquidation

Upon successful liquidation, the cluster will be flagged as "inactive". This will signal the operators managing the cluster's validators to cease their operation.

Clusters that have been liquidated can no longer use the network to run their validators until [reactivation](../../../stakers/clusters/reactivation.md).

### Liquidation Scenario Example

* Bob has registered a single validator to the network that costs 345 SSV tokens per year with initial funding (deposit) of 395 SSV into his cluster.
* Assuming a liquidation threshold period of a month (30 days) and an annual network fee of 20 SSV, Bob's liquidation collateral is set to 30 SSV ((345 operator fee payment + 20 network fee payment) / 365 \* 30).
* After a year, as per his burn rate of 1 SSV/day ((345 operator fee payment + 20 network fee payment) / 365), Bob's account fell below the liquidation threshold balance.
* Alice (our liquidator) has been monitoring the network and has flagged Bob's cluster for liquidation.
* The protocol confirms that Bob's account is insolvent and liquidates his cluster.
* Bob's cluster has now been inactivated, and his remaining balance of 30 SSV is transferred to Alice as a liquidation reward.
* Bob's validator operators have seen that his cluster has been signaled as "inactive" and have now stopped operating his validator on the beacon chain.
* Devastated and ashamed by the loss, Bob decides to deposit another 60 SSV (which grants his cluster an operational runway for another month) to his balance and reactivates his cluster.
