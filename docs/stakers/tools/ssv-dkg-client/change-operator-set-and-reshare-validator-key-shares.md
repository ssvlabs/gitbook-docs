---
sidebar_label: 'Change Operator Set'
sidebar_position: 5
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Change Operator Set

Use this flow when a validator was created with DKG and you need to move it to a different operator set without recreating the validator from scratch. 

The command for this is called `reshare`. The reshare flow **creates new key shares for a new operator set** by using the original ceremony proofs and a new DKG ceremony.

To prove that the same owner is authorizing the reshare, use the original `proofs.json` file for that validator or validator set.

## Prerequisites

- [**Proofs**](ceremony-output-summary#proofs): the relevant `proofs.json`
- [**Operator Data**](operator-data): the operator information you need for the new ceremony
- [**Command or Config**](commands-and-config): the required command or YAML configuration details
- **Owner Wallet**: access to the wallet that signed the original ceremony as the `owner`

Depending on the ceremony output, `proofs.json` may be inside the validator subfolder or available as a top-level combined file.

Without the required `proofs.json`, you cannot complete this reshare flow.

## Flow of the Ceremony

On a high-level the process consists of six steps:
- [Generate Reshare message](#generate-reshare-message)
- Sign the message
- [Generate new Key Shares](#reshare-ceremony)
- Remove old Key Shares
- Wait for 2-3 epochs
- Register new Key Shares

## Generate Reshare Message

### 1. Select the new operators

Choose the new operator set and prepare the required operator information as described in [Operators Data](operators-data). For the related command inputs and config fields, see [Commands and Config](commands-and-config).

### 2. Prepare config

**Required inputs**
- `proofs.json` for the validator or validator set you are resharing
- `newOperatorIDs` with the new set of operators
- Operator Data for both old and new operators
- Owner wallet access
- `nonce` of the owner address. Source the current nonce from the [SSV Subgraph](/developers/api/subgraph-examples.md#account-nonce)

<InlineEditableCodeBlock
  language="yaml"
  template={`
validators: {{VALIDATORS}}
operatorIDs: [{{OPERATOR_IDS}}]
newOperatorIDs: [{{NEW_OPERATOR_IDS}}]
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
    NEW_OPERATOR_IDS: '1, 2, 3, 5',
    WITHDRAW_ADDRESS: '0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a',
    OWNER_ADDRESS: '0xa1a66CC5d309F19Fb2Fda2b7601b223053d0f7F5',
    OWNER_NONCE: '10',
    NETWORK: 'hoodi',
    OPERATORS_INFO_PATH: './data/operators_info.json',
    PROOFS_FILE_PATH: './data/output/ceremony-2024-11-18--16-04-55.529/proofs.json',
  }}
/>

### 3. Generate the message to sign

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{CONFIG_FOLDER_PATH}}:/ssv-dkg/data/ \ 
    -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" generate-reshare-msg \ 
    --configPath {{CONFIG_PATH}}
`}
  variables={{
    CONFIG_FOLDER_PATH: '${PWD}',
    CONFIG_PATH: './data/config.yaml',
    DKG_VERSION: 'latest',
  }}
/>

### 4. Sign the generated message

Sign the generated message with the wallet that matches the original ceremony `owner` address:

- **For EOA**: you can sign through a tool such as [Etherscan Verified Signatures](https://etherscan.io/verifiedSignatures).
- **For multisig or smart-contract**: provide an [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271) compatible signature.
- **The resulting signature is required for the next step.**

## Reshare ceremony

### 5. Start the reshare ceremony

Run the `reshare` command to generate the new key shares, using the same `config.yaml` from the previous step:

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{CONFIG_FOLDER_PATH}}:/ssv-dkg/data/ \ 
    -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" reshare \ 
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

### 6. Use the new ceremony output

To understand the generated artifacts, see [Ceremony Output Summary](ceremony-output-summary).

After the reshare succeeds:
1. Review the generated files in the new `ceremony-...` folder.
2. Keep the new `proofs.json` output for future maintenance.
3. [Remove old key shares](/stakers/validator-offboarding/removing-a-validator) from SSV Network
4. Use the new `keyshares.json` to [register the validator with the new operator set](/stakers/solo-stakers/distributing-a-validator).

:::warning Backup Output Files
Securely save output files on a separate device. They might be needed later, if you need to [Change Operator Set](change-operator-set-and-reshare-validator-key-shares) or [Update Owner Nonce](update-owner-nonce-in-key-shares).
:::
