---
sidebar_label: 'Get Started'
sidebar_position: 1
--- 

# Get Started

## Developing a Based Application

This will walk through the process of what is needed to create a Based Application.

To develop a bApp, you will need to develop a client which participants (represented as strategies) will run. This client will be responsible for listening for tasks to take on, and submitting the result of the task once it is completed.

In Based Applications, the obligated token balance and delegated validator balance are used to attribute a weight to each Strategy, which is then used to vote on whatever task the client should be accomplishing.

The vote calculation follows this flow chart:

![Vote Calculation Flow Chart](../../../static/img/example-flow-chart.png)

- Collect strategies opted-in to the bapp
- Collect total validator balance delegated to all opted-in strategy owners
- collect total obligated token balances
- Get "significance" of tokens and validator balance from config
- Calculate risk-adjusted weights for each token, for each strategy
- Normalize the obtained weights
- Combine strategy-token weights into a final weight for each strategy

## BApp client(s)

Operators will run a client which is specific to the bApp they have opted into. Such client should implement the steps described above, and use the strategy weights as voting power, however they see fit. The example we provide shows two separate strategies completing the task independently, then voting on the result, and ensuring a consensus (majority vote) is reached.

Different Based Applications may have different needs, and as such, the steps described below may vary. Tasks on bApps can be triggered in a variety of ways depending on the bApp; the bApp client could even be based on scheduling, or off-chain conditions.

The innovation represented by SSV's Based Applications, is that when a client has completed its execution, it will use the strategy weight to "vote" for its own result, and this will represent the risk-adjusted value of the sum of slashable and non-slashable capital attached to the strategy itself.

### Example

