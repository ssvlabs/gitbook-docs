---
sidebar_label: 'Commands and Configuration'
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Commands and configuration

:::info
For details about `operatorsInfo` and `operatorsInfoPath`, see [Operators Data](operators-data).
:::

## Supported commands

- `init` - start a new DKG ceremony and generate validator key shares
- `generate-reshare-msg` - generate the owner-signed message required before a reshare ceremony
- `reshare` - generate new key shares for a different operator set
- `generate-resign-msg` - generate the owner-signed message required before a resign ceremony
- `resign` - regenerate signed key shares metadata for the same validator public key
- `ping` - check operator health endpoints before starting a ceremony
- `start-operator` - run the DKG server as an operator (for instructions, refer to [Operator section](/operators/operator-node/setup-sidecars/enabling-dkg/))

## Config input methods

You can provide config in either of these ways:

- a YAML file with `--configPath` (recommended)
- command-line flags

The config options below are used by `init`, and are also reused by `generate-resign-msg`, `resign`, `generate-reshare-msg`, and `reshare` where relevant.

## Base initiator options

<Tabs>
<TabItem value="yaml" label="YAML configuration">

### YAML variables

| Variable | Type | Description |
| --- | --- | --- |
| `validators` | uint | Number of validators to generate. Valid range: `1` to `100`. |
| `operatorIDs` | number[] | Operator IDs used in the ceremony. |
| `operatorsInfo` | string | Raw JSON string with operator IDs, RSA public keys, and endpoints. |
| `operatorsInfoPath` | string | Local path to the operator info JSON file. |
| `owner` | address | SSV cluster owner address. |
| `nonce` | uint64 | [Owner nonce for the SSV contract operations](/developers/api/subgraph-examples#account-nonce).  |
| `withdrawAddress` | address | Withdrawal address used to build Beacon Chain withdrawal credentials. |
| `compounding` | bool | If `true`, use `0x02` compounding 0x02 withdrawal credentials. If `false`, use `0x01` ETH1 withdrawal credentials. |
| `amount` | uint64 | Deposit amount in Gwei. |
| `network` | string | Network name: `mainnet`, `hoodi`, or `sepolia`. |
| `outputPath` | string | Local output directory. |
| `logLevel` | string | Log level. |
| `logFormat` | string | Log format. |
| `logLevelFormat` | string | Log level formatting. |
| `logFilePath` | string | Local log file path. |
| `tlsInsecure` | bool | `true` Skips TLS certificate verification for operator endpoints. |
| `clientCACertPath` | string[] | Local path(s) to CA certificates when `tlsInsecure` is `false`. |

### Base YAML example

<InlineEditableCodeBlock
  language="yaml"
  template={`
validators: {{VALIDATORS}}
operatorIDs: [{{OPERATOR_IDS}}]
withdrawAddress: {{WITHDRAW_ADDRESS}}
owner: {{OWNER_ADDRESS}}
nonce: {{OWNER_NONCE}}
network: {{NETWORK}}
compounding: false 
amount: {{AMOUNT}}
operatorsInfoPath: {{OPERATORS_INFO_PATH}}
outputPath: {{OUTPUT_PATH}}
logFilePath: {{LOG_FILE_PATH}}
logLevel: info
logFormat: json
logLevelFormat: capitalColor
tlsInsecure: true
# Optional if tlsInsecure is false:
# clientCACertPath:
#   - /etc/ssl/certs/ca-certificates.crt
`}
  variables={{
    VALIDATORS: '1',
    OPERATOR_IDS: '1, 2, 3, 4',
    WITHDRAW_ADDRESS: '0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a',
    OWNER_ADDRESS: '0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a',
    OWNER_NONCE: '0',
    AMOUNT: '32000000000',
    NETWORK: 'hoodi',
    OPERATORS_INFO_PATH: './data/operators_info.json',
    OUTPUT_PATH: './data/output',
    LOG_FILE_PATH: './data/debug.log',
  }}
/>

</TabItem>

<TabItem value="flags" label="Command-line flags">

### CLI flags

| Flag | Type | Description |
| --- | --- | --- |
| `--validators` | uint | Number of validators to generate. Valid range: `1` to `100`. |
| `--operatorIDs` | number[] | Operator IDs used in the ceremony. |
| `--operatorsInfo` | string | Raw JSON string with operator IDs, RSA public keys, and endpoints. |
| `--operatorsInfoPath` | string | Local path to the operator info JSON file. |
| `--owner` | address | SSV cluster owner address. |
| `--nonce` | uint64 | Owner nonce for the SSV contract. |
| `--withdrawAddress` | address | Withdrawal address used to build Beacon Chain withdrawal credentials. |
| `--compounding` | bool | Use `0x02` compounding withdrawal credentials instead of `0x01`. |
| `--amount` | uint64 | Deposit amount in Gwei. |
| `--network` | string | Network name. |
| `--tlsInsecure` | bool | Skip TLS certificate verification. |
| `--clientCACertPath` | string[] | Local path(s) to CA certificates when `tlsInsecure` is `false`. |
| `--outputPath` | string | Local output directory. |
| `--configPath` | string | Local path to a YAML config file. |
| `--logLevel` | string | Log level. |
| `--logFormat` | string | Log format. |
| `--logLevelFormat` | string | Log level formatting. |
| `--logFilePath` | string | Local log file path. |

### Example

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{HOST_PATH}}:/ssv-dkg/data/ -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" init \ 
  --owner {{OWNER_ADDRESS}} \ 
  --nonce {{OWNER_NONCE}} \ 
  --withdrawAddress {{WITHDRAWAL_ADDRESS}} \ 
  --compounding \ 
  --operatorIDs {{OPERATOR_IDS_LIST}} \ 
  --operatorsInfoPath ./data/config/operators_info.json \ 
  --network {{NETWORK}} \ 
  --tlsInsecure \ 
  --validators {{VALIDATORS}} \ 
  --outputPath ./data/output
