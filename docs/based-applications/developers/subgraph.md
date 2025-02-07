---
title: Based Application Subgraph
sidebar_label: Based Application Subgraph
---

# Based Application Subgraph

All of the data for a based application is stored in the [Based Application Subgraph](https://api.studio.thegraph.com/query/53804/ssv-bapps-subgraph/version/latest/graphql?query=query+MyQuery+%7B%0A++__typename+%23%23+Placeholder+value%0A%7D).

## Querying the Subgraph

The subgraph can be queried at: `https://api.studio.thegraph.com/query/53804/ssv-bapps-subgraph/version/latest/graphql`

## Example Queries

### Get Participant Weight Data

Retrieves strategy obligations, balances, and delegator information for a bapp:

```graphql
query getParticipantWeightDataInput {
  bapp(id: "1") {
    strategies {
      obligations {
        token
        percentage
      }
      strategy {
        balances {
          balance
          token
        }
        id
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
    bAppTokens {
      sharedRiskLevel
      token
    }
  }
}
```

### Get Bapp Metadata URI

Retrieves the metadata URI for a specific bapp:

```graphql
query getBappMetadataURI {
  bapp(id: "1") {
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
  bapp(id: "1") {
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