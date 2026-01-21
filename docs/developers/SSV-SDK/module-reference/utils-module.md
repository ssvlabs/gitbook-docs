# Utils Module

This is a library which contains all the helper functions you need for working with SSV, such as creating validator keys.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.utils.generateKeyShares()
```

## Function List

### `generateKeyShares()`

Accepts all parameters necessary to compute the keyshares, does this in the background using ssv-keys library, returns the keyshares as an object or saves it to file.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operator_keys | string[] | Array of operator public keys to register the validator to | ["LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi...", "LS0tLS1CRUdJTi..."] |
| operator_ids | integer[]  | Array of operator IDs to register the validator to. | [12, 34, 56, 78] |
| keystore | string | Validator keystore file created when generating the validator. Passed as object programmatically or file path. | ‘./path-to-keystore.json' |
| keystore_password | string | Password for the attached keystore file. | '1234' |
| owner_address | string | Address of the validator Owner. | '0x81592c3de184a3e2c0dcb5a261bc107bfa91f494' |
| nonce | bigint | Nonce of the owner address | 24 |

#### Example:

```typescript
const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
let nonce = Number(await sdk.api.getOwnerNonce({ owner: ownerAddress}))

const keysharesPayload = await sdk.utils.generateKeyShares({
  keystore: keystoresObject, 
  keystore_password: 'your_password' ,
  operator_keys: ['LS0...','LS1...','LS2...','LS3...',],
  operator_ids: ['1', '2', '3', '4'],
  owner_address: ownerAddress as string,
  nonce: nonce,
})
```

Example output:

```typescript
{
  publicKey: '0x85de8923674d90f4fa8add44b2dcb0d0332f83b363249ac49a0d09764909dfbf3701bdcd3c5a5ed7791479cbe12884c1',
  operatorIds: [ 5, 8, 9, 10 ],
  sharesData: '0x8ad906de9eb4dd857c9d3fc9fda8e40aac033d672d5a689417668a3866c63312476628d76c2487797814f26044d71650149f28055e0de616388e283cba1a5b1ac1f46f7328d78fb5c7d1ce1d8752021ff5c18f8680898469702c4fc236dd8ea388278ee2cbe049b4f0170a5bf044721a66e43272cec0c09bcba2d0b8f166ebcc2510edda86f947da1e81e5af8b385ec18aa4b30a74052b8bda41ed71ad012251a5aaa3f5a732ce8119891fe5ffa3e0b519a26ec238d56d43a014475460333e528463c08ec8eaa3b144b2322fb4eb9a6bbb5fe28f17da02b35b07903d4d3a011755c43019003fc276ba22283ea4221899b98412e17a112fda41e4b39d107d54ec060244dc076ea65bdf0205738e9f5cd6fada754dbcd96a59e0bad9bbccde605277e24fffa8b8f53d3cf2f4931a1ab4ab7bed3c52c656cc3f6065d49c9480f007647a3674415a2b25fa7adcb62714b11a5a4ee9f96ee34c8e99d2f465d74d62a74976572169a1225278594e4dfa84c39ff23ebf495e6004ab2c6cb30bf570883421717354904589cfd0222b146e1f1f541246b05a9cb7c3941ada19bd23af9f22613418e694ebe0aa2f072facf177c1e6ddc32413ecb1f80313fd9fcd67d5cbe65e1cb80443b9762619bc90de59dc5b875ab0c59ff70d084d03f2983920d6e4980c271f579ce30a20304e1414f3bc5e1c0b9a6b81f581c76cb232f89340cce0a9254e89b9d48eee1a3c1a6c24c67245bd62b1355bc1ad4abfd9c628505731af0e7340f3ae20b9be61ddf17a4a46feea80bc2b770197f5953dba267fe980c2493aad7f071b87881ab29d962a7f9a2c8ef015066db3c95f99f78eaa1bc63aa318231129ac902539bac3bd95fa5a2f58bc3caa524704043d0494d3a18b69f127f1802863aa35cdb5b8ff8e0365798451d9901997e2e083d1830718baaaa605217f2810129dd92ced98df4317dea4604fd35968292a81846802d28eec75278655feb8a8712a243712d8899a4a69eafaa4bcd9598c8c1c1230cb4e8d5d4549dc1ddcb696bb2e7ba7fb699829d98e4ac3ae3123473162899746e75c85e6c65d39727f27dfb56ca966dc27a17b95eb2901b9c1c8cea3b1403d0266d1566c56ba881f5ee9255ab22b79a5bf319b87896ce133c2b8ff52642f2b61ea0c1f94e8c4e019537eb60f1a4555c91c226a6d1d55592e59c94a23a72b44b343160ff0f14f53f56f88df933613c44fab4945eab0f1450d7df427af0b968cb1010ed05037f8cf3660a5e1df2cd5280b0c3ce88f858174008f1ea4ca1c71cb235791d0e26b8007bdaee94049f84d0c09dafda5cbbdc66cfb716d069afca8ac1329ed0b87df87118213d9a185ee1a3e0627f755d4772f723f413db90dafd56b9122aa627ead2d4914a26d8dfdae3a9e232a11f303c461736d551f229f324d3fb3febb9bbbc7de4cc19f902a462bdc94466b52314587f2fdf23b7ef2763ab33cd4d71c67dff9f65304c70eb076a33496ccc6e03f7ddd9a121739e001cbcfc79f1b9c0b659156b79297a093e676c06e2b6db1c18ccaa6f0f791b53d4c9b78e2a165ccf1054dffe737dfa5dfeede1886e6ff1f19401a4cc62e92007638b5c80c148acb4042c8f8c322ae1cc611ba1759f0e663a36ffabfe3ebea580a52cb58cc37d18af0ad02e7013c5c01c1f13cb94520930b4e890139b51a0e3d0e5cbcf17b9351d95afe49b8aacfa5aa2888a68fdf7579eb5b97c1b4593a5898322a01b60ada759e9b3c46c3890ebf2040d5e8a9f1d065f62edcb6c5fc1516e9ed6828ffe58d289bfc88888c18f8cc7f68a62b1fbd36c1de881c4cd783cb1450a1d7d23d985bf56a42b8477089a4bfc148'
}
```

### `validateKeysharesJSON()`

Checks a JSON file of keyshares and returns whether it is valid or not.&#x20;

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| account | string | Owner address of the validators in keyshares | 0x012f55B6Cc5D57F943F1E79cF00214B652513f88 |
| operators | 'id[]' OR 'publicKey[]' | Array of operator ids or public keys | ['1','2','3','4'] |
| keyshares | string OR object | Generated keyshares | Keyshares json file |


#### Example:

```typescript
const validatedShares = await sdk.utils.validateKeysharesJSON({
        account: '0x012f55B6Cc5D57F943F1E79cF00214B652513f88',
        operators: ['1','2','3','4'],
        keyshares: keysharesJsonFile,
      });
