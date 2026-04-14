---
sidebar_position: 4
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Deposit ETH

This page shows how to deposit ETH into an existing cluster on SSV Network with the [SSV SDK](/developers/SSV-SDK/).

Depositing ETH increases the cluster balance used to cover ongoing validator operating costs.

## Prerequisites

Before integrating this example, make sure you have:

- An existing cluster
- The cluster owner address
- The cluster operator IDs
- The amount of ETH to deposit
- The [SDK initialized](/developers/SSV-SDK/#initialization) with a `walletClient`

## Deposit ETH

Use `sdk.clusters.deposit` to deposit ETH into a cluster identified by its cluster ID.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
import { createClusterId } from '@ssv-labs/ssv-sdk/utils'
import { parseEther } from 'viem'

try {
    const ownerAddress = "{{OWNER_ADDRESS}}"
    const operatorIds = [{{OPERATOR_IDS}}]
    const clusterId = createClusterId(ownerAddress, operatorIds)

    const txnReceipt = await sdk.clusters.deposit({
        args: {
            id: clusterId,
            amount: parseEther('{{ETH_AMOUNT}}'),
        },
    },
    ).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to deposit ETH:', error);
}
  `
  }
  variables={{
    ETH_AMOUNT: '0.1234',
    OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
    OPERATOR_IDS: '1, 2, 3, 4'
    }}
/>
