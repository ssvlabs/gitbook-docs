---
sidebar_position: 2
---

# SSVNetworkViews

The SSVNetworkViews contract is for reading information about the network and its participants.

[SSV Views Contracts Repository](https://github.com/ssvlabs/ssv-network/tree/main/contracts)

### General Methods

### **`getNetworkFee ()`**

Description: Returns current network fee.

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| fee | uint256 | The fee charged by the network (denominated as $SSV tokens per block) |

### **`getNetworkEarnings ()`**

Description: Returns accumulated network fees not yet withdrawn.

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| amount | uint256 | Amount of fees accumulated in the network treasury |

### **`getLiquidationThresholdPeriod ()`**

Description: Returns the minimum duration (in blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

Return values

| **Parameter** | **Type** | **Description**                                                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| blocks        | uint64   | The minimum duration (blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated. |

### **`getMinimumLiquidationCollateral()`**

Description: Returns the minimum amount which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

Return values

| **Parameter** | **Type** | **Description**                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| amount        | uint256  | The minimum amount of SSV which a cluster has to have (liquidation collateral) to not be liquidated. |

### **`getOperatorFeeIncreaseLimit()`**

Description: Returns the max amount by which operators can increase fees in each fee update cycle. This does refer to the max operator fee limitation, but to the rate (%) by which it can be increased.


Return values

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| amount        | uint64   | The maximum increase in percentage the operator can update his fee to. |

### **`getOperatorFeePeriods()`**

Description: returns the time windows (in seconds) of operators declaration and execution fee periods.


Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| seconds | uint64 | The duration (seconds) until an operator can execute a fee after declaring it |
| seconds | uint64 | The duration (seconds) until an operator can execute a fee after declaring it |

### **`getMaximumOperatorFee()`**

Description: **Gets the operator maximum fee for operators that use SSV token**

Return values

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| maxFee    | uint64 | The maximum fee value (SSV/year) |

### `getValidatorsPerOperatorLimit()`

Description: Returns the maximum amount of validators an operator may manage.

Return values

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Validator limit | uint32   | amount of validators an operator may manage. |

### Operator Methods <a href="#ha5jkuo5opxs" id="ha5jkuo5opxs"></a>

### **`getOperatorById (operatorId)`**

Description: Returns operator's data.

| Parameter | Type | Description |
|-----------|------|-------------|
| operatorId | uint64 | The operator id |

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| owner | address | The operator's admin address (for management purposes) |
| fee | uint64256 | The fee charged by the operator (denominated as $SSV tokens per block) |
| validatorCount | uint32 | The amount of managed validators |
| whitelistedContract | address | The external contract set to manage this operator's whitelisted addresses |
| isPrivate | boolean | Indication if operator is permissioned |
| active | boolean | Operator network status |

### **`getOperatorFee (operatorId)`**

Description: returns current operator's fee (not declared).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| declaredFee   | uint256  | The fee charged by the operator (denominated as $SSV tokens per block) |

### **`getOperatorDeclaredFee (operatorId)`**

Description: Returns the declared fee (not actual fee) together with the execution time window.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return value**getOperatorEarnings (operatorId)**

Description: Returns the outstanding earnings of an operator.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter** | **Type** | **Description**                                |
| ------------- | -------- | ---------------------------------------------- |
| balance       | uint256  | Operators outstanding earnings in $SSV tokens. |

### Cluster Methods <a href="#s1a6da24gvwp" id="s1a6da24gvwp"></a>

### **`getBalance (owner, operatorIds, cluster)`**

Description: Returns the outstanding SSV balance of a cluster.

| Parameter | Type | Description |
|-----------|------|-------------|
| owner | address | The cluster owner address |
| operatorIds | uint64[] | List of cluster operators Ids |
| cluster | tuple[] | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool |

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| balance | uint256 | Clusters outstanding balance denominated in $SSV tokens |

### **`getBurnRate (owner, operatorIds, cluster)`**

Description: Returns current ongoing expenses of SSV tokens for a particular SSV cluster balance on per block basis (aggregates all expenses for all the validators in this cluster).\\

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool. |

Return values

| **Parameter** | **Type** | **Description**                                     |
| ------------- | -------- | --------------------------------------------------- |
| burnRate      | uint256  | The rate per block in which the account spends SSV. |

### Liquidator Methods <a href="#id-39qo7wl8s1he" id="id-39qo7wl8s1he"></a>

### **`isLiquidatable (owner, operatorIds, cluster)`**

Description: Returns true if the specified cluster is under the liquidation threshold and can be liquidated.\\

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool. |

Return values

| **Parameter** | **Type** | **Description**                             |
| ------------- | -------- | ------------------------------------------- |
| isLiquidatable | boolean  | Indication if a cluster could be liquidated |

### **`isLiquidated (owner, operatorIds, cluster)`**

Description: Returns true if the provided cluster is liquidated.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool. |

Return values

| **Parameter** | **Type** | **Description**                       |
| ------------- | -------- | ------------------------------------- |
| isLiquidated  | boolean  | Indication if a cluster is liquidated |

### **`getWhitelistedOperators(operatorIds, whitelistedAddress)`**

Description: Returns a list of operators that have this address whitelisted for them.

| **Parameter**      | **Type**  | **Description**        |
| ------------------ | --------- | ---------------------- |
| operatorIds        | uint64\[] | List of operators Ids. |
| whitelistedAddress | address   | ETH1 address           |

Return values

| **Parameter**          | **Type**  | **Description**                                            |
| ---------------------- | --------- | ---------------------------------------------------------- |
| whitelistedOperatorIds | uint64\[] | List of operator IDs that this address is whitelisted for. |

### **`isWhitelistingContract(contractAddress)`**

Description: Returns if a contract address is a valid whitelisting contract or not.

| **Parameter**      | **Type** | **Description**                |
| ------------------ | -------- | ------------------------------ |
| whitelistedAddress | address  | Whitelisting contract address. |

Return values

| **Parameter** | **Type** | **Description**                          |
| ------------- | -------- | ---------------------------------------- |
|  isWhitelistingContract | bool     | True if contract is valid, false if not. |

### **`isAddressWhitelistedInWhitelistingContract(addressToCheck, operatorId, whitelistingContract)`**

Description: Checks the whitelisted contract for an operator to see if the address provided is whitelisted for the given operator.

| **Parameter**      | **Type** | **Description**                          |
| ------------------ | -------- | ---------------------------------------- |
| addressToCheck     | address  | Address we want to check is whitelisted. |
| operatorId         | uint256  | Operator ID.                             |
| whitelistedAddress | address  | Whitelisting contract address.           |

Return values

| **Parameter** | **Type** | **Description**                               |
| ------------- | -------- | --------------------------------------------- |
| isWhitelisted | bool     | True if address is whitelisted, false if not. |