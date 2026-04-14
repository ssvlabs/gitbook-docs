---
sidebar_position: 7
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Withdraw ETH

This page shows how to withdraw ETH from a cluster on SSV Network with the [SSV SDK](/developers/SSV-SDK/).

Withdrawing ETH reduces the cluster balance and transfers funds back to the cluster owner.

## Prerequisites

Before using this example, make sure you have:

- The cluster ID
- The amount of ETH to withdraw
- The [SDK initialized](/developers/SSV-SDK/#initialization) with a `walletClient`

## Withdraw ETH

Use `sdk.clusters.withdraw` to withdraw ETH from a cluster using its cluster ID.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  import { createClusterId } from '@ssv-labs/ssv-sdk/utils'
  import { parseEther } from 'viem'

  try {
      const ownerAddress = '{{OWNER_ADDRESS}}'
      const operatorIds = [{{OPERATOR_IDS}}]
      const clusterId = createClusterId(ownerAddress, operatorIds)

      const tx = await sdk.clusters.withdraw({
          args: {
              id: clusterId,
              amount: parseEther('{{ETH_AMOUNT}}'),
          },
      })

      const txnReceipt = await tx.wait()
      console.log('Transaction receipt:', txnReceipt);
  } catch (error) {
      console.error('Failed to withdraw ETH:', error);
  }
  `
  }
  variables={{
    ETH_AMOUNT: '0.1234',
    OWNER_ADDRESS: '0xF3e3E63b80e65665a1DF537A882de80d1961614E',
    OPERATOR_IDS: '1, 2, 3, 4'
  }}
/>

After the transaction is confirmed, you can verify the updated cluster balance in the [SSV Explorer](https://explorer.ssv.network/mainnet/overview).
