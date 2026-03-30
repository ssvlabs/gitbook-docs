---
description: How operator fees work in the SSV Network
sidebar_position: 1
---

# Operator Fee

This page explains the concepts behind operator fees. For step-by-step instructions to update a fee, see [this guide](/operators/operator-management/updating-operator-fees).

Fees are set when an operator registers and can later be changed.

Fee changes are generally initiated to stay competitive with other operators.

## Operator Fee

Operators set their own fees in ETH. This fee is charged per 32 ETH of effective balance for validators that select them as one of their operators.

Operator earnings are paid to their account balance(s), and can be withdrawn to their wallet at any time.

**Fee Configuration**

Operators initially set their fee when registering an operator to the network.

Fees are presented as annual payments, but in practice they are paid continuously per block.

If you set your operator fee through the smart contract, whether at registration or during a fee update, the value must be provided in fee-per-block format.

* To calculate fee per block according to a desired annual fee in fiat (USD):

$$ Fee\;per\;block = \dfrac{Annual\;Fee_{usd}}{ETH_{usd}}\;/\;Blocks_{year} $$

Where:
- $\text{Annual Fee}_{usd}$ - desired fee per year in USD
- $ETH_{usd}$ - ETH price in USD  
- $Blocks_{year}$  - avg. number of blocks per year ([reference](https://ycharts.com/indicators/ethereum_blocks_per_day))

:::tip ETH vs SSV fees
**Previously registered operators have a default ETH fee**, which [they can change as usual](/operators/operator-management/updating-operator-fees). They may also have two separate balances — one in ETH and one in SSV. Once all clusters they participate in migrate to ETH, the operator will only have an ETH balance.

Legacy SSV-denominated fees cannot be changed and are charged per validator, regardless of effective balance.

**Newly registered operators** have only an ETH balance and cannot be paid in SSV.
:::

### Fee Increase Process

To keep fee updates transparent and give stakers time to respond, such as by depositing more balance or replacing an operator, the network uses a two-step cycle for operator fee increases:

![update-fee](/img/update-fee-1.avif)

1. **Declaring a new fee** - a broadcast to the network that the operator is increasing their fee.
2. **Executing the declared fee** - finalizing the fee increase process (only after this does the fee change take effect).

Between these two steps is a waiting period, called the declaration period, set by the DAO.

The execution must then happen within the execution period. If an operator does not execute the declared fee during that period, it expires and the process must be restarted.

For example, if an operator declares a new fee, they have to wait X days (declaration period) before being able to execute it. Once the period has passed, they have Y days to execute it (execution period) before it expires.

Operators can always cancel their declared fee (during the declaration period or execution period) and stay with the existing fee.

### Fee Increase Limitations

The network also limits the percentage by which operators can increase their fee in each cycle.

This limitation is decided by the DAO and is implemented to protect stakers against sudden liquidations due to fee updates and malicious behaviors.

:::warning
Please note that due to this restriction, Operators that have **set a fee of 0** would not be able to increase their fee in the future.
:::

### Fee Decrease Process

Operators can decrease fees immediately at any time.

The 2 step cycle (consisting of the declaration and execution periods) utilized in the fee increase process, **does not apply** to decreasing operator fees.

### Fee Decrease Limitations

There are no restrictions to decreasing operator fees, however, please note that operators who decrease their fee to 0, would not be able to increase it in the future.
