---
sidebar_position: 1
---

# SSV Staking

SSV Staking enables SSV token holders to support the network's oracle infrastructure and get rewards. When you stake SSV, you receive cSSV (Compound SSV) tokens and can continue to participate in SSV Network governance processes. While you hold cSSV, rewards accrue to the wallet holding cSSV and can be claimed at any time without the need to unstake SSV.

## Overview

- **Support the network** - Your staked weight contributes to [oracle consensus](/learn/introduction/oracles.md) for effective balance reporting
- **Maintain liquidity** - Receive transferable cSSV tokens that represent your staked position
- **Retain flexibility** - Claim rewards anytime and unstake with a 7-day cooldown period

<!-- TODO: Add screenshot - SSV Staking Overview -->

### Staking Flow

```
Stake SSV and Delegate → Receive cSSV → Claim Rewards → Unstake (7-day cooldown) → Withdraw
```

1. **Stake SSV and Delegate** - Deposit your SSV tokens into the staking contract, delegating voting power to [the oracles](/learn/introduction/oracles.md)
2. **Receive cSSV** - Get cSSV tokens representing your staked position (1:1 initially)
3. **Claim rewards** - Withdraw your accumulated rewards anytime
4. **Unstake** - Initiate unstaking with a 7-day cooldown
5. **Withdraw** - Receive SSV and remaining rewards

When clusters pay operator fees and network fees in ETH, a portion of these fees flows into the SSV Staking contract. These are distributed proportionally to all cSSV holders based on their share of the total staked SSV.

## cSSV Token Mechanics

cSSV (Compound SSV) is a **non-rebasing**, **index-based** reward token that represents your staked SSV position.

<!-- TODO: Add screenshot - cSSV Mechanics -->

### Key Properties

- **Non-rebasing**: Your cSSV balance stays constant - it doesn't automatically increase
- **Transferable**: cSSV is a standard ERC-20 token that can be transferred or used in DeFi
- **Separate rewards**: rewards accrue separately and can be claimed independently
- **DeFi compatible**: Use cSSV in other protocols while earning staking rewards

### How Rewards Work

Unlike rebasing tokens where your balance increases, cSSV uses an **index-based reward model**:

1. Your cSSV balance remains fixed
2. The reward index increases as network fees flow in
3. Your claimable ETH = (cSSV balance) × (reward index increase)
4. Claim rewards anytime without affecting your cSSV balance

Network fees flow from clusters to SSV stakers rewards through the following mechanism:

```
ETH Clusters pay fees
        ↓
Network fee portion
        ↓
SSV Staking contract
        ↓
Distributed to cSSV holders
```

<!-- TODO: Add screenshot - ETH Reward Flow -->

## Oracle Delegation

When you stake SSV, your stake weight automatically contributes to the network's oracle system, which reports validator effective balances to the blockchain. Your stake weight remains active during the unstaking cooldown period.

## Unstaking Process

Unstaking SSV involves a **7-day cooldown period** to maintain protocol stability:

| Step | Duration | Details |
|------|----------|---------|
| **Initiate Unstake** | Immediate | Call unstake function, cooldown begins |
| **Cooldown Period** | 7 days | Your weight remains active for oracle voting |
| **Rewards Stop** | During cooldown | No new rewards accrue after initiating unstake |
| **Withdraw** | After cooldown | Receive SSV + any unclaimed rewards |

## Getting Started

Ready to start staking? Follow these guides:

- [Stake SSV](stake-ssv.md) - Step-by-step guide to stake your SSV tokens
- [Claim Rewards](claim-rewards.md) - How to claim your accumulated rewards
- [Unstake SSV](unstake-ssv.md) - How to unstake your SSV tokens
- [FAQ](faq.md) - Frequently asked questions
