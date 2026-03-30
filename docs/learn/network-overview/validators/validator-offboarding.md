---
description: How to offboard a validator from SSV Network
sidebar_position: 3
---

# Validator Offboarding

This page explains the concepts behind validator offboarding. For actionable steps, see the [separate guide](/stakers/validator-offboarding/removing-a-validator).

Validators can leave the network at any time, whether to run independently or migrate to another service.

Removing a validator causes its operators to stop managing it. This inactivates the validator on SSV Network and can result in Beacon Chain penalties because it is no longer maintained by the network.

The liquidation collateral of removed validators is added back to the cluster’s operational runway and becomes available for withdrawal from the cluster balance.

Please note that removing a validator only offboards it from SSV Network; it does not exit the validator from the Beacon Chain.

:::warning
To avoid slashing, wait at least 2 epochs before running the removed validator on an alternative service.
:::
