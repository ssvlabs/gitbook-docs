# Staking Pools

{% hint style="warning" %}
This section and the documents under it have not been updated to V3 testnet
{% endhint %}

Liquid staking overcomes some of the main barriers and pain points that have come to light with Ethereum staking. Since running a validator requires a 32 ETH collateral lockup, those who cannot meet this requirement are left out. Liquid staking allows people that can't reach the required stake on their own, to pool their assets together and reap the staking rewards. Additionally, by issuing a liquid staking derivative (LSD) pegged 1:1 to Ethereum, liquid staking allows users to have access to their funds (making it liquid) and enabling them to store, transfer, spend, trade and leverage through other defi applications while their stake is still locked up.

Building an SSV-based staking pool is very similar in key concepts and components to other existing staking pool designs. However, its key differentiator and value lie in the operation of its validators - which in contrast to standard staking pools - is decentralized since they are distributed between the multiple non-trusting operators of the network.

### Integration Overview

This integration guide outlines how to develop, operate, and maintain a staking pool built on the ssv.network.

Developing an SSV-based staking pool is outlined through these 3 stages:

1. **Initialization** - generation and distribution of validator keys to KeyShares and construction of a validator registry in the pool manager contract.
2. **Operation** - aggregation of pools, each containing 32 ETH, into validators by depositing their stake and registering them for operation through the ssv.network.
3. **Maintenance** - rebasing the pool’s LSD for accrued rewards and enabling validator management capabilities.

![](<../../../.gitbook/assets/image (15).png>)

#### Key Terms

Below is a description of the different components and entities which will be referenced throughout the guide:

* **Pool Operator** - a staking pool entity in charge of validator generation, activation, and management in the ssv.network.
* **Users** - services or individual ETH holders that want to participate in Ethereum staking via a staking pool.
* **Staking Pool Smart Contracts**
  * **Pool Manager Contract** - the staking pool gateway contract that aggregates users’ funds into pools, maintains its validator registry, and manages its validator's operation through the SSV smart contract integration.
  * **poolETH Token Contract** - an ERC20 token contract that represents the staked ETH in the staking pool and the staker’s accrued rewards by using a staking token derivative.
* **Ethereum Deposit Smart Contract** - an Ethereum contract that manages a validator's deposit and registration to the beacon chain.
* **SSV Network Smart Contract** - the ssv.network gateway contract that enables management functionalities for validators and operators.
* **SSV Network Operators** - individuals or institutions that run a node in the ssv.network. Operators serve as the network's backbone by managing the operation of validators on behalf of stakers.
* **Beacon Chain** - the consensus layer of the Ethereum network. It is responsible for creating new blocks, ensuring they are valid, and rewarding validators with ETH for keeping the network secure.
* **Oracles** - a set of off-chain entities in charge of reporting the staking pool’s validators aggregated rewards on the beacon chain.
