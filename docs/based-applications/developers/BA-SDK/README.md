---
title: BA SDK
sidebar_label: BA SDK
sidebar_position: 3
---

:::warning
The BA SDK is currently undergoing development and is subject to change.
:::


## Overview

The BA SDK is a TypeScript library that allows developers to work with the Based Applications. 

It provides a set of functions for creating and managing based applications by interacting with the [BasedAppManager](../smart-contracts/BasedAppManager) smart contract.

The SDK is structured into 3 modules:

- `api`: Functions for obtaining any on-chain data about based applications.
- `utils`: Utility functions such as calculating weights.
- `bam`: Functions for interacting with the BasedAppManager smart contract.

Each module has a dedicated page in the [Module Reference section](./module-reference/).

## Installation

```bash
npm i @ssv-labs/bapps-sdk
```

### Initialization Parameters

| Input name | Input type | Optional |
|------------|------------|----------|
| chain | string | No |
| beaconchainUrl | string | No |

## Example Usage

```typescript
import { BasedAppsSDK } from "@ssv-labs/bapps-sdk";

const sdk = new BasedAppsSDK({
    chain: 'holesky',
    beaconchainUrl: 'https://example.com/beacon',
});

async function main(): Promise<void> {

    const obligatedBalances = await sdk.api.getObligatedBalances({
      bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
    });

    console.log("--------------------------------");
    console.log(obligatedBalances);
    console.log("--------------------------------");

}

main();
```