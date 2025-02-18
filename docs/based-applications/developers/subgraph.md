---
title: Based Application Subgraph
sidebar_label: Based Application Subgraph
---

# Based Application Subgraph

All of the data for a based application is stored in the Based Application Subgraph.

## Querying the Subgraph

The subgraph can be queried at this API: `https://api.studio.thegraph.com/query/71118/based-applications-ssv-holesky/version/latest`

## Example Queries

### Get Strategy Token Weights Input

Retrieves strategy obligations, balances, and delegator information for a bapp:

```graphql
query getStrategyTokenWeightsInput {
  bapp(id: "0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5c") {
    bAppTokens {
      sharedRiskLevel
      token
      totalObligatedBalance
    }
    strategies {
      obligations {
        obligatedBalance
        token
        percentage
      }
      strategy {
        id
        balances {
          balance
          token
          riskValue
        }
        owner {
          delegators {
            percentage
            delegator {
              id
            }
          }
        }
      }
    }
  }
}
```

### Get Bapp Metadata URI

Retrieves the metadata URI for a specific bapp:

```graphql
query getBappMetadataURI {
  bapp(id: "YOUR_BAPP_ADDRESS") {
    metadataURI
  }
}
```

### Get All Bapps Metadata URIs

Retrieves metadata URIs for all bapps:

```graphql
query getAllBappsMetadataURIs {
  bapps {
    metadataURI
  }
}
```

### Get Strategy Obligated Balances

Retrieves all strategy obligated balances for a bapp:

```graphql
query getAllStrategyObligatedBalancesForBapp {
  bapp(id: "YOUR_BAPP_ADDRESS") {
    strategies {
      strategy {
        balances {
          balance
          token
        }
      }
    }
  }
}
```

### Get Deposited Balances For a Strategy

Retrieves list of delegators and their percentages for a strategy:

```graphql
query getDepositedBalancesForStrategy {
  strategy(id: "2") {
    deposits {
      contributor {
        id
      }
      depositAmount
      token
    }
  }
}
```

### Get Account Strategies

Retrieves all strategies an account has deposited to:

```graphql
query getAllStrategiesDepositedTo {
  account(id: "YOUR_ACCOUNT_ADDRESS") {
    strategyTokenBalances {
      strategy {
        id
        balances {
          balance
          token
        }
      }
    }
  }
}
```

### Get Account Delegated Percentage

Retrieves the total delegated percentage for an account:

```graphql
query getTotalDelegatedPercentageForAccount {
  account(id: "YOUR_ACCOUNT_ADDRESS") {
    totalDelegatedPercentage
  }
}
```

### Get All Strategies For Bapp

Retrieves all strategy IDs associated with a bapp:

```graphql
query getAllStrategiesForBapp {
  bapp(id: "YOUR_BAPP_ADDRESS") {
    strategies {
      strategy {
        strategyId
      }
    }
  }
}
```

### Get Account Strategies and Balances

Retrieves all strategies and their balances for an account:

```graphql
query getAllStrategiesForAccount {
  account(id: "YOUR_ACCOUNT_ADDRESS") {
    strategies {
      id
      balances {
        balance
        token
      }
    }
  }
}
```