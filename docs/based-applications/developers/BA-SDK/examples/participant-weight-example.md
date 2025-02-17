---
sidebar_label: 'Participant Weight Example'
sidebar_position: 3
---

# Participant Weight Script

The script below uses the logic described in the [related section of the Based Application Development page](../../../developers/#3-participant-weight), fetching the data from the Based Application Subgraph, as well as the beacon chain (validator balance), via the `based-apps-sdk`, and returns the Weight for all Strategies that have opted in to a given Based Application. It then combines them with arbitrary logic, defined as a weighted harmonic mean, where validator balance is twice times more impactful than the ERC20 token.
   
```typescript
import { BasedAppsSDK, chains } from "@ssv-labs/bapps-sdk";

const sdk = new BasedAppsSDK({
  chain: chains.holesky.id
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