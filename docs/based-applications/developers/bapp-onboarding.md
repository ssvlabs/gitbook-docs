---
sidebar_label: 'Based Application Onboarding'
sidebar_position: 2
--- 
 

# Based Application Onboarding

This guide outlines the steps for based applications developers looking to build on the Based Applications platform. Below is a diagram that summarizes the Based Applications development flow.

1. Configuring and Registering the bApp
2. 

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

## 2. Operators registering Strategies

Once the bApp is registered, `Strategies` can join it and allocate capital to secure it.

TODO more description on this step

## 3 Opting in

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

## 4 Strategy's Funds

To compose their balances, strategies:
1. receive ERC20 (or ETH) via [**deposits**](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L376) from accounts.
2. inherit the non-slashable validator balance from the strategy's owner account. Accounts [**delegate**](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L201) validator balances between themselves, and the strategy inherits its owner's non-delegated balance plus the received balances from other accounts.

## Participant Weight

Based Application managers need to track the weight of each participant (strategy) in the bApp itself. This process entails two separate steps:

1. Collecting risk-adjusted strategy weights for each token
2. Combining such weights into a strategy weight, for each strategy
