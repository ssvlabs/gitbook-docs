---
sidebar_position: 1
---

# Fees

### Operator Fees

The ssv.network utilizes a free-market approach such that operators can set their desired fees. This approach drives competition between operators and helps ensure that operator services are provided to stakers at lower costs.

When operators register to the network, they set their fee, which is then charged per 32 ETH of [Effective Balance](/learn/network-overview/clusters/effective-balance.md) of a validator that selects them as an operator.

For simplicity and standardization, fees charged for using the network are normalized as annual payments. Although, in practice, they are paid to operators on an ongoing basis - per each passing block (contrary to a single payment model).

For example, assuming there are 100 blocks per day and an operator has a set fee of 0.365 ETH per year, then the revenue per 32 ETH of Effective Balance would be:

0.365 ETH / 100 blocks per day / 365 days in a year = 0.00001 ETH per block

You can find more details on the dedicated [Operator Onboarding page](/learn/network-overview/operators).

### Network Fees

In addition to operator fees, stakers are required to pay a ‘network fee’ per 32 ETH of Effective Balance they run through the network.

The network fee is a fixed cost determined by the DAO that governs the network. It's accessible through the [SSV Network Views smart contract](/developers/smart-contracts/ssvnetworkviews#getnetworkfee) or via the [Subgraph](/developers/api/subgraph-examples#dao-constants-and-protocol-network-fee-index). 