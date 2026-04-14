---
description: Understanding cluster reactivation in SSV Network
sidebar_position: 3
---

# Reactivation

This page explains the concepts behind cluster reactivation. For actionable steps, see [this guide](/stakers/cluster-management/re-activating-a-cluster).

To reactivate a [liquidated cluster](/learn/tokenomics/liquidations), the cluster owner must restore the required liquidation collateral for that cluster. It is advisable to deposit more than the minimum reactivation amount so the cluster also has operational runway. If the cluster owner deposits only the liquidation collateral, the cluster may become liquidatable again soon after because ongoing validator costs are not covered beyond the threshold.

Once reactivated, the cluster’s validators resume operation. To calculate the minimum funding needed for reactivation:

$$
reactivation\;Balance > BurnRate_{cluster} * LTP
$$

#### Legend
  * [$$Burn Rate$$](/learn/network-overview/clusters/cluster-balance#burn-rate) - the rate at which a cluster spends ETH per block
  * $$LTP$$ - liquidation threshold period
