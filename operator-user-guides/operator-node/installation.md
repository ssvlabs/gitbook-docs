---
description: So you want to install an SSV node? You've come to the right place!
---

# Node setup

Once you have your node running you'll be able to participate in multiple validator clusters and earn rewards 🥳

{% hint style="success" %}
SSV node setup is also available using [eth-docker](https://eth-docker.net/Support/BloxSSV/) and [Stereum Launcher](https://stereum.net/), so you can use those if you prefer.
{% endhint %}

### System Requirements

The SSV node that you are installing with these instructions is only the SSV node, not an Ethereum Execution Client or Beacon Client (e.g. not Get/Lighthouse or Besu/Teku, etc.). You will need those clients to already be running and synced, either on a different machine or the same machine.

All cloud services are supported for your node setup (see a reference example on AWS [here](https://github.com/bloxapp/ssv/blob/main/docs/OPERATOR\_GETTING\_STARTED.md#setting-aws-server-for-operator)).

The minimum system requirements shown below are for a machine that is only running an SSV node. If you plan to run the SSV node on the same machine as your Execution Client and/or Beacon Client, these minimum requirements will be needed **in addition** to your existing requirements.

💻 Machine running Ubuntu

🎛️ 4 cores (3 minimum)

⚡️ 4GB RAM

📀 20GB storage (5GB minimum)

🧮 IOPS > 10K

### Ethereum Node Requirements

The Ethereum clients used by your SSV node can be running on the same machine or a different machine. Ideally, to improve [client diversity](https://clientdiversity.org/#distribution) (Erigon client is still not supported), you will be running minority clients 👀 .

#### Execution Client

This can be any Ethereum Execution client (e.g. Geth, Besu, etc.). You will see this node referenced as ETH1 in the SSV configuration.

{% hint style="info" %}
You **MUST** enable WebSocket on your Execution Client as the SSV node requires that connection to work.

The specific configuration will be different for each Execution Client. For example, for Geth, add the command line flag `--ws` to the Geth start command to enable the WebSocket RPC server.
{% endhint %}

#### Beacon Client

{% hint style="danger" %}
**VERY IMPORTANT**



Until further notice, we advise everyone to **refrain from using a Prysm endpoint for Mainnet operators** as its not MEV compatible.



A [bug in Prysm Beacon node](https://github.com/prysmaticlabs/prysm/issues/12103) is causing operators using such endpoint in their SSV Node to miss MEV rewards.
{% endhint %}

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

#### Install Docker

Another fundamental pre-requisite is to have Docker installed on the machine hosting the SSV Node. In order to do so, please refer to [the official Docker documentation](https://docs.docker.com/engine/install/), and find the option that better fits your server configuration.

{% hint style="info" %}
In order to run the SSV Node, in a server, only Docker engine is necessary, you can still go ahead and install Docker Desktop, but it will not be necessary unless you plan to use the Graphical Interface.
{% endhint %}

Once you're connected and on the command line, the next steps are to configure and run the SSV Node docker image to create keys and start your SSV Node. If you are not familiar with Docker, and run into some issues while running the node, [try and take a look at the FAQ](installation.md#docker-faq) at the bottom of this page.

### Generate Operator Keys (Encrypted)

The most secure way to run your Operator node, is to generate an Encrypted key pair. This way, your <mark style="color:green;">**Public Key (PK)**</mark> and <mark style="color:green;">**Secret Key (SK)**</mark> will be encrypted with a password of your choosing.

#### Password file

You will need to create a file (named `password.pass` in this example) containing the password you chose for your Secret Key:

```bash
echo "<MY_OPERATOR_PASSWORD>" >> password
```

#### Key pair generation and encryption

The node Docker image will generate keys for you, then encrypt them with a password you provide, using the following command:

{% code overflow="wrap" %}
```bash
docker run --name ssv-node-key-generation -v "$(pwd)/password":/password -it "bloxstaking/ssv-node:latest" /go/bin/ssvnode generate-operator-keys --password-file=password && docker cp ssv-node-key-generation:/encrypted_private_key.json ./encrypted_private_key.json && docker rm ssv-node-key-generation
```
{% endcode %}

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
  "publicKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJak..."
}
```
{% endcode %}

{% hint style="info" %}
Pay close attention to the `publicKey` field, as the name says, it contains the public key, which is needed to [register the Operator on the ssv.network](../operator-management/registration.md).
{% endhint %}

<details>

<summary>Raw Operator Keys generation (deprecated)</summary>

#### Note

While it is still possible to generate raw (unencrypted) keys, it is advised not to do so. The procedure described in the collapsed section constitutes a legacy and deprecated alternative to the default option, which is generating password-encrypted keys.

As specified in the rest of this guide, **encrypted keys should be considered the default and preferred option**. The procedure listed below is only kept for reference and troubleshooting of Operators with legacy configurations.

***

Please refer to the [Migration section](installation.md#how-do-i-migrate-raw-deprecated-operator-keys) in this guide, if you have previously generated unencrypted keys using this procedure.

The following command can generated unencrypted Operator <mark style="color:green;">**Public Key (PK)**</mark> and <mark style="color:green;">**Secret Key (SK)**</mark> for your Operator node:

{% code overflow="wrap" %}
```bash
docker run -it --rm bloxstaking/ssv-node:latest /go/bin/ssvnode generate-operator-keys
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
If you previously generated unencrypted Operator <mark style="color:green;">**Public Key (PK)**</mark> and <mark style="color:green;">**Secret Key (SK)**</mark>, for example if you were running an Operator node in previous testnet versions (Jato-v1), and want to encrypt them, please follow the instructions detailed in [the Migration section below](installation.md#how-do-i-migrate-raw-deprecated-operator-keys).
{% endhint %}

### Create Configuration File

Copy the following `config.yaml` file, just be sure to replace all the placeholders (`ETH2_NODE`, `ETH1_WEBSOCKET_ADDRESS`, `OPERATOR_SECRET_KEY`, etc.) with actual values.

In particular, substitute `ENCRYPTED_PRIVATE_KEY_JSON` with the operator encrypted private key file [generated above](../../run-a-node/operator-node/ssv-node-installation.md#generate-operator-keys) (e.g. `encrypted_private_key.json`) and `PASSWORD_FILE` with the file containing the password used to generate the encrypted key itself.

```yaml
global:
  # Console output log level 
  LogLevel: info
  
  # Debug logs file path
  LogFilePath: ./data/debug.log

db:
  # Path to a persistent directory to store the node's database.
  Path: ./data/db

ssv:
  # The SSV network to join to
  # Mainnet = Network: mainnet (default)
  # Testnet = Network: jato-v2
  Network: mainnet
  
  ValidatorOptions:
    # Whether to enable MEV block production. Requires the connected Beacon node to be MEV-enabled.
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
```

{% hint style="warning" %}
Make sure your `ETH1Addr` endpoint is communicating **over WebSocket** and **not over HTTP** in order to support subscriptions and notifications.
{% endhint %}

### Start the Node using Docker

{% hint style="warning" %}
**Do not** run multiple instances of SSV Node with the same set Operator keys.

This does not increase validator resiliency and **could lead to validator slashing**.
{% endhint %}

Now, for the part you've been waiting for... actually starting your SSV node!

To start your node, run the following Docker command in the same folder you created the `config.yaml` file in the previous step:

<pre class="language-bash"><code class="lang-bash"><strong>docker run --restart unless-stopped --name ssv_node -e \
</strong>CONFIG_PATH=/config.yaml -p 13001:13001 -p 12001:12001/udp -p 15000:15000 \
-v "$(pwd)/config.yaml":/config.yaml \
-v "$(pwd)":/data \
-v "$(pwd)/password":/password \
-v "$(pwd)/encrypted_private_key.json":/encrypted_private_key.json \
-it "bloxstaking/ssv-node:latest" make BUILD_PATH="/go/bin/ssvnode" start-node
</code></pre>

### Other Configuration

If you don't want to use those default ports, it's best to change them in your `config.yaml` file **as well as changing the ports on the container creation command** (simply changing the host port mappings on the Docker command isn't enough!).

You can also add your `HostAddress` to the config, which is the public static IP address of the machine.

```yaml
p2p:
  HostAddress: 206.22.63.189
  UdpPort: 12001
  TcpPort: 13001
```

When you set up your firewall on your SSV node machine, make sure to expose the ports that you set in the [container creation command](installation.md#create-and-start-the-node-using-docker). The defaults are <mark style="color:green;">**12001 UDP**</mark> and <mark style="color:green;">**13001 TCP**</mark>.

### FAQ

<details>

<summary><strong>What happens if my machine restarts?</strong></summary>

If you look at the Docker command you ran to start the node you'll see the part that says:

```bash
--restart unless-stopped
```

This means that the Docker container running your node will always try to restart if it crashes, or if the whole machine turns off and then restarts.

</details>

<details>

<summary><strong>How do I stop the node?</strong></summary>

In the command above, you named your node:

```bash
--name=ssv_node
```

This is how you will reference your node with other docker commands.

To stop the node run:

```bash
docker stop ssv_node
```

</details>

<details>

<summary>How do I start the node?</summary>

If for some reason your node has stopped (maybe you manually stopped it 🤔) you don't need to run the full creation command again, as that will actually throw an error saying that the Docker container already exists.

In the command above, you named your node:

```bash
--name=ssv_node
```

This is how you will reference your node with other docker commands.

To start a container, run the command:

```bash
docker start ssv_node
```

</details>

<details>

<summary>How do I view the logs again?</summary>

In the command above, you named your node:

```bash
--name=ssv_node
```

This is how you will reference your node with other docker commands.

To view the logs when your node is running, use the command:

```bash
docker logs ssv_node
```

</details>

<details>

<summary>How do I update my node?</summary>

In the command above, you named your node:

```bash
--name=ssv_node
```

This is how you will reference your node with other docker commands.

To update your SSV node, you will need to stop your current node:

```bash
docker stop ssv_node
```

Then remove it (this only removes the old Docker image, not all of your data!):

```bash
docker rm -f ssv_node
```

Then pull the latest image from SSV:

```bash
docker pull bloxstaking/ssv-node:latest
```

And finally... run the [creation command again from the top of this section](installation.md#create-and-start-the-node-using-docker) to create a new Docker container with the latest SSV image.

</details>

<details>

<summary>How do I migrate raw (deprecated) Operator Keys </summary>

If you are already in possession of raw (unencrypted) Operator Keys, please copy the private key into a text file and make sure the file only contains the key in a single line. For this mini-guide, we are going to call this file: `private-key`.

#### Password file

You will need to create a file (named `password` in this example) containing the password you chose for your Secret Key:

```bash
echo "<MY_OPERATOR_PASSWORD>" >> password
```

#### Secret Key encryption

Then, you can generate a KeyStore using this command:

{% code overflow="wrap" %}
```bash
docker run --name ssv-node-key-generation \
-v "$(pwd)/password":/password \
-v "$(pwd)/private-key":/private-key \
-it bloxstaking/ssv-node:latest /go/bin/ssvnode generate-operator-keys \
--password-file=/password  --operator-key-file=/private-key && \
docker cp ssv-node-key-generation:/encrypted_private_key.json \
./encrypted_private_key.json && \
docker rm ssv-node-key-generation
```
{% endcode %}

#### Configuration update

At this point the node configuration needs to be changed, please edit the `config.yaml` file for your node, find the line with `OperatorPrivateKey` and delete it entirely. Replace it with this section:

```yaml
KeyStore:
  PrivateKeyFile: <ENCRYPTED_PRIVATE_KEY_JSON> # e.g. ./encrypted_private_key.json
  PasswordFile: <PASSWORD_FILE> # e.g. ./password.pass
```

And make sure to replace `ENCRYPTED_PRIVATE_KEY_JSON` with the operator encrypted private key file just generated (e.g. `encrypted_private_key.json`) and `PASSWORD_FILE` with the file containing the password used to generate the encrypted key itself (e.g. `password`).

#### Restart node and apply new configuration

The node needs to be restarted, in order for the new configuration to be applied. Please connect to the machine running the node via terminal and execute the command:

```bash
docker stop ssv_node && docker rm ssv_node && docker run -d --restart unless-stopped --name ssv_node -e \
CONFIG_PATH=/config.yaml -p 13001:13001 -p 12001:12001/udp -p 15000:15000 \
-v "$(pwd)/config.yaml":/config.yaml \
-v "$(pwd)":/data \
-v "$(pwd)/password":/password \
-v "$(pwd)/encrypted_private_key.json":/encrypted_private_key.json \
-it "bloxstaking/ssv-node:latest" make BUILD_PATH="/go/bin/ssvnode" start-node && \ 
docker logs ssv_node --follow
```

</details>
