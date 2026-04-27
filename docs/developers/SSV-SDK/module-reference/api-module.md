# API Module

This is a read-only library which contains the functions you need to obtain data relating to the SSV network.

After instantiating the SDK, you can call any of the functions in the api library like so:

```typescript
sdk.api.getOwnerNonce()
```

## Function List

### `getOwnerNonce(string account_address)`

Accepts an owner address and returns the current owner nonce from the subgraph.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| owner | string | Owner address | "0xA4831B989972605A62141a667578d742927Cbef9" |

#### Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
let nonce = Number(await sdk.api.getOwnerNonce({ owner: ownerAddress }))
```

Example output:

```bash
12
```

### `toSolidityCluster(id)`

:::info Please note
This method was previously named as `getClusterSnapshot` in 0.1.x versions. It is available as a deprecated alias in current `1.x` releases for backwarsd compatibility.
:::

Accepts a cluster ID and returns the current cluster snapshot from the subgraph.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID in its computed ID form | "0xf69a08b652f0cebb685c2ffe043cfb767b66544a-5-6-7-8" |

#### Example:

```typescript
const clusterSnapshot = await sdk.api.toSolidityCluster({ id: clusterID })
```

Example output:

```bash
{
  active: true,
  balance: '19479447888000000000',
  index: '46367642388',
  networkFeeIndex: '59597136600',
  validatorCount: '1'
}
```

### `createClusterId(owner_address, operator_ids[])`

Accepts the owner address and a list of operator IDs, computes and returns the cluster ID.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| owner_address | string | Address of the cluster owner | "0x81592c3de184a3e2c0dcb5a261bc107bfa91f494" |
| operator_ids[] | integer[] | List of operator IDs | [12, 34, 56, 78] |

#### Example:

```typescript
import { createClusterId } from '@ssv-labs/ssv-sdk/utils'

const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
const operatorIds = [242, 686, 707, 736]
const clusterID = createClusterId(ownerAddress, operatorIds)
```

Example output:

```bash
0xf69a08b652f0cebb685c2ffe043cfb767b66544a-242-686-707-736
```

### `isClusterId(cluster_id)`

Checks whether a string is a valid cluster ID.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| cluster_id | string | Cluster ID string to validate | "0xf69a08b652f0cebb685c2ffe043cfb767b66544a-242-686-707-736" |

#### Example:

```typescript
import { isClusterId } from '@ssv-labs/ssv-sdk/utils'

const isValid = isClusterId('0xf69a08b652f0cebb685c2ffe043cfb767b66544a-242-686-707-736')
```

Example output:

```bash
true
```

### `getClusterBalance(clusterId, daoAddress, operatorIds)`

Accepts a cluster ID together with the DAO address and operator IDs, and returns cluster balance details.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| clusterId | string | A cluster ID in its computed ID form | "0xf69a08b652f0cebb685c2ffe043cfb767b66544a-5-6-7-8" |
| daoAddress | string | Address of the DAO (chain specific) | "0x38A4794cCEd47d3baf7370CcC43B560D3a1beEFA" |
| operatorIds | string[] | List of operator IDs | ["242", "686", "707", "736"] |

#### Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
const operatorIds = [242, 686, 707, 736]
const operatorIdsString = ['242', '686', '707', '736']
const clusterID = createClusterId(ownerAddress, operatorIds)
const clusterBalance = await sdk.api.getClusterBalance({
  clusterId: clusterID,
  daoAddress: "0x38A4794cCEd47d3baf7370CcC43B560D3a1beEFA",
  operatorIds: operatorIdsString,
})
```

Example output:

```bash
{
  cluster: {
    validatorCount: '140',
    networkFeeIndex: '110259590936',
    index: '136319254858',
    balance: '126290824043600000000'
  }
}
```

### `getCluster(id)`

Accepts a cluster ID and returns details about that cluster.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Cluster ID in its computed ID form | "0xf69a08b652f0cebb685c2ffe043cfb767b66544a-5-6-7-8" |

