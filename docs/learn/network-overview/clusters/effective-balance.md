---
description: Effective Balance Accounting explained
sidebar_position: 3
---

# Effective Balance Accounting

Across the SSV Network, fees, cluster runway, and liquidation parameters are calculated based on validators’ actual effective balance. [Under Ethereum’s Pectra validator model](https://consensys.io/blog/ethereum-pectra-upgrade), a single validator can secure the network and earn rewards with an effective balance ranging from 32 to 2048 ETH.

## Effective Balance Monitoring
This monitoring is performed by the set of [oracles](/learn/network-overview/oracles), which periodically fetch validator effective-balance data from the Beacon Chain and report it on-chain.

Oracles monitor only validators that have already been registered. During registration of new validators, stakers may provide the total effective balance (EB) of the validators being registered. This information is used only to improve the accuracy of initial runway estimates.

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
  * $$f_n$$ - network fees *(per 32 ETH)*, representing fees owed to SSV Network, denominated in _ETH per block_
  * $$Total Effective Balance$$ - the sum of effective balances of all validators in the cluster

#### Key takeaways:
- Fees scale proportionally with the cluster’s actual effective balance
- The validator count does *not* affect the fee calculation
- Effective balance may be split across validator keys in any manner (see [Examples](#examples))

## Examples

As mentioned above, fees scale proportionally with the total effective balance of a cluster.

#### Example Cluster #1
- Total Effective Balance: 32
- Sum of Operators fees: 0.01 ETH
- Network fee: 0.00928 ETH

Annual fee for the cluster: 
$$(0.01+0.00928)*32/32=0.01928 ETH$$


#### Example Cluster #2
- Total Effective Balance: 95
- Sum of Operators fees: 0.01 ETH
- Network fee: 0.00928 ETH

Annual fee for the cluster: 
$$(0.01+0.00928)*95/32=0.0572375 ETH$$

#### Example Cluster #3
- Total Effective Balance: 2048
- Sum of operator fees: 0.01 ETH
- Network fee: 0.00928 ETH

Annual fee for the cluster: 
$$(0.01+0.00928)*2048/32=1.23392 ETH$$
