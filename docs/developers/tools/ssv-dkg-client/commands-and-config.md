---
sidebar_label: 'DKG tool commands and configuration'
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DKG tool commands and configuration

The `ssv-dkg` tool can be utilized as a docker image (preferrable), or as a compiled Go binary.
Additionally, in both cases, the tool accepts configuration input via a YAML file, or as command line flags.
The sections below detail which commands are available, how to provide configuration input for them, and how to run the tool as a docker image, or as a compiled binary.

:::info
**Note**: For more details on `operatorsInfoPath` parameter, refer to the [page dedicated to Operators data](operators-data.md)
:::

### Available options
The  `ssv-dkg` tool provides 3 main functionalities, detailed in the following pages:
* [Generate new Key Shares](generate-key-shares.md)
* [Re-generate Key Shares with a different operator set](change-operator-set-and-reshare-validator-key-shares.md)
* [Re-generate the signature of Key Shares through the same operator set (changing owner, nonce)](update-owner-nonce-in-key-shares.md)
Additional option, only for SSV node operators, treated in the related section:
* [Start the DKG server](/docs/operators/operator-node/setup-sidecars/enabling-dkg/README.md)
In order to provide these features, the following options are available:
* `init` - initiates a DKG ceremony to generate new Key Shares and a new validator pubkey
* `generate-reshare-msg` - generates a message with the content of a `proofs.json` file from a past ceremony, that needs to be signed by the `owner`  used in that ceremony, in order for a `reshare` ceremony to take place
* `reshare` - initiates a DKG ceremony to re-generate Key Shares involving a different operator set
* `generate-resign-msg` - generates a message with the content of a `proofs.json` file from a past ceremony, that needs to be signed by the `owner`  used in that ceremony, in order for a `resign`ceremony to take place
* `resign` - initiates a DKG ceremony to re-generate the signature portion of existing Key Shares, providing the ability to generate Key Shares for the same validator public key, for a different `owner`, or adjusting the `nonce` for the same `owner`&#x20;

### Configuration input
As previously mentioned, the user can provide input to the tool either through a config file, or through a a series of command line flags.

<Tabs>
<TabItem value="YAML configuration file">
All of the necessary configuration information can be provided in a YAML file (referenced as `config.yaml` from now on).
With this setup, a typical configuration file would look like this:

```yaml
validators: 10 # amount of validators to generate (nonce incrementing by 1) (default: 1)
operatorIDs: [1, 2, 3, 4] # array of Operator IDs which will be used for a DKG ceremony
withdrawAddress: <WITHDRAW_ADDRESS> # address where reward payments for the validator are sent
owner: <OWNER_ADDRESS> # address of owner of the Cluster that will manage the validator on ssv.network
nonce: 0 # owner nonce for the SSV contract (default: 0)
tlsInsecure: true # skips the check for the operator's TLS certificate from a trusted third party
network: "hoodi" # network name (default: mainnet)
operatorsInfo: '[{"id": 1,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "https://localhost:3030"}, {"id": 2,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"},...]' # raw content of the JSON file with operators information
# Alternatively:
# operatorsInfoPath: /data/initiator/operators_info.json
outputPath: ./data/output #  path to store the resulting staking deposit and ssv contract payload files
logLevel: info # logger's log level (default: debug)
logFormat: json # logger's encoding (default: json)
logLevelFormat: capitalColor # logger's level format (default: capitalColor)
logFilePath: ./data/debug.log # path to file where logs should be written (default: ./data/debug.log)
clientCACertPath: ./data/tls.crt # path where the client stores the public certificate to verify the server's TLS signature (skipped if tlsInsecure is enabled)
```

:::info
If using Docker, in the config file above, `/ssv-dkg/data/` represents the container's shared volume created by the `docker` command itself with the `-v` option.
:::