:::info
The executable example for what is described below can be found [in this repository](https://github.com/ssvlabs/examples/tree/main/simple-block-agreement).
:::

In the example for this bApp, it has been built with one task, the task is to return the most recent slot number.

Example flow:
- User requests the task on the bApp to obtain the slot number (by simply launching the application)
- The example app will proceed to calculate the strategies' weight as explained above
- Operators will get to work on executing the task
- Operators will retrieve the slot number
- `Strategy 4` will vote to complete the task returning slot number 11139593
- `Strategy 4` only has 13.54% of the total weight, so it will not be enough to complete the task. 
- Now that there is no majority, the task will not be verified as complete, we must wait for more votes to be broadcasted.
- `Strategy 5` will also vote to complete the task returning slot number 11139593
- `Strategy 5` has 86.46% of the total weight, so it will be enough to complete the task.
- There is now a majority of 100% of the total weight, so the task will be verified as complete.

Example flow chart:

![Simple Block Agreement Example Flow Chart](../../../static/img/simulated-flow.png)

Output from the example bApp:

```bash

                               📊 BApp Overview
┌────────────────────────────────┬────────────────────────────────────────────┐
│ Metric                         │                                      Value │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Address                        │ 0x89EF15BC1E7495e3dDdc0013C0d2B049d487b2fD │
│ Tokens                         │        SSV (Amount: 76 / Significance: 50) │
│ Strategies                     │                                          2 │
│ Total Validator Balance        │                           6,108,012.48 ETH │
│ Validator Balance Significance │                                          2 │
└────────────────────────────────┴────────────────────────────────────────────┘

                💲 BApp Token Weight Summary for SSV
┌──────────┬─────────┬────────────────┬───────────────────┬─────────┐
│ Strategy │ Balance │ Obligation (%) │ Obligated Balance │    Risk │
├──────────┼─────────┼────────────────┼───────────────────┼─────────┤
│    4     │  70 SSV │        100.00% │            70 SSV │ 100.00% │
│    5     │  30 SSV │         20.00% │             6 SSV │  20.00% │
└──────────┴─────────┴────────────────┴───────────────────┴─────────┘

🚀  Starting weight calculations for 2 strategies

|==============================================================================================|
|                              Token Weight Formula (Exponential)                              |
|==============================================================================================|
|                     ObligatedBalance                                                         |
| W_strategy,token = ------------------ * e^(-β * max(1, Risk))                                |
|                       TotalAmount                                                            |
|==============================================================================================|


|==============================================================================================|
|                     Combination Function (Final Weight) (Harmonic Mean)                      |
|==============================================================================================|
|                                           1                                                  |
| W_strategy^final  =  --------------------------------------                                  |
|                     Σ(Significance_token / Weight_strategy,token)                            |
|                     + (Significance_ValidatorBalance / Weight_strategy,ValidatorBalance)     |
|==============================================================================================|


[💲 Token SSV] 🪙  Calculating token weights
[💲 Token SSV] 🗂️  Total amount obligated to bApp: 76
[💲 Token SSV] 🗂️  Beta: 100
[💲 Token SSV] [🧍strategy 4] 🧮 Calculating weight (exponential formula):
  -> Obligation participation (obligated balance / total bApp amount): 0.9210526315789473
  - Risk: 1
  -> Weight (obligation participation * exp(-beta * max(1, risk))): 3.426385767387612e-44
[💲 Token SSV] [🧍strategy 5] 🧮 Calculating weight (exponential formula):
  -> Obligation participation (obligated balance / total bApp amount): 0.07894736842105263
  - Risk: 0.2
  -> Weight (obligation participation * exp(-beta * max(1, risk))): 2.936902086332239e-45

[🔑 Validator Balance] 🪙  Calculating validator balance weights
[🔑 Validator Balance] 🗂️  Total VB amount in bApp: 6108012.48
[🔑 Validator Balance] [🧍strategy 4] 🧮 Calculating normalized weight:
  - Validator Balance: 3052.48
  - Total VB amount in bApp: 6108012.48
  - Weight (validator balance / total amount): 0.05%
[🔑 Validator Balance] [🧍strategy 5] 🧮 Calculating normalized weight:
  - Validator Balance: 6104960
  - Total VB amount in bApp: 6108012.48
  - Weight (validator balance / total amount): 99.95%

            🔑 Validator Weights
┌──────────┬───────────────────┬────────────┐
│ Strategy │ Validator Balance │ Weight (%) │
├──────────┼───────────────────┼────────────┤
│    4     │      3,052.48 ETH │      0.05% │
│    5     │     6,104,960 ETH │     99.95% │
│  TOTAL   │  6,108,012.48 ETH │    100.00% │
└──────────┴───────────────────┴────────────┘

[⚖️ Final Weight] [🧍strategy 4] 🧮 Calculating Final Weight:
  -> Total significance sum: 52
  - Token: SSV
  - Significance: 50
  - Weight: 0.9210526315789475
  -> (Significance/Significance Sum) / Weight = 1.0439560439560438
  - Validator Balance
  - Significance: 2
  - Weight: 0.0004997501249375312
  -> (Significance/Significance Sum) / Weight = 76.96153846153847
  --> Harmonic mean = (1/(sum_t (significance_t/significance sum) / weight_t)): 0.012819609776713389

[⚖️ Final Weight] [🧍strategy 5] 🧮 Calculating Final Weight:
  -> Total significance sum: 52
  - Token: SSV
  - Significance: 50
  - Weight: 0.07894736842105264
  -> (Significance/Significance Sum) / Weight = 12.179487179487179
  - Validator Balance
  - Significance: 2
  - Weight: 0.9995002498750624
  -> (Significance/Significance Sum) / Weight = 0.038480769230769235
  --> Harmonic mean = (1/(sum_t (significance_t/significance sum) / weight_t)): 0.08184667075550249


             📊 Normalized Final Weights
┌──────────┬────────────┬──────────────┬────────────┐
│ Strategy │ Raw Weight │ Norm. Weight │ Weight (%) │
├──────────┼────────────┼──────────────┼────────────┤
│    4     │    1.28e-2 │      1.35e-1 │     13.54% │
│    5     │    8.18e-2 │      8.65e-1 │     86.46% │
└──────────┴────────────┴──────────────┴────────────┘

🚀 Simulate Blockchain Agreement Process for Slot 11139593
[🧍strategy 4]  📦 Handling new block with slot 11139593.
[🧍strategy 4]  📤 Broadcasting vote
[🧍strategy 4]  🗳️ Received vote from participant 4 with slot 11139593
[🧍strategy 4]  📄 Checking majority for slot 11139593
[🧍strategy 4]  🔢 Total weight: 13.54%. Decomposition: 13.54% (from P4)
[🧍strategy 4]  ❌ Majority not yet reached for slot: 11139593
[🧍strategy 5]  🗳️ Received vote from participant 4 with slot 11139593
[🧍strategy 5]  📄 Checking majority for slot 11139593
[🧍strategy 5]  🔢 Total weight: 13.54%. Decomposition: 13.54% (from P4)
[🧍strategy 5]  ❌ Majority not yet reached for slot: 11139593
[🧍strategy 5]  📦 Handling new block with slot 11139593.
[🧍strategy 5]  📤 Broadcasting vote
[🧍strategy 4]  🗳️ Received vote from participant 5 with slot 11139593
[🧍strategy 4]  📄 Checking majority for slot 11139593
[🧍strategy 4]  🔢 Total weight: 100.00%. Decomposition: 13.54% (from P4) + 86.46% (from P5)
[🧍strategy 4]  ✅ Majority found for slot: 11139593. Updating last decided slot.
[🧍strategy 5]  🗳️ Received vote from participant 5 with slot 11139593
[🧍strategy 5]  📄 Checking majority for slot 11139593
[🧍strategy 5]  🔢 Total weight: 100.00%. Decomposition: 13.54% (from P4) + 86.46% (from P5)
[🧍strategy 5]  ✅ Majority found for slot: 11139593. Updating last decided slot.
```