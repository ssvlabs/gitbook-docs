---
sidebar_position: 5
---

# SSV Staking FAQ

## General Staking

### What is SSV Staking?

SSV Staking allows SSV token holders to support oracle infrastructure. When you stake SSV, you receive cSSV tokens to keep participating in SSV Network governance and earn a proportional share of network fees paid by clusters. While you hold cSSV, ETH rewards accrue to the wallet holding cSSV and can be claimed at any time without the need to unstake SSV

### How do I start staking?

1. Connect your wallet to the SSV webapp
2. Navigate to the Staking section
3. Enter the amount of SSV to stake
4. Approve the token (first time only)
5. Confirm the staking transaction

See the [Stake SSV](stake-ssv.md) guide for detailed steps.

### What is cSSV?

cSSV (Compound SSV) is a non-rebasing ERC-20 token you receive when staking SSV. Your cSSV balance stays constant while ETH rewards accrue separately. It's fully transferable and can be used in other DeFi protocols.

### How much SSV should I stake?

Consider:
- Keep some SSV unstaked for liquidity needs
- Factor in the 7-day unstaking cooldown
- Larger stakes earn more rewards
- You can always stake more later

### Is there a minimum staking amount?

Check the webapp for current minimum requirements. Minimums ensure gas costs are economical relative to potential rewards.

### Can I stake from multiple wallets?

Yes! Each wallet can stake independently. Rewards are tracked separately per wallet address.

## Rewards

### How are rewards calculated?

```
Your Rewards = (Your cSSV / Total cSSV) × Total Network Fees
```

### When do rewards start?

Rewards begin accruing immediately after your staking transaction is confirmed.

### Do rewards auto-compound?

No. cSSV is non-rebasing, so rewards don't automatically compound. To compound:
1. Claim ETH rewards
2. Swap ETH for SSV
3. Stake the new SSV
4. Receive additional cSSV

### Do I need to claim rewards regularly?

No, rewards can accumulate indefinitely. However, claiming periodically gives you access to ETH and reduces the amount at risk in the contract.

### Can someone else claim my rewards?

No. Only the wallet holding the cSSV tokens can claim the associated rewards.

### Do rewards continue after I claim?

Yes! Claiming doesn't affect your staking position. Your cSSV balance stays the same and you continue earning immediately.

### What happens to unclaimed rewards if I never claim?

They remain in the contract associated with your address indefinitely. You can claim them at any time.

### Is there a minimum claim amount?

The contract may have a minimum to prevent spam. Check the webapp for current requirements.

### Can I claim rewards to a different address?

Typically, rewards are sent to the wallet holding the cSSV tokens. Check contract documentation for specifics.

## cSSV Tokens

### Can I transfer cSSV?

Yes, cSSV is a standard ERC-20 token and fully transferable.

### What happens when I transfer cSSV?

- You keep all unclaimed ETH rewards accrued up to the transfer
- The recipient gets the cSSV tokens
- The recipient starts earning new rewards from that point
- You can still claim your historical rewards

### Can I use cSSV in other protocols?

Yes! cSSV has full DeFi composability. You can trade it, use it as collateral, or hold it in any wallet.

### What happens to cSSV when I unstake?

The cSSV tokens are burned (permanently destroyed) when you complete the withdrawal. This reduces total cSSV supply.

## Oracle Delegation

### What is oracle delegation?

Your staked SSV weight automatically supports the network's oracle system, which reports validator effective balances to the blockchain.

### Do I need to choose an oracle?

No. In v1, your stake weight is automatically split equally across all 4 permissioned oracles. No manual action required.

### What is the 75% quorum?

Oracles need 75% of total voting weight to agree before balance updates are accepted. This prevents any single oracle from manipulating data.

### Will delegation change in the future?

Yes. Future versions will allow stakers to choose which oracles to delegate to, with performance-based rewards.

## Unstaking

### Can I unstake anytime?

Yes, but there's a mandatory 7-day cooldown period between initiating unstaking and being able to withdraw.

### Why is there a 7-day cooldown?

The cooldown maintains:
- Oracle voting stability (prevents rapid weight changes)
- Protocol security (protects against flash-stake attacks)
- Future governance compatibility (prepares for additional use cases)

### When do rewards stop during unstaking?

**Critical**: Rewards stop accruing the MOMENT you initiate unstaking, not after the 7-day cooldown.

### Can I cancel unstaking?

No. Once you initiate unstaking, the process is irreversible.

