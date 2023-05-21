# Liquidations

{% hint style="warning" %}
This section and the documents under it have not been updated to V3 testnet
{% endhint %}

Since the payments between validators and operators are a zero-sum game (revenue of operators is the expenses of validators) and payments are paid as an ongoing process that is calculated in retrospect, there can’t be a case where a user has insufficient funds in their balance to cover the validator’s operational costs.

To mitigate this risk, the ssv network requires additional actors called liquidators to work behind the scenes to keep the system functioning by flagging users that have insufficient balances to carry their expenses.

Since transactions on Ethereum aren’t free, and users can’t incur additional costs if their account runs out of balance, an incentivization model is required to keep the system solvent.

### Liquidation Collateral

The ssv network rewards liquidators for the costs and risks associated with liquidating insolvent accounts. This is done by implementing a minimum required balance called **liquidation collateral** that each account must hold. The provided collateral serves as a liquidation penalty for validators and a reward to liquidators for their efforts.

Accounts that drop below the liquidation collateral threshold are at risk of being liquidated. Liquidated accounts will no longer be managed by operators and will become inactive to perform their duties; this could lead to severe penalties on the Beacon Chain.

### Liquidation Risk

Accounts are liquidatable if their balance is insufficient for a certain period of time, called the “liquidation threshold period”. This duration is denominated in blocks and is aimed at maintaining a sufficient balance to cover operator cost for the period, which is configured for the network and governed by the DAO.

#### Burn Rate

Considering that accounts vary in the number of validators and the fees paid to operators, to estimate whether an account has a sufficient balance to pay for this period is determined dynamically for each account by calculating its “burn rate”.

* The “burn rate” is the rate in which an account spends SSV per block, calculated by:

$$
burn\;rate = expenses_b - revenue_b
$$

* Legend
  * $$expenses_b$$ - all account’s validator expenses (operator payments and network fee) per block
  * $$revenue_b$$ - all account's operator earnings per block

### Liquidation

In order to determine whether an account is liquidatable, a user must check if it has a sufficient balance according to its burn rate to cover its operating costs for a duration longer than the “liquidation threshold period”.

* Liquidation is calculated by:

$$
liquidatable = balance<burn\;rate * liquidation\;threshold\;period
$$

* Legend
  * $$balance$$ - account's balance
  * $$burn\;rate$$ - # of SSV tokens paid by account per block (see above)
  * $$liquidation\;threshold\;period$$ - # of blocks

Upon successful liquidation, the account will be flagged as “inactive”. This will signal the operators managing the account’s validators to cease their operation, and the liquidator will be rewarded with the users remaining balance - the liquidation collateral.

### Insolvency

Since balances are aggregated per address, liquidations occur per account and not per specific validators.

The account state is classified by the “active” and “inactive” (liquidated) statuses.

Accounts that have been liquidated can no longer use the network to run their validators until reactivation.

#### Reactivation

To resume a validator’s operations, an account must deposit a sufficient balance (a new liquidation collateral) for the account to be reactivated.

* Sufficient balance (liquidation collateral) for reactivation is calculated by:

$$
reactivation\;balance > expenses_b*liquidation\;threshold\;period
$$

* Legend
  * $$expenses_b$$ - all account’s validator expenses (operator payments and network fee) per block
  * $$liquidation\;threshold\;period$$ - # of blocks

### Liquidation Scenario Example

* Bob has registered a single validator to the network that costs 345 SSV tokens per year with initial funding (deposit) of 395 SSV into his account balance.
* Assuming a liquidation threshold period of a month (30 days) and an annual network fee of 20 SSV, Bob’s liquidation collateral is set to 30 SSV ((345 operator fee payment + 20 network fee payment) / 365 \* 30).
* After a year, as per his burn rate of 1 SSV/day ((345 operator fee payment + 20 network fee payment) / 365), Bob’s account fell below the liquidation threshold balance.
* Alice (our liquidator) has been monitoring the network and has flagged Bob’s account for liquidation.
* The protocol confirms that Bob’s account is insolvent and liquidates his account.
* Bob’s account has now been inactivated, and his remaining balance of 30 SSV is transferred to Alice as a liquidation reward.
* Bob’s validator operators have seen that his account has been signaled as “inactive” and have now stopped operating his validator on the beacon chain.
* Devastated and ashamed by the loss, Bob decides to deposit another 60 SSV (which grants his account an operational runway for another month) to his balance and reactivates his account.
