---
sidebar_label: 'SSV Subgraph'
sidebar_position: 1
---

# SSV Subgraph

The Graph is a decentralized indexing protocol for the Ethereum (and other EVM-compatible) blockchains. It allows to process data produced by smart contracts and apply logic to it, making it easier and faster to query.

The Graph can be used for querying data related to the SSV protocol and develop applications on top of it.

:::info New to GraphQL?
Before diving into subgraph queries, get familiar with GraphQL basics: [Learn GraphQL](https://graphql.org/learn/)
:::

A Subgraph that implements the necessary logic to index all the events emitted by the SSV smart contract has been developed, and the code is open source, you can [find it here](https://github.com/ssvlabs/ssv-subgraph).

## Examples

We prepared examples of queries, **it's likely** the **query you need already exists**. A series of examples of the most useful queries and the data accessible via the Subgraph is available at the [Subgraph Examples subpage](subgraph-examples.md).

## Querying SSV Protocol smart contract data

Currently, there are two official Subgraphs deployed:
- [Ethereum Mainnet](https://thegraph.com/explorer/subgraphs/7V45fKPugp9psQjgrGsfif98gWzCyC6ChN7CW98VyQnr?view=Playground\&chain=arbitrum-one)
- [Hoodi Testnet](https://thegraph.com/explorer/subgraphs/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh?view=Query&chain=arbitrum-one)

There are a few ways to access SSV smart contract data through The Graph. Below you will see how to do it via [The Graph interface](#subgraph-playground-user-interface) or [Query API](#query-api).

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
