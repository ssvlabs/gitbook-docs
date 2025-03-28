---
sidebar_position: 1
---

# BAM Module

This library will contain all the SSVBasedApps contract calls you need for working with Based Applications, such as registering a based application.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.core.contracts.bapp.write.delegateBalance()
```

## Function List

### `delegateBalance()`

Delegates a percentage of an account's balance to another account.

**Input parameters:**

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| receiver | string | Address of the account to delegate to | "0xReceiverAddress" |
| percentage | number | Percentage of balance to delegate | 10 |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.delegateBalance({
    args: {
      account: "0xA4831B989972605A62141a667578d742927Cbef9",
      percentage: 10,
    },
  }).then((tx) => tx.wait())
```

---

### `updateDelegatedBalance()`

Updates the delegation percentage for an existing delegation.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| receiver | string | Address of the account to update delegation to. |
| percentage | number | Updated percentage to delegate. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.updateDelegatedBalance({
  args: {
    account: "0xReceiverAddress",
    percentage: 10,
  },
}).then((tx) => tx.wait())
```

---

### `removeDelegatedBalance()`

Removes a delegation.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| account | string | Address of the account to remove delegation from. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.removeDelegatedBalance({
  args: {
    account: "0xReceiverAddress",
  },
}).then((tx) => tx.wait())
```

---

### `registerBApp()`

Registers a new bApp.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| owner | string | Address of the bApp owner. |
| bAppAddress | string | Address of the bApp. |
| tokens | string[] | List of accepted token addresses. |
| sharedRiskLevel | number | Risk level of the bApp. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.registerBApp ({
  args: {
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    metadataURI: "https://example.com/metadata",
    tokens: ["0x3f1c547b21f65e10480de3ad8e19faac46c95034"],
    sharedRiskLevels: [1, 2, 3],
  },
}).then((tx) => tx.wait())
```

---

### `addTokensToBApp()`

Adds new tokens to an existing bApp.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| bAppAddress | string | Address of the bApp. |
| tokens | string[] | List of token addresses. |
| sharedRiskLevel | number | Risk level of the bApp. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.addTokensToBApp ({
  args: {
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    tokens: ["0x3f1c547b21f65e10480de3ad8e19faac46c95034"],
    sharedRiskLevels: [1, 2, 3],
  },
}).then((tx) => tx.wait())
```

---

### `createStrategy()`

Creates a new delegation strategy.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| fee | number | Fee percentage (scaled by 1e4). |
| metadataURI | string | The metadata URI for the strategy |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.createStrategy({
    args: {
        fee: 10000,
        metadataURI: "https://example.com/metadata",
    },
}).then((tx) => tx.wait())
```

---

### `optInToBApp()`

Links a strategy to a bApp with specific obligations.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| bApp | string | Address of the bApp. |
| tokens | string[] | List of token addresses. |
| obligationPercentages | number[] | List of obligation percentages. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.optInToBApp({
  args: {
    strategyId: 1,
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    tokens: ["0x3f1c547b21f65e10480de3ad8e19faac46c95034"],
    obligationPercentages: [1, 2, 3],
    data: "0x",
  },
}).then((tx) => tx.wait())
```

---

### `depositERC20()`

Deposits ERC20 tokens into a strategy.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| token | string | ERC20 token address. |
| amount | number | Amount to deposit. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.depositERC20({
  args: {
    strategyId: 1,
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    amount: 2n,
  },
}).then((tx) => tx.wait())
```

---

### `depositETH()`

Deposits ETH into a strategy.

**Input parameters:**

:::info
Note that was pass the amount in the value field here, not within the function arguments
:::

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.depositETH({
  value: 2n,
  args: {
    strategyId: 1
  },
}).then((tx) => tx.wait())
```

---

### `fastWithdrawERC20()`

