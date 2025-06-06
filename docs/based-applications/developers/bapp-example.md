---
sidebar_label: 'Based App Example'
sidebar_position: 2
---

# Based App Example

The code referenced in this page can be found at this repository:

<a href="https://github.com/ssvlabs/examples">
  <img 
    src="https://img.shields.io/badge/GitHub-SSV%20Labs%20Examples-24292e?style=for-the-badge&logo=github" 
    alt="Based Apps Examples Repo" 
    style={{width: '400px'}}
  />
</a>


This page demonstrates the core mechanics of building a Based Application and integrating it with the Based Applications Framework. 

The following topics are covered:

- Creating a bApp contract
- Implementing business logic for a bApp
- Registering a bApp to the protocol
- Strategy registration and opt-in process
- Client implementation for task listening and response handling


:::info
This tutorial demonstrates one specific use case of bApps, implementing logic for tasks and how the contract/client handles execution and validation of tasks. This structure can be replaced with any logic necessary for a Based Application.

A Based Application does not require following this task/response structure, [any use case listed here can be implemented.](../learn/based-applications/use-cases)
:::

## 1. Creating a bApp contract

The contract used in this tutorial is a price oracle contract for retrieving the current price of ETH.

The contract inherits from a base bApp contract, providing the necessary functionality for network operation. Additional business logic for creating and handling tasks is also implemented.

This bApp example implements two functions:

- ```createNewTask()```
- ```respondToTask()```

These functions handle the initial task request from users (```createNewTask()```), triggering an event. 
The client listens for this event to begin task execution. 
Upon completion, the client pushes data back on-chain (```respondToTask()```)

This example uses ECDSA for verification (any verification method can be used), where strategy owners or a signer they have delegated sign 
messages containing the task number and ETH price for their vote on the client. 
Signatures are stored in an array and sent in the ```respondToTask()``` function along with public keys. 
The contract verifies signatures and confirms each address has opted into the bApp or is a delegated signer before saving the price.

:::info
Steps to deploy and verify the contract are included in the README of the repo. 
:::

