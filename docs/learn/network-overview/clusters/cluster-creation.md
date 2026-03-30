---
sidebar_position: 1
---

# Cluster Creation

### Operator Selection

Creating a cluster is the process of onboarding a validator to SSV Network. A cluster is the group of operators selected to manage that validator.

The complete operator registry can be accessed through the SSV Network [Web App](https://app.ssv.network), [Explorer](https://explorer.ssv.network), and [SSV API](https://api.ssv.network/documentation/).

The number of operators you select must be 3f+1 compatible, whereas f is the number of faulty operators that your cluster could endure (more operators, greater fault tolerance).

Supported cluster sizes:

| **Cluster Size (# of operators)** | **Fault Tolerance** |
| --------------------------------- | ------------------- |
| 4                                 | 1                   |
| 7                                 | 2                   |
| 10                                | 3                   |
| 13                                | 4                   |

Stakers have the freedom to select and customize the group of operators that will manage their validator cluster according to their own preferences:

Factors to consider in cluster formation:

* **Reputation** - SSV Network is permissionless, so anyone can join as an operator. Operators range from professional infrastructure providers to home operators running their own setups. The DAO maintains a curated list of [Verified Operators](/learn/network-overview/operators/verified-operators) to help stakers distinguish between them.
* **Performance** - Current and historical [performance](/learn/network-overview/performance) is a strong indicator of operator reliability. Stakers can track operator performance through the SSV Network [Explorer](https://explorer.ssv.network) to evaluate track record and monitor their validators over time.
* **Diversification** - Diversity in the cluster’s tech stack improves resilience to hardware and software failures, allowing distributed validators to remain operational even if one component fails. To reduce single points of failure, a staker should aim for operator diversification across execution and consensus clients, cloud providers, and geographies.
* **MEV** - Each time a validator is assigned a block proposal, one operator in its cluster is selected to lead the proposal. Because MEV-enabled blocks are broadcast through relays, only operators that support the relay chosen by the leader can broadcast that block. Therefore, it is in a staker’s interest to form clusters with operators that have stronger overlap in the relays they support:
  * **Full Relay Correlation**: When all operator nodes support the same relays, every node would broadcast the block, enhancing liveness beyond the industry standard.
  * **Partial Relay Correlation**: In cases where overlap is lacking, only operator nodes supporting the relay chosen by the operator leading the proposal will broadcast the proposal.
  * **No MEV Support**: In instances where a non-MEV operator leads the proposal of the block, the proposal would proceed but without any MEV rewards (vanilla block).

### Operational Costs

The associated costs for running validators on SSV Network are determined by **operator fees** and **network fees**, paid in **native ETH**.

With the network embracing a free-market approach, where operators set their own fees, the cost for each validator will vary based on its operator setup.

In addition to fees, there is a minimum balance requirement, known as [liquidation collateral](/learn/network-overview/clusters/cluster-balance), that must be deposited for validators run through the network.

### Validator Funding

To cover validator operational costs, your cluster must be funded with an appropriate amount of **ETH** (see [Cluster Balance](/learn/network-overview/clusters/cluster-balance)).

Funding can be made at any time to the cluster's balance, but when onboarding the first validator to a new cluster, the initial funding must be provided with the registration transaction.

To calculate how much ETH funding is needed to run a validator in a 4-operator cluster for a given **operation period** and the required **liquidation collateral**:

$$
Required\;Funding_{ETH} = (O1_{fee} + O2_{fee} + O3_{fee} + O4_{fee} + N_{fee}) * (Period + LTP)
$$

Legend:
* $$O1_{fee}$$ to $$O4_{fee}$$ - operator fee (ETH per block)
* $$N_{fee}$$ - network fee (ETH per block)
* $$Period$$ - desired operation period (blocks)
* $$LTP$$ - liquidation threshold period (blocks)

### Single Validator Funding Example (ETH Cluster)

Assuming a 4-operator cluster, 7,200 blocks per day, **operator fees** of 0.0000001 ETH per block for each operator, and a **network fee** of 0.00000005 ETH per block, with a **liquidation period** of 30 days, the **required funding** for a 365-day **operation period** would be:

$$
ETH_{required} = ((4 \times 0.0000001) + 0.00000005) \times 7,200 \times (365 + 30)
$$

$$
ETH_{required} \approx 1.278 ETH
$$

:::info Operational Runway
Maintaining your cluster's operational runway is essential. You can always deposit more ETH to extend your runway or withdraw excess balance as needed.
:::
