---
sidebar_position: 1
---

# BasedAppManager

The BasedAppManager contract is the main contract for operations and management.

[Based Applications Contracts Repository](https://github.com/ssvlabs/based-applications/)

## Delegate Validator Balance

### **`delegateBalance(account, percentage)`**

Description: Delegates a percentage of the caller's validator balance to another account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| account | address | The address of the account to delegate to |
| percentage | uint32 | The percentage of balance to delegate (scaled by 1e4, so 100% = 10000) |

Events:
* `DelegationCreated(address indexed delegator, address indexed account, uint32 percentage)`

### **`updateDelegatedBalance(account, percentage)`**

Description: Updates an existing delegation percentage for an account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| account | address | The address of the account whose delegation is being updated |
| percentage | uint32 | The new percentage to delegate (scaled by 1e4) |

Events:
* `DelegationUpdated(address indexed delegator, address indexed account, uint32 percentage)`

### **`removeDelegatedBalance(account)`**

Description: Removes delegation from an account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| account | address | The address of the account whose delegation is being removed |

Events:
* `DelegationRemoved(address indexed delegator, address indexed account)`

## bApps

### **`registerBApp(bApp, tokens, sharedRiskLevels, metadataURI)`**

Description: Registers a new Based Application (bApp) with specified tokens and risk levels.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| bApp | address | The address of the bApp to register |
| tokens | address[] | List of token addresses the bApp accepts |
| sharedRiskLevels | uint32[] | Risk levels for each token (max 100000) |
| metadataURI | string | metadata URI of the bApp, which is a link (e.g., http://example.com) to a JSON file containing metadata such as the name, description, logo, etc. |

Events:
* `BAppRegistered(address indexed bApp, address indexed owner, address[] tokens, uint32[] sharedRiskLevels, string metadataURI)`

### **`updateMetadataURI(bApp, metadataURI)`**

Description: Updates the metadata URI of a Based Application (bApp). Can only be called by the bApp owner.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| bApp | address | The address of the bApp |
| metadataURI | string | The new metadata URI pointing to the bApp's metadata JSON |

Events:
* `BAppMetadataURIUpdated(address indexed bApp, string metadataURI)`

### **`addTokensToBApp(bApp, tokens, sharedRiskLevels)`**

Description: Adds new tokens to an existing bApp.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| bApp | address | The address of the bApp |
| tokens | address[] | List of new token addresses to add |
| sharedRiskLevels | uint32[] | Risk levels for each new token |

Events:
* `TokensAddedToBApp(address indexed bApp, address[] tokens, uint32[] sharedRiskLevels)`

### **`updateBAppTokens(bApp, tokens, sharedRiskLevels)`**

Description: Updates the shared risk levels for existing tokens in a bApp. Can only be called by the bApp owner. Fails if any token is not already supported by the bApp or if the new risk level is the same as the current one.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| bApp | address | The address of the bApp |
| tokens | address[] | List of token addresses to update |
| sharedRiskLevels | uint32[] | New risk levels for each token (max 100000) |

Events:
* `BAppTokensUpdated(address indexed bApp, address[] tokens, uint32[] sharedRiskLevels)`

## Strategy

### **`createStrategy()`**

Description: Creates a new strategy for the caller.

Events:
* `StrategyCreated(uint256 indexed strategyId, address indexed owner)`

### **`optInToBApp(strategyId, bApp, tokens, obligationPercentages, data)`**

Description: Opts a strategy into a bApp with specified tokens and obligation percentages. Each token must be supported by the bApp, and a strategy owner cannot opt into the same bApp twice. The obligation percentages don't need to be greater than 0.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| bApp | address | The address of the bApp to opt into |
| tokens | address[] | List of token addresses to create obligations for |
| obligationPercentages | uint32[] | List of obligation percentages for each token (scaled by 1e4) |
| data | bytes | Optional parameter that could be required by the service |

Events:
* `BAppOptedInByStrategy(uint256 indexed strategyId, address indexed bApp, bytes data, address[] tokens, uint32[] obligationPercentages)`

### **`depositERC20(strategyId, token, amount)`**

Description: Deposits ERC20 tokens into a strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy to deposit into |
| token | address | The address of the ERC20 token |
| amount | uint256 | The amount of tokens to deposit |

Events:
* `StrategyDeposit(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount)`

### **`depositETH(strategyId)`**

Description: Deposits ETH into a strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy to deposit into |

Events:
* `StrategyDeposit(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount)`


### **`fastWithdrawERC20(strategyId, token)`**

Description: Performs a fast withdrawal of ERC20 tokens from a strategy if the token is not used in any obligations.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy to withdraw from |
| token | address | The address of the ERC20 token to withdraw |

Events:
* `StrategyWithdrawal(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount, bool isFast)`

### **`fastWithdrawETH(strategyId)`**

Description: Performs a fast withdrawal of ETH from a strategy if the token is not used in any obligations.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy to withdraw from |

Events:
* `StrategyWithdrawal(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount, bool isFast)`

### **`proposeWithdrawal(strategyId, token, amount)`**

Description: Proposes a withdrawal of ERC20 tokens from a strategy, initiating the timelock period. Cannot be used for ETH withdrawals (use proposeWithdrawalETH instead). The amount must be greater than 0 and not exceed the user's balance in the strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| token | address | The address of the ERC20 token to withdraw |
| amount | uint256 | The amount of tokens to withdraw |

Events:
* `StrategyWithdrawalProposed(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount, uint256 unlockTime)`

### **`finalizeWithdrawal(strategyId, token)`**

Description: Finalizes an ERC20 token withdrawal after the timelock period has elapsed. The withdrawal must be completed within the expiry window (WITHDRAWAL_EXPIRE_TIME) after the timelock period ends. Transfers the requested tokens to the caller and updates their strategy balance.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| token | IERC20 | The ERC20 token contract to withdraw |

Events:
* `StrategyWithdrawal(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount, bool isFast)`

### **`proposeWithdrawalETH(strategyId, amount)`**

Description: Proposes a withdrawal of ETH from a strategy, initiating the timelock period. The amount must be greater than 0 and not exceed the user's ETH balance in the strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| amount | uint256 | The amount of ETH to withdraw (in wei) |

Events:
* `StrategyWithdrawalProposed(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount, uint256 unlockTime)`

Note: The `token` parameter in the event is set to `ETH_ADDRESS` and the unlock time is calculated as `block.timestamp + WITHDRAWAL_TIMELOCK_PERIOD`.

### **`finalizeWithdrawalETH(strategyId)`**

Description: Finalizes an ETH withdrawal after the timelock period has elapsed.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |

Events:
* `StrategyWithdrawal(uint256 indexed strategyId, address indexed account, address indexed token, uint256 amount, bool isFast)`

### **`createObligation(strategyId, bApp, token, obligationPercentage)`**

Description: Creates a single obligation for a bApp.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |
| obligationPercentage | uint32 | Percentage to obligate (scaled by 1e4) |

Events:
* `ObligationCreated(uint256 indexed strategyId, address indexed bApp, address indexed token, uint32 percentage)`

### **`fastUpdateObligation(strategyId, bApp, token, obligationPercentage)`**

Description: Quickly updates an obligation percentage higher for a bApp (can only increase).

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |
| obligationPercentage | uint32 | New percentage to obligate (must be higher than current) |

Events:
* `ObligationUpdated(uint256 indexed strate gyId, address indexed bApp, address indexed token, uint32 percentage, bool isFast)`

### **`proposeUpdateObligation(strategyId, bApp, token, obligationPercentage)`**

Description: Proposes an update to an obligation percentage, initiating the timelock period.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |
| obligationPercentage | uint32 | New percentage to obligate |

Events:
* `ObligationUpdateProposed(uint256 indexed strategyId, address indexed sender, address indexed token, uint32 percentage, uint256 unlockTime)`

### **`finalizeUpdateObligation(strategyId, bApp, token)`**

Description: Finalizes an obligation update after the timelock period has elapsed.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |

Events:
* `ObligationUpdated(uint256 indexed strategyId, address indexed sender, address indexed token, uint32 percentage, bool isFast)`

### **`proposeFeeUpdate(strategyId, proposedFee)`**

Description: Proposes a new fee for a strategy, initiating the timelock period.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |
| proposedFee | uint32 | The proposed new fee (cannot exceed current fee + maxFeeIncrement) |

Events:
* `StrategyFeeUpdateProposed(uint256 indexed strategyId, address indexed sender, uint32 proposedFee, uint32 currentFee, uint256 unlockTime)`

### **`finalizeFeeUpdate(strategyId)`**

Description: Finalizes a fee update after the timelock period has elapsed.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint256 | The ID of the strategy |

Events:
* `StrategyFeeUpdated(uint256 indexed strategyId, address indexed sender, uint32 newFee, uint32 oldFee)`