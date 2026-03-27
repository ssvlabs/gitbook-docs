---
sidebar_label: 'Change Operator Set and Reshare Validator Key Shares'
sidebar_position: 6
---

# Change Operator Set and Reshare Validator Key Shares

Use this flow when a validator was created with DKG and you need to move it to a different operator set without recreating the validator from scratch.

## Keep these files

Before you start, make sure you still have the original ceremony artifacts, especially:
- the top-level `proofs.json`
- the operator information you need for the new ceremony
- access to the wallet that signed the original ceremony as the `owner`

Without `proofs.json`, you cannot complete this reshare flow.

## Why this flow exists

DKG never creates the full validator private key in one place. That is good for security, but it also means you cannot simply re-export the validator key and split it again later.

The reshare flow creates new key shares for a new operator set by using the original ceremony proofs and a new DKG ceremony.

## 1. Select the new operators

Choose the new operator set and prepare the required operator information as described in [Generate Key Shares](./generate-key-shares).

## 2. Generate the message to sign

To prove that the same owner is authorizing the reshare, use the original `proofs.json` file to generate a message that the owner wallet must sign.

### Required inputs
- `proofs.json`
- `newOperatorIDs`
- owner wallet access

### Command

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data/ \
    -it "ssvlabs/ssv-dkg:latest" generate-reshare-msg --configPath ./data/config/config.yaml
```

:::warning
Provide `proofsFilePath` and `newOperatorIDs` either in the YAML file or as command-line flags.
:::

Example YAML:

```yaml
validators: 10
operatorIDs: [1, 2, 3, 4]
withdrawAddress: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
owner: 0xa1a66CC5d309F19Fb2Fda2b7601b223053d0f7F5
nonce: 0
tlsInsecure: true 
network: "hoodi"
operatorsInfoPath: /data/initiator/operators_info.json
proofsFilePath: ./output/ceremony-2024-11-18--16-04-55.529/proofs.json
newOperatorIDs: [5, 6, 7, 8]
```

See [Commands and Config](/stakers/tools/ssv-dkg-client/commands-and-config) for YAML, binary, and flag details.

### Sign the generated message

Sign the generated message with the wallet that matches the original ceremony `owner` address.

- For an EOA, you can sign through a tool such as [Etherscan Verified Signatures](https://etherscan.io/verifiedSignatures).
- For a multisig or smart-contract wallet, provide an [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271) compatible signature.

The resulting signature is required for the next step.

## 3. Start the reshare ceremony

Run the `reshare` command to generate the new key shares.

### Required inputs
- `proofs.json`
- `newOperatorIDs`
- the owner signature from the previous step
- the rest of the normal DKG configuration

### Expected output
- a new `ceremony-...` folder
- new `keyshares.json`
- new proof artifacts for the new ceremony

### Command

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data/ \
    -it "ssvlabs/ssv-dkg:latest" reshare --configPath ./data/config/config.yaml
```

:::warning
Provide `proofsFilePath`, `newOperatorIDs`, and `signatures` either in the YAML file or as command-line flags.
:::

Example YAML:

```yaml
validators: 10
operatorIDs: [1, 2, 3, 4]
withdrawAddress: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
owner: 0xa1a66CC5d309F19Fb2Fda2b7601b223053d0f7F5
nonce: 0
tlsInsecure: true 
network: "hoodi"
operatorsInfoPath: /data/initiator/operators_info.json
proofsFilePath: ./output/ceremony-2024-11-18--16-04-55.529/proofs.json
newOperatorIDs: [5, 6, 7, 8]
signatures: 111886aa25a07bbd9cb64e50e3237f98a6ecabad6f448bc9c4736ccebcacb45c56ecac273b076a5d0b1f19619bf808741dff2d8019c728e16a953d3a0b5ff4771b
```

See [Commands and Config](/stakers/tools/ssv-dkg-client/commands-and-config) for the full option reference.

## 4. Use the new ceremony output

After the reshare succeeds:
1. Review the generated files in the new `ceremony-...` folder.
2. Keep the new proof artifacts for future maintenance.
3. Use the new `keyshares.json` to register the validator with the new operator set.

To understand the generated artifacts, see [Ceremony Output Summary](ceremony-output-summary).
