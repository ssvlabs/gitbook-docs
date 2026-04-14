---
title: Common errors
sidebar_position: 2
---

This page collects common warnings, errors, statuses, and other unexpected behavior you might encounter, along with likely causes.

***

### `failed to create beacon go-client`

```bash
FATAL	failed to create beacon go-client	{"error": "failed to create http client: failed to confirm node connection: failed to fetch genesis: failed to request genesis: failed to call GET endpoint: Get \"http://5.104.175.133:5057/eth/v1/beacon/genesis\": context deadline exceeded", "errorVerbose":…………….\nfailed to create http client", "address": "http://5.104.175.133:5057"}
```

This usually points to a Beacon node issue. Verify that `BeaconNodeAddr` is correct in [`config.yaml`](/operators/operator-node/node-setup/manual-setup#create-configuration-file).

***

### `could not connect to execution client`

```bash
FATAL	could not connect to execution client	{"error": "failed to connect to execution client: dial tcp 5.104.175.133:8541: i/o timeout"}
```

This usually points to an Execution node issue. Verify that `ETH1Addr` is correct in [`config.yaml`](/operators/operator-node/node-setup/manual-setup#create-configuration-file).

Also make sure your ETH1 endpoint uses WebSocket. SSV Node requires this to stream events from the network contracts.

***

### `could not set up operator private key`

```bash
FATAL	could not setup operator private key	{"error": "Operator private key is not matching the one encrypted the storage", "errorVerbose": ...{
```

Verify that the Operator Private Key is correctly set in [`config.yaml` configuration file](/operators/operator-node/node-setup/manual-setup#create-configuration-file). In particular, if using unencrypted (raw) keys, that the **private (secret) key** was copied in the configuration file and that it contains all characters (sometimes it contains a  `=`  character that can easily be left out).

If the node was stopped and restarted, verify that the same configuration is still applied, the private key has not changed, and `db.Path` still points to the same directory.

***

### `could not setup network`

```bash
FATAL	could not setup network	{"error": "network not supported: jatov2"}
```

In the example above, `Network` in [`config.yaml`](/operators/operator-node/node-setup/manual-setup#create-configuration-file) was set to `jatov2` instead of `jato-v2`. Check for spelling mistakes like this.

***

### `could not create loggerlogging.SetGlobalLogger`

```bash
could not create loggerlogging.SetGlobalLogger: unrecognized level: "infor"
make: *** [Makefile:97: start-node] Error 1
```

In the example above, `LogLevel` in [`config.yaml`](/operators/operator-node/node-setup/manual-setup#create-configuration-file) was set to `infor` instead of `info`. Check for spelling mistakes like this.

***

### `failed to get attestation data`

```bash
"error":"could not start committee duty: failed to get attestation data: failed to get attestation data: failed to call GET endpoint\nGet 
```

This error can be caused by running multiple SSV nodes with one Nimbus setup. Run only one SSV Node per Nimbus instance.

***

### `ERROR P2PNetwork`

```bash
ERROR P2PNetwork unable to create external multiaddress {"error": "invalid ip address provided: ...
```

This error means the node could not determine its public IP address on startup. Set the SSV Node address in `p2p: HostAddress:` in [your `config.yaml` file](/operators/operator-node/node-setup/manual-setup#peer-to-peer-ports-configuration-and-firewall).

The error can also mention `communications error to 208.67.220.222#53: timed out`. The IP address is attributed to service SSV Node uses to check your IP address. You can cross-check if the service is available with this command:
```bash
dig +short myip.opendns.com @resolver4.opendns.com
```
If you see the same timeout error, your machine cannot reach the service. Check whether the connection is blocked on the server or local machine.

***

### Node Metrics not showing up in Prometheus/Grafana

Please verify that the `MetricsAPIPort` variable is correctly set in [`config.yaml` configuration file](/operators/operator-node/node-setup/manual-setup#create-configuration-file).

For a more detailed guide, see [Monitoring](/operators/operator-node/monitoring/).

***

### Node does not generate a log file

Verify that `LogFilePath` is set correctly in [`config.yaml`](/operators/operator-node/node-setup/manual-setup#create-configuration-file). Also check for spelling mistakes.

***

### Node takes a long time to become active

Verify that `Path` under the `db` section is set correctly in [`config.yaml`](/operators/operator-node/node-setup/manual-setup#create-configuration-file). Also check for spelling mistakes.

If the node was working and becomes inactive after a configuration change, make sure `Path` was not changed accidentally. That causes the database to be rebuilt and leads to slower startup.

***

### `"no indices, duties won't be fetched"` message

This could be due to one of the following causes:

1. No validator has chosen your operator as one of its operators (for testing purposes you can always open one and select yourself as one of its managing operators).
2. Your node uses a different Operator public key from the one registered on the network in the Web App.

Steps to confirm you use the same key:

1. Find the operator key that you have registered to the network in the [ssv explorer](https://explorer.ssv.network/).
2. Find the operator public key you have generated in your node during setup.
3. Compare the keys. If they do not match, update the private key in `config.yaml` to use the key generated during setup.

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
Did not find the answer you need? Reach out to other network Operators in our [Discord channel](https://discord.gg/5vT22pRBrf).
:::

[^1]: 
