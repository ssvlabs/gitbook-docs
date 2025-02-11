---
sidebar_position: 1
---

# Module Reference

### Core Modules

The SDK consists of three main modules:

* [**BAM Module**](bam-module.md): Make calls to the BasedAppManager contract
* [**API Module**](api-module.md): Access based applications data, query states, and retrieve operational information
* [**Utils Module**](utils-module.md): Helper functions for returning strategy weights and other utilities

### Contract Calls

All of the functions within the BAM module are smart contract calls, this means that the return value of these will be the transaction receipt. As shown in the examples, this receipt can be stored to a variable and accessed to get values such as the transaction hash.

```bash
{
  "blockHash": "0x9e0a0b0a5296571b4e573b1cb8b23201575e0e5c9cde9e3a10b34fa2e8b0d401",
  "blockNumber": 17283901, 
  "contractAddress": null,
  "cumulativeGasUsed": 21000,
  "effectiveGasPrice": "20000000000",
  "from": "0xYourWalletAddress",
  "gasUsed": 21000,
  "logs": [],
  "logsBloom": "0x000000000000000000000...",
  "status": 1,
  "to": "0xRecipientAddressHere",
  "transactionHash": "0xTxHashHere",
  "transactionIndex": 0,
  "type": "0x2"
}
```

### Transaction Parameters

For each function that performs a contract call, we can include additional custom arguments alongside the function parameters. This allows us to modify the transaction details in the same way we would customize any Ethereum transaction before sending it.

An example of this can be seen here where we update the gas limit like so:


```typescript
const tx = await sdk.bam.registerBapp({
  args: {
    keyshares: available,
    depositAmount: parseEther('10'),
  },
  gas: 1000000n,
})
```

### Parameter List

Below is a list of parameters that can be included within the transaction, for more details you can check [Viem's page on transaction parameters](https://viem.sh/docs/actions/wallet/sendTransaction.html#parameters).

```typescript
gas: number,
gasPrice: bigint,
maxFeePerGas: bigint,
maxPriorityFeePerGas: bigint,
nonce: number,
value: bigint,
chain: Chain,
account: Account,
chain: Chain,
accessList: AccessList,
```
