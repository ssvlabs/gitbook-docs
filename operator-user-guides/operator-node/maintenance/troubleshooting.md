# Troubleshooting

## SSV Node health endpoint

In order to troubleshoot any issues with the SSV Node, it's a good start to use the `/health` endpoint.

First and foremost, the `SSV_API` port environment variable, or configuration parameter must be set. For that, refer to the [Node Configuration Reference page](../node-configuration-reference.md).

Assuming that the SSV node is running on the local machine, and that the `SSV_API` port is set to `16000`, the health check endpoint can be reached using the `curl` command, for example, just as shown below:

```bash
curl http://localhost:16000/v1/node/health
```

This request will provide a JSON response, here is an example of a response from a node in good state:

```json
{
  "p2p": "good",
  "beacon_node": "good",
  "execution_node": "good",
  "event_syncer": "good",
  "advanced": {
    "peers": 89,
    "inbound_conns": 67,
    "outbound_conns": 22,
    "p2p_listen_addresses": [
      "tcp://<X.Y.W.Z>:13001",
      "udp://<X.Y.W.Z>:12001"
    ]
  }
}
```

This "self-diagnose" report of the node can be useful to make sure that some essential indicators have the correct values:

* `p2p_listen_addresses` should show the correct public IP & port and the TCP port should be open when checking this IP with a port checker (they have been rendered anonymous for the purpose of this page)
* `peers` should be at least 60 for operators with more than 100 validators
* `inbound_conns` should be at least 20% of the peers (though not an exact number, this is a good indication of healthy connections from the node)

Below, an example of the same report, from a node in bad state:

```json
{
  "p2p": "bad: not enough connected peers",
  "beacon_node": "good",
  "execution_node": "good",
  "event_syncer": "good",
  "advanced": {
    "peers": 5,
    "inbound_conns": 1,
    "outbound_conns": 4,
    "p2p_listen_addresses": [
      "tcp://<X.Y.W.Z>:13004",
      "udp://<X.Y.W.Z>:12004"
    ]
  }
}
```

## FAQ

<details>

<summary>My node is not participating in cluster consensus</summary>

* If your node is not participating in cluster consensus, please verify that the `Network` has the correct value for the blockchain you are trying to operate on.

<!---->

* Next, verify in the SSV node logs that the connection to execution and beacon node has been established.

<!---->

* If the SSV node logs don't report any errors, please verify the clients logs themselves. If the disk they are running on does not support fast IOPS, they might struggle to stay in sync with the blockchain

<!---->

* It is finally possible that the clients don't report any errors, but the issue persists. In this cases, try and re-sync execution and/or beacon client(s), to fix potential initialization issues.

</details>

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

