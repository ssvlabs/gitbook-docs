---
description: In case you don't want to use the SSV Stack automated setup.
sidebar_position: 7
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual Node Setup

:::info
This guide is for advanced users. If you are not sure why you want a manual setup, use the [automated SSV Stack setup](/operators/operator-node/node-setup).
:::

### Pre-requisites

#### 1. Enable SSH

You need SSH access to your server:

<details>

<summary>How to SSH into a machine</summary>

See the EthStaker guide: https://docs.ethstaker.cc/ethstaker-knowledge-base/tutorials/connect-via-ssh

If you are using a cloud server, follow your provider's documentation. For example, AWS: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

</details>

#### 2. Install Docker

<details>

<summary>Docker</summary>

Follow [the official Docker documentation](https://docs.docker.com/engine/install/) for the option that matches your server.

***

Docker usually requires `sudo`. If you want to avoid using it every time, you can grant the required permissions once: [https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue](https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue)

</details>

#### 3. Install Git

<details>

<summary>Git</summary>

On Debian or Ubuntu, run `apt-get install git`.

For other Operating Systems, see the [official Git documentation](https://git-scm.com/downloads).

</details>

#### 4. *Install Golang (optional)*

<details>

<summary>Golang</summary>

If you want to build from source, install Go first.

For details, see the [official Go installation instructions](https://go.dev/doc/install).

</details>

### Generate Operator Keys (Encrypted)

The safest way to run your Operator node is with an encrypted key pair. This encrypts your **Public Key (PK)** and **Secret Key (SK)** with a password you choose.

#### Password file

Create a file named `password` with the password you want to use for your Secret Key:

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
  Use the node Docker image to generate and encrypt the keys. Replace `./path_to_password` with the real path to your password file:
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
  <TabItem value="build-source" label="Build from source">
  This requires `go` version 1.22 on the system. `make` is optional if you prefer to run the equivalent command from the `Makefile`.

  ##### Clone repository
  Clone the `ssv` repository locally:
  ```bash
  git clone git@github.com:ssvlabs/ssv.git
  ```

  ##### Build
  From the project root, run:
  ```bash
  make build
  ```

  ##### Generate keys
  Use the binary to generate and encrypt the keys. Replace `./path_to_password` with the real path to your password file:
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

:::danger Create backups
Back up `encrypted_private_key.json` and `password` on a separate device. If either file is lost, you will permanently lose access to your Operator.
:::

### Create Configuration File

Copy the `config.yaml` example below and replace the placeholders with your real values. The essential fields are editable.

:::warning
Make sure your `ETH1Addr` endpoint uses **WebSocket**, not HTTP.
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
  # If you want to use multiple endpoints you can divide them with ;
  # e.g. http://example.url:5052;http://example.url:5053
  BeaconNodeAddr: {{ETH2_NODE}}

  # Both enable improved attestation accuracy from multiple Beacon nodes.
  # Will have no effect with only 1 endpoint.
  WithWeightedAttestationData: false
  WithParallelSubmissions: false

eth1:
  # WebSocket URL of the Eth1 node to connect to.
  # If you want to use multiple endpoints you can divide them with ;
  # e.g. ws://example.url:8546/ws;ws://example.url:8547/ws
  ETH1Addr: {{ETH1_WEBSOCKET_ADDRESS}}

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

:::danger Potential slashing
**Do not** run multiple SSV Node instances with the same Operator keys.

This does not improve resiliency and **could lead to validator slashing**.
:::

<Tabs>
  <TabItem value="docker-compose" label="docker compose">

  Example `docker-compose.yml`:
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

  Then run `docker compose up` from the same directory as `docker-compose.yml`.

  - This keeps the terminal attached so you can review logs during startup.
  - If everything looks good, use `docker compose up -d` to run in the background.

  </TabItem>
    <TabItem value="docker-run" label="docker run">

  To start the node with Docker directly, run this from the directory that contains `config.yaml`. The command assumes the other required files are in the same directory:
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
  * This keeps the terminal attached so you can review logs during startup.
  * If the node is running correctly, add `-d` after `docker run` to run it in the background.

  </TabItem>
  <TabItem value="build-source" label="Build from source">

  If you already created the Operator keys with the compiled binary, you can start the node. Otherwise, build from source first.

  This requires `go` version 1.22 on the system. `make` is optional if you prefer to run the equivalent command from the `Makefile`.

  #### Clone repository
  Clone the `ssv` repository locally:

  ```bash
  git clone git@github.com:ssvlabs/ssv.git
  ```

  #### Choose the version
  List the available versions from the project root:
  ```bash
  git tag
  ```

  Replace `v1.2.3` with the version you want to use. You can [browse SSV Node releases here](https://github.com/ssvlabs/ssv/releases):

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
  Build the selected version:
  ```bash
  make build
  ```

  #### Launch the node
  Start the node:
  ```bash
  ./bin/ssvnode start-node
  ```
  By default, the node looks for the config file at `./config/config.yaml`. If your file is elsewhere, use the `CONFIG_PATH` environment variable to set a custom path.

  You can also use the compiled binary with a [`systemd` service](https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.service.5.html).

  :::info pubKey
  Pay attention to the `pubKey` field. It contains the public key you need to [register the Operator on SSV Network](/operators/operator-management/registration).
  :::
  </TabItem>
</Tabs>

### Peer-to-peer ports configuration and firewall

When configuring your firewall, open the same ports that you expose in the container command. By default these are **12001 UDP** and **13001 TCP**, plus **15000 TCP** for metrics and **16000 TCP** for the health endpoint.

If you change the default ports in `config.yaml`, update the container command as well. Changing only the host port mappings in Docker is not enough.

You can also set `HostAddress` in the config to the machine's public static IP address.

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

SSV's database (`db`) is critical for slashing protection. If it is lost or corrupted and operation continues, it can lead to double-signing and severe penalties.

Implement a reliable backup and recovery strategy for your database. Operators are responsible for managing and protecting their own databases.

## What's next?

* [Configure MEV](/operators/operator-node/setup-sidecars/configuring-mev) to increase rewards for block proposals.
* [Enable DKG](/operators/operator-node/setup-sidecars/enabling-dkg/) to improve your chances of joining more clusters.
* [Use the monitoring stack](/operators/operator-node/monitoring/) to stay on top of performance.
* [Check the troubleshooting page](/operators/operator-node/maintenance/troubleshooting) if you run into issues.
