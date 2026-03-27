---
title: Consolidate Validators
sidebar_position: 7
---

# Consolidate Validators

Validators can upgrade their withdrawal credentials to `0x02` and hold up to 2048 ETH on validator balance. For background, see [this overview of 0x02 and max effective balance](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience).

Consolidation moves funds from one validator into another validator. The destination validator must use `0x02` withdrawal credentials, and all validators involved must share the same withdrawal address.

At a high level, the flow is:
1. [Upgrade withdrawal credentials to `0x02`](#1-upgrade-withdrawal-credentials-to-0x02)
2. [Consolidate validators](#2-consolidate-validators)
3. [Remove the exited validator from SSV Network](#3-remove-the-exited-validator-from-ssv-network)

### 1. Upgrade withdrawal credentials to `0x02`

At least one validator has to be upgraded to `0x02`. The consolidated (absorbed) validators can keep 0x01 credentials.

1. Open [Ethereum Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).
2. Connect the wallet that controls the withdrawal address.
3. Select **Upgrade account to compounding**.
4. Wait for the upgrade to complete.
5. Confirm the updated status on [Beaconcha.in](https://beaconcha.in/).

### 2. Consolidate validators

1. Make sure at least one validator already uses `0x02` withdrawal credentials.
2. Open [Ethereum Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).
3. Connect the wallet that controls the withdrawal address.
4. Select **Absorb another validator**.
5. Submit the consolidation request.

After consolidation:
- The source validator exits fully; The processing time depends on the current exit queue
- The destination validator receives the source validator's balance

Wait until the source validator is fully exited before you continue. Confirm the exit on [Beaconcha.in](https://beaconcha.in/).

## 3. Remove the exited validator from SSV Network

After you confirm that the consolidated source validator has fully exited, remove it from SSV Network by following [Remove Validators](/stakers/validator-offboarding/removing-a-validator).

:::danger Caution
Do not remove the validator from SSV Network until the consolidation source validator has fully exited on Ethereum. Removing it too early can take the validator offline while it is still active and may lead to penalties.
:::
