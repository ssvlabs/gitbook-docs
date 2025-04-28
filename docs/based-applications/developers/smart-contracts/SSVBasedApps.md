---
sidebar_position: 1
---

# SSVBasedApps

The SSVBasedApps contract is the main contract for operations and management.


<a href="https://github.com/ssvlabs/based-applications">
  <img 
    src="https://img.shields.io/badge/GitHub-SSV%20BA%20Contracts-24292e?style=for-the-badge&logo=github" 
    alt="Based Applications Contracts Repository" 
    style={{width: '400px'}}
  />
</a>

## Delegate Validator Balance

### **`delegateBalance(account, percentage)`**

Description: Delegates a percentage of the caller's validator balance to another account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| account | address | The address of the account to delegate to |
| percentage | uint32 | The percentage of balance to delegate (scaled by 1e4, so 100% = 10000) |

Events:
* `DelegationCreated(address indexed delegator, address indexed receiver, uint32 percentage)`

### **`updateDelegatedBalance(account, percentage)`**

Description: Updates an existing delegation percentage for an account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| account | address | The address of the account whose delegation is being updated |
| percentage | uint32 | The new percentage to delegate (scaled by 1e4) |

Events:
* `DelegationUpdated(address indexed delegator, address indexed receiver, uint32 percentage)`

### **`removeDelegatedBalance(account)`**

Description: Removes delegation from an account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| account | address | The address of the account whose delegation is being removed |

Events:
* `DelegationRemoved(address indexed delegator, address indexed receiver)`

## bApps

### **`registerBApp(tokens, sharedRiskLevels, metadataURI)`**

