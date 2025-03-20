---
sidebar_label: 'SSV Subgraph'
sidebar_position: 1
---

# SSV Subgraph

The Graph is a decentralized indexing protocol for the Ethereum (and other EVM-compatible) blockchains. It allows to process data produced by smart contracts and apply logic to it, making it easier and faster to query.

The Graph can be used for querying data related to the SSV protocol and develop applications on top of it.

:::info
### New to GraphQL?

Before diving into subgraph queries, get familiar with GraphQL basics: [Learn GraphQL](https://graphql.org/learn/)
:::

A Subgraph that implements the necessary logic to index all the events emitted by the SSV smart contract has been developed, and the code is open source, you can [find it here](https://github.com/ssvlabs/ssv-subgraph).

## Examples

A series of examples of the most useful queries and the data accessible via the Subgraph is available at the [Subgraph Examples subpage](subgraph-examples.md).

## Querying SSV Protocol smart contract data

Currently, there are two official Subgraphs deployed, one for [Ethereum Mainnet](https://thegraph.com/explorer/subgraphs/7V45fKPugp9psQjgrGsfif98gWzCyC6ChN7CW98VyQnr?view=Playground\&chain=arbitrum-one), and another one for [Holesky testnet](https://thegraph.com/explorer/subgraphs/2fc6xRiZ2PaPYE2fBRZ1fB1SFS3PojvCXB8fFguXQZk6?view=Overview\&chain=arbitrum-one). **Subgraphs for Hoodi will be available soon.**

There are a few ways to access SSV smart contract data through The Graph.

### Subgraph Playground user interface

First of all, you can access the Subgraph page on the Graph Explorer, and use it to experiment and prototype queries using the provided Playground.

For example, head over to [this page to access the Playground of the Holesky Subgraph](https://thegraph.com/explorer/subgraphs/2fc6xRiZ2PaPYE2fBRZ1fB1SFS3PojvCXB8fFguXQZk6?view=Playground\&chain=arbitrum-one).

![Subgraph Playground](/img/subgraph-1.avif)

It's possible to access the underlying GraphQL schema, by clicking the _folder icon_ on the right of the playground. This is self-documenting, similarly (and more) to Swagger for a RESTful API, but it's also more powerful, since it will allow you to build queries through simple point-and-click interactions.

Once you are satisfied with the query you built, click on the _Play_ button in the center to launch it and obtain the result.

![Subgraph Playground](/img/subgraph-2.avif)


Further documentation about the schema can be accessed by clicking on the _book icon_ on the right of the Playground window.

### Developer API

:::info
The developer API is rate limited and should only be used for infrequent queries that are not data heavy, like a single owner nonce, or the cluster snapshot information for a single cluster.
:::

The developer API is typically not publicly accessed, but it is provided below, to foster development of applications built on the SSV protocol. Here are the Developer endpoints for the two deployed Subgraphs:

#### Developer API for Ethereum Mainnet SSV Subgraph

```
https://api.studio.thegraph.com/query/71118/ssv-network-ethereum/version/latest
```

#### Developer API for Holesky testnet SSV Subgraph

```
https://api.studio.thegraph.com/query/71118/ssv-network-holesky/version/latest
```

Despite being rate limited, this endpoint should be sufficient for every development use case.

In order to use it, you would need to know exactly the query you want to perform, and then perform a `POST` request to the provided endpoint.

Furthermore, a simple project aimed at providing an example of how to use the subgraph to substitute the [`ssv-scanner`](/developers/tools/ssv-scanner) tool can be found in this repository: [SSV Scanner Demo Repository](https://github.com/raekwonIII/ssv-scanner-demo)

### Production API

As previously mentioned, the Developer API is accessible to anyone for free, but it's rate limited. As such, it should be used for sporadic, light requests.

For demanding and very frequent requests, you should be using the Production API, for which the data is provided by decentralized indexers, who get rewarded by the protocol tokenomics for providing the service.

In order to use this endpoint, head over to the Subgraph's page and click on the _Query_ button.

![Subgraph Playground](/img/subgraph-3.avif)

As you can see, the provided URL requires an API key, follow the documentation in the page, to find out how to create one.

Once you have obtained your API key, you can essentially follow the instructions in the previous section, only substituting the URL in the examples with your new endpoint.