### Can I speed up the cooldown?

No. The 7-day cooldown is a protocol requirement and cannot be shortened.

### What happens if I don't withdraw after cooldown ends?

Nothing urgent. Your SSV remains claimable indefinitely with no deadline.

### Can I partially unstake?

Yes! You can unstake a portion of your cSSV while keeping the rest staked and earning rewards.

### Can I claim rewards during cooldown?

Yes, you can claim any ETH rewards that accrued before you initiated unstaking.

### What happens to my oracle weight during cooldown?

It remains active for the 7-day cooldown period for protocol stability, then is removed upon withdrawal.

### Can I transfer cSSV during cooldown?

No. Once unstaking is initiated, the cSSV is locked and cannot be transferred.

### Can I add more stake during cooldown?

No. You cannot stake additional SSV while you have an active unstaking cooldown in progress.

### Do I pay gas twice for unstaking?

Yes - once to initiate unstaking and once to complete withdrawal after the cooldown period.

### Can I restake after unstaking?

Yes! You can restake immediately after withdrawal with no waiting period. However, frequent unstaking and restaking incurs gas costs.

## Troubleshooting

### Transaction failed - what should I check?

1. Sufficient token balance (SSV for staking, ETH for gas)
2. Token approval completed (for first-time staking)
3. Adequate gas limit
4. Contract not paused (rare)
5. No existing unstaking in progress (when trying to unstake)

### cSSV not showing in wallet

1. Manually add cSSV token using contract address
2. Check transaction confirmed on block explorer
3. Refresh wallet or try different interface
4. Contact support if issue persists

### Rewards lower than expected

- Verify your cSSV balance
- Check total staked SSV (more competition = smaller share)
- Review network usage (fewer validators = lower fees)
- Confirm time since last claim
- Check if DAO fee rate changed

### Claimed ETH not appearing

1. Verify transaction confirmed on block explorer
2. Check correct wallet address
3. Refresh wallet interface
4. Allow time for wallet to update
5. Contact support if issue persists

### Lost wallet access during cooldown

- Recover wallet using seed phrase
- Import to new wallet software
- Cooldown continues regardless
- Withdrawal still available after 7 days

## Security

### How do I verify I'm on the official webapp?

- Check the URL matches official documentation
- Verify the contract address
- Bookmark the official site
- Never click links from unsolicited messages

### What should I never share?

- Private keys
- Seed phrases / recovery phrases
- Never share these with anyone, including "support"

### Common scam warning signs

- 🚫 Unsolicited DMs offering staking help
- 🚫 Websites with similar but different URLs
- 🚫 "Instant unstaking" or "cancel cooldown" offers (impossible)
- 🚫 Requests for private keys or seed phrases
- 🚫 Promises of guaranteed or unrealistic returns

### What should I save for records?

- Transaction hashes for all operations
- Staking amounts and dates
- Reward claim history
- Unstaking initiation and withdrawal dates

## Economics

### Where do staking rewards come from?

Network fees paid by ETH clusters. A portion of fees flows to the SSV Staking contract and is distributed to cSSV holders.

### How does network growth affect rewards?

More validators → More fees collected → Higher total rewards (but distributed among all stakers)

### What if there are no validators using SSV?

If no fees are collected, no rewards accrue. Staking rewards depend on actual network usage.

## Technical

### What token standard is cSSV?

cSSV is a standard ERC-20 token with full compatibility.

### Is cSSV rebasing?

No. cSSV is non-rebasing. Your balance stays constant while rewards accrue separately via an index-based model.

### What is the reward model based on?

The reward mechanism is based on Synthetix's StakingRewards.sol pattern, providing better DeFi composability than rebasing tokens.

### Can I interact with the contract directly?

Yes, advanced users can interact with the smart contract directly. However, using the webapp is recommended for most users.

## Support

### Where can I get help?

- Official SSV documentation
- SSV Discord community
- SSV support channels
- GitHub for technical issues

### Who should I contact for issues?

Only contact official SSV support channels. Ignore unsolicited DMs offering help - these are scams.

## Learn More

- [SSV Staking Overview](README.md) - Complete staking guide
- [Stake SSV](stake-ssv.md) - Step-by-step staking
- [Claim Rewards](claim-rewards.md) - Claiming process
- [Unstake SSV](unstake-ssv.md) - Unstaking guide
- [Tokenomics](/learn/tokenomics/README.md) - Economic model
- [Glossary](/learn/glossary.md) - Key definitions

