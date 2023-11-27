# Key resharing

Using `ssv-dkg` tool, it is also possible to change the operators managing a validator generated through a DKG ceremony.

For example, if an initial DKG ceremony created a cluster composed of operator with IDs \[1,2,3,4], the resharing ceremony can create a new cluster, with a completely different set of operators (e.g. with IDs \[5,6,7,8]) or a set with partial overlap (e.g. with IDs \[1,2,5,6]). The new threshold will be computed based on a new set of operators, using 3f+1 tolerance.

{% hint style="danger" %}
All operators (**old set and new set**) must be online to complete the resharing ceremony.
{% endhint %}

First and foremost, select the new set of operators you want to manage your validator operations. For indications on how to collect their information, please refer to [the related sections in the Key Generation page](generate-key-shares.md#1.-select-operators).

Similarly to the initiation of a new DKG ceremony, key resharing can be accomplished by launching a Docker command, or building from source and running the resulting executable.

{% tabs %}
{% tab title="Launch with Docker and YAML file" %}
All of the necessary configuration information can be provided in a YAML file (referenced as `reshare.yaml` in this section).

A good way to manage all the necessary files (`operators_info.json`, `encrypted_private_key.json`, `password`) is to store them in a single folder (in this case `initiator-config`) together with the `reshare.yaml` configuration file, like so:

```sh
ssv@localhost:~/ssv-dkg# tree initiator-config
initiator-config
├── encrypted_private_key.json
├── reshare.yaml
├── operators_info.json
└── password

1 directory, 4 files
```

With this configuration, a typical configuration file would look like this:

```yaml
operatorIDs: [1,2,3,4]    # array of Operator IDs that participated in the initial or a previous resharing DKG ceremony
newOperatorIDs: [5, 6, 7, 8]    # array of Operator IDs for which the new KeyShares of the existing validator will be generated
oldID: "dbd12b3155454666a6710a2262695bb82cda41948d612d98" # HEX of previous DKG ceremony ID. Can be found in the `keyshares-[validator-pub_key]-[ID].json`
withdrawAddress: "0xa1a66cc5d309f19fb2fda2b7601b223053d0f7f4"    # Address where reward payments for the validator are sent
owner: "0xb64923DA2c1A9907AdC63617d882D824033a091c"    # Address of owner of the Cluster that will manage the validator on ssv.network
nonce: 0    # Owner nonce for the SSV contract
network: "prater"    # Network name (default: mainnet, other options: prater)
operatorsInfoPath: /data/operators_info.json    # Path to the file containing operators information
# Alternatively:
# operatorsInfo: '[{"id": 1,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"}, {"id": 2,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"},...]'    # Raw content of the JSON file with operators information
outputPath: /data/output   #  Path to store the resulting staking deposit and ssv contract payload files
privKey: /data/encrypted_private_key.json    # Path to private key of ssv initiator
privKeyPassword: /data/password    # Path to password file to decrypt the key
# Alternatively:
# generateInitiatorKey: false # If set true - generates a new RSA key pair + random secure password. The result is stored at `outputPath`
logLevel: info    # Logger's log level (default: debug)
logFormat: json    # Logger's encoding (default: json)
logLevelFormat: capitalColor    # Logger's level format (default: capitalColor)
logFilePath: /data/debug.log    # Path to file where logs should be written (default: ./data/debug.log)
```

{% hint style="info" %}
In the config file above, `/data/` represents the container's shared volume created by the docker command itself with the `-v` option.
{% endhint %}

A special note goes to the `nonce` field, which represents how many validators the address identified in the owner parameter has already registered to the ssv.network.

You can keep track of this counter yourself, or you can use the `ssv-scanner` tool made available by the SSV team to source it. For more information, please refer to the related user guide or to its [SDK documentation page](https://docs.ssv.network/developers/tools/ssv-scanner).

{% hint style="info" %}
Note: For more details on `operatorsInfoPath` parameter, head over to the Operators data section above
{% endhint %}

```sh
docker run --name ssv_dkg_reshare \
-v "<PATH_TO_FOLDER_WITH_CONFIG_FILES>":/data -it \
"ssv-dkg:latest" /app reshare --configPath /data/reshare.yaml && \
docker rm ssv_dkg_initiator
```

Just make sure to substitute `<PATH_TO_FOLDER_WITH_CONFIG_FILES>` with the actual folder containing all the files. You can, of course, change the configuration above to one that suits you better, just be mindful about changing the path references in the docker command **and** in the `operator.yaml` file as well.

{% hint style="warning" %}
Note: It is not possible to create a new key pair during resharing. The same key used during `init` ceremony must be used.
{% endhint %}
{% endtab %}

{% tab title="Build from source" %}
A prerequisite for this is to have `go` version 1.20 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

#### Clone repository

Clone the `ssv-dkg` repository in your local machine:

```bash
git clone git@github.com:bloxapp/ssv-dkg.git
```

#### Build

From the project's root folder, run the following command:

```sh
make install
```

**Launch with command line parameters**

It is advised to store all the necessary files (`operators_info.json`, `encrypted_private_key.json`, `password`) in a single folder (in this case `initiator-config`), as shown below:

```sh
ssv@localhost:~/ssv-dkg# tree initiator-config
initiator-config
├── encrypted_private_key.json
├── operators_info.json
└── password

1 directory, 3 files
```

The Initiator provides the necessary details to run DKG ceremony between all operators via the `reshare` command. You can launch the following command with the appropriate values to each parameter:

```sh
ssv-dkg reshare \
          --operatorIDs 1,2,3,4 \
          --newOperatorIDs 5, 6, 7, 8 \
          --oldID "dbd12b3155454666a6710a2262695bb82cda41948d612d98" \
          --operatorsInfoPath ./examples/operators_integration.json \
          # Alternatively:
          # --operatorsInfo: '[{"id": 1,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"}, {"id": 2,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"},...]'
          --owner 0x81592c3de184a3e2c0dcb5a261bc107bfa91f494 \
          --nonce 4 \
          --outputPath /output \
          --privKey ./encrypted_private_key.json \
          --privKeyPassword ./password \
          --logLevel info \
          --logFormat json \
          --logLevelFormat capitalColor \
          --logFilePath ./initiator_logs/debug.log
```

Here's an explanation of each parameter:

| Argument           | type   | description                                                                                    |
| ------------------ | ------ | ---------------------------------------------------------------------------------------------- |
| `--operatorIDs`    | int\[] | array of Operator IDs that participated in the initial or a previous resharing DKG ceremony    |
| `--newOperatorIDs` | int\[] | array of Operator IDs for which the new KeyShares of the existing validator will be generated  |
| `--oldID`          | string | HEX of previous DKG ceremony ID. Can be found in the `keyshares-[validator-pub_key]-[ID].json` |

{% hint style="warning" %}
Note: It is not possible to create a new key pair during resharing. The same key used during `init` ceremony must be used.
{% endhint %}

A special note goes to the `nonce` field, which represents how many validators the address identified in the owner parameter has already registered to the ssv.network.

You can keep track of this counter yourself, or you can use the `ssv-scanner` tool made available by the SSV team to source it. For more information, please refer to the related user guide or to its [SDK documentation page](https://docs.ssv.network/developers/tools/ssv-scanner).

{% hint style="info" %}
**Note**: For more details on `operatorsInfoPath` parameter, head over to the [Operators data section](key-resharing.md#obtaining-operators-data).
{% endhint %}

**Launch with YAML config file**

It is also possible to use YAML configuration file. Just pay attention to the path of the necessary files, which needs to be changed to reflect the local configuration. If the `reshare.yaml` file is created in the same folder as the other files, and the folder structure looks like this:

```sh
ssv@localhost:~/ssv-dkg# tree initiator-config
initiator-config
├── encrypted_private_key.json
├── reshare.yaml
├── operators_info.json
└── password

1 directory, 4 files
```

Then the content of the YAML file should be changed to this:

```yaml
operatorIDs: [1,2,3,4]    # array of Operator IDs that participated in the initial or a previous resharing DKG ceremony
newOperatorIDs: [5, 6, 7, 8]    # array of Operator IDs for which the new KeyShares of the existing validator will be generated
oldID: "dbd12b3155454666a6710a2262695bb82cda41948d612d98" # HEX of previous DKG ceremony ID. Can be found in the `keyshares-[validator-pub_key]-[ID].json`
withdrawAddress: "0xa1a66cc5d309f19fb2fda2b7601b223053d0f7f4"    # Address where reward payments for the validator are sent
owner: "0xb64923DA2c1A9907AdC63617d882D824033a091c"    # Address of owner of the Cluster that will manage the validator on ssv.network
nonce: 0    # Owner nonce for the SSV contract
network: "prater"    # Network name (default: mainnet)
operatorsInfoPath: /data/operators_info.json    # Path to the file containing operators information
# Alternatively:
# operatorsInfo: '[{"id": 1,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"}, {"id": 2,"public_key": "LS0tLS1CRUdJTiBSU0....","ip": "http://localhost:3030"},...]'    # Raw content of the JSON file with operators information
outputPath: /data/output   #  Path to store the resulting staking deposit and ssv contract payload files
privKey: /data/encrypted_private_key.json    # Path to private key of ssv initiator
privKeyPassword: /data/password    # Path to password file to decrypt the key
# Alternatively:
# generateInitiatorKey: false # If set true - generates a new RSA key pair + random secure password. The result is stored at `outputPath`
logLevel: info    # Logger's log level (default: debug)
logFormat: json    # Logger's encoding (default: json)
logLevelFormat: capitalColor    # Logger's level format (default: capitalColor)
logFilePath: /data/debug.log    # Path to file where logs should be written (default: ./data/debug.log)
```

A special note goes to the `nonce` field, which represents how many validators the address identified in the owner parameter has already registered to the ssv.network.

You can keep track of this counter yourself, or you can use the `ssv-scanner` tool made available by the SSV team to source it. For more information, please refer to the related user guide or to its [SDK documentation page](https://docs.ssv.network/developers/tools/ssv-scanner).



{% hint style="info" %}
**Note**: For more details on `operatorsInfoPath` parameter, head over to the [Operators data section](key-resharing.md#obtaining-operators-data).
{% endhint %}

Then the tool can be launched from the root folder, by running this command:

```sh
ssv-dkg init --configPath ./initiator-config/reshare.yaml
```

If the `--configPath` parameter is not provided, `ssv-dkg` will be looking for a file named `config.yaml` in `./config/` folder at the same root as the binary (i.e. `./config/config.yaml`)
{% endtab %}
{% endtabs %}

### Ceremony Output and Troubleshoting

For [a summary of Ceremony Output](generate-key-shares.md#ceremony-output-summary) or indications on [how to Troubleshoot common errors](generate-key-shares.md#troubleshooting), head over to the related sections in the Key Generation page.
