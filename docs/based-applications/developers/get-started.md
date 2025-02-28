---
sidebar_label: 'Get Started'
sidebar_position: 1
--- 

# Get Started

## Developing a Based Application

This will walk through the process of what is needed to register and run a Based Application. To develop a bApp, you will need to develop a client which participants (represented as strategies) will run. This client will be responsible for listening for tasks to take on, and submitting the result of the task once it is completed.

## BApp client(s)

Operators will run a client which is specific to the bApp they have opted into. Such client should use the strategy weights as voting power, however they see fit. The example we provide shows two separate strategies completing the task independently, then voting on the result, and ensuring a consensus (majority vote) is reached.

Different Based Applications may have different needs, and as such, the steps described below may vary. Tasks on bApps can be triggered in a variety of ways depending on the bApp; the bApp client could even be based on scheduling, or off-chain conditions.

The innovation represented by SSV's Based Applications, is that when a client has completed its execution, it will use the strategy weight to "vote" for its own result, and this will represent the risk-adjusted value of the sum of slashable and non-slashable capital attached to the strategy itself.

### Example

Below we have an example client, it has been built with one task, the task is to return the most recent slot number.

Example client flow:

1. A task is requested on the bApp.
The application initializes and prepares to fetch the latest slot number.

2. The example app calculates the strategies' weight.
```calculateWeight()``` is called for each operator to determine their weight in the voting system.

3. Operators start executing the task.
The system prepares for multiple operators to fetch the latest slot number.

4. Operators retrieve the slot number.
```fetchSlot()``` is called to obtain the latest slot number.

5. Strategy 1 votes to complete the task, returning slot number 11139593.
```signAndBroadcastTask(11139593)``` is called to sign and broadcast the vote.
The vote is processed using ```processVote()```.

6. Strategy 1 only has 13.54% of the total weight, so it is not enough to complete the task.
```checkMajority()``` is called but does not find a majority, so the task remains incomplete.

7. No majority is reached, waiting for more votes.
The system remains in a waiting state for additional votes.

8. Strategy 2 votes to complete the task, returning slot number 11139593.
```signAndBroadcastTask(11139593)``` is called again for Strategy 2.
The vote is processed using processVote().

9. Strategy 2 has 86.46% of the total weight, reaching the majority threshold.
```checkMajority()``` is called again and confirms that the total weight surpasses the threshold.

10. Since 100% of the total weight has now voted, the task is verified as complete.
The system acknowledges that the task is fully verified.

Example pseudocode:

``` typescript
import { ethers } from 'ethers';

// Represents a client that participates in a voting system by fetching block numbers and broadcasting votes
class BasedClient {
  constructor(id, rpcUrl, network) {
    this.id = id; // strategy id ?
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.network = network; 
    this.votes = []; // Stores received votes
  }

  // 1. Fetch block number
  // Fetches the latest block number from the Ethereum network
  async fetchSlot() {
    console.log(`🔍 Fetching latest slot...`);
    const slotNumber = await this.provider.getBlockNumber();
    console.log(`✅ Latest slot: ${slotNumber}`);
    return slotNumber;
  }

// Generates a random weight based on the strategy ID
// TODO: Replace with SDK weight calculation
calculateWeight() {
  const hash = [...this.id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 50) + 1; // Generates a weight between 1 and 50
}

=// Signs (simply assigns) and broadcasts the vote to the network
signAndBroadcastTask(slot) {
  console.log(`✍️ Broadcasting vote...`);
  const weight = this.calculateWeight(); // Generate participant weight
  const signedVote = { participantID: this.id, slot, weight }; // Creates a vote object with weight
  console.log(`📤 Broadcasting vote:`, signedVote);
  this.network.broadcast(signedVote); // Sends vote to network
}

// Processes a received vote from another participant
processVote(signedVote) {
  console.log(`📥 Processing received vote from ${signedVote.participantID}`);
  this.votes.push(signedVote); // Stores the received vote
}

// Checks if a majority vote has been reached for a particular block slot
checkMajority() {
  console.log(`🔎 Checking majority vote...`);
  const voteCounts = {}; // Dictionary to count weighted votes per slot
  this.votes.forEach(({ slot, weight }) => {
    voteCounts[slot] = (voteCounts[slot] || 0) + weight;
  });
  
  const threshold = 50; // Minimum weighted votes needed for a majority
  for (const slot in voteCounts) {
    if (voteCounts[slot] > threshold) {
      console.log(`🏆 Majority reached for slot ${slot} with weight ${voteCounts[slot]}`);
      return Number(slot);
    }
  }
  console.log(`❌ No majority reached yet.`);
  return null;
}

// Runs the client in a loop, checking for tasks to complete
async run() {
  console.log(`🔄 Waiting for tasks...`);
  while (true) {
    const hasTask = await this.checkForTask(); // Simulating event trigger
    if (hasTask) {
      console.log(`🚀 Task detected, fetching slot...`);
      const slotNumber = await this.fetchSlot(); // Fetch latest slot number
      this.signAndBroadcastTask(slotNumber); // Sign and broadcast the vote
    }
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
  }
}

  // Simulated function to check for an event from the contract
  async checkForTask() {
    // Here, we would listen for an event emitted from the contract
    // For now, simulate with a random boolean
    return Math.random() > 0.5;
  }
}
```

To run the code itself, you could initiate it with something like this:

```
// Mock network object with a broadcast function
const mockNetwork = {
broadcast: (vote) => console.log(`📡 Mock broadcast:`, vote),
};

// Instantiates the client and starts the voting process
const client = new BasedClient(
'operator-1', // Unique identifier
'https://holesky.infura.io/v3/YOUR_PROJECT_ID', // Ethereum provider endpoint
mockNetwork // Mock network object
);

client.run(); // Executes the client
```

Example flow chart:

![Simple Block Agreement Example Flow Chart](../../../static/img/simulated-flow.png)

## Voting Power

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

