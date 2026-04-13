---
sidebar_position: 1
---

# Fees

### Operator Fees

SSV Network uses a free-market approach in which operators set their own fees. This drives competition and helps keep operator services competitively priced for stakers.

When operators register to the network, they set a fee that is charged per 32 ETH of [effective balance](/learn/network-overview/clusters/effective-balance) for each validator that selects them.

For simplicity and standardization, fees are expressed as annual payments. In practice, however, they are paid continuously per block rather than as a single payment.

For example, in this simplified illustration, assuming there are 100 blocks per day and an operator fee is 0.365 ETH per year, the revenue per 32 ETH of effective balance would be:

0.365 ETH / 100 blocks per day / 365 days in a year = 0.00001 ETH per block

You can find more details on the dedicated [Operator Onboarding page](/learn/network-overview/operators).

### Network Fees

In addition to operator fees, stakers must pay a network fee per 32 ETH of effective balance they run through the network. It is set by DAO to be 1% of Ethereum APR.

The network fee is a fixed cost determined by the DAO that governs the network. It's on-chain value can be accessed through the [SSV Network Views smart contract](/developers/smart-contracts/ssvnetworkviews#getnetworkfee) or via the [Subgraph](/developers/api/subgraph-examples#dao-constants-and-protocol-network-fee-index). 
