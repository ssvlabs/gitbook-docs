# Automated Cluster Balance Monitoring

This script automatically monitors the balance of multiple clusters on the SSV network at regular intervals. It calculates the current balance of each cluster by:

* Querying the subgraph for the relevant data (see the [Subgraph Examples](../tools/ssv-subgraph/subgraph-examples) page for more information)
* Using these values to compute the current cluster balance for each specified cluster, outputting the amount in SSV

Details on the formulas used can be found in the documentation page related to [Cluster Balance](../../stakers/clusters/cluster-balance).

## Cluster Balance Calculation

The core calculation function that computes the cluster balance:

```typescript
function calculateClusterBalance(responseData: GraphQLResponse, clusterName: string): ClusterCalculationResult | null {
  
  // Network Fee Calculation
  const networkFee =
    parseInt(responseData.data.daovalues.networkFeeIndex) +
    (responseData.data._meta.block.number -
      parseInt(responseData.data.daovalues.networkFeeIndexBlockNumber)) *
      parseInt(responseData.data.daovalues.networkFee) -
    responseData.data.cluster.networkFeeIndex * 10000000;

  // Operator Fee Calculation
  let operatorFee = -responseData.data.cluster.index * 10000000;
  for (let operator of responseData.data.operators) {
    operatorFee +=
      parseInt(operator.feeIndex) +
      (responseData.data._meta.block.number -
        parseInt(operator.feeIndexBlockNumber)) *
        parseInt(operator.fee);
  }

  // Cluster Balance Calculation
  const clusterBalance =
    responseData.data.cluster.balance -
    (networkFee + operatorFee) * responseData.data.cluster.validatorCount;

  return {
    networkFee,
    operatorFee,
    clusterBalance,
    validatorCount: responseData.data.cluster.validatorCount,
  };
}
```

## Full Script

```typescript
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ClusterConfig {
  name: string;
  accountAddress: string;
  operatorIds: string[];
  clusterId: string;
}

interface Config {
  intervalSeconds: number;
  graphqlUrl: string;
  subgraphApiKey: string;
  clusters: ClusterConfig[];
}

let monitoring = true;

function loadConfig(): Config {
  const configPath = path.join(__dirname, "config.json");
  const configData = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(configData);
}

function buildQuery(cluster: ClusterConfig): string {
  const operatorIdsJson = JSON.stringify(cluster.operatorIds);

  return `{
  _meta {
    block {
      number
    }
  }
  daovalues(id: "${cluster.accountAddress}") {
    networkFee
    networkFeeIndex
    networkFeeIndexBlockNumber
  }
  operators(where: {id_in: ${operatorIdsJson}}) {
    fee
    feeIndex
    feeIndexBlockNumber
  }
  cluster(id: "${cluster.clusterId}") {
    validatorCount
    networkFeeIndex
    index
    balance
  }
}`;
}

async function fetchClusterData(url: string, query: string, apiKey: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  return await response.json();
}

function calculateClusterBalance(responseData: any, cluster: ClusterConfig) {
  if (responseData.errors) {
    console.error(`[${cluster.name}] GraphQL errors:`, responseData.errors);
    return null;
  }

  if (!responseData.data) {
    console.error(`[${cluster.name}] No data in response`);
    return null;
  }

  if (!responseData.data.daovalues) {
    console.error(`[${cluster.name}] daovalues is null`);
    return null;
  }

  if (!responseData.data.cluster) {
    console.error(`[${cluster.name}] cluster is null`);
    return null;
  }

  if (!responseData.data.operators || responseData.data.operators.length === 0) {
    console.error(`[${cluster.name}] operators is null or empty`);
    return null;
  }

  const networkFee =
    parseInt(responseData.data.daovalues.networkFeeIndex) +
    (responseData.data._meta.block.number -
      parseInt(responseData.data.daovalues.networkFeeIndexBlockNumber)) *
      parseInt(responseData.data.daovalues.networkFee) -
    responseData.data.cluster.networkFeeIndex * 10000000;

  let operatorFee = -responseData.data.cluster.index * 10000000;

  for (let operator of responseData.data.operators) {
    operatorFee +=
      parseInt(operator.feeIndex) +
      (responseData.data._meta.block.number -
        parseInt(operator.feeIndexBlockNumber)) *
        parseInt(operator.fee);
  }

  const clusterBalance =
    responseData.data.cluster.balance -
    (networkFee + operatorFee) * responseData.data.cluster.validatorCount;

  return {
    networkFee,
    operatorFee,
    clusterBalance,
    validatorCount: responseData.data.cluster.validatorCount,
  };
}

async function monitorClusters() {
  const config = loadConfig();
  const timestamp = new Date().toISOString();

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Monitoring at ${timestamp}`);
  console.log(`${"=".repeat(60)}\n`);

  for (const cluster of config.clusters) {
    try {
      const query = buildQuery(cluster);
      const responseData = await fetchClusterData(config.graphqlUrl, query, config.subgraphApiKey);
      const result = calculateClusterBalance(responseData, cluster);

      if (result) {
        console.log(`[${cluster.name}]`);
        console.log(`  Validators: ${result.validatorCount}`);
        console.log(`  Network Fee: ${result.networkFee}`);
        console.log(`  Operator Fee: ${result.operatorFee}`);
        console.log(`  Cluster Balance: ${result.clusterBalance}`);
        console.log();
      }
    } catch (error) {
      console.error(`[${cluster.name}] Error fetching data:`, error);
    }
  }
}

