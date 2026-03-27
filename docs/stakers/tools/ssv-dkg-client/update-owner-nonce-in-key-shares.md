---
sidebar_label: 'Update Owner Nonce in Key Shares'
sidebar_position: 5
---

# Update Owner Nonce in Key Shares

Use this flow when the key shares themselves are still correct, but the signed owner-and-nonce payload inside `keyshares.json` needs to be regenerated.

This is **not** an operator-change flow. It keeps the same operator set and refreshes only the signed metadata portion of the key shares.

## Before you begin

Make sure you have:
- the original `proofs.json` file from the DKG ceremony
- the operator information used for the validator
- access to the owner wallet that must sign the update

## 1. Prepare the inputs

If you need help preparing operator information, see [Generate Key Shares](./generate-key-shares).

## 2. Generate the message to sign

Use `generate-resign-msg` to create the message that the owner wallet must sign.

### Required inputs
- `proofs.json`
- the current or updated `owner` value, if you are changing the owner

### Command

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data -it "ssvlabs/ssv-dkg:latest" generate-resign-msg --configPath ./data/config/config.yaml
```

:::warning
Provide `proofsFilePath` in the YAML file or as a command-line flag.

If you are changing the owner address, also provide the new `owner` value.
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
```

See [Commands and Config](/stakers/tools/ssv-dkg-client/commands-and-config) for YAML, binary, and flag details.

### Sign the generated message

Sign the generated message with the owner wallet.

- For an EOA, you can use [Etherscan Verified Signatures](https://etherscan.io/verifiedSignatures).
- For a multisig or smart-contract wallet, provide an [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271) compatible signature.

Keep the resulting signature for the next step.

## 3. Run the `resign` command

Use the owner signature to regenerate the signed payload in the key shares.

### Required inputs
- `proofs.json`
- `signatures`
- the rest of the DKG config values for the same validator set

### Expected output
- updated ceremony output with regenerated key shares metadata

### Command

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data -it "ssvlabs/ssv-dkg:latest" resign --configPath ./data/config/config.yaml
```

:::warning
Provide both `proofsFilePath` and `signatures` in the YAML file or as command-line flags.
:::

Example YAML:

```yaml
validators: 10
operatorIDs: [1, 2, 3, 4]
withdrawAddress: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
owner: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
nonce: 0
tlsInsecure: true 
network: "hoodi"
operatorsInfoPath: /data/initiator/operators_info.json
proofsFilePath: ./output/ceremony-2024-11-18--16-04-55.529/proofs.json
signatures: 0eb5bce8a1bf52f106233954b096504c934d08962003c41eff1a29e05ddeeebe34133dd66c7fa9512ae74d3124a9f60ee270f312c08c60512a5009ac9bca78911b
```

## 4. Review the output and continue

After the command succeeds, review the generated files and use the updated `keyshares.json` in the next step that required the corrected owner-and-nonce payload.

For output details, see [Ceremony Output Summary](ceremony-output-summary).
