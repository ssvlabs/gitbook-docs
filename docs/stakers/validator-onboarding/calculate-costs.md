---
description: Calculate Costs
sidebar_position: 3
---

# Calculate Costs

SSV Network uses ETH-based fees. Before you register validators, fund the cluster with enough ETH to cover:
- **Runway balance**: the ETH needed to pay network and operator fees for your chosen time period
- **Liquidation collateral**: an extra 7 days of fees kept as a safety buffer
    
The collateral is fully refundable. It can be withdrawn after the validator is offboarded.

For more context, see:
- [Cluster Balance](/learn/network-overview/clusters/cluster-balance)
- [Liquidations](/learn/tokenomics/liquidations)

## Example cost table

| Aggregate Effective Balance | Annual Fee per 32 ETH | Annual Total | Monthly Runway  | Liquidation Collateral  | Example Initial Funding Target |
|---|---:|---:|---:|---:|---:|
| 32,000 | 0.00928 | 9.28 | 0.7734 | 0.178 | 0.9514 |
| 16,000 | 0.00928 | 4.64 | 0.3867 | 0.089 | 0.4757 |

:::info Incentivized Mainnet
DAO incentives may partially be applied to cover network fee. See [Incentivized Mainnet Rewards](/stakers/incentivized-mainnet) and the [Incentive Calculator](https://docs.google.com/spreadsheets/d/1EmsAuwfXtnu_2_y6vjMKrXWpLISzbWL8kZOdJznKEUU/edit?gid=0#gid=0) for details.
:::

## Next Steps

When your key shares and ETH are ready, continue to [Register Validators](./register-validators).
