---
sidebar_position: 5
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Exit Validator

This page shows how to exit a validator from SSV Network with the [SSV SDK](/developers/SSV-SDK/).

Exiting a validator triggers the voluntary exit flow by requesting the selected SSV operators to sign the validator exit message.

## Prerequisites

Before using this example, make sure you have:

- The validator public key
- The validator operator IDs
- The [SDK initialized](/developers/SSV-SDK/#initialization) with a `walletClient`

## Exit Validator

Use `sdk.clusters.exitValidators` to initiate the voluntary exit process for one or more validators.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
try {
    const operatorIds = [{{OPERATOR_IDS}}]
    const operatorIdsBigInt = operatorIds.map(BigInt)

    const tx = await sdk.clusters.exitValidators({
      args: {
        publicKeys: ['{{VALIDATOR_KEY1}}', '{{VALIDATOR_KEY2}}'],
        operatorIds: operatorIdsBigInt,
      },
    })

    const txnReceipt = await tx.wait()

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to exit validators:', error);
}
  `
  }
  variables={{
    VALIDATOR_KEY1: '0x9168d201b4c51f5a978298fd940a73319d00f7cacc11995960021d52d0bc0f141aa5872fb2aa23a124b8051d54c5c455',
    VALIDATOR_KEY2: '0xaeee799166f6019a1a97acad6bfd59b6aa20ebadb3b77ca819cb3f81f562c9a876eb5d542e51e43ba3a52d021f339023',
    OPERATOR_IDS: '1, 2, 3, 4'
  }}
/>
