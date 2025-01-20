# Cluster Module

This is a library which contains all the cluster functions you need for working with SSV, such as registering a validator

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.clusters.registerValidators()
```

## Function List

### `registerValidators()`

Accepts all parameters necessary to compute the keyshares, does this in the background using ssv-keys library, returns the keyshares as an object or saves it to file.

Input:

<table data-header-hidden><thead><tr><th width="190"></th><th></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>keyshares</td><td>KeySharesItem[] | KeySharesPayload[]</td><td>Keyshare or transaction payload</td><td>See output of <a href="../../tools/ssv-dkg-client/generate-key-shares.md">generateKeyShares()</a></td></tr><tr><td> depositAmount</td><td>bigint</td><td>Amount of SSV to deposit to cluster</td><td>4</td></tr></tbody></table>

Example:

```typescript
txn_receipt = await sdk.clusters.registerValidators({ 
    args: { 
        keyshares: keysharesPayload, 
        depositAmount: parseEther('30') 
    },
}).then(tx => tx.wait())
```

### `deposit()`

Executes the contract call to the SSV smart contract to deposit SSV to the cluster.&#x20;

Input:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>Cluster ID</td><td>ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc</td></tr><tr><td> amount</td><td>bigint</td><td>Amount of SSV to deposit to cluster</td><td>4</td></tr><tr><td>approve</td><td>bool</td><td>Whether to execute out the SSV ERC20 approve transaction or not. </td><td>true</td></tr></tbody></table>

Example:

```typescript
import { parseEther } from 'viem'

txn_receipt = await sdk.clusters.deposit({ 
    args: { 
        id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc", 
        amount: parseEther('30')
    },
  {
    approve: true, // Automatically triggers token approval  transaction if the allowance is lower than the deposit amount
  },
}).then(tx => tx.wait())
```

### `liquidateCluster()`

Liquidates a cluster sends their balances to the msg.sender (the Liquidator), **will fail** if the cluster is not liquidatable.

Input:

<table data-header-hidden><thead><tr><th width="190"></th><th></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>Cluster ID</td><td>ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc</td></tr></tbody></table>

Example:

```typescript
txn_receipt = await sdk.clusters.liquidateCluster({ 
    args: { 
        id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc",
    },
}).then(tx => tx.wait())
```

### `withdraw()`

Withdraw a specified amount of SSV from a cluster.

Input:

<table data-header-hidden><thead><tr><th width="190"></th><th width="122"></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>Cluster ID</td><td>ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc</td></tr><tr><td> amount</td><td>bigint</td><td>Amount of SSV to withdraw to cluster</td><td>4</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript">import { parseEther } from 'viem'
<strong>
</strong><strong>txn_receipt = await sdk.clusters.withdraw({ 
</strong>    args: { 
        id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc", 
        amount: parseEther('30') 
    },
}).then(tx => tx.wait())
</code></pre>

### `reactivateCluster()`

Reactivates a liquidated cluster, **will fail** if insufficient SSV tokens to cover the cluster’s liquidation collateral have been deposited.

Input:

<table data-header-hidden><thead><tr><th width="190"></th><th width="122"></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>Cluster ID</td><td>ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc</td></tr><tr><td> amount</td><td>bigint</td><td>Amount of SSV to withdraw to cluster</td><td>4</td></tr></tbody></table>

Example input:

```typescript
import { parseEther } from 'viem'

txn_receipt = await sdk.clusters.reactivateCluster({ 
    args: { 
        id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc", 
        amount: parseEther('30') 
    },
}).then(tx => tx.wait())
```

### `removeValidators()`

Accepts all parameters necessary to compute the keyshares, does this in the background using ssv-keys library, returns the keyshares as an object or saves it to file.

Input:

<table data-header-hidden><thead><tr><th width="190"></th><th width="157"></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>Cluster ID</td><td>ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc</td></tr><tr><td> publicKeys</td><td>Hex[]</td><td>Array of validator public keys to remove.</td><td>["0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e86", "0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e87"]</td></tr></tbody></table>

Example:

```typescript
txn_receipt = await sdk.clusters.removeValidators({ 
    args: { 
        id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc", 
        depositAmount: ["0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e86", "0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e87"],
    },
}).then(tx => tx.wait())
```

### `setFeeRecipient()`

Sets a fee recipient address to receive tips from user transactions (part block proposal rewards). This address will be set for all the account’s validators (all clusters).

Input:

<table data-header-hidden><thead><tr><th width="190"></th><th></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>recipient</td><td>Address</td><td>Valid Ethereum address</td><td>0xA4831B989972605A62141a667578d742927Cbef9</td></tr></tbody></table>

Example:

```typescript
txn_receipt = await sdk.clusters.setFeeRecipient({ 
    args: { 
        recipient: "0xA4831B989972605A62141a667578d742927Cbef9",
    },
}).then(tx => tx.wait())
```

### `exitValidators()`

Prompts SSV nodes to sign a voluntary exit of the validator.

Input:

<table data-header-hidden data-full-width="false"><thead><tr><th width="190"></th><th width="102"></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>publicKeys</td><td>Hex[]</td><td>Public keys of the validators to be exited</td><td>["0xA4831B989972605A62141a667578d742927Cbef9","0xA4831B989972605A62141a667578d742927Cbef8"]</td></tr><tr><td>operatorIds</td><td>bigint[]</td><td>IDs of the operators.</td><td>[1,2,3,4]</td></tr></tbody></table>

Example input:

```typescript
txn_receipt = await sdk.clusters.exitValidators({ 
    args: { 
        publicKeys: ["0xA4831B989972605A62141a667578d742927Cbef9","0xA4831B989972605A62141a667578d742927Cbef8"], 
        operatorIds: [1,2,3,4]
    },
}).then(tx => tx.wait())
```

### `validateSharesPostRegistration()`

Accepts a transaction hash of the validator registration contract call.&#x20;

Input:

<table data-header-hidden data-full-width="false"><thead><tr><th width="190"></th><th width="129"></th><th width="145"></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>txHash</td><td>Hex</td><td>Hash of the register validator transaction.</td><td>"0xd9095893dba18b101c01973069922db2d81c45e814003851ccc586d60ae28e5b"</td></tr></tbody></table>

Example input:

```typescript
const result = await validateSharesPostRegistration( { txHash: '0x123' as Hex })
```

Example output:

```typescript
{
    isValid,
    validations,
    invalids,
    ownerNonceAtBlock: Number(ownerNonce),
    block: Number(receipt.blockNumber)
}
```
