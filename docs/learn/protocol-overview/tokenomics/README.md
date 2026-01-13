---
description: Understanding SSV Network tokenomics
sidebar_position: 1
---

# Tokenomics

The ssv.network utilizes its native SSV token to function as an ETH-accrual token. ETH is used to facilitate payments between stakers and SSV node operators to maintain their validators. Operators maintain validators by reaching a consensus with clusters of other operators to perform network duties on the beacon chain, thereby generating Ethereum staking rewards for stakers.

Operators receive ETH payments and generate ETH rewards for stakers. Stakers pay ETH and receive generated ETH rewards in return.

![Operators receive ETH payments and generate ETH rewards for stakers. Stakers pay ETH and receive generated ETH rewards in return.](/img/tokenomics-readme-1.png)
*Operators receive ETH payments and generate ETH rewards for stakers. Stakers pay ETH and receive generated ETH rewards in return.*
SSV Network has evolved to include both payment mechanisms and staking utilities, creating a comprehensive economic model that aligns network growth with token holder rewards.

## Network Payments: ETH Clusters

The network uses ETH-based payments for clusters and operators:

* **Clusters pay in ETH** - Deposit ETH to cover operator and network fees
* **Operators earn in ETH** - Receive ETH payments for managing validators
* **Network fees in ETH** - A portion of fees flows to the protocol

This transition from SSV token payments to ETH enables the network to generate real ETH revenue that can be distributed to SSV stakers.

### Legacy SSV Clusters

Existing SSV token-based clusters continue to operate:
* Can migrate to ETH clusters via `migrateClusterToETH()`
* Operators can serve both ETH and SSV clusters during transition
* SSV token balance refunded upon migration

## SSV as an ETH Accrual Token

SSV token holders can stake their tokens to earn **real ETH yield** generated from network activity. This makes SSV an **ETH Accrual Token** where network fees flow directly to stakers.

When clusters pay fees in ETH, a portion flows into the SSV Staking contract and is distributed proportionally to all stakers. Staked SSV also supports the network's oracle infrastructure by providing voting weight for effective balance reporting.

As the network grows and more validators use SSV, more ETH fees are generated, increasing rewards for stakers.

Learn more in the [SSV Staking Guide](/stakers/ssv-staking/).

## Dual Utility Model

SSV token serves multiple purposes in the ecosystem:

| Utility | Description | Benefit |
|---------|-------------|---------|
| **Staking** | Stake SSV to earn ETH from network fees | Real yield for token holders |
| **Governance** | Vote on protocol decisions and treasury allocation | Decentralized control |
| **Oracle Support** | Staked SSV supports oracle consensus | Network security and accuracy |
| **Legacy Payments** | SSV tokens still used in legacy clusters | Backward compatibility |

## Economic Sustainability

The new economic model creates sustainable, circular value flow:

1. **More ETH staked** → More validators using SSV
2. **More validators** → More ETH fees collected
3. **More fees** → Higher rewards for SSV stakers
4. **Higher rewards** → Increased demand for SSV token
5. **More SSV staked** → Stronger oracle infrastructure
6. **Stronger network** → Attracts more ETH validators

This positive feedback loop ties SSV token value directly to real network usage and revenue.
