---
sidebar_position: 3
---

# Native Restaking

EigenLayer is an Ethereum protocol that introduces restaking, allowing ETH on the consensus layer to be reused. Through EigenLayer smart contracts, users can restake ETH or LSTs to extend cryptoeconomic security to additional applications and earn extra rewards. For background, see the [EigenLayer documentation](https://docs.eigenlayer.xyz/eigenlayer/overview/).

This page explains how to set up EigenLayer native restaking through SSV Network.

### Create an EigenPod

:::warning
If you have an existing validator, verify its withdrawal prefix first. EigenLayer provides a guide for this on the [validator eligibility page](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/validator-eligibility-withdrawal-prefix).
:::

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager) is a smart contract that lets EigenLayer monitor and manage balance and withdrawal status.

Follow [EigenLayer's guide](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod/) to create an EigenPod.

The contract address you receive at the end of that process will be used for subsequent restaking and withdrawal activity tied to that EigenPod.

### Create a new validator

Native restaking means pointing an Ethereum validator's [withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to the user's [EigenPod](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod/). To do that, you need to create a new validator.

You can do that with [this guide in our documentation](/stakers/solo-stakers/creating-a-new-validator). The important part is setting the validator's withdrawal credentials to the EigenPod. When [generating validator keys](/stakers/solo-stakers/creating-a-new-validator#vanilla-key-generation), use a command like this:

```bash
./deposit new-mnemonic --num_validators 1  --chain mainnet  --eth1_withdrawal_address [YOUR_EIGENPOD_ADDRESS]
```

Set `--eth1_withdrawal_address` to the EigenPod address from the previous step.

### Best practices

EigenLayer currently allows **one EigenPod per account** (wallet address). If you have multiple validators, you have two options:

1. Use the same EigenPod as the withdrawal credential for multiple validators.
2. Create multiple accounts and an EigenPod for each account.

### Register validator on SSV

With SSV Network, you do not need to operate the validator on your own hardware. Instead, you register it on the network and choose the operators that will run validator duties for you.

Follow [this guide in our documentation](/stakers/solo-stakers/distributing-a-validator) to register the new validator on SSV Network, just as you would for any other Ethereum validator.

:::info
Do **not** direct execution rewards (`suggested_fee_recipient`) to the EigenPod, because those funds would be irretrievable.

For more information on this topic, please refer to [the dedicated learning page](/learn/network-overview/validators/validator-rewards).
:::
