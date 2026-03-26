---
sidebar_position: 2
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Generate and Validate Keyshares

This section of the [SSV SDK](/developers/SSV-SDK/) enables users to generate validator keyshares by splitting validator keys into threshold shares using [Shamir Secret Sharing (SSS)](https://en.wikipedia.org/wiki/Shamir's_Secret_Sharing), and encrypting them with operator public keys.

The resulting shares and signatures are packaged as [`sharesData`](/learn/security/keyshares-structure), which is used during validator registration through the [SSV smart contract](/developers/smart-contracts/) to distribute keyshares from stakers to operators.

In addition to generating keyshares, the SDK can validate them before registration to ensure that the validator can be registered successfully.

## Prerequisites

Before using this example, make sure you have:

- Validator [keystores](/developers/examples/create-validator-keys) and the keystore password
- [Operator](https://explorer.ssv.network/mainnet/operators) IDs
- [Validator](https://explorer.ssv.network/mainnet/validators) owner address

## Install dependencies

Install the SSV SDK and required dependencies:

```bash
npm install @ssv-labs/ssv-sdk viem
```

## Initialize the SDK

Create an SDK instance to interact with the SSV Network:

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
  import { createPublicClient, http } from 'viem'

  // Use chains.mainnet for mainnet
  const publicClient = createPublicClient({
    chain: chains.hoodi,
    transport: http('{{RPC_URL}}'),
  })

  const sdk = new SSVSDK({
    publicClient,
  })
  `
  }
    variables={{
      RPC_URL: 'https://ethereum-hoodi-rpc.publicnode.com',
    }}
/>

## Generate Keyshares

Use `generateKeyShares` to create keyshares from a validator keystore and encrypt them with the selected operator public keys.

Operator public keys are required to encrypt keyshares. These can be retrieved using the SDK based on operator IDs.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  const ownerAddress = "{{OWNER_ADDRESS}}"
  const nonce = Number(await sdk.api.getOwnerNonce({ owner: ownerAddress }))
  const operatorIds = [{{OPERATOR_IDS}}]

  // Fetch operator metadata from the SDK API
  const operators = await sdk.api.getOperators({ operatorIds })
  if (operators.length !== operatorIds.length) {
    throw new Error('One or more operator IDs were not found')
  }

  // Build operator public keys in the same order as operatorIds.
  const operatorKeys = operatorIds.map((id) => {
    const op = operators.find((o) => o.id === id)
    if (!op) throw new Error(\`Operator \${id} not found\`)
    return op.publicKey
  })

  // Generate encrypted keyshares from keystore(s).
  const keysharesPayload = await sdk.utils.generateKeyShares({
    keystore: JSON.stringify(keystoresObject), // or string[]
    keystorePassword: "INSERT_PASSWORD",
    operatorKeys,
    operatorIds: operatorIds.map(Number),
    ownerAddress,
    nonce,
  })
  `
  }
    variables={{
      OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
      OPERATOR_IDS: '"1", "2", "3", "4"'
    }}
/>

## Validate Keyshares

Use `validateSharesPreRegistration` to verify that the generated keyshares and operator IDs are valid before registering the validator.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  const ownerAddress = "{{OWNER_ADDRESS}}"
  const operatorIds = [{{OPERATOR_IDS}}]

  // Validate keyshares and operator set before registration.
  const validatedShares = await sdk.utils.validateSharesPreRegistration({
    keyshares: keysharesPayload,
    operatorIds,
    ownerAddress, // required if no walletClient in sdk init
  })

  console.log(validatedShares)
  `
  }
    variables={{
      OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
      OPERATOR_IDS: '"1", "2", "3", "4"'
    }}
/>

A valid keyshare can then be used to [register a validator.](register-validator)
