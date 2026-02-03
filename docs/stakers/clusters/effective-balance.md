---
description: Effective Balance Accounting explained
sidebar_position: 3
---

# Effective Balance Accounting

Across the SSV Network, fees, cluster runway, and liquidation parameters are calculated based on validators’ actual effective balance. [Under Ethereum’s Pectra validator model](https://consensys.io/blog/ethereum-pectra-upgrade), a single validator can secure the network and earn rewards with an effective balance ranging from 32 to 2048 ETH.

## Effective Balance Monitoring
This monitoring is performed by the set of [Oracles](/learn/protocol-overview/oracles), periodically fetching validators’ effective balance data from the Beacon Chain and report it on-chain.

Oracles monitor only validators that have already been registered. During the registration of new validators, stakers may  provide the total Effective Balance (EB) of the validators being registered. This information is used solely to improve the accuracy of initial runway estimations.

Providing an incorrect EB can lead to misleading runway estimates and unexpected fee changes. For example:
1. A validator with an effective balance of 2048 ETH is registered
2. The validator is declared as having 32 ETH during registration
3. Runway estimation is computed based on 32 ETH
4. Fees are deposited according to the underestimated runway
5. Once the oracle reports the actual EB, fees increase by 64×
6. The cluster runway is reduced accordingly, increasing liquidation risk

## Fees Calculations
Effective balance is used as the billing unit for fee calculation. Fees are defined per 32 ETH of effective balance and scale linearly with a cluster’s total effective balance, as shown below:

$$
(f_o + f_n) * Total Effective Balance / 32
$$

#### Legend:
  * $$f_o$$ - operator fees *(per 32 ETH)*, representing the combined fees of all operators in the cluster, denominated in _ETH per block_
  * $$f_n$$ - network fees *(per 32 ETH)*, representing fees owed to the SSV network, denominated in _ETH per block_
  * $$Total Effective Balance$$ - the he sum of effective balances across all validators in the cluster

#### Under this model:
- Fees are denominated in ETH
- Fees scale proportionally with the cluster’s actual effective balance
- The validator count does *not* affect the fee calculation
- Effective balance may be split across validator keys in any manner (see [Examples](#examples))

## Examples

As mentioned above, the fees will scale proportionally to the Total Effective Balance of a cluster. 

:::tip Validator Count
Please note the Validator Count is completely irrelevant in calculations:

A cluster of 1 validator with 64 ETH balance (1 \* 64) and 2 validators each with 32 ETH effective balance (2 \* 32) **would have the same** annual fee.
:::

#### Example Cluster #1
- Total Effective Balance: 32
- Operators fees: 0.01 ETH
- Network fee: 0.00928 ETH

Annual fee for the cluster: 
$$(0.01+0.00928)*32/32=0.01928 ETH$$


#### Example Cluster #2
- Total Effective Balance: 64
- Operators fees: 0.01 ETH
- Network fee: 0.00928 ETH

Annual fee for the cluster: 
$$(0.01+0.00928)*64/32=0.03856 ETH$$

#### Example Cluster #3
- Total Effective Balance: 2048
- Operators fees: 0.01 ETH
- Network fee: 0.00928 ETH

Annual fee for the cluster: 
$$(0.01+0.00928)*2048/32=1.23392 ETH$$
