---
title: Consolidate validators
sidebar_position: 8
---

# Consolidate validators

Since Pectra hardfork all validators are allowed to upgrade their withdrawal address to 0x02 and have up to 2048 ETH on validator balance. [Read more about 0x02 and Max Effective balance here](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience).

Consolidation is the process of migrating validator funds from one to another, the final validator has to be 0x02 type to allow >32 ETH on its balance. This process lowers operational costs, while your rewards remain the same. All validators have to have the same withdrawal address to consolidate.

## Upgrade to 0x02 
- Navigate to the [Ethereum Launchpad’s “Validator Actions” section](https://launchpad.ethereum.org/en/validator-actions)
- Connect your wallet with withdrawal address
- Click on `Upgrade account to compounding`
- Wait until the address upgrade is done, you can monitor on [beaconcha.in](https://beaconcha.in/)

## Consolidate validators
- Available once you have at least one validator with 0x02 withdrawal address.
- Navigate to the [Ethereum Launchpad’s “Validator Actions” section](https://launchpad.ethereum.org/en/validator-actions)
- Connect your wallet with withdrawal address
- Click on `Absorb another validator`
- Consolidated validator will fully exited, the other one will receive it's balance
- Wait until the consolidated validator is fully exited, you can monitor on [beaconcha.in](https://beaconcha.in/)

## Remove exited validators from SSV
Once you're confirmed that consolidated validator is exited, you can proceed with removing it from SSV Network. Follow the [Removing a Validator guide](./removing-a-validator.md) to do that.