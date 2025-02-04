---
sidebar_position: 6
---

# Bulk Register Validators



This page show show to register any amount of validators to the SSV network.&#x20;

:::info
Prerequisite: This tutorial assumes you already have keystores generated, or will use the [code illustrated here](create-validator-keys.md) to generate them pragmatically.
:::

#### 1. Import <a href="#id-1-installation" id="id-1-installation"></a>

```typescript
import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
import { parseEther, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
```

#### 2. Instantiation[​](https://coruscating-salmiakki-327f4b.netlify.app/build/SSV-SDK/get-started#3-instantiation) <a href="#id-3-instantiation" id="id-3-instantiation"></a>

To instantiate the SDK, provide a number of parameters:

| Parameter       | Description                             |
| --------------- | --------------------------------------- |
| `public_client` | Public client object created using viem |
| `wallet_client` | Wallet object created using viem        |

You can use these like so to instantiate the SDK and store it an object:

```typescript
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

#### 3. Usage[​](https://coruscating-salmiakki-327f4b.netlify.app/build/SSV-SDK/get-started#4-usage) <a href="#id-4-usage" id="id-4-usage"></a>

Next we can use that keystore to generate our keyshare transaction payload:

```typescript
const keysharesPayload = await sdk.utils.generateKeyShares({
  keystore: JSON.stringify(keystore),
  keystore_password: 'test1234',
  operator_keys: ["LS0tLS1...","LS0tLS2...","LS0tLS3...","LS0tLS4..."],
  operator_ids: ["5","8","9","10"],
  owner_address: "YOUR_OWNER_ADDRESS",
  nonce: "NONCE_OF_OWNER_ADDRESS",
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

Then finally the `registerValidators` function can be called and return the transaction receipt:

```typescript
const txn_receipt = await sdk.clusters.registerValidators({ 
    args: { 
        keyshares: keysharesPayload, 
        depositAmount: parseEther('30') 
        },
    }).then(tx => tx.wait())
console.log("txn_receipt: ", txn_receipt)
```

### Full code example

This example assumes you already have a number of keystore files and they are stored, under whatever is set for `KEYSTORE_FILE_DIRECTORY` in the .env file.

**Install:**

```bash
npm install @ssv-labs/ssv-sdk fs path
```

**.env example file for the below script:**

```sh
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
OWNER_ADDRESS=0xA4831B989972605A62141a667578d742927Cbef9
KEYSTORE_PASSWORD=test1234
KEYSTORE_FILE_DIRECTORY=./validator_keys
DEPOSIT_AMOUNT=5
MINIMUM_RUNWAY_DAYS=30
```

```typescript
import { SSVSDK, chains } from '@ssv-labs/ssv-sdk'
import { operators } from './mock'
import { parseEther, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function main(): Promise<void> {

    if (!process.env.KEYSTORE_FILE_DIRECTORY || 
        !process.env.OWNER_ADDRESS || 
        !process.env.KEYSTORE_PASSWORD) {
        throw new Error('Required environment variables are not set');
    }

    const private_key: `0x${string}` = process.env.PRIVATE_KEY as `0x${string}`;

    // Setup viem clients
    const chain = chains.holesky // or chains.mainnet
    const transport = http()

    const publicClient = createPublicClient({
        chain,
        transport
    })

    const account = privateKeyToAccount(private_key as `0x${string}`)
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

    console.log(operators.keys)
    console.log(operators.ids.map((id) => Number(id)))

    const directoryPath = process.env.KEYSTORE_FILE_DIRECTORY;
    let keystoresArray: { name: string; keystore: any }[];
    try {
        keystoresArray = await loadKeystores(directoryPath);
        console.log('Loaded keystores: Keystore Amount: ', keystoresArray.length);
    } catch (error) {
        console.error('Failed to load keystores:', error);
        throw error; // Exit if we can't load keystores
    }

    // Now we know keystoresArray is defined
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

    const chunkSize = 40; // Number of validators per transaction 
    for (let i = 0; i < keystoresArray.length; i += chunkSize) {
        const chunk = keystoresArray.slice(i, i + chunkSize);

        const keystoreValues = chunk.map(item => item.keystore);

        const keysharesPayload = await sdk.utils.generateKeyShares({
            keystore: keystoreValues,
            keystore_password: process.env.KEYSTORE_PASSWORD,
            operator_keys: operators.keys,
            operator_ids: operators.ids.map((id) => Number(id)),
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
