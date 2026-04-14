---
sidebar_position: 3
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Register Validator

This page shows how to programmatically register a validator on SSV Network with the [SSV SDK](/developers/SSV-SDK/).

## Prerequisites

Before using this example, make sure you have:

- [Valid keyshares](/developers/examples/generate-and-validate-keyshares) for the validator
- The amount of ETH to deposit during registration
- The [SDK initialized](/developers/SSV-SDK/#initialization) with a `walletClient`

## Register Validator

Use `sdk.clusters.registerValidators` to register a validator and deposit ETH into the cluster as part of the registration transaction.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
import { parseEther } from 'viem';

try {
    const txnReceipt = await sdk.clusters.registerValidators({
        args: {
            keyshares: keysharesPayload,
            depositAmount: parseEther('{{ETH_AMOUNT}}'),
        },
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    logErrorToFile(error);
    console.error('Failed to register validators:', error);
}
  `
  }
  variables={{
    ETH_AMOUNT: '0.1234',
  }}
/>

After successful registration, you can verify the validator and cluster details in the [SSV Explorer](https://explorer.ssv.network/mainnet/overview).
