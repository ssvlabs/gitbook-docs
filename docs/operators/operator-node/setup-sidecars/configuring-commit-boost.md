---
title: Configuring Commit-Boost
sidebar_position: 4
---

## Introduction

**Commit-Boost** is a sidecar that enables validators to participate in MEV (Maximal Extractable Value) and also gives them the option to offer new block construction services. When used for MEV, Commit-Boost provides validators with additional tools for risk mitigation and performance compared to current solutions like MEV-Boost. For other services, it includes an optional Signer interface that streamlines the process for validators to opt in.

Validators must choose to opt into these services; running Commit-Boost does not automatically require them to offer all or any of the available services through the Signer. The choice is always up to the validator.

It's important to note that you can run Commit-Boost in a few different ways:
- For MEV only: This setup is similar to how validators currently run MEV-Boost. With Commit-Boost and the PBS (Proposer-Builder Separation) service, validators get more tools and improved performance.
- For MEV + Another Service: In this case, validators participate in MEV but also opt into another service, such as preconfirmations through ETHGas.
- For MEV + Multiple Services: When validators run Commit-Boost, they choose which services to offer. For example, if two services are available, they could choose to use Commit-Boost for MEV + Service 1 + Service 2, or they might only choose to run it for MEV + Service 1.

Commit-Boost was built by a community of validators, developers, researchers, and other contributors across Ethereum, it's built for Ethereum, by Ethereum. It is supported by a non-profit and is fully open-source and free to use.

## Configuring Commit-Boost

This guide outlines the necessary steps required to configure Commit-boost with your SSV node to enable operators to participate in MEV and commitments (e.g. preconfirmations). 

It is important to note that Commit-Boost has two main parts:
1. MEV, or the PBS service.
2. Other commitments or services validators can offer for block construction.

You can learn more about the concept and technical details on [Commit-boost documentation](https://commit-boost.github.io/commit-boost-client/overview). 


## Overview
The guide is split into two parts explained above. Here is a summary of the steps you'll need to take:

**Part 1:**

  - [Install Commit-boost client](#install-commit-boost-client)
  - [Choose relays](#choose-any-relays)
  - [Enable MEV in Beacon Client](#enable-mev-in-beacon-client)

**Part 2:**

  - [Using Commit-Boost for Other Services](#using-commit-boost-for-other-services-eg-preconfirmations)

## Install Commit-Boost client

The process is best described by the commit-boost team on [their documentation](https://commit-boost.github.io/commit-boost-client/get_started/overview). 

### Choose any relays

To use Commit-Boost for MEV, the client acts very similarly to how validators currently use MEV-Boost. You can choose any MEV-Boost-compatible relays, and the workflow is identical. We also note that Commit-Boost comes with performance  [enhancements](https://github.com/Commit-Boost/commit-boost-client/tree/main/benches/pbs), additional [reporting](https://github.com/Commit-Boost/commit-boost-client/tree/main/crates/metrics) and tools such as the [multiplexer](https://youtu.be/PPWwpPx4it0?si=mcJfGDlozd1AITBj&t=1380) to help validators gain insight and reduce risk. 

### Enable MEV in Beacon Client

Your Commit-Boost endpoint should be used by Beacon Client in the Builder endpoint variable. Make sure the endpoint and its port are accessible by your Beacon Client.

Follow the setup guidelines for configuring Builder endpoint on your preferred client:

* [Prysm](https://docs.prylabs.network/docs/advanced/builder)
* [Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/builders.html?highlight=mev#maximal-extractable-value-mev)
* [Nimbus](https://nimbus.guide/external-block-builder.html)
* [Lodestar](https://chainsafe.github.io/lodestar/usage/mev-integration/)

### Enable MEV in SSV node

Builder proposals are managed by Beacon Client. So once you've done the previous step, your SSV node will collaborate with Commit-Boost relays.

### Using Commit-Boost for Other Services (e.g. Preconfirmations)

:::warning Potential Slashing
**If you have a commitment with a collateral**  - only use commit-boost when managing all nodes in the cluster. 

If any of the nodes in a cluster will not follow your commitment, your collateral will be slashed.
:::

Without completing this step, you will be using Commit-Boost similarly to how MEV-Boost is used, only benefiting from the additional tooling and performance of Commit-Boost.

One of the unique features of Commit-Boost is that validators have a standardized interface, the Signer, to provide other services. These services can vary but revolve around offering services to end users of blockspace. Multiple teams are building these services. The Signer acts as a standardized interface that allows validators to opt in and provide these services.

One way to think of the Signer + Commit-Boost is that it acts as an app store, allowing validators to choose which "apps" they want to run. An early example of a service is preconfirmations. For more details on the Signer, please see the Commit-Boost team’s [documentation](https://commit-boost.github.io/commit-boost-client/api).

An example of a current service is **ETHGas**. This protocol allows validators to offer services such as full-slot auctions, [preconfirmations](https://eth-fabric.github.io/website/education/awesome-based-preconfs), and other services. For example, you can check out the [EthGas Github page](https://github.com/ethgas-developer/ethgas-preconf-commit-boost-module) for installation and participation instructions.

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
