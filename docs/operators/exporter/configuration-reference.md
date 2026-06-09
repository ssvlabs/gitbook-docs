---
title: Configuration Reference
sidebar_label: Configuration Reference
sidebar_position: 3
---

# Configuration Reference

One of the most important parameters for an Exporter node is MaxPeers. The more peers Exporter node connects to, the more network information it can have.

Recommended values are `p2p.DynamicMaxPeersLimit: 1200` and `p2p.MaxPeers: 1000`

### Exporter Variables

Exporter mode is configured under the `exporter` YAML block or through matching environment variables.

| YAML key | Environment variable | Supported values | Default | Description |
| --- | --- | --- | --- | --- |
| `exporter.Enabled` | `EXPORTER` | `true`, `false` | `false` | Enables exporter mode. When enabled, the node runs as an observation and query service and skips operator signing and key-manager services. |
| `exporter.Mode` | `EXPORTER_MODE` | `standard`, `archive` | `standard` | Selects the exporter mode. Invalid values are fatal at startup. |
| `exporter.RetainSlots` | `EXPORTER_RETAIN_SLOTS` | unsigned integer slot count | `50400` | Slot retention setting used by the standard-mode decided data pruning path. See [Retention behavior](#retention-behavior). |

### Standard mode

Standard mode is selected by enabling exporter mode and using `standard` as the exporter mode. Because the default for `exporter.Mode` is `standard`, a node with `exporter.Enabled: true` and no explicit mode uses standard mode.


```yaml
p2p:
  MaxPeers: 1000
  DynamicMaxPeersLimit: 1200

SSVAPIAddress: 127.0.0.1
SSVAPIPort: 16000

exporter:
  Enabled: true
  Mode: standard
  RetainSlots: 50400
```

Environment-variable equivalent:

```dotenv
P2P_MAX_PEERS=1000
P2P_DYNAMIC_MAX_PEERS_LIMIT=1200
SSV_API_ADDRESS=127.0.0.1
SSV_API_PORT=16000
EXPORTER=true
EXPORTER_MODE=standard
EXPORTER_RETAIN_SLOTS=50400
```

### Archive mode

Archive mode is selected by enabling exporter mode and setting the mode to `archive`.

```yaml
p2p:
  MaxPeers: 1000
  DynamicMaxPeersLimit: 1200

SSVAPIAddress: 127.0.0.1
SSVAPIPort: 16000

exporter:
  Enabled: true
  Mode: archive
```

Environment-variable equivalent:

```dotenv
P2P_MAX_PEERS=1000
P2P_DYNAMIC_MAX_PEERS_LIMIT=1200
SSV_API_ADDRESS=127.0.0.1
SSV_API_PORT=16000
EXPORTER=true
EXPORTER_MODE=archive
```

`exporter.RetainSlots` is still a valid configuration key in archive mode because it is part of the exporter options, but no archive duty-trace pruning path that uses it has been identified. Plan archive storage accordingly.

## API configuration

The exporter HTTP endpoints are served through the node HTTP API. The WebSocket API is configured separately.

| YAML key | Environment variable | Default | Description |
| --- | --- | --- | --- |
| `SSVAPIAddress` | `SSV_API_ADDRESS` | No struct default identified. Empty address listens on all interfaces when `SSVAPIPort` is greater than `0`. | Listen address for the HTTP API. Use `127.0.0.1` for local-only access. |
| `SSVAPIPort` | `SSV_API_PORT` | No struct default identified. `0` disables the HTTP API. | Listen port for the HTTP API, including exporter HTTP endpoints. |
| `WebSocketAPIPort` | `WS_API_PORT` | No struct default identified. `0` disables the WebSocket API. | Listen port for the WebSocket API. It has no built-in authentication, binds to all interfaces when enabled, and accepts cross-origin WebSocket connections (`CheckOrigin` returns true). |
| `WithPing` | `WITH_PING` | No default identified. | Enables WebSocket ping messages. |

Recommended local HTTP API binding:

```yaml
SSVAPIAddress: 127.0.0.1
SSVAPIPort: 16000
WebSocketAPIPort: 0
```

If `SSVAPIAddress` is omitted while `SSVAPIPort` is configured, the HTTP API listens on all interfaces for backward compatibility. The HTTP server setup does not include built-in authentication or CORS middleware. Keep APIs local-only unless remote access is intentional and protected by network controls such as a private network, firewall, or authenticated reverse proxy.

## Database configuration

Exporter-enabled nodes use Pebble storage. Non-exporter nodes use Badger storage.

| YAML key | Environment variable | Default | Description |
| --- | --- | --- | --- |
| `db.Path` | `DB_PATH` | `./data/db` | Base database path. Exporter-enabled nodes use Pebble at `DB_PATH + "-pebble"`. |
| `db.Reporting` | `DB_REPORTING` | `false` | Database reporting setting. |
| `db.GCInterval` | `DB_GC_INTERVAL` | `6m` | Database garbage-collection interval setting. |

When exporter mode is enabled, the startup path calls the Pebble setup path and derives the Pebble location by appending `-pebble` to `db.Path`.

For example, with the default base path:

```yaml
db:
  Path: ./data/db
```

the exporter Pebble path is:

```text
./data/db-pebble
```

If you change `db.Path`, update disk-capacity planning for the corresponding `-pebble` directory.

## Retention behavior

Retention behavior depends on the selected exporter mode.

### Standard mode retention

Standard mode uses the standard decided data stores. Standard mode initializes pruning only when exporter mode is enabled and `exporter.Mode` is `standard`.

The pruning path:

- uses `exporter.RetainSlots` / `EXPORTER_RETAIN_SLOTS`;
- computes an initial threshold from the current slot minus `RetainSlots`;
- starts continuous pruning for each standard-mode decided store as slots advance.

The default retention value is `50400` slots. Data older than the retained slot window may no longer be available from that exporter node.

### Archive mode retention

Archive mode persists duty-trace data through the duty tracer and exporter store. Persisted archive objects include:

- validator duty traces;
- committee duty traces;
- validator-to-committee links;
- scheduled duty data.

`exporter.RetainSlots` exists in archive mode because it is part of the exporter options, but no archive duty-trace pruning path tied to `RetainSlots` has been identified. Do not assume archive trace data is pruned automatically by `RetainSlots`; monitor disk growth and add external retention or cleanup if your deployment requires it.

Archive trace collection also uses a short in-memory window before data is written to the database. The in-memory duty-tracer TTL is `4` slots. On slot ticks, traces around `currentSlot - 4` are evicted from memory and dumped to the database. Late-arriving messages may still update persisted traces, but late processing is best effort.

## Next Steps

- Use [API Reference](api-reference) for endpoint fields and response behavior.
- Use [Troubleshooting](troubleshooting) if the node starts but exporter data is missing or API checks fail.
