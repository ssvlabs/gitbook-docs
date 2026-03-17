---
description: How to update operators for your validator
sidebar_position: 3
---

# Update Operators

:::warning Collusion risks
Please do not change more than 2 operators in a cluster. Each set of **generated shares will always be valid** when their signing threshold is met (e.g. 3/4). To reduce the risks, it is advised to not change more than 2 of the validator's managing operators when changing its cluster.
:::

Below is the educational context around Updating Operators, you can find actionable [steps in our separate guide](/stakers/cluster-management/update-operators).

### Update Operators

A staker can customize and update the operators managing their validator (cluster) at their discretion, allowing them to run it according to their own preferences.

This might be needed in cases when operators start performing poorly or are removed from the network entirely. Note that the keyshares can not be changed or revoked, so technically the process of updating operators is removing old keyshares and generating new ones.