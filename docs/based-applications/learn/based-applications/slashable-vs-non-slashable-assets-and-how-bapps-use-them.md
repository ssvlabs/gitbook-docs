---
sidebar_label: 'Slashable vs. Non-slashable Assets and How bApps Use Them'
sidebar_position: 2
---

# Slashable vs. Non-slashable Assets and How bApps Use Them

Slashable and non-slashable assets refer to the potential risk of losing part or all of an asset’s value due to certain actions or behaviors, particularly in decentralized networks like blockchain.

Slashable assets are those that can be penalized or "slashed" under specific conditions, typically due to misbehavior, such as a validator failing to fulfill its duties or acting maliciously. In Proof-of-stake (PoS) systems, slashing is a mechanism to ensure network security and accountability, incentivizing participants to act honestly and correctly. For instance, in a system like Ethereum, validators can lose a portion of their staked assets if they attempt to double-sign or act in a way that harms the network.

On the other hand, non-slashable assets cannot be penalized directly. These assets are typically not involved in any accountability mechanism, so their value is unaffected by participant actions or misbehaviors within the network. Non-slashable assets can have a unique role in Sybil-attack (CtA, [see above](../the-bootstrap-problem/)). In fact, under a single validator slashing condition in Ethereum, only ~1ETH is actually slashed (3.125% of the total stake).

Other protocols, like Eigenlayer, [made the distinction](https://www.blog.eigenlayer.xyz/introducing-the-eigenlayer-security-model/) between unique stake and shared stake. Unique stake refers to assets exclusively staked for a specific validator or service, where the slashing risk applies only to that specific instance. Conversely, shared stake involves assets being used across multiple services or validators, spreading the risk and thus potentially mitigating the chance of slashing affecting all staked assets. This mechanism offers flexibility and can enhance security while ensuring that assets can be used effectively without exposing them entirely to slashing risks from any single service or validator.

Based applications will be able to leverage both slashable and non-slashable forms of assets. Each asset type possesses distinct security properties and, as such, may play different roles in the protocol’s design and operation.