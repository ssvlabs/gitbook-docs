---
sidebar_position: 4
---

# Unstake SSV

## Overview

Unstaking SSV withdraws your staked tokens from the staking contract. The process includes:

- **7-day cooldown period** - Required waiting time after initiating
- **Oracle weight retention** - Voting weight remains active during cooldown
- **Full withdrawal** - Receive SSV + any unclaimed rewards after cooldown

:::note Please note
This process is irreversible. Once initiated, you cannot cancel and rewards stop immediately. You can only have up to 2000 initiated withdrawal requests at the same time.
:::

## Unstaking Process

#### 1. Connect Your Wallet

Navigate to the [SSV Network Web App](https://app.ssv.network/), connect your wallet holding cSSV tokens, and ensure sufficient ETH for gas fees.

![Unstake SSV](/img/stake-ssv-1.png)

#### 2. Navigate to Unstaking

Go to the "Unstake" section.

![Unstake SSV](/img/unstake-ssv-2.png)

#### 3. Initiate Unstaking

Click "Unstake SSV" and specify the amount to unstake.

![Unstake SSV](/img/unstake-ssv-3.png)

#### 4. Confirm Transaction

Read and acknowledge the warnings, then click "Approve Unstake". You'll need to approve in your wallet, and wait for blockchain confirmation.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/img/unstake-ssv-4.png" alt="Unstake SSV" style={{ width: '60%', maxWidth: '600px' }} />
</div>


#### 5. Cooldown Period

During the cooldown period (7 Days), a timer displays the remaining time until withdrawal becomes available. 

See "Withdrawable in 6d 12m 37s..." next to 2500 cSSV on the screenshot below.

![Unstake SSV](/img/unstake-ssv-5.png)

#### 6. Finalize Withdrawal

Once the cooldown period has ended, a "Withdraw" button will appear next to your request. Select "Withdraw" and complete the transaction using your wallet.

![Unstake SSV](/img/unstake-ssv-6.png)

**Once the transaction is confirmed on-chian:**
- Original SSV tokens are returned to your wallet
- All rewards are claimed
- cSSV tokens are burned (removed from circulation)
- Oracle weight is removed
- Staking position is closed