---
title: Based Application Flow
sidebar_label: Based Application Flow
sidebar_position: 8
---

# Based Application Flow

## Overview

This document outlines the full flow of a Based Application, from the creation of the bApp to the execution of tasks.

The executable example for point #5 in this flow can be found [here](https://github.com/ssvlabs/examples/tree/main/simple-block-agreement).

To learn how to do this programmatically, please refer to the [Based Application Developer Documentation](../../developers/).

### 1. Register a Based Application

The first step is to register the Based Application. This is done by calling the [`registerBapp`](../../developers/smart-contracts/BasedAppManager.md#egisterbappbapp-tokens-sharedrisklevels-metadatauri) function on the `BasedAppManager` contract. This function takes in the following parameters:

- `bApp`: The address of the Based Application.
- `tokens`: An array of tokens the the bApp accepts.
- `sharedRiskLevels`: An array of shared risk levels for the Based Application.
- `metadataURI`: The URI of the metadata for the Based Application.

### 2. Create Strategy's

Strategies must then be created with a set of tokens that the bApp supports. This is done by calling the [`createStrategy`](../../developers/smart-contracts/BasedAppManager.md#createstrategyfee-metadatauri) function on the `BasedAppManager` contract. This function takes in the following parameters:

- `strategyId`: The ID of the strategy to create.
- `bApp`: The address of the Based Application.
- `tokens`: An array of tokens the the bApp accepts.
- `obligationPercentages`: An array of obligation percentages for the Based Application.

### 3. Opt in to the Based Application

Users must opt in to the Based Application by calling the [`optIn`](../../developers/smart-contracts/BasedAppManager.md#optintobappstrategyid-bapp-tokens-obligationpercentages-data) function on the `BasedAppManager` contract. This function takes in the following parameters:

- `strategyId`: The ID of the strategy to opt in to.
- `bApp`: The address of the Based Application.
- `tokens`: An array of tokens the the bApp accepts.
- `obligationPercentages`: An array of obligation percentages for the Based Application.
- `data`: The data to pass to the Based Application.

### 4. Users deposit to the Strategy's

Users can now deposit into the strategy's by calling the `depositETH` or `depositERC20` functions on the strategy.

Depending on how much is deposited to each strategy, each strategy will have a different weight in the bApp. This weight determines how much influence each strategy has when the bApp is being executed.

For this example, there are two strategies:

- `Strategy 1`: 20% Weight
- `Strategy 2`: 80% Weight

### 5. Execute tasks

Now that the bApp is setup and tokens have been deposited into the strategies, tasks can be executed. 

In the example for this bApp, the task is to return the block number of the most recent block. A user can execute this task on the bApp. 

When the task is executed, the operators which secure this bApp will get to work on completing it, in this example they will get the block number. After they have completed the task, they will broadcast their vote on this block number.

Once enough of the participants (strategies) have broadcasted their vote on this block number to make up a majority, the task will be verified as complete.  

Example flow:
- `Strategy 1` will vote to complete the task at block 10
- `Strategy 1` only has 20% of the total weight, so it will not be enough to complete the task. 
- Now that there is no majority, the task will not be verified as complete, we must wait for more votes to be broadcasted.
- `Strategy 2` will also vote to complete the task at block 10
- There is now a majority of 100% of the total weight, so the task will be verified as complete.