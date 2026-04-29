---
sidebar_label: 'Update Owner Nonce'
sidebar_position: 6
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Update Owner Nonce in Key Shares

Use this flow when you need to keep the same validator public key and the same operator set, but **change the signed owner-and-nonce metadata inside `keyshares.json`**.

This is **not** an operator-change flow. It refreshes only the signed metadata portion of the key shares. This flow is also **not** a withdrawal-credential or compounding-mode migration path for an existing validator.

If you need to move a validator to a different operator set, use [Change Operator Set and Reshare Validator Key Shares](change-operator-set-and-reshare-validator-key-shares).

## Prerequisites
- [**Proofs**](ceremony-output-summary#proofs): the relevant `proofs.json`
- [**Operator Data**](operator-data): the operator information you need for the new ceremony
- [**Command or Config**](commands-and-config): the required command or YAML configuration details
- **Owner Wallet**: access to the wallet that signed the original ceremony as the `owner`

Depending on the ceremony output, `proofs.json` may be inside the validator subfolder or available as a top-level combined file.

Without the required `proofs.json`, you cannot complete this resign flow.

## Generate Resign Message

### 1. Prepare the inputs

If you need help preparing operator information, see [Operators Data](operators-data). For the related command inputs and config fields, see [Commands and Config](commands-and-config).

**Required inputs**
- `proofs.json` for the validator or validator set you are updating
- the current `owner` value, or the new `owner` value if you are changing the owner
- `nonce` of the owner address. Source the current nonce from the [SSV Subgraph](/developers/api/subgraph-examples.md#account-nonce)
- `config.yaml` with the configuration for the ceremony

**Example YAML:**

<InlineEditableCodeBlock
  language="yaml"
  template={`
validators: {{VALIDATORS}}
operatorIDs: [{{OPERATOR_IDS}}]
withdrawAddress: {{WITHDRAW_ADDRESS}}
owner: {{OWNER_ADDRESS}}
nonce: {{OWNER_NONCE}}
network: "{{NETWORK}}"
operatorsInfoPath: {{OPERATORS_INFO_PATH}}
proofsFilePath: {{PROOFS_FILE_PATH}}
tlsInsecure: true 
`}
  variables={{
    VALIDATORS: '10',
    OPERATOR_IDS: '1, 2, 3, 4',
    WITHDRAW_ADDRESS: '0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a',
    OWNER_ADDRESS: '0xa1a66CC5d309F19Fb2Fda2b7601b223053d0f7F5',
    OWNER_NONCE: '0',
    NETWORK: 'hoodi',
    OPERATORS_INFO_PATH: './data/operators_info.json',
    PROOFS_FILE_PATH: './data/output/ceremony-2024-11-18--16-04-55.529/proofs.json',
  }}
/>

### 2. Generate the message to sign

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{CONFIG_FOLDER_PATH}}:/ssv-dkg/data/ \ 
    -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" generate-resign-msg \ 
    --configPath {{CONFIG_PATH}}
`}
  variables={{
    CONFIG_FOLDER_PATH: '${PWD}',
    CONFIG_PATH: './data/config.yaml',
    DKG_VERSION: 'latest',
  }}
/>

### 3. Sign the generated message

Sign the generated message with the wallet that matches the original ceremony `owner` address:

- **For EOA**: you can sign through a tool such as [Etherscan Verified Signatures](https://etherscan.io/verifiedSignatures).
- **For multisig or smart-contract**: provide an [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271) compatible signature.
- **The resulting signature is required for the next step.**

## Resign ceremony

### 4. Run the `resign` command

Run the `resign` command to generate the new key shares, using the same `config.yaml` from the previous step:

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{CONFIG_FOLDER_PATH}}:/ssv-dkg/data/ \ 
    -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" resign \ 
    --configPath {{CONFIG_PATH}} \ 
    --signatures {{SIGNATURES}}
`}
  variables={{
    CONFIG_FOLDER_PATH: '${PWD}',
    CONFIG_PATH: './data/config.yaml',
    DKG_VERSION: 'latest',
    SIGNATURES: '0x...',
  }}
/>

### 5. Review the output and continue

After the command succeeds, review the generated files and use the updated `keyshares.json` in the next step that required the corrected owner-and-nonce payload.

For output details, see [Ceremony Output Summary](ceremony-output-summary).

:::warning Backup Output Files
Securely save output files on a separate device. They might be needed later, if you need to [Change Operator Set](change-operator-set-and-reshare-validator-key-shares) or [Update Owner Nonce](update-owner-nonce-in-key-shares).
:::