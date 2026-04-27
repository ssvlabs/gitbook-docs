# Utils Module

This is a library which contains all the helper functions you need for working with SSV, such as creating validator keys.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.utils.generateKeyShares()
```

## Function List

### `generateKeyShares()`

Accepts the parameters required to compute keyshares with the `ssv-keys` library and returns generated keyshare payloads.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorKeys | string[] | Array of operator public keys to register the validator to | ["LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi..."] |
| operatorIds | number[] | Array of operator IDs to register the validator to | [12, 34, 56, 78] |
| keystore | string \| string[] | Validator keystore content or keystore file path(s) | "./path-to-keystore.json" |
| keystorePassword | string | Password for the attached keystore | "1234" |
| ownerAddress | string | Address of the validator owner | "0x81592c3de184a3e2c0dcb5a261bc107bfa91f494" |
| nonce | number | Nonce of the owner address | 24 |

#### Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
let nonce = Number(await sdk.api.getOwnerNonce({ owner: ownerAddress }))

const keysharesPayload = await sdk.utils.generateKeyShares({
  keystore: keystoresObject,
  keystorePassword: 'your_password',
  operatorKeys: ['LS0...', 'LS1...', 'LS2...', 'LS3...'],
  operatorIds: [1, 2, 3, 4],
  ownerAddress,
  nonce,
})
```

Example output:

```typescript
[
  {
    publicKey: '0x85de8923674d90f4fa8add44b2dcb0d0332f83b363249ac49a0d09764909dfbf3701bdcd3c5a5ed7791479cbe12884c1',
    operatorIds: [5, 8, 9, 10],
    sharesData: '0x8ad906de9eb4dd857c9d3fc9fda8e40a...'
  }
]
```

### `validateKeysharesJSON()`

Validates a keyshares JSON payload against an account and operator definitions.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| account | Address | Owner address of the validators in the keyshares payload | 0x012f55B6Cc5D57F943F1E79cF00214B652513f88 |
| operators | object[] | Array of operator objects with `id` and `publicKey` fields | Operator object list |
| keyshares | string \| object | Generated keyshares payload | Keyshares json file |

#### Example:

```typescript
const validatedShares = await sdk.utils.validateKeysharesJSON({
  account: '0x012f55B6Cc5D57F943F1E79cF00214B652513f88',
  operators: [
    { id: '1', publicKey: 'LS0...' },
    { id: '2', publicKey: 'LS0...' },
    { id: '3', publicKey: 'LS0...' },
    { id: '4', publicKey: 'LS0...' },
  ],
  keyshares: keysharesJsonFile,
})
```

Example output:

```typescript
[KeySharesItem, KeySharesItem]
```

### `validateSharesPreRegistration()`

Checks keyshares before registration and returns the available, registered, and incorrect entries.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorIds | string[] | Array of operator IDs | ['1','2','3','4'] |
| keyshares | string \| object \| IKeySharesPartialPayload[] | Generated keyshares payload | Keyshares json file |
| ownerAddress | Address | Optional owner address used during validation | 0x012f55B6Cc5D57F943F1E79cF00214B652513f88 |

#### Example:

```typescript
const validatedShares = await sdk.utils.validateSharesPreRegistration({
  operatorIds: ['1', '2', '3', '4'],
  keyshares: keysharesJsonFile,
  ownerAddress: '0x012f55B6Cc5D57F943F1E79cF00214B652513f88',
})
```

Example output:

```typescript
{
  available: [KeySharesItem],
  registered: [],
  incorrect: []
}
```

### `validateEvent()`

Validates a validator-registration event by transaction hash and returns the extracted share public keys and encrypted keys when validation succeeds.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| hash | Hash | Transaction hash of the validator registration event | "0xd9095893dba18b101c01973069922db2d81c45e814003851ccc586d60ae28e5b" |

#### Example:

```typescript
const result = await sdk.utils.validateEvent(
  '0xd9095893dba18b101c01973069922db2d81c45e814003851ccc586d60ae28e5b'
)
```

Example output:

```typescript
{
  sharesPublicKeys: ['0xabc...', '0xdef...'],
  encryptedKeys: ['0x123...', '0x456...']
}
```

### `getOperatorCapacity()`

Checks how many validators an operator has registered, compares it with the maximum number of validators that can be registered, and returns the amount that can still be registered.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorId | string | Operator ID | "1" |

#### Example:

```typescript
const result = await sdk.utils.getOperatorCapacity('1')
```

Example output:

```typescript
5 // number of validators that the operator can register
```

### `getClusterBalance()`

Returns the [balance of a cluster](/learn/network-overview/clusters/cluster-balance) and its operational runway for a given operator set and optional owner address.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorIds | number[] | List of operator IDs used by the cluster | [242, 686, 707, 736] |
| ownerAddress | Address | Optional owner address of the cluster | "0xA4831B989972605A62141a667578d742927Cbef9" |

#### Example:

```typescript
const result = await sdk.utils.getClusterBalance({
  operatorIds: [242, 686, 707, 736],
  ownerAddress: '0xA4831B989972605A62141a667578d742927Cbef9',
})
```

Example output:

```typescript
{
    balance: 1728318231823, // ETH in gwei
    operationalRunway: 123, // days left in cluster runway
 }
```

### `calcDepositFromRunway()`

Calculates the ETH needed to be deposited to achieve the specified cluster runway.

The function fetches the cluster snapshot using the provided cluster ID, calculates the burn rate of the cluster, and reverses [the operational runway formula](https://docs.ssv.network/stakers/clusters/cluster-balance/#operational-runway) to derive the required cluster balance.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| cluster_Id | string | A cluster_id in its computed ID form. Has to have the **owner address in lowercase letters**. It is advised to use the [`createClusterID`](/developers/SSV-SDK/module-reference/api-module#createclusteridowner_address-operator_ids)  function to get the cluster ID in the correct format | “0xf69a08b652f0cebb685c2ffe043cfb767b66544a-5-6-7-8” |
| runway | number | Desired Runway length, measured in number of days.  | 45 |


#### Example:

```typescript
const result = await sdk.utils.calcDepositFromRunway({
        cluster_Id: “0xf69a08b652f0cebb685c2ffe043cfb767b66544a-5-6-7-8”,
        runway: 45,
      });
```

Example output:

```typescript
1728318231823, // ETH in gwei
```


### `commitRoot()`

Commits a merkle root and block number for DAO distribution data.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| merkleRoot | Hex | Merkle root to commit | "0x1234abcd..." |
| blockNum | bigint | Block number associated with the merkle root | 19482001n |

#### Example:

```typescript
const receipt = await sdk.dao.commitRoot({
  args: {
    merkleRoot: '0x1234abcd...' as Hex,
    blockNum: 19482001n,
  },
}).then((tx) => tx.wait())
```

### `updateNetworkFeeSSV()`

Updates the SSV-denominated network fee.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| fee | bigint | New SSV-denominated network fee | 30000000000000000000n |

#### Example:

```typescript
const receipt = await sdk.dao.updateNetworkFeeSSV({
  args: {
    fee: 30000000000000000000n,
  },
}).then((tx) => tx.wait())
```

### `withdrawNetworkSSVEarnings()`

Withdraws SSV network earnings from the DAO contract.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| amount | bigint | Amount of SSV earnings to withdraw | 1000000000000000000n |

#### Example:

```typescript
const receipt = await sdk.dao.withdrawNetworkSSVEarnings({
  args: {
    amount: 1000000000000000000n,
  },
}).then((tx) => tx.wait())
```