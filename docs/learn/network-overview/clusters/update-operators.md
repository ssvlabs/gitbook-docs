---
description: How to update operators for your validator
sidebar_position: 3
---

# Update Operators

:::warning Collusion risks
Please do not change more than 2 operators in a cluster. Each set of **generated shares will always be valid** when their signing threshold is met (e.g. 3/4). To reduce the risks, it is advised to not change more than 2 of the validator's managing operators when changing its cluster.
:::

This page explains the concepts behind updating operators. For actionable steps, see the [separate guide](/stakers/cluster-management/update-operators).

### Update Operators

A staker can update the operators managing their validator cluster based on their own preferences.

This may be needed if operators begin performing poorly or are removed from the network. Note that old key shares cannot be changed or revoked, so updating operators technically means generating a new set of key shares while the previously generated key shares remain valid if their threshold can still be met.
