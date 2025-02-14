---
title: BA SDK
sidebar_label: BA SDK
sidebar_position: 1
---

:::warning
The BA SDK is currently undergoing development and is subject to change.
:::


## Overview

The BA SDK is a TypeScript library that allows developers to work with the Based Applications. 

It provides a set of functions for creating and managing based applications by interacting with the [BasedAppManager](./smart-contracts/BasedAppManager.md) smart contract.

## Installation

```bash
npm i @ssv-labs/bapps-sdk
```

## Example Usage

```typescript
import { BasedAppsSDK } from "@ssv-labs/bapps-sdk";

const sdk = new BasedAppsSDK({
  chain: 17000,
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
