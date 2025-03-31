---
title: Strategy Weights
sidebar_label: Strategy Weights
---

# Strategy Weights

For a based application, it is important to know how much capital each strategy has allocated to the bApp. This is because the bApp's security mechanism is based on the total capital at risk.

[You can read more about the Risk Expressive Model here](../ssv2.0-a-based-applications-protocol/risk-expressive-model/the-model).


## How to calculate the weights of a strategy

:::info
To do this programmatically, read this section in the [Based Applications developer documentation](../../developers/bapp-example).

To do this manually, follow the steps below and obtain the information by querying the [Based Application Subgraph](../../developers/subgraph).
:::

For all the strategies that opted-in to a given bApp, clients will need to:

### 1. **Gather Obligated Balances**
Get the obligated balance from each strategy, for each token used by the bApp.
   ```go
   ObligatedBalance mapping(Token -> Strategy -> Amount)
   ```
   This is done by multiplying the `percentage` of obligated tokens by the `balance` of such tokens deposited to the strategy.

### 2. **Sum Obligations**
From `ObligatedBalance`, bApps should sum all obligations and compute the total amount obligated to the bApp by all strategies.
   ```go
   TotalBAppBalance mapping(Token -> Amount)
   ```
### 3. **Calculate Risk**
For each token, it should get the risk (token-over usage) of each strategy. This is obtained by summing all the `percentages` in all `Obligations` for a given token, and dividing it by `100`.
   ```go
   Risk mapping(Token -> Strategy -> Float)
   ```
### 4. **Compute Risk-Aware Weights**
With this information, bApps can compute the weight of a participant for a certain token by

   $$
   W_{\text{strategy, token}} = c_{\text{token}} \times \dfrac{ObligatedBalance[\text{token}][\text{strategy}]}{TotalBAppBalance[\text{token}]} e^{-\beta_{\text{token}} \times max(1, Risk[\text{token}][\text{strategy}])}
   $$

   where $c_{\text{token}}$ is a normalization constant defined as

   $$
   c_{\text{token}} = \left( \sum_{\text{strategy}} \dfrac{ObligatedBalance[\text{token}][\text{strategy}]}{TotalBAppBalance[\text{token}]} e^{-\beta_{\text{token}} \times max(1, Risk[\text{token}][\text{strategy}])} \right)^{-1}
   $$

### 5. **If the bApp uses validator balance**
 The client should also generate a mapping of `Strategy -> Validator Balance` with the amount from each strategy. Clients will need to do this in a couple of steps:

    a. **Gather Delegated Balances**: Get all the delegations made to the owner of a strategy for all the strategies that opted in to a bApp.

      ```go
      DelegatedBalance mapping(Strategy -> Amount)
      ```
    
      Bear in mind, these are *stored as percentages*. The effective validator balance can be looked up the beacon chain (the [`based-apps-sdk`](https://github.com/ssvlabs/based-apps-sdk) provides a function to do this: `getValidatorsBalance(account)`), and then multiplied by the percentage that is delegated.
      These values need to be summed, in order to obtain the delegated balance for each owner.

    b. **Sum all delegated balances** for all strategies.
      ```go
      TotalBAppDelegatedBalance mapping(Validator Balance -> Amount)
      ```

    d. **Compute Weights**. As this capital doesn't involve any type of risk, all risk values can be set to 0. Thus, for this capital, this is equivalent to:

      $$
      W_{\text{strategy, validator balance}} = \dfrac{ObligatedBalance[\text{validator balance}][\text{strategy}]}{TotalBAppBalance[\text{validator balance}]}
      $$

### 6. **Combine into the Final Weight**
With the per-token weights, the final step is to compute a final weight for the participant using a **combination function**. Such function is defined by the bApp and can be tailored to its specific needs. Traditional examples include the arithmetic mean, geometric mean, and harmonic mean.

**Example**: Let's consider a bApp that uses tokens $A$ and $B$, and considers $A$ to be twice as important as $B$. Then, it could use the following weighted harmonic mean as its combination function:
$$
W^{\text{final}}_{\text{strategy}} = c_{\text{final}} \times \dfrac{1}{\dfrac{2/3}{W_{\text{strategy, A}}} + \dfrac{1/3}{W_{\text{strategy, B}}}}
$$
where $c_{\text{final}}$ is a normalization constant computed as
$$
c_{\text{final}} = \left( \sum_{\text{strategy}} \dfrac{1}{\dfrac{2/3}{W_{\text{strategy, A}}} + \dfrac{1/3}{W_{\text{strategy, B}}}} \right)^{-1}
$$

<!-- [At the following page](./participant-weight-example.md), you can find a coded example of how to combine Subgraph data with the logic described above. -->