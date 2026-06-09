---
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 5
---

# Troubleshooting

Use this guide when exporter endpoints are unavailable, responses are empty or partial, traces are missing, or archive storage is growing faster than expected.

Exporter data is local to the node and depends on the selected mode, observed P2P messages, local retention, and query filters. Start with the smallest possible query and confirm the active mode before assuming data is missing.

## Known limitations

Archive mode data is useful for tracing and analysis, but it has important limitations:

- Traces are best-effort observations from P2P messages. Missing trace data is not proof that a duty did not happen.
- Schedule data is a best-effort read model of expected duties. Missing schedule data is not proof that no duty was scheduled.
- Schedule computation is asynchronous. Jobs can be dropped under backpressure, and schedule errors may be logged without appearing in API responses.
- The schedule writer populates attester, proposer, and sync committee schedule data. Aggregator and sync committee contribution bits are supported by storage/API models but were not found populated by the current schedule writer.
- Committee partial-signature classification depends on proposal data and signing roots. If the exporter cannot classify pending committee signatures, those signatures may be dropped when the in-memory slot window is evicted.
- Archive API queries loop over inclusive slot ranges and no maximum range validation has been identified. Large ranges can be resource-intensive.
- No archive trace pruning path tied to the standard retention setting has been found. Plan and monitor disk usage accordingly.
- `/v1/exporter/decideds` uses different backend behavior in archive mode than in standard mode.
- Some data can be returned with partial errors. Treat response errors as part of the result, especially when querying wider ranges.

## Quick checks

Before debugging a specific endpoint, verify the basics:

1. **Confirm exporter mode is enabled.** The node must run with exporter mode enabled. Standard mode is selected by `standard`; archive mode is selected by `archive`. Invalid exporter mode values are fatal at startup.
2. **Confirm the endpoint is available in the selected mode.** Standard mode exposes only `/v1/exporter/decideds`. Archive mode also exposes validator and committee trace endpoints. See [API Reference](./api-reference.md).
3. **Confirm the HTTP API is enabled.** Exporter HTTP endpoints are served through `SSVAPIPort`. If the port is `0` or unavailable from your client, the HTTP exporter endpoints are not reachable.
4. **Use a narrow slot range first.** Exporter queries scan inclusive slot ranges. Large ranges can be slow, fail, or add significant load.
5. **Check the query filters.** Make sure `from` is less than or equal to `to`, required `roles` are present for decided and validator trace queries, public keys and committee IDs have the expected hex lengths, and the queried role is supported. For `/v1/exporter/decideds`, remember that `indices` filtering applies only in archive mode; standard mode ignores `indices` and filters by `roles` and `pubkeys`.
6. **Allow for persistence timing.** Archive trace collection keeps a short in-memory window before dumping traces to the database. Very recent slots may behave differently from older slots that have already been persisted.

## Exporter endpoints are unavailable

### Symptoms

- The exporter URL cannot be reached.
- The node API responds, but an exporter route returns not found or does not behave as expected.
- Trace endpoints are unavailable while `/v1/exporter/decideds` is available.

### Likely causes and actions

| Cause | What to check | Action |
| --- | --- | --- |
| HTTP API is disabled | `SSVAPIPort` is unset, set to `0`, or the service/container is not publishing the port. | Enable the HTTP API port in the node configuration. |
| Client is using the wrong host or port | The request target does not match `SSVAPIAddress` and `SSVAPIPort`. | Query the configured HTTP API address and port. |
| Wrong exporter mode | Trace endpoints exist only in archive mode. | Use [Archive Mode](./archive-mode.md) for trace endpoints, or query `/v1/exporter/decideds` in standard mode. |
| Exporter mode is not enabled | The node is running as a regular operator node instead of an exporter-enabled node. | Enable exporter mode and restart using the intended exporter configuration. |
| Invalid exporter mode value | The node fails during startup when the mode is not accepted. | Use `standard` or `archive`. See [Configuration Reference](./configuration-reference.md). |

## Responses are empty

An empty `data` array is not always an error. Archive trace queries suppress not-found results, so a query that only misses data can return `200 OK` with empty `data` and no `errors[]`.

### Common causes

- The slot range is wrong, too old, too new, or outside the data retained by that exporter node.
- The selected exporter mode does not collect the requested data type.
- Standard mode retention has pruned older standard decided data.
- Archive mode has not observed, classified, or persisted matching trace data.
- The node did not observe the relevant P2P messages because of connectivity, peer, or subnet coverage issues.
- The request filters do not match stored data, such as the wrong role, validator public key, validator index, or committee ID. For standard-mode `/v1/exporter/decideds`, an `indices`-only filter is ignored, so the query can still return all participants in the slot range for the selected roles.
- Archive decided entries with no signers can be omitted without an API error.

### What to do

1. Retry with a narrow slot range where you expect data.
2. Confirm that the endpoint is supported in the active mode.
3. For standard mode, check whether the requested slots are inside the configured `RetainSlots` window.
4. For archive mode, compare trace data with `schedule` data when available, but do not treat missing schedule data as proof that no duty existed.
5. Confirm that the node has stable P2P connectivity and enough peers for the traffic you expect to observe.
6. Remove optional filters and add them back one at a time to identify mismatches.

## Traces are missing in archive mode

Archive mode reconstructs traces from observed network messages. Missing traces do not prove that a duty did not occur.

### Validator trace caveats

