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
    latestTaskNum = latestTaskNum + 1;
    emit NewTaskCreated(latestTaskNum, taskHash);

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

* Listen for tasks to process, monitoring events emitted from ```createNewTask()``` ([**4.1**](#41-task-listening-implementation))

* Execute tasks off-chain, fetching the current ETH price ([**4.2**](#42-task-execution))

* Cast votes on the correct price, signing messages containing the task number and fetched price ([**4.3**](#43-task-outcome-voting))

* After majority vote determination, the last voting strategy signs the ```respondToTask()``` function and publishes the price on-chain ([**4.4**](#44-majority-vote-submission))


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


## 5. Deploying the bApp

To deploy and run this bApp example, follow these steps:

### 5.1 Deploy and Verify the Contract

1. Clone the repository:
```bash
git clone https://github.com/ssvlabs/examples.git
```

2. Install dependencies:
```bash
cd bapp-contracts
forge install
```

3. Compile the contracts:
```bash
forge build
```

For detailed deployment and verification steps, refer to the [bApp contracts repository](https://github.com/ssvlabs/examples/tree/main/bapp-contracts).

### 5.2 Register the bApp

After deploying the contract, call the `registerBapp` function with:
- Required token addresses
- Shared risk levels for each token
- bApp metadata URI

### 5.3 Create and Configure Strategy

After registering the bApp, you need to create and configure a strategy:

1. Create a new strategy with the desired tokens
2. Set the data field to be an encoded address of the signer. For example:
```solidity
0x000000000000000000000000ac5a7ce31843e737cd38938a8efdec0be5e728b4
```
3. Opt into the bApp with this strategy

Once the strategy is opted in, it can be used with the bApp and process tasks using the client.

### 5.4 Run the Client

1. Clone the repository:
```bash
git clone https://github.com/ssvlabs/examples.git
```

2. Navigate to the project directory:
```bash
cd eth-price-oracle-client
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory with your configuration:
```bash
BAPP_ADDRESS="0xBb00B761d0670f09d80fe176a2b0fB33e91fbCe9"
PRIVATE_KEY_1="0x00000000000000000000000000000000000000"
```

## Usage

Run the client with your private key and strategy. You can pass the private key in two ways:

1. Directly in the command:
```bash
PRIVATE_KEY=your_private_key_here npm run dev -- --strategy 19 --calculation_type arithmetic
```

2. Using a variable from your .env file for each strategy (recommended):
```bash
PRIVATE_KEY=$PRIVATE_KEY_1 npm run dev -- --strategy 19 --calculation_type arithmetic
```

Run with specific strategy and calculation type:
```bash
PRIVATE_KEY=$PRIVATE_KEY_1 npm run dev -- --strategy 19 --calculation_type arithmetic
```

The client will start listening for tasks and processing them according to the configured strategy.

### 5.5 Testing the bApp

With the client running and strategy configured, you can test the bApp by:

1. Calling `createTask()` on the bApp contract
2. The client will automatically:
   - Listen for the task event
   - Process the task
   - Collect votes from strategies
   - Submit the response when over 50% of the votes are received

The client will output the progress of task processing, including:
- Task detection
- Current ETH price
- Vote collection
- Transaction submission

Example output:
```bash
[11:25:18] 📊 New on-chain task detected:
[11:25:18] 📡 Task Index: 6
[11:25:18] 📡 Task Hash: 0xb7cb56eea4633617d9d325d473639864635101a2b6b1d2815e37f612b1cd8763
[11:25:18] 📡 Current ETH Price: $2766
[11:25:18] 📡 Status: Waiting for votes...
[11:25:18] 📡 ════════════════════════════════════════════════════════════════════════════════
[11:25:19] 📡 Message Hash: 0xecfd47d50765a3cc634836159308820aa890976fcf986ba7aabc6152384a29b0
[11:25:19] 📡 Task Number: 6
[11:25:19] 📡 ETH Price: 2766
[11:25:19] 📡 Signature: 0xb0ed945fc4b40837bb0c15049ad7ea262ff7edb9ff8f6955c72e7cad186376855fab5f7e0c4eed4bf48b9a140f51e7d4fcf5bd1017ddef453d8024e5046242361c
[11:25:19] 📡 Signer Address: 0xA4831B989972605A62141a667578d742927Cbef9

Current votes for this task:
Strategy 17: 16.0%
Strategy 19: 50.0%
Total: 66.0%

Majority reached! Strategy 19 will send the transaction.

Found 2 signatures for task 0xb7cb56eea4633617d9d325d473639864635101a2b6b1d2815e37f612b1cd8763
Signature 1: 0xca088123e9f070f2c53cc00326d2efba14fc4b2d8bd6018bbdc9bf869f7eb4737d52b7666c5251864e449f102ed0feab5cfbce0fd9630462822d2111a8b6d2381b
Signer 1: 0x4da9f34f83d608cAB03868662e93c96Bc9793495
Strategy ID 1: 17
Signature 2: 0xb0ed945fc4b40837bb0c15049ad7ea262ff7edb9ff8f6955c72e7cad186376855fab5f7e0c4eed4bf48b9a140f51e7d4fcf5bd1017ddef453d8024e5046242361c
Signer 2: 0xA4831B989972605A62141a667578d742927Cbef9
Strategy ID 2: 19
Number of Signatures: 2
ETH Price: $2766
Task Number: 6
════════════════════════════════════════════════════════════════════════════════
Transaction submitted: 0x6cebc199aa47e7c46853056002c7a88b2fa47953cd58187b61e117cc5b1f0747
Number of Signatures: 2
ETH Price: $2766
Task Number: 6
════════════════════════════════════════════════════════════════════════════════
```

The bApp will store the details of the tasks execution and the latest price on-chain.