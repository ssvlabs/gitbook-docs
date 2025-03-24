---
title: Configuring PrimEV
sidebar_position: 5
---

This guide outlines the necessary steps required to configure MEV-commit within your SSV node to enable operators to participate in MEV and preconfirmations. You can learn more about the concept and technical details on [PrimEV documentation](https://docs.primev.xyz/v1.0.0/get-started/welcome-to-primev). 

:::warning
You should only participate if you're managing all operators in the cluster. If you will participate without one or many operators in the cluster — your MEV-commit collateral will be slashed. As an individual operator, you can always choose to [use regular MEV Boost](./configuring-mev.md).
:::

## Overview
To give you a short summary of the steps you'll need to take:
1. [Install MEV Boost client](#install-mev-boost-client)
2. [Choose preconf-compatible relays](#choose-compatible-relays)
3. [Enable MEV in Beacon Client](#enable-mev-in-beacon-client)
4. [Register your validator(s) with PrimEV](#register-your-validator-with-primev)

## Install MEV Boost client

The process is best described by the mev-boost team on [their GitHub page](https://github.com/flashbots/mev-boost?tab=readme-ov-file#installing). 

## Choose compatible relays

MEV-commit friendly relays are mentioned on [the PrimEV documentation](https://docs.primev.xyz/v1.0.0/get-started/validators/validator-guide#supporting-relays), you will find relays' URLs there too.

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

## Register your validator with PrimEV

:::info
Without completion of this step you will be practically using MEV Boost without any additional rewards.
:::

The registry accepts validator's public key as the validator opt-in identifier. Any account can stake on behalf of validator pubkey(s), and only that account has the ability to unstake in the future.

The `VanillaRegistry.minStake` parameter represents how much ETH must be staked per validator pubkey to define that validator as opted-in to mev-commit. On Mainnet, `minStake` is 1 ETH, while on Holesky it’s 0.0001 ETH.

- To learn more about this process, feel free to check out [PrimEV's explanation here](https://docs.primev.xyz/v1.0.0/get-started/validators/vanilla).
- To start the registration process, you can use [Mainnet](https://validators.mev-commit.xyz/) and [Holesky](https://holesky.validators.mev-commit.xyz/dashboard) validator dashboards. 
You will need to submit your validators' pubkeys in a `.txt` file, each key on new line or separated by `,`.

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