`}
  variables={{
    HOST_PATH: '${PWD}',
    DKG_VERSION: 'latest',
    OWNER_ADDRESS: '0x...',
    OWNER_NONCE: '0',
    WITHDRAWAL_ADDRESS: '0x...',
    OPERATOR_IDS_LIST: '[1,2,3,4]',
    VALIDATORS: '1',
    AMOUNT: '32000000000',
    NETWORK: 'hoodi',
  }}
/>

</TabItem>
</Tabs>

### Notes

- Local file paths only are allowed.
- `operatorsInfo` and `operatorsInfoPath` are mutually exclusive.
- When `compounding: true` is set, generated `deposit_data.json` uses `0x02` withdrawal credentials.
- `nonce` is the owner address' nonce used for SSV contract operations. Source the current nonce from the [SSV Subgraph](/developers/api/subgraph-examples.md#account-nonce)

## Additional options by command

### `generate-resign-msg`

Additional inputs:

| Key or flag | Type | Description |
| --- | --- | --- |
| `proofsFilePath` / `--proofsFilePath` | string | Local path to `proofs.json`. |
| `proofsString` / `--proofsString` | string | Stringified proof content. |

Use exactly one of `proofsFilePath` or `proofsString`.

### `resign`

Additional inputs:

| Key or flag | Type | Description |
| --- | --- | --- |
| `proofsFilePath` / `--proofsFilePath` | string | Local path to `proofs.json`. |
| `proofsString` / `--proofsString` | string | Stringified proof content. |
| `signatures` / `--signatures` | string | Owner signature for the resign message. |

### `generate-reshare-msg`

Additional inputs:

| Key or flag | Type | Description |
| --- | --- | --- |
| `proofsFilePath` / `--proofsFilePath` | string | Local path to `proofs.json`. |
| `proofsString` / `--proofsString` | string | Stringified proof content. |
| `newOperatorIDs` / `--newOperatorIDs` | number[] | Operator IDs for the new operator set. |

### `reshare`

Additional inputs:

| Key or flag | Type | Description |
| --- | --- | --- |
| `proofsFilePath` / `--proofsFilePath` | string | Local path to `proofs.json`. |
| `proofsString` / `--proofsString` | string | Stringified proof content. |
| `newOperatorIDs` / `--newOperatorIDs` | number[] | Operator IDs for the new operator set. |
| `signatures` / `--signatures` | string | Owner signature for the reshare message. |

### `ping`

Optional inputs:

| Key or flag | Type | Description |
| --- | --- | --- |
| `ip` / `--ip` | string | IP address that will overwrite address from `operatorsInfo`. |
