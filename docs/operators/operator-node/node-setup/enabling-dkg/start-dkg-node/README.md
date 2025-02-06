---
title: Start DKG Node
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start DKG Node

It is advised launching the tool with a Docker compose as it is the most convenient way and only requires to have Docker installed. The team builds a Docker image with every release of the tool.

## Configuration

All of the necessary configuration information can be provided via command line parameters, but a YAML config file is often the most convenient way, thus it's what this documentation page will be discussing.

A good way to manage all the necessary files is to store them in a single folder (in this case `ssv-dkg-data`), together with the `operator.yaml` configuration file.

If you chose to setup your SSV node with the [SSV Stack repository](../../../installation.md#install-ssv-node-stack), you should create `ssv-dkg-data` inside of the existing `ssv-stack` directory.

The final result should look like so:

```bash
ssv@localhost:~/# tree ssv-dkg-data
ssv-dkg-data
├── encrypted_private_key.json
├── operator.yaml
└── password

1 directories, 3 files
```

A typical `operator.yaml` configuration file would look like this:

```yaml
privKey: ./data/encrypted_private_key.json
privKeyPassword: ./data/password
operatorID: <YOUR_OPERATOR_ID>
port: 3030
logLevel: info
logFormat: json
logLevelFormat: capitalColor
logFilePath: ./data/debug.log
outputPath: ./data/output
ethEndpointURL: http://ethnode:8545 #HTTP Address of Execution Node
# serverTLSCertPath: ./data/ssl/tls.crt #Only enable if manually generated TLS certificate
# serverTLSKeyPath: ./data/ssl/tls.key #Only enable if manually generated TLS key
```

:::warning
DKG v3.0.0 supports Multisig addresses. Confirmation of Multisig addresses is done on Execution layer, so you need to add `ethEndpointURL` to your `operator.yaml` config. Otherwise, you won't be able to participate in DKG ceremonies involving Multisig addresses.
:::

:::info
In the config file above, `./data/` represents the container's shared volume created by the `docker` itself with the `-v` or `volumes` option. You don't need to create `data` directory.
:::

## Start SSV-DKG Node

<Tabs>
<TabItem value="SSV Stack">
If you did set up SSV node with [the SSV Stack repository](../../../installation.md#install-ssv-node-stack), you can simply add DKG to your existing setup.

1. Your `ssv-dkg-data` directory should be inside of the `ssv-stack`.
2. Edit the `docker-compose.yaml` file that you already have.
3. Add the following content at the end of your file, but before the `networks:` part

```yaml
  ssv-dkg:  
    image: ssvlabs/ssv-dkg:latest
    pull_policy: always
    restart: "unless-stopped"
    container_name: ssv-dkg
    networks:
      - local-docker
    volumes:
      - ./ssv-dkg-data:/ssv-dkg/data
    ports:
      - 3030:3030/tcp
    command:
      ["start-operator", "--configPath", "./data/operator.yaml"]
      
# You should leave "networks: ..." below this
```

4. Start your DKG with the command `sudo docker compose up ssv-dkg`

:::info
This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the tool start up sequence runs correctly.

You can detach the terminal at any time by hitting `Ctrl-c` key combination, or closing the terminal itself. The tool will be stopped, but it will restart automatically, thanks to the `restart: "unless-stopped"` startup parameter.

If you are sure that the tool works and don't care about the logs — you can use `-d` parameter `sudo docker compose up -d ssv-dkg`.
:::
</TabItem>

<TabItem value="docker-compose">
To start and manage the DKG tool in the most convenient way, it is advised to use `docker-compose`.

This section assumes that all the necessary files (`encrypted_private_key.json`, `operator.yaml`, `password`) are under the same folder.  Just **make sure to substitute** `<PATH_TO_FOLDER_WITH_CONFIG_FILES>` with the actual folder containing all the files (e.g. `~/ssv-stack/ssv-dkg-data/`).

Below is an example of a docker-compose file:

```yaml
services:
  ssv-dkg:
    image: ssvlabs/ssv-dkg:latest
    pull_policy: always
    restart: "unless-stopped"
    container_name: ssv-dkg
    volumes:
      - <PATH_TO_FOLDER_WITH_CONFIG_FILE>:/ssv-dkg/data
    ports:
      - 3030:3030/tcp
    command:
      ["start-operator", "--configPath", "./data/operator.yaml"]
    networks:
      - [local-docker]
```

You can, of course, change the configuration above to one that suits you better, just be mindful about changing the path references in the docker command **and** in the `operator.yaml` file as well. The two need to be consistent with each other.

In order to launch the container, you would need to run this command:

```bash
docker compose up
```

:::info
This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the tool start up sequence runs correctly.

You can detach the terminal at any time by hitting `Ctrl-c` key combination, or closing the terminal itself. The tool will be stopped, but it will restart automatically, thanks to the `restart: "unless-stopped"` startup parameter.

If you are sure that the tool works and don't care about the logs — you can use `-d` parameter `sudo docker compose up -d`.
:::
</TabItem>

<TabItem value="Docker run">
Under the assumption that all the necessary files (`encrypted_private_key.json`, `operator.yaml`, `password`) are under the same folder (represented below with `<PATH_TO_FOLDER_WITH_CONFIG_FILES>`) you can run the tool using the command below:

```bash
sudo docker run --restart unless-stopped --name ssv-dkg -p 3030:3030 -v <PATH_TO_FOLDER_WITH_CONFIG_FILE>:/ssv-dkg/data -it "ssvlabs/ssv-dkg:latest" start-operator --configPath ./data/operator.yaml
```

Just **make sure to substitute** `<PATH_TO_FOLDER_WITH_CONFIG_FILES>` with the actual folder containing all the files (e.g. `/home/user/ssv-dkg-data` or `$(pwd)`if you run the command from that directory).

You can, of course, change the configuration above to one that suits you better, just be mindful about changing the path references in the docker command **and** in the `operator.yaml` file as well. The two need to be consistent with each other.

:::info
This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the tool start up sequence runs correctly.

You can detach the terminal at any time by hitting `Ctrl-c` key combination, or closing the terminal itself. The tool will be stopped, but it will restart automatically, thanks to the `--restart unless-stopped` startup parameter.

If you are sure that the tool works, and don't care about the logs, you can add the `-d` parameter right after `docker run`.
:::
</TabItem>

<TabItem value="Build from Source">
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

#### SSL certificate

Launching the DKG tool as a Docker container has the advantage of automatically creating and managing SSL certificate. If you decide to build it from source, you will have to do this yourself.

But don't worry, the [`entry-point.sh`](https://github.com/ssvlabs/ssv-dkg/blob/main/entry-point.sh) script in the repository is what is used by the Docker container, you could use that as an example for how to create an SSL certificate for your DKG node. For example:

```bash
mkdir ssl
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout "tls.key" -out "tls.crt" -subj "/C=CN/ST=GD/L=SZ/O=localhost, Inc./CN=localhost"
```

#### Launch with command line parameters

To run the DKG tool as an operator, you can launch the following command with the appropriate values to each parameter:

```sh
ssv-dkg start-operator \
            --privKey ./operator-config/encrypted_private_key.json  \
            --privKeyPassword ./operator-config/password \
            --operatorID <YOUR_OPERATOR_ID> \
            --port 3030 \
            --logLevel info \
            --logFormat json \
            --logLevelFormat capitalColor \
            --logFilePath ./operator-config/debug.log \
            --outputPath ./operator-config/output \
            --serverTLSCertPath ./operator-config/ssl/tls.crt \
            --serverTLSKeyPath ./operator-config/ssl/tls.key \
            --ethEndpointURL http://ethnode:8545
```

Here's an explanation of each parameter:

<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--privKey</code></td><td>string</td><td>Path to private key of ssv operator</td></tr><tr><td><code>--port</code></td><td>int</td><td>Port for listening messages (default: <code>3030</code>)</td></tr><tr><td><code>--privKeyPassword</code></td><td>string</td><td>Path to password file to decrypt the key</td></tr><tr><td><code>--operatorID</code></td><td>int</td><td>An integer, representing the ID of the operator, registered on the SSV network</td></tr><tr><td><code>--logLevel</code></td><td>debug | info | warning | error | critical</td><td>Logger's log level (default: <code>debug</code>)</td></tr><tr><td><code>--logFormat</code></td><td>json | console</td><td>Logger's encoding (default: <code>json</code>)</td></tr><tr><td><code>--logLevelFormat</code></td><td>capitalColor | capital | lowercase</td><td>Logger's level format (default: <code>capitalColor</code>)</td></tr><tr><td><code>--logFilePath</code></td><td>string</td><td>Path to file where logs should be written (default: <code>./data/debug.log</code>)</td></tr><tr><td><code>--outputPath</code></td><td>string</td><td>Path to store results (default <code>./output</code>)</td></tr><tr><td><code>--serverTLSCertPath</code></td><td>string</td><td>Path to server TLS certificate (default: <code>./ssl/tls.crt</code>)</td></tr><tr><td><code>--serverTLSKeyPath</code></td><td>string</td><td>Path to server TLS private key (default: <code>./ssl/tls.key</code>)</td></tr><tr><td><code>--ethEndpointURL</code></td><td>string</td><td>Ethereum node endpoint URL (default: <code>http://127.0.0.1:8545</code>)</td></tr></tbody></table>

#### Launch with YAML config file

It is also possible to use YAML configuration file, just as it was shown in the [Configuration section above](./#configuration).

Then the tool can be launched from the root folder, by running this command:

```sh
ssv-dkg start-operator --configPath ./operator-config/operator.yaml
```

If the `--configPath` parameter is not provided, `ssv-dkg` will be looking for a file named `config.yaml` in `./config/` folder at the same root as the binary (i.e. `./config/config.yaml`)
</TabItem>
</Tabs>

:::danger
When you set up your firewall on your DKG node machine, **make sure to expose the port you set in the configuration** (and Docker container creation command, if running on Docker). The default is **3030**.
:::
