---
description: How to operator fees work in the SSV network
sidebar_position: 1
---

# Operator Fee

On this page you will find educational concepts, to see the actionable steps to Updating Fee [check out this page](/operators/operator-management/updating-operator-fees).

Fees are initially set when registering an operator but can be changed at any point in time.

Fee changes are generally initiated to stay competitive with other operators.

## Operator Fee

Operators set their own fees denominated in ETH. This fee will be charged per each 32 ETH staked with validators that selects them as one of their operators.

Operator earnings are paid to their account balance(s), and can be withdrawn to their wallet at any time.

**Fee Configuration**

Operators initially set their fee when registering an operator to the network.

Fees are presented as annual payments, but in practice are paid to operators continuously as an ongoing process - per each passed block.

Please note, if you set your operator fee through the smart contract (whether at registration or fee updates), the value should be according to a fee per block format.

* To calculate fee per block according to a desired annual fee in fiat (USD):

$$ Fee\;per\;block = \dfrac{Annual\;Fee_{usd}}{ETH_{usd}}\;/\;Blocks_{year} $$

Where:
- $\text{Annual Fee}_{usd}$ - desired fee per year in USD
- $ETH_{usd}$ - ETH price in USD  
- $Blocks_{year}$  - avg. number of blocks per year ([reference](https://ycharts.com/indicators/ethereum_blocks_per_day))

:::tip ETH vs SSV fees
**Previously registered operators will have a default ETH fee** which [they can change as usual](/operators/operator-management/updating-operator-fees). They will also have 2 separate balances — in ETH and SSV token. Once all clusters they participate in migrate to ETH, the operator will only have ETH balance.

Fees in SSV (legacy) can not be changed and are charged per each validator, regardless of their effective balance.

**Newly registered operators** will only have ETH balance, without an option to be paid in SSV token.
:::

### Fee Increase Process

To ensure fee updates are transparent and stakers have enough time to adjust accordingly (by depositing more balance or replacing that operator) the network utilizes a 2 step cycle for increasing operator fees:

![update-fee](/img/update-fee-1.avif)

1. **Declaring a new fee** - a broadcast to the network that the operator is increasing their fee.
2. **Executing the declared fee** - finalizing the fee increase process (only after this does the fee change take effect).

Between each of these 2 steps is a waiting period (declaration period) - a period in days, determined by the DAO, for which the operator must wait before executing the newly declared fee.

The fee execution is also followed by an execution period - if an operator fails to execute their declared fee in this period, it will expire and they must restart the process.

For example, if an operator declares a new fee, they have to wait X days (declaration period) before being able to execute it. Once the period has passed, they have Y days to execute it (execution period) before it expires.

Operators can always cancel their declared fee (during the declaration period or execution period) and stay with the existing fee.

### Fee Increase Limitations

A restriction has been set in place by the network which limits the percentage of change that operators can increase their fee in each cycle (i.e. less than 10%).

This limitation is decided by the DAO and is implemented to protect stakers against sudden liquidations due to fee updates and malicious behaviors.

:::warning
Please note that due to this restriction, Operators that have **set a fee of 0** would not be able to increase their fee in the future.
:::

### Fee Decrease Process

Operator fees can be decreased immediately at any time by operators.

The 2 step cycle (consisting of the declaration and execution periods) utilized in the fee increase process, **does not apply** to decreasing operator fees.

### Fee Decrease Limitations

There are no restrictions to decreasing operator fees, however, please note that operators who decrease their fee to 0, would not be able to increase it in the future.
