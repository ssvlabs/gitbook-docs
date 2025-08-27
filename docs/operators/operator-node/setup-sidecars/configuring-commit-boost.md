---
title: Configuring Commit-boost
sidebar_position: 4
unlisted: true
---

This guide outlines the necessary steps required to configure Commit-boost with your SSV node to enable operators to participate in MEV and commitments (e.g. preconfirmations). You can learn more about the concept and technical details on [Commit-boost documentation](https://commit-boost.github.io/commit-boost-client/overview). 

:::warning Potential Slashing
**If you have a commitment with a collateral**  - only use commit-boost when managing the whole cluster. If any of the nodes in a cluster will not follow your commitment, your collateral will be slashed.
:::

## Overview
To give you a short summary of the steps you'll need to take:
1. [Install Commit-boost client](#install-commit-boost-client)
2. [Choose relays](#choose-any-relays)
3. [Enable MEV in Beacon Client](#enable-mev-in-beacon-client)
4. [Choose any preconf/commitment (optional)](#choose-any-preconfcommitment-optional)

## Install Commit-boost client

The process is best described by the commit-boost team on [their documentation](https://commit-boost.github.io/commit-boost-client/get_started/overview). 

## Choose any relays

At this point, the commit-boost client acts the same way regular mev-boost would. Unless you're participating in any commitments/preconfirmations, you can choose any mev-boost compatible relays.

## Enable MEV in Beacon Client

Your mev-boost endpoint should be used by Beacon Client in the Builder endpoint variable. Make sure the endpoint and its port are accessible by your Beacon Client.

Follow the setup guidelines for configuring MEV on your preferred client:

* [Prysm](https://docs.prylabs.network/docs/advanced/builder)
* [Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/builders.html?highlight=mev#maximal-extractable-value-mev)
* [Nimbus](https://nimbus.guide/external-block-builder.html)
* [Lodestar](https://chainsafe.github.io/lodestar/usage/mev-integration/)

## Enable MEV in SSV node

Builder proposals are managed by Beacon Client. So once you've done the previous step, your SSV node will collaborate with MEV searchers.

## Choose any preconf/commitment (optional)

:::info Rewards
Without completion of this step you will be practically using MEV Boost without any additional rewards.
:::

At this point, you can choose any commitments or preconfirmations to participate with. As an example, you can check out [EthGas Github page](https://github.com/ethgas-developer/ethgas-preconf-commit-boost-module) with installation and participation instructions.

Once again, **only commit when you are managing all operators in a cluster**, otherwise your collateral will be slashed.

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
