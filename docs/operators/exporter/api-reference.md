---
title: API Reference
sidebar_label: API Reference
sidebar_position: 4
---

# API Reference

The exporter HTTP API exposes observed SSV Network participation data from an exporter-enabled `ssv-node`. Standard mode exposes decided-participant queries. Archive mode adds trace queries and uses a trace-derived decided backend.

This page is a human-readable reference for the exporter endpoints. It describes the request fields, response behavior, and mode-specific caveats that API clients should handle.

## Base URL

Exporter endpoints are served by the `ssv-node` HTTP API server, not by the WebSocket API. The base URL is determined by the node's HTTP API listen address and port:

```text
http://<SSVAPIAddress>:<SSVAPIPort>
```

For a local exporter configured with `SSVAPIAddress: 127.0.0.1` and `SSVAPIPort: 16000`, the base URL is:

```text
http://127.0.0.1:16000
```

If the HTTP API port is disabled or unavailable from your client, these endpoints are not reachable.

## Availability by mode

| Endpoint | Standard mode | Archive mode |
| --- | --- | --- |
| `GET /v1/exporter/decideds` | Supported; uses the standard-mode decided backend | Supported; uses trace-derived archive data |
| `POST /v1/exporter/decideds` | Supported; uses the standard-mode decided backend | Supported; uses trace-derived archive data |
| `GET /v1/exporter/traces/validator` | Not available | Supported |
| `POST /v1/exporter/traces/validator` | Not available | Supported |
| `GET /v1/exporter/traces/committee` | Not available | Supported |
| `POST /v1/exporter/traces/committee` | Not available | Supported |

The `/v1/exporter/decideds` route is intentionally listed for both modes, but its backend behavior differs:

- **Standard mode:** reads from the standard-mode decided backend.
- **Archive mode:** reads decided data from archive trace storage.

If a client can query both standard and archive exporters, do not assume that `/v1/exporter/decideds` has identical semantics in both modes.

## Request formats

Each endpoint supports both `GET` and `POST`:

- Use `GET` with query parameters for simple queries.
- Use `POST` with a JSON body for structured clients or larger filter sets.

The same logical filters are accepted in both formats, but field casing is not always identical between `GET` query parameters and `POST` JSON bodies. Slot ranges are inclusive.

### GET query parameter casing

For `GET` requests, query parameter names are bound from the Go request field name unless the field has an explicit `form` tag. In the current committee trace request model, `CommitteeIDs` has `json:"committeeIDs"` but no `form` tag, so the query parameter name is lowercased to `committeeids`.

- Use `committeeids` in `GET /v1/exporter/traces/committee` URLs.
- Use `committeeIDs` in `POST /v1/exporter/traces/committee` JSON bodies.

Do not use `committeeIDs` in a `GET` URL unless the source code changes to add a matching `form` tag. In the current implementation, `committeeIDs` is not bound as a query filter, so it will not trigger committee ID length validation and can result in a broader or unfiltered committee trace query.

### GET query example

```bash
curl -G http://127.0.0.1:16000/v1/exporter/decideds \
  --data-urlencode 'from=<start-slot>' \
  --data-urlencode 'to=<end-slot>' \
  --data-urlencode 'roles=PROPOSER'
```

### POST body example

```bash
curl -X POST http://127.0.0.1:16000/v1/exporter/decideds \
  -H 'Content-Type: application/json' \
  -d '{
    "from": <start-slot>,
    "to": <end-slot>,
    "roles": ["PROPOSER"]
  }'
```

Use narrow slot ranges first. Exporter endpoints loop over the requested range, and no maximum range validation has been identified.

## Common request fields

