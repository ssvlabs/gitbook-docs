---
description: Understanding SSV Network clusters
sidebar_label: 'Cluster Concepts'
sidebar_position: 2
---

# Cluster Concepts

Cluster is a unique set of operators managing Distributed Validators, specific to an owner account/address. For example, an owner address X can't create 2 clusters with the same set of operators.

### Read more about Clusters
- [Cluster Creation](./cluster-creation.md)
- [Cluster Balance](./cluster-balance.md)
  - [Effective Balance Accounting](effective-balance.md)
  - [Cluster Reactivation](./reactivation.md)
- [Update Operators](./update-operators.md)
- [Operators Performance](../performance/README.md)

### Example of an account with 2 Clusters
- Cluster #1 manages 3 validators and is operated by operators 1,2,3,4,5,6,7
- Cluster #2 manages 1 validator and is operated by operators 1,2,3,4

![Clusters](/img/clusters-1.avif)