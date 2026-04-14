---
title: Configuring MEV
sidebar_position: 2
---

This guide outlines the necessary steps required to configure MEV within your SSV node to enable operators to participate in proposing MEV blocks for the validators they manage.

Enabling MEV will grant you access to a network of block builders, who collaborate with MEV searchers to produce the most valuable blocks that validators can propose.

On a high level, the process consists of 4 steps:
1. [Enable MEV in Beacon Client](#enable-mev-in-beacon-client)
2. [Enable MEV in SSV Node](#enable-mev-in-ssv-node)
3. [Add Relays to your MEV client](#considerations-for-mev-relays-selection)
4. [Showcase Supported Relays](#showcase-supported-relays)

## Enable MEV in Beacon Client

Enable MEV by connecting to the [Builders API](https://github.com/ethereum/builder-specs) from your Beacon client.

Follow the setup guidelines for configuring MEV on your preferred client:

* [Prysm](https://www.offchainlabs.com/prysm/docs/configure-prysm/builder/)
* [Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/advanced_builders.html?highlight=mev#maximal-extractable-value-mev)
* [Nimbus](https://nimbus.guide/external-block-builder.html)
* [Lodestar](https://chainsafe.github.io/lodestar/run/beacon-management/mev-and-builder-integration)

## Enable MEV in SSV Node

Builder proposals are managed by Beacon Client. So once you've done the previous step, your SSV node will collaborate with MEV searchers.

## Considerations for MEV Relays Selection

**TL;DR:** Support as many relays as possible. Greater overlap between operators improves block proposal reliability and makes your setup more attractive to stakers.

:::info
For reference, the ETHStaker community provides a [list of recommended MEV relays and their endpoints](https://github.com/eth-educators/ethstaker-guides/blob/main/MEV-relay-list).
:::

In ssv.network, when a validator is assigned a block proposal, one operator in the cluster acts as the leader. Since MEV-enabled blocks are delivered through relays, only operators that support the selected relay can broadcast the block.

The more overlap there is between the relays supported by operators in a cluster, the more operators can participate in broadcasting—improving reliability (liveness) of the proposal.

* **Full Relay Correlation**: All operators support the same relays → every node can broadcast the block, maximizing liveness.
* **Partial Relay Correlation**: Only some operators share relay support → only those can broadcast.
* **No MEV Support**: If the leader doesn’t support MEV → the block is still proposed, but without MEV rewards.

## Showcase Supported Relays

It's crucial for the network to display the relays supported by operators. The availability of this information aids the network's stability by enabling stakers to use it when considering how to form their clusters, thereby preventing the problems highlighted earlier. **Additionally, this practice enhances the operator's likelihood of being selected by stakers**.

Follow ["How to update Operator Metadata" Guide](/operators/operator-management/setting-operator-metadata) to showcase supported relays.