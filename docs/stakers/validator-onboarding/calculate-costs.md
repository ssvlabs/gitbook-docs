---
description: Calculate Costs
sidebar_position: 3
---

# Calculate Costs

SSV Network requires stakers to pay fees in ETH. To successfully register validators, you must pre-fund your cluster to cover:
- **Runway balance** — the funds required to pay the network and operator fees over your chosen period.
- **Liquidation collateral** — an additional 7 days’ worth of fees, kept as a safety buffer.
- Collateral is fully refundable when validators are offboarded.

For detailed explanations, see:
- [SSV Docs: Cluster Balance](/learn/network-overview/clusters/cluster-balance)
- [SSV Docs: Liquidations](/learn/tokenomics/liquidations/)

## Example Costing Table
| Effective Balance | Annual Fee / 32 ETH | Annual Total | Monthly Runway | Liquidation Collateral | Initial Funding Target |
|------------|------------------------|--------------|----------------|------------------------|------------------------|
| 32,000 ETH      | 0.00928 ETH    | 9.28 ETH    | 0.7734 ETH     | 0.178 ETH    | 0.9514 ETH   |
| 16,000 ETH     | 0.00928 ETH   | 4.64 ETH    | 0.3867 ETH     | 0.089 ETH    | 0.4757 ETH    |


:::info Incentivized Mainnet
DAO incentives may partially be applied to cover network fees. Check the [Incentivized Mainnet Rewards section](/stakers/incentivized-mainnet.md) and the [Incentive Calculator](https://docs.google.com/spreadsheets/d/1EmsAuwfXtnu_2_y6vjMKrXWpLISzbWL8kZOdJznKEUU/edit?gid=0#gid=0) for additional details
:::

## Next Steps
Now that the keyshares and funds are prepared, it's time to [**Register your Validators**](./register-validators.md).