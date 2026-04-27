---
sidebar_position: 2
---


# Operator Module

This is a library which contains all the helper functions you need for working with operators on SSV network.

After instantiating the SDK, you can call any of the functions in the operator library like so:

```typescript
sdk.operators.registerOperator()
```

## Function List

### `registerOperator()`

Registers a new operator with a privacy setting, yearly fee, and operator public key.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| isPrivate | boolean | Whether the operator should be private | true |
| yearlyFee | bigint | Operator yearly fee specified in ETH | 0.1234 |
| publicKey | string | The operator public key (generated as part of the node setup) | "LS0tLS1CRUdJTiBSU0EgUFVCTElDIE..." |

#### Example:

```typescript
import { parseEther } from 'viem'

const receipt = await sdk.operators
    .registerOperator({
      args: {
        publicKey: "LS0tLS1CRUdJTiBSU0EgUFVCTElDIE...",
        yearlyFee: parseEther('0.1234'),
        isPrivate: true,
      },
    })
.then((tx) => tx.wait())
```

### `removeOperator()`

Permanently removes the operator from the network (irreversible). **Will fail if** msg.sender is not the operator owner.


| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |

#### Example:

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

Withdraws an amount of ETH from a specified operator. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | string | Operator id | 4 |
| amount | bigint | Withdraws a specified amount of ETH earnings from provided operator balance to msg.sender | 0.1234 |

#### Example:

```typescript
import { parseEther } from 'viem'

const receipt = await sdk.operators.withdraw({
      args: {
        operatorId: "4",
        amount: parseEther('0.1234'),
      },
    })
.then((tx) => tx.wait())
```

### `withdrawOperatorEarningsSSV()`

Withdraws an amount of SSV from a specified operator. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | string | Operator id | 4 |
| amount | bigint | Withdraws a specified amount of SSV tokens earnings from provided operator balance to msg.sender | 30 |

#### Example:

```typescript
import { parseEther } from 'viem'

const receipt = await sdk.operators.withdrawOperatorEarningsSSV({
      args: {
        operatorId: "4",
        amount: parseEther('30'),
      },
    })
.then((tx) => tx.wait())
```

### `withdrawAllOperatorEarningsSSV()`

Withdraws all of the available SSV from a specified operator's balance. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | string | Operator id | 4 |

#### Example:

```typescript
const receipt = await sdk.operators.withdrawAllOperatorEarningsSSV({
      args: {
        operatorId: "4",
      },
    })
.then((tx) => tx.wait())
```

### `withdrawAllVersionOperatorEarnings()`

Withdraws all available SSV tokens *and* ETH from specified operators' balances. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | string | Operator id | 4 |

#### Example:

```typescript
const receipt = await sdk.operators.withdrawAllVersionOperatorEarnings({
      args: {
        operatorId: "4",
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorWhitelists()`

Sets an external whitelisting contract for the provided operators.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorIds | string[] | Array of operator IDs | ["1","2","3","4"] |
| contractAddress | Address | Address of the contract that manages operator access | "0xA4831B989972605A62141a667578d742927Cbef9" |

#### Example:

```typescript
const receipt = await sdk.operators.setOperatorWhitelists({
      args: {
        operatorIds: ["1","2","3","4"],
        contractAddress: "0xA4831B989972605A62141a667578d742927Cbef9",
      },
    })
.then((tx) => tx.wait())
```

### `removeOperatorWhitelists()`

For a list of operators provided, remove a list of whitelisted addresses. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Array of operator ID(s) | [1,2,3,4] |
| whitelisted | Hex[] | Array of ETH1 addresses to be removed from the whitelist | ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"] |

#### Example:

```typescript
const receipt = await sdk.operators.removeOperatorWhitelists({
      args: {
        operatorId: [1,2,3,4],
        whitelisted: ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"],
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorsPrivate()`

For a list of operators provided, set their status to private. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Array of operator ID(s) | [1,2,3,4] |

#### Example:

```typescript
const receipt = await sdk.operators.setOperatorsPrivate({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorsPublic()`

For a list of operators provided, set their status to public. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Array of operator ID(s) | [1,2,3,4] |

#### Example:

```typescript
const receipt = await sdk.operators.setOperatorsPublic({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorWhitelistingContract()`

For a list of operators provided, set an external whitelisting contract to manage the whitelist for these operators. [Must be a valid whitelisting contract.](https://docs.ssv.network/developers/smart-contracts/external-whitelist-contract-example). **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Array of operator ID(s) | [1,2,3,4] |
| whitelistingContract | string | A valid whitelisting contract address | "0xA4831B989972605A62141a667578d742927Cbef9" |

#### Example:

```typescript
const receipt = await sdk.operators.setOperatorWhitelistingContract({
      args: {
        operatorId: [1,2,3,4],
        whitelistingContract: "0xA4831B989972605A62141a667578d742927Cbef9",
      },
    })
.then((tx) => tx.wait())
```

### `removeOperatorWhitelistingContract()`

For a list of operators provided, remove the whitelisting contract stored. **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint[] | Array of operator ID(s) | [1,2,3,4] |

#### Example:

```typescript
const receipt = await sdk.operators
    .removeOperatorWhitelistingContract({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
```

### `declareOperatorFee()`

Initiates the first step of the operator fee update cycle - declaration of a new fee. [After specified](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews#getoperatorfeeperiods) time window operator will be able to change to the new fee with executeOperatorFee(). **Will fail if** msg.sender is not the operator owner.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |
| fee | bigint | New fee (denominated as ETH per block). ***Amount must be shrinkable (divisible by 10000000)***, for simplicity we use `parseEther` | 0.1234 |

#### Example:

```typescript
import { parseEther } from 'viem'

const receipt = await sdk.operators
    .declareOperatorFee({
      args: {
        operatorId: 4,
        fee: parseEther('0.1234'),
      },
    })
.then((tx) => tx.wait())
```

### `executeOperatorFee()`

Activates operator's fee change specified in previously called declareOperatorFee(). This function needs to be called within a [certain time window](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews#getoperatorfeeperiods) following declareOperatorFee().

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |

#### Example:

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

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |

#### Example:

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

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | bigint | Operator id | 4 |
| fee | bigint | New fee (denominated as ETH per block). ***Amount must be shrinkable (divisible by 10000000)***, for simplicity we use `parseEther` | 0.1234 |

#### Example:

```typescript
import { parseEther } from 'viem'

const receipt = await sdk.operators
    .reduceOperatorFee({
      args: {
        operatorId: 4,
        fee: parseEther('0.1234'),
      },
    })
.then((tx) => tx.wait())
```
