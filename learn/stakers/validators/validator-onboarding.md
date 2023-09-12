# Validator Onboarding

Distributed validators are managed within Clusters - the group of operators that were selected to operate them.

To run a validator through the SSV network, a user must distribute their validator key to their selected cluster and register it to the network’s smart contract.

This can be done via the [web app ](https://app.ssv.network/)interface or through the smart contracts and developer tools (see [get started](../../../developers/get-started.md) guide).

#### Operators Selection <a href="#_jm9n7m464k0" id="_jm9n7m464k0"></a>

To form your cluster, you must select your preferred group of operators to manage it.

The complete operator registry can be accessed through the ssv.network’s [webapp](http://app.ssv.network), [explorer](http://explorer.ssv.network) and [SSV API](https://api.ssv.network/documentation/).

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

* **Reputation** - ssv.network is permissionless network that is open to anyone to join as an operator. Operators can range from professional companies with proven experience in node operations all the way to home operators who are running their own infrastructure. The DAO maintains a curated-list of operators called “Verified Operators” to help stakers distinguish between them.
* **Performance** -  current and historical [performance](../../performance/) of operators is a great indicator of operators reliability. Stakers can track operators performance through the ssv.network’s [explorer](http://explorer.ssv.network) to evaluate operators track record and to consistently monitor their validators.
* **Diversification** - diversity of the cluster's tech stack enhances resilience to individual hardware and software failures, allowing distributed validators to remain operational even if a component fails. To mitigate single point of failures, a staker should strive to have operator diversification across various aspects such as execution and consensus clients, cloud providers, and geolocation.
* **MEV** - every time a validator is tasked with a block proposal, one operator from its cluster is chosen to assemble the block. Given that MEV-enabled blocks are broadcasted via relays, only those operators who support the selected relay can broadcast it to the network. This implies that the more overlap there is in the relays supported by the operators in a cluster, the more operators can broadcast the block proposal, thereby enhancing the liveness of the proposal duty throughout the Ethereum network.
  * In situations where there's no overlap, only the operator proposing the block would broadcast the duty (the standard liveness of non-DVT validators).
  * In instances where some operators of the cluster don't enable MEV at all (when MEV-enabled operators count is below quorum), consensus may not be reached for the duty, potentially leading to the block proposal not being executed at all.
  * In cases where the block is assembled by a non-MEV operator, the proposal would be executed, but without any MEV rewards.

#### Operational Costs <a href="#_jm9n7m464k0" id="_jm9n7m464k0"></a>

The associated costs for running validators on the ssv network are determined by **operator fees** and **network fees**.

With the network embracing a free-market approach, where operators set their own fees, the cost for each validator will vary based on its operator setup.

In addition to fees, there’s a minimum balance requirement, known as [liquidation collateral](../clusters/cluster-balance.md#\_p0nuzyj2dr8h), that has to be deposited for each validator a user runs through the network.

#### Validator Funding <a href="#_kumpogh364aq" id="_kumpogh364aq"></a>

To carry validators operational costs, the validator's cluster must be funded with an appropriate amount of SSV (see [Cluster Balance](../clusters/cluster-balance.md)).

Funding can be made at any time to the cluster’s balance (see [Deposits](../clusters/cluster-balance.md#\_2a5wkxdov2fm)), but in case the first validator is onboarded to a cluster, the initial funding must be carried with its registration.

To calculate how much funding is needed to run a validator within its cluster according to a certain **operation period** and the required **liquidation collateral**:

$$
Required Funding=(O1_{fee}+O2_{fee}+O3_{fee} +O4_{fee}+N_{fee})*( Period + LTP)
$$

* Legend
  * $$O1\dots4_{fee}$$ - operator fee ($SSV per block)
  * $$N_{fee}$$- network fee ($SSV per block)
  * $$Period$$- desired operation period (blocks)
  * $$LTP$$- liquidation threshold period (blocks)

\
Single Validator Funding Example

Assuming there are 100 blocks per day, **operators and network fee** of 0.001 SSV (per block) and a **liquidation period** of 1 month, the **required funding** for 1 year of **operation period** would be:

197.5 SSV = ((0.001 + 0.001 + 0.001 + 0.001 + 0.001) \* 100 \* (365+30))

{% hint style="info" %}
Please note that maintaining your cluster’s operational runway is essential and a user could always deposit more balance to their account, or withdraw as they see fit.
{% endhint %}
