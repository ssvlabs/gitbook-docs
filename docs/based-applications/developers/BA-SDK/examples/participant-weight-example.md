---
sidebar_label: 'Participant Weight Example'
sidebar_position: 3
---

# Participant Weight Example

Based Application managers need to track the weight of each participant (strategy) in the bApp itself. This process entails two separate steps:

1. Collecting risk-adjusted strategy weights for each token
2. Combining such weights into a strategy weight, for each strategy

To see the process of how this is used in practice, please refer to the [example on the Get Started](../../get-started) page.

### Risk-adjusted strategy-token weights

The first step is made fairly easier thanks to the `based-apps-sdk`, which needs to be installed first:

```sh
npm i @ssv-labs/bapps-sdk
```

The SDK provides a function that returns all the risk-adjusted weights for each token, for all the strategies that opted in to a given bApp:

```ts
import { BasedAppsSDK, chains } from "@ssv-labs/bapps-sdk";

const sdk = new BasedAppsSDK({
    chain: 'holesky',
    beaconchainUrl: 'https://example.com/beacon',
});

// calculate strategy-token weights via the SDK
const strategyTokenWeights = await sdk.api.calculateParticipantWeights({
   bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
});

console.info(
   `Strategy-token weights: ${JSON.stringify(
   strategyTokenWeights,
   undefined,
   2
   )}`
);
```

This returns a matrix, mapping the risk-adjusted weight of each token to a given strategy.

```sh
Strategy-token weights: [
  {
    "id": "10",
    "tokenWeights": [
      {
        "token": "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
        "weight": 0.9267840593141798
      }
    ],
    "validatorBalanceWeight": 0.3
  },
  {
    "id": "2",
    "tokenWeights": [
      {
        "token": "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
        "weight": 0.07321594068582021
      }
    ],
    "validatorBalanceWeight": 0.7
  }
]
```

In this example, strategy number `2` has a risk-adjusted weight of `~0.07` for the specified token, but it has a validator balance weight of `0.7`.

Strategy number `10`, has a much bigger risk-adjusted weight of `~0.93` for specified token, but it has a validator balance weight of `0.3`.

For more information on how these risk-adjusted strategy-token weights are calculated, [please visit this page](../learn/based-applications/strategy-weights).

### Final weight

To combine data from the previous step into the final Weight it is necessary to use a **combination function**. Such function has to be defined by the bApp itself and can be tailored to its specific needs. Traditionally, one good combination functions include the arithmetic mean, geometric mean, and harmonic mean.

Let's consider the bApp from step 1, which uses tokens **`0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f`** and **validator balance**. For the purpose of our example, this bApp considers **`0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f`** to be twice times as important as **validator balance**. 

:::info
Note: this is a purely fictional scenario, to show the strong impact of the coefficients attributed to tokens and validator balance, with respect to the final combined weight of a strategy.
:::

Below it's reported a code snippet, showing how to combine weights from step 1 using a simple arithmetic weighted average in the described scenario:

```ts
const tokenCoefficients = [
  {
    token: "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
    coefficient: 5,
  },
  // here you can specify additiona weights for additional tokens
  // {
  //   token: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  //   coefficient: 30,
  // },
];
const validatorCoefficient = 1;

console.info(`Weight coefficient for Validator Balance is ${validatorCoefficient}`);
for (let tokenCoefficient of tokenCoefficients){
  console.info(`Weight coefficient for token ${tokenCoefficient.token} is ${tokenCoefficient.coefficient}`);
}
console.info(`Using arithmetic weighted average to calculate Strategy weights.`);

let simpleAverageStrategyWeights = sdk.utils.calcSimpleStrategyWeights(
  strategyTokenWeights,
  {
    coefficients: tokenCoefficients,
    validatorCoefficient: validatorCoefficient,
  }
);

console.info(
  `Final Strategy weights: ${JSON.stringify(
    Object.fromEntries(simpleAverageStrategyWeights),
    undefined,
    2
  )}`
);
```

This returns a map with the combined risk-adjusted weight of each strategy.

