---
title: Configuring MEV
sidebar_position: 4
---

This guide outlines the necessary steps required to configure MEV within your SSV node to enable operators to participate in proposing MEV blocks for the validators they manage.

## Enable MEV in Beacon Client

Enable MEV by connecting to the [Builders API](https://github.com/ethereum/builder-specs) from your Beacon client.

This integration will grant you access to a network of block builders, who collaborate with MEV searchers to produce the most valuable blocks that validators can propose.

Follow the setup guidelines for configuring MEV on your preferred client:

* [Prysm](https://docs.prylabs.network/docs/advanced/builder)
* [Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/builders.html?highlight=mev#maximal-extractable-value-mev)
* [Nimbus](https://nimbus.guide/external-block-builder.html)
* [Lodestar](https://chainsafe.github.io/lodestar/usage/mev-integration/)

:::info
For reference, the [ETHStaker](https://github.com/eth-educators/ethstaker-guides/blob/main/MEV-relay-list.md) community provides a list of MEV relays and their corresponding endpoints.
:::

## Enable MEV in SSV node

Builder proposals are managed by Beacon Client. So once you've done the previous step, your SSV node will collaborate with MEV searchers.

## Considerations for MEV Relays Selection

In ssv.network, every time a validator is assigned a block proposal, one operator within its cluster is selected to lead the proposal of the block. Given that MEV-enabled blocks are broadcasted through relays, only operators supporting the relay chosen by the leader can broadcast it to the network.

Consequently, a greater correlation between the relays supported by operators in a cluster enhances the number of operators capable of broadcasting the block proposal, ultimately enhancing the liveness of the proposal duty.

* **Full Relay Correlation**: When all operator nodes support the same relays, every node would broadcast the block, enhancing liveness beyond the industry standard.
* **Partial Relay Correlation**: In cases where overlap is lacking, only operator nodes supporting the relay chosen by the operator leading the proposal will broadcast the proposal.
* **No MEV Support**: In instances where a non-MEV operator leads the proposal of the block, the proposal would proceed but without any MEV rewards (vanilla block).

Therefore, it is recommended to support as many relays as possible in your operator setup. The more correlation among supported relays, the higher the liveness for block proposal duties and the greater favorability among stakers during operator selection. This approach promotes optimal network performance and alignment with staker expectations.

## Showcase Supported Relays

It's crucial for the network to display the relays supported by operators. The availability of this information aids the network's stability by enabling stakers to use it when considering how to form their clusters, thereby preventing the problems highlighted earlier. Additionally, this practice enhances the operator's likelihood of being selected by stakers.

### How to show supported relays in operator metadata

1. Head over to the [Operators Dashboard](https://app.ssv.network/operators) in the SSV webapp:

![Operators Dashboard](/img/configure-mev-1.avif)

2. Navigate to the operator page and click the Edit Details:

![Operator Page](/img/configure-mev-2.avif)

3. Choose from the "MEV relays" list and click Update when done.

![Edit Metadata Interface](/img/configure-mev-3.avif)

4. Sign the signature request from the Web3 wallet used to sign-in (Metamask, in this case). This is needed to confirm ownership, it is not an actual on-chain transaction (no gas fees required).

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-mev-4.png" 
    alt="Signature Request" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

5. Success! The new operator metadata should be set and will be visible to everyone in the network.
