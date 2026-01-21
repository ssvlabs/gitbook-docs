---
sidebar_position: 1
---

# Cluster Module

This is a library which contains all the functions you need for working with Clusters of SSV network, such as registering a validator.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.clusters.registerValidators()
```

## Function List

### `migrateClusterToETH()`
Converts an SSV-based cluster (legacy) to ETH-based cluster. Accepts cluster ID to migrate to ETH-denominated fees, and the amount of ETH to deposit upon migrating.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| `cluster_Id` | string | A `cluster_id` in its computed ID form. | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |
| amount | bigint | Amount of ETH to deposit to fund the cluster | 0.1234 |

#### Example:

```typescript
txn_receipt = await sdk.clusters.migrateClusterToETH({ 
    args: { 
        cluster_Id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8", 
        amount: parseEther('0.1234') 
    },
}).then(tx => tx.wait())
```

### `registerValidators()`

Accepts a number of keyshares to be validated and registered to the network. 

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| keyshares | KeySharesItem[] | Keyshares | See [keyshares example with its structure](/developers/keyshares-structure) |
| depositAmount | bigint | Amount of ETH to deposit to cluster | 0.1234 |

#### Example:

```typescript
txn_receipt = await sdk.clusters.registerValidators({ 
    args: { 
        keyshares: keysharesPayload, 
        depositAmount: parseEther('0.1234') 
    },
}).then(tx => tx.wait())
```

### `deposit()`

Executes the contract call to to deposit ETH to the cluster balance.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |
| amount | bigint | Amount of ETH to deposit to cluster | 0.1234 |

#### Example:

```typescript
import { parseEther } from 'viem'

txn_receipt = await sdk.clusters.deposit({ 
    args: { 
        id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8", 
        amount: parseEther('0.1234')
    },
}).then(tx => tx.wait())
```

### `liquidateCluster()`

Liquidates a cluster sends their balance to the msg.sender (the Liquidator). **Will fail** if the cluster is not liquidatable.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |

#### Example:

```typescript
txn_receipt = await sdk.clusters.liquidateCluster({ 
    args: { 
        id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8",
    },
}).then(tx => tx.wait())
```

### `liquidateSSV()`

Liquidates a legacy (SSV-based) cluster sends their balance to the msg.sender (the Liquidator). **Will fail** if the cluster is not liquidatable.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |

#### Example:

```typescript
txn_receipt = await sdk.clusters.liquidateSSV({ 
    args: { 
        id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8",
    },
}).then(tx => tx.wait())
```


### `withdraw()`

Withdraw a specified amount of ETH from a cluster.

**Will fail** if:
- the amount to withdraw exceeds the current balance of a cluster;
- msg.sender is not the cluster owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |
| amount | bigint | Amount of ETH to withdraw from the cluster | 0.1234 |

#### Example:

```typescript
import { parseEther } from 'viem'

txn_receipt = await sdk.clusters.withdraw({ 
    args: { 
        id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8", 
        amount: parseEther('0.1234') 
    },
}).then(tx => tx.wait())
```

### `reactivateCluster()`

Reactivates a liquidated cluster.

**Will fail** if:
- the ETH amount to deposit is insufficient to cover the cluster's liquidation collateral;
- msg.sender is not the cluster owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |
| amount | bigint | Amount of ETH to deposit to cluster | 0.1234 |

#### Example:

```typescript
import { parseEther } from 'viem'

txn_receipt = await sdk.clusters.reactivateCluster({ 
    args: { 
        id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8", 
        amount: parseEther('0.1234') 
    },
}).then(tx => tx.wait())
```

### `removeValidators()`

Accepts all parameters necessary to remove the validators. Removes all the validators provided as argument from the SSV network.

**Will fail** if:
- the provided validator keys are not registered to ssv network;
- msg.sender is not the cluster owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID | 0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8 |
| publicKeys | Hex[] | Array of validator public keys to remove | ["0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e86", "0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e87"] |

#### Example:

```typescript
txn_receipt = await sdk.clusters.removeValidators({ 
    args: { 
        id: "0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8", 
        publicKeys: ["0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e86", "0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e87"],
    },
}).then(tx => tx.wait())
```

### `setFeeRecipient()`

Sets a fee recipient address to receive tips from user transactions (part block proposal rewards). This address will be set for all the account's validators (all clusters).

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| recipient | Address | Valid Ethereum address | 0xA4831B989972605A62141a667578d742927Cbef9 |

#### Example:

```typescript
txn_receipt = await sdk.clusters.setFeeRecipient({ 
    args: { 
        recipient: "0xA4831B989972605A62141a667578d742927Cbef9",
    },
}).then(tx => tx.wait())
```

### `exitValidators()`

Prompts SSV nodes to sign a voluntary exit of the validator.

**Will fail** if:
- the provided validator keys are not registered to ssv network;
- msg.sender is not the cluster owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| publicKeys | Hex[] | Array of public keys of the validators to be exited | ["0xA4831B989972605A62141a667578d742927Cbef9","0xA4831B989972605A62141a667578d742927Cbef8"] |
| operatorIds | bigint[] | IDs of the operators | [1,2,3,4] |

#### Example:

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

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| txHash | Hex | Hash of the register validator transaction | "0xd9095893dba18b101c01973069922db2d81c45e814003851ccc586d60ae28e5b" |

#### Example:

```typescript
const result = await sdk.clusters.validateSharesPostRegistration( { txHash: '0x123' as Hex })
```

Output:

```typescript
{
    isValid,
    validations,
    invalids,
    ownerNonceAtBlock: Number(ownerNonce),
    block: Number(receipt.blockNumber)
}
```