```json
Using arithmetic weighted average to calculate Strategy weights.
Validator Balance is 2 times more important than 0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f
Final Strategy weights: {
  "2": 0.28214396045721346,
  "10": 0.7178560395427865
}
```


The script below uses the logic described in the [related section of the Based Application Development page](../../../developers/#3-participant-weight), fetching the data from the Based Application Subgraph, as well as the beacon chain (validator balance), via the `based-apps-sdk`, and returns the Weight for all Strategies that have opted in to a given Based Application. It then combines them with arbitrary logic, defined as a weighted harmonic mean, where validator balance is twice times more impactful than the ERC20 token.
   
```typescript
import { BasedAppsSDK, chains } from "@ssv-labs/bapps-sdk";

const sdk = new BasedAppsSDK({
    chain: 'holesky',
    beaconchainUrl: 'https://example.com/beacon',
});

async function main(): Promise<void> {
  const tokenCoefficients = [
    {
      token: "0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f",
      coefficient: 5,
    },
    {
      token: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      coefficient: 30,
    },
  ];
  const validatorCoefficient = 1;
  // calculate strategy-token weights via the SDK
  const strategyTokenWeights = await sdk.api.calculateParticipantWeights({
    bAppId: "0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5c",
  });

  console.info(`Weight coefficient for Validator Balance is ${validatorCoefficient}`);
  for (let tokenCoefficient of tokenCoefficients){
    console.info(`Weight coefficient for token ${tokenCoefficient.token} is ${tokenCoefficient.coefficient}`);
  }
  /**
   ****** Combine with Arithmetic Weighted average ******
   **/
  console.info(`Using arithmetic weighted average to calculate Strategy weights.`);

  let simpleAverageStrategyWeights = sdk.utils.calcSimpleStrategyWeights(
    strategyTokenWeights,
    {
      coefficients: tokenCoefficients,
      validatorCoefficient: validatorCoefficient,
    }
  );

  console.info(
    `Final Strategy weights: ${JSON.stringify(
      Object.fromEntries(simpleAverageStrategyWeights),
      undefined,
      2
    )}`
  );
  
  /**
  ****** Combine with harmonic weighted average ******
 **/
 console.info(`Using harmonic weighted average to calculate Strategy weights`)
 
 let harmonicAverageStrategyWeights = sdk.utils.calcHarmonicStrategyWeights(
  strategyTokenWeights,
  {
    coefficients: tokenCoefficients,
    validatorCoefficient: validatorCoefficient,
  })

 console.info(
   `Final Strategy weights: ${JSON.stringify(
     Object.fromEntries(harmonicAverageStrategyWeights),
     undefined,
     2
   )}`
 );

 /**
  ****** Combine with geometric average ******
 **/
 console.info(`Using weighted geometric average to calculate Strategy weights.`);

 let geometricAverageStrategyWeights = sdk.utils.calcGeometricStrategyWeights(
  strategyTokenWeights,
  {
    coefficients: tokenCoefficients,
    validatorCoefficient: validatorCoefficient,
  })

 console.info(
   `Final Strategy weights: ${JSON.stringify(
     Object.fromEntries(geometricAverageStrategyWeights),
     undefined,
     2
   )}`
 );
}

main();
```

It is pretty easy to spot the influence of the different functions on the combined risk-adjusted weight of each strategy in the results:

```sh
Weight coefficient for Validator Balance is 1
Weight coefficient for token 0x68a8ddd7a59a900e0657e9f8bbe02b70c947f25f is 5
Weight coefficient for token 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee is 30
Using arithmetic weighted average to calculate Strategy weights.
Final Strategy weights: {
  "19": 0.26242098843234996,
  "20": 0.7375790115676499,
}
Using harmonic weighted average to calculate Strategy weights
Final Strategy weights: {
  "19": 0.21998319135857475,
  "20": 0.7800168086414253,
}
Using weighted geometric average to calculate Strategy weights.
Final Strategy weights: {
  "19": 0.2129838902493037,
  "20": 0.7296961242889372,
}
```