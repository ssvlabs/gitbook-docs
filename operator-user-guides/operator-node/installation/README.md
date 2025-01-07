---
description: So you want to install an SSV node? You've come to the right place!
---

# Node setup

Once you have your node running you'll be able to participate in multiple validator clusters and earn rewards 🥳

{% hint style="success" %}
SSV node setup is also available using [eth-docker](https://eth-docker.net/Support/SSV/) and [Stereum Launcher](https://stereum.net/), so you can use those if you prefer.
{% endhint %}

### System Requirements

The SSV node that you are installing with these instructions is only the SSV node, not an Ethereum Execution Client or Beacon Client (e.g. not Get/Lighthouse or Besu/Teku, etc.). You will need those clients to already be running and synced, either on a different machine or the same machine.

All cloud services are supported for your node setup.

💻  Machine running Ubuntu (preferably)

🎛️  8 cores&#x20;

⚡️  4GB RAM

📀  20GB storage (10GB minimum)

🧮  IOPS > 10K

{% hint style="warning" %}
The minimum system requirements shown above are for a machine that is only running an SSV node. If you plan to run the SSV node on the same machine as your Execution Client and/or Beacon Client, these minimum requirements will be needed **in addition** to your existing requirements.
{% endhint %}

### Ethereum Node Requirements

The Ethereum clients used by your SSV node can be running on the same machine or a different machine. Ideally, to improve [client diversity](https://clientdiversity.org/#distribution), you will be running minority clients 👀 .

#### Execution Client

This can be any Ethereum Execution client (e.g. Geth, Besu, etc.). You will see this node referenced as ETH1 in the SSV configuration.

{% hint style="info" %}
You **MUST** enable WebSocket on your Execution Client as the SSV node requires that connection to work.

The specific configuration will be different for each Execution Client. For example, for Geth, add the command line flag `--ws` to the Geth start command to enable the WebSocket RPC server.
{% endhint %}

{% hint style="danger" %}
Please be advised: the [Reth Execution Client](https://reth.rs/) has recently been officially released. It appears to cause an issue that makes it impossible for the SSV node to fetch new validator keyshares registered to an SSV node.

As a result, you should not be using it on mainnet for the time being. Its usage is also discouraged on Holesky, as the problem persists on testnet too, although it is (obviously) less impactful.
{% endhint %}

{% hint style="danger" %}
Please be advised: [the Nimbus client](https://nimbus.team/) is a single thread program and it has shown to generate errors when a single client instance is connected to multiple SSV nodes.

As such, **it is not advised to run more than one SSV node per Nimbus instance** due to performance constraints.
{% endhint %}

#### Beacon Client

This can be any Ethereum Beacon Node client (e.g. Prysm, Lighthouse, Tekou, Nimbus, or any client utilizing standard REST HTTP). You will see this node referenced as ETH2 in the SSV configuration.

### Pre-requisites

#### Enable SSH

You will need to be able to connect to your server:

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

Once you're connected and have the command line opened, the next steps describe how to configure and run the SSV Node to create keys and start your SSV Node. If you run into some issues while running the node, try and [take a look at the troubleshooting page](../maintenance/troubleshooting.md).

### Generate Operator Keys (Encrypted)

The most secure way to run your Operator node, is to generate an Encrypted key pair. This way, your <mark style="color:green;">**Public Key (PK)**</mark> and <mark style="color:green;">**Secret Key (SK)**</mark> will be encrypted with a password of your choosing.

#### Password file

You will need to create a file (named `password` in this example) containing the password you chose for your Secret Key:

```bash
echo "<MY_OPERATOR_PASSWORD>" >> password
```

#### Key pair generation and encryption

{% tabs %}
{% tab title="Docker" %}
The node Docker image will generate keys for you, then encrypt them with a password you provide, using the following command:

{% code overflow="wrap" %}
```bash
docker run --name ssv-node-key-generation -v <PATH_TO_PASSWORD>:/password -it "ssvlabs/ssv-node:latest" /go/bin/ssvnode generate-operator-keys --password-file=password && docker cp ssv-node-key-generation:/encrypted_private_key.json ./encrypted_private_key.json && docker rm ssv-node-key-generation
```
{% endcode %}

`<PATH_TO_PASSWORD>` should be changed to a path to file, e.g. `/path/to/password`
{% endtab %}

{% tab title="Build from Source" %}
A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

#### Clone repository

Clone the `ssv-dkg` repository in your local machine:

```bash
git clone git@github.com:ssvlabs/ssv.git
```

#### Build

From the project's root folder, run the following command:

<pre class="language-bash"><code class="lang-bash"><strong>make build
</strong></code></pre>

#### Generate keys

The node binary will generate keys for you, then encrypt them with a password you provide, using the following command:

{% code overflow="wrap" %}
```bash
./bin/ssvnode generate-operator-keys --password-file=<PATH_TO_PASSWORD_FILE>
```
{% endcode %}
{% endtab %}
{% endtabs %}

Here is an example of the generated file.

{% code title="encrypted_private_key.json" lineNumbers="true" %}
```json
{
  "checksum": {
    "function": "sha256",
    "message": "affa5deb755d8ad13a039117dc6850d2a25ad62a870a1e1f8d4ef...",
    "params": {}
  },
  "cipher": {
    "function": "aes-128-ctr",
    "message": "3022f3b5043b77eda7f336dd0218e6b7e633a3f42f7ae92ed9...",
    "params": { "iv": "12e787716b0e3c30f2d68ed05464c16f" }
  },
  "kdf": {
    "function": "pbkdf2",
    "message": "",
    "params": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "bc71d3213fe17f15879e6bc468b30eeeb2d0969176491d87f9b00a37bf314a4c"
    }
  },
  "pubKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJak..."
}
```
{% endcode %}

{% hint style="info" %}
Pay close attention to the `pubKey` field, as the name says, it contains the public key, which is needed to [register the Operator on the ssv.network](../../operator-management/registration.md).
{% endhint %}

{% hint style="danger" %}
Create backups of your `encrypted_private_key.json` and `password` files on a separate device. If any of these files are lost, you will not be able to access your operator ever again.
{% endhint %}

<details>

<summary>Raw Operator Keys generation (deprecated)</summary>

**Note**

While it is still possible to generate raw (unencrypted) keys, it is advised not to do so. The procedure described in the collapsed section constitutes a legacy and deprecated alternative to the default option, which is generating password-encrypted keys.

As specified in the rest of this guide, **encrypted keys should be considered the default and preferred option**. The procedure listed below is only kept for reference and troubleshooting of Operators with legacy configurations.

***

Please refer to the [Migration section](./#how-do-i-migrate-raw-deprecated-operator-keys) in this guide, if you have previously generated unencrypted keys using this procedure.

The following command can generated unencrypted Operator <mark style="color:green;">**Public Key (PK)**</mark> and <mark style="color:green;">**Secret Key (SK)**</mark> for your Operator node:

{% code overflow="wrap" %}
```bash
docker run -it --rm ssvlabs/ssv-node:latest /go/bin/ssvnode generate-operator-keys
```
{% endcode %}

The command output will look like this:

<pre class="language-bash" data-overflow="wrap" data-line-numbers><code class="lang-bash">2023-09-11T16:05:09.668494Z	INFO	SSV-Node	generated public key (base64)	{"pk": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBNE4waktPRlhDWXJRcU9ZMkY4RWIKa0Rlei8xeGpPMTdvL3hEYkl6d3BQVVBhSFQyTU41RTBySFpSckZsc0lBRzAwUEt6S2hZRnRWZ1pjeGJwOFRQWQpQcnZoUGlQa1ZGQWdGcGhaOFpLZkZlQ3Rqb3pVSkFKdm1PSjZ5c3R4Wi94Y1BjM2RzNDRZWVRvbUxxZU5ZNjRWCi8zOFlZbHZOWlBvWERGdlFBYldheVJwN3BQYWhBYjZMVEVscUNheFgxdHZBK2VuRms1SHVsQ2YyS0VjditMMzUKTXY3ekxqeDB2cnpZNTRUOUVvRTNlT1VMblgwQk5GejV4OGw5RWV6dGFueGJscW1GSkI2VG04R0xPQ295S2gzRwpwSTBtVVBaTkduQmZtZnVRRFpMRVVWd0lQaDdVK2krTWtXM0RoMjFrUmg1N0Z1SHZIREYydUxkNFhJcHdCRm5nCkVRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"}
<strong>2023-09-11T16:05:09.670031Z	INFO	SSV-Node	generated private key (base64)	{"sk": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcGdJQkFBS0NBUUVBNE4waktPRlhDWXJRcU9ZMkY4RWJrRGV6LzF4ak8xN28veERiSXp3cFBVUGFIVDJNCk41RTBySFpSckZsc0lBRzAwUEt6S2hZRnRWZ1pjeGJwOFRQWVBydmhQaVBrVkZBZ0ZwaFo4WktmRmVDdGpvelUKSkFKdm1PSjZ5c3R4Wi94Y1BjM2RzNDRZWVRvbUxxZU5ZNjRWLzM4WVlsdk5aUG9YREZ2UUFiV2F5UnA3cFBhaApBYjZMVEVscUNheFgxdHZBK2VuRms1SHVsQ2YyS0VjditMMzVNdjd6TGp4MHZyelk1NFQ5RW9FM2VPVUxuWDBCCk5GejV4OGw5RWV6dGFueGJscW1GSkI2VG04R0xPQ295S2gzR3BJMG1VUFpOR25CZm1mdVFEWkxFVVZ3SVBoN1UKK2krTWtXM0RoMjFrUmg1N0Z1SHZIREYydUxkNFhJcHdCRm5nRVFJREFRQUJBb0lCQVFEWkZzV0dCeDlIV0J3ZwpvN2lmY0ZDVENDUWZxZXNuZTNiSUlWYmZDb3JwMmVMdWplZ2NFWFRmOTQ3Y0xLekZyY0FLWmZWdzhUZnJuclZiCk5rai9FOFYyczE0KzV0bmVTRWppWjQyV09xNlpxWU1GZDVLcmZTcU9XRUNpSG8xTERnbGpwYWVmWE5UT3NSd0IKdU1NNDgrM0s3OEh6MjV0TkhHRTZEajJnR05ycHdIYWdGQTJueVhSNXhxckR6djFzYk9hSUVlTm1mK25nYUpHSApTWXRPWWx6MXVQQ2FHVnpMQlJBNTM0Y05HOTluU1gzNnhUTXNNZi8vQ3FncHlZQVZRUVJIb0dZektmVTdTRFVyCnlhejFpRmQ3Tnh3MjExMHovd3FuR21oUUFaaGJWYUNLZnJuVHp5ZE9mSEZoUXFUWWQ5ZldsMXhBOSsyOG0wNFYKVHBYRlRydDlBb0dCQVAxVVlmclh0WXZpYVNQUkVQeUlmSmFvTkhBaCtBemZRR0htaTVMc08xNVg0YlBJQUR5bwowWjhuR0hubXV2cTN2Y2NPaXNSQzdIN3dzRUs1MmVWWHI0V1o5T3BPYk5HWG5nc2F4eEhNa2taOG00cVBuR09aCkxzT0hpbUdOWll0Z1ZqVlJZMkdtUTA5L3MwMk51R09KdXZCNXh1TGJpM2hZVEdCam9uSjhpeGJQQW9HQkFPTTcKOEZhcTFYUWJHU0c4VWZTbHFpNFE0MmlnOUlwemxDY3g3OGdFdzJTOU9OOStxbWdZVG43UGZ4M1pzQW5WZHhWNgpIOVZxRG55ai9GaWFXY0gydlhpQi9Td1BCZEpqeENQeThMbHRsUmdGQmc0OFIvbkR3YjBRTVRjaUpGUGhjUHNqClorcnZvLzdFNE1RRWZtcXJpOVhRQVMrVytKQTRRSzRFMnd2dVUxTWZBb0dCQU9kanJQOG5DbzlUNWI4dVZqcWsKSEZDc0lRR1BOWGZrYjNVODFKNEZvcENnNnVxQXN4NjFBSXREZFlyYTRremhpYm1KSWR6MFYvbjJ0TGl0ODBZVgpXcUJJcUxsZm11dXlka3drVUZLRXJkTXVQQkJLN29qV3dTMGQzNXNOUVFRV29ZZWY2SXVvQnZGVmJoeFhaMldiCnh5R2h5YlVxM1hDMkRrVTRuSWZBRkhkbkFvR0JBTWZ0N3RKeVVJaHRaemxWZGs1b2pFa250czVSLzVicGhrck8KRndqSG1CdEVtWXVhNk5mWnV3YThEajMzVUhuMmhXWXlJMXdraWthRUNmenpJVklWaEROSk83WE9LZk1vc0dSbwoxZ0J3T0NRQUY0bmk0L2tQa2FDRlpLZjd0RGJSUGhUWTNBL0xkV0V0WEExYlh0Yi94SE1GSm1YMjBSQWpUbFZPCkZHUjA5bjlGQW9HQkFMT0JFcmZPWHFwaFdFU3FaZjFGRDBxMzU0cmxrTUcxU1hqemxsZUFNU0lvYlVwU1Z2NnQKSlZaVDd3S29MeGhFTlc0cmFjeVNaSW5lY3Fqdm40VEJYTi9Nenp0U2xRNmFTV09UdGN5MXZDRm51R0NmcXZqbQp6V2JvdkUzWnU0QytWM2RKbEx5R1haOXIwNEJ6R2tkNEIwR2o3Ymx1L3M3Zk5uNWovTkIydmx4WgotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="}
</strong></code></pre>

First line will have the publick key (the text in quotes right after `pk`, this will be required when registering your operator to the network), and the second line shows the secret key (the text in quotes right after `sk`, keep this safe).

Be careful when you select and copy the entire Secret Key (SK) and make sure to include any "=" characters at the very end 👀

Make sure to store and back up your operator's **Secret Key (SK)** in a safe place. **Do not share** this key with anyone.

***

If using raw (unencrypted) keys for your Operator node, you will need to remove the `KeyStore` section from the `config.yaml` file and add the configuration in the code snippet below, instead (Make sure to substitute `OPERATOR_SECRET_KEY` with the secret key):

```
# Note: Operator private key can be generated with the `generate-operator-keys` command.
OperatorPrivateKey: <OPERATOR_SECRET_KEY> you have just created.
```

</details>

{% hint style="warning" %}
If you previously generated unencrypted Operator <mark style="color:green;">**Public Key (PK)**</mark> and <mark style="color:green;">**Secret Key (SK)**</mark>, for example if you were running an Operator node in previous testnet versions (Jato-v1), and want to encrypt them, please follow the instructions detailed [here](../maintenance/troubleshooting.md#how-do-i-migrate-raw-deprecated-operator-keys).
{% endhint %}

### Create Configuration File

Copy the following `config.yaml` file, just be sure to replace all the placeholders (`ETH2_NODE`, `ETH1_WEBSOCKET_ADDRESS`, `OPERATOR_SECRET_KEY`, etc.) with actual values.

In particular, substitute `ENCRYPTED_PRIVATE_KEY_JSON` with the operator encrypted private key file [generated above](./#generate-operator-keys-encrypted) (e.g. `encrypted_private_key.json`) and `PASSWORD_FILE` with the file containing the password used to generate the encrypted key itself.

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
  # Testnet (Goerli)  = Network: jato-v2
  # Testnet (Holesky) = Network: holesky
  Network: mainnet
  
  ValidatorOptions:
    # Whether to enable MEV block production. Requires the connected Beacon node to be MEV-enabled.
    # Please see https://docs.ssv.network/operator-user-guides/operator-node/configuring-mev
    BuilderProposals: false

eth2:
  # HTTP URL of the Beacon node to connect to.
  BeaconNodeAddr: <ETH2_NODE> # e.g. http://example.url:5052

eth1:
  # WebSocket URL of the Eth1 node to connect to.
  ETH1Addr: <ETH1_WEBSOCKET_ADDRESS> # e.g. ws://example.url:8546/ws

p2p:
  # Optionally provide the external IP address of the node, if it cannot be automatically determined.
  # HostAddress: 192.168.1.1

  # Optionally override the default TCP & UDP ports of the node.
  # TcpPort: 13001
  # UdpPort: 12001

KeyStore:
  PrivateKeyFile: <ENCRYPTED_PRIVATE_KEY_JSON> # e.g. ./encrypted_private_key.json
  PasswordFile: <PASSWORD_FILE> # e.g. ./password

# This enables monitoring at the specified port, see https://docs.ssv.network/run-a-node/operator-node/maintenance/monitoring
MetricsAPIPort: 15000
# This enables node health endpoint for troubleshooting, see https://docs.ssv.network/operator-user-guides/operator-node/maintenance/troubleshooting
SSVAPIPort: 16000
```

{% hint style="warning" %}
Make sure your `ETH1Addr` endpoint is communicating **over WebSocket** and **not over HTTP** in order to support subscriptions and notifications.
{% endhint %}

### Start the Node

{% hint style="warning" %}
**Do not** run multiple instances of SSV Node with the same set Operator keys.

This does not increase validator resiliency and **could lead to validator slashing**.
{% endhint %}

{% tabs %}
{% tab title="docker compose" %}
Here is an example of a `docker-compose.yml` file, where `<PATH_TO_CONFIG_YAML_FILE>`, `<PATH_TO_PASSWORD_FILE>`, `<PATH_TO_ENCRYPTED_KEY_FILE>` are the paths to the `config.yaml`, `password`, `encrypted_private_key.json` files you have created in the previous steps:

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

Then run `docker compose up` command from the same directory as your `docker-compose.yml`.

{% hint style="info" %}
This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the tool start up sequence runs correctly.

You can detach the terminal at any time by hitting `Ctrl-c` key combination, or closing the terminal itself. The tool will be stopped, but it will restart automatically, thanks to the `restart: "unless-stopped"` startup parameter.

If you are sure that the tool works, and don't care about the logs, you can add the `-d` parameter right after `docker compose up`.
{% endhint %}
{% endtab %}

{% tab title="Docker" %}
To start your node, run the following Docker command in the same folder you created the `config.yaml` file in the previous step:

<pre class="language-bash"><code class="lang-bash"><strong>docker run --restart unless-stopped --name ssv_node -e \
</strong>CONFIG_PATH=/config.yaml \
 -p 13001:13001 -p 12001:12001/udp -p 15000:15000 -p 16000:16000 \
-v "$(pwd)/config.yaml":/config.yaml \
-v "$(pwd)":/data \
-v "$(pwd)/password":/password \
-v "$(pwd)/encrypted_private_key.json":/encrypted_private_key.json \
-it "ssvlabs/ssv-node:latest" make BUILD_PATH="/go/bin/ssvnode" start-node
</code></pre>

{% hint style="info" %}
This command will keep the terminal busy, showing the container's logs. It is useful to make sure that the node start up sequence runs correctly.

You can detach the terminal at any time by hitting `Ctrl-c` key combination, or closing the terminal itself. The node will be stopped, but it will restart automatically, thanks to the `--restart unless-stopped` startup parameter.

If you are sure that the node works, and don't care about the logs, you can add the `-d` parameter right after `docker run`.
{% endhint %}
{% endtab %}

{% tab title="Build from Source" %}
If you have already created the operator keys using the compiled binary, then you can go ahead and launch the node. Otherwise, make sure to build from source first.

A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

#### Clone repository

Clone the `ssv-dkg` repository in your local machine:

```bash
git clone git@github.com:ssvlabs/ssv.git
```

#### Build

From the project's root folder, run the following command:

<pre class="language-bash"><code class="lang-bash"><strong>make build
</strong></code></pre>

#### Launch the node

To start your node, run the following command:

```
./bin/ssvnode start-node
```

By default, the node expects the config file you have created in the previous step to be at this path `./config/config.yaml`. If your setup is different, you can use the `CONFIG_PATH` environment variable to provide a custom path for the config file.

As a small note, this compiled binary could be used to launch the binary [as a `systemd` service](https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.service.5.html), for example.
{% endtab %}
{% endtabs %}

### Peer-to-peer ports configuration and firewall <a href="#peer-to-peer-ports-configuration-and-firewall" id="peer-to-peer-ports-configuration-and-firewall"></a>

When you set up your firewall on your SSV node machine, make sure to expose the ports that you set in the [container creation command](./#create-and-start-the-node-using-docker). The defaults are <mark style="color:green;">**12001 UDP**</mark> and <mark style="color:green;">**13001 TCP**</mark>; additional ones are <mark style="color:green;">**15000 TCP**</mark> for Metrics and <mark style="color:green;">**16000 TCP**</mark> for Health endpoint.

If you don't want to use the default ports, they can be changed in your `config.yaml` file. Be aware, the **must be changed on the container creation command as well** (simply changing the host port mappings on the Docker command isn't enough!).

You can also add your `HostAddress` to the config, which is the public static IP address of the machine.

```yaml
p2p:
  HostAddress: 206.22.63.189
  UdpPort: 12001
  TcpPort: 13001
```