And finally... run the [creation command again from the top of this section](troubleshooting.md#create-and-start-the-node-using-docker) to create a new Docker container with the latest SSV image.

</details>

<details>

<summary>How do I migrate raw (deprecated) Operator Keys</summary>

If you are already in possession of raw (unencrypted) Operator Keys, please copy the private key into a text file and make sure the file only contains the key in a single line. For this mini-guide, we are going to call this file: `private-key`.

**Password file**

You will need to create a file (named `password` in this example) containing the password you chose for your Secret Key:

```bash
echo "<MY_OPERATOR_PASSWORD>" >> password
```

**Secret Key encryption**

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

**Configuration update**

At this point the node configuration needs to be changed, please edit the `config.yaml` file for your node, find the line with `OperatorPrivateKey` and delete it entirely. Replace it with this section:

```yaml
KeyStore:
  PrivateKeyFile: <ENCRYPTED_PRIVATE_KEY_JSON> # e.g. ./encrypted_private_key.json
  PasswordFile: <PASSWORD_FILE> # e.g. ./password
```

And make sure to replace `ENCRYPTED_PRIVATE_KEY_JSON` with the operator encrypted private key file just generated (e.g. `encrypted_private_key.json`) and `PASSWORD_FILE` with the file containing the password used to generate the encrypted key itself (e.g. `password`).

**Restart node and apply new configuration**

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



## Common error/warning messages

This section is a collection of common warnings, error messages, statuses and other unexpected behaviours you might encounter and the possible related known causes.

### `failed to create beacon go-client`

{% code overflow="wrap" %}
```bash
FATAL	failed to create beacon go-client	{"error": "failed to create http client: failed to confirm node connection: failed to fetch genesis: failed to request genesis: failed to call GET endpoint: Get \"http://5.104.175.133:5057/eth/v1/beacon/genesis\": context deadline exceeded", "errorVerbose":…………….\nfailed to create http client", "address": "http://5.104.175.133:5057"}
```
{% endcode %}

This is likely due to issues with the Beacon layer Node. Verify that `BeaconNodeAddr` has the correct address and port in [`config.yaml` configuration file](../installation.md#create-configuration-file).

***

### `could not connect to execution client`

{% code overflow="wrap" %}
```bash
FATAL	could not connect to execution client	{"error": "failed to connect to execution client: dial tcp 5.104.175.133:8541: i/o timeout"}
```
{% endcode %}

This is likely due to issues with the Execution layer Node. Verify that `ETH1Addr` has the correct address and port in [`config.yaml` configuration file](../installation.md#create-configuration-file).

Finally, make sure that your ETH1 endpoint is running using Websocket. This is required in order to stream events from the network contracts.

***

### `could not setup operator private key`

{% code overflow="wrap" %}
```bash
FATAL	could not setup operator private key	{"error": "Operator private key is not matching the one encrypted the storage", "errorVerbose": ...{
```
{% endcode %}

Verify that the Operator Private Key is correctly set in [`config.yaml` configuration file](../installation.md#create-configuration-file). In particular, if using unencrypted (raw) keys, that the **private (secret) key** was copied in the configuration file and that it contains all characters (sometimes it contains a  `=`  character that can easily be left out).

If the node has been stopped and restart, verify that the same configuration has been applied, that the private key has not been changed, and that the `db.Path` configuration points to the same directory as before.

***

### `could not setup network`

{% code overflow="wrap" %}
```bash
FATAL	could not setup network	{"error": "network not supported: jatov2"}
```
{% endcode %}

In the example above, the `Network` in [`config.yaml` configuration file](../installation.md#create-configuration-file) was wrongly set to `jatov2` instead of `jato-v2`, so be sure to look for thinks like spelling mistakes.

***

### `could not create loggerlogging.SetGlobalLogger`

{% code overflow="wrap" %}
```bash
could not create loggerlogging.SetGlobalLogger: unrecognized level: "infor"
make: *** [Makefile:97: start-node] Error 1
```
{% endcode %}

In the example above, the `LogLevel` variable in [`config.yaml` configuration file](../installation.md#create-configuration-file) was wrongly set to `infor` instead of `info`, so be sure to look for thinks like spelling mistakes.

***

### Node Metrics not showing up in Prometheus/Grafana

Please verify that the `MetricsAPIPort` variable is correctly set in [`config.yaml` configuration file](../installation.md#create-configuration-file).

For a more in-depth guide on how to set up Node monitoring, refer to [the dedicated page in this section](monitoring.md).

***

### Node does not generate a log file

Please verify that the `LogFilePath` variable is correctly set in [`config.yaml` configuration file](../installation.md#create-configuration-file). Be sure to look for thinks like spelling mistakes.

***

### Node takes a long time to become active

Please verify that the `Path` under the `db` section is correctly set in [`config.yaml` configuration file](../installation.md#create-configuration-file). Be sure to look for thinks like spelling mistakes.

If the Node was working correctly and becomes inactive after a configuration change, make sure that `Path` wasn't accidentally changed. This will cause the database to be recostructed and will lead to a slower startup.

***

### `“port 13000 already running”`

This could happen if you run both consensus node and SSV node on the same machine - please make sure to change your SSV node port to any other port. Refer to [the p2p section of the installation guide for details](../installation.md#other-configuration).

After updating your port, please restart the SSV node and confirm the error does not appear.

***

### `failed to check address`

<pre class="language-bash" data-overflow="wrap"><code class="lang-bash">{"level":"debug","time":"2021-12-13T06:45:24.529069Z","caller":"p2p/discovery.go:56","message":"<a data-footnote-ref href="#user-content-fn-1">failed to check address</a>","app":"SSV-Node:v0.1.7","component":"p2p","id":"16Uiu2HAmQYHdvGW2rtCejsz3BCNJsoBWpD9Kd2NuZWRgGggkKg4h","addr":"220.158.208.20:13001","err":"IP address is not accessible: dial tcp 220.158.208.20:13000: i/o timeout"}
</code></pre>

Port 13000 is closed - please make sure it is open (on both docker and machine level) and restart your node.&#x20;

For confirmation, you should see `"Address was checked successfully"` message.

***

### `"no indices, duties won’t be fetched"` message

This could be due to one of the following causes:

1. No validator has chosen your operator as one of its operators (for testing purposes you can always open one and select yourself as one of its managing operators).
2. Your node uses a different operator public key than the one you have registered to the network (using the SSV webapp).

Steps to confirm you use the same key:

1. Find the operator key that you have registered to the network in the [ssv explorer](https://explorer.ssv.network/).
2. Find the operator public key you have generated in your node during setup.
3. Compare between the keys -  if they do not match you must update your private key in the node config.yaml file, according to the key generated during your node installation.

{% hint style="info" %}
`{"level":"info","time":"2021-12-13T06:45:14.466457Z","caller":"operator/storage.go:122","message":`**`"setup operator privateKey is DONE!"`**`,"app":"SSV-Node:v0.1.7","who":"operatorKeys","`**`public-key`**`":"`**`LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBOHRXRG0xbTNtYW5Ra0xweVpLMzcKMGNHRGoydlBTWStRWVFBd3BWOXZpWThKVlgzT2J0VjNLL24xNy9peGZ2VEx5aGZKckgzYStpS1NIcDl5WEU4cQp6N2RhOTlaVzU4RzAyeDF0ZnpuV1REMmFpbklpMDAwdjQ5RjFTdzlYOUttQUg5VzNGdjBaREpadzZKVFd3R0ZiCmZiTmM2cGVvTG5ucnllWlVXb09ZQms0TVg2Um9QV2ZXNUJEaURaeHFqVjdvbFV3ZnFBMW5OeU96RXFCMEtkSW8KbExSZFA4ODZBNFJrZGpjUDc5aWdrM0RjVVdCMDhpZlM4SFlvS012ZUZrek0yR2dmOG5LRnFmSnFYNzlybFR4cApSTnlheUZOYXhZWEY4enBBMHlYRGFHQ0I1TitzZ1N2Yjg1WDAydWVCa1NadFFUMUMyTGMxWlZkbERFZVpGNFNlCkh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`**`"}`
{% endhint %}

***

{% hint style="info" %}
Didn't find the answer you are looking for? Reach out to other network operators on our [Discord channel](https://discord.gg/ssvnetworkofficial)
{% endhint %}

[^1]: 
