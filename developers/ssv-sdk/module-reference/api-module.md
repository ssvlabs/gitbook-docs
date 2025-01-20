# API Module

This is a read only library which contains all the functions you need to obtain any data relating to the SSV network.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.api.getOwnerNonce()
```

## Function List

### `getOwnerNonce(string account_address)`

Accepts a list of addresses, fetches their nonces using subgraph, returns as a list.

Input parameters:

<table data-header-hidden><thead><tr><th></th><th width="139"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>account_address</td><td>string</td><td>An array of owner addresses.</td><td>[“0xA4831B989972605A62141a667578d742927Cbef9”]</td></tr></tbody></table>

Examples input:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
let nonce = Number(await sdk.api.getOwnerNonce({ owner: ownerAddress}))
```

Example output:

```bash
12
```

### `getClusterSnapshot(string cluster_id )`

Accepts a list of addresses, fetches cluster snapshots using subgraph, returns as a list.

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>cluster_id</td><td>string</td><td>An array of cluster IDs in their computed ID form.</td><td>[“4c0239091131c3e57e9555c540bcfd00bcd2484a9c4048f13411f22329511131”]</td></tr></tbody></table>

Example:

```typescript
const clusterSnapshot = await sdk.api.getClusterSnapshot({id: clusterID})
```

Example output:

```bash
{
  "active": true,
  "balance": "19479447888000000000",
  "index": "46367642388",
  "networkFeeIndex": "59597136600",
  "validatorCount": "1"
 }
```

### `getClusterId(owner_address, operator_ids[])`

Accepts the owner address and a list of operator IDs, computes and returns the cluster ID hash.

Input:

| Input parameter   | Input type | Description                   | Example input                                |
| ----------------- | ---------- | ----------------------------- | -------------------------------------------- |
|  owner\_address   | string     | Address of the cluster Owner. | '0x81592c3de184a3e2c0dcb5a261bc107bfa91f494' |
|  operator\_ids\[] | integer    | List of operator IDs.         | \[12, 34, 56, 78]                            |

Example:

```typescript
import { createClusterId } from '@ssv-labs/ssv-sdk/utils'
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
const operatorIds = [242, 686, 707, 736]
const clusterID = createClusterId(ownerAddress, operatorIds)
```

Example output:&#x20;

```bash
1179fed483c8c1b0327c8667521162015fa8cbe1a1b047a26baf0f0971a81929
```

### `getClusterBalance(clusterId, daoAddress, operatorIds)`

Accepts a cluster id in it's hashed form. Returns details about the cluster.

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>cluster_id</td><td>string</td><td>A cluster ID in it's computed form</td><td>“4c0239091131c3e57e9555c540bcfd00bcd2484a9c4048f13411f22329511131”</td></tr><tr><td>daoAddress</td><td>string</td><td>Address of the DAO (chain specific)</td><td>"0x38A4794cCEd47d3baf7370CcC43B560D3a1beEFA"</td></tr><tr><td>operatorIds</td><td>string[]</td><td>A list of operator Ids</td><td>[1,2,3,4]</td></tr></tbody></table>

Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
const operatorIds = [242, 686, 707, 736]
const operatorIdsString = ['242', '686', '707', '736']
const clusterID = createClusterId(ownerAddress, operatorIds)
const clusterBalance = await sdk.api.getClusterBalance({clusterId: clusterID, daoAddress: "0x38A4794cCEd47d3baf7370CcC43B560D3a1beEFA", operatorIds: operatorIdsString}) 
```

Example output:

```bash
 cluster: {
    validatorCount: '140',
    networkFeeIndex: '110259590936',
    index: '136319254858',
    balance: '126290824043600000000'
  },
```

### `getCluster(id)`

Accepts a cluster id in it's hashed form. Returns details about the cluster.

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>cluster_id</td><td>string</td><td>An array of cluster IDs in their computed ID form.</td><td>[“4c0239091131c3e57e9555c540bcfd00bcd2484a9c4048f13411f22329511131”]</td></tr></tbody></table>

Example:

```typescript
const clusterData = await sdk.api.getCluster({id: clusterID})
```

Example output:

```bash
{
  active: true,
  validatorCount: '140',
  balance: '126290824043600000000',
  index: '136319254858',
  networkFeeIndex: '110259590936',
  operatorIds: [ '242', '686', '707', '736' ]
}
```

### `getClusters(owner)`

Accepts an owner address. Returns details about all of the clusters that they own.&#x20;

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>owner</td><td>string</td><td>An owner address</td><td>"0xA4831B989972605A62141a667578d742927Cbef9"</td></tr></tbody></table>

Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
const clusterData = await sdk.api.getClusters({owner: ownerAddress})
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
    operatorIds: [ '11', '21', '24', '29' ]
  },
  {
    id: '0xa4831b989972605a62141a667578d742927cbef9-11-66-306-400',
    active: false,
    validatorCount: '0',
    balance: '0',
    index: '0',
    networkFeeIndex: '0',
    operatorIds: [ '11', '66', '306', '400' ]
  },
]
```

### `getOperator(id)`

Accepts an operator ID and returns details about the operator.

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>A single operator ID</td><td>"4"</td></tr></tbody></table>

Example:

```typescript
const operatorData = await sdk.api.getOperator({id: "4"})
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

### `getOperators(`operatorIds\[]`)`

Accepts a list of operator IDs and returns details about them.

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorIds</td><td>string[]</td><td>A single operator ID</td><td>["4","5"]</td></tr></tbody></table>

Example:

```typescript
const operatorData = await sdk.api.getOperators({operatorIds: ["4","5"]})
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

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>id</td><td>string</td><td>A single validator ID</td><td>0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9</td></tr></tbody></table>

Example:

```typescript
const validatorData = await sdk.api.getValidators({id: "0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9"})
```

Example output:

```bash
{
  id: '0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9'
}
```

### `getValidators(ids[])`

Accepts an validator ID and returns details about the validator.

Input:

<table data-header-hidden><thead><tr><th></th><th width="116"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>ids</td><td>string[]</td><td>An array of validator IDs</td><td>["0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9", "0x1a85052f3b9d17e73ec76c472220c80ada65a19a0fd177344b1e9f6173d51136c400120989dbd9ff498defc99dfe5181"]</td></tr></tbody></table>

Example:

```typescript
const validatorData = await sdk.api.getValidators({id: ["0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9", "0x1a85052f3b9d17e73ec76c472220c80ada65a19a0fd177344b1e9f6173d51136c400120989dbd9ff498defc99dfe5181"]})
```

Example output:

```bash
{
  id: '0x0c74493afd8082f86485e4172be72678b0feb1494087ee6abe7d7ea7437c2a3fc6c06193040c6e24cdf59c9081d1c7a9'
}
```
