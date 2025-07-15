---
description: How to update operator fees in the SSV network
sidebar_position: 2
---

# Update Fee

Here you will find theoretical concepts, to see the actionable steps to Updating Fee [check out this page](/operators/operator-management/updating-operator-fees).

Fees are initially set when registering an operator but can be changed at any point in time.

Fee changes are generally initiated to stay competitive with other operators or to align with SSV market price fluctuations.

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
