---
sidebar_position: 2
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# SSV SDK

The SSV SDK is a comprehensive, open-source developer toolkit written in TypeScript, designed to enable developers to interact with the SSV Network programmatically.

It consolidates all necessary tooling into a single, cohesive package.

The SDK is structured into five core modules:

* **Cluster**: Manage and interact with distributed validator clusters.
* **DAO**: Manage DAO-related actions and values.
* **Utils**: Utility functions to simplify development workflows.
* **API**: Streamlined access to SSV Subgraph APIs.
* **Operator**: Tools for operator-related interactions.

Explore the SDK's source code on GitHub: [SSV SDK Repository](https://github.com/ssvlabs/ssv-sdk).

## Installation

To install the SDK, run:

```bash
npm i @ssv-labs/ssv-sdk
```

:::info ⚠️ Testnet Version ⚠️
The latest Hoodi-compatible version was not released to npmjs. To install it, download it from [the GitHub release](https://github.com/ssvlabs/ssv-sdk/releases/tag/v.1.0.0) or via the command below:
```bash
npm i --force --ignore-scripts github:ssvlabs/ssv-sdk#v.1.0.0
```
:::

## Initialization

The SDK requires a `publicClient` configured with a supported chain (`mainnet` or `hoodi`). A `walletClient` is optional and only needed for write operations. The [`viem`](https://www.npmjs.com/package/viem) library can be used to create both clients, allowing you to initialize the SDK for read-only flows or include a wallet client for read and write operations.

If needed, a wallet can also be attached later using `sdk.connectWallet(walletClient)`.

```typescript
import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Set up viem clients
const chain = chains.mainnet // or chains.hoodi
const transport = http()

const publicClient = createPublicClient({
  chain,
  transport,
})

const account = privateKeyToAccount('0x...')
const walletClient = createWalletClient({
  account,
  chain,
  transport,
})

// Initialize SDK with viem clients
const sdk = new SSVSDK({
    publicClient,
    walletClient,
    extendedConfig: {
      subgraph: {
        apiKey: process.env.SUBGRAPH_API,
        endpoint: process.env.SUBGRAPH_ENDPOINT,
      }
    }
  });
```

The `extendedConfig` parameter is optional. If not provided, the SDK will use the development endpoint. Bear in mind that this is rate limited, though, so it is strongly advised to use an API key with the free plan. For more information regarding your subgraph API key, please refer to the [dedicated Subgraph page](/developers/api/ssv-subgraph).

### Initialization Parameters

| Input name | Input type | Optional |
|------------|------------|----------|
| publicClient | [Viem public client](https://viem.sh/docs/clients/public) | No |
| walletClient | [Viem wallet client](https://viem.sh/docs/clients/wallet) | Yes |
| SUBGRAPH_API | API Key retrieved from [The Graph account](https://thegraph.com/studio/apikeys/) | Yes, strongly recommended |
| SUBGRAPH_ENDPOINT | Subgraph Endpoint retrieved from [Mainnet or Testnet subgraph page](/developers/api/ssv-subgraph/#querying-ssv-protocol-smart-contract-data) | Yes, strongly recommended  |

## Usage

Use the SDK by selecting [one of the five modules ](module-reference/)and calling the desired function. You can find examples of SDK implementation in the [Tutorials section](/developers/examples).

<InlineEditableCodeBlock
  language="typescript"
  template={
  `
async function main() {
    const ownerNonce = await sdk.api.getOwnerNonce({ 
        owner: "{{OWNER_ADDRESS}}" 
    })
    
    console.log(ownerNonce)
}
  `
  }
  variables={{
    OWNER_ADDRESS: '0x...'
  }}
/>
