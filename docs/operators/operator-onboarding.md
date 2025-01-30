---
description: How to onboard as an operator to the SSV network
sidebar_position: 2
---

# Operator Onboarding

### **Operator Onboarding**

To join the network as an operator a user must run an SSV node.

This is software containing the SSV protocol implementation and integration to the network's smart contracts.

This can be done by installing the [node software](./operator-node/installation) on a machine followed by registering the operator either through the [smart contract](../build/smart-contracts/ssvnetwork#registeroperatorpublickey-operatorfee-setprivate) or [webapp](https://app.ssv.network/) interface.

#### Operator Fee

Operators set their own fees - denominated in SSV tokens - to be charged per each validator that selects them as one of their operators.

Operator earnings are paid to their account balance, and can be withdrawn to their wallet at any time.

**Fee Configuration**

Operators initially set their fee when registering an operator to the network.

Fees are presented as annual payments, but in practice are paid to operators continuously as an ongoing process - per each passed block.

This means that when setting the operator fee through the smart contract (whether at registration or fee updates), operators should set their preferred fee according to a fee per block format.

* To calculate fee per block according to a desired annual fee in fiat (USD):

$$ \text{Fee per block} = \dfrac{\dfrac{\text{Annual Fee}_{usd}}{SSV_{usd}}}{Blocks_{year}} $$


Where:
- $\text{Annual Fee}_{usd}$ - desired fee per year in USD
- $SSV_{usd}$ - SSV price in USD  
- $Blocks_{year}$  - avg. number of blocks per year ([reference](https://ycharts.com/indicators/ethereum_blocks_per_day))
