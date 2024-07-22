# Cluster Balance

With the SSV token serving as the payment layer of the network, the cash flow between stakers and operators is facilitated by maintaining an SSV balance in a cluster.

A clusters balance consists of two essential parts: **liquidation collateral threshold** and **operational runway**:

![](<../../../.gitbook/assets/0 (1).png>)

#### Liquidation Threshold <a href="#p0nuzyj2dr8h" id="p0nuzyj2dr8h"></a>

A cluster must contain collateral to ensure it would always have sufficient balance to cover its operational costs (learn more on liquidations). If the operational runway has been depleted - due to ongoing payments made to operators or withdrawals - and the cluster balance falls below the liquidation collateral threshold, that cluster becomes eligible for liquidation.

* To calculate how much funding is needed as collateral for each cluster:

$$
Liquidation Threshold=V* (O1_{fee}+O2_{fee}+O3_{fee} +O4_{fee}+N_{fee})*LTP
$$

* Legend
  * $$O1\dots4_{fee}$$ - operator fee ($SSV per block)
  * $$N_{fee}$$- network fee ($SSV per block)
  * $$LTP$$- liquidation threshold period (blocks)
  * $$V$$- # of validators that the cluster manages

{% hint style="warning" %}
Regardless of the calculated Liquidation Threshold, the cluster balance can **never drop below** the `Minimum Liquidation Collateral`, which is a fixed constant, set by the SSV DAO and accessible through the [SSV Network Views smart contract](../../../developers/smart-contracts/ssvnetworkviews.md#getminimumliquidationcollateral).
{% endhint %}

#### Operational Runway <a href="#id-4d33wiukw2ss" id="id-4d33wiukw2ss"></a>

The operational runway is any additional funds added to the cluster balance that prolongs the operation of its validators. This means that all extra funds added to the cluster balance on top of the required collateral will increase its operational runway.

* To calculate a clusters operational runway (per block):

$$
Operational Runway_{cluster} ={(Balance_{cluster} -LiquidationCollateral_{cluster}) \above {1pt} V * (O1_{fee}+O2_{fee}+O3_{fee} +O4_{fee}+N_{fee})}
$$

* Legend
  * $$O1\dots4_{fee}$$ - operator fee ($SSV per block)
  * $$N_{fee}$$- network fee ($SSV per block)
  * $$V$$- # of validators that the cluster manages

Since operator and network fees are dynamic, the required **liquidation collateral** and **operational runway** could vary between different clusters.

The cluster balance needs to be kept in check to ensure the continued operation of its validator(s). To manage cluster balances, users can deposit or withdraw funds at will.

#### Deposits <a href="#id-2a5wkxdov2fm" id="id-2a5wkxdov2fm"></a>

Deposits can be made to a cluster's balance to ensure the cluster avoids liquidation and to extend its operational runway.

#### Withdrawals <a href="#geljnqrbr73h" id="geljnqrbr73h"></a>

Withdrawals allow users to remove any excess balance they have for capital efficiency. Users may not withdraw a cluster's liquidation collateral. The collateral can only be withdrawn only when off-boarding the cluster (by removing all validators in the cluster). This means that in order to maintain a validator’s operation, a user can only withdraw in the range of their runway.

* To calculate the effects of deposits and withdrawals on your cluster’s operational runway:

$$
Runway Change =Amount / Burn Rate_{cluster}
$$

* Legend
  * $$Amount$$- deposited or withdrawn $SSV
  * $$Burn Rate$$- the rate at which a cluster spends $SSV per block ([see calculation](../../protocol-overview/tokenomics/liquidations.md#burn-rate)).
