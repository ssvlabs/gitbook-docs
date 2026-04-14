---
sidebar_label: 'Quickstart'
sidebar_position: 1
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart

SSV Network is a permissionless network that distributes validator operations across non-trusting operators. If you're new to SSV Network, start with [the Learn section](/learn/introduction/) to understand the core concepts.

This guide shows how to generate validator keys, split them into keyshares, and register them on the Hoodi testnet with the SSV SDK.

### Introduction

Before you start, review these resources for integrating with SSV Network:
- The [quickstart below](#overview) shows how to automate bulk validator registration.
- The [Tutorials section](/developers/examples/) includes additional task-focused examples.
- On-chain data is available through the [SSV Subgraph](/developers/api/ssv-subgraph/) and the [SSV API](/developers/api/ssv-api) for items such as operator metadata.
- For programmatic integrations, use [the SSV SDK](/developers/SSV-SDK/). For module-level details, see the [SSV SDK Module Reference](/developers/SSV-SDK/module-reference/).
- You can experiment first with [the Hoodi testnet](/developers/testnet) before working with [mainnet smart contracts](/developers/smart-contracts).

### Overview

This quickstart covers these steps:
1. [Installation](#1-installation)
2. [Select operators and collect their data](#2-select-operators-and-collect-their-data)
3. [Split your validator keys to shares](#3-split-validator-keys)
4. [Register your validators to the SSV network](#4-register-validators)

The page also includes a [full code example](#full-code-example).

:::note Prerequisite
This tutorial assumes you already have keystores, or that you will use the [Create Validator Keys example](/developers/examples/create-validator-keys) to generate them programmatically.
:::

### **1. Installation**

#### Install
```bash
npm i @ssv-labs/ssv-sdk fs path web3 viem
```

#### Import

```typescript
import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
import { parseEther, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
```

#### Instantiation

To initialize the SDK, provide these parameters:

| Parameter       | Description                             |
| --------------- | --------------------------------------- |
| `publicClient` | Public client object created with viem |
| `walletClient` | Wallet client created with viem        |

You can use them like this to initialize the SDK:

```typescript
// Setup viem clients
const chain = chains.hoodi as any // or chains.mainnet
const transport = http()

const publicClient = createPublicClient({
  chain,
  transport,
}) as any

const account = privateKeyToAccount('0x...')
const walletClient = createWalletClient({
  account,
  chain,
  transport,
}) as any

// Initialize SDK with viem clients
const sdk = new SSVSDK({
    publicClient: publicClient as any,
    walletClient: walletClient as any,
    extendedConfig: {
      subgraph: {
        apiKey: process.env.SUBGRAPH_API_KEY,
        endpoint: process.env.SUBGRAPH_ENDPOINT,
      }
    }
  });
```

### **2. Select operators and collect their data**
A cluster can have 4, 7, 10, or 13 operators. If you already know the operator IDs, you can use any of the three options below to retrieve their data.

If you still need to choose operators, use [SSV Explorer](https://explorer.ssv.network/operators) to find operators for your cluster. Some operators are private and allow only specific whitelisted addresses to onboard validators.

<Tabs>
  <TabItem value="subgraph" label="Subgraph">
    To generate keyshares, you need operator IDs and public keys. You can retrieve them from the [SSV Subgraph](/developers/api/ssv-subgraph). To do this programmatically, create your own The Graph API key and use it with the subgraph endpoint.

    You can also explore the same data in [The Graph UI](https://thegraph.com/explorer/subgraphs/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh?view=Query&chain=arbitrum-one).

    The example below fetches operator data from the Hoodi subgraph. It assumes you have `SUBGRAPH_API_KEY` and `OPERATOR_IDS` in your `.env` file:
    ```typescript
    const operatorIDs = JSON.parse(process.env.OPERATOR_IDS)
    const url = "https://gateway.thegraph.com/api/subgraphs/id/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh";
    const query = `
    query OperatorData($operatorIDs: [Bytes!]) {
          operators(where: {id_in: $operatorIDs}) {
            id
            publicKey
        }
    }`

    const variables = { operatorIDs: operatorIDs }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUBGRAPH_API_KEY}`
        },
        body: JSON.stringify({ query, variables })
    });

    const responseData: any = await response.json();
    const web3 = new Web3();
    const operators: { id: string; publicKey: string }[] = responseData.data.operators.map((operator: any) => {return {
        id: operator.id,
        publicKey: web3.eth.abi.decodeParameter("string", operator.publicKey)
    }})
    ```
  </TabItem>
  <TabItem value="explorer" label="Explorer">
    To generate keyshares, you need operator IDs and public keys. You can also collect them from [SSV Explorer](https://explorer.ssv.network/operators).

    On each operator page, there is a 🗝️ icon next to the operator name. Click it to copy the public key, then repeat the process for each selected operator.
  </TabItem>
  <TabItem value="api" label="API">
    Once you know the operator ID, you can retrieve the public key from the SSV API. Use [this request](https://api.ssv.network/documentation/#/Operators/OperatorsV4Controller_getOperator) and set the network and operator ID.

```bash
curl -X 'GET' \
  'https://api.ssv.network/api/v4/hoodi/operators/1' \
  -H 'accept: */*'
```

From the response, you need the `id` and `public_key` fields:
```json
{
  "id": 1,
  "id_str": "1",
  "declared_fee": "0",
  "previous_fee": "0",
  "fee": "382640000000",
  "public_key": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeVpGNUR2M2UwSkEzT25TSGwyQmMKNGFxbmpUTWFrUXNZSkY5eE55M21CVTZSQld1d2xVd1dIelJGWUFvb0FlRER3NlYxL3hRQ0JFaWJwTGx1RVdLTgoxNmRpcU5EVmY5VEZndmZlM2NHc3pNcDZCUE04bWhBdkx0c01DcHlXeDZtTEczVm0zVVRNK3hRdUJwVFZsdHNNCkV6eUZEZzNWTlphOW9hZkswbkVYRHVidlBIbkJCdWhlUW5LZThoUkJnRUo0emIrV3dncjFrM3YyWmkwTEtWNUQKYWd3c2QxK25Lb1grVktjYmJFVFBEdGRPV1AvZlpXM3dBMGp3R1pSdkhwNS8xUjBmZy91N01BUk1KTkRWVFYxQwo0Vlh1eHJkbHZWQ2JiS1pnWUIzY1ROSEMzZkVldit0NFVEeFJuQzdUcUN0WFZSYnpZQ001WHVSeUFRa3BiYU0wCjlRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
  "owner_address": "0x3187a42658417a4d60866163A4534Ce00D40C0C8",
  "address_whitelist": "0x5E33db0b37622F7E6b2f0654aA7B985D854EA9Cb",
  "whitelist_addresses": [
    "0x5E33db0b37622F7E6b2f0654aA7B985D854EA9Cb"
  ],
  "is_private": true,
  "whitelisting_contract": "",
  "location": "United States of America",
  "setup_provider": "AWS",
  "eth1_node_client": "Geth",
  "eth2_node_client": "Prysm",
  "mev_relays": "",
  "description": "",
  "website_url": "",
  "twitter_url": "",
  "linkedin_url": "",
  "dkg_address": "",
  "logo": "https://media-v2.ssv.network/operator_1_v4_mainnet_ssvBlack.png",
  "type": "operator",
  "name": "SSV Labs",
  "performance": {
    "24h": 100,
    "30d": 99.86798961841079
  },
  "is_valid": true,
  "is_deleted": false,
  "is_active": 1,
  "status": "Active",
  "validators_count": 143,
  "version": "v4",
  "network": "mainnet"
}
```
  </TabItem>
</Tabs>

Pass the collected operator data into the `generateKeyShares` function shown below.

### **3. Split validator keys**
Use the collected operator data and your keystore to generate the keyshare transaction payload.

The snippet below assumes `KEYSTORE_PASSWORD` and `OWNER_ADDRESS` are set in your `.env` file. In the [full code example](#full-code-example), `nonce` is handled automatically:

```typescript
const keysharesPayload = await sdk.utils.generateKeyShares({
    keystore: keystoreValues,
    keystorePassword: process.env.KEYSTORE_PASSWORD,
    operatorKeys: operators.map((operator: { id: string; publicKey: string }) => operator.publicKey),
    operatorIds: operators.map((operator: { id: string; publicKey: string }) => Number(operator.id)),
    ownerAddress: process.env.OWNER_ADDRESS,
    nonce: nonce,
})
```

### **4. Register validators**
Finally, call `registerValidators` to submit the registration transaction and get the receipt:

Your validators are registered with SSV Network when the transaction completes successfully.

```typescript
const txn_receipt = await sdk.clusters.registerValidators({ 
    args: { 
        keyshares: keysharesPayload, 
        depositAmount: parseEther('30') 
        },
    }).then(tx => tx.wait())
console.log("txn_receipt: ", txn_receipt)
```

For the validator [registration transaction](/developers/smart-contracts/ssvnetwork#bulkregistervalidatorpublickey-operatorids-shares-cluster), you need the cluster's latest snapshot data and the owner nonce. The SSV SDK retrieves this data automatically.

### Full code example

This example assumes you already have multiple keystore files stored in the directory set by `KEYSTORE_FILE_DIRECTORY` in your `.env` file.

**Example `.env` file for the script below:**

<InlineEditableCodeBlock
  language="sh"
  template={
  `
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
KEYSTORE_PASSWORD=test1234
OWNER_ADDRESS={{OWNER_ADDRESS}}
KEYSTORE_FILE_DIRECTORY={{KEYSTORE_FILE_DIRECTORY}}
DEPOSIT_AMOUNT={{DEPOSIT_AMOUNT}}
OPERATOR_IDS='[{{OPERATOR_ID}}]'
SUBGRAPH_API_KEY={{SUBGRAPH_API_KEY}}
SUBGRAPH_ENDPOINT={{SUBGRAPH_ENDPOINT}}
  `
  }
  variables={{
    OWNER_ADDRESS: '0x...',
    KEYSTORE_FILE_DIRECTORY: './validator_keys',
    DEPOSIT_AMOUNT: '0.1234',
    OPERATOR_ID: '"1", "2", "3", "4"',
    SUBGRAPH_API_KEY: 'GRAPH_API_KEY',
    SUBGRAPH_ENDPOINT: 'https://gateway.thegraph.com/api/subgraphs/id/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh'
  }}
/>


```typescript
import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
import { parseEther, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import Web3 from 'web3';

dotenv.config();

async function main(): Promise<void> {

    if (!process.env.KEYSTORE_FILE_DIRECTORY || 
        !process.env.OWNER_ADDRESS || 
        !process.env.KEYSTORE_PASSWORD || 
        !process.env.OPERATOR_IDS || 
        !process.env.SUBGRAPH_API_KEY ||
        !process.env.DEPOSIT_AMOUNT) {
        throw new Error('Required environment variables are not set');
    }

    const private_key: `0x${string}` = process.env.PRIVATE_KEY as `0x${string}`;

    // Setup viem clients
    const chain = chains.hoodi as any // or chains.mainnet
    const transport = http()

    const publicClient = createPublicClient({
        chain,
        transport
    }) as any

    const account = privateKeyToAccount(private_key as `0x${string}`)
    const walletClient = createWalletClient({
        account,
        chain,
        transport,
    }) as any

    // Initialize SDK with viem clients
    const sdk = new SSVSDK({
        publicClient: publicClient as any,
        walletClient: walletClient as any,
        extendedConfig: {
        subgraph: {
            apiKey: process.env.SUBGRAPH_API_KEY,
            endpoint: process.env.SUBGRAPH_ENDPOINT,
        }
        }
    })


    const directoryPath = process.env.KEYSTORE_FILE_DIRECTORY;
    let keystoresArray: { name: string; keystore: any }[];
    try {
        keystoresArray = await loadKeystores(directoryPath);
        console.log('Loaded keystores: Keystore Amount: ', keystoresArray.length);
    } catch (error) {
        console.error('Failed to load keystores:', error);
        throw error; // If keystores can't be loaded the code will exit
    }

    // keystoresArray is defined at this point
    let nonce = Number(await sdk.api.getOwnerNonce({ owner: process.env.OWNER_ADDRESS }))
    console.log("Initial nonce: ", nonce)

    const operatorIDs = JSON.parse(process.env.OPERATOR_IDS)
    const url = "https://gateway.thegraph.com/api/subgraphs/id/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh";
    const query = `
    query OperatorData($operatorIDs: [Bytes!]) {
          operators(where: {id_in: $operatorIDs}) {
            id
            publicKey
        }
    }`

    const variables = { operatorIDs: operatorIDs }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUBGRAPH_API_KEY}`
        },
        body: JSON.stringify({ query, variables })
    });

    const responseData: any = await response.json();
    const web3 = new Web3();
    const operators: { id: string; publicKey: string }[] = responseData.data.operators.map((operator: any) => {return {
        id: operator.id,
        publicKey: web3.eth.abi.decodeParameter("string", operator.publicKey)
    }})

    console.log(operators.map((operator: { id: string; publicKey: string }) => operator.publicKey))
    console.log(operators.map((operator: { id: string; publicKey: string }) => Number(operator.id)))

    const chunkSize = 40; // Number of validators per transaction 
    for (let i = 0; i < keystoresArray.length; i += chunkSize) {
        const chunk = keystoresArray.slice(i, i + chunkSize);

        const keystoreValues = chunk.map(item => item.keystore);

        const keysharesPayload = await sdk.utils.generateKeyShares({
            keystore: keystoreValues,
            keystorePassword: process.env.KEYSTORE_PASSWORD,
            operatorKeys: operators.map((operator: { id: string; publicKey: string }) => operator.publicKey),
            operatorIds: operators.map((operator: { id: string; publicKey: string }) => Number(operator.id)),
            ownerAddress: process.env.OWNER_ADDRESS,
            nonce: nonce,
        })

        nonce = nonce + Number(chunk.length)
        console.log("New nonce: ", nonce)
        // Optional: to validate generated Keyshares you can use sdk.utils.validateSharesPreRegistration

        let txn_receipt
        try {
            console.log(`Processing chunk from index ${i} to ${i + chunk.length - 1}`);
            txn_receipt = await sdk.clusters.registerValidators({ 
                args: { 
                    keyshares: keysharesPayload, 
                    depositAmount: parseEther(process.env.DEPOSIT_AMOUNT) 
                },
            }).then(tx => tx.wait())
            console.log("txn_receipt: ", txn_receipt)
        } catch (error) {
            logErrorToFile(error);
            console.log("Failed to do register: ", error)
        }
    }
}

async function loadKeystores(directory: string): Promise<{ name: string; keystore: any }[]> {
    const keystoresArray: { name: string; keystore: any }[] = [];

    try {
        const files = await fs.promises.readdir(directory);

        for (const file of files) {
            if (file.startsWith('keystore-m') && file.endsWith('.json')) {
                const filePath = path.join(directory, file);

                const fileContent = await fs.promises.readFile(filePath, 'utf-8');
                const jsonContent = JSON.parse(fileContent);
                keystoresArray.push({ name: file, keystore: jsonContent });
            }
        }

        return keystoresArray;
    } catch (error) {
        console.error('Error loading keystores:', error);
        throw error;
    }
}

function logErrorToFile(error: unknown): void {
    const errorMessage = `Failed to do register: ${error instanceof Error ? error.message : String(error)}\n`;

    // Log the error to the console
    console.log(errorMessage);

    // Save the error message to a local file
    const filePath = './error-log.txt';
    fs.appendFile(filePath, errorMessage, (err) => {
        if (err) {
            console.error("Failed to write to file: ", err);
        } else {
            console.log(`Error saved to file: ${filePath}`);
        }
    });
}

main();
```
