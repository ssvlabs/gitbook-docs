# Generate Key Shares

## **How to** Start Decentralized Key Generation Ceremony

{% hint style="warning" %}
A new major version of the `ssv-dkg` tool has been released. The version tagged `v3.0.0` represents a major milestone that introduces new features, fixes, and legacy-breaking changes.

For this reason, it is strongly advised to upgrade, making sure to use the latest image or source code available.
{% endhint %}

The previous two sections have clarified where to source the necessary operator information, and the available options to configure and run the DKG tool.

This page covers the feature of the  `ssv-dkg` tool that allows users to generate new Key Shares through a DKG ceremony.

To initiate a DKG ceremony, you need to use the `init` option. Below, an example of a command using Docker, using a YAML file (simplest, most convenient option):

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data/ \
    -it "ssvlabs/ssv-dkg:latest" init  --configPath ./data/config/config.yaml
```

{% hint style="info" %}
It is advised launching the tool as a Docker image as it is the most convenient way and only requires to have Docker installed. The team builds a Docker image with every release of the tool.
{% endhint %}

Here's an example of a YAML config file to launch a DKG ceremony:

<pre class="language-yaml"><code class="lang-yaml"><strong>validators: 10
</strong>operatorIDs: [1, 2, 3, 4]
withdrawAddress: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
owner: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
nonce: 0
tlsInsecure: true 
network: "holesky"
operatorsInfoPath: /data/initiator/operators_info.json
</code></pre>

* For more information on the YAML file configuration, and how to provide it to the tool, [please refer to this section](dkg-tool-commands-and-configuration.md#yaml-configuration-file). Just remember that the path to the config file needs to be provided via the `--configPath` flag
* Alternatively, the tool can be launched as a binary executable. For more information, please [refer to the appropriate section of this page](dkg-tool-commands-and-configuration.md#command-line-flags)
* For the reference of command line flags, [please refer to this section](dkg-tool-commands-and-configuration.md#command-line-flags), instead

For more information about the output of a DKG ceremony, and what each file does, what you should use it for, please refer to the [Ceremony Output Summary page](ceremony-output-summary.md).
