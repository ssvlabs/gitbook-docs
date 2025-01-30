# Maintenance Stage

:::warning
This section and the documents under it have not been updated to V3 testnet
:::

The third stage outlines how to rebase the pool's liquid staking derivative (LSD) and which administrative functions must be utilized in the pool manager contract. This must be done in advance, to enable the management capabilities of the pool and its validators.

### Liquid Staking Derivative Rebasing

In order for the accrued staking rewards to reflect on users' poolETH balance, the pool manager contract must keep track of the total amount of ETH staked. The amount can increase with staking reward accumulation or decrease due to slashing and staking penalties.

To do this the pool should utilize **Oracles** to periodically fetch the list of its active validators from the pool's validators registry, and report their aggregated balance on the beacon chain back to the pool manager contract. Updating the total amount of ETH staked will initiate the rebasing of the poolETH supply which will reflect on all users' balances.

### Management Functions

Administrative capabilities of the pool's validators and their cost management are provided to the account which registered the validator to the ssv.network.

To enable the pool operator to perform these functions, they must be contained within the pool manager contract beforehand.

#### Account Management

**Account Balance** - the pool's account balance on the ssv.network needs to be kept in check to ensure the continued operation of the pool's validator(s).

To manage the account balances, the pool operator could deposit or withdraw funds.

* `deposit()`
* `withdraw()`

**Account Reactivation** - accounts with insufficient balance for validator operations are susceptible to liquidation. In the unfortunate case the pool's account becomes insolvent, the pool operator must reactivate the account along with additional funds in order to resume its validator(s) operation.

* `reactivateAccount()`

#### Validator Management

**Update Operators** - validators in the ssv.network are customizable and the pool operator can always update the operators managing the validator(s) according to their own preferences (i.e. operator cost and performance optimization).

To update a validator's operators, the pool operator should repeat the 2nd step - "pools operator selection" and 3rd step - "validator key distribution" of the initialization stage to redistribute the validator key remove the validator from current cluster, and register it again, with the new operators and KeyShares.

**Remove Validator** - validators in the ssv.network can always off-board the network. The pool can remove its validators from the network in order to support user poolETH redemptions in the future or to migrate to a different service.

* `removeValidator()`

