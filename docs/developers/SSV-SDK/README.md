---
sidebar_position: 2
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# SSV SDK

The SSV SDK is an open-source TypeScript toolkit for interacting with SSV Network programmatically.

It brings the main developer workflows into a single package.

The SDK is structured into four core modules:

* **Cluster**: Manage and interact with distributed validator clusters.
* **Operator**: Work with operator-related data and actions.
* **API**: Access SSV data through SDK-supported APIs.
* **Utils**: Use helper functions for common development workflows.

Explore the source code on GitHub: [SSV SDK Repository](https://github.com/ssvlabs/ssv-sdk).

## Installation

To install the SDK, run:

```bash
npm i @ssv-labs/ssv-sdk
```

## Initialization

The SDK requires a `publicClient` configured with a supported chain (`mainnet` or `hoodi`). A `walletClient` is optional and is only needed for write operations. You can use [`viem`](https://www.npmjs.com/package/viem) to create both clients, whether you want a read-only setup or a read/write setup.

If needed, you can attach a wallet later with `sdk.connectWallet(walletClient)`.

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
        apiKey: process.env.SUBGRAPH_API_KEY,
        endpoint: process.env.SUBGRAPH_ENDPOINT,
      }
    }
  });
```

The `extendedConfig` parameter is optional. If you do not provide it, the SDK uses the development endpoint. That endpoint is rate-limited, so using your own API key is strongly recommended. For more information, see the [SSV Subgraph page](/developers/api/ssv-subgraph).

### Initialization Parameters

| Input name | Input type | Optional |
|------------|------------|----------|
| publicClient | [Viem public client](https://viem.sh/docs/clients/public) | No |
| walletClient | [Viem wallet client](https://viem.sh/docs/clients/wallet) | Yes |
| SUBGRAPH_API_KEY | API key retrieved from [The Graph account](https://thegraph.com/studio/apikeys/) | Yes, strongly recommended |
| SUBGRAPH_ENDPOINT | Subgraph Endpoint retrieved from [Mainnet or Testnet subgraph page](/developers/api/ssv-subgraph/#querying-ssv-protocol-smart-contract-data) | Yes, strongly recommended  |

## Usage

Use the SDK by choosing [one of the five modules](module-reference/) and calling the function you need. For working examples, see the [Tutorials section](/developers/examples).

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
