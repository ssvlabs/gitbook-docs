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

### `getStrategyTokenWeights(string bappAddress)`

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

### `getDelegatedBalances(string bappAddress)`

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