---
description: Understanding SSV Network clusters
sidebar_label: 'Cluster Concepts'
sidebar_position: 4
---

# Cluster Concepts

Distributed Validators are managed within Clusters - the group of operators that were selected to operate them.
Clusters are unique to each account and are used for fees payment facilitation and management purposes.

:::tip ETH Clusters
All new clusters use **native ETH** for fee payments. Legacy SSV clusters can [migrate to ETH](../cluster-management/migrating-to-eth-clusters.md) for full functionality.
:::

Example of an account with 2 clusters:
- Cluster #1 manages 3 validators and is operated by operators 1,2,3,4,5,6,7
- Cluster #2 manages 1 validator and is operated by operators 1,2,3,4

![Clusters](/img/clusters-1.avif)

**Other related concepts described in this section:**
- [Cluster Balance](./cluster-balance.md)
- [Cluster Reactivation](./reactivation.md)