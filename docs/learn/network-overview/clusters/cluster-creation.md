---
sidebar_position: 1
---

# Cluster Creation

### Operators Selection

To create a cluster means to onboard a new validator. Any cluster consists of a group of operators to manage the validators.

The complete operator registry can be accessed through the ssv.network’s [webapp](http://app.ssv.network), [explorer](http://explorer.ssv.network), and [SSV API](https://api.ssv.network/documentation/).

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

* **Reputation** - ssv.network is permissionless network that is open to anyone to join as an operator. Operators can range from professional companies with proven experience in node operations all the way to home operators who are running their own infrastructure. The DAO maintains a curated-list of operators called “[Verified Operators](/learn/network-overview/operators/verified-operators)” to help stakers distinguish between them.
* **Performance** -  current and historical [performance](/learn/network-overview/performance/) of operators is a great indicator of operators reliability. Stakers can track operators performance through the ssv.network’s [explorer](http://explorer.ssv.network) to evaluate operators track record and to consistently monitor their validators.
* **Diversification** - diversity of the cluster's tech stack enhances resilience to individual hardware and software failures, allowing distributed validators to remain operational even if a component fails. To mitigate single point of failures, a staker should strive to have operator diversification across various aspects such as execution and consensus clients, cloud providers, and geolocation.
* **MEV** - every time a validator is assigned a block proposal, one operator within its cluster is selected to lead the proposal of the block. Given that MEV-enabled blocks are broadcasted through relays, only operators supporting the relay chosen by the leader can broadcast it to the network. Therefore, it is in stakers best interest to form their validator cluster with operators that has greater correlation in the relays they support:
  * **Full Relay Correlation**: When all operator nodes support the same relays, every node would broadcast the block, enhancing liveness beyond the industry standard.
  * **Partial Relay Correlation**: In cases where overlap is lacking, only operator nodes supporting the relay chosen by the operator leading the proposal will broadcast the proposal.
  * **No MEV Support**: In instances where a non-MEV operator leads the proposal of the block, the proposal would proceed but without any MEV rewards (vanilla block).

### Operational Costs

The associated costs for running validators on the SSV network are determined by **operator fees** and **network fees**, paid in **native ETH**.

With the network embracing a free-market approach, where operators set their own fees, the cost for each validator will vary based on its operator setup.

In addition to fees, there's a minimum balance requirement, known as [liquidation collateral](../clusters/cluster-balance), that has to be deposited for each validator a user runs through the network.

### Validator Funding

To cover validator operational costs, your cluster must be funded with an appropriate amount of **ETH** (see [Cluster Balance](../clusters/cluster-balance.md)).

Funding can be made at any time to the cluster's balance, but when onboarding the first validator to a new cluster, the initial funding must be provided with the registration transaction.

To calculate how much ETH funding is needed to run a validator within its cluster according to a certain **operation period** and the required **liquidation collateral**:

$$
Required\;Funding_{ETH} = (O1_{fee} + O2_{fee} + O3_{fee} + O4_{fee} + N_{fee}) * (Period + LTP)
$$

Legend:
* $$O1_{fee}$$ to $$O4_{fee}$$ - operator fee (ETH per block)
* $$N_{fee}$$ - network fee (ETH per block)
* $$Period$$ - desired operation period (blocks)
* $$LTP$$ - liquidation threshold period (blocks)

### Single Validator Funding Example (ETH Cluster)

Assuming there are 7,200 blocks per day, **operator fees** of 0.0000001 ETH per block each, and a **network fee** of 0.00000005 ETH per block, with a **liquidation period** of 30 days, the **required funding** for 365 days of **operation period** would be:

$$
ETH_{required} = ((4 \times 0.0000001) + 0.00000005) \times 7,200 \times (365 + 30)
$$

$$
ETH_{required} \approx 1.278 ETH
$$

:::info Operational Runway
Maintaining your cluster's operational runway is essential. You can always deposit more ETH to extend your runway or withdraw excess balance as needed.
:::