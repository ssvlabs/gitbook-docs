# Cluster Balance Script

The script below calculates the current balance of a given cluster, through two actions, mainly:

* Query the subgraph for the relevant data (see the [Subgraph Examples](../tools/ssv-subgraph/subgraph-examples) page for more information)
* Use these values to compute the current cluster balance for the specified cluster, outputting the amount in SSV

Details on the formulas used can be found in the documentation page related to [Cluster Balance](../../stakers/clusters/cluster-balance).

```javascript
// Import the fetch function from node-fetch
import fetch from "node-fetch";

// Define the GraphQL endpoint URL
const url = "https://api.studio.thegraph.com/query/71118/ssv-network-holesky/version/latest";

// Define the GraphQL query - Update operators and account address to query different clusters
const query = `{
  _meta {
    block {
      number
    }
  }
  daovalues(id: "0x38A4794cCEd47d3baf7370CcC43B560D3a1beEFA") {
    networkFee
    networkFeeIndex
    networkFeeIndexBlockNumber
  }
  # Operator IDS are hardcoded in this example
  operators(where: {id_in: ["11", "13", "24", "30"]}) {
    fee
    feeIndex
    feeIndexBlockNumber
  }
  # The cluster ID is hardcoded in this example
  cluster(id: "0xaa184b86b4cdb747f4a3bf6e6fcd5e27c1d92c5c-11-13-24-30") {
    validatorCount
    networkFeeIndex
    index
    balance
  }
}`

// Function to fetch data
async function fetchData() {
  try {
    // Make the HTTP request to the GraphQL endpoint
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    // Parse the response data
    const responseData = await response.json();

    // networkFee = nfip + (bN - nfbp) * nf - nfic * 10000000
    // note: the 10^7 multiplier is due to the networkFeeIndex being "shrunk" to a uint64 in the smart contract to save space
    const networkFee = parseInt(responseData.data.daovalues.networkFeeIndex) + (responseData.data._meta.block.number - parseInt(responseData.data.daovalues.networkFeeIndexBlockNumber)) * parseInt(responseData.data.daovalues.networkFee) - responseData.data.cluster.networkFeeIndex * 10000000
    console.log("Network Fee:", networkFee)

    // operatorFee = (ofin + (bn - ofbn) * ofn) - ofc * 10000000
    // note: the 10^7 multiplier is due to the operator fee index being "shrunk" to a uint64 in the smart contract to save space
    // start with negative cluster index, instead of 0, to avoid initialize it as 0 and subtracting it at the end
    let operatorFee = -responseData.data.cluster.index * 10000000;

    for (let operator of responseData.data.operators) {
        operatorFee += parseInt(operator.feeIndex) + (responseData.data._meta.block.number - parseInt(operator.feeIndexBlockNumber)) * parseInt(operator.fee)
    }
    console.log("Operator Fee:", operatorFee)
    
    // balance = cluster balance - (networkfee + operatorfee) * nv
    const clusterBalance = responseData.data.cluster.balance - (networkFee + operatorFee) * responseData.data.cluster.validatorCount
    console.log("Cluster Balance: ", clusterBalance)

  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching data:", error);
  }
}

// Run the fetchData function
fetchData();
```

To run the script:

_Prerequisite:_ [_Node.js_](https://nodejs.org/en) _must be installed on the system_

1. Create a file called fetchData.js
2. Copy the code above into this file
3.  Install the fetch module:&#x20;

    ```bash
    npm i node-fetch
    ```
4.  Run the script with node :

    ```bash
    node fetchData.js
    ```

:::info
If you get a warning, or an error similar to this:

```
(node:232985) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
```

Just make sure to edit the `package.json` file and a line with`"type": "module"` to it, like in the example below:\`\`\`json

```json
{
  "dependencies": {
    "node-fetch": "^3.3.2"
  },
  "type": "module"
}
```
:::