async function startMonitoring() {
  const config = loadConfig();

  console.log(`Starting cluster monitoring...`);
  console.log(`Interval: ${config.intervalSeconds} seconds`);
  console.log(`Clusters to monitor: ${config.clusters.length}`);
  console.log(`Press Ctrl+C to stop\n`);

  await monitorClusters();

  const intervalId = setInterval(async () => {
    if (!monitoring) {
      clearInterval(intervalId);
      return;
    }

    await monitorClusters();
  }, config.intervalSeconds * 1000);

  process.on("SIGINT", () => {
    console.log("\n\nStopping monitoring...");
    monitoring = false;
    clearInterval(intervalId);
    process.exit(0);
  });
}

startMonitoring();
```

## Configuration File

Create a `config.json` file in the same directory as your script with the following structure:

```json
{
  "intervalSeconds": 10,
  "graphqlUrl": "https://api.studio.thegraph.com/query/71118/ssv-network-hoodi/version/latest",
  "subgraphApiKey": "YOUR_SUBGRAPH_API_KEY_HERE",
  "clusters": [
    {
      "name": "Cluster 1",
      "accountAddress": "0x58410Bef803ECd7E63B23664C586A6DB72DAf59c",
      "operatorIds": ["108", "111", "173", "180"],
      "clusterId": "0x0577a0d29662e048aab8d4ff3e8883a10b67a489-108-111-173-180"
    },
    {
      "name": "Cluster 2",
      "accountAddress": "0x58410Bef803ECd7E63B23664C586A6DB72DAf59c",
      "operatorIds": ["108", "111", "173", "180"],
      "clusterId": "0x0577a0d29662e048aab8d4ff3e8883a10b67a489-108-111-173-180"
    }
  ]
}
```

## Prerequisites

* [_Node.js_](https://nodejs.org/en) must be installed on the system

## How to Run

1. Create a file called `monitor-clusters.js`
2. Copy the script code above into this file
3. Create a `config.json` file in the same directory with your cluster configuration (see example above)
4. Install the required dependencies:

    ```bash
    npm i node-fetch
    ```

5. Run the script with node:

    ```bash
    node monitor-clusters.js
    ```

6. The script will continuously monitor your clusters at the interval specified in `config.json`. Press `Ctrl+C` to stop monitoring.

## Example Output

When you run the script, you'll see output similar to the following:

```bash
$ node monitor-clusters.ts

Starting cluster monitoring...
Interval: 10 seconds
Clusters to monitor: 2
Press Ctrl+C to stop

============================================================
Monitoring at 2025-11-06T16:13:06.689Z
============================================================

[Cluster 1]
  Validators: 1
  Network Fee: 5364995440000000
  Operator Fee: 30902704629999870
  Cluster Balance: 29963732299930000000

[Cluster 2]
  Validators: 1
  Network Fee: 5364995440000000
  Operator Fee: 30902704629999870
  Cluster Balance: 29963732299930000000

============================================================
Monitoring at 2025-11-06T16:13:17.642Z
============================================================

[Cluster 1]
  Validators: 1
  Network Fee: 5365378080000000
  Operator Fee: 30904908659999360
  Cluster Balance: 29963729713260000000

[Cluster 2]
  Validators: 1
  Network Fee: 5365378080000000
  Operator Fee: 30904908659999360
  Cluster Balance: 29963729713260000000
```

:::info
If you get a warning, or an error similar to this:

```
(node:232985) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
```

Just make sure to edit the `package.json` file and add a line with `"type": "module"` to it, like in the example below:

```json
{
  "dependencies": {
    "node-fetch": "^3.3.2"
  },
  "type": "module"
}
```
:::
