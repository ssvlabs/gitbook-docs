---
sidebar_position: 2
---

# API Module

This is a read only library which contains all the functions you need to obtain any data relating to Based Applications.

After instantiating the SDK, you can call any of the functions in the api library like so:

```typescript
sdk.api.getValidatorsBalance()
```

## Function List

### `getValidatorsBalance()`

Given the address of an account, returns the balance of all the validators that the account owns.

Input:

| Input parameter   | Input type | Description                   | Example input                                |
| ----------------- | ---------- | ----------------------------- | -------------------------------------------- |
|  account  | string     | Address of the account | '0x64714cf5db177398729e37627be0fc08f43b17a6' |

Example:

```typescript
const validatorBalance = await sdk.api.getValidatorsBalance({
    account: '0x77fc6e8b24a623725d935bc88057098d0bca6eb3',
});
```

Example output:

```bash
{
  account: '0x77fc6e8b24a623725d935bc88057098d0bca6eb3',
  validators: [],
  balance: '0'
}
```

---

### `getStrategyTokenWeights()`

Used to calculate the weights of the strategies in a given Bapp.

Input:

| Input parameter   | Input type | Description                   | Example input                                |
| ----------------- | ---------- | ----------------------------- | -------------------------------------------- |
|  bappId  | string     | Address of the Based Application | '0x64714cf5db177398729e37627be0fc08f43b17a6' |

Example:

```typescript
const weights = await sdk.api.getStrategyTokenWeights({
    bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
});
```

Example output:

```bash
[
  {
    "id": "10",
    "tokenWeights": [
      {
        "token": "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
        "weight": 0.9267840593141798
      }
    ],
    "validatorBalanceWeight": 0.0322679969182334
  },
  {
    "id": "2",
    "tokenWeights": [
      {
        "token": "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
        "weight": 0.07321594068582021
      }
    ],
    "validatorBalanceWeight": 0.9677320030817667
  }
]
```

---

### `getDelegatedBalances()`

Given the address of a Based Application, returns the delegated balances of the Bapp.

Input:

| Input parameter   | Input type | Description                   | Example input                                |
| ----------------- | ---------- | ----------------------------- | -------------------------------------------- |
|  bappId  | string     | Address of the Based Application | '0x64714cf5db177398729e37627be0fc08f43b17a6' |

Example:

```typescript
const delegatedBalances = await sdk.api.getDelegatedBalances({
    bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
});
```

Example output:

```bash
{
  bAppTotalDelegatedBalance: 3297628317780000000000n,
  bAppTotalDelegatedBalances: [
    { strategyId: '10', delegation: 3201611238600000000000n },
    { strategyId: '2', delegation: 96017079180000000000n }
  ]
}
```

---

### `getObligatedBalances(string bappAddress)`

Given the address of a Based Application, returns the obligated balances of the Bapp.

Input:

| Input parameter   | Input type | Description                   | Example input                                |
| ----------------- | ---------- | ----------------------------- | -------------------------------------------- |
|  bappId  | string     | Address of the Based Application | '0x64714cf5db177398729e37627be0fc08f43b17a6' |

Example:

```typescript
const obligatedBalances = await sdk.api.getObligatedBalances({
      bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
});
```

Example output:

```bash
{
  bAppTokens: [
    {
      totalObligatedBalance: '971100000000000000009000',
      token: '0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f'
    },
    {
      totalObligatedBalance: '0',
      token: '0x9196830bb4c05504e0a8475a0ad566aceeb6bec9'
    }
  ],
  strategies: [
    {
      id: '100x64714cf5db177398729e37627be0fc08f43b17a6',
      obligations: [Array]
    },
    {
      id: '20x64714cf5db177398729e37627be0fc08f43b17a6',
      obligations: [Array]
    }
  ]
}
```

---

### `getBappMetadataURI()`

Retrieves the metadata URI for a specific bApp.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| bappAddress | string | Address of the bApp |

**Example:**

