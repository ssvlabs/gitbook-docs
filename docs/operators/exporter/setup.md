---
title: Setup
sidebar_label: Setup
sidebar_position: 2
---

# Setup

## Prerequisites

- An installed `ssv-node` version that supports exporter v2 (node version `v2.4.x` or newer)
- A working node configuration for the target SSV P2P network.
- Execution and Beacon nodes to run alongside with SSV node.
- A writable database path with enough disk space for the selected exporter mode.

## Choose a setup path

Exporter mode has two setup paths:

- [**Standard mode:**](#configure-standard-mode) use this path for recent decided participation data with lower operational overhead.
- [**Archive mode:**](#configure-archive-mode) use this path for validator and committee duty traces, schedules, and historical trace analysis. Archive mode uses more CPU, memory, network, and disk resources.

## Configure standard mode

Standard mode enables exporter mode with the standard exporter data path. It exposes decided participation data through the exporter API and applies slot-based pruning through the exporter retention setting.

At a high level, configure the node to:

1. Enable exporter mode.
2. Select `standard` as the exporter mode.
3. Configure the HTTP API listen address and port.
4. Set retention for standard exporter data if the default does not fit your needs.

For exact configuration keys, environment variables, defaults, and accepted values, see [Configuration Reference](configuration-reference).

## Configure archive mode

Archive mode enables exporter mode with the archive trace data path. It observes consensus and partial-signature messages, reconstructs best-effort duty traces, persists them locally, and exposes archive trace APIs.

At a high level, configure the node to:

1. Enable exporter mode.
2. Select `archive` as the exporter mode.
3. Configure the HTTP API listen address and port.
4. Plan storage for long-running trace persistence.
5. Plan for higher P2P, CPU, memory, and disk usage than standard mode.

Archive mode subscribes broadly to SSV network traffic and runs exporter-specific scheduling and prefetching for all shares so it can build schedule and trace read models. Trace data is best-effort observation data. Missing trace data does not always mean that a duty did not exist or did not happen.

For exact configuration keys, environment variables, defaults, and accepted values, see [Configuration Reference](configuration-reference).

## Start the node

Start `ssv-node` with your [normal node start command](/operators/operator-node/node-setup/manual-setup#start-the-node) and the exporter configuration you prepared.

The exact command depends on how you install and run `ssv-node`. For example, use the same service, container, or binary invocation pattern you already use for the node, but point it at the exporter configuration.

During startup, check the logs for exporter-related messages, including:

- exporter mode being enabled;
- Pebble database usage for exporter-enabled nodes;
- skipped operator signing and key-manager services;
- invalid exporter mode errors, if the selected mode is not accepted;
- HTTP API startup on the address and port you configured.

## Verify the exporter

Run verification checks from a host that can reach the configured HTTP API. The examples below assume the API is bound locally on port `16000`; adjust the host and port for your configuration.

Check that the node API responds:

```bash
curl http://127.0.0.1:16000/v1/node/health
```

Check the decided participation endpoint. Use a small slot range where you expect data:

```bash
curl -G http://127.0.0.1:16000/v1/exporter/decideds \
  --data-urlencode 'from=<start-slot>' \
  --data-urlencode 'to=<end-slot>' \
  --data-urlencode 'roles=PROPOSER'
```

In standard mode, `/v1/exporter/decideds` uses the standard decided-participant data path. In archive mode, the same path is trace-derived.

For archive mode, also check one or both trace endpoints with a small slot range:

```bash
curl -G http://127.0.0.1:16000/v1/exporter/traces/validator \
  --data-urlencode 'from=<start-slot>' \
  --data-urlencode 'to=<end-slot>' \
  --data-urlencode 'roles=PROPOSER'
```

```bash
curl -G http://127.0.0.1:16000/v1/exporter/traces/committee \
  --data-urlencode 'from=<start-slot>' \
  --data-urlencode 'to=<end-slot>'
```

An empty response does not always mean the exporter is misconfigured. Exporter data depends on what the node has observed, the selected mode, the slot range, and whether data has already been written to the relevant store. Start with recent, narrow ranges and confirm that the node is connected to peers before increasing query scope.

## Next steps

- Use [Configuration Reference](configuration-reference) for config examples, environment variables, and defaults.
- Use [API Reference](api-reference) for endpoint fields and response behavior.
- Use [Troubleshooting](troubleshooting) if the node starts but exporter data is missing or API checks fail.