| Field | Type | Used by | Notes |
| --- | --- | --- | --- |
| `from` | integer slot | All exporter endpoints | Start of the inclusive slot range. Must be less than or equal to `to`. |
| `to` | integer slot | All exporter endpoints | End of the inclusive slot range. |
| `roles` | role string or list of role strings | Validator traces and decideds | Required for validator traces and decideds. Not supported by committee trace requests. |
| `pubkeys` | validator public key hex string or list | Validator traces and decideds | Optional validator filter. Each validator public key is 48 bytes, represented as 96 hex characters. |
| `indices` | validator index or list of indices | Validator traces and archive-mode decideds | Optional validator index filter. For `/v1/exporter/decideds`, this filter applies only in archive mode; standard mode ignores it. Can be combined with `pubkeys`; resolved indices are deduplicated where supported. |
| `committeeids` / `committeeIDs` | committee ID hex string or list | Committee traces | Optional committee filter. Use `committeeids` for `GET` query parameters and `committeeIDs` for `POST` JSON bodies. Each committee ID is 32 bytes, represented as 64 hex characters. |

Supported role values are:

- `ATTESTER`
- `AGGREGATOR`
- `PROPOSER`
- `SYNC_COMMITTEE`
- `SYNC_COMMITTEE_CONTRIBUTION`

For `GET` requests, role query values are parsed from comma-separated strings. For `POST` requests, send roles as a JSON string array.

### Hex field length validation

Exporter handlers validate hex identifier lengths before running the query:

- Validator public keys must decode to 48 bytes, or 96 hex characters.
- Committee IDs must decode to 32 bytes, or 64 hex characters.

Invalid lengths return `400 Bad Request`.

For committee trace requests, length validation applies to bound committee ID values. POST JSON `committeeIDs` values are validated, and GET `committeeids` values are validated. GET `committeeIDs` is not bound in the current implementation and therefore does not trigger committee ID length validation.

## Endpoints

### `GET|POST /v1/exporter/traces/validator`

Returns archive-mode validator duty traces for the requested slot range, roles, and optional validator filters.

**Availability:** archive mode only.

**Request fields**

| Field | Notes |
| --- | --- |
| `from` | Inclusive start slot. |
| `to` | Inclusive end slot. |
| `roles` | Required. One or more supported roles. |
| `pubkeys` | Optional validator public key filters. Each key must be 96 hex characters. |
| `indices` | Optional validator index filters. |

When querying committee-duty roles through the validator trace endpoint, such as `ATTESTER` or `SYNC_COMMITTEE`, provide `pubkeys` or `indices`. If you need committee-wide trace data without validator filters, use `/v1/exporter/traces/committee`.

**Response**

The response includes:

- `data`: validator trace entries, including slot, role, validator index, optional committee ID, consensus rounds, decided messages, pre-consensus partial signatures, post-consensus partial signatures, and optional proposal data.
- `schedule`: best-effort schedule entries for the requested validators and roles.
- `errors`: optional partial errors returned with successful partial responses.

Trace data is based on messages observed by the exporter. Schedule data is a separate best-effort read model of expected duties.

### `GET|POST /v1/exporter/traces/committee`

Returns archive-mode committee duty traces for the requested slot range and optional committee ID filters.

**Availability:** archive mode only.

**Request fields**

| Field | Notes |
| --- | --- |
| `from` | Inclusive start slot. |
| `to` | Inclusive end slot. |
| `committeeids` / `committeeIDs` | Optional committee ID filters. Use `committeeids` for `GET` query parameters and `committeeIDs` for `POST` JSON bodies. Each ID must be 64 hex characters. |

Committee trace requests do **not** support a `roles` filter. If a `roles` field appears in older examples or client code, do not rely on it for committee trace filtering.

**GET example**

```bash
curl -G http://127.0.0.1:16000/v1/exporter/traces/committee \
  --data-urlencode 'from=<start-slot>' \
  --data-urlencode 'to=<end-slot>' \
  --data-urlencode 'committeeids=<64-char-committee-id-hex>'
```

**POST example**

