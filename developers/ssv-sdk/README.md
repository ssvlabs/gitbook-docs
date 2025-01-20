# SSV SDK

{% hint style="warning" %}
⚠️ Development Notice: This SDK is currently under active development and testing. It is not recommended for production use at this time.

This section and SDK are a work in progress and will be continuously updated as new components of the SDK are released.
{% endhint %}

The SSV SDK is a comprehensive, open-source developer toolkit written in TypeScript, designed to empower developers to seamlessly interact with the SSV Network programmatically.&#x20;

It consolidates all necessary tooling into a single, cohesive package.

The SDK is structured into four core modules:

* **Cluster**: Manage and interact with distributed validator clusters.
* **Utils**: Utility functions to simplify development workflows.
* **API**: Streamlined access to SSV Subgraph APIs.
* **Operator**: Tools for operator-related interactions.

Explore the SDK's source code on GitHub: [SSV SDK Repository](https://github.com/ssvlabs/ssv-sdk).

## Installation

To install the SDK, run:

```bash
npm i @ssv-labs/ssv-sdk
```

## Initialization

The SDK requires specific parameters for initialization. Two that are not optional are the chain and the account. The `viem` library can be used to create an account object based off of a wallet's private key, and pass it into the SDK to instantiate it.

```typescript
import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Setup viem clients
const chain = chains.mainnet // or chains.holesky
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
})
```

### Initialization Parameters

<table><thead><tr><th></th><th width="209"></th><th></th></tr></thead><tbody><tr><td><strong>Input name</strong></td><td><strong>Input type</strong></td><td><strong>Optional</strong></td></tr><tr><td>public_client</td><td><a href="https://viem.sh/docs/clients/public.html">Viem public client</a></td><td>No</td></tr><tr><td>wallet_client</td><td><a href="https://viem.sh/docs/clients/wallet">Viem wallet client</a></td><td>No</td></tr></tbody></table>

## Usage

Use the SDK by selecting [one of the four modules ](module-reference/)and calling the desired function.

```typescript
async function main() {
    const ownerNonce = await sdk.api.getOwnerNonce({ 
        owner: "0xA4831B989972605A62141a667578d742927Cbef9" 
    })
    
    console.log(ownerNonce)
}
```
