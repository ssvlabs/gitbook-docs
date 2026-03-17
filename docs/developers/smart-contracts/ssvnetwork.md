---
sidebar_position: 1
---

# SSVNetwork

The SSVNetwork contract is the main contract for operations and management. 

Methods are sorted by category:

- [Cluster](#cluster-methods)
- [Operator](#operator-methods)
- [SSV Staking](#ssv-staking-methods)
- [Governance](#governance-methods)
- [Legacy](#legacy-methods)
- [Account](#account-methods)
- [Liquidator](#liquidator-methods)

## Cluster Methods

#### **`migrateClusterToETH(operatorIds, cluster)`**

The ETH amount to deposit must be [supplied via `msg.value`](https://docs.ethers.org/v4/api-contract.html#overrides).

| **Parameter**       | **Type** | **Description**                                      |
| ------------------- | -------- | ---------------------------------------------------- |
| operatorIds | uint64[]  | An array of operator IDs of the cluster. |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples#cluster-snapshot) |

Events:

* `ClusterMigratedToETH(address owner, uint64[] operatorIds, uint256 ethDeposited, uint256 ssvRefunded, uint32 effectiveBalance, Cluster cluster)`
* *`ClusterReactivated(address indexed owner, uint64[] operatorIds, Cluster cluster)`* is **emitted only if** the cluster was liquidated prior to the migration.

---

#### **`registerValidator(publicKey, operatorIds, shares, cluster)`**

Registers new validator to a cluster of provided operators (ids + shares), **fails if** number of operatorIds is greater than 13. The ETH amount to deposit must be [supplied via `msg.value`](https://docs.ethers.org/v4/api-contract.html#overrides).

:::info Breaking Changes
With the [introduction of ETH payments](https://ssv.network/blog/introduction-to-ssv-staking), the smart contract function signature has changed. The `amount` parameter has been removed, and the function is now `payable`. The ETH amount to deposit must be supplied via `msg.value`. Update your integrations accordingly, in line with [the ethers documentation](https://docs.ethers.org/v4/api-contract.html#overrides).
:::

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes                      | The validator’s public key.                                                                                                                                                                                                                                                                                                                                          |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                                                                                                                                                                                       |
| sharesData    | bytes                      | String of keyshares - obtained by splitting the validator key using the [SSV SDK](/developers/examples/generate-and-validate-keyshares) or [SSV Keys CLI](/stakers/tools/ssv-keys-cli) tool.                                                                                                                                                                                                                                           |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples#cluster-snapshot) |
Events:

* `ValidatorAdded(address indexed owner, uint64[] operatorIds, bytes publicKey, bytes shares, Cluster cluster)`

---

#### **`bulkRegisterValidator(publicKey, operatorIds, shares, cluster)`**

Description: Registers all the new validators provided as argument to a cluster of provided operators (ids + shares), **fails if** number of operatorIds is greater than 13. The ETH amount to deposit must be [supplied via `msg.value`](https://docs.ethers.org/v4/api-contract.html#overrides).

:::info Breaking Changes
With the [introduction of ETH payments](https://ssv.network/blog/introduction-to-ssv-staking), the smart contract function signature has changed. The `amount` parameter has been removed, and the function is now `payable`. The ETH amount to deposit must be supplied via `msg.value`. Update your integrations accordingly, in line with [the ethers documentation](https://docs.ethers.org/v4/api-contract.html#overrides).
:::

| **Parameter** | **Type**          | **Description**                     |
| ------------- | -------------------------- | --------------------------------------------------------------- |
| publicKeys    | bytes\[]                   | An array of validators’ public keys.                                                |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                           |
| sharesData    | bytes\[]                   | An array of strings of keyshares - obtained by splitting the validator key using the [SSV SDK](/developers/examples/generate-and-validate-keyshares) or [SSV Keys CLI](/stakers/tools/ssv-keys-cli) tool. Each element in this array must relate to a public key in the `publicKeys` array.                    |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples#cluster-snapshot) |
Events:

* `ValidatorAdded(address indexed owner, uint64[] operatorIds, bytes publicKey, bytes shares, Cluster cluster)`

The function emits as many `ValidatorAdded` events, as is the length of the provided `publicKeys` array.


Please note: the number of validators that can be registered with the`bulkRegisterValidator` function is limited by the total transaction size. This depends both on the number of total public keys, as well as the number of operators in the chosen cluster, as follows:

* 80 validator keyshares for a cluster of 4 operators
* 40 validator keyshares for a cluster of 7 operators
* 30 validator keyshares for a cluster of 10 operators
* 20 validator keyshares for a cluster of 13 operators

---

#### **`removeValidator(publicKey, operatorIds, cluster)`**

Description: Removes validator from the SSV network.

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes     | The validator’s public key.                                                                                                                                                                               |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ValidatorRemoved(address indexed owner, uint64[] operatorIds, bytes publicKey, Cluster cluster)`

---

#### **`bulkRemoveValidator(publicKey, operatorIds, cluster)`**

Description: Removes all the validators provided as argument from the SSV network.

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKeys    | bytes\[]  | An array of validators’ public keys.                                                                                                                                                                      |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ValidatorRemoved(address indexed owner, uint64[] operatorIds, bytes publicKey, Cluster cluster)`

The function emits as many `ValidatorRemoved` events, as is the length of the provided `publicKeys` array.

Please note: the number of validators that can be de-registered with the`bulkRemoveValidator` function is limited by the total transaction size to a maximum of **500 validator keys at a time.**

---

#### **`exitValidator(publicKey, operatorIds)`**

Description: Prompts SSV nodes to sign a voluntary exit of the validator.

| **Parameter** | **Type**  | **Description**                |
| ------------- | --------- | ------------------------------ |
| publicKey     | bytes     | The validator’s public key.    |
| operatorIds   | unit64\[] | List of cluster operators Ids. |

Events:

* `ValidatorExited(address indexed owner, uint64[] operatorIds, bytes publicKey)`

---

#### **`bulkExitValidator(publicKey, operatorIds)`**

Description: Prompts SSV nodes to sign a voluntary exit for all the validators provided as argument.

| **Parameter** | **Type**  | **Description**                      |
| ------------- | --------- | ------------------------------------ |
| publicKeys    | bytes\[]  | An array of validators’ public keys. |
| operatorIds   | unit64\[] | List of cluster operators Ids.       |

Events:

* `ValidatorExited(address indexed owner, uint64[] operatorIds, bytes publicKey)`

The function emits as many `ValidatorExited` events, as is the length of the provided `publicKeys` array.


Please note: the number of validators that can be requested to exit from the beacon chain with the`bulkExitValidator` function is limited by the total transaction size to a maximum of **500 validator keys at a time.**


---

#### **`deposit(owner, operatorIds, cluster)`**

Description: Deposits ETH into a cluster balance, will fail if not enough tokens are approved.

The ETH amount to deposit must be [supplied via `msg.value`](https://docs.ethers.org/v4/api-contract.html#overrides).

:::info Breaking Changes
With the [introduction of ETH payments](https://ssv.network/blog/introduction-to-ssv-staking), the smart contract function signature has changed. The `amount` parameter has been removed, and the function is now `payable`. The ETH amount to deposit must be supplied via `msg.value`. Update your integrations accordingly, in line with [the ethers documentation](https://docs.ethers.org/v4/api-contract.html#overrides).
:::

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner         | address                    | The cluster owner address                                                                                                                                                                                 |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ClusterDeposited(address indexed owner, uint64[] operatorIds, uint256 value, Cluster cluster)`

---

#### **`withdraw(operatorIds, amount, cluster)`**

Description: Withdraws a specified amount of ETH from cluster of msg.sender, **will fail if** msg.sender tries to withdraw more than the cluster’s liquidation collateral. To withdraw the entire cluster balance and stop its operation use liquidate().

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                            |
| amount        | uint256 | Amount to be withdrawn. Amount must be divisible by 100000                                                                                        |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ClusterWithdrawn(address indexed owner, uint64[] operatorIds, uint256 value, Cluster cluster)`

---

#### **`reactivate(operatorIds, cluster)`**

Description: Reactivates a liquidated cluster, **will fail** if insufficient ETH to cover the cluster’s liquidation collateral have been deposited. The ETH amount to deposit must be [supplied via `msg.value`](https://docs.ethers.org/v4/api-contract.html#overrides).

:::info Breaking Changes
With the [introduction of ETH payments](https://ssv.network/blog/introduction-to-ssv-staking), the smart contract function signature has changed. The `amount` parameter has been removed, and the function is now `payable`. The ETH amount to deposit must be supplied via `msg.value`. Update your integrations accordingly, in line with [the ethers documentation](https://docs.ethers.org/v4/api-contract.html#overrides).
:::

| **Parameter** | **Type**                   | **Description**                                                                                                                                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operatorIds   | unit64\[]                  | List of cluster operators Ids.                                                                                                                                                                            |                                              |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ClusterReactivated(address indexed owner, uint64[] operatorIds, Cluster cluster)`

---

#### **`updateClusterBalance(cluster[], effectiveBalance, merkleProof)`**

Description: Updates the effective balance for the cluster described by provided parameters. A merkle proof of the data has to also be provided to verify data validity.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| effectiveBalance         | uint32   | Cluster's new total effective balance   |
| merkleProof[]         | bytes32[]   | Merkle proof of the data to verify data validity   |
| cluster       | tuple\[]                   | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:
* `ClusterBalanceUpdated(ctx.clusterOwner, operatorIds, ctx.blockNum, ctx.effectiveBalance, cluster)`

## Operator Methods

#### **`registerOperator(publicKey, fee, setPrivate)`**

Description: Registers a new operator (key) with a set fee, **fails if** fee is less than the minimal fee.

| **Parameter** | **Type**                             | **Description**             |
| ------------- | ------------------------------------ | --------------------------- |
| publicKey     | bytes                                | The operator public key (generated as part of the node setup).   |
| fee   | uint256 | The fee charged by the operator (denominated as ETH per block)        |
| setPrivate    | boo  | A flag to set the operator to private or public during registration. Calls the [**`setOperatorsPrivateUnchecked`**](ssvnetwork.md#setoperatorsprivateuncheckedoperatorids)function if set to true. |

Events:

* `OperatorAdded(uint64 indexed operatorId, address indexed owner, bytes publicKey, uint256 fee)`
* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`

---

#### **`removeOperator(operatorId)`**

Description: Permanently removes the operator from the network (irreversible).

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorRemoved(uint64 indexed operatorId)`

---

#### **`withdrawOperatorEarnings(operatorId)`**

Description: Withdraws a specified amount of ETH from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type**                   | **Description**                      |
| ------------- | -------------------------- | --------------------------------------- |
| operatorId    | uint64                     | The operator id                |
| amount        | uint256 | Amount must be shrinkable (divisible by 100000) |

Events:

* `OperatorWithdrawn(address indexed owner, uint64 indexed operatorId, uint256 value)`

---

#### **`withdrawAllOperatorEarnings(operatorId)`**

Description: Withdraws all ETH earnings from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorWithdrawn(address indexed owner, uint64 indexed operatorId, uint256 value)`

---

#### **`withdrawAllVersionOperatorEarnings(operatorId)`**

Description: Withdraws all ETH and SSV earnings from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorWithdrawn(address indexed owner, uint64 indexed operatorId, uint256 value)`
* *`OperatorWithdrawnSSV(address indexed owner, uint64 indexed operatorId, uint256 value)`* is **emitted only if** the operator had any SSV tokens to withdraw.


---

#### **`setOperatorsWhitelists (operatorIds, whitelistAddresses)`**

Description: For a list of operators provided, set a list of whitelisted addresses which can register validators to these operators. Subsequent calls of this function **extend the list** of whitelisted addresses, and **do not overwrite it**.

| **Parameter** | **Type**   | **Description**                                           |
| ------------- | ---------- | --------------------------------------------------------- |
| operatorIds    | uint64\[]  | Operator ID list                                          |
| whitelistAddresses   | address\[] | A list of ETH1 addresses to be whitelisted. |

Events:

* `OperatorMultipleWhitelistUpdated(uint64[] operatorIds, address[] whitelistAddresses)`

---

#### **`removeOperatorsWhitelists (operatorIds, whitelistAddresses)`**

Description: For a list of operators provided, remove a list of whitelisted addresses.

| **Parameter** | **Type**   | **Description**                                                          |
| ------------- | ---------- | ------------------------------------------------------------------------ |
| operatorIds    | uint64\[]  | Operator ID list                                                         |
| whitelistAddresses   | address\[] | A list of ETH1 addresses to be removed from the whitelist. |

Events:

* `OperatorMultipleWhitelistRemoved(uint64[] operatorIds, address[] whitelistAddresses)`

---

#### **`setOperatorsPrivateUnchecked(operatorIds)`**

Description: For a list of operators provided, set their status to private.

| **Parameter** | **Type**  | **Description**  |
| ------------- | --------- | ---------------- |
| operatorIds    | uint64\[] | Operator ID list |

Events:

* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`

---

#### **`setOperatorsPublicUnchecked(operatorIds)`**

Description: For a list of operators provided, set their status to public.

| **Parameter** | **Type**  | **Description**  |
| ------------- | --------- | ---------------- |
| operatorIds    | uint64\[] | Operator ID list |

Events:

* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`

---

#### **`setOperatorsWhitelistingContract(operatorIds, whitelistingContract)`**

Description: For a list of operators provided, set an external whitelisting contract to manage the whitelist for these operators. [Must be a valid whitelisting contract.](external-whitelist-contract-example.md)

| **Parameter**        | **Type**                 | **Description**                                      |
| -------------------- | ------------------------ | ---------------------------------------------------- |
| operatorIds           | uint64\[]                | Operator ID list                                     |
| whitelistingContract | ISSVWhitelistingContract | A valid whitelisting contract address. |

Events:

* `OperatorWhitelistingContractUpdated(uint64[] operatorIds, address whitelistingContract)`

---

#### **`removeOperatorsWhitelistingContract(operatorIds)`**

Description: For a list of operators provided, remove the whitelisting contract stored.

| **Parameter** | **Type**  | **Description**  |
| ------------- | --------- | ---------------- |
| operatorIds    | uint64\[] | Operator ID list |

Events:

* `OperatorWhitelistingContractUpdated(uint64[] operatorIds, address whitelistingContract)`

---

#### **`declareOperatorFee(operatorId, operatorFee)`**

Description: Initiates the first step of the operator fee update cycle - declaration of a new fee. [After specified](ssvnetworkviews.md#getoperatorfeeperiods) time window operator will be able to change to the new fee with executeOperatorFee().

| **Parameter** | **Type**                   | **Description**                                 |
| ------------- | -------------------------- | ----------------------------------------------- |
| operatorId    | uint64                     | The operator id                                 |
| operatorFee   | uint256 | New fee (denominated as ETH per block). |

Events:

* `OperatorFeeDeclared(address indexed owner, uint64 indexed operatorId, uint256 blockNumber, uint256 fee)`

---

#### **`executeOperatorFee()`**

Description: Activates operator’s fee change specified in previously called declareOperatorFee(). This function needs to be called within a [certain time window](ssvnetworkviews.md#getoperatorfeeperiods) following declareOperatorFee().

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorFeeExecuted(address indexed owner, uint64 indexed operatorId, uint256 blockNumber, uint256 fee)`

---

#### **`cancelDeclaredOperatorFee(operatorId)`**

Description: Cancels operator’s fee change requested in previously called declareOperatorFee().

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorFeeDeclarationCancelled(address indexed owner, uint64 indexed operatorId)`

---

#### **`reduceOperatorFee(operatorId, fee)`**

Description: Reduce the operator fee, does not abide by the restrictions of fee increase

| Parameter  | Type                       | Description                                     |
| ---------- | -------------------------- | ----------------------------------------------- |
| operatorId | uint64                     | The operator id                                 |
| fee        | uint256 | New fee (denominated as ETH per block). |

Events:

* `OperatorFeeExecuted(address indexed owner, uint64 indexed operatorId, uint256 blockNumber, uint256 fee)`

## SSV Staking Methods

#### **`stake(amount)`**

Description: User transfers the specified amount of SSV tokens to the contract to be staked and accrue rewards. The contract issues a corresponding amount of cSSV tokens in return, representing the stake.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| amount        | uint256 | SSV amount to stake, must be shrinkable (divisible by 10000000) |

Events:
* `Staked(msg.sender, amount)`
* `RewardsSettled(user, pending, s.accrued[user], idx)`

---

#### **`claimEthRewards()`**

Description: Usable by former owners of cSSV tokens to claim ETH rewards accrued prior to the tokens transfer to a new owner. Initiator's address will be used.

Events:
* `RewardsClaimed(msg.sender, payout)`
* `RewardsSettled(user, pending, s.accrued[user], idx)`

---

#### **`requestUnstake(amount)`**

Description:  Request to unstake the specified amount of tokens from the contract. A cooldown period must be respected before being able to withdraw these tokens.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| amount        | uint256 | Amount must be shrinkable (divisible by 100000) |

Events:
* `UnstakeRequested(msg.sender, amount, unlockTime)`
* `RewardsSettled(user, pending, s.accrued[user], idx)`

---

#### **`withdrawUnlocked()`**

Description: Withdraws all previously requested amounts to be unstaked for which the cooldown period has elapsed. Initiator's address will be used.

Events:
* `UnstakedWithdrawn(msg.sender, amount)`

---

#### **`onCSSVTransfer(from, to, amount)`**

Description: Ensures that rewards accrued by the sender up to the moment of transfer remain claimable by the sender, and that the receiver starts accruing rewards only from the moment they receive cSSV. Without this hook, a receiver could claim rewards earned before they held the tokens.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| from         | address   | The cSSV sender address   |
| to         | address   | The cSSV receiver address   |
| amount        | uint256 | Amount must be shrinkable (divisible by 100000) |

Events:
* `RewardsSettled(user, pending, s.accrued[user], idx)`

---

#### **`rescueERC20(token, to, amount)`**

Description: Transfers an ERC20 token that may have been accidentally sent to the contract.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| token         | address   | Token's contract address   |
| to         | address   | The cSSV receiver address   |
| amount        | uint256 | Amount must be shrinkable (divisible by 100000) |

Events:
* `ERC20Rescued(token, to, amount)`

## Governance Methods 

#### **`commitRoot(merkleRoot, blockNum)`**

Description: Function used by oracles to commit a new Merkle root representing network status at a given block.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| merkleRoot         | bytes32   | The cluster owner   |
| blockNum         | uint64   | The cluster owner   |

Events:
* `WeightedRootProposed(merkleRoot, blockNum, accumulatedWeight, threshold, oracleId, msg.sender)`

---

#### **`replaceOracle(oracleId, newOracle)`**

Description: DAO function to replace the address associated with the specified Oracle ID.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| oracleId        | uint32 | The oracle's Id |
| newOracle         | address   | New address to replace with   |

Events:
* `OracleReplaced(oracleId, oldOracle, newOracle)`

---

#### **`setQuorumBps(quorum)`**

Description: DAO function to set the percentage of Oracles voting on the same Merkle root, in order for this to be accepted.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| quorum         | uint16   | Percentage of Oracles voting to set the new quorum   |

Events:
* `QuorumUpdated(quorum)`

---

#### **`setUnstakeCooldownDuration(duration)`**

Description: DAO function to set the time delay between the request of unstaking tokens and when such tokens can actually be withdrawn.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| duration         | uint64   | The unstake time delay  |

Events:
* `CooldownDurationUpdated(duration)`

---

#### **`syncFees()`**

Description: Recalculates the ratio between total network fees registered by the DAO and the total amount of staked tokens.

Events:
* `FeesSynced(newFeesWei, s.accEthPerShare)`

---

#### **`updateNetworkFee(networkFee)`**

Description: Updates network fee.

| **Parameter** | **Type**                   | **Description**                      |
| ------------- | -------------------------- | ------------------------------------ |
| networkFee    | uint256 (casted to uint64) | The fee charged by the network per 32 ETH (denominated as ETH per block). |

Events:

* `NetworkFeeUpdated(uint256 oldFee, uint256 newFee)`

---

#### **`updateLiquidationThresholdPeriod(blocks)`**

Description: Sets the minimum period (in blocks) after which a cluster can be liquidated.

| **Parameter** | **Type** | **Description**                               |
| ------------- | -------- | --------------------------------------------- |
| blocks        | uint64   | Duration in blocks to have sufficient balance |

Events:

* `LiquidationThresholdPeriodUpdated(uint64 value)`

---

#### **`updateMaximumOperatorFee(maxFee)`**

Description: Updates the maximum yearly fee per 32 ETH an operator can set

| **Parameter** | **Type** | **Description**                                          |
| ------------- | -------- | -------------------------------------------------------- |
| maxFee        | uint256   | Maximum fee (in ETH per year) an operator can set |

Events:

* `OperatorMaximumFeeUpdated(uint256 maxFee)`

---

#### **`updateMinimumLiquidationCollateral(amount)`**

Description: Sets the minimum collateral (in ETH) each cluster must keep in his balance.

| **Parameter** | **Type**                   | **Description**                  |
| ------------- | -------------------------- | --------------------------------- |
| amount        | uint256 | Amount of ETH collateral. Amount must be shrinkable (divisible by 10000000) |

Events:

* `MinimumLiquidationCollateralUpdated(uint256 value)`

---

#### **`updateOperatorFeeIncreaseLimit(newOperatorMaxFeeIncrease)`**

Description: Sets the max amount by which operators can increase fees in each fee update cycle. This does not limit max operator fee, only the rate (%) by which it can be increased within each fee update cycle.

| **Parameter**             | **Type** | **Description**             |
| ------------------------- | -------- | --------------------------- |
| newOperatorMaxFeeIncrease | uint256   | Maximum increase percentage |

Events:

* `OperatorFeeIncreaseLimitUpdated(uint64 value)`

---

#### **`updateDeclareOperatorFeePeriod(seconds)`**

Description: Sets the time window (in seconds) between the declaration and activation of a new operator fee.

| **Parameter**                  | **Type** | **Description**                                                           |
| ------------------------------ | -------- | ------------------------------------------------------------------------- |
| updateDeclareOperatorFeePeriod | uint64   | Period in seconds until an operator can execute a fee after declaring it. |

Events:

* `DeclareOperatorFeePeriodUpdated(uint64 value)`

---

#### **`updateExecuteOperatorFeePeriod(seconds)`**

Description: Sets the time window (in seconds) in which an operator can activate a new fee.

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| seconds       | uint64   | Period in seconds that an operator can execute a fee until it expires. |

Events:

* `ExecuteOperatorFeePeriodUpdated(uint64 value)`

---

#### **`updateMinimumOperatorEthFee(minFee)`**

Description: DAO function to set min operator fee in gwei.

| **Parameter** | **Type**  | **Description**               |
| ------------- | --------- | ----------------------------- |
| minFee        | uint256 | Amount must be shrinkable (divisible by 100000) |

Events:
* `MinimumOperatorEthFeeUpdated(minFee)`

## Legacy Methods

All methods that relate to the legacy (SSV-based) clusters.

#### **`withdrawOperatorEarningsSSV(operatorId, amount)`**

Description: Withdraws a specified amount of SSV tokens from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type**                   | **Description**                                                                                                  |
| ------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| operatorId    | uint64                     | The operator id                                                                                                  |
| amount        | uint256   | Amount must be shrinkable (divisible by 10000000) |

Events:

* `OperatorWithdrawnSSV(address indexed owner, uint64 indexed operatorId, uint256 value)`

---

#### **`withdrawAllOperatorEarningsSSV(operatorId)`**

Description: Withdraws all SSV tokens earnings from provided operator balance to msg.sender, **will fail if** msg.sender is not the operator owner.

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| operatorId    | uint64   | The operator id |

Events:

* `OperatorWithdrawnSSV(address indexed owner, uint64 indexed operatorId, uint256 value)`

---

#### **`liquidateSSV(owner, operatorIds, cluster)`**

Description: Liquidates an SSV-based cluster sends their balances to the msg.sender (the Liquidator), **will fail** if the cluster is not liquidatable (see isLiquidatable()).

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The cluster owner address                                                                                                                                                                                 |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ClusterLiquidated(address indexed owner, uint64[] operatorIds, Cluster cluster)`

---

#### **`updateNetworkFeeSSV(networkFee)`**

Description: Updates network fee.

| **Parameter** | **Type**                   | **Description**                                                                      |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| networkFee    | uint256 (casted to uint64) | The fee charged by the network per validator (denominated as SSV tokens per block). |

Events:

* `NetworkFeeUpdatedSSV(uint256 oldFee, uint256 newFee)`

---

#### **`withdrawNetworkSSVEarnings(amount)`**

Description: Withdraws accumulated network fees in SSV token to DAO treasury.

| **Parameter** | **Type**                   | **Description**                                                                                                   |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| amount        | uint256 (casted to uint64) | Amount to be withdrawn. Amount must be shrinkable (divisible by 10000000) |

Events:

* `NetworkEarningsWithdrawn(uint256 value, address recipient)`

---

#### **`updateLiquidationThresholdPeriodSSV(blocks)`**

Description: Sets the minimum period (in blocks) after which an SSV-based cluster can be liquidated.

| **Parameter** | **Type** | **Description**                               |
| ------------- | -------- | --------------------------------------------- |
| blocks        | uint64   | Duration in blocks to have sufficient balance |

Events:

* `LiquidationThresholdPeriodSSVUpdated(uint64 value)`

---

#### **`updateMinimumLiquidationCollateralSSV(amount)`**

Description: Sets the minimum collateral each SSV-based cluster must keep in his balance.

| **Parameter** | **Type**                   | **Description**                                                                                                     |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| amount        | uint256 (casted to uint64) | Amount of SSV token collateral. Amount must be shrinkable (divisible by 10000000) |

Events:

* `MinimumLiquidationCollateralSSVUpdated(uint256 value)`

## Account Methods

#### **`setFeeRecipientAddress(feeRecipientAddress)`**

Description: sets a fee recipient address to receive tips from user transactions (part block proposal rewards). This address will be set for all the account’s validators (all clusters).

| **Parameter**       | **Type** | **Description**                                      |
| ------------------- | -------- | ---------------------------------------------------- |
| feeRecipientAddress | address  | An ETH1 address that receives fee recipient rewards. |

Events:

* `FeeRecipientAddressUpdated(address indexed owner, address recipientAddress)`

## Liquidator Methods

#### **`liquidate(owner, operatorIds, cluster)`**

Description: Liquidates a cluster sends their balances to the msg.sender (the Liquidator), **will fail** if the cluster is not liquidatable (see [isLiquidatable()](/developers/smart-contracts/ssvnetworkviews#isliquidatableowner-operatorids-cluster) method).

| **Parameter** | **Type**  | **Description**                                                                                                                                                                                           |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner         | address   | The cluster owner address                                                                                                                                                                                 |
| operatorIds   | unit64\[] | List of cluster operators Ids.                                                                                                                                                                            |
| cluster       | tuple\[]  | Object containing the latest cluster snapshot data - obtained using the [SSV Subgraph](/developers/api/subgraph-examples.md#cluster-snapshot)  |

Events:

* `ClusterLiquidated(address indexed owner, uint64[] operatorIds, Cluster cluster)`