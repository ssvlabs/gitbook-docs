---
sidebar_position: 3
---

# Claim Rewards

Claiming rewards transfers your accrued ETH to your wallet without changing your staking position or cSSV balance.

## Prerequisites

- A wallet connected to the [SSV Network Web App](https://app.ssv.network/) that holds cSSV
- Sufficient ETH for gas fees

## Overview

As an SSV staker, you earn a share of network fees proportional to your share of the total staked SSV. Rewards behave as follows:

- Claim rewards at any time without changing your staking position.
- Rewards do not auto-compound. Your cSSV balance stays constant unless you stake more, transfer cSSV, or unstake.
- cSSV is transferable. When cSSV is transferred, rewards are settled automatically for both sender and receiver, then future rewards accrue to the receiver from the time of transfer.
- Reward claims are rounded to 100,000 wei precision. Any remainder below 100,000 wei stays in unclaimed rewards until it can be claimed later.

## Claiming Process

#### 1. Connect Wallet

Open the [SSV Network Web App](https://app.ssv.network/) and connect the wallet that holds your cSSV.

![Claim Rewards](/img/stake-ssv-1.png)

#### 2. View Unclaimed Rewards

Open the **Rewards** view to check your current unclaimed rewards.

![Claim Rewards](/img/staking-rewards-2.png)

#### 3. Initiate Claim

Select **Claim All**, review the claim details, and confirm the transaction in your wallet. Then wait for onchain confirmation.

![Claim Rewards](/img/staking-rewards-3.png)

Once confirmed, the claimable ETH is sent to your wallet. Your cSSV balance stays unchanged, your staking position remains active, and new rewards continue to accrue. If any amount remains below the claim precision threshold, it stays in **Unclaimed Rewards** until a later claim.

## Related Links

- [SSV Staking Overview](/ssv-staking) - Full staking mechanism
- [Stake SSV](stake-ssv) - How to stake SSV
- [Unstake SSV](unstake-ssv) - How unstaking works
