---
sidebar_position: 1
---

# Create Validator Keys

The [SSV SDK](/developers/SSV-SDK/) does not natively generate validator keystores programmatically. This guide shows how to generate validator keys, keystores, and deposit data with external libraries.

Alternatively, you can use the [Ethereum Staking Deposit CLI](https://github.com/ethstaker/ethstaker-deposit-cli) to generate validator keys. The CLI supports multiple networks, including Ethereum mainnet and testnets such as Hoodi.

:::warning
This process is not part of the SSV SDK. Use the external tools in this example at your own discretion.
:::

## Prerequisites

Before using this example, make sure you have:

- [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed
- A withdrawal address to use for the validator
- A password to encrypt the generated keystore files

## Set Up the Project

Initialize a new Node.js project if needed:

```bash
npm init -y
```

Add the following to your `package.json`:

```json title="package.json"
{
  "type": "module",
  "overrides": {
    "@lodestar/spec-test-util": {
      "vitest": "^3.2.4"
    }
  }
}
```

This override ensures compatibility with [`Lodestar`](https://www.npmjs.com/package/@lodestar/config) dependencies when installing with `npm`.

## Install Dependencies

Install the packages required to run the script below.

```bash
npm install viem @chainsafe/bls-keygen @chainsafe/bls-keystore @chainsafe/bls @chainsafe/ssz @lodestar/config @lodestar/params @lodestar/state-transition @lodestar/types abitype dotenv
```

## Generate Validator Keys

The example below defines a `createValidatorKeys` helper that generates validator keys, encrypted keystores, and deposit data for one or more validators.

```ts title="create-validator-keys.ts"
import 'dotenv/config'
import { deriveEth2ValidatorKeys, generateRandomSecretKey } from '@chainsafe/bls-keygen'
import { create } from '@chainsafe/bls-keystore'
import bls from '@chainsafe/bls/herumi'
import { fromHexString, toHexString } from '@chainsafe/ssz'
import type { ChainConfig } from '@lodestar/config'
import { hoodiChainConfig, mainnetChainConfig } from '@lodestar/config/networks'
import { DOMAIN_DEPOSIT } from '@lodestar/params'
import { ZERO_HASH, computeDomain, computeSigningRoot } from '@lodestar/state-transition'
import { ssz } from '@lodestar/types/phase0'
import type { Address } from 'abitype'
import type { Hex } from 'viem'
import { sha256, toBytes, toHex } from 'viem'

type SupportedChains = 'mainnet' | 'hoodi'

const chainConfigs: Record<SupportedChains, ChainConfig> = {
  mainnet: mainnetChainConfig,
  hoodi: hoodiChainConfig,
}

type ValidatorKeysArgs = {
  index?: number
  count: number
  chain: SupportedChains
  withdrawal: Address
  password: string
  masterSK?: Uint8Array
}

export type DepositData = {
  pubkey: string
  withdrawal_credentials: string
  amount: number
  signature: string
  deposit_message_root: string
  deposit_data_root: string
  fork_version: string
  network_name: SupportedChains
}

// Add this verification function
function verifyDepositRoot(
  pubkey: Hex,
  withdrawalCredentials: Hex,
  amount: number,
  signature: Hex,
  expectedRoot: Hex,
): boolean {
  // Pad pubkey with 16 zero bytes
  const pubkeyPadded = toBytes(pubkey)
  const padding16 = new Uint8Array(16)
  const pubkeyRoot = sha256(new Uint8Array([...pubkeyPadded, ...padding16]), 'bytes')

  // Split and pad signature
  const signatureBytes = toBytes(signature)
  const signaturePart1 = signatureBytes.slice(0, 64)
  const signaturePart2 = new Uint8Array([...signatureBytes.slice(64), ...new Uint8Array(32)])

  const signatureRoot = sha256(
    new Uint8Array([
      ...new Uint8Array(sha256(signaturePart1, 'bytes')),
      ...new Uint8Array(sha256(signaturePart2, 'bytes')),
    ]),
    'bytes',
  )

  // Pack amount with 24 zero bytes
  const amountBytes = new Uint8Array(8)
  new DataView(amountBytes.buffer).setBigUint64(0, BigInt(amount), true)
  const amountPadded = new Uint8Array([...amountBytes, ...new Uint8Array(24)])

  const node = sha256(
    new Uint8Array([
      ...sha256(new Uint8Array([...pubkeyRoot, ...toBytes(withdrawalCredentials)]), 'bytes'),
      ...sha256(new Uint8Array([...amountPadded, ...signatureRoot]), 'bytes'),
    ]),
    'bytes',
  )

  return toHex(node) === expectedRoot
}

export async function createValidatorKeys({
  index = 0,
  count,
  chain,
  withdrawal,
  password,
  masterSK = generateRandomSecretKey(),
}: ValidatorKeysArgs) {
  const keystores = []
  const deposit_data = []

  const chainConfig = chainConfigs[chain]

  for (let i = index; i < count; i++) {
    const sk = bls.SecretKey.fromBytes(deriveEth2ValidatorKeys(masterSK, i).signing)
    const pubkey = sk.toPublicKey()
    const pubkeyBytes = pubkey.toBytes()

    const keystore = await create(password, sk.toBytes(), pubkeyBytes, `m/12381/3600/${i}/0/0`)
    keystores.push(keystore)

    // Generate deposit data
    const withdrawalCredentials = fromHexString(
      '0x010000000000000000000000' + withdrawal.replace('0x', ''),
    )

    const depositMessage = {
      pubkey: pubkeyBytes,
      withdrawalCredentials,
      amount: 32e9,
    }

    const domain = computeDomain(DOMAIN_DEPOSIT, chainConfig.GENESIS_FORK_VERSION, ZERO_HASH)

    const signingRoot = computeSigningRoot(ssz.DepositMessage, depositMessage, domain)

    const depositData = {
      ...depositMessage,
      signature: sk.sign(signingRoot).toBytes(),
    }

    const depositDataRoot = ssz.DepositData.hashTreeRoot(depositData)

    const generated = {
      pubkey: toHexString(pubkey.toBytes()).replace('0x', ''),
      withdrawal_credentials: toHexString(withdrawalCredentials).replace('0x', ''),
      amount: 32000000000,
      signature: toHexString(depositData.signature).replace('0x', ''),
      deposit_message_root: toHexString(signingRoot).replace('0x', ''),
      deposit_data_root: toHexString(depositDataRoot).replace('0x', ''),
      fork_version: toHexString(chainConfig.GENESIS_FORK_VERSION).replace('0x', ''),
      network_name: chain,
    }

    // Add verification before pushing to deposit_data
    const isValid = verifyDepositRoot(
      `0x${generated.pubkey}`,
      `0x${generated.withdrawal_credentials}`,
      generated.amount,
      `0x${generated.signature}`,
      `0x${generated.deposit_data_root}`,
    )

    if (!isValid) {
      throw new Error(`Generated deposit data verification failed for validator ${i}`)
    }
    
    deposit_data.push(generated)
  }

  return {
    keystores,
    deposit_data,
    masterSK,
  }
}

// Example usage: generate validator keys using environment variables
const result = await createValidatorKeys({
  count: Number(process.env.COUNT),
  chain: process.env.CHAIN as SupportedChains,
  withdrawal: process.env.WITHDRAWAL_ADDRESS as Address,
  password: process.env.KEYSTORE_PASSWORD as string,
})

// Output generated keystores, deposit data, and master secret key
console.log(result)
```

## Configure Environment Variables

This example assumes you load the required inputs from environment variables.

If you use a `.env` file for development, ensure it is added to `.gitignore` so it is not committed to version control. Sensitive data such as passwords or private keys should never be stored in your repository.

```bash
WITHDRAWAL_ADDRESS=INSERT_WITHDRAWAL_ADDRESS
KEYSTORE_PASSWORD=INSERT_PASSWORD
COUNT=INSERT_NUMBER_OF_VALIDATORS
CHAIN=INSERT_NETWORK
```

## Run the Script

Run the script using your preferred TypeScript runtime.

```bash
npx tsx create-validator-keys.ts
```
