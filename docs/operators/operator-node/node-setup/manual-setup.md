---
description: In case you don't want to use the SSV Stack automated setup.
sidebar_position: 7
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual Node setup

:::info
This is guide is for advanced users, if you are unsure why you'd want to setup manually — we recommend choosing [automated setup with SSV Node stack](/operators/operator-node/node-setup).
:::

### Pre-requisites

#### 1. Enable SSH

You will need to be able to connect to your server:

<details>

<summary>How to SSH into a machine</summary>

Please refer to this guide from EthStaker community: https://docs.ethstaker.cc/ethstaker-knowledge-base/tutorials/connect-via-ssh

If you're using a Cloud Server, you should use their documentation. E.g. guide for AWS: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

</details>

#### 2. Install Docker

<details>

<summary>Docker</summary>

In order to do so, please refer to [the official Docker documentation](https://docs.docker.com/engine/install/), and find the option that better fits your server configuration.

***

Docker needs `sudo`, which can be annoying to type every time. You can give Docker the needed permissions once and for all, if you wish [https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue](https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue)

</details>

#### 3. Install Git

<details>

<summary>Git</summary>

On Debian/Ubuntu simply run `apt-get install git` in your command line. 

If your machine is using another Linux distribution, please use the [official Git documentation](https://git-scm.com/downloads/linux), and find the option that better fits your server configuration.

</details>

#### 4. *Install Golang (optional)*

<details>

<summary>Golang</summary>

If you choose to build the project from source, you will need to have Go programming language binaries installed.

For more information, you can refer to the [official Go installation instruction](https://go.dev/doc/install).

</details>

### Generate Operator Keys (Encrypted)

The most secure way to run your Operator node, is to generate an Encrypted key pair. This way, your **Public Key (PK)** and **Secret Key (SK)** will be encrypted with a password of your choosing.

#### Password file

You will need to create a file (named `password` in this example) containing the password you chose for your Secret Key:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
  echo {{MY_OPERATOR_PASSWORD}} >> password
  `
  }
  variables={{
    MY_OPERATOR_PASSWORD: 'YOUR_PASSWORD'
  }}
/>

#### Key pair generation and encryption

<Tabs>
  <TabItem value="docker-run" label="docker run">
  The node Docker image will generate keys for you, then encrypt them with a password you provide, using the following command. Make sure to edit `./path_to_password` with the actual path you have:
  <InlineEditableCodeBlock
    language="sh"
    template={
    `
    docker run --name ssv-node-key-generation -v {{PATH_TO_PASSWORD}}:/password -it "ssvlabs/ssv-node:latest" /go/bin/ssvnode generate-operator-keys --password-file=password && docker cp ssv-node-key-generation:/encrypted_private_key.json ./encrypted_private_key.json && docker rm ssv-node-key-generation
    `
    }
    variables={{
      PATH_TO_PASSWORD: './path_to_password'
    }}
  />

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
  The node binary will generate keys for you, then encrypt them with a password you provide, using the following command. Make sure to edit `./path_to_password` with the actual path to your password file:
    <InlineEditableCodeBlock
    language="sh"
    template={
    `
    ./bin/ssvnode generate-operator-keys --password-file={{PATH_TO_PASSWORD}}
    `
    }
    variables={{
      PATH_TO_PASSWORD: './path_to_password'
    }}
  />
  </TabItem>
</Tabs>  

  :::danger Create Backups!
  Create backups of your `encrypted_private_key.json` and `password` files on a separate device. If any of these files are lost, you will not be able to access your operator ever again.
  :::

### Create Configuration File

Copy the following `config.yaml` file, just be sure to replace all the placeholders with the actual values. The essential values are highlighted and are editable.

:::warning
Make sure your `ETH1Addr` endpoint is communicating **over WebSocket** and **not over HTTP**.
:::

<InlineEditableCodeBlock
  language="yaml"
  template={
  `
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
  # Available options are mainnet and hoodi
  Network: {{NETWORK}}
  
  ValidatorOptions:
    # Block proposals are by default controlled by Beacon Node.
    # Requires the connected Beacon node to be MEV-enabled.
    # Please see https://docs.ssv.network/operators/operator-node/setup-sidecars/configuring-mev

eth2:
  # HTTP URL of the Beacon node to connect to.
  BeaconNodeAddr: {{ETH2_NODE}} 
  # If you want to use multiple endpoints you can divide them with ;
  # e.g. http://example.url:5052;http://example.url:5053
  
  # Both enable improved attestation accuracy from multiple Beacon nodes.
  # Will have no effect with only 1 endpoint.
  WithWeightedAttestationData: false
  WithParallelSubmissions: false

eth1:
  # WebSocket URL of the Eth1 node to connect to.
  ETH1Addr: {{ETH1_WEBSOCKET_ADDRESS}}
  # If you want to use multiple endpoints you can divide them with ;
  # e.g. ws://example.url:8546/ws;ws://example.url:8547/ws

p2p:
  # Optionally provide the external IP address of the node, if it cannot be automatically determined.
  # HostAddress: 192.168.1.1

  # Optionally override the default TCP & UDP ports of the node.
  # TcpPort: 13001
  # UdpPort: 12001

KeyStore:
  PrivateKeyFile: {{ENCRYPTED_PRIVATE_KEY_JSON}}
  PasswordFile: {{PASSWORD_FILE}}

# Enables Doppelganger Protection for validators, see https://github.com/ssvlabs/ssv/blob/v2.3.0/doppelganger/README.md
EnableDoppelgangerProtection: false

# This enables monitoring at the specified port, see https://docs.ssv.network/operators/operator-node/monitoring/
MetricsAPIPort: 15000
# This enables node health endpoint for troubleshooting, see https://docs.ssv.network/operators/operator-node/maintenance/troubleshooting
SSVAPIPort: 16000
  `
  }
  variables={{
    NETWORK: 'mainnet',
    ETH2_NODE: 'http://example.url:5052',
    ETH1_WEBSOCKET_ADDRESS: 'ws://example.url:8546/ws',
    ENCRYPTED_PRIVATE_KEY_JSON: './encrypted_private_key.json',
    PASSWORD_FILE: './password',
  }}
/>

### Start the Node

:::danger Potential slashing!
**Do not** run multiple instances of SSV Node with the same set Operator keys.

This does not increase validator resiliency and **could lead to validator slashing**.
:::

<Tabs>
  <TabItem value="docker-compose" label="docker compose">
  
  Here is an example of a `docker-compose.yml` file. Edit the highlighted values according to your setup:
    <InlineEditableCodeBlock
    language="yaml"
    template={
    `
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
          - {{PATH_TO_CONFIG_YAML_FILE}}:/config/config.yaml
          - {{PATH_TO_OUTPUT_FOLDER}}:/data
          - {{PATH_TO_PASSWORD_FILE}}:/password
          - {{PATH_TO_ENCRYPTED_KEY_FILE}}:/encrypted_private_key.json
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
    `
    }
    variables={{
      PATH_TO_CONFIG_YAML_FILE: './config.yaml',
      PATH_TO_OUTPUT_FOLDER: './data',
      PATH_TO_PASSWORD_FILE: './password',
      PATH_TO_ENCRYPTED_KEY_FILE: './encrypted_private_key.json',
    }}
  />

  - Then run `docker compose up` command from the same directory as your `docker-compose.yml`.
  - This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the tool start up sequence runs correctly.
  - If you are sure that the tool works and don't care about the logs, you can use `docker compose up -d`.

  </TabItem>
    <TabItem value="docker-run" label="docker run">

  To start your node, run the following Docker command in the same folder you created the `config.yaml` file in the previous step. The command assumes you have all of the other files in the same folder:
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
  * If you are sure that the node works, and don't care about the logs, you can add the `-d` parameter right after `docker run`.

  </TabItem>
  <TabItem value="build-source" label="Build from Source">

  If you have already created the operator keys using the compiled binary, then you can go ahead and launch the node. Otherwise, make sure to build from source first.

  A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

  #### Clone repository
  Clone the `ssv` repository in your local machine:

  ```bash
  git clone git@github.com:ssvlabs/ssv.git
  ```

  #### Choose the version
  Inspect the list of the SSV versions. From the project's root folder, run the command:
  ```bash
  git tag
  ```

  **Change the** `v1.2.3` **to the version you want to use**, you can [browse ssv node releases here](https://github.com/ssvlabs/ssv/releases):

  <InlineEditableCodeBlock
  language="sh"
  template={
  `
  git checkout tags/{{TAG_VERSION}}
  `
  }
  variables={{
    TAG_VERSION: 'v1.2.3'
  }}
  />


  #### Build
  To build the SSV with the chosen version run the command:
  ```bash
  make build
  ```
  
  #### Launch the node
  To start your node, run the following command:
  ```bash
  ./bin/ssvnode start-node
  ```
  By default, the node expects the config file you have created in the previous step to be at this path `./config/config.yaml`. If your setup is different, you can use the `CONFIG_PATH` environment variable to provide a custom path for the config file.
  
  As a small note, this compiled binary could be used to launch the binary [as a `systemd` service](https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.service.5.html), for example.
  :::info pubKey
  Pay close attention to the `pubKey` field, as the name says, it contains the public key, which is needed to [register the Operator on the ssv.network](/operators/operator-management/registration).
  :::
  </TabItem>
</Tabs>

### Peer-to-peer ports configuration and firewall

When you set up your firewall on your SSV node machine, make sure to expose the ports that you set in the [container creation command](/operators/operator-node/node-setup/). The defaults are **12001 UDP** and **13001 TCP** additional ones are **15000 TCP** for Metrics and **16000 TCP** for Health endpoint.

If you don't want to use the default ports, they can be changed in your `config.yaml` file. Be aware, the **must be changed on the container creation command as well** (simply changing the host port mappings on the Docker command isn't enough!).

You can also add your `HostAddress` to the config, which is the public static IP address of the machine.

<InlineEditableCodeBlock
  language="yaml"
  template={
  `
  p2p:
    HostAddress: {{HostAddress}}
    UdpPort: 12001
    TcpPort: 13001  `
  }
  variables={{
    HostAddress: '1.2.3.4'
  }}
/>

### Database backups
SSV's database (folder named `db`) is critical to prevent slashing. Its loss or corruption can lead to double-signing and severe penalties if operation continues.

Be sure to implement a robust backup and recovery strategy for your database(s), it is **crucial** for operators. Failure to maintain database backups can lead to significant financial loss. Operators are responsible for their own database management and protection.

## What's next?

* You might want to [configure MEV](/operators/operator-node/setup-sidecars/configuring-mev) to increase your rewards for block proposals. 

* You can [enable DKG node](/operators/operator-node/setup-sidecars/enabling-dkg/) to increase your chances of being included in a cluster.

* You might want to learn [how to use your Monitoring stack](/operators/operator-node/monitoring/), to stay on top of your performance.

* If you run into some issues while running the node, try and [take a look at the troubleshooting page](/operators/operator-node/maintenance/troubleshooting).
