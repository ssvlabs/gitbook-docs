---
sidebar_position: 9
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# API Calls

This page shows how to use the API module to perform various calls. The API module is used to retrieve data such as the account nonce and cluster snapshot, both of which are covered on this page.

For the full list of available functions, see the [API Module Reference](/developers/SSV-SDK/module-reference/api-module).

## Prerequisites

Before using these examples, make sure you have the [SDK initialized](/developers/SSV-SDK/#initialization).

## Get Operators by IDs

Use `sdk.api.getOperators` to retrieve operator metadata (including decoded public keys) for a set of operator IDs.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  const operators = await sdk.api.getOperators({
    operatorIds: [{{OPERATOR_IDS}}]
  })

  console.log(operators)
  `
  }
  variables={{
    OPERATOR_IDS: '"1", "2", "3", "4"'
  }}
/>

## Get Owner Nonce

Use `sdk.api.getOwnerNonce` to retrieve the current nonce for an account.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  const ownerNonce = await sdk.api.getOwnerNonce({ 
    owner: "{{OWNER_ADDRESS}}" 
  })
    
  console.log(ownerNonce)
  `
  }
  variables={{
    OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
  }}
/>

## Get Cluster Snapshot

Use `sdk.api.toSolidityCluster` to retrieve the cluster snapshot in a format compatible with on-chain interactions.

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
  import { createClusterId } from '@ssv-labs/ssv-sdk/utils'

  const ownerAddress = "{{OWNER_ADDRESS}}"
  const operatorIds = [{{OPERATOR_IDS}}]
  const clusterId = createClusterId(ownerAddress, operatorIds)

  const clusterSnapshot = await sdk.api.toSolidityCluster({ 
    id: clusterId
  })
  console.log(clusterSnapshot)
  `
  }
  variables={{
    OWNER_ADDRESS: '0xA4831B989972605A62141a667578d742927Cbef9',
    OPERATOR_IDS: '"1", "2", "3", "4"'
  }}
/>
