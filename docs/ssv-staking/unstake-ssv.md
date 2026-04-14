---
sidebar_position: 4
---

# Unstake SSV

## Overview

Unstaking SSV withdraws your staked tokens from the staking contract. The process includes:

- **7-day cooldown period** - Required waiting period after initiating unstaking
- **Oracle weight retention** - The voting power tied to the staked weight remains active during the cooldown period
- **Full withdrawal** - Receive SSV and any claimable rewards after the cooldown period

:::note Please note
Unstaking is irreversible and cannot be canceled. Rewards stop accruing for the unstaked amount at that point, but rewards already earned remain claimable. A wallet can have up to 2000 initiated withdrawal requests open at the same time.
:::

## Unstaking Process

#### 1. Connect Your Wallet

Navigate to the [SSV Network Web App](https://app.ssv.network/), connect your wallet holding cSSV tokens, and ensure sufficient ETH for gas fees.

![Unstake SSV](/img/stake-ssv-1.png)

#### 2. Navigate to Unstaking

Open the **Unstake** section.

![Unstake SSV](/img/unstake-ssv-2.png)

#### 3. Initiate Unstaking

Select **Unstake SSV** and enter the amount to unstake.

![Unstake SSV](/img/unstake-ssv-3.png)

#### 4. Confirm Transaction

Read and acknowledge the warnings, then select **Approve Unstake**. This signs the unstake transaction in your wallet and starts the cooldown period once the transaction is confirmed onchain.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/img/unstake-ssv-4.png" alt="Unstake SSV" style={{ width: '60%', maxWidth: '600px' }} />
</div>


#### 5. Cooldown Period

During the 7-day cooldown period, the Web App shows the remaining time until withdrawal becomes available.

The screenshot below shows an example of the remaining time for an unstake request.

![Unstake SSV](/img/unstake-ssv-5.png)

#### 6. Finalize Withdrawal

After the cooldown period ends, select **Withdraw** for the relevant request and confirm the transaction in your wallet.

![Unstake SSV](/img/unstake-ssv-6.png)

**Once the transaction is confirmed onchain:**
- Original SSV tokens are returned to your wallet
- Any claimable rewards are claimed
- cSSV tokens are burned (removed from circulation)
- Oracle weight is removed
- Staking position is closed

## Related Links

- [SSV Staking Overview](/ssv-staking) - Full staking mechanism
- [Stake SSV](./stake-ssv) - How to stake SSV
- [Claim Rewards](./claim-rewards) - How to claim rewards
