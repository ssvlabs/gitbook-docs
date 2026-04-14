---
sidebar_label: 'Setup SSV Node'
sidebar_position: 1
---

# Setup SSV Node

This guide walks through the standard Docker-based installation using the [SSV Stack](https://github.com/ssvlabs/ssv-stack). It sets up the node together with the monitoring stack:

* SSV Node
* Prometheus
* Grafana
* Alertmanager
* DKG Node
* Benchmark tool

## Process Overview

At a high level, installing an SSV Node includes these steps:

1. Install Docker and Git
2. Download the SSV Stack
3. Update the configuration
4. Start the stack

Set up your Execution and Beacon clients before you install SSV Node.

Once your node is running, you can register your operator in the SSV Network to participate in validator clusters and earn rewards.

:::warning Hardware
Review [Node hardware specs and requirements](./hardware-requirements) before you continue.
:::

## Pre-requisites

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

For other Linux distributions, see the [official Git documentation](https://git-scm.com/downloads/linux).

</details>

#### 4. Adjust Firewall

Open the required ports on the machine that will run SSV Node. Otherwise, the node will not work correctly. The default ports are:

- P2P - **12001 UDP** and **13001 TCP**
- Metrics - **15000 TCP**
- Health endpoint - **16000 TCP**
- DKG - **3030 TCP**

If you do not want to use the default ports, you can change them in the next step.

## Install SSV Node stack

### Download the SSV Node stack

```bash
git clone https://github.com/ssvlabs/ssv-stack.git
cd ssv-stack
```

### Copy the example configuration file

```bash
cp ssv.example.env ssv.env
```

### Configure your node

Edit `ssv.env`. At minimum, update:

* `BEACON_NODE_ADDR` - HTTP address of the Beacon node, for example `http://1.2.3.4:5052`
* `ETH_1_ADDR` - WebSocket address of the Execution node, for example `ws://1.2.3.4:8546`
* `NETWORK` - the network you are running on: `mainnet` or `hoodi`

All available settings are listed on the [Configuration Reference page](./node-configuration-reference).

:::info Multiple endpoints
Both `BEACON_NODE_ADDR` and `ETH_1_ADDR` support multiple endpoints. Separate them with `;`.

Example: `BEACON_NODE_ADDR=http://1.2.3.4:5052;http://1.2.3.4:5053`
:::

### Password and private key

On first start, the node generates random `password` and encrypted `private_key` files. You can find them in `~/ssv-stack/ssv-node-data`.

**If you already have encrypted key and password files:**

* Copy or move them to `/ssv-stack/ssv-node-data`
* Update the environment variables with the correct filenames, for example:
    * `PRIVATE_KEY_FILE=/data/encrypted_private_key.json`
    * `PASSWORD_FILE=/data/password`

If this is configured incorrectly, the node generates new keys automatically and logs a message about it.

:::warning Backup your files
Both the password and private key files are required to run SSV Node and DKG Node.

Back up both files on a separate device. If either file is lost, you will lose access to your Operator with no recovery path.
:::

### Custom ports

We recommend keeping the default ports to simplify setup.

If you change any port, update it in both `ssv.env` and `docker-compose.yaml`, then [open the same ports in your firewall](#4-adjust-firewall).

If the node is already running, restart it for the changes to take effect.

## Start the Node

Run:

```bash
docker compose up
```

To start it in the background (without logs in your CLI):

```bash
docker compose up -d
```

## Start DKG Node

You can also run the stack with DKG to simplify the setup.

See the [Enabling DKG section](/operators/operator-node/setup-sidecars/enabling-dkg/).

## Database backups

SSV's database (`db`) is critical for slashing protection. If it is lost or corrupted and operation continues, it can lead to double-signing and severe penalties.

Implement a reliable backup and recovery strategy for your database. Operators are responsible for managing and protecting their own databases.

## What's next?

* [Configure MEV](/operators/operator-node/setup-sidecars/configuring-mev) to increase rewards for block proposals.
* [Enable DKG](/operators/operator-node/setup-sidecars/enabling-dkg/) to improve your chances of joining more clusters.
* [Use the monitoring stack](/operators/operator-node/monitoring/) to track node health and performance.
* [Check the troubleshooting page](/operators/operator-node/maintenance/troubleshooting) if you run into issues.
