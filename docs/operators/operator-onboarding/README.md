---
sidebar_label: 'Operator Onboarding'
sidebar_position: 1
---


# Operator Onboarding

To join the network as an operator a user must run an SSV node.

This is software containing the SSV protocol implementation and integration to the network's smart contracts.

This can be done by installing the [node software](/operators/operator-node/) on a machine followed by registering the operator either through the [smart contract](/developers/smart-contracts/ssvnetwork#registeroperatorpublickey-operatorfee-setprivate) or [webapp](https://app.ssv.network/) interface.

### Operator Fee

:::tip ETH vs SSV fees
**Previously registered operators** will have 2 separate balances — in ETH and SSV token. Once all clusters they manage migrate to ETH, the operator will only have ETH balance. 

**All newly registered operators** will only have ETH balance, without an option to be paid in SSV token.
:::

Operators set their own fees denominated in ETH. This fee will be charged per each 32 ETH staked with validators that selects them as one of their operators.

Fees in SSV (legacy) can not be changed and are charged per each validator, regardless of their effective balance.

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
