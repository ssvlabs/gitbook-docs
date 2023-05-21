# Validator Onboarding

Distributed validators are managed within Clusters - the group of operators that were selected to operate them.

To run a validator through the SSV network, a user must distribute their validator key to their selected cluster and register it to the network’s smart contract.

This can be done via the [web app ](https://app.ssv.network/)interface or through the smart contracts and developer tools (see [get started](../../../developers/get-started.md) guide).

#### Operational Costs <a href="#_jm9n7m464k0" id="_jm9n7m464k0"></a>

The associated costs for running validators on the ssv network are determined by **operator fees** and **network fees**.

With the network embracing a free-market approach, where operators set their own fees, the cost for each validator will vary based on its operator setup.

In addition to fees, there’s a minimum balance requirement, known as [liquidation collateral](../clusters/cluster-balance.md#\_p0nuzyj2dr8h), that has to be deposited for each validator a user runs through the network.

#### Validator Funding <a href="#_kumpogh364aq" id="_kumpogh364aq"></a>

To carry validators operational costs, the validator's cluster must be funded with an appropriate amount of SSV (see [Cluster Balance](../clusters/cluster-balance.md)).

Funding can be made at any time to the cluster’s balance (see [Deposits](https://docs.google.com/document/d/10fQYx4jh-UDduGA89EBP1DdTEhYeb\_-mga05y9rLdVA/edit#heading=h.2a5wkxdov2fm)), but in case the first validator is onboarded to a cluster, the initial funding must be carried with its registration.

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
