# Reactivation

The following the educational context behind Cluster Reactivation. To see the actionable steps, please follow [this guide instead](../cluster-management/re-activating-a-cluster.md).

In order to reactivate a liquidated cluster, the user must supply the liquidation collateral required for their cluster. It is advised to deposit more than the reactivation amount so the cluster will have an operational runway. Users that only deposit the liquidation collateral may be liquidated soon after because they did not compensate for the operational cost of their cluster’s managed validator(s).

Once reactivated, the clusters’ validator(s) operation will continue. To calculate how much minimal funding (liquidation collateral) is needed to reactivate a cluster:

$$
reactivation\;Balance > BurnRate_{cluster} * LTP
$$

* Legend
  * $$Burn Rate$$ - the rate at which a cluster spends $SSV per block
  * $$LTP$$ - liquidation threshold period
