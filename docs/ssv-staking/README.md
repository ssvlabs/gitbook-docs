---
sidebar_position: 1
---

# SSV Staking

SSV Staking allows SSV token holders to support the network's oracle infrastructure and get rewards. 

## Overview
By staking SSV, your staked weight contributes to oracle consensus for effective balance reporting. In return, you receive transferable cSSV tokens that represent your staked position, while your voting power is automatically delegated to the oracles. You can claim rewards at any time and unstake with a 7-day cooldown period.

<!-- TODO: Add screenshot - SSV Staking Overview -->

### Staking Flow

```
Stake SSV and Delegate → Receive cSSV → Claim Rewards → Unstake → Withdraw
```

1. **Stake SSV and Delegate** - Deposit SSV tokens into the staking contract, delegating voting power to [oracles](/learn/network-overview/oracles)
2. **Receive cSSV** - Receive cSSV tokens that represent staked position
3. **Claim rewards** - Claim your accumulated rewards at any time
4. **Unstake** - Start the unstaking process, which triggers a 7-day cooldown
5. **Withdraw** - After the cooldown, withdraw your SSV and any remaining rewards

When clusters pay operator fees and network fees in ETH, a portion of these fees flows into the SSV Staking contract. These fees are distributed proportionally to all cSSV holders based on their share of the total staked SSV.

## cSSV Token Mechanics

<!-- TODO: Add screenshot - cSSV Mechanics -->

### Key Properties
cSSV is non-rebasing, meaning your cSSV balance stays constant and does not automatically increase. It is transferable as a standard ERC-20 token and can be moved or used in DeFi. Rewards accrue based on the cSSV balance, so when cSSV is transferred, rewards stop accumulating for the sender. Rewards are calculated based on a reward index that reflects network fee inflows.

### Rewards flow

Rewards flow from network fees to SSV stakers through the following mechanism:

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

When you stake SSV, your stake weight is automatically delegated to the network's oracle system. Your stake weight remains active during the unstaking cooldown period.

Oracles report validator effective balances to the blockchain. Check out [the Effective Balance Oracles page](/learn/network-overview/oracles) to learn more about their role in the network.

## Getting Started

Ready to start staking? Follow these guides:

- [Stake SSV](stake-ssv) - Step-by-step guide to stake your SSV tokens
- [Claim Rewards](claim-rewards) - How to claim your accumulated rewards
- [Unstake SSV](unstake-ssv) - How to unstake your SSV tokens