A special note goes to the `nonce` field, which represents how many validators the address identified in the `owner` parameter has already registered to the ssv.network.
You can keep track of this counter yourself, or you can use [the Subgraph](../ssv-subgraph/subgraph-examples.md#account-nonce) made available by the SSV team to source it.
#### Additional flags for  `generate-resign-msg` option:
In addition to all of the flags above, the `generate-resign-msg` option requires one additional piece of information, which can be provided by two alternative configuration parameters:
Note: you need to provide **one, or the other, not both** options.

```yaml
# All previous config options are accepted, and should be included, if they are mandatory
# ...
proofsFilePath: ./data/output/ceremony-2024-10-30--10-08-19.405/proofs.json # path to the proofs file from the previous ceremony where the keyshares were generated
# Alternatively, the content of the file can be provided, instead:
proofsString: [{"proof":{"validator":"98e6f212e...","encrypted_share":"3762252c476e6ab...","share_pub":"b80a42d...","owner":"aa184b86..."},"signature":"56b6628cc0..."}]
```

#### Additional flags for `resign` option:
In addition to all of the flags above, the `resign` and option require an additional parameter:

```yaml
# All previous config options are accepted, and should be included, if they are mandatory
# ...
signatures: 011886aa25a07bbd9cb64e50e3237f98a6ecabad6f448bc9c4736ccebcacb45c56ecac273b076a5d0b1f19619bf808741dff2d8019c728e16a953d3a0b5ff4771b
```


#### Additional flags for `generate-reshare-msg` option:
Similarly to `generate-resign-msg`, this command option requires information about the `proofs.json`  file, which can be provided in two alternative ways. In addition to this, the `generate-reshare-msg` option requires an additional configuration, related to the IDs of the operators that need to generate the new shares:

```yaml
# All previous config options are accepted, and should be included, if they are mandatory
# ...
proofsFilePath: ./data/output/ceremony-2024-10-30--10-08-19.405/proofs.json # path to the proofs file from the previous ceremony where the keyshares were generated
# Alternatively, the content of the file can be provided, instead:
proofsString: [{"proof":{"validator":"98e6f212e...","encrypted_share":"3762252c476e6ab...","share_pub":"b80a42d...","owner":"aa184b86..."},"signature":"56b6628cc0..."}]
newOperatorIDs: [5, 6, 7, 8] # array of new operator IDs for resharing ceremony
```

#### Additional flags for `reshare` option:
In addition to all of the flags above, the `reshare` option require an additional parameter:

```yaml
# All previous config options are accepted, and should be included, if they are mandatory
# ...
signatures: 011886aa25a07bbd9cb64e50e3237f98a6ecabad6f448bc9c4736ccebcacb45c56ecac273b076a5d0b1f19619bf808741dff2d8019c728e16a953d3a0b5ff4771b
```

</TabItem>


<TabItem value="CLG" label="Command line flags">

Below is a reference of the command line flags for the `init` command:
<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--validators</code></td><td>int</td><td>Amount of validators to generate (nonce incrementing by 1) (default: 1)</td></tr><tr><td><code>--operatorIDs</code></td><td>int[]</td><td>Operator IDs which will be used for a DKG ceremony</td></tr><tr><td><code>--operatorsInfoPath</code></td><td>string</td><td>Path to the file containing operators information</td></tr><tr><td><code>--operatorsInfo</code></td><td>string</td><td>Raw content of the JSON file with operators information</td></tr><tr><td><code>--owner</code></td><td>address</td><td>Address of owner of the Cluster that will manage the validator on ssv.network</td></tr><tr><td><code>--nonce</code></td><td>int</td><td>Owner nonce for the SSV contract</td></tr><tr><td><code>--tlsInsecure</code> </td><td>boolean</td><td>Skips the check for the operator's SSL certificate from a trusted third party</td></tr><tr><td><code>--withdrawAddress</code></td><td>address</td><td>Address where reward payments for the validator are sent</td></tr><tr><td><code>--network</code></td><td>mainnet | prater | hoodi</td><td>Network name (default: <code>mainnet</code>)</td></tr><tr><td><code>--outputPath</code></td><td>string</td><td>Path to store results (default <code>./output</code>)</td></tr><tr><td><code>--configPath</code></td><td>string</td><td>Path to config file, i.e. <code>init.yaml</code>. If not supplied command line parameters are being used.</td></tr><tr><td><code>--logLevel</code></td><td>debug | info | warning | error | critical</td><td>Logger's log level (default: <code>debug</code>)</td></tr><tr><td><code>--logFormat</code></td><td>json | console</td><td>Logger's encoding (default: <code>json</code>)</td></tr><tr><td><code>--logLevelFormat</code></td><td>capitalColor | capital | lowercase</td><td>Logger's level format (default: <code>capitalColor</code>)</td></tr><tr><td><code>--logFilePath</code></td><td>string</td><td>Path to file where logs should be written (default: <code>./data/debug.log</code>)</td></tr><tr><td><code>--clientCACertPath</code></td><td>string</td><td>Path to client CA certificates (optional, default <code>/etc/ssl/certs/ca-certificates.crt</code>)</td></tr></tbody></table>
A special note goes to the `nonce` field, which represents how many validators the address identified in the `owner` parameter has already registered to the ssv.network.
You can keep track of this counter yourself, or you can use the `ssv-scanner` tool made available by the SSV team to source it. For more information, please refer to the related user guide or to [its SDK documentation page](/developers/tools/ssv-scanner).
#### Additional flag for `generate-resign-msg` option:
In addition to all of the flags above, the `generate-resign-msg` option requires one additional piece of information, which can be provided by two alternative configuration parameters:
<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--proofsFilePath</code></td><td>string</td><td>Path to proofs file  (i.e. <code>proofs.json</code>), provide this OR a stringified proofs</td></tr><tr><td><code>--proofsString</code></td><td>string</td><td>Stringified proofs (i.e. <code>proofs.json</code>), provide this OR a path to proofs file </td></tr></tbody></table>

#### Additional flags for `resign` commands:
In addition to all of the flags above, the `resign` option requires an additional flag:
<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--signatures</code></td><td>string</td><td>Stringified signature(s) for the resign/reshare message</td></tr></tbody></table>
#### Additional flag for `generate-reshare-msg` option:
Similarly to `generate-resign-msg`, this command option requires information about the `proofs.json`  file, which can be provided in two alternative ways. In addition to this, the `generate-reshare-msg` option requires an additional configuration, related to the IDs of the operators that need to generate the new shares:
<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--proofsFilePath</code></td><td>string</td><td>Path to proofs file  (i.e. <code>proofs.json</code>), provide this OR a stringified proofs</td></tr><tr><td><code>--proofsString</code></td><td>string</td><td>Stringified proofs (i.e. <code>proofs.json</code>), provide this OR a path to proofs file </td></tr><tr><td><code>--newOperatorIDs</code></td><td>strings</td><td>New operator IDs for resharing ceremony</td></tr></tbody></table>

#### Additional flags for `reshare` commands:
In addition to all of the flags above, the `reshare` option requires an additional flag:
<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--signatures</code></td><td>string</td><td>Stringified signature(s) for the resign/reshare message</td></tr></tbody></table>

</TabItem>
</Tabs>

:::warning  
The `ssv-dkg` tool only allows to reference local paths, for security reasons. So it is not possible to reference files or folders located in `/` or any other folder under root that it's not the current scope.
:::
:::warning
**Caution for Windows Users**
Due to Windows operating system's [limitation](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=registry) on handling file paths exceeding 260 characters, please verify the length of output file paths to avoid potential issues, as this could render them inaccessible.
:::

### Choosing how to launch the tool
:::info
It is advised launching the tool as a Docker image as it is the most convenient way and only requires to have Docker installed. The team builds a Docker image with every release of the tool.
:::

<Tabs>
<TabItem value="Docker image">
The docker image for the `ssv-dkg`  tool is tagged as `ssvlabs/ssv-dkg`.
The tool will write its output to a local folder in the container, so for convenience, to be able to export the output, a volume referencing a folder of the host has to be mounted using the `-v` parameter.
If a config file is used, the mounted volume (or volumes) will have to reference the file as well.
For instance, if the current folder has this structure:
```
ssv@localhost:~/ssv-dkg # tree .
config
├── config.yaml
└── operators_info.json
1 directory, 2 files
```
Then the following command to run the `reshare` option with a config file:

```bash
docker run --rm -v ${pwd}:/ssv-dkg/data/ -it "ssvlabs/ssv-dkg:latest" reshare --configPath ./data/config/config.yaml
```

Will mount the current folder to the `/ssv-dkg/data/` folder of the container, so the `--configPath`  is able to reference the `config.yaml`  file, located in the  `config` subfolder.
You can, of course, change the configuration to one that suits you better, just be mindful about changing the path references in the docker command **and** in the `config.yaml` file as well.
Alternatively, the tool can be launched providing the appropriate values to each configuration item via command line flag. Here's an example of a command to launch the `init` option:

```bash
docker run --rm -v ${pwd}:/ssv-dkg/data/ -it "ssvlabs/ssv-dkg:latest" init \
    --owner <OWNER_ADDRESS> \
    --nonce <OWNER_NONCE> \
    --withdrawAddress <WITHDRAWAL_ADDRESS> \
    --operatorIDs <OPERATOR_IDS_LIST> \
    --operatorsInfo "[{\"id\":121,\"public_key\":\"LS0tLS1CRUdJTiBSU0Eg...}]" \
    --network hoodi \
    --tlsInsecure \
    --validators 1 \
    --logFilePath ./data/debug.log \
    --outputPath ./data
```

</TabItem>

<TabItem value="Executable binary">

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
#### Launch a ceremony
The Initiator creates the initial details needed to run DKG between all operators via the `init` command.
The tool can be launched providing the appropriate values to each parameter. Here's an example of a command to launch the `init` option:

```bash
ssv-dkg init \
    --owner <OWNER_ADDRESS>\
    --nonce <OWNER_NONCE> \
    --withdrawAddress <WITHDRAWAL_ADDRESS> \
    --operatorIDs <OPERATOR_IDS_LIST> \
    --operatorsInfo "[{\"id\":121,\"public_key\":\"LS0tLS1CRUdJTiBSU0Eg...}]" \
    --network hoodi \
    --tlsInsecure \
    --validators 1 \
    --logFilePath ./data/debug.log \
    --outputPath ./data
```

Alternatively, here's an example of a command to run `reshare` ceremony when using a config file:
```sh
ssv-dkg reshare --configPath ./config.yaml
```
If the `--configPath` parameter is not provided, `ssv-dkg` will be looking for a file named `config.yaml` in `./config/` folder at the same root as the binary (i.e. `./config/config.yaml`)
</TabItem>
</Tabs>
