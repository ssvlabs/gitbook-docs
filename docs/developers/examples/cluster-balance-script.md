---
sidebar_position: 8
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Cluster Balance Calculation

The script below calculates the balance of a cluster on SSV Network. You can integrate it into your own monitoring or automation tools.

Details on the formulas used can be found in the documentation page related to [Cluster Balance](/learn/network-overview/clusters/cluster-balance).

## Prerequisites

Before using this example, make sure you have:

- The cluster owner address
- The cluster operator IDs
- The [SDK initialized](/developers/SSV-SDK/#initialization)

:::note
The `ownerAddress` parameter is optional if the SDK is initialized with a `walletClient` that includes an account address.
:::

## Calculate Cluster Balance

Use `sdk.utils.getClusterBalance` to retrieve the cluster balance and estimated operational runway.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
try {
    const { balance, operationalRunway } = await sdk.utils.getClusterBalance({
        operatorIds: [{{OPERATOR_IDS}}],
        ownerAddress: '{{OWNER_ADDRESS}}',
    })

    console.log('Cluster balance result:', {
        balance: balance.toString(),
        operationalRunway: operationalRunway.toString(),
    });
} catch (error) {
    console.error('Failed to get cluster balance:', error);
}
  `
  }
  variables={{
    OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
    OPERATOR_IDS: '1, 2, 3, 4'
  }}
/>