- Validator trace queries require `roles`.
- When querying committee-duty roles through the validator trace endpoint, such as `ATTESTER` or `SYNC_COMMITTEE`, provide `pubkeys` or `indices`. Without validator filters, use the committee trace endpoint instead.
- The archive decided path can include trace-derived data that differs from the standard-mode decided backend.
- `indices` filters are valid for validator trace queries and archive-mode decided queries. They are ignored by standard-mode `/v1/exporter/decideds`.

### Committee trace caveats

- Committee trace queries do not support a `roles` filter. A `roles` field in older examples or client code should not be relied on for committee trace filtering.
- Committee partial-signature classification depends on proposal data and signing roots. If the exporter cannot classify pending committee signatures, those signatures may be dropped when the in-memory slot window is evicted.
- Schedule grouping depends on best-effort schedule computation and committee links. Missing schedule entries or links can make schedule data incomplete even when some trace data exists.

### What to do

- Query a short range around the expected slot before widening the range.
- Verify the role and identifier filters.
- For committee-wide data, use `/v1/exporter/traces/committee` rather than validator traces without validator filters.
- Check peer connectivity and whether the exporter has been running long enough to observe the relevant traffic.
- Remember that recent slots may still be in memory, while older slots may have been persisted after the archive mode in-memory window.

## Responses contain `errors[]`

Archive trace endpoints can return `200 OK` with partial data and an `errors` array. Treat `errors[]` as part of the result, not as a separate logging detail.

### How to interpret partial responses

- `200 OK` with `data` and `errors[]` means the exporter returned what it could and also encountered one or more non-not-found errors.
- Not-found conditions are intentionally suppressed and normally do not appear in `errors[]`.
- If the query returns no data and encounters a meaningful backend error, the endpoint can return `500 Internal Server Error` instead of a partial `200 OK`.
- Standard-mode `/v1/exporter/decideds` uses the standard-mode decided backend and does not populate partial errors in the same way as archive trace queries.

### What to do

1. Reduce the slot range.
2. Query one role or one identifier at a time.
3. Check whether the response is still useful despite partial errors.
4. If errors repeat for narrow queries, collect the request fields, endpoint, mode, status code, and response body for investigation.

## Large queries are slow or fail

Exporter APIs loop over inclusive slot ranges. No maximum range validation has been identified. Large archive queries can be expensive for CPU, memory, and local database I/O, and may time out or fail under load.

### What to do

- Use small slot windows for dashboards, alerting, and manual investigation.
- Split historical analysis into batches instead of one large request.
- Avoid broad unfiltered archive queries during periods of high node load.
- Prefer specific roles, public keys, committee IDs, and, where supported, validator indices. For `/v1/exporter/decideds`, use `indices` only with archive mode; use `pubkeys` for validator filtering in standard mode.

Large query behavior is especially important in archive mode because archive endpoints can scan detailed trace storage. Standard mode is lighter, but large decided queries can still add load.

## Archive database is growing

Archive mode persists validator duty traces, committee duty traces, validator-to-committee links, and scheduled duty data locally. No archive duty-trace pruning path tied to `RetainSlots` has been identified.

### Standard vs archive retention

| Mode | Data path | Retention behavior |
| --- | --- | --- |
| Standard | Standard decided data | Uses `RetainSlots` for slot-based pruning. |
| Archive | Duty-trace persistence and schedule data | No archive trace pruning path tied to `RetainSlots` has been identified. |

### What to do

- Monitor the exporter Pebble database path derived from `DB_PATH + "-pebble"`.
- Plan capacity for long-running trace collection before enabling archive mode in production.
- Add external retention, cleanup, or storage lifecycle controls if your environment requires bounded archive storage.
- Keep query consumers efficient; heavy API load can add database pressure even if it is not the root cause of storage growth.

Do not assume that lowering `RetainSlots` will prune archive trace data. That setting applies to the standard-mode decided data pruning path.

## Known API and schema gotchas

Account for these behavior details when writing clients or diagnosing unexpected responses:

- `/v1/exporter/decideds` exists in both modes, but its backend differs. Standard mode reads the standard-mode decided backend; archive mode reads trace-derived data.
- Standard-mode `/v1/exporter/decideds` ignores `indices`. If a standard-mode query is filtered only by `indices`, the index filter is not applied; with no `pubkeys`, the endpoint can return all participants in the slot range for the selected roles.
- Validator trace and decided requests require `roles`.
- Committee trace requests do not support a `roles` field.
- The committee ID field is `committeeIDs` in POST JSON, but the current GET query parameter is `committeeids`.
- Validator public keys must decode to 48 bytes, represented as 96 hex characters.
- Committee IDs must decode to 32 bytes, represented as 64 hex characters.
- `from` and `to` are inclusive, and `from` must be less than or equal to `to`.
- The generated schema may not fully describe mode-dependent runtime behavior, especially for `/v1/exporter/decideds`.
- Schedule data is best-effort and asynchronous. Missing `schedule` entries do not prove that no duty was scheduled.
- Trace data is best-effort observation data. Missing `data` entries do not prove that no duty happened.

For endpoint fields and mode-specific response behavior, see [API Reference](./api-reference.md).

## Information to collect before escalating

When a problem persists after the checks above, collect:

- exporter mode: `standard` or `archive`;
- the HTTP API bind address and port configuration;
- whether the WebSocket API is enabled;
- endpoint, method, request fields, status code, and response body;
- the slot range, roles, public keys, committee IDs, and any indices used, including whether the indices were sent to an archive-mode decided query or to a validator trace endpoint;
- whether the query is expected to hit standard retention or archive trace storage;
- recent exporter-related startup and runtime logs;
- disk usage for the exporter database path;
- whether the issue reproduces with a narrow slot range and minimal filters.
