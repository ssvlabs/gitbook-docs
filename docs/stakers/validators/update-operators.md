---
description: How to update operators for your validator
sidebar_position: 3
---

# Update Operators

:::warning Collusion risks
Please do not change more than 2 operators in a cluster. Each set of **generated shares will always be valid** when their signing threshold is met (e.g. 3/4). To reduce the risks, it is advised to not change more than 2 of the validator's managing operators when changing its cluster.
:::

Below is the educational context around Updating Operators, you can find actionable [steps in our separate guide](../cluster-management/update-operators.md).

### Update Operators

A staker can customize and update the operators managing their validator (cluster) at their discretion, allowing them to run it according to their own preferences.

To update a validator's managing operators, follow these steps:

1. [Offboard](validator-offboarding.md) from the network by removing the validator from its managing cluster.
2. Wait for at least two epochs to mitigate slashing risk associated with simultaneous validator setups.
3. [Onboard](validator-onboarding.md) the validator to the network by registering it to a new cluster.