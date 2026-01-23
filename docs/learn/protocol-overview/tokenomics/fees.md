---
sidebar_position: 1
---

# Fees

### Operator Fees <a href="#ht1v5x3rp8hp" id="ht1v5x3rp8hp"></a>

The ssv.network utilizes a free-market approach such that operators can set their desired fees. This approach drives competition between operators and helps ensure that operator services are provided to stakers at lower costs.

When operators register to the network, they set their fee (denominated in ETH, and also in SSV token only for previously registered operators), which is then charged to each validator that selects them as an operator.

For simplicity and standardization, fees charged for using the network are normalized as annual payments. Although, in practice, they are paid to operators on an ongoing basis - per each passing block (contrary to a single payment model).

For example, assuming there are 100 blocks per day and an operator has a set fee of 0.365 ETH per year, then the revenue from each validator would be:

0.365 ETH / 100 blocks per day / 365 days in a year = 0.00001 ETH per block

You can find more details on the dedicated [Operator Onboarding page](/operators/operator-onboarding/README.md).

### Network Fees <a href="#k4tw9to38r3v" id="k4tw9to38r3v"></a>

In addition to operator fees, stakers are also required to pay a ‘network fee’ for each validator they run through the network.

The network fee is a fixed cost determined by the DAO that governs the network. It's accessible through the [SSV Network Views smart contract](/developers/smart-contracts/ssvnetworkviews#getnetworkfee-) or via the [Subgraph](/developers/tools/ssv-subgraph/subgraph-examples#dao-constants-and-protocol-network-fee-index). It is denominated in ETH and SSV token. Similarly to operator fees, they are paid continuously over time to the DAO treasury.

This capital is used to fund, grow, and develop activities and projects in the ecosystem that have passed the voting process.