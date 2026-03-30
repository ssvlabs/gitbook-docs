---
sidebar_position: 1
---

# SSV Staking

SSV Staking lets SSV token holders support SSV Network's oracle infrastructure and earn rewards.

## Overview
When you stake SSV, your staked weight contributes to oracle consensus for effective balance reporting in SSV Network. In return, you receive transferable cSSV that represents your staking position, while the voting power is automatically delegated to the network's oracles. You can claim rewards at any time and unstake with a 7-day cooldown period.

<!-- TODO: Add screenshot - SSV Staking Overview -->

### Staking Flow

```
Stake SSV → Receive cSSV → Claim Rewards → Unstake → Withdraw
```

1. **Stake SSV** - Deposit SSV tokens into the staking contract. The voting power tied to your staked weight is delegated automatically to [oracles](/learn/network-overview/oracles)
2. **Receive cSSV** - Receive cSSV tokens that represent your staked position
3. **Claim rewards** - Claim your accumulated rewards at any time
4. **Unstake** - Start the unstaking process, which triggers a 7-day cooldown
5. **Withdraw** - After the cooldown, withdraw your SSV and any remaining rewards

When clusters pay operator fees and network fees in ETH, a portion of these fees flows into the SSV Staking contract. These fees are distributed proportionally to all cSSV holders based on their share of the total staked SSV.

## cSSV Token Mechanics

<!-- TODO: Add screenshot - cSSV Mechanics -->

### Key Properties
cSSV is non-rebasing, meaning your cSSV balance stays constant and does not automatically increase. Rewards are calculated using a reward index that reflects network fee inflows.

It is transferable as a standard ERC-20 token. Rewards accrue based on cSSV balance, so when cSSV is transferred, rewards stop accruing to the sender and start accruing to the receiver from that point onward. At the time of transfer, rewards are settled automatically for both sender and receiver.

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

When you stake SSV, the voting power tied to your staked weight is automatically delegated to the network's oracle system. Your staked weight remains active during the unstaking cooldown period.

Oracles report validator effective balances to the blockchain. Check out [the Effective Balance Oracles page](/learn/network-overview/oracles) to learn more about their role in the network.

## Getting Started

Ready to start staking? Follow these guides:

- [Stake SSV](stake-ssv) - Step-by-step guide to staking your SSV
- [Claim Rewards](claim-rewards) - How to claim accumulated rewards
- [Unstake SSV](unstake-ssv) - How to unstake your SSV
