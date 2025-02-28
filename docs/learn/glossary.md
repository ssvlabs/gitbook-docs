---
sidebar_label: 'Glossary'
sidebar_position: 6
---

# Glossary

### Beacon Chain

The Beacon Chain is the core of the new Ethereum Proof-of-Stake (PoS) consensus mechanism. The Beacon Chain went live on Dec. 1, 2020 at noon UTC.

The Beacon Chain is a brand-new, proof-of-stake blockchain that stores and manages the registry of validators in order to support the new Ethereum PoS system. It is constantly scanning, validating, collecting votes and rewarding validators that correctly attest to blocks. On the other hand, it deducts rewards for those validators not online and slashes the ETH rewards from malicious actors.

### Cluster

The group (usually 4, in compliance with [the fault tolerance rule is accepted](../../../stakers/validators/validator-onboarding)) of non-trusting operators that manage a set (one, or multiple) validator(s). Each operator in the cluster holds a share of the complete validator key, for more information, see [Shamir Secret Sharing](glossary.md#shamir-secret-sharing).&#x20;

### Consensus Client

Formerly known as an Eth2 client. Runs the Ethereum PoS (Proof-of-Stake) consensus layer, aka the Beacon Chain, checking the validity of transactions and new blocks. Examples of consensus clients include Prysm, Teku, Lighthouse, Nimbus, and Lodestar.

### Custodial Staking

Centralized service that manages the entire ETH staking process on behalf of the user and retains custody over user private validator keys and withdrawal keys. Custodial staking risks include: severe slashing penalties, reduced overall rewards and increased likelihood of attack on user keys as they are held in a centralized fashion by the service.

### DAO

an Decentralized Autonomous Organization is is an organization constructed by rules encoded as a computer program that is often transparent, controlled by the organization's members and not influenced by a central government, in other words they are member-owned communities without centralized leadership.

### Distributed Key Generation

A cryptographic process to generate a shared public and private key set, calculated by the operators running an SSV node instance. Each operator owns a single portion of the private key, ensuring that no single operator can affect or have control over the entire private key or make unilateral decisions on behalf of a validator.

### DVT

Distributed Validator Technology is another name for SSV (Secret Shared Validator). SSV can also be referred to as DVT because the validator is distributed over multiple non-trusting nodes.

### Epochs & Slots

An epoch lasts approximately 6.4 minutes, and includes 32 slots. A slot lasts 12 seconds, during and is the time period in which a randomly selected validator proposes a block.

### ETH Staking Services

Staking services offer a streamlined way to participate in Ethereum staking. When considering an ETH staking service, it is important to understand how these services manage private user keys. Generally, the more centralized (custodial) the service, the higher the security risks and penalties its users may face, especially if the staking service participates in malicious behaviors or goes offline for an extended period.

### Ethereum Staking Keys

Running an Ethereum validator requires two (2) separate keypairs (public and private):

**Validator Key** A hotkey (key connected to the internet) that is used to sign the validator’s assigned duties.

**Withdrawal Key** A key that is only used for transferring or withdrawing staked ETH. This key should be safely stored offline.

_\*transfers and withdrawals will not be available until later phases of the network upgrade._

### Execution Client

Formerly known as an Eth1 client. Manages the transaction pool for the Ethereum blockchain and runs the EVM. Provides execution data to consensus clients for inclusion in blocks. Examples of execution clients include Go-Ethereum, Nethermind, and Erigon.

### Fault Tolerance

Enables a system to continue operating properly in the event one or more of its components fails. In SSV, this refers to multiple KeyShares operating the validator on multiple non-trusting nodes, and the ability to recreate a data signature even if one of those nodes is offline.

### Governance

Anyone owning SSV tokens can participate in the ssv.network DAO from a governance standpoint and vote on proposals and other items requiring a vote. The amount of SSV tokens owned determines voting power on network decisions.

### Istanbul Byzantine Fault Tolerance Consensus

Tying it all together, the consensus layer of SSV is based on the Istanbul Byzantine Fault Tolerance (IBFT) algorithm. The algorithm randomly selects a validator node (KeyShare) responsible for proposing a block and shares the information with the other participants. Once the predefined threshold of KeyShares deems the block to be valid, it is added to the chain. As such, consensus can be reached even if some operators are faulty or not currently online ([Advanced IBFT reading](https://github.com/ssvlabs/ssv/blob/main/ibft/IBFT.md)).

### KeyShare

Using [Distributed Key Generation](/developers/tools/ssv-dkg-client/), the SSV protocol encrypts and splits a validator key into multiple “KeyShares”. The KeyShares are then distributed to multiple non-trusting nodes, run by operators. This allows the key to be generated and then stored securely offline while the KeyShares that represent it actually run the validator.

### Liquidation

Liquidation can occur when a staker’s SSV balance drops below the “threshold balance”. (see Liquidation Collateral) This will trigger the validator’s SSV node to terminate services and stop managing the validator.

### Liquidation Collateral

Liquidation collateral is a deposit stakers are required to make in SSV tokens to ensure operators are always compensated for their efforts and to keep the network solvent.

The collateral amount covers the operator costs for a set number of blocks, known as the “threshold balance”.

Liquidation collateral serves as the incentive for liquidators to constantly monitor the network and liquidate accounts that are in default.

### Multi-Party Computation

Applying secure Multi-Party Computation (MPC) to secret sharing allows for KeyShares of an SSV to be securely distributed amongst operators securely as well as perform decentralized computation of validator duties without reconstructing the validator key on any single device.

### Non-Custodial Staking

A service that provides streamlined Ethereum validator set-up and management, but does not hold user private validator keys AND withdrawal keys. Allowing users to maximize staking returns, mitigate security risks and retain complete control over their assets.

### Operator

Individuals or institutions that provide the hardware infrastructure, run the SSV protocol, and manage validator KeyShares on behalf of users (stakers). Operators collect fees from stakers in SSV tokens in return for operating their validator(s) on ssv.network. Each operator is ranked on a scale of 0-100% by the DAO based on the overall quality of service they provide.

### Proof of Staking

The Ethereum main chain, in its current form, is based on a consensus mechanism known as Proof of Work (PoW). PoW relies on miners expending large amounts of computing power and high amounts of electricity to confirm transactions and add blocks on the blockchain. The more blocks added to the chain, the greater the computing power and time needed to process transactions and grow the blockchain.

Proof of Stake (PoS) however, is a consensus mechanism designed to improve security, scalability, and energy efficiency. Instead of relying on miners to expend computing power, Ethereum PoS relies on validators running on staked Ethereum (ETH). These validators take turns proposing and attesting blocks in a pseudo-random fashion. Validators receive rewards for correct and timely contributions, and face penalties if they behave in ways that are not in the best interest of the network.

### Semi-Custodial Staking

A staking service that often claims to be non-custodial, but holds user validator keys. Although this type of service does not hold withdrawal keys, and thus cannot access user funds, semi-custodial staking risks include severe slashing penalties and reduced overall rewards.

### Shamir Secret Sharing

A mechanism used to reconstruct a validator key using a predefined threshold of KeyShares. Eth2 validator keys use BLS signatures and BLS signatures are additive, allowing for multiple signatures to be combined to recreate a validator key signature. Individual KeyShares cannot be used to sign a duty, yet not all are needed if some are faulty, as described by n≥3f+1.

### Slashing

If an Ethereum validator behaves maliciously, they would lose a significant amount of staked ETH (up to the entire 32 ETH deposit stake as collateral) and be forcibly removed from the network. Slashing protection is an important component of validator client software (for DIY stakers), and a staking service’s product offering as protection against a validator accidentally partaking in a slashable offense and risking their ETH.

### SSV Node

This is software containing the SSV protocol implementation and integration to the network’s smart contracts. It is run by Operators and includes a validator client.

The SSV Node software maintain peer-to-peer connections with other Nodes to handle communication with the rest of the ssv.network. An SSV Node is responsible for the following:

* Management of validator KeyShares
* Shamir Secret Sharing
* Multi-Party Computation
* Validator signing duties to the Beacon Chain

### SSV Token

ssv.network allows access to a decentralized ETH staking infrastructure with SSV token as the protocol’s native token. It has 3 main purposes:

* **Governance** – Submitting votes and voting on DAO proposals
* **Fees** – Operators receive SSV tokens from Stakers for managing and operating validators on their behalf
* **Grants** – DAO funding for developers and contributors helping to grow the network

### Staker

Services or individual ETH holders that wish to leverage SSV/DVT technology for optimal liveness, security and decentralization of their validator(s). Stakers put 32 ETH “at stake” for each validator they want to run. In the PoS consensus mechanism, validators secure the Ethereum blockchain and earn ETH rewards in return for doing so.

### Staking

Staking is the contributory action of running a node in a PoS consensus mechanism blockchain. One must ‘put at stake’ a certain amount of network tokens in order to participate in securing the blockchain by verifying and adding blocks. On Ethereum, the minimum threshold to participate as a validator is 32 ETH. Validators will earn ETH rewards for honestly attesting to and adding blocks. A validator risks decreasing their stake by participating in malicious behaviors or for time spent offline, disconnected from the network.

### Total Value Locked (TVL)

The total amount of ETH in USD (or other currency) that is “locked-up” by stakers running validators on the blockchain. TVL = (# of validators on the network) x (current price of Ethereum).

### Validator

A validator is responsible for confirming transactions and proposing new blocks on the Ethereum blockchain. In order to run a validator, one must put 32 ETH ‘at stake’, which is subject to increase (or decrease) as the validator performs its assigned duties. A validator is different from the comparable concept of a miner on the legacy Ethereum chain, as validators are called upon by the PoS protocol to propose and validate emerging blocks rather than compete for their generation.

An SSV validator is one that is run on ssv.network and employs SSV technology to split the validator key into 4 KeyShares for the purposes of distributing the validator over multiple nodes for redundancy and fault-tolerance.
