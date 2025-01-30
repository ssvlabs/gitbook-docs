---
sidebar_position: 1
---

# SSVNetwork

The SSVNetwork contract is the main contract for operations and management.

[SSV Network Contracts Repository](https://github.com/ssvlabs/ssv-network/tree/main/contracts)

## Operator Methods <a href="#cxoku5ytbvgq" id="cxoku5ytbvgq"></a>

### **`registerOperator(publicKey, operatorFee, setPrivate)`**

Description: Registers a new operator (key) with a set fee, **fails if** fee is less than the minimal fee.

| **Parameter** | **Type**                             | **Description**                                                                                                                                                                                     |
| ------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes                                | The operator public key (generated as part of the node setup).                                                                                                                                      |
| operatorFee   | uint256(casted to uint64) | The fee charged by the operator (denominated as $SSV tokens per block)                                                                                                                              |
| setPrivate    | bool                                 | A flag to set the operator to private or public during registration. Calls the [**`setOperatorsPrivateUnchecked`**](ssvnetwork.md#setoperatorsprivateuncheckedoperatorids)function if set to true. |

Events:

* `OperatorAdded(uint64 indexed operatorId, address indexed owner, bytes publicKey, uint256 fee)`
* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`

### **`removeOperator(operatorId)`**

Description: Permanently removes the operator from the network (irreversible).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorRemoved(uint64 indexed operatorId)`

### **`withdrawOperatorEarnings(operatorId)`**

Description: Withdraws a specified amount of SSV tokens from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type**                   | **Description**                                                                                                  |
| ------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| operatorId    | uint64                     | The operator id                                                                                                  |
| amount        | uint256 (casted to uint64) | Amount must be shrinkable (divisible by 10000000) |

Events:

* `OperatorWithdrawn(address indexed owner, uint64 indexed operatorId, uint256 value)`

### `withdrawAllOperatorEarnings`**`(operatorId)`**

Description: Withdraws all SSV tokens earnings from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorWithdrawn(address indexed owner, uint64 indexed operatorId, uint256 value)`

### **`setOperatorWhitelists (operatorIds, whitelisted)`**

Description: For a list of operators provided, set a list of whitelisted addresses which can register validators to these operators.

| **Parameter** | **Type**   | **Description**                                           |
| ------------- | ---------- | --------------------------------------------------------- |
| operatorId    | uint64\[]  | Operator ID list                                          |
| whitelisted   | address\[] | <p>A list of ETH1 addresses to be whitelisted.</p><p></p> |

Events:

* `OperatorMultipleWhitelistUpdated(uint64[] operatorIds, address[] whitelistAddresses)`

### **`removeOperatorWhitelists (operatorIds, whitelisted)`**

Description: For a list of operators provided, remove a list of whitelisted addresses.

| **Parameter** | **Type**   | **Description**                                                          |
| ------------- | ---------- | ------------------------------------------------------------------------ |
| operatorId    | uint64\[]  | Operator ID list                                                         |
| whitelisted   | address\[] | <p>A list of ETH1 addresses to be removed from the whitelist.</p><p></p> |

Events:

* `OperatorMultipleWhitelistRemoved(uint64[] operatorIds, address[] whitelistAddresses)`

### **`setOperatorsPrivateUnchecked(operatorIds)`**

Description: For a list of operators provided, set their status to private.

| **Parameter** | **Type**  | **Description**  |
| ------------- | --------- | ---------------- |
| operatorId    | uint64\[] | Operator ID list |

Events:

* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`

### **`setOperatorsPublicUnchecked(operatorIds)`**

Description: For a list of operators provided, set their status to public.

| **Parameter** | **Type**  | **Description**  |
| ------------- | --------- | ---------------- |
| operatorId    | uint64\[] | Operator ID list |

Events:

* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`

### **`setOperatorWhitelistingContract(operatorIds, whitelistingContract)`**

Description: For a list of operators provided, set an external whitelisting contract to manage the whitelist for these operators. [Must be a valid whitelisting contract.](external-whitelist-contract-example.md)

| **Parameter**        | **Type**                 | **Description**                                      |
| -------------------- | ------------------------ | ---------------------------------------------------- |
| operatorId           | uint64\[]                | Operator ID list                                     |
| whitelistingContract | ISSVWhitelistingContract | <p>A valid whitelisting contract address.</p><p></p> |

Events:

* `OperatorWhitelistingContractUpdated(uint64[] operatorIds, address whitelistingContract)`

### `removeOperatorsWhitelistingContract(operatorIds)`

Description: For a list of operators provided, remove the whitelisting contract stored.

| **Parameter** | **Type**  | **Description**  |
| ------------- | --------- | ---------------- |
| operatorId    | uint64\[] | Operator ID list |

Events:

* `OperatorWhitelistingContractUpdated(uint64[] operatorIds, address whitelistingContract)`

### **`declareOperatorFee(operatorId, operatorFee)`**

Description: Initiates the first step of the operator fee update cycle - declaration of a new fee. [After specified](ssvnetworkviews.md#getoperatorfeeperiods) time window operator will be able to change to the new fee with executeOperatorFee().

| **Parameter** | **Type**                   | **Description**                                 |
| ------------- | -------------------------- | ----------------------------------------------- |
| operatorId    | uint64                     | The operator id                                 |
| operatorFee   | uint256 (casted to uint64) | New fee (denominated as $SSV tokens per block). |

Events:

* `OperatorFeeDeclared(address indexed owner, uint64 indexed operatorId, uint256 blockNumber, uint256 fee)`

### **`executeOperatorFee()`**

Description: Activates operator’s fee change specified in previously called declareOperatorFee(). This function needs to be called within a [certain time window](ssvnetworkviews.md#getoperatorfeeperiods) following declareOperatorFee().

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorFeeExecuted(address indexed owner, uint64 indexed operatorId, uint256 blockNumber, uint256 fee)`

### **`cancelDeclaredOperatorFee(operatorId)`**

Description: Cancels operator’s fee change requested in previously called declareOperatorFee().

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorFeeDeclarationCancelled(address indexed owner, uint64 indexed operatorId)`

### `reduceOperatorFee(operatorId, fee)`

Description: Reduce the operator fee, does not abide by the restrictions of fee increase

| Parameter  | Type                       | Description                                     |
| ---------- | -------------------------- | ----------------------------------------------- |
| operatorId | uint64                     | The operator id                                 |
| fee        | uint256 (casted to uint64) | New fee (denominated as $SSV tokens per block). |

Events:

* `OperatorFeeExecuted(address indexed owner, uint64 indexed operatorId, uint256 blockNumber, uint256 fee)`

## Account Methods <a href="#af9cg9vns61i" id="af9cg9vns61i"></a>

### **`setFeeRecipientAddress(feeRecipientAddress)`**

Description: sets a fee recipient address to receive tips from user transactions (part block proposal rewards). This address will be set for all the account’s validators (all clusters).

| **Parameter**       | **Type** | **Description**                                      |
| ------------------- | -------- | ---------------------------------------------------- |
| feeRecipientAddress | address  | An ETH1 address that receives fee recipient rewards. |

Events:

* `FeeRecipientAddressUpdated(address indexed owner, address recipientAddress)`

## Cluster Methods <a href="#hqxi798q7b6v" id="hqxi798q7b6v"></a>

### **`registerValidator(publicKey, operatorIds, shares, amount, cluster)`**

Description: Registers new validator to a cluster of provided operators (ids + shares), **fails if** number of operatorIds is greater than 13..

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes                      | The validator’s public key.                                                                                                                                                                                                                                                                                                                                          |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                                                                                                                                                                                       |
| sharesData    | bytes                      | String of keyshares - obtained by splitting the validator key using the [SSV-Keys](../tools/ssv-keys-distributor.md) tool.                                                                                                                                                                                                                                           |
| amount        | uint256 (casted to uint64) | Amount of SSV token to be deposited as payment (not mandatory). Amount must be shrinkable (divisible by 10000000)                                                                                                                                                                                                |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the <a href="../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot">SSV Subgraph</a>, or <a href="../tools/cluster-scanner.md">SSV Scanner</a> tools If this is the 1st validator within a specific cluster (unique set of operators), use - {0,0,0,true,0}|

Events:

* `ValidatorAdded(address indexed owner, uint64[] operatorIds, bytes publicKey, bytes shares, Cluster cluster)`

### **`bulkRegisterValidator(publicKey, operatorIds, shares, amount, cluster)`**

Description: Registers all the new validators provided as argument to a cluster of provided operators (ids + shares), **fails if** number of operatorIds is greater than 13..

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKeys    | bytes\[]                   | An array of validators’ public keys.                                                                                                                                                                                                                                                                                                                                 |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                                                                                                                                                                                       |
| sharesData    | bytes\[]                   | An array of strings of keyshares - obtained by splitting the validator key using the <a href="../tools/ssv-keys-distributor.md">SSV-Keys</a> tool. Each element in this array must relate to a public key in the <code>publicKeys</code> array.                                                                                                        |
| amount        | uint256 (casted to uint64) | Amount of SSV token to be deposited as payment (not mandatory).Amount must be shrinkable (divisible by 10000000)p>                                                                                                                                                                                                      |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the <a href="../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot">SSV Subgraph</a>, or <a href="../tools/cluster-scanner.md">SSV Scanner</a> tools If this is the 1st validator within a specific cluster (unique set of operators), use - {0,0,0,true,0} |

Events:

* `ValidatorAdded(address indexed owner, uint64[] operatorIds, bytes publicKey, bytes shares, Cluster cluster)`

The function emits as many `ValidatorAdded` events, as is the length of the provided `publicKeys` array.


Please note: the number of validators that can be registered with the`bulkRegisterValidator` function is limited by the total transaction size. This depends both on the number of total public keys, as well as the number of operators in the chosen cluster, as follows:

* 80 validator keyshares for a cluster of 4 operators
* 40 validator keyshares for a cluster of 7 operators
* 30 validator keyshares for a cluster of 10 operators
* 20 validator keyshares for a cluster of 13 operators

### **`removeValidator(publicKey, operatorIds, cluster)`**

Description: Removes validator from the SSV network.

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes     | The validator’s public key.                                                                                                                                                                               |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), or [SSV Scanner](../tools/cluster-scanner.md) tools. |

Events:

* `ValidatorRemoved(address indexed owner, uint64[] operatorIds, bytes publicKey, Cluster cluster)`

### **`bulkRemoveValidator(publicKey, operatorIds, cluster)`**

Description: Removes all the validators provided as argument from the SSV network.

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKeys    | bytes\[]  | An array of validators’ public keys.                                                                                                                                                                      |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), or [SSV Scanner](../tools/cluster-scanner.md) tools. |

Events:

* `ValidatorRemoved(address indexed owner, uint64[] operatorIds, bytes publicKey, Cluster cluster)`

The function emits as many `ValidatorRemoved` events, as is the length of the provided `publicKeys` array.

Please note: the number of validators that can be de-registered with the`bulkRemoveValidator` function is limited by the total transaction size to a maximum of **500 validator keys at a time.**

### **`exitValidator(publicKey, operatorIds)`**

Description: Prompts SSV nodes to sign a voluntary exit of the validator.

| **Parameter** | **Type**  | **Description**                |
| ------------- | --------- | ------------------------------ |
| publicKey     | bytes     | The validator’s public key.    |
| operatorIds   | unit64\[] | List of cluster operators Ids. |

Events:

* `ValidatorExited(address indexed owner, uint64[] operatorIds, bytes publicKey)`

### **`bulkExitValidator(publicKey, operatorIds)`**

Description: Prompts SSV nodes to sign a voluntary exit for all the validators provided as argument.

| **Parameter** | **Type**  | **Description**                      |
| ------------- | --------- | ------------------------------------ |
| publicKeys    | bytes\[]  | An array of validators’ public keys. |
| operatorIds   | unit64\[] | List of cluster operators Ids.       |

Events:

* `ValidatorExited(address indexed owner, uint64[] operatorIds, bytes publicKey)`

The function emits as many `ValidatorExited` events, as is the length of the provided `publicKeys` array.


Please note: the number of validators that can be requested to exit from the beacon chain with the`bulkExitValidator` function is limited by the total transaction size to a maximum of **500 validator keys at a time.**


### **`deposit(owner, operatorIds, amount, cluster)`**

Description: Deposits SSV token into a cluster, **will fail if** not enough tokens are approved.

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner         | address                    | The cluster owner address                                                                                                                                                                                 |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                            |
| amount        | uint256 (casted to uint64) | $SSV amount to be deposited. Amount must be shrinkable (divisible by 10000000)                                                                                   |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), or [SSV Scanner](../tools/cluster-scanner.md) tools. |

Events:

* `ClusterDeposited(address indexed owner, uint64[] operatorIds, uint256 value, Cluster cluster)`

### **`withdraw(operatorIds, amount, cluster)`**

Description: Withdraws a specified amount of SSV tokens from cluster of msg.sender, **will fail if** msg.sender tries to withdraw more than the cluster’s liquidation collateral. To withdraw the entire cluster balance and stop its operation use liquidate().

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                            |
| amount        | uint256 (casted to uint64) | Amount to be withdrawn. Amount must be shrinkable (divisible by 10000000)                                                                                         |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), or [SSV Scanner](../tools/cluster-scanner.md) tools. |

Events:

* `ClusterWithdrawn(address indexed owner, uint64[] operatorIds, uint256 value, Cluster cluster)`

### **`reactivate(operatorIds, amount, cluster)`**

Description: Reactivates a liquidated cluster, **will fail** if insufficient SSV tokens to cover the cluster’s liquidation collateral have been deposited.

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                            |
| amount        | uint256 (casted to uint64) | $SSV amount to be deposited. Amount must be shrinkable (divisible by 10000000)
                                              |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), or [SSV Scanner](../tools/cluster-scanner.md) tools. |

Events:

* `ClusterReactivated(address indexed owner, uint64[] operatorIds, Cluster cluster)`

## Liquidator Methods <a href="#sli6i8fh6q5y" id="sli6i8fh6q5y"></a>

Write methods for liquidators

### **`liquidate(owner, operatorIds, cluster)`**

Description: Liquidates a cluster sends their balances to the msg.sender (the Liquidator), **will fail** if the cluster is not liquidatable (see isLiquidatable()).

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The cluster owner address                                                                                                                                                                                 |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](../tools/ssv-subgraph/subgraph-examples.md#cluster-snapshot), or [SSV Scanner](../tools/cluster-scanner.md) tools. |

Events:

* `ClusterLiquidated(address indexed owner, uint64[] operatorIds, Cluster cluster)`

## Governance Methods <a href="#id-31cymrhcphoi" id="id-31cymrhcphoi"></a>

### **`updateNetworkFee(networkFee)`**

Description: Updates network fee.

| **Parameter** | **Type**                   | **Description**                                                                      |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| networkFee    | uint256 (casted to uint64) | The fee charged by the network per validator (denominated as $SSV tokens per block). |

Events:

* `NetworkFeeUpdated(uint256 oldFee, uint256 newFee)`

### **`withdrawNetworkEarnings(amount)`**

Description: Withdraws accumulated network fees in SSV token to DAO treasury.

| **Parameter** | **Type**                   | **Description**                                                                                                   |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| amount        | uint256 (casted to uint64) | Amount to be withdrawn. Amount must be shrinkable (divisible by 10000000) |

Events:

* `NetworkEarningsWithdrawn(uint256 value, address recipient)`

### **`updateLiquidationThresholdPeriod(blocks)`**

Description: Sets the minimum period (in blocks) after which a cluster can be liquidated.

| **Parameter** | **Type** | **Description**                               |
| ------------- | -------- | --------------------------------------------- |
| blocks        | uint64   | Duration in blocks to have sufficient balance |

Events:

* `LiquidationThresholdPeriodUpdated(uint64 value)`

### `updateMaxiumumOperatorFee`**`(maxFee)`**

Description: Updates the maximum fee an operator that uses SSV token can set

| **Parameter** | **Type** | **Description**                                          |
| ------------- | -------- | -------------------------------------------------------- |
| maxFee        | uint64   | Maximum fee (in SSV tokens per year) an operator can set |

Events:

* `OperatorMaximumFeeUpdated(uint64 maxFee)`

### `updateMinimumLiquidationCollateral(amount)`

Description: Sets the minimum collateral (in $SSV) each cluster must keep in his balance.

| **Parameter** | **Type**                   | **Description**                                                                                                     |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| amount        | uint256 (casted to uint64) | Amount of SSV collateral. Amount must be shrinkable (divisible by 10000000) |

Events:

* `MinimumLiquidationCollateralUpdated(uint256 value)`

### **`updateOperatorFeeIncreaseLimit(newOperatorMaxFeeIncrease)`**

Description: Sets the max amount by which operators can increase fees in each fee update cycle. This does not limit max operator fee, only the rate (%) by which it can be increased within each fee update cycle.

| **Parameter**             | **Type** | **Description**             |
| ------------------------- | -------- | --------------------------- |
| newOperatorMaxFeeIncrease | uint64   | Maximum increase percentage |

Events:

* `OperatorFeeIncreaseLimitUpdated(uint64 value)`

### **`updateDeclareOperatorFeePeriod(seconds)`**

Description: Sets the time window (in seconds) between the declaration and activation of a new operator fee.

| **Parameter**                  | **Type** | **Description**                                                           |
| ------------------------------ | -------- | ------------------------------------------------------------------------- |
| updateDeclareOperatorFeePeriod | uint64   | Period in seconds until an operator can execute a fee after declaring it. |

Events:

* `DeclareOperatorFeePeriodUpdated(uint64 value)`

### **`updateExecuteOperatorFeePeriod(seconds)`**

Description: Sets the time window (in seconds) in which an operator can activate a new fee.

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| seconds       | uint64   | Period in seconds that an operator can execute a fee until it expires. |

Events:

* `ExecuteOperatorFeePeriodUpdated(uint64 value)`