#### Example:

```typescript
const clusterData = await sdk.api.getCluster({ id: clusterID })
```

Example output:

```bash
{
  active: true,
  validatorCount: '140',
  balance: '126290824043600000000',
  index: '136319254858',
  networkFeeIndex: '110259590936',
  operatorIds: ['242', '686', '707', '736']
}
```

### `getClusters(owner)`

Accepts an owner address and returns details about all of the clusters that they own.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| owner | string | Address of the cluster owner | "0x81592c3de184a3e2c0dcb5a261bc107bfa91f494" |

#### Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
const clusterData = await sdk.api.getClusters({ owner: ownerAddress })
```

Example output:

```bash
[
  {
    id: '0xa4831b989972605a62141a667578d742927cbef9-11-21-24-29',
    active: false,
    validatorCount: '4',
    balance: '0',
    index: '0',
    networkFeeIndex: '0',
    operatorIds: ['11', '21', '24', '29']
  },
  {
    id: '0xa4831b989972605a62141a667578d742927cbef9-11-66-306-400',
    active: false,
    validatorCount: '0',
    balance: '0',
    index: '0',
    networkFeeIndex: '0',
    operatorIds: ['11', '66', '306', '400']
  }
]
```

### `getOperator(id)`

Accepts an operator ID and returns details about the operator.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | A single operator ID | "4" |

#### Example:

```typescript
const operatorData = await sdk.api.getOperator({ id: "4" })
```

Example output:

```bash
{
  id: '4',
  publicKey: 'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdXZleUpUMURwM21mQ3FRTUora2YKZHdhV0d1bkRURUFaWmNTOHdtUTJBcjU1bE5venl5cHRwb1lGSTgxaW1RSmpwdVV0akR2am15RDRQSmt1SzFXRQovZG9TSzFraWlTSEYvZFBaeE5ZT2swMlRiTGIvTXBjMG12VE1nZmRsVDBoTlVOWDZIMnJzZzNlc2NEOStENEdDCmxtZGpCdmdxUDQydXdDbFlQUVhuN3Z6OWlOOEpXdEFtd1JkQ25USkZ6M2tYSEFPVGMyMjJGYXp4ZGJVNEVPYkIKVmJNejd2UXRmMWtNSGtacEh5UXNpL3F0WmhQaThtTlNQTWpMTDBtcmc4Ly9xVjIyeEVPNENmSHFKZkZOWEhKVwpEbU85M2h2QXE2dDFZOGN5UVZkSGZ2WEp5VzRxR29MY25HZzV1S2ZSYWVCSSt1aXFSeExOL2dtTnA2RzdpZVNkCkl3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  validatorCount: '486',
  isPrivate: false,
  whitelistedContract: '0x0000000000000000000000000000000000000000',
  whitelisted: []
}
```

### `getOperators(operatorIds[])`

Accepts a list of operator IDs and returns details about them.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorIds | string[] | An array of operator IDs | ["4", "5"] |

#### Example:

```typescript
const operatorData = await sdk.api.getOperators({ operatorIds: ["4", "5"] })
```

Example output:

```bash
[
  {
    id: '4',
    publicKey: 'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdXZleUpUMURwM21mQ3FRTUora2YKZHdhV0d1bkRURUFaWmNTOHdtUTJBcjU1bE5venl5cHRwb1lGSTgxaW1RSmpwdVV0akR2am15RDRQSmt1SzFXRQovZG9TSzFraWlTSEYvZFBaeE5ZT2swMlRiTGIvTXBjMG12VE1nZmRsVDBoTlVOWDZIMnJzZzNlc2NEOStENEdDCmxtZGpCdmdxUDQydXdDbFlQUVhuN3Z6OWlOOEpXdEFtd1JkQ25USkZ6M2tYSEFPVGMyMjJGYXp4ZGJVNEVPYkIKVmJNejd2UXRmMWtNSGtacEh5UXNpL3F0WmhQaThtTlNQTWpMTDBtcmc4Ly9xVjIyeEVPNENmSHFKZkZOWEhKVwpEbU85M2h2QXE2dDFZOGN5UVZkSGZ2WEp5VzRxR29MY25HZzV1S2ZSYWVCSSt1aXFSeExOL2dtTnA2RzdpZVNkCkl3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
    validatorCount: '486',
    isPrivate: false,
    whitelistedContract: '0x0000000000000000000000000000000000000000',
    whitelisted: []
  },
  {
    id: '5',
    publicKey: 'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBMS93RkNBYlVSNEhNcWRDeDY2L0oKdDV2K000U0d0NksrSi9GaXpMcGptUUpocXc2L0ZrWmdDcjJBSzNkWlpmRDkrMDFGWXhmcG0xYzB1U20rQ1E1UApDUDBNRDY4czJHQnR0eVROeE8vaHdObkREYXRTbnlSNDE4YWp1eUM5UmoxaVZ2WlRlR3Q4ZnFycHA0WjFZMmxQCjlXenFZemgwSlZxUjB1MEhyay9SdElIaUxvOE9INCtkR1Zjb1hydy9mdXpCZ0xPb0RKVFRocW5CNHIydHZwTTEKSTNEM0h2ZEtwTmY2UkM0Y2RUQ1YwOFVRQkE2bU11YnB2dVM3dFVMOVZoalJmMUJkb09wMFd6NWdrdWFIRkJGcQo0RnprNTRONXRzb1pRZDR6Zzd2UmhVUCt0dW1qNzZjMW9wc2pEakVOWjUzdWkxeUwvN2N3Rk5xS2xMNG1TemIvCnZ3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
    validatorCount: '503',
    isPrivate: false,
    whitelistedContract: '0x0000000000000000000000000000000000000000',
    whitelisted: []
  }
]
```

### `getValidator(id)`

Accepts a validator ID and returns details about the validator.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | A single validator ID | "0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9" |

#### Example:

```typescript
const validatorData = await sdk.api.getValidator({ id: "0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9" })
```

Example output:

```bash
{
  id: '0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9'
}
```

### `getValidators(ids[])`

Accepts a list of validator IDs and returns details about them.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| ids | string[] | An array of validator IDs | ["0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9", "0x1a85052f3b9d17e73ec76c472220c80ada65a19a0fd177344b1e9f6173d51136c400120989dbd9ff498defc99dfe5181"] |

#### Example:

```typescript
const validatorData = await sdk.api.getValidators({
  ids: [
    "0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9",
    "0x1a85052f3b9d17e73ec76c472220c80ada65a19a0fd177344b1e9f6173d51136c400120989dbd9ff498defc99dfe5181"
  ]
})
```

Example output:

```bash
[
  {
    id: '0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9'
  }
]
```

### `getDaoValues()`

Returns DAO values such as network fees and liquidation thresholds.

#### Example:

```typescript
const daoValues = await sdk.api.getDaoValues()
```

Example output:

```bash
{
  networkFee: '1000000000',
  networkFeeIndex: '123456789',
  networkFeeIndexBlockNumber: '19482001',
  networkFeeSSV: '30000000000000000000',
  networkFeeIndexSSV: '123456790',
  networkFeeIndexBlockNumberSSV: '19482001',
  liquidationThreshold: '86400',
  liquidationThresholdSSV: '86400',
  minimumLiquidationCollateral: '0',
  minimumLiquidationCollateralSSV: '0'
}
```

### `getQueries()`

Returns bound query helpers for the current API client.

#### Example:

```typescript
const queries = sdk.api.getQueries()
```

Example output:

```bash
{
  getOwnerNonce,
  getClusterSnapshot,
  getCluster,
  getClusters,
  getOperator,
  getOperators,
  getValidator,
  getValidators,
  getClusterBalance,
  getDaoValues
}
```
