---
sidebar_position: 3
---

# Claim Rewards

Claim your accumulated ETH rewards from SSV staking anytime without unstaking.

## Overview

As an SSV staker, you earn ETH rewards proportional to your share of total staked SSV. These rewards:

- Accrue continuously as clusters pay network fees
- Are tracked separately from your cSSV balance
- Can be claimed anytime without affecting your staking position
- Do not auto-compound (your cSSV balance stays constant)

## Claiming Process

### Step 1: Connect Wallet

Navigate to the SSV Network webapp and connect your wallet holding cSSV tokens.

<!-- TODO: Add screenshot - Connect Wallet -->

### Step 2: View Unclaimed Rewards

Go to the "Staking" section and locate the "Unclaimed Rewards" panel showing total ETH available, reward history, current APY, and last claim timestamp.

<!-- TODO: Add screenshot - Unclaimed Rewards Dashboard -->

### Step 3: Initiate Claim

Click "Claim Rewards" and review the claim details (ETH amount, estimated gas fees, destination address).

<!-- TODO: Add screenshot - Claim Rewards Button -->

### Step 4: Confirm Transaction

Your wallet will prompt for confirmation. Review and confirm the transaction, then wait for blockchain confirmation.

<!-- TODO: Add screenshot - Confirm Transaction -->

### Step 5: Receive ETH

Once confirmed, ETH is sent to your wallet. Your "Unclaimed Rewards" counter resets to 0, cSSV balance remains unchanged, and new rewards continue accruing immediately.

<!-- TODO: Add screenshot - ETH Received Confirmation -->

## How Rewards Are Calculated

```
Your Rewards = (Your cSSV / Total cSSV) × Total Network Fees
```

**Example:**
- You hold 1,000 cSSV
- Total cSSV supply: 100,000
- Network collects 10 ETH in fees
- Your share: (1,000 / 100,000) × 10 ETH = 0.1 ETH

## Factors Affecting Rewards

1. **Network usage** - More validators = more fees = more rewards
2. **Your stake size** - Larger cSSV balance = larger reward share
3. **Total staked SSV** - More competition = smaller individual share
4. **Network fee rate** - Set by the DAO
5. **Time elapsed** - Longer between claims = more accumulated

## After Claiming

- cSSV balance stays the same
- Oracle voting weight unchanged
- Continue earning new rewards immediately
- Can claim again when rewards accumulate

## Manual Compounding

cSSV does not auto-compound. To compound rewards:

1. Claim ETH rewards
2. Swap ETH for SSV tokens
3. Stake the new SSV tokens
4. Receive additional cSSV
5. Earn rewards on larger cSSV balance

⚠️ **Note**: Requires manual action and incurs transaction costs.

## Rewards During Unstaking

⚠️ **Critical**: Rewards stop accruing the MOMENT you initiate unstaking, not after the 7-day cooldown.

| Stage | Rewards Accruing? | Can Claim? |
|-------|-------------------|------------|
| **Staked** | ✅ Yes | ✅ Yes |
| **Unstaking initiated** | ❌ No | ✅ Yes |
| **During 7-day cooldown** | ❌ No | ✅ Yes |
| **After cooldown** | ❌ No | ✅ During withdrawal |

## Transfers and Rewards

If you transfer cSSV tokens to another wallet:

- **You keep**: All unclaimed ETH rewards accrued up to the transfer
- **Recipient gets**: The cSSV tokens
- **Recipient earns**: New rewards from the transfer moment onward
- **You can still**: Claim your historical rewards
