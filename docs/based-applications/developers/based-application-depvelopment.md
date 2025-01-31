---
sidebar_label: 'Based App Development'
sidebar_position: 1
---

# Based Application Development

This guide outlines the steps for based applications developers looking to build on the Based Applications platform.

## 0. Developing a Based Application Middleware smart contract

The `BAppManager` smart contract developed by SSV Labs accepts registrations of BApps that implement a specific interface. This is outlined [in this dedicated page](./smart-contracts/based-app-middleware-example.md), that also provides a simple example.

## 1. Configuring and Registering the bApp

1. **Define core attributes**:
- `bApp`: a unique 20-byte EVM address that uniquely identifies the bApp.
- `tokens`:  A list of ERC-20 tokens to be used in the bApp's security mechanism. For the native ETH token, use the special address [`0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L62).
- `sharedRiskLevels`: a list with $\beta$ values, one for each token, representing the bApp's tolerance for risk (token over-usage).
2. **Optional Non-Slashable Validator Balance**: If the bApp uses non-slashable validator balance, it should be configured off-chain, in the bApp's network.
3. **Register the bApp**: Use the [`registerBApp`](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L249) function of the smart contract:
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

A Strategy opts-in to the bApp by using the [`optInToBApp`](https://github.com/ssvlabs/based-applications/blob/main/src/BasedAppManager.sol#L333) function of the smart contract:
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

bApp clients need to track the weight of each participant in the bApp. 

A simple way to do so would be to use the Subgraph and perform a request with this query:

```graphql

query MyQuery {
  bapp(id: "1") {
    # this is a mapping table, representing the many-to-many relationship between bapps and strategies
    strategies {
      obligations {
        token
        percentage
      }
      # this is the actual strategy entity
      strategy {
        balances {
          balance
          token
        }
        id
        owner {
          delegators {
            percentage
            id
          }
        }
      }
    }
    bAppTokens {
      sharedRiskLevel
      token
    }
  }
}
```

This will return:
* **all balances** per token for a given strategy
* **all obligations** per token for a given strategy
* TODO add remaining data

For all the strategies that opted-in to a given bApp

1. Clients will have to use this data to obtain a global mapping of `Token -> Strategy -> Amount`
   
   This is done by multiplying the `percentage` of obligated tokens by the `balance` of such tokens deposited to the strategy

   ```typescript
   // build a map that links each token with the mapping of a strategy and their related obligated balance
   let strategiesObligatedBalancesPerToken: Map<string, Map<number, number>> = new Map();
   
   // build the two separate mappings of obligations per token, balances per token
   // calculate the actual balance obligated for each token
   // and add the entry to the global mapping
   for (let strategy of response.data.data.bapp.strategies) {
      let obligationsPerToken: Map<string, number> = new Map(strategy.obligations.map(
         (obligation) => return [token, percentage]
      ))
      let balancesPerToken: Map<string, number> = new Map(strategy.strategy.balances.map(
         (obligation) => return [token, balance]
      ))

      obligationsPerToken.keys().map(
         (token) => {
            strategiesObligatedBalancesPerToken.set(token) = new Map([strategy.id, obligationsPerToken.get(token) * balancesPerToken.get(token)])
         }
      )
   }
   ```
2. TODO Add Validator balance calculation
3. **Sum Obligations**: From `ObligatedBalance`, it can sum all obligations and compute the total amount obligated to the bApp by all strategies.
   ```go
   TotalBAppBalance mapping(Token -> Amount)
   ```
4. **Calculate Risk**: For each token, it should get the risk (token-over usage) of each strategy.
   ```go
   Risk mapping(Token -> Strategy -> Float)
   ```
5. **Compute Risk-Aware Weights**: With this information, it can compute the weight of a participant for a certain token by

   $$
   W_{\text{strategy, token}} = c_{\text{token}} \times \dfrac{ObligatedBalance[\text{token}][\text{strategy}]}{TotalBAppBalance[\text{token}]} e^{-\beta_{\text{token}} \times max(1, Risk[\text{token}][\text{strategy}])}
   $$

   where $c_{\text{token}}$ is a normalization constant defined as

   $$
   c_{\text{token}} = \left( \sum_{\text{strategy}} \dfrac{ObligatedBalance[\text{token}][\text{strategy}]}{TotalBAppBalance[\text{token}]} e^{-\beta_{\text{token}} \times max(1, Risk[\text{token}][\text{strategy}])} \right)^{-1}
   $$

   :::info
   If the bApp uses validator balance, the client should also read a `map[Strategy]ValidatorBalance` with the amount from each strategy. As this capital doesn't involve any type of risk, all risk values can be set to 0. Thus, for this capital, this is equivalent to
   $$
   W_{\text{strategy, validator balance}} = \dfrac{ObligatedBalance[\text{validator balance}][\text{strategy}]}{TotalBAppBalance[\text{validator balance}]}
   $$
   :::

6. **Combine into the Final Weight**: With the per-token weights, the final step is to compute a final weight for the participant using a **combination function**. Such function is defined by the bApp and can be tailored to its specific needs. Traditional examples include the arithmetic mean, geometric mean, and harmonic mean.


   **Example**: Let's consider a bApp that uses tokens $A$ and $B$, and considers $A$ to be twice as important as $B$. Then, it could use the following weighted harmonic mean as its combination function:

   $$
   W^{\text{final}}_{\text{strategy}} = c_{\text{final}} \times \dfrac{1}{\dfrac{2/3}{W_{\text{strategy, A}}} + \dfrac{1/3}{W_{\text{strategy, B}}}}
   $$

   where $c_{\text{final}}$ is a normalization constant computed as

   $$
   c_{\text{final}} = \left( \sum_{\text{strategy}} \dfrac{1}{\dfrac{2/3}{W_{\text{strategy, A}}} + \dfrac{1/3}{W_{\text{strategy, B}}}} \right)^{-1}
   $$

