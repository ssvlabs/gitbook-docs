---
sidebar_label: 'Update Owner Nonce in Key Shares'
sidebar_position: 5
---

# Update Owner Nonce in Key Shares

The shares data payload of a `keyshares.json` file contains the shares for each operator, the validator public key, and a signed message, which contains the owner address, and its nonce, to prevent re-entry exploits.

Sometimes this message part is source of confusion and mistakes by the users, as they might rely on the wrong data source for the `nonce`, or they may simply initiated the DKG ceremony using the wrong `owner`.

In order to fix these kind of issues, the `ssv-dkg` tool offers a `resign` feature, that allows users to regenerate Key Shares with the same operator set, essentially leaving the shares untouched, just refreshing the signed message portion of the shares data.

## 1. Select Operators

To select operators and obtain the information necessary for a DKG ceremony, please refer to [this section in the Generate Key Shares guide](./generate-key-shares).

## 2. Generate message to be signed

Regenerating Key Shares has important security implications, so to make this procedure safe, it is necessary for the entity initiating it to provide proof that they are the same entity that participated in the initial DKG ceremony.

Luckily, such proof takes the form of a `proofs.json` file which is part of the output of all DKG ceremonies.

As an additional form of security, it is required that the initiating entity signs a message containing this proof, with the wallet indicated as the `owner` in the initial ceremony. The `ssv-dkg` tool has a handy command that takes the `proofs.json` file as input, and generates the message to be signed as output.

To generate the message to be signed, you need to use the `generate-resign-msg` option.  If using docker, you can use this command:

:::warning
Make sure to add the `proofsFilePath` configuration parameter either via command line flags, or the YAML file config parameter.

Also, if you are changing the owner, remember to provide the new value of the `owner` command line flag, or the YAML file config parameter.
:::


```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data -it "ssvlabs/ssv-dkg:latest" generate-resign-msg --configPath ./data/config/config.yaml
```


:::info
It is advised launching the tool as a Docker image as it is the most convenient way and only requires to have Docker installed. The team builds a Docker image with every release of the tool.
:::

Here's an example of a YAML config file to launch a DKG ceremony:

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

* For more information on the YAML file configuration, and how to provide it to the tool, [please refer to this section (Additional flag for generate-resign-msg)](/developers/tools/ssv-dkg-client/commands-and-config). Make sure to add the `proofsFilePath` argument. Just remember that the path to the config file needs to be provided via the `--configPath` flag.
* Alternatively, the tool can be launched as a binary executable. For more information, please [refer to the appropriate section of this page](/developers/tools/ssv-dkg-client/commands-and-config)
* For the reference of command line flags, [please refer to this section (Additional flag for generate-resign-msg)](/developers/tools/ssv-dkg-client/commands-and-config), instead. Remember to add the `proofsFilePath` argument.

This generated message then needs to be signed by the wallet belonging to the `owner` address specified in the initial ceremony (which has to be the same as the one used during the reshare). This can be done [via etherscan](https://etherscan.io/verifiedSignatures), for example, in case of an EOA wallet. Since it is also possible for multi-sig wallets to be the `owner` address for validators, these will have to [provide a signature based on ERC-1271](https://eips.ethereum.org/EIPS/eip-1271).

Once the message is signed, the actual ceremony itself will take this as the input, instead.

## 3. Start DKG resign ceremony

To initiate the DKG ceremony and regenerate the signed message in the Key Shares, you need to use the `resign` option.  If using docker, you can use this command:

:::warning
Make sure to add the `proofsFilePath` and `signatures` configuration parameters either via command line flags, or the YAML file
:::

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data -it "ssvlabs/ssv-dkg:latest" resign --configPath ./data/config/config.yaml
```

:::info
It is advised launching the tool as a Docker image as it is the most convenient way and only requires to have Docker installed. The team builds a Docker image with every release of the tool.
:::

Here's an example of a YAML config file to launch a DKG ceremony:

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

* For more information on the YAML file configuration, and how to provide it to the tool, [please refer to this section (Additional flag for resign command)](/developers/tools/ssv-dkg-client/commands-and-config). Make sure to add the `proofsFilePath` and `signatures` arguments. Just remember that the path to the config file needs to be provided via the `--configPath` flag.
* Alternatively, the tool can be launched as a binary executable. For more information, please [refer to the appropriate section of this page](/developers/tools/ssv-dkg-client/commands-and-config)
* For the reference of command line flags, [please refer to this section (Additional flag for resign command)](/developers/tools/ssv-dkg-client/commands-and-config), instead. Remember to add the `proofsFilePath` and `signatures` arguments.

For more information about the output of a DKG ceremony, and what each file does, what you should use it for, please refer to the [Ceremony Output Summary page](ceremony-output-summary.md).
