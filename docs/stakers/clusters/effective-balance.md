---
description: Effective Balance Accounting explained
sidebar_position: 3
---

# Effective Balance Accounting

Effective Balance Accounting was brought together with SSV Staking update. With it in place fees, cluster runway, and liquidations are calculated across the SSV Network by aligning them with validators’ actual effective balance, rather than assuming a fixed 32 ETH per validator.
This change is required to natively support [Ethereum’s post-Pectra validator model](https://consensys.io/blog/ethereum-pectra-upgrade), where a single validator can secure and earn rewards on significantly more than 32 ETH. Historically, this gap was partially addressed through off-chain mechanisms, while Effective Balance Accounting brings this logic fully on-chain and applies it consistently across network fees, operator fees, and cluster payments.

## Effective Balance Monitoring
Under this new model it is crucial to closely monitor each validator's on-chain effective balance. This is performed by the set of [Oracles](/learn/protocol-overview/oracles), periodically fetching on-chain data. 

However, these oracles only monitor already registered validators. When just registering new validators you will be prompted to fill in the total Effective Balance (EB) of registered validators yourself. This is optional and is done for accurate runway estimation. 

Below is an example of what can happen if a staker fails to provide factual EB when prompted:
1. Register a validator with EB of 2048 ETH
2. Claim its EB as 32 ETH during registration to ssv network
3. See runway estimation as if the validator has EB of 32 ETH
4. Deposit the fees according to the *incorrect* estimations
5. Once oracles get the information that the validator has EB of 2048 ETH, the actual fees will jump by 64 times
6. The cluster's runway becomes 64 times shorter, and is at high risk of liquidation

## Accounting Changes
Effective Balance Accounting changes how fees are calculated at the cluster level, by replacing validator count as a proxy with the cluster’s effective balance.

In the ETH-based model, effective balance becomes the billing unit. Fees are defined per 32 ETH of effective balance and scale with a cluster’s total effective balance:

$$
(f_o + f_n) * Total Effective Balance / 32
$$

#### Legend:
  * $$f_o$$ - operator fees *(per 32 ETH)* - the fees of all operators in the cluster (denominated in _ETH per block_)
  * $$f_n$$ - network fees *(per 32 ETH)* - the fees owed to the ssv network (denominated in _ETH per block_)
  * $$Total Effective Balance$$ - the cumulative effective balance of all validators belonging to the cluster

#### Under this model:
- Fees are denominated in ETH
- Fees are proportional to the actual Effective Balance of a cluster they secure
- Validator count does *not* affect the fees.
- Effective balance can be distributed across validator keys in any way. For more details, see [Examples](#examples) below.
- Effective balance-based accounting applies only to ETH-based clusters. 


### Legacy Clusters (SSV-based)
:::info Legacy Model
SSV-based clusters continue operating under the validator-count model until they migrate. After the migration, **ETH-based model becomes the only accounting model** used by the protocol.
:::

In the SSV-based model, validators act as a proxy for effective balance.
Each validator is implicitly assumed to represent a fixed 32 ETH of effective balance. Fees therefore scale linearly with the number of validators in the cluster, regardless of how much effective balance those validators actually secure.

$$
(f_o + f_n) * Validator Count
$$

#### Legend:
  * $$f_o$$ - operator fees *(per Validator)* - the fees of all operators in the cluster (denominated in _SSV tokens per block_)
  * $$f_n$$ - network fees *(per Validator)* - the fees owed to the ssv network (denominated in _SSV tokens per block_)

#### Under this model:
- Fees are defined per validator
- Total fees scale with validator count
- Consolidated validators are not fully accounted for

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
