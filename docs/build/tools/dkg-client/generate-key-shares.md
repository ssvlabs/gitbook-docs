---
title: Generate Key Shares
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Generate Key Shares

## How to Initiate a DKG Ceremony

### 1. Select Operators

Select your preferred group of operators from the operator registry of the SSV network.

For each chosen operator, you must obtain its network assigned **id**, operator **key** and DKG **endpoint** (which are not provided by the `ssv-dkg` tool)

The required Operators data can be collected via the [SSV API](https://api.ssv.network/documentation/#/v4) and [SSV Explorer](https://explorer.ssv.network/).

Operators data can be supplied to the `ssv-dkg` tool as an argument or through a `json` file, as shown in the example below:

```json title="operators_info.json"
[
  {
    "id": 143,
    "public_key": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBM2VyQk9IUTVJYkJmL3lxak1UMmYKNElQYWJBMkY4YmwzQWlJVStRQlBUd2s2UFRRZS9EZVZMVkx6cm5wWFdZemNTRUZVSnZZeU5WM3ZhYkxGN2VDZwpxNlptRUJhSHN5S2NYS0g5N0JCb21VaDF4TGl5OFRGTkk0VGdjL0JwSU51dEdrRGkrVUhCT0tBcHE0TUVaSXlsCnJpTHlaeDFNZnJ6QTF0ZUNRaVJ3T2tzN0wrT1IraElNOEwvNFRtTUd4RDFhS2tXOHhpUzlKL256YXB5YkxsczMKR3cwWER0Q25XLzREWFVLSm1wLzFrMHlNeHZjT1phUjJWSjB0aUFVMjBKNDcrcUtndi9kZHI1YjNjQ2F5NDhpVQptcks2MkNEaHdyNVpqaU1WSHg2R1NJK0kvZmhMckI2Z2dSdTBYVVVFYTljNzVvR3k1SHVKSFA5dTJIQ0dZSXI5CjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
    "ip": "https://141.94.143.182:3030"
  }
]
```

### 2. Start DKG Initiator

:::info
It is advised launching the tool as a Docker image as it is the most convenient way and only requires to have Docker installed. The team builds a Docker image with every release of the tool.
:::

:::warning
**Caution for Windows Users**

Due to Windows operating system's [limitation](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=registry) on handling file paths exceeding 260 characters, please verify the length of output file paths to avoid potential issues, as this could render them inaccessible.
:::

<Tabs>
  <TabItem value="docker" label="Launch with Docker and YAML file">

All of the necessary configuration information can be provided in a YAML file (referenced as `init.yaml` from now on).

With this configuration, a typical configuration file would look like this:

```yaml title="init.yaml"
validators: 10 # amount of validators to generate (nonce incrementing by 1) (default: 1)
operatorIDs: [143, 219, 33, 34] # array of Operator IDs which will be used for a DKG ceremony
withdrawAddress: "0xa1a66cc5d309f19fb2fda2b7601b223053d0f7f4" # address where reward payments for the validator are sent
owner: "0xb64923DA2c1A9907AdC63617d882D824033a091c" # address of owner of the Cluster that will manage the validator on ssv.network
nonce: 0 # owner nonce for the SSV contract (default: 0)
network: "holesky" # network name (default: mainnet)
operatorsInfo: '[{"id": 1,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "https://localhost:3030"}, {"id": 2,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"},...]' # raw content of the JSON file with operators information
# Alternatively:
# operatorsInfoPath: /data/initiator/operators_info.json
outputPath: /data/output #  path to store the resulting staking deposit and ssv contract payload files
logLevel: info # logger's log level (default: debug)
logFormat: json # logger's encoding (default: json)
logLevelFormat: capitalColor # logger's level format (default: capitalColor)
logFilePath: /data/debug.log # path to file where logs should be written (default: ./data/debug.log)
```

  </TabItem>
  <TabItem value="source" label="Build from source">

A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

#### Clone repository

Clone the `ssv-dkg` repository in your local machine:

```bash
git clone git@github.com:ssvlabs/ssv-dkg.git
```

#### Build

From the project's root folder, run the following command:

```bash
make install
```

  </TabItem>
</Tabs>

## Ceremony Output Summary

After launching the `ssv-dkg` tool as shown above, it will commence a DKG ceremony with the selected operators.

Following the successful completion of the DKG ceremony, several files have been generated and placed in the directory where the command was launched from:

```
ceremony-[timestamp]
├── 0..[nonce]-0x...[validator public key]
    ├── deposit_data.json
    ├── keyshares.json
    └── proof.json
├── 0..[nonce]-0x...[validator public key] ...
    ├── deposit_data.json
    ├── keyshares.json
    └── proof.json
.....
├── deposit_data.json # aggregated
├── keyshares.json # aggregated
└── proofs.json  # aggregated
```

### Files:

* `deposit_data.json` - this file contains the deposit data necessary to perform the transaction on the Deposit contract and activate the validator on the Beacon layer
* `keyshares.json` - this file contains the keyshares necessary to register the validator on the ssv.network
* `proof.json` - crucial for resharing your validator to a different set of operators in the future.

## Troubleshooting

<details>

<summary>[ERROR] dial tcp timeout</summary>

```
2023-10-11T16:36:26.745937Z     FATAL   dkg-initiator   😥 Failed to initiate DKG ceremony:     {"error": "Post \"http://79.44.117.213:3030/init\": dial tcp 79.44.117.213:3030: i/o timeout"}
```

When this error appears, it means that the `ssv-dkg` tool cannot connect to one of the selected operators.

This could be temporary, but if it persists, we recommend changing one of the operators.

</details>

<details>

<summary>[ERROR] invalid URI for request</summary>

```
2023-10-11T16:29:47.226138Z     FATAL   dkg-initiator   😥 Failed to load operators:    {"error": "invalid operator URL parse \"80.181.85.114:3030\": invalid URI for request"}
```

When this error appears, it means that the endpoint information for one of the operators is incorrect.

You could manually verify the `operators_info.json` or the initiator command generated by the webapp, or simply change one of the operators.

</details>

<details>

<summary>[ERROR] connection refused</summary>

```
2023-10-13T15:21:54.597429Z     FATAL   dkg-initiator   😥 Failed to initiate DKG ceremony:     {"error": "Post \"http://80.181.85.114:3030/init\": dial tcp 80.181.85.114:3030: connect: connection refused"}
```

When this error appears, it means that the `ssv-dkg` tool cannot connect to one of the selected operators, and the reason could be because their `ssv-dkg` operator node has shut down.

This could be temporary, as they will likely start the node again, but if it persists, we recommend changing one of the operators.

</details>

<details>

<summary>[ERROR] Please provide either operator info string or path</summary>

```bash
2023-10-18T12:14:52.667985Z     FATAL   dkg-initiator   😥 Please provide either operator info string or path, not both
```

This error appears when the `operatorsInfo` argument has been used in conjunction with the `operatorsInfoPath`. These options are mutually exclusive, so please remove one or the other from your YAML config file, or from the command used to launch the initiator.

</details>
