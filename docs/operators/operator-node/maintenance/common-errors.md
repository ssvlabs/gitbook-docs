---
title: Common errors
sidebar_position: 2
---

This section is a collection of common warnings, error messages, statuses and other unexpected behaviours you might encounter and the possible related known causes.

***

### `failed to create beacon go-client`

```bash
FATAL	failed to create beacon go-client	{"error": "failed to create http client: failed to confirm node connection: failed to fetch genesis: failed to request genesis: failed to call GET endpoint: Get \"http://5.104.175.133:5057/eth/v1/beacon/genesis\": context deadline exceeded", "errorVerbose":…………….\nfailed to create http client", "address": "http://5.104.175.133:5057"}
```

This is likely due to issues with the Beacon layer Node. Verify that `BeaconNodeAddr` has the correct address and port in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file).

***

### `could not connect to execution client`

```bash
FATAL	could not connect to execution client	{"error": "failed to connect to execution client: dial tcp 5.104.175.133:8541: i/o timeout"}
```

This is likely due to issues with the Execution layer Node. Verify that `ETH1Addr` has the correct address and port in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file).

Finally, make sure that your ETH1 endpoint is running using Websocket. This is required in order to stream events from the network contracts.

***

### `could not setup operator private key`

```bash
FATAL	could not setup operator private key	{"error": "Operator private key is not matching the one encrypted the storage", "errorVerbose": ...{
```

Verify that the Operator Private Key is correctly set in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file). In particular, if using unencrypted (raw) keys, that the **private (secret) key** was copied in the configuration file and that it contains all characters (sometimes it contains a  `=`  character that can easily be left out).

If the node has been stopped and restart, verify that the same configuration has been applied, that the private key has not been changed, and that the `db.Path` configuration points to the same directory as before.

***

### `could not setup network`

```bash
FATAL	could not setup network	{"error": "network not supported: jatov2"}
```

In the example above, the `Network` in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file) was wrongly set to `jatov2` instead of `jato-v2`, so be sure to look for thinks like spelling mistakes.

***

### `could not create loggerlogging.SetGlobalLogger`

```bash
could not create loggerlogging.SetGlobalLogger: unrecognized level: "infor"
make: *** [Makefile:97: start-node] Error 1
```

In the example above, the `LogLevel` variable in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file) was wrongly set to `infor` instead of `info`, so be sure to look for thinks like spelling mistakes.

***

### `failed to get attestation data`

```bash
"error":"could not start committee duty: failed to get attestation data: failed to get attestation data: failed to call GET endpoint\nGet 
```

This error could be caused by using multiple SSV nodes within one Nimbus setup. It is advised to only run one SSV node per Nimbus instance.

***

### `ERROR P2PNetwork`

```bash
ERROR P2PNetwork unable to create external multiaddress {"error": "invalid ip address provided: ...
```

This error signalizes the node could not figure the public IP address of your node on a startup. You need to provide your SSV Node's address in `p2p: HostAddress:` variable in [your `config.yaml` file.](../node-setup/manual-setup#peer-to-peer-ports-configuration-and-firewall)

The error can also mention `communications error to 208.67.220.222#53: timed out`. The IP address is attributed to service SSV Node uses to check your IP address. You can cross-check if the service is available with this command:
```bash
dig +short myip.opendns.com @resolver4.opendns.com
```
If you see the same timeout error as above, that means your machine can not reach the service and you need to look further into allowing this connection on your server/machine.

***

### Node Metrics not showing up in Prometheus/Grafana

Please verify that the `MetricsAPIPort` variable is correctly set in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file).

For a more in-depth guide on how to set up Node monitoring, refer to [the dedicated page in this section](../monitoring).

***

### Node does not generate a log file

Please verify that the `LogFilePath` variable is correctly set in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file). Be sure to look for thinks like spelling mistakes.

***

### Node takes a long time to become active

Please verify that the `Path` under the `db` section is correctly set in [`config.yaml` configuration file](../node-setup/manual-setup#create-configuration-file). Be sure to look for thinks like spelling mistakes.

If the Node was working correctly and becomes inactive after a configuration change, make sure that `Path` wasn't accidentally changed. This will cause the database to be recostructed and will lead to a slower startup.

***

### `"no indices, duties won't be fetched"` message

This could be due to one of the following causes:

1. No validator has chosen your operator as one of its operators (for testing purposes you can always open one and select yourself as one of its managing operators).
2. Your node uses a different operator public key than the one you have registered to the network (using the SSV webapp).

Steps to confirm you use the same key:

1. Find the operator key that you have registered to the network in the [ssv explorer](https://explorer.ssv.network/).
2. Find the operator public key you have generated in your node during setup.
3. Compare between the keys -  if they do not match you must update your private key in the node config.yaml file, according to the key generated during your node node-setup/manual-setup#create-configuration-file.

:::info
Example log output showing the public key:
```json
{
  "level": "info",
  "time": "2021-12-13T06:45:14.466457Z",
  "caller": "operator/storage.go:122",
  "message": "setup operator privateKey is DONE!",
  "app": "SSV-Node:v0.1.7",
  "who": "operatorKeys",
  "public-key": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBOHRXRG0xbTNtYW5Ra0xweVpLMzcKMGNHRGoydlBTWStRWVFBd3BWOXZpWThKVlgzT2J0VjNLL24xNy9peGZ2VEx5aGZKckgzYStpS1NIcDl5WEU4cQp6N2RhOTlaVzU4RzAyeDF0ZnpuV1REMmFpbklpMDAwdjQ5RjFTdzlYOUttQUg5VzNGdjBaREpadzZKVFd3R0ZiCmZiTmM2cGVvTG5ucnllWlVXb09ZQms0TVg2Um9QV2ZXNUJEaURaeHFqVjdvbFV3ZnFBMW5OeU96RXFCMEtkSW8KbExSZFA4ODZBNFJrZGpjUDc5aWdrM0RjVVdCMDhpZlM4SFlvS012ZUZrek0yR2dmOG5LRnFmSnFYNzlybFR4cApSTnlheUZOYXhZWEY4enBBMHlYRGFHQ0I1TitzZ1N2Yjg1WDAydWVCa1NadFFUMUMyTGMxWlZkbERFZVpGNFNlCkh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
}
```
:::

:::info
Didn't find the answer you are looking for? Reach out to other network operators on our [Discord channel](https://discord.gg/5vT22pRBrf)
:::

[^1]: 