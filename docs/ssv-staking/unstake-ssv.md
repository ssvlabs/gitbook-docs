---
sidebar_position: 4
---

# Unstake SSV

Unstake your SSV tokens with a mandatory 7-day cooldown period.

## Overview

Unstaking SSV withdraws your staked tokens from the staking contract. The process includes:

- **7-day cooldown period** - Required waiting time after initiating
- **Reward cessation** - Rewards stop accruing immediately
- **Oracle weight retention** - Voting weight remains active during cooldown
- **Full withdrawal** - Receive SSV + any unclaimed ETH after cooldown

⚠️ **Important**: This process is irreversible. Once initiated, you cannot cancel and rewards stop immediately.

## Before You Unstake

### Key Considerations

| Aspect | Details |
|--------|---------|
| **Cooldown period** | 7 days from initiation to withdrawal |
| **Rewards** | Stop accruing immediately |
| **Oracle weight** | Remains active for voting |
| **Unclaimed ETH** | Should be claimed before or during unstaking |
| **cSSV tokens** | Will be burned upon withdrawal |
| **Irreversible** | Cannot cancel once initiated |

## Unstaking Process

### Step 1: Connect Your Wallet

Navigate to the SSV Network webapp, connect your wallet holding cSSV tokens, and ensure sufficient ETH for gas fees.

<!-- TODO: Add screenshot - Connect Wallet -->

### Step 2: Navigate to Unstaking

Go to the "Staking" section and locate your staking position details (staked SSV, cSSV balance, unclaimed rewards, APY).

<!-- TODO: Add screenshot - Staking Dashboard -->

### Step 3: Review and Claim Rewards

Check if you have unclaimed rewards. **Strongly recommended**: Claim them now before proceeding.

### Step 4: Initiate Unstaking

Click "Unstake SSV" and choose:
- **Full unstake** (all cSSV)
- **Partial unstake** (specify amount)

Review the details: SSV amount, cSSV to burn, cooldown end date, and gas fees.

<!-- TODO: Add screenshot - Initiate Unstaking -->

### Step 5: Confirm Transaction

Read and acknowledge the warnings, click "Confirm Unstake", approve in your wallet, and wait for blockchain confirmation.

<!-- TODO: Add screenshot - Confirm Unstaking Transaction -->

### Step 6: Cooldown Period (7 Days)

Once confirmed:
- Cooldown timer starts
- Rewards stop accruing immediately
- Oracle voting weight remains active
- "Unstaking" status shows on dashboard
- Estimated withdrawal date displayed

<!-- TODO: Add screenshot - Cooldown Timer Active -->

### Step 7: Wait for Cooldown

During the 7-day cooldown:

- ⏱️ Monitor cooldown timer
- ❌ No new rewards accrue
- ✅ Can still claim previously accumulated rewards
- ✅ Oracle weight still active
- ❌ Cannot cancel unstaking
- ❌ Cannot stake additional SSV

<!-- TODO: Add screenshot - Cooldown Period Dashboard -->

### Step 8: Complete Withdrawal

After cooldown ends, return to the dashboard, click "Withdraw", review details, and confirm the transaction.

<!-- TODO: Add screenshot - Withdraw Available Button -->

### Step 9: Receive Your SSV

Once confirmed:
- SSV tokens returned to your wallet
- Any unclaimed rewards sent
- cSSV tokens burned from circulation
- Staking position closed
- Oracle weight removed

<!-- TODO: Add screenshot - Withdrawal Complete Confirmation -->

## What Happens During Cooldown

| Aspect | Status | Details |
|--------|--------|---------|
| **Rewards** | ❌ Stopped | No new rewards accrue |
| **Oracle weight** | ✅ Active | Voting power still counts |
| **Claim rewards** | ✅ Allowed | Can claim accumulated ETH |
| **Transfer cSSV** | ❌ Not allowed | Tokens locked for unstaking |
| **Cancel unstaking** | ❌ Not allowed | Process is irreversible |
| **Add more stake** | ❌ Not allowed | Wait until withdrawal complete |

## Partial Unstaking

You can unstake a portion of your cSSV while keeping the rest staked:

1. Choose partial unstake option
2. Specify amount of cSSV to unstake
3. Remaining cSSV continues earning rewards
4. Only unstaked portion goes through cooldown
5. Can unstake more later if desired

**Example:**
- You have 1,000 cSSV staked
- Unstake 400 cSSV
- During cooldown: 400 cSSV earns nothing, 600 cSSV still earning
- After cooldown: Withdraw 400 SSV, keep 600 SSV staked

## After Withdrawal

Once complete:
- Original SSV tokens returned
- All claimed rewards (if claimed)
- cSSV tokens burned (removed from circulation)
- Oracle weight removed
- Staking position closed
