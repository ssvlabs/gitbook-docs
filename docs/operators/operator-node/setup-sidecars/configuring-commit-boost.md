---
title: Configuring Commit-Boost
sidebar_position: 4
---

## Introduction

**Commit-Boost** is a sidecar that lets validators participate in MEV (Maximal Extractable Value) and optionally offer additional block construction services. When used for MEV, Commit-Boost gives validators extra tools for risk mitigation and performance compared with solutions such as MEV-Boost. For other services, it includes an optional Signer interface that simplifies opt-in.

Validators must choose to opt in to these services. Running Commit-Boost does not automatically require them to offer any specific service through the Signer.

You can run Commit-Boost in several ways:
- **For MEV only:** This is similar to a standard MEV-Boost setup. With Commit-Boost and the PBS (Proposer-Builder Separation) service, validators get additional tools and improved performance.
- **For MEV + another service:** Validators participate in MEV and also opt in to another service, such as preconfirmations through ETHGas.
- **For MEV + multiple services:** Validators choose which services to offer. For example, they might use Commit-Boost for MEV plus one service, or for MEV plus several services.

Commit-Boost was built by a community of validators, developers, researchers, and other contributors across Ethereum. It is supported by a non-profit, fully open source, and free to use.

## Configuring Commit-Boost

This guide outlines the steps required to configure Commit-Boost with your SSV Node so Operators can participate in MEV and commitments such as preconfirmations.

**Commit-Boost has two main parts**:
1. MEV, or the PBS service.
2. Other commitments or services validators can offer for block construction.

You can learn more in the [Commit-Boost documentation](https://commit-boost.github.io/commit-boost-client/overview).


## Overview
The guide follows those two parts. Summary:

**Part 1:**

  - [Install Commit-Boost client](#install-Commit-Boost-client)
  - [Choose relays](#choose-any-relays)
  - [Enable MEV in Beacon Client](#enable-mev-in-beacon-client)

**Part 2:**

  - [Using Commit-Boost for Other Services](#using-Commit-Boost-for-other-services-eg-preconfirmations)

## Install Commit-Boost client

The Commit-Boost team documents this process in [their guide](https://commit-boost.github.io/commit-boost-client/get_started/overview).

### Choose any relays

To use Commit-Boost for MEV, the client behaves much like MEV-Boost. You can choose any MEV-Boost-compatible relays, and the workflow is the same. Commit-Boost also includes performance [enhancements](https://github.com/commit-boost/bommit-boost-client/tree/main/benches/pbs), additional [reporting](https://github.com/commit-boost/commit-boost-client/tree/main/crates/metrics), and tools such as the [multiplexer](https://youtu.be/PPWwpPx4it0?si=mcJfGDlozd1AITBj&t=1380) to help validators reduce risk.

## Enable MEV in Beacon Client

Enable MEV by connecting to the [Builders API](https://github.com/ethereum/builder-specs) from your Beacon client.

Follow the setup guidelines for configuring MEV on your preferred client:

* [Prysm](https://www.offchainlabs.com/prysm/docs/configure-prysm/builder/)
* [Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/advanced_builders.html?highlight=mev#maximal-extractable-value-mev)
* [Nimbus](https://nimbus.guide/external-block-builder.html)
* [Lodestar](https://chainsafe.github.io/lodestar/run/beacon-management/mev-and-builder-integration)

## Enable MEV in SSV Node

Builder proposals are managed by the Beacon client. Once the previous step is complete, your SSV Node will work with MEV searchers.

### Using Commit-Boost for Other Services (e.g. Preconfirmations)

:::warning Potential Slashing Warning
**If you have a commitment with collateral**, only use Commit-Boost when managing all nodes in the cluster.

If any node in the cluster does not follow your commitment, your collateral will be slashed. If you manage only one Operator in the cluster, you can [use regular MEV Boost](./configuring-mev) instead.
:::

Without this step, you will use Commit-Boost much like MEV-Boost and benefit only from the extra tooling and performance.

One of Commit-Boost's key features is the Signer, a standardized interface for offering additional services. These services vary, but generally involve serving end users of blockspace. The Signer provides a consistent way for validators to opt in.

One way to think about the Signer plus Commit-Boost is as an app store for validators, where they choose which "apps" to run. An early example is preconfirmations. For more details, see the Commit-Boost [Signer documentation](https://commit-boost.github.io/commit-boost-client/api).

One current service is **ETHGas**. It allows validators to offer full-slot auctions, [preconfirmations](https://eth-fabric.github.io/website/education/awesome-based-preconfs), and related services. See the [ETHGas GitHub page](https://github.com/ethgas-developer/ethgas-preconf-Commit-Boost-module) for installation and participation details.

Once again, **only commit when you are managing all operators in a cluster**, otherwise your collateral will be slashed.

## Showcase Supported Relays

It is important for the network to display the relays supported by Operators. This helps Stakers make better clustering decisions and improves network stability. **It also increases the likelihood that an Operator will be selected by Stakers**.

Follow the [Setting Operator Metadata guide](/operators/operator-management/setting-operator-metadata) to list supported relays.
