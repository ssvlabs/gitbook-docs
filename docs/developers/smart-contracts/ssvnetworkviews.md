---
sidebar_position: 2
---

# SSVNetworkViews

The SSVNetworkViews contract is for reading information about the network and its participants.

Methods are sorted by category:

- [General](#general-methods)
- [Cluster](#cluster-methods)
- [Operator](#operator-methods)
- [Oracle](#oracle-methods)
- [SSV Staking](#staking-methods)
- [Liquidator](#liquidator-methods)
- [Legacy](#legacy-methods)

## General Methods

#### **`getNetworkFee()`**

Description: Returns current network fee.

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| fee | uint256 | The fee charged by the network proportional to Effective Balance (denominated as ETH per block) |

---

#### **`getNetworkEarnings()`**

Description: Returns accumulated network fees not yet withdrawn.

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| amount | uint256 | Amount of fees accumulated in the network treasury |

---

#### **`getLiquidationThresholdPeriod()`**

Description: Returns the minimum duration (in blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

Return values:

| **Parameter** | **Type** | **Description**                                                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| blocks        | uint64   | The minimum duration (blocks) which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated. |

---

#### **`getMinimumLiquidationCollateral()`**

Description: Returns the minimum amount which a cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

Return values:

| **Parameter** | **Type** | **Description**                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| amount        | uint256  | The minimum amount of ETH which a cluster has to have (liquidation collateral) to not be liquidated. |

---

#### **`getOperatorFeeIncreaseLimit()`**

Description: Returns the max amount by which operators can increase fees in each fee update cycle. This does refer to the max operator fee limitation, but to the rate (%) by which it can be increased.

Return values:

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| amount        | uint64   | The maximum increase in percentage the operator can update his fee to. |

---

#### **`getOperatorFeePeriods()`**

Description: returns the time windows (in seconds) of operators declaration and execution fee periods.

Return values: come as a tuple `OperatorFeePeriodsData[]` with the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| seconds | uint64 | Declaration period. The duration (seconds) until an operator can execute a fee after declaring it |
| seconds | uint64 | Execution period. The duration (seconds) until the new operator fee is executed |

---

#### **`getMaximumOperatorFee()`**

Description: **Gets the operator maximum fee for operators that use ETH token**

Return values:

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| maxFee    | uint256 | The maximum fee value (ETH/year) |

---

#### **`getValidatorsPerOperatorLimit()`**

Description: Returns the maximum amount of validators an operator may manage.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Validator limit | uint32   | amount of validators an operator may manage. |


## Cluster Methods 

#### **`getBalance(owner, operatorIds, cluster)`**

Description: Returns the outstanding ETH balance of a cluster.

| Parameter | Type | Description |
|-----------|------|-------------|
| owner | address | The cluster owner address |
| operatorIds | uint64[] | List of cluster operators Ids |
| cluster | tuple[] | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples#cluster-snapshot) |

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| balance | uint256 | Clusters outstanding balance denominated in ETH |

---

#### **`getBurnRate(owner, operatorIds, cluster)`**

Description: Returns current ongoing expenses of ETH for a particular SSV cluster balance on per block basis (aggregates all expenses for all the validators in this cluster).\\

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). If this is the 1st validator within a specific cluster (unique set of operators), use - \{0,0,0,true,0\} |

Return values:

| **Parameter** | **Type** | **Description**                                     |
| ------------- | -------- | --------------------------------------------------- |
| burnRate      | uint256  | The rate per block in which the account spends ETH. |

---

#### **`getClusterAssetType(address,uint64[])`**

Description: Payment asset for the cluster identified by provided parameters.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Cluster asset type | uint8   | Cluster asset type  |

---

#### **`getEffectiveBalance(address,uint64[],tuple)`**

Description: Total Effective Balance of the cluster identified by the provided parameters.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). If this is the 1st validator within a specific cluster (unique set of operators), use - \{0,0,0,true,0\} |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| effectiveBalance | uint32   | Total effective balance of the identified cluster |


## Operator Methods

#### **`getOperatorById(operatorId)`**

Description: Returns operator's data.

| Parameter | Type | Description |
|-----------|------|-------------|
| operatorId | uint64 | The operator id |

Return values: come as a tuple `OperatorData[]` with the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| owner | address | The operator's admin address (for management purposes) |
| fee | uint64256 | The fee charged by the operator (denominated as ETH per block) |
| validatorCount | uint32 | The amount of managed validators |
| whitelistedAddress | address | The external contract set to manage this operator's whitelisted addresses |
| isPrivate | boolean | Indication if operator is permissioned |
| active | boolean | Operator network status |

---

#### **`getOperatorFee(operatorId)`**

Description: returns current operator's fee (not declared).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values:

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| declaredFee   | uint256  | The fee charged by the operator (denominated as ETH per block) |

---

#### **`getOperatorDeclaredFee(operatorId)`**

Description: Returns the declared fee (not actual fee) together with the execution time window.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values: come as a tuple `OperatorDeclaredFeeData[]` with the following parameters:

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| fee   | uint256  | The fee declared by the operator (denominated as ETH per block) |
| isFeeDeclared   | bool  | Checks whether the fee was declared |
| approvalBeginTime   | uint64  | Returns the timestamp of when the fee was declared |
| approvalEndTime   | uint64  | Returns the timestamp of when the declared fee can be executed |

---

#### **`getOperatorEarnings(operatorId)`**

Description: Returns the outstanding earnings of an operator.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values:

| **Parameter** | **Type** | **Description**                                |
| ------------- | -------- | ---------------------------------------------- |
| balance       | uint256  | Operators outstanding earnings in ETH. |

---

#### **`getWhitelistedOperators(operatorIds, whitelistedAddress)`**

Description: Returns a list of operators that have this address whitelisted for them.

| **Parameter**      | **Type**  | **Description**        |
| ------------------ | --------- | ---------------------- |
| operatorIds        | uint64\[] | List of operators Ids. |
| whitelistedAddress | address   | ETH1 address           |

Return values:

| **Parameter**          | **Type**  | **Description**                                            |
| ---------------------- | --------- | ---------------------------------------------------------- |
| whitelistedOperatorIds | uint64\[] | List of operator IDs that this address is whitelisted for. |

---

#### **`isWhitelistingContract(contractAddress)`**

Description: Returns if a contract address is a valid whitelisting contract or not.

| **Parameter**      | **Type** | **Description**                |
| ------------------ | -------- | ------------------------------ |
| whitelistedAddress | address  | Whitelisting contract address. |

Return values:

| **Parameter** | **Type** | **Description**                          |
| ------------- | -------- | ---------------------------------------- |
|  isWhitelistingContract | bool     | True if contract is valid, false if not. |

---

#### **`isAddressWhitelistedInWhitelistingContract(addressToCheck, operatorId, whitelistingContract)`**

Description: Checks the whitelisted contract for an operator to see if the address provided is whitelisted for the given operator.

| **Parameter**      | **Type** | **Description**                          |
| ------------------ | -------- | ---------------------------------------- |
| addressToCheck     | address  | Address we want to check is whitelisted. |
| operatorId         | uint256  | Operator ID.                             |
| whitelistedAddress | address  | Whitelisting contract address.           |

Return values:

| **Parameter** | **Type** | **Description**                               |
| ------------- | -------- | --------------------------------------------- |
| isWhitelisted | bool     | True if address is whitelisted, false if not. |

---

#### **`getMinimumOperatorEthFee()`**

Description: Returns if a contract address is a valid whitelisting contract or not.

Return values:

| **Parameter** | **Type** | **Description**                          |
| ------------- | -------- | ---------------------------------------- |
|  fee | uint256     |  The minimum fee that can be charged by the operator (denominated as ETH per block). |

## Oracle Methods

#### **`getActiveOracleIds()`**

Description: IDs of the currently active Oracles.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| oracleIds | uint32[4]   | The active oracles' IDs. |

---

#### **`getOracle(uint32)`**

Description: Wallet address of the Oracle identified by the provided ID.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| oracleId   | uint32 | ID of the oracle to fetch.                                                                                           |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Wallet address | address   | Wallet address of the Oracle identified by the provided ID. |

---

#### **`getOracleWeight(uint32)`**

Description: Delegation weight associated with the Oracle identified by the provided ID.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| oracleId   | uint32 | ID of the oracle to fetch.                                                                                           |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Delegation weight | unit256   | Delegation weight associated with the Oracle identified by the provided ID. |

---

#### **`getQuorumBps()`**

Description: Quorum the Oracles need to reach in order to commit a Hash root, measured in Base Points.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Quorum Base Points | uint16   | Quorum the Oracles need to reach in order to commit a Hash root. |

---

#### **`getCommittedRoot(uint64)`**

Description: Hash root of the total effective balance committed by the Oracles on the given block.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| blockNum   | uint64\[] | Block number.                                                                                           |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Hash root | bytes32   | of the total effective balance committed by the Oracles on the given block. |

## SSV Staking Methods

#### **`accEthPerShare()`**

Description: Global cumulative ETH reward index per 1 cSSV share (fixed-point, scaled by PRECISION). Used to compute each account’s pending ETH via shares * index - rewardDebt.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| ETH reward index | uint256   | Global cumulative ETH reward index |

---

#### **`cooldownDuration()`**

Description: Delay between request for withdrawal of staked SSV and the availability for tokens to be withdrawn.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Cooldown duration | uint256   | The delay duration |

---

#### **`pendingUnstake(address)`**

Description: List of pending unstaked token amounts and their respective remaining cooldown.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Wallet address | address   | User wallet address. |

Return values: come as a tuple `UnstakeRequestsData[]` with the following parameters:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| amount | uint256   | Amounts of pending unstaked token requests. |
| unlockTime | uint256   | The unlock time for each of the unstaking requests. |

---

#### **`previewClaimableEth(address)`**

Description: Amount of accrued ETH the provided address can claim.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Wallet address | address   | User wallet address. |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Accrued amount | uint256   | Previewed amount of claimable ETH for the provided address. |

---

#### **`stakedBalanceOf(address)`**

Description: Total amount of SSV tokens staked by the provided address.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Wallet address | address   | User wallet address. |

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Staked amount | uint256   | Total amount of SSV token staked by the provided address. |

---

#### **`stakingEthPoolBalance()`**

Description: Total amount of ETH accrued in fees by the protocol.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| ETH Accrued | uint256   | Total amount of ETH accrued in fees by the protocol |

---

#### **`totalStaked()`**

Description: Total amount of SSV tokens staked in the protocol.

Return values:

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| Total staked | uint256   | Amount of SSV tokens staked in the protocol. |

## Liquidator Methods

#### **`isLiquidatable(owner, operatorIds, cluster)`**

Description: Returns true if the specified cluster is under the liquidation threshold and can be liquidated.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). If this is the 1st validator within a specific cluster (unique set of operators), use - \{0,0,0,true,0\} |

Return values:

| **Parameter** | **Type** | **Description**                             |
| ------------- | -------- | ------------------------------------------- |
| isLiquidatable | boolean  | Indication if a cluster could be liquidated |

---

#### **`isLiquidated(owner, operatorIds, cluster)`**

Description: Returns true if the provided cluster is liquidated.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). If this is the 1st validator within a specific cluster (unique set of operators), use - \{0,0,0,true,0\} |

Return values:

| **Parameter** | **Type** | **Description**                       |
| ------------- | -------- | ------------------------------------- |
| isLiquidated  | boolean  | Indication if a cluster is liquidated |

## Legacy Methods

#### **`getBalanceSSV(owner, operatorIds, cluster)`**

Description: Returns the outstanding SSV balance of a legacy (SSV-based) cluster.

| Parameter | Type | Description |
|-----------|------|-------------|
| owner | address | The cluster owner address |
| operatorIds | uint64[] | List of cluster operators Ids |
| cluster | tuple[] | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). |

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| balance | uint256 | Clusters outstanding balance denominated in SSV |

---

#### **`getBurnRateSSV(owner, operatorIds, cluster)`**

Description: Returns current ongoing expenses of SSV for a particular SSV cluster balance on per block basis (aggregates all expenses for all the validators in this cluster).\\

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). If this is the 1st validator within a specific cluster (unique set of operators), use - \{0,0,0,true,0\} |

Return values:

| **Parameter** | **Type** | **Description**                                     |
| ------------- | -------- | --------------------------------------------------- |
| burnRate      | uint256  | The rate per block in which the account spends ETH. |

---

#### **`getNetworkFeeSSV()`**

Description: Returns current network fee for legacy (SSV-based) clusters.

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| fee | uint256 | The fee charged by the network (denominated as SSV per block) |

---

#### **`getNetworkEarningsSSV()`**

Description: Returns accumulated network fees not yet withdrawn from the legacy (SSV-based) clusters.

Return values:

| Parameter | Type | Description |
|-----------|------|-------------|
| amount | uint256 | Amount of fees accumulated in the network treasury |

---

#### **`getLiquidationThresholdPeriodSSV()`**

Description: Returns the minimum duration (in blocks) which legacy cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

Return values:

| **Parameter** | **Type** | **Description**                                                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| blocks        | uint64   | The minimum duration (blocks) which legacy cluster has to have sufficient balance (liquidation collateral) to not be liquidated. |

---

#### **`getMinimumLiquidationCollateralSSV()`**

Description: Returns the minimum amount which legacy cluster has to have sufficient balance (liquidation collateral) to not be liquidated.

Return values:

| **Parameter** | **Type** | **Description**                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| amount        | uint256  | The minimum amount of SSV which a cluster has to have (liquidation collateral) to not be liquidated. |

---

#### **`getMaximumOperatorFeeSSV()`**

Description: **Gets the operator maximum fee for operators that use SSV token**

Return values:

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| maxFee    | uint64 | The maximum fee value (SSV/year) |

---

#### **`getOperatorByIdSSV(operatorId)`**

Description: Returns operator's data for operators participating in legacy clusters.

| Parameter | Type | Description |
|-----------|------|-------------|
| operatorId | uint64 | The operator id |

Return values: come as a tuple `[]` with the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| owner | address | The operator's admin address (for management purposes) |
| fee | uint64256 | The fee charged by the operator (denominated as SSV per block) |
| validatorCount | uint32 | The amount of managed validators |
| whitelistedContract | address | The external contract set to manage this operator's whitelisted addresses |
| isPrivate | boolean | Indication if operator is permissioned |
| active | boolean | Operator network status |

---

#### **`getOperatorFeeSSV(operatorId)`**

Description: returns current operator's fee (not declared).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values:

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| declaredFee   | uint256  | The fee charged by the operator (denominated as SSV per block) |

---

#### **`getOperatorEarningsSSV(operatorId)`**

Description: Returns the outstanding earnings of an operator participating legacy cluster(s).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Return values:

| **Parameter** | **Type** | **Description**                                |
| ------------- | -------- | ---------------------------------------------- |
| balance       | uint256  | Operators outstanding earnings in SSV. |

---

#### **`isLiquidatableSSV(owner, operatorIds, cluster)`**

Description: Returns true if the specified legacy cluster is under the liquidation threshold and can be liquidated.

| **Parameter** | **Type**  | **Description**                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| owner         | address   | The user address                                                                                                         |
| operatorIds   | uint64\[] | List of cluster operators Ids.                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/ssv-subgraph/subgraph-examples#cluster-snapshot). If this is the 1st validator within a specific cluster (unique set of operators), use - \{0,0,0,true,0\} |

Return values:

| **Parameter** | **Type** | **Description**                             |
| ------------- | -------- | ------------------------------------------- |
| isLiquidatable | boolean  | Indication if a legacy cluster could be liquidated |