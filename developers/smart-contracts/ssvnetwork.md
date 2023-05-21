# SSVNetwork

The SSVNetwork contract is the main contract for operations and management.

### Repository <a href="#_xkgqmoxdldho" id="_xkgqmoxdldho"></a>

{% embed url="https://github.com/bloxapp/ssv-network/tree/main/contracts" %}

### Operator Methods <a href="#_cxoku5ytbvgq" id="_cxoku5ytbvgq"></a>

#### **public registerOperator (publicKey, operatorFee)**

Description: Registers a new operator (key) with a set fee, **fails if** fee is less than the minimal fee.

| **Parameter** | **Type**                             | **Description**                                                        |
| ------------- | ------------------------------------ | ---------------------------------------------------------------------- |
| publicKey     | bytes                                | The operator public key (generated as part of the node setup).         |
| operatorFee   | <p>uint256<br>(casted to uint64)</p> | The fee charged by the operator (denominated as $SSV tokens per block) |



#### **public removeOperator (operatorId)**

Description: Permanently removes the operator from the network (irreversible).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |



#### **public withdrawOperatorEarnings (operatorId)**

Description: Withdraws all SSV earnings from the operator balance

Description: Withdraws a specified amount of SSV tokens from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type**                   | **Description**        |
| ------------- | -------------------------- | ---------------------- |
| operatorId    | uint64                     | The operator id        |
| amount        | uint256 (casted to uint64) | Amount to be withdrawn |



#### **public withdrawOperatorEarnings (operatorId)**

Description: Withdraws all SSV tokens earnings from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |



#### **public declareOperatorFee (operatorId, operatorFee)**

Description: Initiates the first step of the operator fee update cycle - declaration of a new fee. After a [specific time window](../../learn/stakers/validators/update-operators.md), the operator will be able to change to the new fee with executeOperatorFee().

| **Parameter** | **Type**                   | **Description**                                 |
| ------------- | -------------------------- | ----------------------------------------------- |
| operatorId    | uint64                     | The operator id                                 |
| operatorFee   | uint256 (casted to uint64) | New fee (denominated as $SSV tokens per block). |



#### **public executeOperatorFee ()**

Description: Activates operator’s fee change specified in previously called declareOperatorFee(). This function needs to be called within a [specified time window](broken-reference) following declareOperatorFee().

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |



#### **public cancelDeclaredOperatorFee (operatorId)**

Description: Cancels operator’s fee change requested in previously called declareOperatorFee().

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |



### Account Methods <a href="#_af9cg9vns61i" id="_af9cg9vns61i"></a>

#### **public setFeeRecipientAddress (feeRecipientAddress)**

Description: sets a fee recipient address to receive tips from user transactions (part block proposal rewards). This address will be set for all the account’s validators (all clusters).

| **Parameter**       | **Type** | **Description**                                      |
| ------------------- | -------- | ---------------------------------------------------- |
| feeRecipientAddress | address  | An ETH1 address that receives fee recipient rewards. |



### Cluster Methods <a href="#_hqxi798q7b6v" id="_hqxi798q7b6v"></a>

#### **public registerValidator (publicKey, operatorIds, shares, amount, cluster)**

Description: Registers new validator to a cluster of provided operators (ids + shares), **fails if** number of operatorIds is greater than 13..

| **Parameter** | **Type**                   | **Description**                                                                                                            |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes                      | The validator’s public key.                                                                                                |
| operatorIds   | unit64\[]                  | List of cluster operators Ids (ascending order).                                                                           |
| shares        | bytes                      | String of keyshares - obtained by splitting the validator key using the [SSV-Keys](../tools/ssv-key-distributor/) tool.    |
| amount        | uint256 (casted to uint64) | <p>Amount of SSV token to be deposited as payment</p><p>(not mandatory)</p>                                                |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |



#### **public removeValidator (publicKey, operatorIds, cluster)**

Description: Removes validator from the SSV network.

| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes     | The validator’s public key.                                                                                                |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |



