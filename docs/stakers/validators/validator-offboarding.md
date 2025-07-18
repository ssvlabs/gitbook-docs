---
description: How to offboard a validator from the SSV network
sidebar_position: 3
---

# Validator Offboarding

Below is the educational context around Validator Offboarding, you can find actionable [steps in our separate guide](../cluster-management/removing-a-validator.md).

Validators can leave the network at any time, whether to run it by themselves or migrate it to a different service.

Removing a validator will cause its operators to stop managing it, which will lead to its inactivation and can result in penalties on the Beacon Chain because it's no longer maintained by the network.

The liquidation collateral of removed validators will be added to its cluster's operational runway, and would become available to be withdrawn from the cluster's balance.

Please note that removing a validator will only offboard it from the SSV network and will not exit it from the Beacon Chain.

:::warning
To avoid slashing, it is advised to wait for at least 2 epochs prior to running the removed validator on an alternative service.
:::
