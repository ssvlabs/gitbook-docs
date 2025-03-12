# Utils Module


This is a library which contains all the helper functions you need for working with Based Applications, such as getting strategy weights.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.utils.calcArithmeticStrategyWeights()
```

## Function List

### `calcArithmeticStrategyWeights()`

Given a set of weights for the strategies for a bapp, returns the arithmetic mean of these. 

Input:

| Input parameter            | Input type                        | Description                                         | Example input |
| -------------------------- | -------------------------------- | --------------------------------------------------- | ------------- |
| `strategyTokenWeights`     | `StrategyWeight[]`               | Output of `getStrategyTokenWeights()`              | See [here](./api-module.md#getstrategytokenweightsstring-bappaddress) |
| `weightCalculationOptions` | `object`                         | Options for weight calculation                     | See breakdown below |
| ├─ `coefficients`          | `{ token: string, coefficient: number }[]` | Array of token addresses and their coefficients    | `[ { token: "0x68a8...", coefficient: 5 } ]` |
| ├─ `validatorCoefficient`  | `number`                         | Coefficient for validator balance                  | `1` |

Example:

```typescript
const tokenCoefficient: Array<{ token: `0x${string}`; coefficient: number }> = [
    {
    token: "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f" as `0x${string}`,
    coefficient: 5,
    },
] as const;
const validatorCoefficient = 1;

const strategyTokenWeights = await sdk.api.getParticipantWeights({
    bAppId: "0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5c",
});

const weightCalculationOptions =       {
    coefficients: tokenCoefficient,
    validatorCoefficient: validatorCoefficient,
}

const simpleAverageStrategyWeights = sdk.utils.calcArithmeticStrategyWeights(strategyTokenWeights, weightCalculationOptions);
```

Example output:

```bash
{
  "19": 0.2129838902493037,
  "20": 0.7296961242889372,
  "36": 1
}
```

### `calcGeometricStrategyWeights()`

Given a set of weights for the strategies for a bapp, returns the geometric mean of these. 

Input:

| Input parameter            | Input type                        | Description                                         | Example input |
| -------------------------- | -------------------------------- | --------------------------------------------------- | ------------- |
| `strategyTokenWeights`     | `StrategyWeight[]`               | Output of `getStrategyTokenWeights()`              | See [here](./api-module.md#getstrategytokenweightsstring-bappaddress) |
| `weightCalculationOptions` | `object`                         | Options for weight calculation                     | See breakdown below |
| ├─ `coefficients`          | `{ token: string, coefficient: number }[]` | Array of token addresses and their coefficients    | `[ { token: "0x68a8...", coefficient: 5 } ]` |
| ├─ `validatorCoefficient`  | `number`                         | Coefficient for validator balance                  | `1` |

Example:

```typescript
const tokenCoefficient: Array<{ token: `0x${string}`; coefficient: number }> = [
    {
    token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034" as `0x${string}`,
    coefficient: 5,
    },
] as const;
const validatorCoefficient = 1;

const strategyTokenWeights = await sdk.api.getParticipantWeights({
    bAppId: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
});

console.log(strategyTokenWeights);

const weightCalculationOptions =    {
    coefficients: tokenCoefficient,
    validatorCoefficient: validatorCoefficient,
}

const geometricStrategyWeights = sdk.utils.calcGeometricStrategyWeights(strategyTokenWeights, weightCalculationOptions);

console.info(JSON.stringify(geometricStrategyWeights));
```

Example output:

```bash
{
  "19": 0.2129838902493037,
  "20": 0.7296961242889372,
  "36": 1
}
```

### `calcHarmonicStrategyWeights()`

Given a set of weights for the strategies for a bapp, returns the harmonic mean of these. 

Input:

| Input parameter            | Input type                        | Description                                         | Example input |
| -------------------------- | -------------------------------- | --------------------------------------------------- | ------------- |
| `strategyTokenWeights`     | `StrategyWeight[]`               | Output of `getStrategyTokenWeights()`              | See [here](./api-module.md#getstrategytokenweightsstring-bappaddress) |
| `weightCalculationOptions` | `object`                         | Options for weight calculation                     | See breakdown below |
| ├─ `coefficients`          | `{ token: string, coefficient: number }[]` | Array of token addresses and their coefficients    | `[ { token: "0x68a8...", coefficient: 5 } ]` |
| ├─ `validatorCoefficient`  | `number`                         | Coefficient for validator balance                  | `1` |

Example:

```typescript
const tokenCoefficient = [
    {
    token: "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
    coefficient: 5,
    },
];
const validatorCoefficient = 1;

const strategyTokenWeights = await sdk.api.getParticipantWeights({
    bAppId: "0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5c",
});

const weightCalculationOptions =       {
    coefficients: tokenCoefficient,
    validatorCoefficient: validatorCoefficient,
}

const simpleAverageStrategyWeights = sdk.utils.calcHarmonicStrategyWeights(strategyTokenWeights, weightCalculationOptions);
```

Example output:

```bash
{
  "19": 0.2129838902493037,
  "20": 0.7296961242889372,
  "36": 1
}
```