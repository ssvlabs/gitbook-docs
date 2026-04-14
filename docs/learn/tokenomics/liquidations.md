---
description: Understanding liquidations in the SSV Network
sidebar_position: 3
---

# Liquidations

Liquidation exists to ensure operators are compensated for running validators and to prevent clusters from continuing to operate once their balance is no longer sufficient to cover ongoing costs.

To use SSV Network, stakers must deposit enough ETH into their cluster balance, proportional to the effective balance of their validators. The required protected portion is called _liquidation collateral_, while the balance above it is usually called _operational runway_.

![Liquidation Collateral](/img/liquidation-1.avif)

### Liquidators

Since Ethereum transactions are not free and users cannot be charged after their cluster balance is depleted, the protocol needs an incentive mechanism to keep the system solvent.

This role is filled by [liquidators](/operators/liquidator-bot/), who monitor the network and flag clusters whose balances are no longer sufficient to cover their costs.

SSV Network rewards liquidators for the cost and risk of liquidating insolvent clusters. The collateral serves both as a penalty for the cluster and as a reward to the liquidator.

### Liquidation Collateral

The required collateral amount is the greater of two values: a fixed amount called the [_Minimum Liquidation Collateral_](#minimum-liquidation-collateral), and a dynamic amount derived from the fees paid by the cluster over a predefined period called the [_Liquidation Threshold Period_](#liquidation-threshold-period). Because fees vary across cluster compositions, this amount is calculated dynamically for each cluster.

Another way to explain it is to reverse the logic: _Clusters that drop below the liquidation collateral threshold are deemed **Liquidatable** and are at risk of being liquidated._

$$
liquidatable = balance<max(MLC, burn\;rate * LTP)
$$

#### Legend:
* $balance$ - cluster balance (denominated in ETH); see [Cluster Balance](/learn/network-overview/clusters/cluster-balance) for the exact calculation
* $burn\;rate$ - projected cluster expenses, also called the cluster burn rate (denominated in ETH per block)
* [$MLC$](#minimum-liquidation-collateral) - minimum liquidation collateral (denominated in ETH)
* [$LTP$](#liquidation-threshold-period) - liquidation threshold period (denominated in blocks)

Liquidated clusters will no longer be managed by operators and will become inactive to perform their duties; this could lead to severe penalties on the Beacon Chain.

### Minimum Liquidation Collateral

A fixed constant, set by the SSV DAO and accessible through the [SSVNetworkViews smart contract](/developers/smart-contracts/ssvnetworkviews#getminimumliquidationcollateral) or via the [Subgraph](/developers/api/subgraph-examples#dao-constants-and-protocol-network-fee-index).

### **Liquidation Threshold Period**

This is another fixed constant, set by the SSV DAO and accessible through the [SSVNetworkViews smart contract](/developers/smart-contracts/ssvnetworkviews#getliquidationthresholdperiod) or via the [Subgraph](/developers/api/subgraph-examples#dao-constants-and-protocol-network-fee-index). It can be defined as:

> The minimum period (in blocks) for a cluster to maintain sufficient balance before they can be liquidated

This duration is denominated in blocks and is intended to ensure the cluster maintains enough balance to cover operator and network costs for at least that period.

To understand how to calculate when a cluster can be considered _**Liquidatable**_, another concept needs to be introduced: a cluster's _Burn Rate_.

### Burn Rate

Because clusters vary in both validator effective balance and operator fees, the protocol estimates whether a cluster has enough balance for this period by calculating its burn rate.

The burn rate is the rate at which a cluster spends ETH per block, calculated as:

$$
burn\;rate = (\sum f_{o}  + f_{n}) * e_{b} / 32
$$

#### Legend:
  * $$f_o$$ - [operator fees](/learn/tokenomics/fees) - the fees of all operators in the cluster (denominated in _ETH per block_)
  * $$f_n$$ - [network fees](/learn/tokenomics/fees) - the fees owed to SSV Network (denominated in _ETH per block_)
  * $$e_b$$ - total effective balance of validators managed by the cluster

### Liquidation

Upon successful liquidation, the cluster will be flagged as "inactive". This will signal the operators managing the cluster's validators to cease their operation.

Clusters that have been liquidated can no longer use the network to run their validators until [reactivation](/learn/network-overview/clusters/reactivation).

### Liquidation Scenario Example

* Bob registers a single validator to the network that costs 0.04 ETH per year, with an initial cluster deposit of 0.05 ETH.
* Assuming a liquidation threshold period of one week (7 days) and an annual network fee of 0.01 ETH, Bob's liquidation collateral is 0.0009589 ETH: ((0.04 operator fee + 0.01 network fee) / 365 \* 7).
* After a year, based on his burn rate of 0.00013699 ETH/day ((0.04 operator fee + 0.01 network fee) / 365), Bob's account falls below the liquidation threshold balance.
* Alice, acting as a liquidator, monitors the network and flags Bob's cluster for liquidation.
* The protocol confirms that Bob's account is insolvent and liquidates his cluster.
* Bob's cluster is marked inactive, and the remaining balance of 0.0009589 ETH is transferred to Alice as a liquidation reward.
* Bob's validator operators see that the cluster has been marked inactive and stop operating his validator on the Beacon Chain.
* Bob later deposits another 0.00506849 ETH, giving the cluster operational runway for another month, and reactivates it.