```bash
curl -X POST http://127.0.0.1:16000/v1/exporter/traces/committee \
  -H 'Content-Type: application/json' \
  -d '{
    "from": <start-slot>,
    "to": <end-slot>,
    "committeeIDs": ["<64-char-committee-id-hex>"]
  }'
```

**Response**

The response includes:

- `data`: committee trace entries, including slot, committee ID, consensus rounds, decided messages, sync committee signer data, attester signer data, and optional proposal data.
- `schedule`: best-effort committee schedule entries grouped by role and validator index.
- `errors`: optional partial errors returned with successful partial responses.

Committee trace data depends on the exporter observing and classifying committee messages. Missing committee traces do not prove that no committee duty existed.

### `GET|POST /v1/exporter/decideds`

Returns decided participation data for the requested slot range, roles, and optional validator filters.

**Availability:** standard mode and archive mode.

**Request fields**

| Field | Notes |
| --- | --- |
| `from` | Inclusive start slot. |
| `to` | Inclusive end slot. |
| `roles` | Required. One or more supported roles. |
| `pubkeys` | Optional validator public key filters. Each key must be 96 hex characters. |
| `indices` | Optional validator index filters in archive mode only. Ignored by the standard-mode decided backend. |

**Runtime caveat**

This route uses different implementations depending on exporter mode:

- In **archive mode**, the endpoint is trace-derived, applies `indices` and `pubkeys` filters, and can return partial `200 OK` responses with `errors[]`.
- In **standard mode**, the endpoint reads the standard-mode decided backend. It filters by `roles` and `pubkeys`; it does not read `indices`. If no `pubkeys` are supplied, it can return all participants in the slot range for the selected roles. The standard-mode response type has the same top-level fields, but current conversion does not populate `errors[]` in the same way as archive trace queries.

**Response**

The response includes:

- `data`: decided participant entries with role, slot, validator public key, and signer information.
- `errors`: optional partial errors where supported by the active backend.

Archive decided results are derived from trace storage. Standard decided results are derived from the standard-mode decided backend.

## Errors

Exporter endpoints return JSON responses. Error handling differs slightly by endpoint and mode, but clients should handle these common cases:

| Status | Meaning |
| --- | --- |
| `200 OK` | Query completed. The response may still include an `errors` array when partial data was returned. |
| `400 Bad Request` | Request binding or validation failed, such as invalid JSON, `from` greater than `to`, missing required roles, or invalid hex identifier length on a bound field. |
| `500 Internal Server Error` | The query produced no data and encountered a meaningful backend error, or a non-validation backend error could not be returned as a partial success. |

Not-found results are suppressed by archive trace queries: if the exporter does not find data for a requested slot, role, validator, or committee, that not-found condition is not returned in `errors[]` and is not treated as a server error by itself. A query that only misses data can return `200 OK` with empty `data`.

When partial data is available and non-not-found errors also occur, archive trace endpoints can return `200 OK` with the successful data and an `errors` array. Treat `errors[]` as part of the result, especially for wider slot ranges or mixed filters.

Empty decided entries with no signers may be omitted from archive decided responses without an API error.

## Schema and source caveats

This page intentionally does not reproduce the full generated OpenAPI schema. The exporter models include nested trace objects, consensus rounds, decided messages, proposal traces, and signer data, and some runtime behavior is not fully represented by the generated schema.

Known caveats:

- The generated OpenAPI documents all exporter paths, but it does not document that `/v1/exporter/decideds` switches implementation between standard mode and archive mode.
- Committee trace requests have no `roles` field in the handler model or generated OpenAPI.
- The committee ID field is `committeeIDs` in POST JSON, but the current GET query parameter is `committeeids`.
- Some numeric Ethereum consensus types may appear differently between generated schema annotations and actual JSON encoding.
- Trace and schedule data are best-effort. Empty responses can mean the exporter did not observe, classify, persist, or match the requested data.

For practical client behavior, rely on the endpoint descriptions above, handle partial `200 OK` responses with `errors[]`, and keep queries narrowly scoped.
