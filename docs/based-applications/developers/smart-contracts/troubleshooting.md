---
sidebar_position: 3
---

# Troubleshooting

Developers trying to interact with ssv.network's Smart Contracts, might encounter errors, or reverted transactions.

Tools like [Etherscan](https://holesky.etherscan.io/) might not be very helpful in this case, as ssv.network's Smart Contract implement Custom Errors, which are not stored on-chain. This is to save on storage and gas costs.

The best way to investigate this issue is to inspect the 4-byte selector for the Custom Error and compare it against the [list of Custom Errors in our public codebase, available on GitHub](https://github.com/ssvlabs/based-applications/blob/main/src/interfaces/ICore.sol#L43) (make sure to scroll down).

A useful tool that is able to do this comparison, is [tenderly](https://dashboard.tenderly.co/explorer), thanks to the fact that ssv.network's Smart Contracts have been verified. 

Here is the [`BasedAppManager` contract on Hoodi for example](https://dashboard.tenderly.co/contract/hoodi/0x3F2983b813054Eba76Ae137DfA77836CA8b00ACE).  
