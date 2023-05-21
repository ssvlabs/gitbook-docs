# SSVNetworkViews

The SSVNetworkViews contract is for reading information about the network and its participants.

### Repository <a href="#_xkgqmoxdldho" id="_xkgqmoxdldho"></a>

{% embed url="https://github.com/bloxapp/ssv-network/tree/contract-v3/contracts" %}

### General Methods <a href="#_b2oq6y1s4ym" id="_b2oq6y1s4ym"></a>

#### **public getNetworkFee ()**

Description: Returns current network fee.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                       |
| ------------- | -------- | --------------------------------------------------------------------- |
| fee           | uint256  | The fee charged by the network (denominated as $SSV tokens per block) |



#### **public getNetworkEarnings ()**

Description: Returns accumulated network fees not yet withdrawn.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                    |
| ------------- | -------- | -------------------------------------------------- |
| amount        | uint256  | Amount of fees accumulated in the network treasury |



#### **public getLiquidationThresholdPeriod ()**

Description: Returns the minimum duration (in blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| blocks        | uint64   | The minimum duration (blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated. |



#### **public getOperatorFeeIncreaseLimit ()**

Description: Returns the max amount by which operators can increase fees in each fee update cycle. This does refer to the max operator fee limitation, but to the rate (%) by which it can be increased.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| amount        | uint64   | The maximum increase in percentage the operator can update his fee to. |



#### **public getDeclaredOperatorFeePeriod ()**

Description: Returns the time window (in seconds) between the declaration and activation of a new operator fee.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                                |
| ------------- | -------- | ------------------------------------------------------------------------------ |
| seconds       | uint64   | The duration (seconds) until an operator can execute a fee after declaring it. |



#### **public getExecuteOperatorFeePeriod ()**

Description: Returns the time window (in seconds) in which an operator can activate a new fee. It starts after the fee declaration window ends.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
|               |          |                 |

Return values

| **Parameter** | **Type** | **Description**                                                                         |
| ------------- | -------- | --------------------------------------------------------------------------------------- |
| seconds       | uint64   | The duration (seconds) in which an operator can execute a declared fee until it expires |



### Operator Methods <a href="#_ha5jkuo5opxs" id="_ha5jkuo5opxs"></a>

#### **public getOperatorById (operatorId)**

Description: Returns operator’s data.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter** | **Type**  | **Description**                                                        |
| ------------- | --------- | ---------------------------------------------------------------------- |
| owner         | address   | The operator’s admin address (for management purposes).                |
| fee           | uint64256 | The fee charged by the operator (denominated as $SSV tokens per block) |
| validators    | uint32    | The amount of managed validators                                       |
| active        | boolean   | Operator network status                                                |



#### **public getOperatorFee (operatorId)**

Description: returns current operator’s fee (not declared).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| declaredFee   | uint256  | The fee charged by the operator (denominated as $SSV tokens per block) |



#### **public getOperatorDeclaredFee (operatorId)**

Description: Returns the declared fee (not actual fee) together with the execution time window.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter**           | **Type** | **Description**                                                                       |
| ----------------------- | -------- | ------------------------------------------------------------------------------------- |
| declaredFee             | uint256  | The declared fee to be charged by the operator (denominated as $SSV tokens per block) |
| executionBeginTime      | uint256  | The timestamp of when the operator can execute the declared fee                       |
| executionExpirationTime | uint256  | The timestamp of when the declared fee is expired                                     |



#### **public getOperatorEarnings (operatorId)**

Description: Returns the outstanding earnings of an operator.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values

| **Parameter** | **Type** | **Description**                                |
| ------------- | -------- | ---------------------------------------------- |
| balance       | uint256  | Operators outstanding earnings in $SSV tokens. |



### Cluster Methods <a href="#_s1a6da24gvwp" id="_s1a6da24gvwp"></a>

#### **public getBalance (owner, operatorIds, cluster)**

Description: Returns the outstanding SSV balance of a cluster.\


| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The cluster owner address                                                                                                  |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |

Return values

| **Parameter** | **Type** | **Description**                                         |
| ------------- | -------- | ------------------------------------------------------- |
| balance       | uint256  | Clusters outstanding balance denominated in $SSV tokens |



#### **public getClusterBurnRate (owner, operatorIds, cluster)**

Description: Returns current ongoing expenses of SSV tokens for a particular SSV cluster balance on per block basis (aggregates all expenses for all the validators in this cluster).\


| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The user address                                                                                                           |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |

Return values

| **Parameter** | **Type** | **Description**                                     |
| ------------- | -------- | --------------------------------------------------- |
| burnRate      | uint256  | The rate per block in which the account spends SSV. |



### Liquidator Methods <a href="#_39qo7wl8s1he" id="_39qo7wl8s1he"></a>

#### **public getClusterBurnRate (owner, operatorIds, cluster)**

Description: Returns rate of expenses in SSV tokens (per block) for a specified cluster.

| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The user address                                                                                                           |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |

Return values

| **Parameter** | **Type** | **Description**                                     |
| ------------- | -------- | --------------------------------------------------- |
| burnRate      | uint256  | The rate per block in which the cluster spends SSV. |



#### **public isLiquidatable (owner, operatorIds, cluster)**

Description: Returns true if the specified cluster is under the liquidation threshold and can be liquidated.\


| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The user address                                                                                                           |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |

Return values

| **Parameter** | **Type** | **Description**                             |
| ------------- | -------- | ------------------------------------------- |
|               | boolean  | Indication if a cluster could be liquidated |



#### **public isLiquidated (owner, operatorIds, cluster)**

Description: Returns true if the provided cluster is liquidated.

| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The user address                                                                                                           |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |

Return values

| **Parameter** | **Type** | **Description**                       |
| ------------- | -------- | ------------------------------------- |
|               | boolean  | Indication if a cluster is liquidated |

### &#x20;<a href="#_usq3rk5h0wb6" id="_usq3rk5h0wb6"></a>
