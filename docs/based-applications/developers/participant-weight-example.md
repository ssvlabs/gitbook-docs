---
sidebar_label: 'Participant Weight Example'
sidebar_position: 3
unlisted: true
---

# Participant Weight Script

The script below uses the logic described in the [related section of the Based Application Development page](based-application-depvelopment.md/#3-participant-weight), fetching the data from the Based Application Subgraph, and returns the Weight for all Strategies that have opted in to a given Based Application
   
```typescript
import fetch from "node-fetch";

// Define the GraphQL endpoint URL
const url = "https://api.studio.thegraph.com/query/53804/ssv-bapps-subgraph/version/latest";

// Define the GraphQL query - Update operators and account address to query different clusters
const query = `{
  bapp(id: "0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a") {
    # this is a mapping table, representing the many-to-many relationship between bapps and strategies
    strategies {
      obligations {
        token
        percentage
      }
      # this is the actual strategy entity
      strategy {
        balances {
          balance
          token
        }
        id
        owner {
          delegators {
            percentage
            id
          }
        }
      }
    }
    bAppTokens {
      sharedRiskLevel
      token
    }
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

   // ➡️ 1. **Gather Obligated Balances**
   // build a map that links each token with the mapping of a strategy and their related obligated balance
   let strategiesObligatedBalancesPerToken: Map<string, Map<number, number>> = new Map();

   // build the two separate mappings of obligations per token, balances per token
   // calculate the actual balance obligated for each token
   // and add the entry to the global mapping
   for (let strategy of response.data.data.bapp.strategies) {
      let obligationsPerToken: Map<string, number> = new Map(strategy.obligations.map(
         (obligation) => return [token, percentage]
      ))
      let balancesPerToken: Map<string, number> = new Map(strategy.strategy.balances.map(
         (obligation) => return [token, balance]
      ))

      obligationsPerToken.keys().map(
         (token) => {
            strategiesObligatedBalancesPerToken.set(token) = new Map([strategy.id, obligationsPerToken.get(token) * balancesPerToken.get(token)])
         }
      )
   }

   // ➡️ 2. **Sum Obligations**
   let totalBAppBalancePerToken: Map<string, number> = new Map();

   strategiesObligatedBalancesPerToken.entries().map(
      (token, strategyObligationsPerToken) => {
         totalBAppBalancePerToken.set(token) = strategyObligationsPerToken.values().reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      }
    )
   
   // ➡️ 3. **Calculate Risk**
   let riskPerTokenPerStrategy: Map<string, Map<number, number>>
   // ➡️ 4. **Compute Risk-Aware Weights**
   let cToken = 
   // ➡️ 5. **Gather Obligated Validator Balances**
   // ➡️ 6. **Combine into the Final Weight**





  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching data:", error);
  }
}

// Run the fetchData function
fetchData();
```