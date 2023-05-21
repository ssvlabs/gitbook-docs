# Installation

### Minimum Requirements

* [x] Machine running Ubuntu with 2 core, 4GB RAM, 5GB storage
* [x] ETH1 node with Websocket enabled
* [x] ETH2 node client - Prysm, Lighthouse, Tekou, Nimbus (or any client utilizing standard REST HTTP)&#x20;

#### Preferred Requirements

* [x] Machine running Ubuntu with 4 core, 4GB RAM, 20GB storage, IOPS > 10K
* [x] ETH and SSV nodes running on separate servers

### Setup Hosting Server

All cloud services are supported for your node setup (see a reference example on AWS [here](https://github.com/bloxapp/ssv/blob/main/docs/OPERATOR\_GETTING\_STARTED.md#setting-aws-server-for-operator)).

{% hint style="warning" %}
Make sure you setup a NEW server.
{% endhint %}

{% hint style="info" %}
When you setup your firewall, make sure to expose the ports that you set under "[5. Set Configuration File](installation.md#create-configuration-file)" (Default are 12001 UDP and 13001 TCP).
{% endhint %}

{% hint style="success" %}
SSV node setup is also available using [eth-docker](https://eth-docker.net/Support/BloxSSV/) and [Stereum Launcher](https://stereum.net/).
{% endhint %}

### Login with SSH

{% tabs %}
{% tab title="MacOS" %}
```
cd ./{path to the folder to which the key pair file was downloaded}

chmod 400 {key pair file name}

ssh -i {key pair file name} ubuntu@{instance public IP you took from AWS}
```
{% endtab %}

{% tab title="Windows" %}
```
cd /{path to the folder to which the key pair file was downloaded}

ssh -i {key pair file name} ubuntu@{instance public IP you took from AWS}
```
{% endtab %}
{% endtabs %}

### Installation Script

```
sudo su

$ wget https://raw.githubusercontent.com/bloxapp/ssv/main/install.sh

chmod +x install.sh

./install.sh
```

### Generate Operator Keys

Your Operator Public Key (PK) and Secret key (SK) are generated with this command.

{% hint style="info" %}
Your PK is required when[ registering your operator](registration.md) to the network.
{% endhint %}

```
docker run -d --name=ssv_node_op_key -it 'bloxstaking/ssv-node:latest' \
/go/bin/ssvnode generate-operator-keys && docker logs ssv_node_op_key --follow \
&& docker stop ssv_node_op_key && docker rm ssv_node_op_key
```

Command output:

{% tabs %}
{% tab title="PK Example" %}
LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBMDswYVdEK3RibndzYVdLYjF3UnEKM0xheW8rL1dSeGh3aVJ0aXFsL0dmZGozaHY0Unh5K1FwVzh6666RK1dJNmJ1VFc4bzN2ZmsydDMwNUlQRTdCVApZR3ZoS666MFNoYmlHVXVQcXpxQnVSTjB6OTUxV3VlcEJwV3RkeTdUaDVsT0w1cTQ3REFqbFFDdi95NlJLZzM5Ck9nTXZnZ1BaNTRNWHJZcFdINlJqa3hoVUxvWXQxTEVBN05pU3JHU3JqdGxCTlZiRHR5d666WFp0SnNkM2tjbTMKNkw0anZHd2I0RjhqTmlzSUU5eWFLd2J1SmV6dHpGdjY1YXRiV25hVFdzbmg1bDNrZ05uMlJLWktqZ1pycmRGdApuT2t3Vmh6M2JDRTFUZWpua1kwLzN4QTBIWjVONC9IUUF1Rit2TllYb040aDBicnVTdlVmZTBLTndvMDNFQ3l3Ckl3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0U
{% endtab %}

{% tab title="SK Example" %}
LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBMCswYVdEK3RibndzYVdLYjF3UnEzTGF5bysvV1J4aHdpUnRpcWwvR2ZkajNodjRSCnh5K1FwVzhFRUNRK1dJNmJ1VFc4bzN8YmsydDMwNUlQRTdCVFlHdmhKem4wU2hiaUdVdVBxenFCdVJOMHo5NTEKV3VlcEJwV3RkeTdUaDVsT0w1cTQ3REFqbFFDdi95NlJLZzM5T2dNdmdnUFo2VE1YcllwV0g2UmpreGhVTG9ZcwpxTEVBN05pU3JHU3JqdGxCTlZiRHR5d3lGWFp0SnNkM6gykTM2TDRqdkd3YjRGOGpOaXNJRTl5YUt3YnVKZXq0RnpGdjY1YXRiV25hVFdzbmg1bDNrZ05uMlJLWktqZ1pycmRGdG5Pa3dWaHozYkNFMVRlam5rWTAvM3hBMEhaNU4KNC9IU666Rit2TllYb040aDBicnVTdlVmZTBLTndvMDNFQ3l3SXdJREFRQUJBb0lCQUQvbW9XZjBvMlhLR1ZZWgpmcVlCMWZzQk43SkkwaEtUNHZMa2lBYVpaRzl6NlljUnV1aVZoZ2JzQjR5RENSWWd3Z0hCbTBTc1NFamFRY0pRCnF5MGpvTEJWTndtdDV1UWtMRDYyVXZhdGFJb1d2TVVrN2J2Z1dFMzgrZFlURDRNMmphVzdBSUZ2TG50eVBwOHkKT21FMDRLTUtiTnZHTDRHcWZ6dzdseVpwV2dEeTY0bWdkMk8rd21aZFNhdkR0TGNza666bHVSTEQxYklKVDQxSApwY3hKVk5qVmhFU3NGM1NGdXM4ZmpERXJiYmFQbnNTNWI3Z0hGUUJpZG5iYWhjOG5MOGFkT2M5Nks4a2FIWEFYCjJlSEloQitwSmdwUjU0bXY1bjZWTFljTUhXVTVyWE14emNicXQxVGFuMjI3MTA2NTRRQmIzY1ByT1V5UkI3REkKU1NEUzc0a0NnWUVBN1U4M0t4cWJpQy9mR2c4VUxMVjAzWktrOCtHWlNKZFlhN2ZnS2dXVCsvQjJLa2xPY2Y0TAoxcHYxMmlFbTdnVE5FYnNhaElpTm8wYlo5eEx2aG9NdTZoNSp==
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Pay attention to copy and set the entire **secret key** ("=" could be expected as well).
{% endhint %}

{% hint style="danger" %}
Please make sure to store and backup your operator **secret key** in a safe place. \
**Do not share** this key with anyone.
{% endhint %}

### Create Configuration File

Fill all the placeholders (e.g. `<ETH 2.0 node>` or `<db folder>`) with actual values, and run the command below to create a config.yaml file.

```
$ yq n db.Path "<db folder>" | tee config.yaml \
  && yq w -i config.yaml eth2.Network "prater" \
  && yq w -i config.yaml eth2.BeaconNodeAddr "<ETH 2.0 node>" \
  && yq w -i config.yaml eth1.ETH1Addr "<ETH1 node WebSocket address>" \
  && yq w -i config.yaml OperatorPrivateKey "<secret key of the operator>"
```

{% hint style="warning" %}
Make sure your ETH 1 endpoint is communicating **over websocket** and **not over HTTPS** in order to support subscriptions and notifications&#x20;
{% endhint %}



**Debug Configuration**

In order to see `debug` level logs, add the corresponding section to the `config.yaml` by running:

```
$ yq w -i config.yaml global.LogLevel "debug"
```

**Metrics Configuration**

In order to enable metrics, the corresponding config should be in place:

```
$ yq w -i config.yaml MetricsAPIPort "15000"
```

### Start Node in Docker

#### Run the docker image in the same folder you created the config.yaml:

```
docker run -d --restart unless-stopped --name=ssv_node -e \
CONFIG_PATH=./config.yaml -p 13001:13001 -p 12001:12001/udp -v \
$(pwd)/config.yaml:/config.yaml -v $(pwd):/data -it \
'bloxstaking/ssv-node:latest' make BUILD_PATH=/go/bin/ssvnode start-node \ 
&& docker logs ssv_node --follow
```

#### Update SSV Node Image

Kill running container and pull the latest image or a specific version&#x20;

```
$ docker rm -f ssv_node && docker pull bloxstaking/ssv-node:latest
```
