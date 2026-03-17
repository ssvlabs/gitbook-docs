---
sidebar_position: 3
---

# Native Restaking

EigenLayer is a protocol built on Ethereum that introduces restaking, allowing the reuse of ETH on the consensus layer. Thanks to EigenLayer smart contracts, users can restake their ETH or LST and extend cryptoeconomic security to additional applications on the network to earn additional rewards ([head over to EigenLayer docs](https://docs.eigenlayer.xyz/eigenlayer/overview/) for more information).

This page provides guidance on how to setup EigenLayer's Native Restaking through SSV.

### Create an EigenPod

:::warning
If you have an existing validator, you need to verify the Withdrawal Prefix. EigenLayer has a [good guide to do this on this dedicated page](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/validator-eligibility-withdrawal-prefix).
:::

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract that facilitates the EigenLayer protocol in monitoring and managing balance and withdrawal statuses.

Head over to [the dedicated guide on EigenLayer docs](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod/) for indications on how to create an EigenPod.

The smart contract address you will get at the end of the process will be responsible for all subsequent restaking and withdrawal activities associated with that EigenPod.

### Create a new validator

Native Restaking is the process of pointing an Ethereum validator's [withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to the user's [EigenPod](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod/). So in order to do that, you need to create a new validator.

You can do that using [this guide in our documentation](/stakers/solo-stakers/creating-a-new-validator), but the most important thing is to set the validator's withdrawal credentials to the EigenPod. So when [generating the validator keys](/stakers/solo-stakers/creating-a-new-validator#vanilla-key-generation) using this command:

```bash
./deposit new-mnemonic --num_validators 1  --chain mainnet  --eth1_withdrawal_address [YOUR_EIGENPOD_ADDRESS]
```

The `--eth1_withdrawal_address` parameter should be set to the EigenPod address from the previous step.

### Best practices

One important thing to note is that EigenLayer limits the creation EigenPod to **one per account** (wallet address). This means users with multiple validators have two options:

1. Use the same EigenPod as withdrawal credentials for multiple validators
2. Create multiple accounts, create an EigenPod for each one, use each EigenPod as withdrawal credentials

The best practice would clearly be reusing the same EigenPod, as it means less wallet addresses to manage, less dispersion of resources, and most importantly: claiming rewards will be much cheaper.

On the other hand, it appears that the trend for EigenLayer users at the moment is to create multiple accounts and multiple EigenPods, this is likely because of airdrops, which will likely be distributed on a _per-account_ basis.

### Register validator on SSV

Thanks to ssv.network, it is not necessary to operate your own validator by setting up, running and managing dedicated hardware. You can simply register it on the network, and choose which operators will run validator operations for you.

Follow [this guide in our documentation to register the new validator](/stakers/solo-stakers/distributing-a-validator) with restaking capabilities on ssv.network, just like you would do with any other Ethereum validator.

:::info
It is important to **NOT** direct execution rewards (`suggested_fee_recipient`) to the EigenPod as these funds would be irretrievable.

For more information on this topic, please refer to [the dedicated learning page](/learn/network-overview/validators/validator-rewards).
:::