```typescript
const metadataURI = await sdk.api.getBappMetadataURI({ bAppId: "0x89EF15BC1E7495e3dDdc0013C0d2B049d487b2fD" });
```

**Example output:**
```
{
  metadataURI: 'https://github.com/ssvlabs/examples/tree/main/simple-block-agreement/based-application/metadata.json'
}
```

---

### `getAllBappsMetadataURIs()`

Retrieves metadata URIs for all bApps.

**Input:** No input required.

**Example:**

```typescript
const metadataURIs = await sdk.api.getAllBappsMetadataURIs();
```


**Example output:**
```
[
  {
    id: '0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214',
    metadataURI: 'https://metadata-pi.vercel.app/metadata.json'
  },
  {
    id: '0x89ef15bc1e7495e3dddc0013c0d2b049d487b2fd',
    metadataURI: 'https://github.com/ssvlabs/examples/tree/main/simple-block-agreement/based-application/metadata.json'
  },
  {
    id: '0x8f3a66bb003ebbd5fb115981dfad8d8400fceb76',
    metadataURI: 'https://github.com/ssvlabs/examples/tree/main/simple-block-agreement/based-application/metadata.json'
  }
]
```
---


### `getAllStrategyObligatedBalancesForBapp()`

Retrieves all strategy obligated balances for a bApp.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| bappAddress | string | Address of the bApp |

**Example:**

```typescript
const balances = await sdk.api.getAllStrategyObligatedBalancesForBapp({ bAppId: "0x89EF15BC1E7495e3dDdc0013C0d2B049d487b2fD" });
console.log(JSON.stringify(balances));
```

**Example output:**
```
{"strategies":[{"strategy":{"balances":[{"balance":"100000000000000000000","token":"0xad45a78180961079bfaeee349704f411dff947c6"}]}},{"strategy":{"balances":[{"balance":"30000000000000000000","token":"0xad45a78180961079bfaeee349704f411dff947c6"}]}}]}
```

---

### `getDepositedBalancesForStrategy()`

Retrieves a list of delegators and their percentages for a strategy.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| strategyId | string | ID of the strategy |

**Example:**

```typescript
const deposits = await sdk.api.getDepositedBalancesForStrategy({ strategyId: "1" });
```

**Example output:**

```
{"deposits":[]}
```

---

### `getAllStrategiesDepositedTo()`

Retrieves all strategies an account has deposited to.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| accountAddress | string | Address of the account |

**Example:**

```typescript
const strategies = await sdk.api.getAllStrategiesDepositedTo({ accountId: "0xA4831B989972605A62141a667578d742927Cbef9" });
console.log(JSON.stringify(strategies));
```

---

**Example output:**

```
{"deposits":[]}
```


### `getTotalDelegatedPercentageForAccount()`

Retrieves the total delegated percentage for an account.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| accountAddress | string | Address of the account |

**Example:**

```typescript
const delegatedPercentage = await sdk.api.getTotalDelegatedPercentageForAccount({ accountId: "0xA4831B989972605A62141a667578d742927Cbef9" });
console.log(JSON.stringify(delegatedPercentage));
```

**Example output:**

```
"0"
```


---

### `getAllStrategiesForBapp()`

Retrieves all strategy IDs associated with a bApp.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| bappAddress | string | Address of the bApp |

**Example:**

```typescript
const strategies = await sdk.api.getAllStrategiesForBapp({ bAppId: "0x89EF15BC1E7495e3dDdc0013C0d2B049d487b2fD" });
console.log(JSON.stringify(strategies));
```

**Example output:**
```
["4","5"]
```

---

### `getAllStrategiesForAccount()`

Retrieves all strategies and their balances for an account.

**Input:**

| Input parameter | Input type | Description |
|----------------|------------|-------------|
| accountAddress | string | Address of the account |

**Example:**

```typescript
const strategies = await sdk.api.getAllStrategiesForAccount({ accountId: "0xA4831B989972605A62141a667578d742927Cbef9" });
console.log(JSON.stringify(strategies));
```

**Example output:**

```
["4","5"]
```
