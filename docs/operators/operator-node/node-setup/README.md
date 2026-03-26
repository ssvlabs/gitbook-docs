---
sidebar_label: 'Setup SSV Node'
sidebar_position: 1
---

# Setup SSV Node 

In this section, we will walk through the process of installing the [SSV Node stack](https://github.com/ssvlabs/ssv-stack) using the standard Docker-based setup. This will install and configure the node itself with the monitoring stack:

* SSV Node
* Prometheus
* Grafana
* Alert manager
* DKG Node
* Benchmark tool

## Process Overview

At a high level, here is what involved in installing an SSV Node:

1. Install Docker and Git
2. Download the SSV Node stack
3. Adjust your configuration
4. Run it!

Please note the process implies you will setup Execution and Beacon clients on your own, _before_ installing the SSV Node. 

Once you have your node running you'll be able to participate in multiple validator clusters and earn rewards 🥳

:::warning Hardware
Make sure to check out [Node hardware specs and requirements](./hardware-requirements) before proceeding with the setup.
:::

## Pre-requisites

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

#### 4. Adjust Firewall

Make sure to expose the ports on your SSV node machine's firewall, otherwise your node won't be able to run correctly. The default ports are:
- P2P - **12001 UDP** and **13001 TCP** 
- Metrics - **15000 TCP** 
- Health endpoint - **16000 TCP**
- DKG port - **3030 TCP**

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
* `NETWORK` - The network you are running on (`mainnet`, `hoodi`)

All existing settings are listed on the [Configuration Reference page](./node-configuration-reference).
:::info Multiple Endpoints
Both `BEACON_NODE_ADDR` and `ETH_1_ADDR` support multiple endpoints. Separate them with `;`.

Example: `BEACON_NODE_ADDR=http://1.2.3.4:5052;http://1.2.3.4:5053`
:::

### Password and private key
On the first start the Node will generate a random `password` and encrypted `private_key` files. You can find the files under `~/ssv-stack/ssv-node-data` directory. 

**If you already have encrypted key and password files**: 
* Copy/move them to `/ssv-stack/ssv-node-data` 
* Edit the environment variables to the correct file names, e.g.:
    * `PRIVATE_KEY_FILE=/data/encrypted_private_key.json`
    * `PASSWORD_FILE=/data/password`

**If this is done incorrectly**, new keys will be automatically generated, and you will see a message in the console indicating this.

:::warning Backup your files
Both password and private key are needed to run SSV and DKG Nodes. 

**Backup those files** on a separate device, if any of the two are lost — you will lose access to your operator without a chance to recover.
:::

### Custom ports

We recommend using the default ports for ease of the setup. 

If you wish to change any of the ports — change them in both `ssv.env` and `docker-compose.yaml`, then get [back to exposing those ports in your firewall](#4-adjust-firewall).

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

## Start DKG Node
You can also run the stack with DKG, simplifying the setup process. 

The instructions are on the ["Enablind DKG" section](/operators/operator-node/setup-sidecars/enabling-dkg/).

## Database backups
SSV's database (folder named `db`) is critical to prevent slashing. Its loss or corruption can lead to double-signing and severe penalties if operation continues.

Be sure to implement a robust backup and recovery strategy for your database(s), it is **crucial** for operators. Failure to maintain database backups can lead to significant financial loss. Operators are responsible for their own database management and protection.

## What's next?

* You might want to [configure MEV](/operators/operator-node/setup-sidecars/configuring-mev) to increase your rewards for block proposals. 

* You can [enable DKG node](/operators/operator-node/setup-sidecars/enabling-dkg/) to increase your chances of being included in a cluster.

* You might want to learn [how to use your Monitoring stack](/operators/operator-node/monitoring/), to stay on top of your performance.

* If you run into some issues while running the node, try and [take a look at the troubleshooting page](/operators/operator-node/maintenance/troubleshooting).
