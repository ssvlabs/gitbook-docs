---
title: Configuring Primev
sidebar_position: 3
---

This guide outlines the steps required to configure MEV-commit with your SSV Node so Operators can participate in MEV and preconfirmations. For more background, see the [Primev documentation](https://docs.primev.xyz/v1.2.x/get-started/welcome-to-primev).

:::warning Potential Slashing Warning
**If you have a commitment with collateral**, only use Primev when managing all nodes in the cluster.

If any node in the cluster does not follow your commitment, your collateral will be slashed. If you manage only one Operator in the cluster, you can [use regular MEV Boost](./configuring-mev) instead.
:::

## Overview
Summary of the required steps:
1. [Install MEV Boost client](#install-mev-boost-client)
2. [Choose preconf-compatible relays](#choose-compatible-relays)
3. [Enable MEV in Beacon Client](#enable-mev-in-beacon-client)
4. [Register your validator(s) with Primev](#register-your-validator-with-primev)
5. [Showcase Supported Relays](#showcase-supported-relays)

## Install MEV Boost client

The mev-boost team documents this process on [GitHub](https://github.com/flashbots/mev-boost?tab=readme-ov-file#installing).

## Choose compatible relays

MEV-commit-friendly relays are listed in the [Primev documentation](https://docs.primev.xyz/v1.2.x/get-started/validators/validator-guide#supporting-relays), together with their URLs.

## Enable MEV in Beacon Client

Use your mev-boost endpoint as the Builder endpoint in the Beacon client. Make sure the endpoint and port are reachable from the Beacon client.

Follow the setup guidelines for configuring MEV on your preferred client:

* [Prysm](https://docs.prylabs.network/docs/advanced/builder)
* [Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/builders.html?highlight=mev#maximal-extractable-value-mev)
* [Nimbus](https://nimbus.guide/external-block-builder.html)
* [Lodestar](https://chainsafe.github.io/lodestar/usage/mev-integration/)

## Enable MEV in SSV node

Builder proposals are managed by the Beacon client. Once the previous step is complete, your SSV Node will work with MEV searchers.

## Register your validator with Primev

:::note
Without this step, you will effectively be using MEV Boost without the additional rewards.
:::

The registry uses the validator public key as the opt-in identifier. Any account can stake on behalf of validator public keys, and only that account can unstake later.

The `VanillaRegistry.minStake` parameter represents how much ETH must be staked per validator pubkey to define that validator as opted in to mev-commit. On Mainnet, `minStake` is 1 ETH, while on Hoodi it is 0.0001 ETH.

- To learn more about this process, see [Primev's explanation here](https://docs.primev.xyz/v1.2.x/get-started/validators/vanilla).
- To start the registration process, you can use the [Mainnet](https://validators.mev-commit.xyz/) validator dashboard. 
You will need to submit your validators' pubkeys in a `.txt` file, each key on new line or separated by `,`.

## Showcase Supported Relays

It is important for the network to display the relays supported by Operators. This helps Stakers make better clustering decisions and improves network stability. **It also increases the likelihood that an Operator will be selected by Stakers**.

Follow the [Setting Operator Metadata guide](/operators/operator-management/setting-operator-metadata) to list supported relays.