#### **public deposit (owner, operatorIds, amount, cluster)**

Description: Deposits SSV token into a cluster, **will fail if** not enough tokens are approved.

| **Parameter** | **Type**                   | **Description**                                                                                                            |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address                    | The cluster owner address                                                                                                  |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                             |
| amount        | uint256 (casted to uint64) | $SSV amount to be deposited                                                                                                |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |



#### **public withdraw (operatorIds, amount, cluster)**

Description: Withdraws a specified amount of SSV tokens from cluster of msg.sender, **will fail if** msg.sender tries to withdraw more than the cluster’s liquidation collateral. To withdraw the entire cluster balance and stop its operation use liquidate().

| **Parameter** | **Type**                   | **Description**                                                                                                            |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                             |
| amount        | uint256 (casted to uint64) | Amount to be withdrawn                                                                                                     |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |



#### **public reactivate(operatorIds, amount, cluster)**

Description: Reactivates a liquidated cluster, **will fail** if insufficient SSV tokens to cover the cluster’s liquidation collateral have been deposited.

| **Parameter** | **Type**                   | **Description**                                                                                                            |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                             |
| amount        | uint256 (casted to uint64) | $SSV amount to be deposited                                                                                                |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |



### Liquidator Methods <a href="#_sli6i8fh6q5y" id="_sli6i8fh6q5y"></a>

Write methods for liquidators

#### **Public liquidate (owner, operatorIds, cluster)**

Description: Liquidates a cluster sends their balances to the msg.sender (the Liquidator), **will fail** if the cluster is not liquidatable (see isLiquidatable()).

| **Parameter** | **Type**  | **Description**                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The cluster owner address                                                                                                  |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                             |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [Cluster-Scanne](../tools/cluster-scanner/)r tool. |



### Governance Methods <a href="#_31cymrhcphoi" id="_31cymrhcphoi"></a>

#### **public updateNetworkFee (networkFee)**

Description: Updates network fee.

| **Parameter** | **Type**                   | **Description**                                                                      |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| networkFee    | uint256 (casted to uint64) | The fee charged by the network per validator (denominated as $SSV tokens per block). |



#### **public withdrawNetworkEarnings (amount)**

Description: Withdraws accumulated network fees in SSV token to DAO treasury.

| **Parameter** | **Type**                   | **Description**        |
| ------------- | -------------------------- | ---------------------- |
| amount        | uint256 (casted to uint64) | Amount to be withdrawn |



#### **public updateLiquidationThresholdPeriod (blocks)**

Description: Sets the minimum period (in blocks) after which a cluster can be liquidated.

| **Parameter** | **Type** | **Description**                               |
| ------------- | -------- | --------------------------------------------- |
| blocks        | uint64   | Duration in blocks to have sufficient balance |



#### **public updateOperatorFeeIncreaseLimit (newOperatorMaxFeeIncrease)**

Description: Sets the max amount by which operators can increase fees in each fee update cycle. This does not limit max operator fee, only the rate (%) by which it can be increased within each fee update cycle.

| **Parameter**             | **Type** | **Description**             |
| ------------------------- | -------- | --------------------------- |
| newOperatorMaxFeeIncrease | uint64   | Maximum increase percentage |



#### **public updateDeclareOperatorFeePeriod (seconds)**

Description: Sets the time window (in seconds) between the declaration and activation of a new operator fee.

| **Parameter**                  | **Type** | **Description**                                                           |
| ------------------------------ | -------- | ------------------------------------------------------------------------- |
| updateDeclareOperatorFeePeriod | uint64   | Period in seconds until an operator can execute a fee after declaring it. |



#### **public updateExecuteOperatorFeePeriod (seconds)**

Description: Sets the time window (in seconds) in which an operator can activate a new fee.

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| seconds       | uint64   | Period in seconds that an operator can execute a fee until it expires. |

### &#x20;<a href="#_59rgam1ctr77" id="_59rgam1ctr77"></a>
