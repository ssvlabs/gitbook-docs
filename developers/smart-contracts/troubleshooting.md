# Troubleshooting

Developers trying to interact with ssv.network's Smart Contracts, might encounter errors, or reverted transactions.

Tools like [Etherscan](https://goerli.etherscan.io/) might not be very helpful in this case, as ssv.network's Smart Contract implement Custom Errors, which are not stored on-chain. This is to save on storage and gas costs.

The best way to investigate this issue is to inspect the 4-byte selector for the Custom Error and compare it against the [list of Custom Errors in our public codebase, available on GitHub](https://github.com/ssvlabs/ssv-network/blob/5453fa682977bcc070ba1adecdde101efd518dac/contracts/interfaces/ISSVNetworkCore.sol#L61) (make sure to scroll down).

A useful tool that is able to do this comparison, is [tenderly](https://dashboard.tenderly.co/explorer), thanks to the fact that ssv.network's Smart Contracts have been verified. Here is [`SSVNetwork` contract, for example](https://dashboard.tenderly.co/contract/goerli/0x0097bbea812414d42d2ad6d76c7da1c794aa16a9).
