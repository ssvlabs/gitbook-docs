---
sidebar_label: 'Glossary'
sidebar_position: 6
---

# Glossary

### Beacon Chain

The Beacon Chain is the core of the new Ethereum Proof-of-Stake (PoS) consensus mechanism. The Beacon Chain went live on Dec. 1, 2020 at noon UTC.

The Beacon Chain is a brand-new, proof-of-stake blockchain that stores and manages the registry of validators in order to support the new Ethereum PoS system. It is constantly scanning, validating, collecting votes and rewarding validators that correctly attest to blocks. On the other hand, it deducts rewards for those validators not online and slashes the ETH rewards from malicious actors.

### Cluster

A group of non-trusting operators that manages one or more validators. Clusters are formed in sizes that follow the protocol fault-tolerance rule; for more details, see [Cluster Creation](/learn/network-overview/clusters/cluster-creation). Each operator in the cluster holds a share of the validator key; for more information, see [Shamir Secret Sharing](/learn/glossary#shamir-secret-sharing).

### Consensus Client

Formerly known as an Eth2 client. Runs the Ethereum PoS (Proof-of-Stake) consensus layer, aka the Beacon Chain, checking the validity of transactions and new blocks. Examples of consensus clients include Prysm, Teku, Lighthouse, Nimbus, and Lodestar.

### cSSV Unstaking Cooldown Period

The mandatory waiting period (initially 7-days) between cSSV token unstaking and withdrawing your staked SSV. During this cooldown:
- Rewards stop accruing immediately
- Oracle voting weight remains active
- The process cannot be cancelled
- Unclaimed rewards can still be claimed

The cooldown exists to maintain oracle voting stability and prepare for future governance mechanisms.

### cSSV

A non-rebasing, transferable ERC-20 token received when you stake SSV tokens. When unstaking, cSSV is burned and you receive back your original SSV plus any unclaimed rewards. cSSV contributes to the network’s oracle infrastructure by providing voting weight for effective balance reporting.


### Custodial Staking

A centralized service that manages the entire ETH staking process on behalf of the user and retains custody of the user’s validator keys and withdrawal keys. Custodial staking risks include severe slashing penalties, reduced overall rewards, and increased risk to user keys because they are held centrally by the service.

### DAO

A Decentralized Autonomous Organization is an organization governed by rules encoded in computer programs. It is typically transparent, controlled by its members, and not led by a central authority.

### Distributed Key Generation

A cryptographic process to generate a shared public and private key set, calculated by the operators running an SSV node instance. Each operator owns a single portion of the private key, ensuring that no single operator can affect or have control over the entire private key or make unilateral decisions on behalf of a validator.

### DVT

Distributed Validator Technology is another name for SSV (Secret Shared Validator). SSV can also be referred to as DVT because the validator is distributed over multiple non-trusting nodes.

### Effective Balance (EB)

The active stake balance of a validator on the Beacon Chain, used to calculate staking rewards. After Ethereum’s Pectra upgrade, validators can have variable effective balances from 32 to 2048 ETH, rather than a fixed 32 ETH.

In SSV Network, effective balance is also used as a fee-accounting measure. Clusters pay fees proportional to their validators’ actual effective balances. Effective balances are reported by oracles and used to calculate fair fee distribution. See [Effective Balance Accounting](/learn/network-overview/clusters/effective-balance).

### Epochs & Slots

An epoch lasts approximately 6.4 minutes and includes 32 slots. A slot lasts 12 seconds and is the time period during which a randomly selected validator may propose a block.

### ETH Staking Services

Staking services offer a streamlined way to participate in Ethereum staking. When considering an ETH staking service, it is important to understand how these services manage private user keys. Generally, the more centralized (custodial) the service, the higher the security risks and penalties its users may face, especially if the staking service participates in malicious behaviors or goes offline for an extended period.

### Ethereum Staking Keys

Running an Ethereum validator requires two (2) separate keypairs (public and private):

**Validation Key** A hot key connected to the internet that is used to sign the validator’s assigned duties.

**Withdrawal Key** A key used only to transfer or withdraw staked ETH. This key should be stored safely offline.

_\*transfers and withdrawals will not be available until later phases of the network upgrade._

### Execution Client

Formerly known as an Eth1 client. Manages the transaction pool for the Ethereum blockchain and runs the EVM. Provides execution data to consensus clients for inclusion in blocks. Examples of execution clients include Go-Ethereum, Nethermind, and Erigon.

### Fault Tolerance

Enables a system to continue operating properly when one or more of its components fails. In SSV, this refers to multiple key shares operating the validator across multiple non-trusting nodes, and the ability to produce a valid signature even if one of those nodes is offline.

### Governance

Anyone holding SSV tokens can participate in the SSV Network DAO and vote on proposals and other items that require a vote. The amount of SSV held determines voting power on network decisions. See [Governance](/learn/network-overview/governance).

### Istanbul Byzantine Fault Tolerance Consensus

Tying it all together, the consensus layer of SSV is based on the Istanbul Byzantine Fault Tolerance (IBFT) algorithm. For each validator duty, the cluster reaches agreement on what should be signed before a threshold of operators produces partial signatures. Consensus can be reached even if some operators are faulty or not currently online ([advanced IBFT reading](https://github.com/ssvlabs/ssv/blob/main/ibft/IBFT)).

### KeyShare

Using [Distributed Key Generation](/learn/tech-overview#distributed-key-generation), the SSV protocol encrypts and splits a validator key into multiple key shares. The key shares are then distributed to multiple non-trusting nodes run by operators. This allows the validator key to be generated and then stored securely offline while the key shares are used to operate the validator.

### Liquidation

Liquidation can occur when a cluster’s ETH balance drops below the threshold balance; see [Liquidations](/learn/tokenomics/liquidations). This causes operators to stop managing the cluster’s validators.

### Liquidation Collateral

[Liquidation collateral](/learn/tokenomics/liquidations#liquidation-collateral) is a deposit stakers are required to make in ETH to ensure operators are always compensated for their efforts and to keep the network solvent.

The collateral amount covers the operator costs for a set number of blocks, known as the “threshold balance”.

Liquidation collateral serves as the incentive for liquidators to constantly monitor the network and liquidate accounts that are in default.

### Multi-Party Computation

Applying secure Multi-Party Computation (MPC) to secret sharing allows key shares to be distributed securely among operators and enables decentralized computation of validator duties without reconstructing the validator key on any single device.

### Non-Custodial Staking

A service that streamlines Ethereum validator setup and management without holding users’ validator keys or withdrawal keys. This allows users to maximize staking returns, reduce security risks, and retain control over their assets.

### Effective Balance Oracles

In SSV Network, oracles report validator effective balances from the Beacon Chain to on-chain smart contracts.

These oracles are backed by SSV stakers, who delegate their voting power to their chosen Effective Balance (EB) oracle. This system enables fair fee calculation for validators with variable balances following the Pectra upgrade. See [Effective Balance Oracles](/learn/network-overview/oracles).

### Operator

Individuals or institutions that provide hardware infrastructure, run the SSV protocol, and manage validator key shares on behalf of stakers. Operators collect fees in ETH in return for operating validators on SSV Network. Each operator is ranked on a scale of 0-100% by the DAO based on the overall quality of service they provide.

### Proof of Staking

The Ethereum main chain, in its current form, is based on a consensus mechanism known as Proof of Work (PoW). PoW relies on miners expending large amounts of computing power and high amounts of electricity to confirm transactions and add blocks on the blockchain. The more blocks added to the chain, the greater the computing power and time needed to process transactions and grow the blockchain.

Proof of Stake (PoS) however, is a consensus mechanism designed to improve security, scalability, and energy efficiency. Instead of relying on miners to expend computing power, Ethereum PoS relies on validators running on staked Ethereum (ETH). These validators take turns proposing and attesting blocks in a pseudo-random fashion. Validators receive rewards for correct and timely contributions, and face penalties if they behave in ways that are not in the best interest of the network.

### Semi-Custodial Staking

A staking service that often claims to be non-custodial but holds user validator keys. Although this type of service does not hold withdrawal keys and therefore cannot access user funds, semi-custodial staking still carries risks such as severe slashing penalties and reduced overall rewards.

### Shamir Secret Sharing

A mechanism used to reconstruct validator signatures using a predefined threshold of key shares. Ethereum validator keys use BLS signatures, and BLS signatures are additive, allowing multiple signatures to be combined into a valid validator signature. Individual key shares cannot be used to sign a duty on their own, yet not all are needed if some are faulty, as described by n≥3f+1.

### Slashing

If an Ethereum validator behaves maliciously, they would lose a significant amount of staked ETH (up to the entire 32 ETH deposit stake as collateral) and be forcibly removed from the network. Slashing protection is an important component of validator client software (for DIY stakers), and a staking service’s product offering as protection against a validator accidentally partaking in a slashable offense and risking their ETH.

### SSV Node

Software that contains the SSV protocol implementation and integration with the network’s smart contracts. It is run by operators and includes a validator client.

The SSV Node software maintains peer-to-peer connections with other nodes to communicate with the rest of SSV Network. An SSV Node is responsible for the following:

* Management of validator key shares
* Shamir Secret Sharing
* Multi-Party Computation
* Validator signing duties to the Beacon Chain

### SSV Token

SSV Network provides access to decentralized ETH staking infrastructure, with SSV as the protocol’s native token. It has three main purposes:

* **Governance** – Submitting votes and voting on DAO proposals
* **Grants** – DAO funding for developers and contributors helping to grow the network
* **Staking** – The oracle infrastructure is supported through SSV staking, which enables the delegation of voting power to a chosen oracle.

### SSV Staker

An SSV token holder who stakes SSV to contribute voting weight to the network’s oracle system, which reports validator effective balances on-chain. When staking SSV, the holder receives cSSV, which also allows participation in SSV governance.

### Staker

Services or individual ETH holders that use SSV/DVT technology for improved liveness, security, and decentralization of their validators. Stakers put ETH at stake for each validator they want to run. In Ethereum’s PoS consensus mechanism, validators secure the blockchain and earn ETH rewards in return.

### Staking

Staking is the contributory action of running a node in a PoS consensus mechanism blockchain. One must 'put at stake' a certain amount of network tokens in order to participate in securing the blockchain by verifying and adding blocks. On Ethereum, the minimum threshold to participate as a validator is 32 ETH. Validators will earn ETH rewards for honestly attesting to and adding blocks. A validator risks decreasing their stake by participating in malicious behaviors or for time spent offline, disconnected from the network.

### Total Value Locked (TVL)

The total amount of ETH in USD (or other currency) that is “locked-up” by stakers running validators on the blockchain. TVL = (# of validators on the network) x (current price of Ethereum).

### Validator

A validator is responsible for attesting to and proposing blocks on the Ethereum blockchain. To run a validator, one must put ETH at stake, which can increase or decrease as the validator performs its assigned duties. A validator differs from a miner on legacy Ethereum because validators are selected by the PoS protocol to propose and validate blocks rather than compete to generate them.

An SSV validator is run on SSV Network and uses SSV technology to split the validator key into key shares so the validator can be distributed across multiple nodes for redundancy and fault tolerance.

Post-Pectra, validators can have variable effective balances from 32 to 2048 ETH.
