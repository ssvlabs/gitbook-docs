---
description: Quickstart
sidebar_label: 'Quickstart'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart
This page shows how to register any amount of validators to the SSV network.

:::note Prerequisite
This tutorial assumes you already have keystores generated, or will use the [*code illustrated here*](/developers/SSV-SDK/examples/create-validator-keys.md) to generate them pragmatically.
:::


### Overview

![Get Started](/img/get-started-2.avif)

Bulk registration flow is roughly outlined in the schema above. 

**Below are the actual steps you will need to take:**
1. [Installation](#1-installation)
2. [Select operators and collect their data](#2-select-operators-and-collect-their-data)
3. [Split your validator keys to shares](#3-split-validator-keys)
4. [Register your validators to the SSV network](#4-register-validators)

There is also [Full code example](#full-code-example) by the end of this page.

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

To instantiate the SDK, provide a number of parameters:

| Parameter       | Description                             |
| --------------- | --------------------------------------- |
| `public_client` | Public client object created using viem |
| `wallet_client` | Wallet object created using viem        |

You can use these like so to instantiate the SDK and store it an object:

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
  publicClient,
  walletClient,
})
```

### **2. Select operators and collect their data**
A cluster can have 4, 7, 10, or 13 operators — the bigger your cluster, the higher yearly fee, and the more reliable your validator operations.

If you already know the operator IDs you can proceed to any of the 3 options below to get their data. 

If you need to choose operators, feel free to browse [SSV Explorer](https://explorer.ssv.network/operators) to find the operators you will add to your cluster. Then proceed to the steps below. Please note, some of the operators are Private and only allow specific whitelisted addresses to onboard validators to them.

<Tabs>
  <TabItem value="subgraph" label="Subgraph">
    To generate keyshares, operator IDs and their public keys are needed. You can collect keys of each operator using [SSV Subgraph](/developers/tools/ssv-subgraph). You will need to create own Graph API key and use endpoint with it. 

    Alternatively, you can do it using [The Graph UI](https://thegraph.com/explorer/subgraphs/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh?view=Query&chain=arbitrum-one). 

    An example of how Hoodi Subgraph can fetch the operator data is below. The code snippet considers you have environment variables (`SUBGRAPH_API_KEY` and `OPERATOR_IDS`) in an `.env` file:
    ```typescript
    const operatorIDs = JSON.parse(process.env.OPERATOR_IDS)
    const url = "https://gateway.thegraph.com/api/subgraphs/id/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh";
    const query = `
    query ValidatorData($operatorIDs: [Bytes!]) {
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
    To generate keyshares, operator IDs and their public keys are needed. This can also be done with [SSV Explorer](https://explorer.ssv.network/operators).

    On each operator's page, there is a 🗝️ sign next to operator's name. Click on the key sign and their public key will be copied. Repeat the process for each operator you chose.
  </TabItem>
  <TabItem value="api" label="API">
    Operator public key can be collected using our API once you know the ID. Use [this request type](https://api.ssv.network/documentation/#/Operators/OperatorsV4Controller_getOperator) to get the data. You only need to set the network and operator ID.

```bash
curl -X 'GET' \
  'https://api.ssv.network/api/v4/hoodi/operators/1' \
  -H 'accept: */*'
```

From the response you will need `id` and `public_key` contents:
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

Pass the collected operator info into ```generateKeyShares``` function in the code below.

### **3. Split validator keys**
Use the collected data and your keystore to generate the keyshare transaction payload. 

The code snippet below considers you have environment variables (`KEYSTORE_PASSWORD` and `OWNER_ADDRESS`)  in an `.env` file. Also, `nonce` is being handled automatically in the [full code example](#full-code-example):

```typescript
const keysharesPayload = await sdk.utils.generateKeyShares({
    keystore: keystoreValues,
    keystore_password: process.env.KEYSTORE_PASSWORD,
    operator_keys: operators.map((operator: { id: string; publicKey: string }) => operator.publicKey),
    operator_ids: operators.map((operator: { id: string; publicKey: string }) => Number(operator.id)),
    owner_address: process.env.OWNER_ADDRESS,
    nonce: nonce,
})
```

Before doing the registration transaction, the specified amount of SSV needs to be approved:

```typescript
await sdk.contract.token.write
.approve({
  args: {
    spender: sdk.core.contractAddresses.setter,
    amount: parseEther('10'),
  },
})
.then((tx) => tx.wait())
```

### **4. Register validators**
Then finally the `registerValidators` function can be called and return the transaction receipt:

Register your validators to the SSV network is performed on completion of this function, when the transaction is processed successfully. 

```typescript
const txn_receipt = await sdk.clusters.registerValidators({ 
    args: { 
        keyshares: keysharesPayload, 
        depositAmount: parseEther('30') 
        },
    }).then(tx => tx.wait())
console.log("txn_receipt: ", txn_receipt)
```

For validator [registration transaction](/developers/smart-contracts/ssvnetwork#bulkregistervalidatorpublickey-operatorids-shares-amount-cluster) you need to provide the cluster’s latest snapshot data and the user nonce. Fortunately, SSV SDK retrieves this data automatically, so you don't have to.

### Full code example

This example assumes you already have a number of keystore files and they are stored, under whatever is set for `KEYSTORE_FILE_DIRECTORY` in the `.env` file.

**`.env` example file for the below script:**

```sh
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
OWNER_ADDRESS=0xA4831B989972605A62141a667578d742927Cbef9
KEYSTORE_PASSWORD=test1234
KEYSTORE_FILE_DIRECTORY=./validator_keys
DEPOSIT_AMOUNT=5
MINIMUM_RUNWAY_DAYS=30
OPERATOR_IDS='["1", "2", "3", "4"]'
SUBGRAPH_API_KEY=GRAPH_API_KEY
```

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
        !process.env.SUBGRAPH_API_KEY) {
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
        publicClient,
        walletClient,
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
    await sdk.contract.token.write
        .approve({
            args: {
                spender: sdk.config.contractAddresses.setter,
                amount: parseEther('10000'),
            },
        })
        .then((tx) => tx.wait())

    let nonce = Number(await sdk.api.getOwnerNonce({ owner: process.env.OWNER_ADDRESS }))
    console.log("Initial nonce: ", nonce)

    const operatorIDs = JSON.parse(process.env.OPERATOR_IDS)
    const url = "https://gateway.thegraph.com/api/subgraphs/id/F4AU5vPCuKfHvnLsusibxJEiTN7ELCoYTvnzg3YHGYbh";
    const query = `
    query ValidatorData($operatorIDs: [Bytes!]) {
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
            keystore_password: process.env.KEYSTORE_PASSWORD,
            operator_keys: operators.map((operator: { id: string; publicKey: string }) => operator.publicKey),
            operator_ids: operators.map((operator: { id: string; publicKey: string }) => Number(operator.id)),
            owner_address: process.env.OWNER_ADDRESS,
            nonce: nonce,
        })

        nonce = nonce + Number(chunk.length)
        console.log("New nonce: ", nonce)

        // TODO: validate keysharesPayload

        let txn_receipt
        try {
            console.log(`Processing chunk from index ${i} to ${i + chunk.length - 1}`);
            txn_receipt = await sdk.clusters.registerValidators({ 
                args: { 
                    keyshares: keysharesPayload, 
                    depositAmount: parseEther('30') 
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
