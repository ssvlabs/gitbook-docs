---
sidebar_label: 'Developers'
sidebar_position: 6
--- 
 

# Based Application Development

This guide outlines the steps for based applications developers looking to build on the Based Applications platform. Below is a diagram that summarizes the Based Applications development flow.

![Based Application Development Flow](/img/based-apps-developer-flow.png)

<!-- ## 0. Developing a Based Application Middleware smart contract

The `BAppManager` smart contract developed by SSV Labs accepts registrations of BApps that implement a specific interface. This is outlined [in this dedicated page](./smart-contracts/based-app-middleware-example.md), that also provides a simple example. -->


## 1. Configuring and Registering the bApp

1. **Define core attributes**:
- `bApp`: a unique 20-byte EVM address that uniquely identifies the bApp.
- `tokens`:  A list of ERC-20 tokens to be used in the bApp's security mechanism. For the native ETH token, use the special address [`0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L62).
- `sharedRiskLevels`: a list with $\beta$ values, one for each token, representing the bApp's tolerance for risk (token over-usage).
2. **Optional Non-Slashable Validator Balance**: If the bApp uses non-slashable validator balance, it should be configured off-chain, in the bApp's network.
3. **Register the bApp**: Use the [`registerBApp`](./smart-contracts/BasedAppManager#registerbappbapp-tokens-sharedrisklevels-metadatauri) function of the smart contract:
```javascript
function registerBApp(
   address bApp,
   address[] calldata tokens,
   uint32[] calldata sharedRiskLevels,
   string calldata metadataURI
)
```
- `metadataURI`: A JSON object containing additional details about your bApp, such as its name, description, logo, and website.
4. **Update Configuration**: After registering, the bApp configuration can be updated only by the `owner` account.

## 2. Securing the bApp

Once the bApp is registered, `Strategies` can join it and allocate capital to secure it.

### 2.1 Opting in

A Strategy opts-in to the bApp by using the [`optInToBApp`](./smart-contracts/BasedAppManager#optintobappstrategyid-bapp-tokens-obligationpercentages-data) function of the smart contract:
```javascript
function optInToBApp(
   uint256 strategyId,
   address bApp,
   address[] calldata tokens,
   uint32[] calldata obligationPercentages,
   bytes calldata data
)
```
- `tokens`: List of tokens to obligate to the bApp.
- `obligationPercentages`: The proportion of each token's balance to commit to the bApp.
- `data`: An extra optional field for off-chain information required by the bApp for participation.

For example, if `tokens = [SSV]` and `obligationPercentages = [50%]`, then 50% of the strategy's `SSV` balance will be obligated to the bApp.

The strategy’s owner can later update their obligations by modifying existing ones or adding a new token obligation.

### 2.2 Strategy's Funds

To compose their balances, strategies:
1. receive ERC20 (or ETH) via [**deposits**](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L376) from accounts.
2. inherit the non-slashable validator balance from the strategy's owner account. Accounts [**delegate**](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L201) validator balances between themselves, and the strategy inherits its owner's non-delegated balance plus the received balances from other accounts.

## 3. Participant Weight

Based Application managers need to track the weight of each participant (strategy) in the bApp itself. This process entails two separate steps:

1. Collecting risk-adjusted strategy weights for each token
2. Combining such weights into a strategy weight, for each strategy

### Risk-adjusted strategy-token weights

The first step is made fairly easier thanks to the `based-apps-sdk`, which needs to be installed first:

```sh
npm i @ssv-labs/bapps-sdk
```

The SDK provides a function that returns all the risk-adjusted weights for each token, for all the strategies that opted in to a given bApp:

```ts
import { BasedAppsSDK, chains } from "@ssv-labs/bapps-sdk";

const sdk = new BasedAppsSDK({
  chain: chains.holesky.id,
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

For more information on how these risk-adjusted strategy-token weights are calculated, [please visit this page](../learn/based-applications/strategy-weights.md).

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

### Complete example

[The following page](./participant-weight-example.md), shows the full coded example of how to obtain risk-adjusted strategy-token weights, and how to combine them. The example uses a weighted simple average (as shown here), as well as a slightly more involved **combination functions** like weighted geometric average and weighted harmonic average ([explained here](../learn/based-applications/strategy-weights.md)), and shows the different outcome of the three.
