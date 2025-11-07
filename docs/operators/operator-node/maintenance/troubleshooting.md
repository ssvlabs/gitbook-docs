---
title: Troubleshooting
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Troubleshooting

## Overview
Troubleshooting is divided in 2 sections: tools to identify and solutions to resolve issues.

**Solutions**:
- [FAQ](#faq) - short answers on the most common questions.
- [Checklists for troubleshooting](#checklists-for-troubleshooting) - long answers for complex issues.

**Tools**:
- [Health endpoint](#ssv-node-health-endpoint) - the starting point to troubleshooting your node.
- [SSV-Pulse benchmarking](#ssv-pulse-benchmarking-tool) - powerful tool that will give insight into potential issue source.
- [SSV-Pulse log analysis](#ssv-pulse-log-analysis) - the tool will analyze `debug.log` files of your SSV node(s) and provide stats.

***

## FAQ

<details>

<summary><strong>How do I update my node?</strong></summary>

**Docker compose:**

Run the following commands to update your node to the latest version:

```
docker compose down
docker pull ssvlabs/ssv-node:latest
docker compose up -d
```

_Alternatively_, you can set the exact version in your `docker-compose.yaml` configuration file with `image: ssvlabs/ssv-node:v1.2.3`. But in that case you will have to change the version in your file with each new update [posted on SSV Docker Hub](https://hub.docker.com/r/ssvlabs/ssv-node/tags).

**Docker run:**

If you followed our documentation, you named your node with the `--name=ssv_node`  docker flag. This is how you will reference your node with other docker commands.

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
docker pull ssvlabs/ssv-node:latest
```

And finally... [run the creation command again](../node-setup/manual-setup#start-the-node) to create a new Docker container with the latest SSV image.

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

<summary><strong>My node is not attesting</strong></summary>
There are several reasons for your node to not participate in cluster's consensus:

1. Verify that the `network` in config has the correct value for the blockchain you are trying to operate on.

2. Next, verify in the SSV node logs that the connection to execution and beacon nodes has been established.

3. Check correctness of the path to private key/password files. Check the files are correct too, e.g. in your private key there is `pubKey` section - it should be exactly the same as your registered public key of this operator.

4. If the SSV node logs don't report any errors, please verify the clients logs themselves. If the disk they are running on does not support fast IOPS, they might struggle to stay in sync with the blockchain.

5. It is finally possible that the clients don't report any errors, but the issue persists. In this cases, try and re-sync ssv (by deleting `db` folder). If that doesn't help, try to re-sync execution and/or beacon client(s), and then re-sync ssv node again. That should fix potential initialization issues.

6. If you can't find the reason for this issue, feel free to ask our team for help in our [Discord channel](https://discord.gg/5vT22pRBrf).

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

<summary>How do I stop the node?</summary>

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

<summary>How do I migrate raw (deprecated) Operator Keys</summary>

If you are already in possession of raw (unencrypted) Operator Keys, please copy the private key into a text file and make sure the file only contains the key in a single line. For this mini-guide, we are going to call this file: `private-key`.

**Password file**

You will need to create a file (named `password` in this example) containing the password you chose for your Secret Key:

```bash
echo "<MY_OPERATOR_PASSWORD>" >> password
```

**Secret Key encryption**

Then, you can generate a KeyStore using this command:

```bash
docker run --name ssv-node-key-generation \
-v "$(pwd)/password":/password \
-v "$(pwd)/private-key":/private-key \
-it ssvlabs/ssv-node:latest /go/bin/ssvnode generate-operator-keys \
--password-file=/password  --operator-key-file=/private-key && \
docker cp ssv-node-key-generation:/encrypted_private_key.json \
./encrypted_private_key.json && \
docker rm ssv-node-key-generation
```

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
-it "ssvlabs/ssv-node:latest" make BUILD_PATH="/go/bin/ssvnode" start-node && \ 
docker logs ssv_node --follow
```
</details>

## Checklists for Troubleshooting

:::warning Before you begin
For the most part, we used our benchmarking tool as a starting point. If you don't know how to run it - go to the [SSV-Pulse Benchmarking section](#ssv-pulse-benchmarking-tool) and then come back here for answers.
:::



Below is a table with issues description, their probable causes and solutions. You can click on the relevant issue to see the full description. Each issue has its own checklist to simplify this process.


| Observed issue                                            | Common cause                            | Solution                                                                                                                                          |
| ------------------------------------------ | ------------------------------  | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SSV 0 peers and connections](#ssv-0-peers)                                 | `SSVAPIPort` is closed.                     | Open the port on the container. Default value in config is 16000.                                                                                                                          |
| [SSV 0 inbound connections](#ssv-0-inbound-connections) (poor SSV performance)                                | `P2P` ports are closed.                             | Expose the ports on SSV container and externally on your firewall too.                                                                          |
| [Execution 0 peers](#execution-0-peers)                           | `net` namespace is disabled.               | Enable the namespace or check the peer count on your monitoring.                                                    |
| [Execution peer count](#execution-peer-count) (unstable sync progress)           | `--maxpeers` value is too high or too low. | Adjust the `maxpeers` value as per your client’s documentation.  |
| [Consensus and/or Execution latency](#consensus-or-execution-latency)                         | Nodes are too far from each other, or the network side is misconfigured.               | Relocate your nodes closer to each other, or adjust the network side.                                                    |
| [Consensus peer count](#consensus-peer-count) (Sync and performance issues)           | `--maxpeers` value is too high or too low. | Adjust the `maxpeers` value as per your client’s documentation.  |
| [Consensus missed blocks](#consensus-missed-blocks) (Sync issues)                              | Multiple potential sources.               | Need to investigate bottlenecks, described in the section.     | 
| [RAM and CPU high usage](#ram-and-cpu-usage)                        | Not enough resources for the number of managed validators.                | Adjust the resources in accordance with our recommendations.                                                  |
| [Clients’ versions](#clients-versions)           | Didn’t upgrade clients timely. | Upgrade clients to the latest stable version.  |
| [Network congestion / Concurrent connections](#network-congestion)                              | Usually, limited by the ISP.               | Explore options to expand limitations of your network.     | 
| [Disk performance](#disk-performance)                              | Not enough space / Disk is not performant enough / Didn’t optimize usage.               | Install mentioned optimization and/or upscale disk.     |

### SSV 0 Peers

![SSV 0 Peers](/img/SSV0peerss.png)

If you see SSV shows 0 peers and connections that means you have not opened 16000 port on your container, and the tool can’t reach the correct endpoint. If you are running your node as a  systemd service, you’ll likely see the same result. 

#### Solution
- Open `SSVAPIPort` on the SSV container. By default the port is 16000, optionally can be changed in `config.yaml`.
- As an alternative for SSV running as a systemd service, you can expose 16000 port externally and use a public IP address. 
- Lastly, you can check the same data via curl command `curl http://localhost:16000/v1/node/health`.


### SSV 0 inbound connections

![SSV 0 Inbound](/img/SSV0inbound.png)

The healthy number of SSV peers is 10-30, depending on the number of clusters you participate in. Make sure you see both *inbound* and *outbound* connections. If inbound are at 0, then your P2P ports are closed.

In this example you can see an SSV node has peers and outbound connections, but 0 inbound. That signalizes incorrect P2P ports configuration and should be fixed on your firewall side.

#### Solution
The most common cause for SSV related issues is closed P2P ports. As mentioned earlier, if you see 0 inbound connections on your SSV node that means your ports are closed. Double-check you are exposing 12001 UDP and 13001 TCP ports (or your values from config):
- on your vps’s firewall
- any local firewall tool (e.g. `ufw`)
- docker container 
- config file (if ports’ values are not default)

Same applies to the RPC ports on your Execution and Consensus nodes, if they’re not exposed — your SSV node won’t work properly.


The other common cause for SSV’s poor performance is errors such as `future msg from height`. This error is caused by the fact that the received message has a timestamp from the future, often caused by de-synced times on different machines. The solution is [to install and use chrony](https://ethdocker.com/Usage/LinuxSecurity/#time-synchronization-on-linux) on your machine  to keep the timestamps in sync. The linked guide also includes other tools and performance fine-tuning, we recommend reading it all.

### Execution 0 peers

![Execution 0 Peers](/img/Execution0peers.png)

In this example you see Execution node has 0 peers while there is data in Latency row. In such a case, your Execution node likely has peers, but its `net` namespace is disabled and the benchmark tool can’t fetch the `net_peerCount` results. 

#### Solution
- If you have a monitoring setup on your Execution node you can find the peer count on your dashboard. 
- Otherwise, you should enable `net` namespace
  - How to do it [on Geth](https://geth.ethereum.org/docs/fundamentals/command-line-options) (`--http.api`) 
  - And [on Nethermind](https://docs.nethermind.io/fundamentals/configuration#jsonrpc-additionalrpcurls) (`JsonRpc.AdditionalRpcUrls`).

### Execution peer count

![Execution Low Peer count](/img/Executionlowpeers.png)

The healthy number of Execution peers is 25-75, depending on your client and its recommended `--maxpeers` value. The tool does not take into account which client you use. 

In this example, the client is Besu and 25 `maxpeers` is the default value, so everything is good. If you see 25 on Geth that is too low, as the default `maxpeers` for Geth is 50. Also, if you see an abnormal number of peers you might have issues with your ISP. That is common with home setups where local ISPs can’t provide enough concurrent connections.

#### Solution
- Adjust the `--maxpeers` value as per your client’s documented default value and restart Execution node. 
- If you suspect the issue is with concurrent connection limit, refer to [the relevant section here](#network-congestion).


### Consensus or Execution latency

![Execution Consensus client latency](/img/ExecutionConsensusLatency.png)

If you are running SSV, Execution, and Consensus on the same server - you should see latency 10ms or lower. Running clients on different servers is suboptimal and you will see latency around 150ms. Any value above can be considered unhealthy, as it affects your performance a lot.

#### Solution
- Relocate your nodes to be closer to each other. For the best performance run SSV, Execution, and Consensus on the same server.
- If you find your latency is >150ms with closely located nodes — likely your network is congested, it depends on the network limitations your setup has. If you are using bare metal providers or cloud computing services to host your nodes - they should have visibility into your network congestion. For home setups it can be hard to find the limit or track it at all, as local ISPs rarely provide this information (e.g. actual throughput of their hardware in place). You can refer to [the relevant section here](#network-congestion).
- For nodes hosted on several servers it is strongly recommended to use NTP server to keep timestamps in sync (e.g. [chrony](https://ethdocker.com/Usage/LinuxSecurity/#time-synchronization-on-linux)) and [TCP BBR congestion control](https://www.cyberciti.biz/cloud-computing/increase-your-linux-server-internet-speed-with-tcp-bbr-congestion-control/).

### Consensus peer count

![Consensus peer count](/img/ConsensusPeers.png)

By default, `maxpeers` value on Consensus nodes is in the range of 50-150, depending on your client. 
Peer count is a double-edged sword. Having too few peers can cause sync issues, while having too many will “eat” all of your network bandwidth causing performance issues and RPC calls delay.

#### Solution
- Stick to the recommended `maxpeers` value provided by your client’s documentation 
  - `--p2p-max-peers=70` [for Prysm](https://docs.prylabs.network/docs/prysm-usage/parameters#beacon-node-flags)
  - `--target-peers=100` [for Lighthouse](https://lighthouse-book.sigmaprime.io/faq.html?highlight=peer#network-monitoring-and-maintenance-1)
  - `--p2p-peer-upper-bound=100` [for Teku](https://docs.teku.consensys.io/reference/cli#p2p-peer-lower-bound)

### Consensus missed blocks

![Consensus missed sync blocks](/img/ConsensusMissedBlocks.png)

In the Consensus - Attestation section you will find missed_blocks value. 
The healthy number of missed blocks is 0-2. If you are seeing significantly more missed blocks — you need to check sync progress of both your Execution and Consensus nodes. 

Such an issue can come from multiple directions, from configuration faults to hardware resources deficiency. You can cross-check this with [the log analyzer tool](#ssv-pulse-log-analysis).

#### Solution
- Make sure your peer counts are in the healthy range for both Consensus and Execution nodes, you can refer to relevant sections above.

Other than that, this issue might be coming from hardware bottlenecks:
- For example, your disk doesn’t have enough free space and/or IOPS limit of your disk is too low to keep up with the new blocks production. [Regular pruning of your databases](https://everstake.one/blog/how-to-prune-an-eth-20-node-with-prysm-and-geth-as-an-external-execution-layer) can be helpful, if that’s not helpful change the hardware. 
- Another example is not enough RAM, you can adjust the available resources for your node (e.g. Execution needs less RAM than most Consensus nodes), regular restarts every week might help slightly. Once again, if that’s not helpful enough you’ll need to upscale.


### RAM and CPU usage

![RAM CPU usage](/img/RAMCPU.png)

The healthy % of CPU usage is generally below 30%, with RAM it heavily depends on the clients of your choice and go from 16GB to 32GB (on Mainnet). These values should be cross-checked with the values on monitoring of your server, as the benchmark tool has limited visibility into your resources due to docker constraints.

#### Solution
**CPU**

Generally, there are two solutions to CPU-related issues - either upscale or optimize. You can check our [Hardware Requirements page](../node-setup/hardware-requirements.md) for your reference. 
So let’s explore optimization options:
- Set CPU Governor to Performance, you can [follow this StackExchange thread](https://askubuntu.com/questions/1021748/set-cpu-governor-to-performance-in-18-04).
- Set Low Latency CPU profile. Most modern BIOS versions have that in place. 
- [RedHat wrote a great runbook](https://access.redhat.com/sites/default/files/attachments/201501-perf-brief-low-latency-tuning-rhel7-v2.1.pdf) on how to optimize your CPU profile. There is a checklist on page 5 that you can follow.
You should also limit the CPU usage for each of your applications/clients. The options are described in the RAM section below, they generally work the same way for both.


**RAM**

To put in simple terms, with RAM issues it's either not enough memory or it is overused by some applications. Once again, you can follow [our hardware recommendations](../node-setup/hardware-requirements.md) to see if your setup has enough memory. 
To prevent overusage of RAM by your applications you have multiple options, depending on what you use to run your nodes. Choose the relevant option for your setup:
- [Set limits on the Docker containers](https://docs.docker.com/engine/containers/resource_constraints/)
- [Similar limits for Kubernetes setup](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes)
- [Set limits with Linux Control group](https://unix.stackexchange.com/a/125024)
- [Set limits with Linux ulimit](https://linuxconfig.org/limit-user-environment-with-ulimit-linux-command)




### Clients versions

![Execution Consensus client versions](/img/ClientVersion.png)

The tool will not tell you when the client is outdated. Also, it only checks the Consensus version, the Execution needs to be checked manually. 

In our example we see Teku 24.8.0 which is a version from August 2024, many months old at the time of writing this. Using outdated versions can cause issues, as newer versions are generally more performant. Also, SSV node relies on some functions that might appear only in newer versions, so it's important to keep your clients updated. 

#### Solution
To be on the safe side, you can upgrade to the latest version after some days or weeks have passed, or better run it on Testnet first yourself.

You can download lastest upgrades manually, e.g. `docker pull consensys/teku:latest` and restart.


### Network congestion

Neither of these metrics are observed by the benchmark, and it’s tricky to get visibility into this in general.
Each peer is essentially a concurrent connection and we can estimate the total number:
- Consensus - 100-150 peers
- Execution - 30-75 peers
- SSV - 10-20 peers
- RPC calls and Websocket connections - depends on the load

So your setup has to handle at least 120+50+15 = 185 concurrent connections. That does not include WebSocket and RPC calls, so let’s round up to 200 *at the very minimum*. The amount of managed validators will directly influence the amount of RPC calls. 

If your setup has a bottleneck in concurrent connections you will see unstable peer count, sync issues, performance issues, delayed RPC calls. Same with congested network - not enough bandwidth.

#### Solution
1. First of all, we need to understand the current network usage which can be done with monitoring provided by your server hosting, or with Linux [tools such as iperf](https://www.golinuxcloud.com/linux-monitor-network-traffic/). Monitoring peer count on your Consensus and Execution nodes can give you a hint into this.

2. Secondly, we need to learn if there are network limitations imposed on your setup. As already mentioned, network usage can be limited by your router, ISP, server/bare metal provider, and hardware. With ISPs and server providers that limit can be undisclosed, so you might need to ask them about an existing limitation.

3. Lastly, expand the limits and improve your setup. The industry standard for network congestion control is [TCP BBR](https://www.cyberciti.biz/cloud-computing/increase-your-linux-server-internet-speed-with-tcp-bbr-congestion-control/) and we strongly recommend using it.

### Disk performance

This metric is also not observed in the benchmark results. In our tests we have used `iostat` and `ioping` to assess Disk’s performance.
It is fairly easy to detect insufficient free space - one or many of your nodes will be in a restart loop, as they fail to write new data on the disk. However, detecting not-so-well performing disks is not as easy. That is why the industry standard disk is NVMe or at least fairly powerful SSD. 

#### Solution
- There are a couple of tools called `noatime` and `swappiness`, you could use to optimize your disk usage for running Ethereum clients. They are described by [eth-docker team on their docs](https://ethdocker.com/Usage/LinuxSecurity/#additional-and-recommended-linux-performance-tuning), we highly recommend utilizing them.

- Disk issues arise generally if you don’t have enough free space or if the disk is not performant enough in terms of IOPS. So in case your nodes are hosted in a cloud/bare metal environment you can always upscale. For home stakers the only option is to upgrade their setup.


## SSV Node health endpoint

To use this endpoint you'll first need to configure and open a specific port:
1. By default, you can use port `16000`.
2. *If* you want to use another port:
    - In `.yaml` configuration file you can edit  `SSVAPIPort: 16000` and restart to apply.
    - In `.env` configuration file you can edit `SSV_API_PORT=16000` variable and restart to apply.
3. Make sure your SSV node/container has `16000` port opened (or other port you chose).

The health check endpoint can be reached using the `curl` command, for example:

```bash
curl http://localhost:16000/v1/node/health
```

There are other API methods, they're [referenced on this doc page](/docs/operators/operator-node/node-setup/node-configuration-reference.md#api-methods-reference).

<details>

<summary>How to understand the results?</summary>

This request will provide a JSON response. Here is an example of response from **healthy node**:

```json
{
  "p2p": "good",
  "beacon_node": "good",
  "execution_node": "good",
  "event_syncer": "good",
  "advanced": {
    "peers": 19,
    "inbound_conns": 7,
    "outbound_conns": 17,
    "p2p_listen_addresses": [
      "tcp://<X.Y.W.Z>:13001",
      "udp://<X.Y.W.Z>:12001"
    ]
  }
}
```

This "self-diagnose" report of the node can be useful to make sure that some essential indicators have the correct values:

* `p2p_listen_addresses` should show the correct public IP & port and the TCP port should be open when checking this IP with a port checker (they have been rendered anonymous for the purpose of this page)
* `peers` should be at least 15 for operators with more than 100 validators
* `inbound_conns` should be at least 20% of the peers (though not an exact number, this is a good indication of healthy connections from the node)

Below, an example of the same report, from a **node in bad state**:

```json
{
  "p2p": "bad: not enough connected peers",
  "beacon_node": "good",
  "execution_node": "good",
  "event_syncer": "good",
  "advanced": {
    "peers": 5,
    "inbound_conns": 0,
    "outbound_conns": 4,
    "p2p_listen_addresses": [
      "tcp://<X.Y.W.Z>:13004",
      "udp://<X.Y.W.Z>:12004"
    ]
  }
}
```
</details>

## SSV-Pulse benchmarking tool

**Before using this tool** make sure to open [SSV Node Health Endpoint](#ssv-node-health-endpoint).

Benchmark analyzes SSV, Consensus, and Execution Nodes at the same time. If curious, you can find more details on [ssv-pulse GitHub page](https://github.com/ssvlabs/ssv-pulse).

To use this tool you can use docker compose or a docker command below:
<Tabs>
  <TabItem value="ssv-stack" label="SSV Stack">

  If you did setup your SSV node with the [SSV Stack repository](/operators/operator-node/node-setup/#install-ssv-node-stack), you already have the benchmark tool partially setup.

  To run the benchmark tool:
  * Open `docker-compose.yaml` file in your `ssv-stack` directory
  * Scroll down to the `ssv-pulse` service, at the very bottom
  * Replace the various addresses with the respective endpoints:
      * `--consensus-addr` to your Consensus HTTP, e.g. `http://127.0.0.1:5052`
      * `--execution-addr` to your Execution HTTP, e.g. `http://127.0.0.1:8545`
      * If you run a Hoodi node you should uncomment `--network=hoodi` (delete #)
      * If you run this on a arm64 machine you should uncomment `--platform linux/arm64`
  * Run `docker compose run ssv-pulse`

  </TabItem>
  <TabItem value="docker-run" label="docker run">

  Use the following command to run the benchmark tool:

  ```bash
  docker run --rm --network=host --pull=always --name ssv-pulse \
  ghcr.io/ssvlabs/ssv-pulse:latest benchmark \
  --consensus-addr=REPLACE_WITH_ADDR \
  --execution-addr=REPLACE_WITH_ADDR \
  --ssv-addr=REPLACE_WITH_ADDR \
  --duration=60m
  ```

  Replace the various addresses with the respective endpoints, e.g. `http://lighthouse:5052`, `http://geth:8545`, and SSV `http://ssv_node:16000` (or your other SSVAPIPort).

  - If you run a Hoodi Node you should add `--network=hoodi` to the command.
  - If you run this on a arm64 machine you should add `--platform linux/arm64` to the command.
  </TabItem>
  <TabItem value="docker-compose" label="docker compose">

If you used docker compose to run your SSV node — add the following part after the `services:` to your `docker-compose.yml` file:

```yaml
services:
  ssv-pulse:
    container_name: ssv-pulse
    image: ghcr.io/ssvlabs/ssv-pulse:latest
    command: 
      - 'benchmark'
      - '--consensus-addr=<YOUR_ADDRESS_HERE>' # Change to Consensus Node's address, e.g. http://lighthouse:5052
      - '--execution-addr=<YOUR_ADDRESS_HERE>' # Change to Execution Node's address, e.g. http://geth:8545
      - '--ssv-addr=<YOUR_ADDRESS_HERE>' # Change to SSV Node's address, e.g. http://ssv_node:16000
      - '--duration=60m'
      # - '--network=hoodi' # Add this if you run a Hoodi Node
      # - '--platform linux/arm64' # Add this if you run on an arm64 machine
    networks:
      - host # This allows ssv-pulse to access any docker container hosted on the machine
            # Alternatively, you can use your existing network instead. Check with docker network ls.
    pull_policy: always
```

Then run `docker compose up ssv-pulse` to run the benchmark tool.

  </TabItem>
</Tabs>

:::warning When analysing results
Use the `Value` column as the ultimate validation tool. Don't just look at the `Health` column, as this can sometimes be misleading. 

Now you can get back to the [**Checklists for Troubleshooting**](#checklists-for-troubleshooting) to interpret results.
:::
## SSV-Pulse log analysis

The same SSV-Pulse is capable of analysing your logs and also logs of other nodes. This is especially useful if you have access to logs of all nodes in the cluster (e.g. you're running the whole cluster yourself). 

If curious, you can find more details on [ssv-pulse GitHub page](https://github.com/ssvlabs/ssv-pulse).

To use this tool follow the steps below:
1. Locate debug log files. Usually they're in the same folder as config and named `debug-2025-03-10T....log`
2. Copy one or several log files into a **new** folder
3. `cd` into that folder
4. Run the command below:
```bash
docker run --rm --pull=always -v .:/logs ghcr.io/ssvlabs/ssv-pulse:latest analyzer --log-files-directory=/logs
```

:::info
Log files need to be placed in a fresh new directory. Otherwise you might see an error `panic: invalid character '\x00' looking for beginning of value`.
:::

Tool will automatically detect the Node ID for each log file. If you have logs from multiple nodes - we recommend choosing logs with similar timestamps.

<details>

<summary><strong>How to read the results?</strong></summary>

Let's look at example of output when analyzing logs of a single node:


![Log analysis example](/img/log-analyzer.png)

Results are divided into 3 sections:
1. Consensus and SSV Clients Performance
2. Peers Performance
3. Consensus Performance

Let's examine and understand each of the sections:
#### Consensus and SSV Clients Performance
Here you will find Response Time of your Consensus node, so how timely Consensus node responds to requests from SSV node.

`Response time: avg` for local setups should be within 1-20ms range. If your SSV and Consensus nodes are on separate instances, this number can go up to 150ms. It's always better to keep this number as low as possible of course.

`Response time: delayed` shows how many requests were delayed for >800ms. This should be 0.00%. Anything >0.20% shows that Consensus can have significant delays which will affect your Correctness.

On the right side you will see `SSV Client Performance` and its `Crashes`. If your EL or CL were out of sync or you restarted any of the nodes — your SSV node will have these Crashes. This number should be 0, if you see any unexpected restarts, it's a solid sign you have sync issues on one of the nodes.

#### Peers Performance
This section shows average number of peers, their versions, your peer ID. There is little insight here, you can treat this section as JFYI.

#### Consensus Performance
Here you will find data on how your node interacts with other nodes in the cluster(s). This section is especially useful if you have logs from multiple nodes, as you can spot patterns (e.g. one node has higher delays or lower participation rate).

:::info When analyzing logs from single node
You will always find your performance as the best in cluster. This is expected as your node doesn't have info from other data points. Actual performance can only be assessed with logs from several nodes.
:::

`Commit: delay avg` should ideally be < 150ms, it can go up to 300-500ms in normal/suboptimal scenarios. Anything >500ms is a reason for concern. Either your node is located really far away from other nodes or you have networking issues.

`Commit: delayed` can show which nodes are regularly late to submit their commit messages. That can signalize their performance issues or that your nodes are located too far from each other.

`Commit: total count` and `Prepare: total count` show # of Prepare and Commit messages occured in these logs. It is expected that host node (marked by *) will always have higher # of messages. Sometimes nodes can have high # of Prepare count while lower Commit count, that is usually a sign of networking and/or Consensus node issues on this node's side.

`Consensus: duplicate block root` can show issues with Consensus node and the blocks it syncs. Healthy number is 1-4%, anything >10% is a sign your Consensus node has an issue. You might have to re-sync your db or switch the Consensus client completely.

</details>
***
:::info Didn't find the answer you are looking for?
Reach out to other network operators on our [Discord channel](https://discord.gg/5vT22pRBrf)
:::

[^1]: 