---
description: In case you don't want to use the SSV Stack automated setup.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual Node setup

:::info
This is guide is for advanced users, if you are unsure why you'd want to setup manually — we recommend choosing [automated setup with SSV Node stack](.).
:::

### Pre-requisites

#### Enable SSH

You will need to be able to connect to your server:

### SSH Access Options

<details>

<summary>SSH into a local machine</summary>

[https://docs.ethstaker.cc/ethstaker-knowledge-base/tutorials/connect-via-ssh](https://docs.ethstaker.cc/ethstaker-knowledge-base/tutorials/connect-via-ssh)

</details>

<details>

<summary>SSH into a Cloud server (e.g. AWS)</summary>

If you have generated an SSH key for your server or downloaded one from your Cloud hosting provider (e.g. AWS)

**MacOS**

```
cd ./{path to the folder to which the key pair file was downloaded}

chmod 400 {key pair file name}

ssh -i {key pair file name} ubuntu@{instance public IP you took from AWS}

```

**Windows**

```
cd /{path to the folder to which the key pair file was downloaded}

ssh -i {key pair file name} ubuntu@{instance public IP you took from AWS}
```

</details>

<details>

<summary>Docker (Optional)</summary>

**If you choose to use Docker** to launch the SSV Node, another fundamental pre-requisite is to have Docker installed on the machine hosting the SSV Node. In order to do so, please refer to [the official Docker documentation](https://docs.docker.com/engine/install/), and find the option that better fits your server configuration.

***

**NOTE:**

In order to run the SSV Node, in a server, only Docker engine is necessary, you can still go ahead and install Docker Desktop, but it will not be necessary unless you plan to use the Graphical Interface.

</details>

<details>

<summary>Golang (optional)</summary>

If you choose to build the project from source, you will need to have Go programming language binaries installed.

For more information, you can refer to the [official Go installation instruction](https://go.dev/doc/install).

</details>

Once you're connected and have the command line opened, the next steps describe how to configure and run the SSV Node to create keys and start your SSV Node. If you run into some issues while running the node, try and [take a look at the troubleshooting page](/operators/operator-node/maintenance/troubleshooting).

### Generate Operator Keys (Encrypted)

The most secure way to run your Operator node, is to generate an Encrypted key pair. This way, your **Public Key (PK)** and **Secret Key (SK)** will be encrypted with a password of your choosing.

#### Password file

You will need to create a file (named `password` in this example) containing the password you chose for your Secret Key:

```bash
echo "<MY_OPERATOR_PASSWORD>" >> password
```

#### Key pair generation and encryption

<Tabs>
  <TabItem value="docker-run" label="docker run">
  The node Docker image will generate keys for you, then encrypt them with a password you provide, using the following command:
  ```bash
  docker run --name ssv-node-key-generation -v <PATH_TO_PASSWORD>:/password -it "ssvlabs/ssv-node:latest" /go/bin/ssvnode generate-operator-keys --password-file=password && docker cp ssv-node-key-generation:/encrypted_private_key.json ./encrypted_private_key.json && docker rm ssv-node-key-generation
  ```
  `<PATH_TO_PASSWORD>` should be changed to a path to file, e.g. `/path/to/password`
  </TabItem>
  <TabItem value="build-source" label="Build from Source">
  A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).
  ##### Clone repository
  Clone the ssv-dkg repository in your local machine:
  ```bash
  git clone git@github.com:ssvlabs/ssv.git
  ```
  ##### Build
  From the project's root folder, run the following command:
  ```bash
  make build
  ```
  ##### Generate keys
  The node binary will generate keys for you, then encrypt them with a password you provide, using the following command:
  ```bash
  ./bin/ssvnode generate-operator-keys --password-file=<PATH_TO_PASSWORD_FILE>
  ```
  </TabItem>
</Tabs>  


### Create Configuration File

Copy the following `config.yaml` file, just be sure to replace all the placeholders (`ETH2_NODE`, `ETH1_WEBSOCKET_ADDRESS`, `OPERATOR_SECRET_KEY`, etc.) with actual values.

In particular, substitute `ENCRYPTED_PRIVATE_KEY_JSON` with the operator encrypted private key file generated above(e.g. `encrypted_private_key.json`) and `PASSWORD_FILE` with the file containing the password used to generate the encrypted key itself.

:::info
Both `BeaconNodeAddr` and `ETH1Addr` support multiple endpoints. Separate them with `;`.

Example: `BeaconNodeAddr: http://1.2.3.4:5052;http://1.2.3.4:5053`
:::

```yaml
global:
  # Console output log level 
  LogLevel: info
  
  # Debug logs file path
  LogFilePath: ./data/debug.log
  
  # Number of log files preserved, 500MB each (time duration depends on number of validators and other factors).
  # Roughly equates to half a day.
  # Increase if you want to preserve log files for longer. This would require more disk space
  LogFileBackups: 10

db:
  # Path to a persistent directory to store the node's database.
  Path: ./data/db

ssv:
  # The SSV network to join to
  # Mainnet = Network: mainnet (default)
  # Testnet = Network: holesky
  Network: mainnet
  
  ValidatorOptions:
    # default value is true
    # Requires the connected Beacon node to be MEV-enabled.
    # Please see https://docs.ssv.network/operator-user-guides/operator-node/installation/configuring-mev
    BuilderProposals: false

eth2:
  # HTTP URL of the Beacon node to connect to.
  BeaconNodeAddr: <ETH2_NODE> # e.g. http://example.url:5052
  # If you want to use multiple endpoints you can divide them with ;
  # e.g. http://example.url:5052;http://example.url:5053

eth1:
  # WebSocket URL of the Eth1 node to connect to.
  ETH1Addr: <ETH1_WEBSOCKET_ADDRESS> # e.g. ws://example.url:8546/ws
  # If you want to use multiple endpoints you can divide them with ;
  # e.g. ws://example.url:8546/ws;ws://example.url:8547/ws

p2p:
  # Optionally provide the external IP address of the node, if it cannot be automatically determined.
  # HostAddress: 192.168.1.1

  # Optionally override the default TCP & UDP ports of the node.
  # TcpPort: 13001
  # UdpPort: 12001

KeyStore:
  PrivateKeyFile: <ENCRYPTED_PRIVATE_KEY_JSON> # e.g. ./encrypted_private_key.json
  PasswordFile: <PASSWORD_FILE> # e.g. ./password

# This enables monitoring at the specified port, see https://docs.ssv.network/run-a-node/operator-node/monitoring
MetricsAPIPort: 15000
# This enables node health endpoint for troubleshooting, see https://docs.ssv.network/operator-user-guides/operator-node/maintenance/troubleshooting
SSVAPIPort: 16000
```

:::warning
Make sure your `ETH1Addr` endpoint is communicating **over WebSocket** and **not over HTTP** in order to support subscriptions and notifications.
:::

### Start the Node

:::danger
**Do not** run multiple instances of SSV Node with the same set Operator keys.

This does not increase validator resiliency and **could lead to validator slashing**.
:::

<Tabs>
  <TabItem value="docker-run" label="docker run">

  To start your node, run the following Docker command in the same folder you created the `config.yaml` file in the previous step:
  ```bash
  docker run --restart unless-stopped --name ssv_node -e \
  CONFIG_PATH=/config.yaml \
   -p 13001:13001 -p 12001:12001/udp -p 15000:15000 -p 16000:16000 \
  -v "$(pwd)/config.yaml":/config.yaml \
  -v "$(pwd)":/data \
  -v "$(pwd)/password":/password \
  -v "$(pwd)/encrypted_private_key.json":/encrypted_private_key.json \
  -it "ssvlabs/ssv-node:latest" make BUILD_PATH="/go/bin/ssvnode" start-node
  ```
  * This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the node start up sequence runs correctly.
  * You can detach the terminal at any time by hitting Ctrl-c key combination, or closing the terminal itself. The node will be stopped, but it will restart automatically, thanks to the `--restart unless-stopped` startup parameter.
  * If you are sure that the node works, and don't care about the logs, you can add the `-d` parameter right after `docker run`.

  </TabItem>
  <TabItem value="docker-compose" label="docker compose">
  
  Here is an example of a docker-compose.yml file, where `<PATH_TO_CONFIG_YAML_FILE>`, `<PATH_TO_PASSWORD_FILE>`, `<PATH_TO_ENCRYPTED_KEY_FILE>` are the paths to the `config.yaml`, `password`, and `encrypted_private_key.json` files you have created in the previous steps:
  ```yaml
  services:
    ssv:
      image: ssvlabs/ssv-node:latest
      ports:
        - 13001:13001
        - 12001:12001/udp
        - 15000:15000
        - 16000:16000
      command:
          make BUILD_PATH="/go/bin/ssvnode" start-node
      volumes:
        - <PATH_TO_CONFIG_YAML_FILE>:/config/config.yaml
        - <PATH_TO_OUTPUT_FOLDER>:/data
        - <PATH_TO_PASSWORD_FILE>:/password
        - <PATH_TO_ENCRYPTED_KEY_FILE>:/encrypted_private_key.json
      environment:
        - CONFIG_PATH=/config/config.yaml
      container_name: ssv_node
      restart: unless-stopped
      networks:
        - ssv

  networks:
    ssv:
      name: ssv
      driver: bridge
  ```
  - Then run `docker compose up` command from the same directory as your `docker-compose.yml`.
  - This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the tool start up sequence runs correctly.
  - You can detach the terminal at any time by hitting Ctrl-c key combination, or closing the terminal itself. The tool will be stopped and will restart automatically, thanks to the `restart: "unless-stopped"` startup parameter.
  - If you are sure that the tool works, and don't care about the logs, you can add the `-d` parameter right after `docker compose up`.

  </TabItem>
  <TabItem value="build-source" label="Build from Source">

  If you have already created the operator keys using the compiled binary, then you can go ahead and launch the node. Otherwise, make sure to build from source first.

  A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

  ##### Clone repository
  Clone the `ssv-dkg` repository in your local machine:

  ```bash
  git clone git@github.com:ssvlabs/ssv.git
  ```

  ##### Build
  From the project's root folder, run the following command:

  ```bash
  make build
  ```
  
  ##### Launch the node
  To start your node, run the following command:
  ```bash
  ./bin/ssvnode start-node
  ```
  By default, the node expects the config file you have created in the previous step to be at this path `./config/config.yaml`. If your setup is different, you can use the `CONFIG_PATH` environment variable to provide a custom path for the config file.
  
  As a small note, this compiled binary could be used to launch the binary [as a `systemd` service](https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.service.5.html), for example.
  :::info
  Pay close attention to the `pubKey` field, as the name says, it contains the public key, which is needed to [register the Operator on the ssv.network](/operators/operator-management/registration).
  :::

  :::danger
  Create backups of your `encrypted_private_key.json` and `password` files on a separate device. If any of these files are lost, you will not be able to access your operator ever again.
  :::
  </TabItem>
</Tabs>

### Peer-to-peer ports configuration and firewall

When you set up your firewall on your SSV node machine, make sure to expose the ports that you set in the [container creation command](/operators/operator-node/node-setup/). The defaults are **12001 UDP** and **13001 TCP** additional ones are **15000 TCP** for Metrics and **16000 TCP** for Health endpoint.

If you don't want to use the default ports, they can be changed in your `config.yaml` file. Be aware, the **must be changed on the container creation command as well** (simply changing the host port mappings on the Docker command isn't enough!).

You can also add your `HostAddress` to the config, which is the public static IP address of the machine.

```yaml
p2p:
  HostAddress: 206.22.63.189
  UdpPort: 12001
  TcpPort: 13001
```
