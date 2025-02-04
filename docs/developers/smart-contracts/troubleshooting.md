---
sidebar_position: 3
---

# Troubleshooting

Developers trying to interact with ssv.network's Smart Contracts, might encounter errors, or reverted transactions.

Tools like [Etherscan](https://holesky.etherscan.io/) might not be very helpful in this case, as ssv.network's Smart Contract implement Custom Errors, which are not stored on-chain. This is to save on storage and gas costs.

The best way to investigate this issue is to inspect the 4-byte selector for the Custom Error and compare it against the [list of Custom Errors in our public codebase, available on GitHub](https://github.com/ssvlabs/ssv-network/blob/5453fa682977bcc070ba1adecdde101efd518dac/contracts/interfaces/ISSVNetworkCore.sol#L61) (make sure to scroll down).

A useful tool that is able to do this comparison, is [tenderly](https://dashboard.tenderly.co/explorer), thanks to the fact that ssv.network's Smart Contracts have been verified. 

Here is the [SSVNetwork contract, for example](https://dashboard.tenderly.co/contract/holesky/0xDD9BC35aE942eF0cFa76930954a156B3fF30a4E1).