The full contract code can be found [here](https://github.com/ssvlabs/examples/bapp-contracts/middleware/examples/ethPriceOracle.sol)


The create and respond functions are as follows:

``` javascript
function createNewTask() external returns (bytes32) {
    // Create task hash from block number and caller address
    bytes32 taskHash = keccak256(abi.encodePacked(block.number, msg.sender));

    // store hash of task on-chain, emit event, and increase taskNum
    allTaskHashes[latestTaskNum] = taskHash;
    emit NewTaskCreated(latestTaskNum, taskHash);
    latestTaskNum = latestTaskNum + 1;

    return taskHash;
}

function respondToTask(
    bytes32 taskHash,
    uint32 taskNumber,
    uint256 ethPrice,
    bytes[] calldata signatures,
    address[] calldata signers,
    uint32 strategyId
) external {
    // check that the task is valid and hasn't been responded to yet
    if (taskHash != allTaskHashes[taskNumber]) { revert TaskMismatch(); }
    if (allTaskResponses[msg.sender][taskNumber].length != 0) { revert AlreadyResponded(); }
    if (ethPrice <= 0) { revert InvalidPrice(); }
    if (signatures.length != signers.length) { revert InvalidSignature(); }

    // Create the message that was signed (task num + price)
    bytes32 messageHash = keccak256(abi.encodePacked(taskNumber, ethPrice));

    // Get the strategy signer 
    address strategySignerAddress = strategySigner[strategyId];
    
    // Verify each signature
    for (uint i = 0; i < signatures.length; i++) {

        // Recover the signer address from the signature
        address recoveredSigner = messageHash.recover(signatures[i]);

        if (strategySignerAddress != address(0)) {
            // if strategy has a signer set, verify this signer is the correct one
            if (strategySignerAddress != signers[i]) {
                revert InvalidSigner();
            }
        } else {
            // if strategy has no signer set, check the signer is the owner of the strategy
            uint32 derivedStrategyId = IAccountBAppStrategy(address(ssvBasedApps)).accountBAppStrategy(recoveredSigner, address(this));
            if (derivedStrategyId != strategyId) {
                revert NotOptedIn();
            }
        }
    }

    // Store the response
    allTaskResponses[msg.sender][taskNumber] = abi.encode(ethPrice);
    mostRecentPrice = ethPrice;

    // Emit event with the ETH price
    emit TaskResponded(taskNumber, taskHash, msg.sender, ethPrice);
}
```

In this example the ```optInToBapp``` function is also overridden, this is what is called when a strategy opts in to a bApp. 
Here in the data field an encoded public address is passed in (e.g 0x000000000000000000000000ac5a7ce31843e737cd38938a8efdec0be5e728b4).
This address can then be used as the signer address which is run on the client. 

```typescript
function optInToBApp(
    uint32 strategyId,
    address[] calldata,
    uint32[] calldata,
    bytes calldata data
) external override onlySSVBasedAppManager returns (bool success) {
    // Decode the padded address correctly from bytes32
    address signer = address(uint160(uint256(abi.decode(data, (bytes32)))));
    // Store the address in the mapping
    strategySigner[strategyId] = signer;

    emit DebugOptIn(strategyId, signer, testOne[1], testTwo[2]);

    return true;
}
```
## 2. Registering a bApp to the network 

After contract deployment, the register function becomes available.

The contract inherits ```OwnableBasedApp```, providing the register function.

With the contract deployed and verified, navigate to Etherscan and access the contract page. Under ```Write Contract```, locate the ```registerBapp``` function. 

![Register in Etherscan](/img/bapp-example-1.jpeg)

Sign this transaction with the required tokens, shared risk level for each token, and the [bApp metadata URL.](./smart-contracts/metadata-schema)

## 3. Strategy creation and bApp opt-in process

After on-chain deployment and network registration, strategies can be created and opt into the bApp. Once opted in, participants can deposit any supported tokens. 

For detailed guidance on this process, [follow this guide.](../user-guides/create-strategy.md)

## 4. Client implementation for the bApp 

Each Based Application requires a client implementation, to be run by each strategy. 

In this example, the strategy client will:

**4.1** Listen for tasks to process, monitoring events emitted from ```createNewTask()```

**4.2** Execute tasks off-chain, fetching the current ETH price

**4.3** Cast votes on the correct price, signing messages containing the task number and fetched price

**4.4** After majority vote determination, the last voting strategy signs the ```respondToTask()``` function and publishes the price on-chain


### Code Snippets

All of these code snippets and the working implementation can be found [here](https://github.com/ssvlabs/examples/eth-price-oracle-client)

#### 4.1 Task listening implementation

The viem client used to instantiate the bApps SDK also handles listening for ```createNewTask()``` events.

Task listening is implemented using ```watchEvent()```, with task data passed to ```handleNewTask``` for execution:

```typescript 
export async function startEventListener() {
  try {

    // use viem to listen for event
    const unwatch = publicClient.watchEvent({
      address: CONTRACT_ADDRESS,
      event: NEW_TASK_CREATED_EVENT,
      onLogs: (logs) => {
        logs.forEach((log) => {
          const { taskIndex, taskHash } = log.args;
          if (taskIndex !== undefined && taskHash) {
            // start task execution
            handleNewTask(BigInt(taskIndex), taskHash);
          }
        });
      },
    });

    return unwatch;
  } catch (error) {
    await writeToClient(`Error starting event listener: ${error}`, 'error', false);
    throw error;
  }
}
```

#### 4.2 Task execution

When a user initiates a task, the client fetches the current ETH price:

```typescript
export async function getCurrentEthPrice(): Promise<number> {
  try {
    // use CoinGecko API to get current ETH price
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    const price = response.data.ethereum.usd;

    return Math.round(price);
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    throw error;
  }
}
```

#### 4.3 Task outcome voting

With task details and execution complete, the client casts its vote by signing a message containing the price and task hash:

```typescript
export async function signTaskResponse(taskNumber: number, ethPrice: number): Promise<string> {
  // Create the message that will be signed (task num + price)
  // Match exactly what the contract does: keccak256(abi.encodePacked(taskNumber, ethPrice))
  const messageHash = keccak256(
    encodePacked(['uint32', 'uint256'], [taskNumber, BigInt(ethPrice)])
  );

  // Sign the raw message hash directly without any prefix
  const signature = await account.sign({
    hash: messageHash,
  });

  return signature;
}
```

With the message signed, the client will now vote on the task outcome:

```typescript
async function handleNewTask(taskIndex: bigint, taskHash: string) {
  try {
    const task = await createTaskFromEvent(taskIndex, taskHash);
    if (currentStrategy) {
      await voteOnTask(task, currentStrategy, currentCalculationType, currentVerboseMode);
    }
  } catch (error) {
    await writeToClient(`Error handling new task: ${error}`, 'error', false);
  }
}
```

The voting power (weight) is determined using the bApps SDK:

```typescript
// Calculate strategy weights
const weights = await calculateParticipantsWeightSDK(strategy, calculationType, verboseMode);
const strategyWeight = weights.get(strategy) || 0;

// Add vote to task
task.votes.set(strategy, strategyWeight);
```

#### 4.4 Majority vote submission

After strategies reach a majority vote and agree on a price (50% in this example), 
the client submits the ```respondToTask()``` function to the bApp contract, including task details, 
ETH price, and client signatures. The contract verifies the submission comes from opted-in strategies. 

```typescript
// Check if we have a majority (more than 50% of total weight)
if (strategyWeight > totalWeight / 2) {
    // Get all signatures and signers from votes
    const signatures: string[] = [];
    const signers: string[] = [];

    // Use the account's address derived from the private key
    if (task.signature) {
    signatures.push(task.signature);
    signers.push(account.address);
    }

    // Submit the task response on-chain
    const txHash = await submitTaskResponse(task, task.taskNumber, signatures, signers);
}
```

The transaction is sent and the ETH price is published on-chain:

```typescript
// Prepare the transaction
const { request } = await publicClient.simulateContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: respondToTaskABI,
    functionName: 'respondToTask',
    args: [
    task.id as `0x${string}`,
    taskNumber,
    BigInt(task.ethPrice),
    signatures as `0x${string}`[],
    signers as `0x${string}`[],
    strategyId
    ],
    account: walletClient.account,
});

// Send the transaction
const hash = await walletClient.writeContract(request);
```

The client will wait for tasks to be created, and then process the votes based on each strategies weight. 

The output is as follows:

```bash 
[Heartbeat] Client is running and waiting for new tasks...
[Heartbeat] Client is running and waiting for new tasks...
[Heartbeat] Client is running and waiting for new tasks...
[Heartbeat] Client is running and waiting for new tasks...
[11:57:18] 📡 Message Hash: 0x2333df8c374a71c2e843dfd787ab8b96f6431d43858758b5b49bed88b1cb6ff7
[11:57:18] 📡 Task Number: 10
[11:57:18] 📡 ETH Price: 2483
[11:57:18] 📡 Signature: 0x5d4a762890e1b7fa8fe6affddd3c6f2a897b566bbce524f4e4932f31dd6a183c455405c1a4e5fb0438daaa60df17e354de2e7188492e6ad6776716e008eb1bf11b
[11:57:18] 📡 Signer Address: 0xac5a7Ce31843e737CD38938A8EfDEc0BE5e728b4
[11:57:18] 📡 ════════════════════════════════════════════════════════════════════════════════
[11:57:18] 📊 New on-chain task detected:
[11:57:18] 📡 Task Index: 10
[11:57:18] 📡 Task Hash: 0xfa311eaab35462b5895f378e86e51f16d9d8e0c8dbe5b6ea9990ea3dd1b6fe5c
[11:57:18] 📡 Current ETH Price: $2483
[11:57:18] 📡 Status: Waiting for votes...
[11:57:18] 📡 ════════════════════════════════════════════════════════════════════════════════

Current votes for this task:
Strategy 13: 33.3%
Strategy 15: 66.7%
Total: 100.0%


Majority reached! Strategy 15 will send the transaction.

Strategy ID: 15
Number of Signatures: 1
ETH Price: $2483
Task Number: 10
════════════════════════════════════════════════════════════════════════════════
Transaction submitted: 0x7c11297736ef700635e971a6729f5ec319ac6780da02617a62c22ef566e85008

════════════════════════════════════════════════════════════════════════════════
```