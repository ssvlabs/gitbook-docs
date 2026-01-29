---
sidebar_position: 2
---

# Stake SSV

## Prerequisites

- SSV tokens in your wallet
- Compatible Web3 wallet (MetaMask, WalletConnect, etc.)
- Sufficient ETH for gas fees
- Access to the SSV Network webapp

## Staking Process

### Step 1: Connect Your Wallet

Navigate to the SSV Network webapp, click "Connect Wallet", and approve the connection.

<!-- TODO: Add screenshot - Connect Wallet -->

### Step 2: Navigate to Staking

Go to the "Staking" section to see the staking dashboard with current statistics (total SSV staked, APY, your balance, rewards distributed).

<!-- TODO: Add screenshot - Staking Dashboard -->

### Step 3: Enter Staking Amount

Click "Stake SSV" and enter the amount you wish to stake. Review the details including cSSV you'll receive (1:1 ratio initially), estimated APY, and gas fees.

<!-- TODO: Add screenshot - Enter Staking Amount -->

### Step 4: Approve SSV Token (First Time Only)

If this is your first time staking, approve the staking contract to access your SSV tokens. Click "Approve SSV" and confirm the transaction.

⚠️ **Note**: You only need to do this once.

<!-- TODO: Add screenshot - Approve SSV Token -->

### Step 5: Confirm Staking Transaction

Click "Stake", review the transaction details in your wallet, and confirm. Wait for blockchain confirmation.

<!-- TODO: Add screenshot - Confirm Staking Transaction -->

### Step 6: Receive cSSV

Once confirmed, you'll receive cSSV tokens in your wallet and start earning ETH rewards immediately.

<!-- TODO: Add screenshot - Staking Complete -->

## What Happens When You Stake?

1. **SSV is locked** in the staking contract
2. **You receive cSSV** at a 1:1 ratio initially
3. **Oracle weight** is automatically delegated equally across all 4 oracles
4. **Rewards start accruing** immediately based on network fees
5. **cSSV stays constant** - your balance doesn't auto-compound

## Understanding Your Position

After staking, monitor your position on the dashboard:

- **Staked SSV**: Total SSV tokens staked
- **cSSV Balance**: Your compound SSV token balance
- **Unclaimed Rewards**: ETH rewards available to claim
- **Oracle Weight**: Your contribution to oracle consensus
- **Estimated APY**: Current annual percentage yield

## Using cSSV Tokens

cSSV is a standard ERC-20 token with full DeFi composability:

- ✅ Transfer to another wallet
- ✅ Trade on DEXs (if liquidity exists)
- ✅ Use as collateral in other protocols
- ✅ Hold in cold storage

**Important**: 
- Transferring cSSV transfers the staked position
- Unclaimed ETH rewards stay with the original holder
- The recipient starts earning new rewards from the transfer
- Only the cSSV holder can unstake

## Adding More Stake

You can stake additional SSV anytime. Return to the dashboard, click "Stake SSV" again, enter the amount, and confirm (no need to approve again).

## Transaction Costs

- **First-time staking**: 2 transactions (Approve + Stake)
- **Additional staking**: 1 transaction (Stake only)
- **Gas costs vary**: Based on network congestion

## Next Steps

After staking:

1. **Monitor your position** - Check the dashboard regularly
2. **Claim rewards** - See [Claim Rewards](claim-rewards.md) when ETH accumulates
3. **Track performance** - Review APY and total rewards earned
4. **Consider adding more** - Stake additional SSV to increase rewards

## Learn More

- [SSV Staking Overview](README.md) - Full staking mechanism
- [Claim Rewards](claim-rewards.md) - How to claim ETH rewards
- [Unstake SSV](unstake-ssv.md) - Unstaking process
- [FAQ](faq.md) - Common questions and answers
- [Glossary](/learn/glossary.md) - Key terms and definitions
