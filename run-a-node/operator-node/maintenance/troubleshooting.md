# Troubleshooting

### Node not participating

#### Q: Why I am receiving `"failed to check address"` error?

{% hint style="danger" %}
`{"level":"debug","time":"2021-12-13T06:45:24.529069Z","caller":"p2p/discovery.go:56","message":"`**`failed to check address`**`","app":"SSV-Node:v0.1.7","component":"p2p","id":"16Uiu2HAmQYHdvGW2rtCejsz3BCNJsoBWpD9Kd2NuZWRgGggkKg4h","addr":"220.158.208.20:13001","err":"IP address is not accessible: dial tcp 220.158.208.20:13000: i/o timeout"}`
{% endhint %}

**A:** Port 13000 is closed - please make sure it is open (on both docker and machine level) and restart your node.&#x20;

For confirmation, you should see `"Address was checked successfully"` message.

#### Q: Why am I receiving `"no indices, duties won’t be fetched"` message?

**A:** could be one of the following cases:

1. No validator has chosen your operator as one of its operators (for testing purposes you can always open one and select yourself as one of its managing operators).
2. Your node uses a different operator public key than the one you have registered to the network (using the SSV webapp).

Steps to confirm you use the same key:

1. Find the operator key that you have registered to the network in the [ssv explorer](https://explorer.ssv.network/).
2. Find the operator public key you have generated in your node during setup.
3. Compare between the keys -  if they do not match you must update your private key in the node config.yaml file, according to the key generated during your node installation.

{% hint style="info" %}
`{"level":"info","time":"2021-12-13T06:45:14.466457Z","caller":"operator/storage.go:122","message":`**`"setup operator privateKey is DONE!"`**`,"app":"SSV-Node:v0.1.7","who":"operatorKeys","`**`public-key`**`":"`**`LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBOHRXRG0xbTNtYW5Ra0xweVpLMzcKMGNHRGoydlBTWStRWVFBd3BWOXZpWThKVlgzT2J0VjNLL24xNy9peGZ2VEx5aGZKckgzYStpS1NIcDl5WEU4cQp6N2RhOTlaVzU4RzAyeDF0ZnpuV1REMmFpbklpMDAwdjQ5RjFTdzlYOUttQUg5VzNGdjBaREpadzZKVFd3R0ZiCmZiTmM2cGVvTG5ucnllWlVXb09ZQms0TVg2Um9QV2ZXNUJEaURaeHFqVjdvbFV3ZnFBMW5OeU96RXFCMEtkSW8KbExSZFA4ODZBNFJrZGpjUDc5aWdrM0RjVVdCMDhpZlM4SFlvS012ZUZrek0yR2dmOG5LRnFmSnFYNzlybFR4cApSTnlheUZOYXhZWEY4enBBMHlYRGFHQ0I1TitzZ1N2Yjg1WDAydWVCa1NadFFUMUMyTGMxWlZkbERFZVpGNFNlCkh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`**`"}`
{% endhint %}

### &#x20;Blockchains endpoints troubleshooting

#### **Q: Why does my ETH1 endpoint fail to connect?**

**A:** make sure that your ETH1 endpoint is running using Websocket, it is required in order to stream events from the network contracts.

#### Q: Why am I receiving the `“port 13000 already running”` error?

**A:** This could happen if you run both consensus node and SSV node on the same machine - please make sure to change your SSV node port to any other port in the following places:&#x20;

1. config.yaml `TcpPort: <NEW_PORT>`
2. Docker command `-p NEW_PORT:NEW_PORT`
3. Machine level - configure according to the cloud provider (enable new port).

After updating your port, please restart the SSV node and confirm the error does not appear.

{% hint style="info" %}
Didn't find the answer you are looking for? Reach out to other network operators on our [Discord channel](https://discord.gg/kqWmdU8dQ2)
{% endhint %}

