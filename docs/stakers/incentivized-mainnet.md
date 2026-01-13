---
description: Boosted APR
sidebar_position: 2
---

#  Boosted APR

Our tiered incentive program fosters accelerated usage of SSV network via boosted rewards. Each validator staked on SSV Mainnet network is eligible for claiming Incentives, which boosts APR.

## How to claim rewards
You can find technical details about the program below. If you are aware of the program, feel free to claim the rewards on any of the following pages:
- https://www.ssvrewards.com/
- https://ssvscan.io/claim/
- https://monitorssv.xyz/claim

📜 **Mainnet Rewards Distributor Contract Address:**  
`0xe16d6138B1D2aD4fD6603ACdb329ad1A6cD26D9f`  
Refer to the documentation for details: [SSV Smart Contracts Docs](/developers/smart-contracts#ethereum-mainnet)  

## What is Incentivized Mainnet Program

The Incentivized Mainnet Program (IMP) [is an initiative from SSV Network DAO](https://forum.ssv.network/t/dip-34-incentivized-mainnet-program-revision-3/1908), made available by the SSV Foundation, designed to accelerate the adoption of Distributed Validator Technology (DVT) by rewarding participants with SSV Tokens who operate validators on the SSV Network. Launched in October 2023, the program offers tiered rewards to incentivize early and continued participation.

You can find more details on [the IMP FAQ page](https://ssv.network/incentivized-mainnet-faq).

### Reward Tiers
The program tiers and corresponding APR boosts is structured according to the effective balance, as opposed to the number of validators.

An Online IM reward calculator can be [found on this page](https://ssv.network/incentivized-mainnet).

| Tier (Effective Balance)  | APR Boost |
|---------------------------|-----------|
| 1,440,032 - 3,200,000 ETH | 10%       |
| 3,200,032 - 4,000,000 ETH | 7.5%      |
| 4,000,032 - 4,800,000 ETH | 6%        |
| 4,800,032 - 5,600,000 ETH | 5%        |
| 5,600,032 - 6,400,000 ETH | 3.5%      |

### Reward Distribution Flow
This rewards distribution flow is repeated monthly. Usually, the rewards are distributed around the middle of the following month:
1. A snapshot is taken of all active validators on the SSV Network.
2. After the snapshot is finished, calculations are made and published on the SSV governance forum.
3. A merkle root is published on-chain which enables eligible validators to claim their rewards.
4. After the merkle root is updated on-chain, rewards can be claimed.

Updates are posted every month in this SSV Governance Forum thread:
[Incentivized Mainnet Distribution Details](https://forum.ssv.network/t/incentivized-mainnet-program-distributions/).