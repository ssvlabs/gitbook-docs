---
title: Exporter
sidebar_label: Exporter
sidebar_position: 10
---

# Exporter

Exporter mode runs `ssv-node` as an observation and query service instead of as a validator-operating node. When exporter mode is enabled, the node connects to the SSV network, subscribes to network traffic, stores exporter data locally, and exposes exporter APIs for querying observed participation and, in archive mode, duty traces.

Exporter node's API serves as the data source for [SSV Explorer](https://explorer.ssv.network/mainnet/overview) and [ethereum2-monitor](https://hub.docker.com/r/ssvlabs/ethereum2-monitor).

## Supported versions

Use an `ssv-node` build that includes Exporter v2 support. Check the release notes for the minimum supported version and any exporter-specific upgrade steps for your deployment.

Exporter functionality is not necessarily updated in every `ssv-node` release. When planning an upgrade, check the release notes for exporter-specific changes. If exporter mode is not mentioned, exporter-specific update work can usually be skipped, although you should still follow any general `ssv-node` upgrade requirements that apply to your deployment.

## What exporter mode does

Exporter mode is designed for reading network activity, not for performing validator duties.

- It does not originate validator duties or signing duties.
- It skips operator signing and key-management services used by regular operator nodes.
- It subscribes broadly to SSV network traffic so it can observe messages from the network.
- It stores exporter data locally and serves read APIs.

The exact data available depends on the selected exporter mode.

## Exporter modes

Exporter mode supports two modes: `standard` and `archive`.

### Standard mode

Standard mode is the lighter exporter mode. It uses the standard mode data path and exposes decided participation data through the exporter API. Standard mode applies slot-based pruning through the exporter retention setting, with a default retention of `50400` slots.

Use standard mode when you need recent decided participation data and want lower operational overhead than archive mode.

### Archive mode

Archive mode is the fuller tracing mode. It observes consensus and partial-signature messages, reconstructs best-effort duty traces, stores them locally, and exposes trace APIs for validator and committee duties in addition to decided data.

Archive mode also runs exporter-specific duty scheduling and prefetching for all shares so it can build schedule and trace read models. It does not execute duties. Trace data is based on observed P2P messages, so missing data does not always mean a duty did not exist or did not happen.

Use archive mode when you need detailed historical trace data and can allocate more CPU, memory, network, and disk resources.

## Resource requirements

Exporter mode generally uses more network resources than a regular single-operator workload because it subscribes broadly to SSV network traffic. Both modes use Pebble storage under the configured database path with a `-pebble` suffix when exporter mode is enabled.

### Standard mode resources

Standard mode is the lower-resource option.

- **Network:** subscribes broadly to SSV network traffic.
- **Storage:** stores decided participant data and prunes old participant data by `RetainSlots`.
- **CPU and memory:** generally lower than archive mode because it does not run the archive duty tracer or archive trace APIs.

### Archive mode resources

Archive mode has higher resource requirements.

- **Network:** subscribes broadly to SSV network traffic and observes consensus and partial-signature messages.
- **CPU and memory:** performs trace collection, schedule computation, and duty prefetching. It keeps a short in-memory trace window before writing traces to disk.
- **Storage:** persists validator duty traces, committee duty traces, validator-to-committee links, and schedule data. No archive trace pruning limit has been identified, so disk usage can grow over time.
- **API load:** archive API queries can scan inclusive slot ranges. Large ranges may be expensive, so keep query ranges practical for your infrastructure.

## Choosing a mode

Choose the mode based on the data you need and the resources you can dedicate.

| Need | Recommended mode |
| --- | --- |
| Recent decided participation data with lower overhead | Standard mode |
| Detailed validator and committee duty traces | Archive mode |
| Long-running historical trace collection | Archive mode, with storage growth planned and monitored |
| Minimal exporter-specific maintenance | Standard mode |

If you are not sure which mode to use, start with standard mode and move to archive mode only when you need trace endpoints or longer-term trace analysis.

## Pages in this section

- [Setup](setup): enable exporter mode, configure the API, start the node, and verify that the exporter is running.
- [Configuration Reference](configuration-reference): look up exporter configuration keys, environment variables, defaults, and mode-specific settings.
- [API Reference](api-reference): review exporter endpoints, request fields, responses, and API behavior.
- [Troubleshooting](troubleshooting): diagnose common startup, API, storage, and data-availability issues.