```

Example output:

```typescript
{
  available: [
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    },
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    },
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    },
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    }
  ],
  registered: [],
  incorrect: []
}
```

### `validateSharesPreRegistration()`

Checks keyshares json file and returns whether it is valid or not.&#x20;

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| operatorIds | string[] | Array of operator ids | ['1','2','3','4'] |
| keyshares | string OR object | Generated keyshares | Keyshares json file |


#### Example:

```typescript
const validatedShares = await sdk.utils.validateSharesPreRegistration({
    operatorIds: ['1','2','3','4'],
    keyshares: keysharesJsonFile,
 });
```

Example output:

```typescript
{
  available: [
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    },
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    },
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    },
    KeySharesItem {
      error: undefined,
      data: [KeySharesData],
      payload: [KeySharesPayload]
    }
  ],
  registered: [],
  incorrect: []
}
```

### `getOperatorCapacity()`

Checks how many validators an operator has registered, compares it with the maximum amount of validators that can be registered, and returns the amount that can be registered.&#x20;

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| id | string | Operator ID | "1” |

#### Example:

```typescript
const result = await sdk.utils.getOperatorCapacity('1')
```

Example output:

```typescript
5 // number of validators that the operator can register
```

### `getClusterBalance()`

Accepts a cluster ID to identify the cluster, for which the balance needs to be fetched. Returns the[ balance of a cluster](/stakers/clusters/cluster-balance).&#x20;

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| cluster_Id | string | A cluster_id in its computed ID form. | “0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8” |

#### Example:

```typescript
const result = await sdk.utils.getClusterBalance(“0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8”)
```

Example output:

```typescript
{
    balance: 1728318231823, // ETH in gwei
    operationalRunway: 123, // days left in cluster runway
 }
```

### `calcDepositFromRunway()`

Accepts a string, and a number. Calculates the ETH needed to be deposited, in order to achieve the specified cluster runway. Returns a success message or relevant error. 

The function fetches the cluster snapshot using the provided ID, calculate the Burn Rate of the cluster, and reverse [the Operational Runway formula](https://docs.ssv.network/stakers/clusters/cluster-balance/#operational-runway) , to explicit the needed Cluster Balance to obtain the specified Runway.

| Input parameter | Input type | Description | Example input |
|----------------|------------|-------------|---------------|
| cluster_Id | string | A cluster_id in its computed ID form. | “0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8” |
| runway | number | Desired Runway length, measured in number of days.  | 45 |


#### Example:

```typescript
const result = await sdk.utils.calcDepositFromRunway({
        cluster_Id: “0xf69A08B652f0CEBb685c2fFE043cfB767b66544A-5-6-7-8”,
        runway: 45,
      });
```

Example output:

```typescript
{
  1728318231823, // ETH in gwei
}
```

