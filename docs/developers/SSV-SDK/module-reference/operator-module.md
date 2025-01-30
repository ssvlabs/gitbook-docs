---
sidebar_position: 2
---


# Operator Module

This is a library which contains all the helper functions you need for working with operators on SSV.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.operators.registerOperator()
```

## Function List

### `registerOperator()`

Accepts a list of addresses, fetches their nonces using subgraph, returns as a list.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| isPrivate | bool | true/false flag of whether the operator is private | true |
| yearlyFee | bigint | The operator public key (generated as part of the node setup) | 2000000000000000 |
| publicKey | string | The operator public key (generated as part of the node setup) | "0xA4831B989972605A62141a667578d742927Cbef9" |

Example:

```typescript
const receipt = await sdk.operators
    .registerOperator({
      args: {
        publicKey: "LS0tLS1CRUdJTiBSU0EgUFVCTElDIE..."
        yearlyFee: 100000000000000,
        isPrivate: true,
      },
    })
.then((tx) => tx.wait())
```

### `removeOperator()`

Permanently removes the operator from the network (irreversible).

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |

Example:

```typescript
const receipt = await sdk.operators
    .removeOperator({
      args: {
        operatorId: 4,
      },
    })
.then((tx) => tx.wait())
```

### `withdraw()`

Withdraws an amount of SSV from a specified operator.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | string | Operator id | 4 |
| amount | bigint | Withdraws all SSV tokens earnings from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner | 1231231231311231 |

Example:

```typescript
const receipt = await sdk.operators
    .withdraw({
      args: {
        operatorId: "4",
        amount: 1231231231311231,
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorWhitelists()`

For a list of operators provided, set a list of whitelisted addresses which can register validators to these operators.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Operator id array | [1,2,3,4] |
| whitelisted | Hex[] | A list of ETH1 addresses to be whitelisted | ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"] |

Example:

```typescript
const receipt = await sdk.operators
    .setOperatorWhitelists({
      args: {
        operatorId: [1,2,3,4],
        whitelisted: ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"],
      },
    })
.then((tx) => tx.wait())
```

### `removeOperatorWhitelists()`

For a list of operators provided, remove a list of whitelisted addresses.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Operator id array | [1,2,3,4] |
| whitelisted | Hex[] | A list of ETH1 addresses to be removed from the whitelist | ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"] |

Example:

```typescript
const receipt = await sdk.operators
    .removeOperatorWhitelists({
      args: {
        operatorId: [1,2,3,4],
        whitelisted: ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"],
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorsPrivate()`

For a list of operators provided, set their status to private.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Operator id array | [1,2,3,4] |

Example:

```typescript
const receipt = await sdk.operators
    .setOperatorsPrivate({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorsPublic()`

For a list of operators provided, set their status to public.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Operator id array | [1,2,3,4] |

Example:

```typescript
const receipt = await sdk.operators
    .setOperatorsPublic({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorWhitelistingContract()`

For a list of operators provided, set an external whitelisting contract to manage the whitelist for these operators. [Must be a valid whitelisting contract.](https://docs.ssv.network/developers/smart-contracts/external-whitelist-contract-example)

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Operator id array | [1,2,3,4] |
| whitelistingContract | string | A valid whitelisting contract address | "0xA4831B989972605A62141a667578d742927Cbef9" |

Example:

```typescript
const receipt = await sdk.operators
    .setOperatorWhitelistingContract({
      args: {
        operatorId: [1,2,3,4],
        whitelistingContract: "0xA4831B989972605A62141a667578d742927Cbef9",
      },
    })
.then((tx) => tx.wait())
```

### `removeOperatorWhitelistingContract()`

For a list of operators provided, remove the whitelisting contract stored.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Operator id array | [1,2,3,4] |

Example:

```typescript
const receipt = await sdk.operators
    .removeOperatorWhitelistingContract({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
```

#### `declareOperatorFee()`

Initiates the first step of the operator fee update cycle - declaration of a new fee. [After specified](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews#getoperatorfeeperiods) time window operator will be able to change to the new fee with executeOperatorFee().

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |
| operatorFee | bigint | New fee (denominated as $SSV tokens per block). ***Amount must be shrinkable (divisible by 10000000)*** | 100000000 |

Example:

```typescript
const receipt = await sdk.operators
    .declareOperatorFee({
      args: {
        operatorId: 4,
        operatorFee: 100000000,
      },
    })
.then((tx) => tx.wait())
```

### `executeOperatorFee()`

Activates operator's fee change specified in previously called declareOperatorFee(). This function needs to be called within a [certain time window](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews#getoperatorfeeperiods) following declareOperatorFee().

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |

Example:

```typescript
const receipt = await sdk.operators
    .executeOperatorFee({
      args: {
        operatorId: 4,
      },
    })
.then((tx) => tx.wait())
```

### `cancelDeclaredOperatorFee()`

Cancels operator's fee change requested in previously called declareOperatorFee().

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |

Example:

```typescript
const receipt = await sdk.operators
    .cancelDeclaredOperatorFee({
      args: {
        operatorId: 4,
      },
    })
.then((tx) => tx.wait())
```

### `reduceOperatorFee()`

Reduce the operator fee, does not abide by the restrictions of fee increase.

Input parameters:

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |
| fee | bigint | New fee (denominated as $SSV tokens per block). ***Amount must be shrinkable (divisible by 10000000)*** | 100000000 |

Example:

```typescript
const receipt = await sdk.operators
    .reduceOperatorFee({
      args: {
        operatorId: 4,
        fee: 100000000, 
      },
    })
.then((tx) => tx.wait())
```
