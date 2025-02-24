---
sidebar_label: 'Get Started'
sidebar_position: 1
--- 
 

# Get Started

## Executing Tasks (Full bApp Example)

:::info
The executable example for what is described below can be found [in this repository](https://github.com/ssvlabs/examples/tree/main/simple-block-agreement).
:::

Once the bApp is registered and secured, tasks can be executed. In the example for this bApp, it has been built with one task, the task is to return the block number of the most recent block. 

A user can come along and execute this task on the bApp, like they could execute any other task on another bApp.

When the task is executed, the operators which secure this bApp will get to work on completing it, in this example they will get the block number. 

After they have completed the task (retrieved the block number), they will broadcast their vote on what they believe to be the correct block number.

Once enough of the participants (strategies) have broadcasted their vote on this block number to make up a majority, and the participants come to a consensus on the block number, the task will be verified as complete.

For this hypothetical example, let's assume there are two strategies:

- `Strategy 1`: 20% Weight
- `Strategy 2`: 80% Weight

Example flow:
- User executes the task on the bApp to obtain the block number
- Operators will get to work on completing the task
- Operators will retrieve the block number
- `Strategy 1` will vote to complete the task returning block number 10 
- `Strategy 1` only has 20% of the total weight, so it will not be enough to complete the task. 
- Now that there is no majority, the task will not be verified as complete, we must wait for more votes to be broadcasted.
- `Strategy 2` will also vote to complete the task returning block number 10
- There is now a majority of 100% of the total weight, so the task will be verified as complete.