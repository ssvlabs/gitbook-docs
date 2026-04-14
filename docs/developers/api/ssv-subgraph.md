---
sidebar_label: 'SSV Subgraph'
sidebar_position: 1
---

# SSV Subgraph

The Graph is a decentralized indexing protocol for Ethereum and other EVM-compatible blockchains. It processes smart contract data and makes it easier to query efficiently.

You can use it to query SSV Network data and build applications on top of the protocol.

:::info New to GraphQL?
Before diving into subgraph queries, get familiar with GraphQL basics: [Learn GraphQL](https://graphql.org/learn/)
:::

The SSV subgraph indexes events emitted by the SSV smart contracts. Its source code is open source and available in the [ssv-subgraph repository](https://github.com/ssvlabs/ssv-subgraph).

## Examples

We prepared a set of example queries, and the one you need may already be available. See the [Subgraph Examples](subgraph-examples) page for common query patterns and accessible data.

## Querying SSV Protocol smart contract data

Currently, there are two official Subgraphs deployed:
- [Ethereum Mainnet](https://thegraph.com/explorer/subgraphs/7V45fKPugp9psQjgrGsfif98gWzCyC6ChN7CW98VyQnr?view=Playground\&chain=arbitrum-one)
- [Hoodi Testnet](https://thegraph.com/explorer/subgraphs/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh?view=Query&chain=arbitrum-one)

There are a few ways to access SSV smart contract data through The Graph. Below, you can see how to use either [The Graph interface](#subgraph-playground-user-interface) or the [Query API](#query-api).

### Subgraph Playground user interface

You can open the subgraph page in Graph Explorer and use the Playground to experiment with and prototype queries.

![Subgraph Playground](/img/subgraph-1.png)

You can access the underlying GraphQL schema by clicking the _folder icon_ on the right side of the Playground. Like Swagger for REST APIs, it is self-documenting, but it also lets you build queries through simple point-and-click interactions.

When your query is ready, click the _Play_ button in the center to run it and view the result.

![Subgraph Playground](/img/subgraph-2.png)


For more schema documentation, click the _book icon_ on the right side of the Playground.

### Query API

The screenshot below shows the lower section of the _Query_ page.

![Subgraph Playground](/img/subgraph-3.png)

It includes instructions for querying the subgraph programmatically through the public endpoint with an API key. You can generate your own API key from the [Subgraph Studio page](https://thegraph.com/studio/apikeys/) by selecting **API Keys** at the top. The free plan allows 100,000 queries per month, which is usually enough for development.

To query the endpoint programmatically, prepare the exact GraphQL query you want to run, then send it in a `POST` request to the provided endpoint with your API key in the request headers.