Withdraws ERC20 tokens from a strategy if the token is not used in obligations.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| token | string | ERC20 token address. |
| amount | number | Amount to withdraw. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.fastWithdrawERC20({
  args: {
    strategyId: 1,
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    amount: 2n,
  },
}).then((tx) => tx.wait())
```


---

### `fastWithdrawETH()`

Withdraws ETH from the strategy if not used in obligations.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| amount | number | ETH amount to withdraw. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.fastWithdrawETH({
  args: {
    strategyId: 1,
    amount: 2n,
  },
}).then((tx) => tx.wait())
```

---

### `proposeWithdrawal()`

Initiates a withdrawal request for ERC20 tokens.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| token | string | ERC20 token address. |
| amount | number | Amount to withdraw. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.proposeWithdrawal({
  args: {
    strategyId: 1,
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    amount: 2n,
  },
}).then((tx) => tx.wait())
```

---

### `finalizeWithdrawal()`

Completes an ERC20 withdrawal after the timelock period.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| token | string | ERC20 token address. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.finalizeWithdrawal({
  args: {
    strategyId: 1,
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
  },
}).then((tx) => tx.wait())
```

### `proposeWithdrawalETH()`

Initiates a withdrawal request for ETH.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| amount | number | Amount of ETH to withdraw. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.proposeWithdrawalETH({
  args: {
    strategyId: 1,
    amount: 2n,
  },
}).then((tx) => tx.wait())
```

---

### `finalizeWithdrawalETH()`

Completes an ETH withdrawal after the timelock period.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.finalizeWithdrawalETH({
  args: {
    strategyId: 1,
  },
}).then((tx) => tx.wait())
```

---

### `createObligation()`

Adds a new obligation for a bApp.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| bApp | string | Address of the bApp. |
| token | string | ERC20 token address. |
| obligationPercentage | number | Obligation percentage. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.createObligation({
  args: {
    strategyId: 1,
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    obligationPercentage: 100,
  },
}).then((tx) => tx.wait())
```

---

### `fastUpdateObligation()`

Quickly updates the obligation percentage for a bApp.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| bApp | string | Address of the bApp. |
| token | string | ERC20 token address. |
| obligationPercentage | number | New obligation percentage. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.fastUpdateObligation({
  args: {
    strategyId: 1,
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    obligationPercentage: 100,
  },
}).then((tx) => tx.wait())
```

---

### `proposeUpdateObligation()`

Proposes an update to an obligation percentage for a bApp.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| bApp | string | Address of the bApp. |
| token | string | ERC20 token address. |
| obligationPercentage | number | Proposed new percentage. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.proposeUpdateObligation({
  args: {
    strategyId: 1,
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    obligationPercentage: 100,
  },
}).then((tx) => tx.wait())
```

---

### `finalizeUpdateObligation()`

Finalizes an obligation update after the timelock period.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| bApp | string | Address of the bApp. |
| token | string | ERC20 token address. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.finalizeUpdateObligation({
  args: {
    strategyId: 1,
    bApp: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
  },
}).then((tx) => tx.wait())
```

---

### `proposeFeeUpdate()`

Proposes a fee update for a strategy.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| proposedFee | number | Proposed fee percentage. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.proposeFeeUpdate({
  args: {
    strategyId: 1,
    proposedFee: 100,
  },
}).then((tx) => tx.wait())
```

---

### `finalizeFeeUpdate()`

Finalizes a fee update after the timelock period.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |

**Example:**

```typescript
const receipt = await sdk.core.contracts.bapp.write.finalizeFeeUpdate({
  args: {
    strategyId: 1,
  },
}).then((tx) => tx.wait())
```

---

### `updateAccountMetadataURI()`

Updates the metadata URI of the caller's account.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| metadataURI | string | The new metadata URI for the account. |

**Example:**

```typescript
await sdk.core.contracts.bapp.write.updateAccountMetadataURI({
  args: {
    metadataURI: "https://example.com/metadata",
  },
}).then((tx) => tx.wait())

  console.log("receipt", receipt);
}
```
