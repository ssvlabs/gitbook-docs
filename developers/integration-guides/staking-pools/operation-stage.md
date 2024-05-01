# Operation Stage

{% hint style="warning" %}
This section and the documents under it have not been updated to V3 testnet
{% endhint %}

The second stage outlines how to manage the pool users’  ETH deposits and how the pool should activate validators according to demand (accumulated pooled ETH).

![](<../../../.gitbook/assets/image (17).png>)

### Deposits Management

The liquid element of the staking pool is achieved by utilizing a liquid staking derivative (LSD), referred to in this guide as the **poolETH** token - an ERC20 contract - that represents the user’s staked ETH in the staking pool and their accrued rewards.

poolETH tokens are minted upon deposit and burned when redeemed. This is done at a 1:1 ratio to the amount supplied by the user (as withdrawals are not yet possible on the Beacon Chain, this guide will not cover redemptions).

When users deposit ETH to the pool manager contract, new poolETH tokens are minted in return, along with a record of the user’s **share** of the pool.

**Shares** serve as a reference to how much claim a user has to the total amount of ETH staked by the staking pool.

They are utilized to calculate users’ poolETH balance: (balanceOf(user) = shares(user) \* total amount of ETH staked / totalShares) and help facilitate the rebasing mechanism of poolETH tokens algorithmically. This is determined in relation to accrued staking rewards (outlined under the [maintenance stage](maintenance-stage.md)) instead of the complexity of storing and maintaining a mapping of user balances.

### Validator Activation

Pool validators are activated according to users' accumulated ETH deposits. It is either done programmatically, every time more than 32 ETH has been pooled together, or periodically by the pool operator (i.e. once a day).

Activating a pool validator is done by making a deposit to the **Ethereum Deposit Smart Contract**, followed by its registration to the **SSV Network Smart Contract**.

Validators that are going to be activated are pulled from the pool’s validators registry, which was constructed during the initialization ceremony.

To support validator activation, the pool manager contract should utilize the following global variables:

* **Withdrawal credentials** - to support poolETH redemptions in the future, the staking pool must input its own withdrawal credentials (which will be used for all its validator deposits). This is done so that stakers can receive back their staking principle (validator deposits) in case of validator deactivation.
* **Runway** - the operational period (denominated in blocks) for each pool validator. This will be used when calculating how much balance (SSV) has to be deposited with each validator activation.