Description: Registers a new Based Application (bApp) with specified tokens and risk levels.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| tokens | address[] | List of token addresses the bApp accepts |
| sharedRiskLevels | uint32[] | New risk levels for each token (max 100000) (scaled by 1e4, so 2.5 = 25000) |
| metadataURI | string | metadata URI of the bApp, which is a link (e.g., http://example.com) to a JSON file containing metadata such as the name, description, logo, etc. |

Events:
* `BAppRegistered(address indexed bApp, address indexed owner, address[] tokens, uint32[] sharedRiskLevels, string metadataURI)`

### **`updateBAppMetadataURI(bApp, metadataURI)`**

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
| sharedRiskLevels | uint32[] | New risk levels for each token (max 100000) (scaled by 1e4, so 2.5 = 25000) |

Events:
* `TokensAddedToBApp(address indexed bApp, address[] tokens, uint32[] sharedRiskLevels)`

### **`updateBAppsTokens(tokenConfigs)`**

Description: Updates the token configurations for multiple bApps. Can only be called by the bApp owner.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| tokenConfigs | ICore.TokenConfig[] | Array of token configurations to update |

The TokenConfig data struct is as follows:

```solidity
struct TokenConfig {
        address token;
        uint32 sharedRiskLevel;
    }
```

Events:
* `BAppTokensUpdated(address indexed bApp, address[] tokens, uint32[] sharedRiskLevels)`

## Strategy

### **`createStrategy(fee, metadataURI)`**

Description: Creates a new strategy for the caller with specified fee and metadata.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| fee | uint32 | The fee percentage for the strategy (scaled by 1e4) |
| metadataURI | string | The metadata URI for the strategy |

Events:
* `StrategyCreated(uint32 indexed strategyId, address indexed owner, uint32 fee, string metadataURI)`

### **`updateStrategyMetadataURI(strategyId, metadataURI)`**

Description: Updates the metadata URI of a strategy. Can only be called by the strategy owner.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| metadataURI | string | The new metadata URI |

Events:
* `StrategyMetadataURIUpdated(uint32 indexed strategyId, string metadataURI)`

### **`optInToBApp(strategyId, bApp, tokens, obligationPercentages, data)`**

Description: Opts a strategy into a bApp with specified tokens and obligation percentages. Each token must be supported by the bApp, and a strategy owner cannot opt into the same bApp twice. The obligation percentages don't need to be greater than 0.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| bApp | address | The address of the bApp to opt into |
| tokens | address[] | List of token addresses to create obligations for |
| obligationPercentages | uint32[] | List of obligation percentages for each token (scaled by 1e4) |
| data | bytes | Optional parameter that could be required by the service |

Events:
* `BAppOptedInByStrategy(uint32 indexed strategyId, address indexed bApp, bytes data, address[] tokens, uint32[] obligationPercentages)`

### **`depositERC20(strategyId, token, amount)`**

Description: Deposits ERC20 tokens into a strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy to deposit into |
| token | IERC20 | The address of the ERC20 token |
| amount | uint256 | The amount of tokens to deposit |

Events:
* `StrategyDeposit(uint32 indexed strategyId, address indexed account, address token, uint256 amount)`

### **`depositETH(strategyId)`**

Description: Deposits ETH into a strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy to deposit into |

Events:
* `StrategyDeposit(uint32 indexed strategyId, address indexed account, address indexed token, uint256 amount)`

### **`proposeWithdrawal(strategyId, token, amount)`**

Description: Proposes a withdrawal of ERC20 tokens from a strategy, initiating the timelock period. Cannot be used for ETH withdrawals (use proposeWithdrawalETH instead). The amount must be greater than 0 and not exceed the user's balance in the strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| token | address | The address of the ERC20 token to withdraw |
| amount | uint256 | The amount of tokens to withdraw |

Events:
* `StrategyWithdrawalProposed(uint32 indexed strategyId, address indexed account, address token, uint256 amount)`

### **`finalizeWithdrawal(strategyId, token)`**

Description: Finalizes an ERC20 token withdrawal after the timelock period has elapsed. The withdrawal must be completed within the expiry window (WITHDRAWAL_EXPIRE_TIME) after the timelock period ends.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| token | IERC20 | The ERC20 token contract to withdraw |

Events:
* `StrategyWithdrawal(uint32 indexed strategyId, address indexed account, address token, uint256 amount, bool isFast)`

### **`proposeWithdrawalETH(strategyId, amount)`**

Description: Proposes a withdrawal of ETH from a strategy, initiating the timelock period. The amount must be greater than 0 and not exceed the user's ETH balance in the strategy.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| amount | uint256 | The amount of ETH to withdraw (in wei) |

Events:
* `StrategyWithdrawalProposed(uint32 indexed strategyId, address indexed account, address indexed token, uint256 amount)`

### **`finalizeWithdrawalETH(strategyId)`**

Description: Finalizes an ETH withdrawal after the timelock period has elapsed.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |

Events:
* `StrategyWithdrawal(uint32 indexed strategyId, address indexed account, address indexed token, uint256 amount, bool isFast)`

### **`createObligation(strategyId, bApp, token, obligationPercentage)`**

Description: Creates a single obligation for a bApp.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |
| obligationPercentage | uint32 | Percentage to obligate (scaled by 1e4) |

Events:
* `ObligationCreated(uint32 indexed strategyId, address indexed bApp, address token, uint32 percentage)`

### **`fastUpdateObligation(strategyId, bApp, token, obligationPercentage)`**

Description: Quickly updates an obligation percentage higher for a bApp (can only increase).

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |
| obligationPercentage | uint32 | New percentage to obligate (must be higher than current) |

Events:
* `ObligationUpdated(uint32 indexed strategyId, address indexed bApp, address token, uint32 percentage)`

### **`proposeUpdateObligation(strategyId, bApp, token, obligationPercentage)`**

Description: Proposes an update to an obligation percentage, initiating the timelock period.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |
| obligationPercentage | uint32 | New percentage to obligate |

Events:
* `ObligationUpdateProposed(uint32 indexed strategyId, address indexed bApp, address token, uint32 percentage)`

### **`finalizeUpdateObligation(strategyId, bApp, token)`**

Description: Finalizes an obligation update after the timelock period has elapsed.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| bApp | address | The address of the bApp |
| token | address | The token address |

Events:
* `ObligationUpdated(uint32 indexed strategyId, address indexed sender, address indexed token, uint32 percentage, bool isFast)`

### **`proposeFeeUpdate(strategyId, proposedFee)`**

Description: Proposes a new fee for a strategy, initiating the timelock period. The proposed fee cannot exceed the current fee plus maxFeeIncrement.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| proposedFee | uint32 | The proposed new fee (scaled by 1e4) |

Events:
* `StrategyFeeUpdateProposed(uint32 indexed strategyId, address owner, uint32 proposedFee)`

### **`finalizeFeeUpdate(strategyId)`**

Description: Finalizes a fee update after the timelock period has elapsed. Must be called within the expiry window (FEE_EXPIRE_TIME).

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |

Events:
* `StrategyFeeUpdated((uint32 indexed strategyId, address owner, uint32 newFee, bool isFast)`

### **`reduceFee(strategyId, proposedFee)`**

Description: Reduces the fee for a strategy. This function allows strategy owners to decrease their fee percentage.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy |
| proposedFee | uint32 | The new proposed fee percentage (scaled by 1e4) |

Events:
* `StrategyFeeUpdated(uint32 indexed strategyId, address indexed sender, uint32 newFee, uint32 oldFee)`

### **`slash(strategyId, bApp, token, percentage, data)`**

Description: Slashes a strategy's balance for a specific bApp and token. This function is used to penalize strategies that fail to meet their obligations.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| strategyId | uint32 | The ID of the strategy to slash |
| bApp | address | The address of the bApp |
| token | address | The token address to slash |
| percentage | uint32 | The percentage of the balance to slash (scaled by 1e4) |
| data | bytes | Additional data required for the slashing operation |

Events:
* `StrategySlashed(uint32 indexed strategyId, address indexed bApp, address token, uint32 percentage, address receiver)`

### **`withdrawSlashingFund(token, amount)`**

Description: Withdraws slashing funds for a specific token from the slashing fund.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| token | address | The address of the token to withdraw |
| amount | uint256 | The amount of tokens to withdraw |

Events:
* `SlashingFundWithdrawn(address token, uint256 amount)`

### **`withdrawETHSlashingFund(amount)`**

Description: Withdraws ETH from the slashing fund.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| amount | uint256 | The amount of ETH to withdraw (in wei) |

Events:
* `ETHSlashingFundWithdrawn(uint256 amount)`

## Account

### **`updateAccountMetadataURI(metadataURI)`**

Description: Updates the metadata URI of the caller's account.

| **Parameter** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| metadataURI | string | The new metadata URI for the account |

Events:
* `AccountMetadataURIUpdated(address indexed account, string metadataURI)`

## Constants

| **Constant** | **Value** | **Description** |
| ------------ | --------- | --------------- |
| FEE_TIMELOCK_PERIOD | 7 days | Time period that must elapse before a fee update can be finalized |
| FEE_EXPIRE_TIME | 1 day | Window of time after timelock period during which fee update must be finalized |
| WITHDRAWAL_TIMELOCK_PERIOD | 5 days | Time period that must elapse before a withdrawal can be finalized |
| WITHDRAWAL_EXPIRE_TIME | 1 day | Window of time after timelock period during which withdrawal must be finalized |
| OBLIGATION_TIMELOCK_PERIOD | 7 days | Time period that must elapse before an obligation update can be finalized |
| OBLIGATION_EXPIRE_TIME | 1 day | Window of time after timelock period during which obligation update must be finalized |
| MAX_PERCENTAGE | 10000 | Maximum value for percentage calculations (100% = 10000) |