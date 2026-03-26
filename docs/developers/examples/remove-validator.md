---
sidebar_position: 6
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Remove Validator

This page shows how to remove validators from a cluster on the SSV Network using the [SSV SDK](/developers/SSV-SDK/).

Removing a validator updates the cluster configuration and stops the validator from participating in the cluster.

## Prerequisites

Before using this example, make sure you have:

- The cluster owner address
- The cluster operator IDs
- The validator public keys to remove
- The [SDK initialized](/developers/SSV-SDK/#initialization) with a `walletClient`

## Remove Validator

Use `sdk.clusters.removeValidators` to remove one or more validators from a cluster identified by its cluster ID.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  import { createClusterId } from '@ssv-labs/ssv-sdk/utils'

  try {
      const ownerAddress = "{{OWNER_ADDRESS}}"
      const operatorIds = [{{OPERATOR_IDS}}]
      const clusterId = createClusterId(ownerAddress, operatorIds)

      const tx = await sdk.clusters.removeValidators({
        args: {
          id: clusterId,
          publicKeys: [
            "{{VALIDATOR_KEY1}}", 
            "{{VALIDATOR_KEY2}}"
          ],
        },
      })

      const txnReceipt = await tx.wait()
      console.log('Transaction receipt:', txnReceipt);
  } catch (error) {
      console.error('Failed to remove validators:', error);
  }
  `
  }
  variables={{
    VALIDATOR_KEY1: '0x9168d201b4c51f5a978298fd940a73319d00f7cacc11995960021d52d0bc0f141aa5872fb2aa23a124b8051d54c5c455',
    VALIDATOR_KEY2: '0xaeee799166f6019a1a97acad6bfd59b6aa20ebadb3b77ca819cb3f81f562c9a876eb5d542e51e43ba3a52d021f339023',
    OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
    OPERATOR_IDS: '1, 2, 3, 4'
  }}
/>

After the transaction is confirmed, you can verify the updated cluster state in the [SSV Explorer](https://explorer.ssv.network/mainnet/overview).