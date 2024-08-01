# SSVNetworkViews

The SSVNetworkViews contract is for reading information about the network and its participants.

### Repository <a href="#xkgqmoxdldho" id="xkgqmoxdldho"></a>

{% embed url="https://github.com/ssvlabs/ssv-network/tree/contract-v3/contracts" %}

### General Methods <a href="#b2oq6y1s4ym" id="b2oq6y1s4ym"></a>

#### **`getNetworkFee ()`**

Description: Returns current network fee.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                       |
| ------------- | -------- | --------------------------------------------------------------------- |
| fee           | uint256  | The fee charged by the network (denominated as $SSV tokens per block) |

#### **`getNetworkEarnings ()`**

Description: Returns accumulated network fees not yet withdrawn.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                    |
| ------------- | -------- | -------------------------------------------------- |
| amount        | uint256  | Amount of fees accumulated in the network treasury |

#### **`getLiquidationThresholdPeriod ()`**

Description: Returns the minimum duration (in blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| blocks        | uint64   | The minimum duration (blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated. |

#### **`getMinimumLiquidationCollateral()`**

Description: Returns the minimum amount which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

| **Parameter** | **Type**    | **Description** |
| ------------- | ----------- | --------------- |
| <p><br></p>   | <p><br></p> | <p><br></p>     |

Return values

| **Parameter** | **Type** | **Description**                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| amount        | uint256  | The minimum amount of SSV which a cluster has to have (liquidation collateral) to not be liquidated. |

#### **`getOperatorFeeIncreaseLimit ()`**

Description: Returns the max amount by which operators can increase fees in each fee update cycle. This does refer to the max operator fee limitation, but to the rate (%) by which it can be increased.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| amount        | uint64   | The maximum increase in percentage the operator can update his fee to. |

#### **`getOperatorFeePeriods()`**

Description: returns the time windows (in seconds) of operators declaration and execution fee periods.

<table data-header-hidden><thead><tr><th width="253"></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Parameter</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>

Return values

| **Parameter** | **Type** | **Description**                                                                |
| ------------- | -------- | ------------------------------------------------------------------------------ |
| seconds       | uint64   | The duration (seconds) until an operator can execute a fee after declaring it. |
| seconds       | uint64   | The duration (seconds) until an operator can execute a fee after declaring it. |

#### **`getMaximumOperatorFee()`**

Description: **Gets the operator maximum fee for operators that use SSV token**

<table><thead><tr><th width="253">Paramet</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td></td><td></td><td></td></tr></tbody></table>

Return values

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| maxFee    | uint64 | The maximum fee value (SSV/year) |

#### `getValidatorsPerOperatorLimit()`

Description: Returns the maximum amount of validators an operator may manage.

| **Parameter** | **Type**    | **Description** |
| ------------- | ----------- | --------------- |
| <p><br></p>   | <p><br></p> | <p><br></p>     |

Return values

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Validator limit | uint32   | amount of validators an operator may manage. |

### Operator Methods <a href="#ha5jkuo5opxs" id="ha5jkuo5opxs"></a>

#### **`getOperatorById (operatorId)`**

Description: Returns operator’s data.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

<table data-header-hidden><thead><tr><th width="256"></th><th width="177"></th><th></th></tr></thead><tbody><tr><td><strong>Parameter</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td></tr><tr><td>owner</td><td>address</td><td>The operator’s admin address (for management purposes).</td></tr><tr><td>fee</td><td>uint64256</td><td>The fee charged by the operator (denominated as $SSV tokens per block)</td></tr><tr><td>validatorCount</td><td>uint32</td><td>The amount of managed validators</td></tr><tr><td>whitelistedContract</td><td>address</td><td>The external contract set to manage this operator's whitelisted addresses</td></tr><tr><td>isPrivate</td><td>boolean</td><td>Indication if operator is permissioned</td></tr><tr><td>active</td><td>boolean</td><td>Operator network status</td></tr></tbody></table>

#### **`getOperatorFee (operatorId)`**

Description: returns current operator’s fee (not declared).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| declaredFee   | uint256  | The fee charged by the operator (denominated as $SSV tokens per block) |

#### **`getOperatorDeclaredFee (operatorId)`**

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

#### **`getBalance (owner, operatorIds, cluster)`**

Description: Returns the outstanding SSV balance of a cluster.\\

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The cluster owner address                                                                                                |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool. |

Return values

| **Parameter** | **Type** | **Description**                                         |
| ------------- | -------- | ------------------------------------------------------- |
| balance       | uint256  | Clusters outstanding balance denominated in $SSV tokens |

#### **`getBurnRate (owner, operatorIds, cluster)`**

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

#### **`isLiquidatable (owner, operatorIds, cluster)`**

Description: Returns true if the specified cluster is under the liquidation threshold and can be liquidated.\\

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool. |

Return values

| **Parameter** | **Type** | **Description**                             |
| ------------- | -------- | ------------------------------------------- |
|               | boolean  | Indication if a cluster could be liquidated |

#### **`isLiquidated (owner, operatorIds, cluster)`**

Description: Returns true if the provided cluster is liquidated.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Scanner](../tools/cluster-scanner.md) tool. |

Return values

| **Parameter** | **Type** | **Description**                       |
| ------------- | -------- | ------------------------------------- |
|               | boolean  | Indication if a cluster is liquidated |

#### **`getWhitelistedOperators(operatorIds, whitelistedAddress)`**

Description: Returns a list of operators that have this address whitelisted for them.

| **Parameter**      | **Type**  | **Description**        |
| ------------------ | --------- | ---------------------- |
| operatorIds        | uint64\[] | List of operators Ids. |
| whitelistedAddress | address   | ETH1 address           |

Return values

| **Parameter**          | **Type**  | **Description**                                            |
| ---------------------- | --------- | ---------------------------------------------------------- |
| whitelistedOperatorIds | uint64\[] | List of operator IDs that this address is whitelisted for. |

#### **`isWhitelistingContract(contractAddress)`**

Description: Returns if a contract address is a valid whitelisting contract or not.

| **Parameter**      | **Type** | **Description**                |
| ------------------ | -------- | ------------------------------ |
| whitelistedAddress | address  | Whitelisting contract address. |

Return values

| **Parameter** | **Type** | **Description**                          |
| ------------- | -------- | ---------------------------------------- |
|               | bool     | True if contract is valid, false if not. |

#### **`isAddressWhitelistedInWhitelistingContract(addressToCheck, operatorId, whitelistingContract)`**

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
