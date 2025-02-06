---
sidebar_label: 'Node Setup'
sidebar_position: 1
---

# Node setup

In this section, we will walk through the process of installing the [SSV Node stack](https://github.com/ssvlabs/ssv-stack) using the standard Docker-based setup. This will install and configure the node itself with the monitoring stack:

* SSV Node
* Prometheus
* Grafana

## Process Overview

At a high level, here is what involved in installing an SSV Node:

1. Install Docker and Git
2. Download the SSV Node stack
3. Adjust your configuration
4. Run it!

Please note the process implies you will setup Execution and Beacon clients on your own, _before_ installing the SSV Node.&#x20;

Once you have your node running you'll be able to participate in multiple validator clusters and earn rewards 🥳

:::warning
**Backup those files** on a separate device, if any of the two are lost — you will lose access to your operator without a chance to recover.
:::

:::warning
Make sure to check out [Node hardware specs and requirements](./hardware-requirements.md) before proceeding with the setup.
:::

## Pre-requisites

#### 1. Enable SSH

You will need to be able to connect to your server:

<details>

<summary>SSH into a local machine</summary>

Please refer to this guide from EthStaker community:

[https://docs.ethstaker.cc/ethstaker-knowledge-base/tutorials/connect-via-ssh](https://docs.ethstaker.cc/ethstaker-knowledge-base/tutorials/connect-via-ssh)

</details>

<details>

<summary>SSH into a Cloud server (e.g. AWS)</summary>

If you have generated an SSH key for your server or downloaded one from your Cloud hosting provider (e.g. AWS)

**Linux / Unix / MacOS**

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

#### 2. Install Docker

<details>

<summary>Docker</summary>

In order to do so, please refer to [the official Docker documentation](https://docs.docker.com/engine/install/), and find the option that better fits your server configuration.

***

Docker needs `sudo`, which can be annoying to type every time. You can give Docker the needed permissions once and for all, if you wish [https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue](https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue)

***

**NOTE:**

In order to run the SSV Node, in a server, only Docker engine is necessary, you can still go ahead and install Docker Desktop, but it will not be necessary unless you plan to use the Graphical Interface.

</details>

#### 3. Install Git

<details>

<summary>Git</summary>

To install the latest stable version for your release of Debian/Ubuntu run `apt-get install git` in your command line.&#x20;

If your machine is using another Linux distribution, please use the [official Git documentation](https://git-scm.com/downloads/linux), and find the option that better fits your server configuration.

***

**NOTE:**

Git is needed to download the SSV Node stack on your machine.

</details>

#### 4. Adjust Firewall

Make sure to expose the ports on your SSV node machine's firewall, otherwise your node won't be able to run correctly. The default P2P ports are **12001 UDP** and **13001 TCP** additional ones are **15000 TCP** for Metrics and **16000 TCP**for Health endpoint.

If you don't want to use the default ports, they can be changed on the next step.

## Install SSV Node stack

### Download the SSV Node stack

```bash
git clone https://github.com/ssvlabs/ssv-stack.git
cd ssv-stack
```

### Copy the configuration example file

```bash
cp ssv.example.env ssv.env
```

### Configure your node

Edit the `ssv.env` file and adjust the settings to your needs. The minimum you need to change is:

* `BEACON_NODE_ADDR` - HTTP address of the Beacon node (e.g. `http://1.2.3.4:5052`)
* `ETH_1_ADDR` - WebSocket address of the Execution node (e.g. `ws://1.2.3.4:8546`)
* `NETWORK` - The network you are running on (`mainnet`, `holesky`)
:::info
Both `BEACON_NODE_ADDR` and `ETH_1_ADDR` support multiple endpoints. Separate them with `;`.

Example: `BEACON_NODE_ADDR=http://1.2.3.4:5052;http://1.2.3.4:5053`
:::
If you already have encrypted key and password files: copy/move them to `/ssv-stack/ssv-node-data` and edit the environment variables to the correct file names, e.g.:

* `PRIVATE_KEY_FILE=/data/encrypted_private_key.json`
* `PASSWORD_FILE=/data/password`

**If this is done incorrectly**, new keys will be automatically generated, and you will see a message in the console indicating this.

All existing settings are listed on the [Configuration Reference page](./node-configuration-reference.md).

### Custom ports

We recommend using the default ports for ease of the setup.&#x20;

If you wish to change any of the ports — change them in both `ssv.env` and `docker-compose.yaml`, then get [back to exposing those ports in your firewall];

Changes to those files will be applied after a restart of the node (_if you already started your node_).

## Start the Node

To start your node use the following command

```bash
docker compose up
```

Or you can start it in the background, so there won't be logs in your CLI

```bash
docker compose up -d
```

:::info
On the first start the Node will generate a random `password` and encrypted `private_key` files.&#x20;

Both files are needed to run SSV Node and DKG Node. You can find them under `~/ssv-stack/ssv-node-data` directory.&#x20;

**Backup those files** on a separate device, if any of the two are lost — you will lose access to your operator without a chance to recover.
:::

## Other setup options

The same setup can be recreated manually. The steps are described on the [Manual Node setup page].

Alternatively, SSV Node setup is also available using [eth-docker](https://eth-docker.net/Support/SSV/) and [Stereum Launcher](https://stereum.net/).

## What's next?

You might want to [configure MEV](configuring-mev) to increase your rewards for block proposals.&#x20;

You can [enable DKG node](enabling-dkg) to increase your chances of being included in a cluster.

You might want to learn [how to use your Monitoring stack](monitoring), to stay on top of your performance.

If you run into some issues while running the node, try and [take a look at the troubleshooting page](maintenance/troubleshooting).
