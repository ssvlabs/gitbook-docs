# Automated Cluster Balance Monitoring

This script automatically monitors the balance of multiple clusters on the SSV network at regular intervals. It calculates the current balance of each cluster by:

* Querying the subgraph for the relevant data (see the [Subgraph Examples](/developers/tools/ssv-subgraph/subgraph-examples) page for more information)
* Using these values to compute the current cluster balance for each specified cluster, outputting the amount in SSV

Details on the formulas used can be found in the documentation page related to [Cluster Balance](/stakers/clusters/cluster-balance).

## Cluster Balance Calculation

The core calculation function that computes the cluster balance:

```typescript
export const getClusterBalance = async (
  config: ConfigReturnType,
  { operatorIds }: GetClusterBalanceArgs,
) => {
  const query = await config.api.getClusterBalance({
    daoAddress: config.contractAddresses.setter,
    operatorIds: operatorIds.map(String),
    clusterId: createClusterId(config.walletClient.account!.address, operatorIds),
  })

  if (!query.cluster || !query.daovalues || !query._meta) {
    throw new Error('Could not fetch cluster balance')
  }

  const cumulativeNetworkFee =
    BigInt(query.daovalues.networkFeeIndex) +
    (BigInt(query._meta.block.number) - BigInt(query.daovalues.networkFeeIndexBlockNumber)) *
      BigInt(query.daovalues.networkFee) -
    BigInt(query.cluster.networkFeeIndex) * 10000000n

  const cumulativeOperatorFee = query.operators.reduce(
    (acc, operator) => {
      return (
        acc +
        BigInt(operator.feeIndex) +
        (BigInt(query._meta!.block.number) - BigInt(operator.feeIndexBlockNumber)) *
          BigInt(operator.fee)
      )
    },
    -BigInt(query.cluster.index) * 10000000n,
  )

  const operatorsFee = query.operators.reduce((acc, operator) => acc + BigInt(operator.fee), 0n)

  const calculatedClusterBalance =
    BigInt(query.cluster.balance) -
      (cumulativeNetworkFee + cumulativeOperatorFee) * BigInt(query.cluster.validatorCount) || 1n

  const burnRate =
    (operatorsFee + BigInt(query.daovalues.networkFee)) * BigInt(query.cluster.validatorCount) || 1n

  const mLc = BigInt(query.daovalues.minimumLiquidationCollateral)
  const LC = bigintMax(mLc, burnRate * BigInt(query.daovalues.liquidationThreshold))
  const runwaySSV = calculatedClusterBalance - LC
  const operationalRunway = runwaySSV / burnRate / globals.BLOCKS_PER_DAY

  return {
    balance: calculatedClusterBalance,
    operationalRunway,
  }
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

/**
 * Replaced with Script #1's balance logic, adapted to Script #2's data shape + return shape.
 * - Uses BigInt to avoid precision loss.
 * - Keeps Script #2's expected return keys: networkFee, operatorFee, clusterBalance, validatorCount.
 * - Computes the same "cumulative network/operator fee" and "effective cluster balance" as Script #1.
 */
function calculateClusterBalance(responseData: any, cluster: ClusterConfig) {
  if (responseData.errors) {
    console.error(`[${cluster.name}] GraphQL errors:`, responseData.errors);
    return null;
  }

  if (!responseData.data) {
    console.error(`[${cluster.name}] No data in response`);
    return null;
  }

  if (!responseData.data._meta?.block?.number) {
    console.error(`[${cluster.name}] _meta.block.number is missing`);
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

  const toBigInt = (v: any, label: string): bigint => {
    if (typeof v === "bigint") return v;
    if (typeof v === "number") return BigInt(v);
    if (typeof v === "string" && v.trim() !== "") {
      return BigInt(v);
    }
    throw new Error(`[${cluster.name}] Invalid ${label}: ${String(v)}`);
  };

  const blockNumber = toBigInt(responseData.data._meta.block.number, "_meta.block.number");
  const daoValues = responseData.data.daovalues;
  const clusterData = responseData.data.cluster;
  const operators = responseData.data.operators as Array<any>;

  const networkFee =
    toBigInt(daoValues.networkFeeIndex, "daovalues.networkFeeIndex") +
    (blockNumber -
      toBigInt(daoValues.networkFeeIndexBlockNumber, "daovalues.networkFeeIndexBlockNumber")) *
      toBigInt(daoValues.networkFee, "daovalues.networkFee") -
    toBigInt(clusterData.networkFeeIndex, "cluster.networkFeeIndex") * 10_000_000n;

  const operatorFee = operators.reduce(
    (acc: bigint, operator: any) => {
      return (
        acc +
        toBigInt(operator.feeIndex, "operator.feeIndex") +
        (blockNumber - toBigInt(operator.feeIndexBlockNumber, "operator.feeIndexBlockNumber")) *
          toBigInt(operator.fee, "operator.fee")
      );
    },
    -toBigInt(clusterData.index, "cluster.index") * 10_000_000n,
  );

  const validatorCount = toBigInt(clusterData.validatorCount, "cluster.validatorCount");
  const clusterBalance =
    toBigInt(clusterData.balance, "cluster.balance") - (networkFee + operatorFee) * validatorCount;

  return {
    networkFee,      // BigInt
    operatorFee,     // BigInt
    clusterBalance,  // BigInt (effective balance after accrued fees)
    validatorCount,  // BigInt
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

```typescript
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
