---
sidebar_label: 'Change Operator Set and Reshare Validator Key Shares'
sidebar_position: 6
---

# Change Operator Set and Reshare Validator Key Shares

A Decentralized Key Generation ceremony has a very important property: Key Shares are generated without ever revealing, let alone producing or storing the validator private key.

This very good for security, but it comes with a downside: the stake tied to the validator public key is completely dependent on the operators chosen for the key shares generation.

In a cluster of four, in the hypothetical case of two of them go permanently offline, the validator will stop attesting, and it won't be possible to exit the validator through SSV protocol either, because there won't be enough operators to successfully sign the exit message. That is, until [EIP-7002 is implemented](https://ethereum-magicians.org/t/eip-7002-execution-layer-triggerable-exits/14195).

To stop this from happening, the `ssv-dkg` latest release has introduced the possibility to generate Key Shares using a new operator set. This ceremony involves both the operator set that participate in the initial DKG ceremony (or the number necessary to reach the threshold to extrapolate the polynomial curve that defines the validator private key), and the new operator set which will generate the new Key Shares.

There can be partial overlap between the "old" and the "new" operator set, for example, only swap out one operator out of four, because they went offline.

## 1. Select Operators

To select operators and obtain the information necessary for a DKG ceremony, please refer to [this section in the Generate Key Shares guide](./generate-key-shares).

## 2. Generate message to be signed

Regenerate Key Shares has important security implications, so to make this procedure safe, it is necessary for the entity initiating it to provide proof that they are the same entity that participated in the initial DKG ceremony. Such proof takes the form of the `proofs.json` file which is part of the output of all DKG ceremonies.

As an additional form of security, it is required that the initiating entity signs a message containing this proof, with the wallet indicated as the `owner` in the initial ceremony. The `ssv-dkg` tool has a handy command that takes the `proofs.json` file as input, and generates the message to be signed as output.

To generate the message to be signed, you need to use the `generate-reshare-msg` option.  If using docker, you can use this command:

:::warning
Make sure to provide the `proofsFilePath` and `newOperatorIDs` configuration parameters either via command line flags, or the YAML file
:::

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data/ \
    -it "ssvlabs/ssv-dkg:latest" generate-reshare-msg --configPath ./data/config/config.yaml
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
newOperatorIDs: [5, 6, 7, 8]
```

* For more information on the YAML configuration file, and how to provide it to the tool, [please refer to this section (Additional flag for generate-reshare-msg)](/developers/tools/ssv-dkg-client/commands-and-config). Make sure to add the `proofsFilePath` parameter to the YAML configuration file&#x20;
* Alternatively, the tool can be launched as a binary executable. For more information, please [refer to the appropriate section of this page](/developers/tools/ssv-dkg-client/commands-and-config)
* For the reference of command line flags, [please refer to this section (Additional flag for generate-reshare-msg)](/developers/tools/ssv-dkg-client/commands-and-config), instead. Remember to add the `proofsFilePath` flag.

This generated message then needs to be signed by the wallet belonging to the `owner` address specified in the initial ceremony (which has to be the same as the one used during the reshare). This can be done [via etherscan](https://etherscan.io/verifiedSignatures), for example, in case of an EOA wallet. Since it is also possible for multi-sig wallets to be the `owner` address for validators, these will have to [provide a signature based on ERC-1271](https://eips.ethereum.org/EIPS/eip-1271).

Once the message is signed, the actual ceremony itself will take this as the input, instead.

## 3. Start DKG reshare ceremony

To initiate the DKG ceremony and regenerate the Key Shares, you need to use the  `reshare` option.  If using docker, you can use this command:

:::warning
Make sure to add the `proofsFilePath`, `newOperatorIDs` and `signatures` configuration parameter either via command line flags, or the YAML file
:::

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data/ \
    -it "ssvlabs/ssv-dkg:latest" reshare --configPath ./data/config/config.yaml
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
newOperatorIDs: [5, 6, 7, 8]
signatures: 111886aa25a07bbd9cb64e50e3237f98a6ecabad6f448bc9c4736ccebcacb45c56ecac273b076a5d0b1f19619bf808741dff2d8019c728e16a953d3a0b5ff4771b
```

* For more information on the YAML file configuration, and how to provide it to the tool, [please refer to this section (Additional flag for reshare command)](/developers/tools/ssv-dkg-client/commands-and-config).&#x20;
* Alternatively, the tool can be launched as a binary executable. For more information, please [refer to the appropriate section of this page](/developers/tools/ssv-dkg-client/commands-and-config)
* For the reference of command line flags, [please refer to this section (Additional flag for reshare command)](/developers/tools/ssv-dkg-client/commands-and-config), instead.

For more information about the output of a DKG ceremony, and what each file does, what you should use it for, please refer to the [Ceremony Output Summary page](ceremony-output-summary.md).
