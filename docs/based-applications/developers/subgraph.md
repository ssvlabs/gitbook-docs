---
title: Based Application Subgraph
sidebar_label: Based Application Subgraph
sidebar_position: 4
---

# Based Application Subgraph

The Graph is a decentralized indexing protocol for the Ethereum (and other EVM-compatible) blockchains. It allows to process data produced by smart contracts and apply logic to it, making it easier and faster to query.

The Graph can be used for querying data related to the SSV protocol and develop applications on top of it.

:::info
### New to GraphQL?

Before diving into subgraph queries, get familiar with GraphQL basics: [Learn GraphQL](https://graphql.org/learn/)
:::

A Subgraph that implements the necessary logic to index all the events emitted by the SSV smart contract has been developed, and the code is open source, you can [find it here](https://github.com/ssvlabs/ssv-subgraph).

All of the data for a based application is stored in the Based Application Subgraph.

## Querying SSV Protocol smart contract data

Currently, only the [Hoodi Testnet](https://thegraph.com/explorer/subgraphs/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh?view=Query&chain=arbitrum-one) subgraph has Based Applications data, as Based Applications are currently still on testnet phase.

There are a few ways to access smart contract data through The Graph.

### Subgraph Playground user interface

First of all, you can access the Subgraph page on the Graph Explorer, and use it to experiment and prototype queries using the provided Playground.

![Subgraph Playground](/img/subgraph-1.png)

It's possible to access the underlying GraphQL schema, by clicking the _folder icon_ on the right of the playground. This is self-documenting, similarly (and more) to Swagger for a RESTful API, but it's also more powerful, since it will allow you to build queries through simple point-and-click interactions.

Once you are satisfied with the query you built, click on the _Play_ button in the center to launch it and obtain the result.

![Subgraph Playground](/img/subgraph-2.png)


Further documentation about the schema can be accessed by clicking on the _book icon_ on the right of the Playground window.

### Query API

The screenshot below shows the lower section of the _Query_ page.

![Subgraph Playground](/img/subgraph-3.png)

It provides instructions on how to query this subgraph programmatically, using the public endpoint and an API-key. You can generate your own API key by visiting the [Subgraph Studio page](https://thegraph.com/studio/apikeys/), and selecting API Keys at the top. The free plan allows 100 thousand queries per month, which should be plenty for your development needs.

Delving deeper into programmatically querying the endpoint: in order do this, you would need to know exactly the query you want to perform, and then perform a `POST` request to the provided endpoint, adding the API key as a header to the request.

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