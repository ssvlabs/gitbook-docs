---
description: Effective Balance Oracles described and explained
sidebar_position: 2
---

# Effective Balance Oracles

## Introduction 

Effective Balance Oracles are responsible for tracking validator effective balances on the beacon chain and enable the protocol to keep [its on-chain accounting](/stakers/clusters/effective-balance.md) aligned with real validator state as balances evolve over time.

## Overview

SSV stakers delegate their staking weight to oracle operators, using stake as voting power. The oracle set is then composed of the operators with the highest delegated stake, allowing the set to evolve and rotate over time based on staker preferences and observed performance.

Stake-based delegation is a critical component of this design. Effective Balance Oracles directly influence protocol accounting and liquidation behavior, making correctness and reliability essential. By tying oracle selection to delegated stake, the protocol ensures that oracle operators are economically aligned with the system: operators with higher delegated stake are incentivized to behave correctly, while stakers can reallocate delegation away from underperforming or untrusted oracles.

## Effective Balance Updates

### Cluster Balance Snapshots

Effective Balance Oracles continuously track validator effective balances on the beacon chain. At defined intervals, they take a snapshot of all validator balances, aggregate them per cluster, and construct a Merkle tree representing the effective balances of all clusters at that snapshot.

To reach consensus on this snapshot, each oracle independently commits the Merkle root representing this snapshot. Once a threshold of oracle commitments is reached, the snapshot is accepted by the protocol as the authoritative and accurate view of effective balances for that point in time. This threshold-based mechanism ensures both correctness of the data and that no single oracle can dictate balance updates.

### Cluster Balance Updates

Once a snapshot is accepted, cluster-level effective balances can be updated on-chain by submitting a proof derived from the committed Merkle tree for a specific cluster.

When a cluster’s effective balance is updated, the protocol updates all related accounting based on the new value. This affects:
- Cluster runway calculations 
- Network and operator fee accruals tied to the amount of effective balance being managed
- If an update causes a cluster to fall below liquidation thresholds, the cluster can be liquidated as part of the same process.