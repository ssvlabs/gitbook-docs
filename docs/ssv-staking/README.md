---
sidebar_position: 1
---

# SSV Staking

SSV Staking enables SSV token holders to support the network's oracle infrastructure and get rewards. When you stake SSV, you receive cSSV (Compound SSV) tokens and can continue to participate in SSV Network governance processes.

## Overview

SSV Network has transitioned to a model where network fees are paid in ETH, creating a sustainable revenue stream that flows directly to SSV stakers. By staking your SSV tokens, you:

- **Support the network** - Your staked weight contributes to oracle consensus for effective balance reporting
- **Maintain liquidity** - Receive transferable cSSV tokens that represent your staked position
- **Retain flexibility** - Claim rewards anytime and unstake with a 7-day cooldown period

<!-- TODO: Add screenshot - SSV Staking Overview -->

## How It Works

### The Staking Flow

```
Stake SSV → Receive cSSV → Claim Rewards → Unstake (7-day cooldown)
```

1. **Stake SSV tokens** - Deposit your SSV tokens into the staking contract
2. **Receive cSSV** - Get cSSV tokens representing your staked position (1:1 initially)
3. **Claim rewards** - Withdraw your accumulated ETH rewards anytime
4. **Unstake** - Initiate unstaking with a 7-day cooldown, then withdraw SSV + remaining rewards

### ETH Fees Flow

Network fees flow from clusters to SSV stakers through the following mechanism:

```
ETH Clusters pay fees
        ↓
Network fee portion
        ↓
SSV Staking contract
        ↓
Distributed to cSSV holders
```

When clusters pay operator fees and network fees in ETH, a portion of these fees flows into the SSV Staking contract. These ETH rewards are distributed proportionally to all cSSV holders based on their share of the total staked SSV.

<!-- TODO: Add screenshot - ETH Reward Flow -->

## cSSV Token Mechanics

cSSV (Compound SSV) is a **non-rebasing**, **index-based** reward token that represents your staked SSV position.

### Key Properties

- **Non-rebasing**: Your cSSV balance stays constant - it doesn't automatically increase
- **Transferable**: cSSV is a standard ERC-20 token that can be transferred or used in DeFi
- **Separate rewards**: ETH rewards accrue separately and can be claimed independently
- **DeFi compatible**: Use cSSV in other protocols while earning staking rewards

### How Rewards Work

Unlike rebasing tokens where your balance increases, cSSV uses an **index-based reward model**:

1. Your cSSV balance remains fixed
2. The reward index increases as network fees flow in
3. Your claimable ETH = (cSSV balance) × (reward index increase)
4. Claim rewards anytime without affecting your cSSV balance

This model is based on Synthetix's StakingRewards.sol pattern and provides better composability with other DeFi protocols.

### Example

- You stake 1,000 SSV → Receive 1,000 cSSV
- Network earns 10 ETH in fees
- If you hold 1% of total cSSV, you can claim 0.1 ETH
- Your cSSV balance stays at 1,000
- You can claim rewards multiple times as fees continue to flow in

<!-- TODO: Add screenshot - cSSV Mechanics -->

## Oracle Delegation (v1)

When you stake SSV, your stake weight automatically contributes to the network's oracle system, which reports validator effective balances to the blockchain.

### Automatic Delegation

In v1, your staked weight is **automatically split equally** across all 4 permissioned oracles. This means:

- No manual delegation required
- All stakers participate in oracle consensus
- 75% quorum required for balance commitments
- Your weight remains active during the unstaking cooldown period

### Future Versions

Future versions of SSV Staking will introduce:
- Variable number of oracles
- Staker-chosen delegation
- Performance-based oracle rewards
- Entry/exit queues

## Unstaking Process

Unstaking SSV involves a **7-day cooldown period** to maintain protocol stability:

| Step | Duration | Details |
|------|----------|---------|
| **Initiate Unstake** | Immediate | Call unstake function, cooldown begins |
| **Cooldown Period** | 7 days | Your weight remains active for oracle voting |
| **Rewards Stop** | During cooldown | No new rewards accrue after initiating unstake |
| **Withdraw** | After cooldown | Receive SSV + any unclaimed ETH rewards |

### Why a Cooldown Period?

The 7-day cooldown serves several purposes:

1. **Oracle stability** - Prevents rapid weight changes that could affect consensus
2. **Protocol security** - Maintains voting power during critical oracle reporting periods
3. **Future governance** - Prepares for future governance where staked SSV may serve as protocol backstop

⚠️ **Important**: Rewards stop accruing immediately when you initiate unstaking, even though your oracle voting weight remains active during the cooldown.

## Getting Started

Ready to start staking? Follow these guides:

- [Stake SSV](stake-ssv.md) - Step-by-step guide to stake your SSV tokens
- [Claim Rewards](claim-rewards.md) - How to claim your accumulated ETH rewards
- [Unstake SSV](unstake-ssv.md) - How to unstake your SSV tokens
- [FAQ](faq.md) - Frequently asked questions
