---
sidebar_position: 1
---

# BAM Module

This library will contain all the BasedAppManager contract calls you need for working with Based Applications, such as registering a based application.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.bam.delegateBalance()
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
await sdk.bam.delegateBalance("0xReceiverAddress", 10);
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
await sdk.bam.updateDelegatedBalance("0xReceiverAddress", 7500);
```

---

### `removeDelegatedBalance()`

Removes a delegation.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| receiver | string | Address of the account to remove delegation from. |

**Example:**

```typescript
await sdk.bam.removeDelegatedBalance("0xReceiverAddress");
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
await sdk.bam.registerBApp("0xOwnerAddress", "0xbAppAddress", ["0xToken1", "0xToken2"], 10);
```

---

### `addTokensToBApp()`

Adds new tokens to an existing bApp.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| bAppAddress | string | Address of the bApp. |
| tokens | string[] | List of token addresses. |

**Example:**

```typescript
await sdk.bam.addTokensToBApp("0xbAppAddress", ["0xToken3", "0xToken4"]);
```

---

### `createStrategy()`

Creates a new delegation strategy.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| fee | number | Fee percentage (scaled by 1e4). |

**Example:**

```typescript
await sdk.bam.createStrategy(300);
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
await sdk.bam.optInToBApp(1, "0xbAppAddress", ["0xToken1", "0xToken2"], [5000, 4000]);
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
await sdk.bam.depositERC20(1, "0xTokenAddress", 1000);
```

---

### `depositETH()`

Deposits ETH into a strategy.

**Input parameters:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | number | ID of the strategy. |
| amount | number | ETH amount to deposit. |

**Example:**

```typescript
await sdk.bam.depositETH(1, 2);
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
await sdk.bam.fastWithdrawERC20(1, "0xTokenAddress", 500);
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
await sdk.bam.fastWithdrawETH(1, 2);
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
await sdk.bam.proposeWithdrawal(1, "0xTokenAddress", 1000);
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
await sdk.bam.finalizeWithdrawal(1, "0xTokenAddress");
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
await sdk.bam.proposeWithdrawalETH(1, 2);
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
await sdk.bam.finalizeWithdrawalETH(1);
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
await sdk.bam.createObligation(1, "0xbAppAddress", "0xTokenAddress", 5000);
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
await sdk.bam.fastUpdateObligation(1, "0xbAppAddress", "0xTokenAddress", 6000);
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
await sdk.bam.proposeUpdateObligation(1, "0xbAppAddress", "0xTokenAddress", 7000);
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
await sdk.bam.finalizeUpdateObligation(1, "0xbAppAddress", "0xTokenAddress");
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
await sdk.bam.proposeFeeUpdate(1, 2500);
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
await sdk.bam.finalizeFeeUpdate(1);
```


