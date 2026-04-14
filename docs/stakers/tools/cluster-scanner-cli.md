---
title: Cluster Scanner CLI
sidebar_position: 2
unlisted: true
---

# SSV Scanner CLI

The `SSV Scanner CLI` tool is a command-line interface that retrieves events data from the SSV network contract.

## Video tutorial

A tutorial on using SSV Scanner tool was recorded by a member of SSV community. Take a look at it if you think a video would be useful:

<iframe width="560" height="315" src="https://www.youtube.com/embed/k3etRnqUOUs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Installation

Prerequisites: This tool requires [NodeJS](https://nodejs.org/en/download/) installed on your machine.

```bash
git clone https://github.com/ssvlabs/ssv-scanner.git
cd ssv-scanner
yarn
```

### Commands

| Command | Description |
|---------|-------------|
| `cluster` | This command is used to retrieve the latest snapshot of a provided cluster from the SSV network contract. |
| `nonce` | This command is used to retrieve the validator registration nonce of a provided account from the SSV network contract. |

### `cluster` Arguments

You can use **`yarn cli cluster --help`** to see all arguments and their descriptions.

| Argument | Type | Description |
|----------|------|-------------|
| `--node-url (-n)` | string | ETH1 (execution client) node endpoint URL |
| `--ssv-contract-address (-ca)` | string | The SSV network contract address |
| `--owner-address (-oa)` | int | The cluster owner address (in the SSV contract) |
| `--operator-ids (-oids)` | string | Comma-separated list of operator IDs. The amount must be 3f+1 compatible. |

**Run**

```bash
yarn cli cluster -n <ETH1_NODE_ENDPOINT_URL> -ca <SSV_CONTRACT_ADDRESS> -oa <CLUSTER_OWNER_ADDRESS> -oids <OPERATOR1_ID, OPERATOR2_ID, OPERATOR3_ID, OPERATOR4_ID>
```

**Output**

The cluster snapshot breakdown and the cluster object in transaction payload format.

**Example:**

```json
Cluster snapshot:
┌─────────────────┬────────────────────────┐
│     (index)     │         Values         │
├─────────────────┼────────────────────────┤
│ validatorCount  │          '1'           │
│ networkFeeIndex │          '0'           │
│      index      │      '4647545440'      │
│     active      │          true          │
│     balance     │ '11000000000000000000' │
└─────────────────┴────────────────────────┘
{
  "block": 9215770,
  "cluster snapshot": {
    "validatorCount": "1",
    "networkFeeIndex": "0",
    "index": "4647545440",
    "active": true,
    "balance": "11000000000000000000"
  },
  "cluster": [
    "1",
    "0",
    "4647545440",
    true,
    "11000000000000000000"
  ]
}
```

### `nonce` Arguments

You can use **`yarn cli nonce --help`** to see all arguments and their descriptions.

| Argument | Type | Description |
|----------|------|-------------|
| `--node-url (-n)` | string | ETH1 (execution client) node endpoint URL |
| `--ssv-contract-address (-ca)` | string | The SSV network contract address |
| `--owner-address (-oa)` | int | The account owner address (in the SSV contract) |

**Run**

```bash
yarn cli nonce -n <ETH1_NODE_ENDPOINT_URL> -ca <SSV_CONTRACT_ADDRESS> -oa <ACCOUNT_OWNER_ADDRESS>
```

**Output**

The validator registration nonce of the provided owner (to be used in the next validator registration).

**Example:**

```json
Next nonce: 2
```