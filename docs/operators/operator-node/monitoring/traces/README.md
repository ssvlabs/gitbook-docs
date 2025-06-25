---
title: Traces
sidebar_position: 4
---

# Traces

SSV Node implements the [OpenTelemetry](https://opentelemetry.io/) specification for traces, enabling distributed tracing for advanced observability and troubleshooting.

Traces provide insight into the flow of requests and operations within the node, helping operators diagnose performance bottlenecks and understand system behavior across services.

## OpenTelemetry Support

SSV Node supports all standard OpenTelemetry (OTel) environment variables for traces, as well as an SSV Node–specific variable to enable or disable tracing.

- **OTEL_EXPORTER_OTLP_TRACES_ENDPOINT** ([docs](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/#otel_exporter_otlp_traces_endpoint)) — **Required** when traces are enabled. Specifies the endpoint to which traces are exported.
- **OTEL_EXPORTER_OTLP_TRACES_PROTOCOL** ([docs](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/#otel_exporter_otlp_traces_protocol)) — Optional. Set if you need to specify the protocol (`http` or `grpc`).
- For a complete list of supported environment variables, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs).

## Enabling Traces

Traces are disabled by default. To enable them:

- **Environment variable:** `ENABLE_TRACES`
- **YAML config:** `EnableTraces`
- **Type:** `boolean`
- **Default:** `false`

### Example configuration

```bash
ENABLE_TRACES=true
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://alloy.observability.svc:4317
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc
```

## Resource in OpenTelemetry

Each span contains a resource — a set of key-value attributes. A resource is an object, which contains metadata about the entity that emitted the telemetry — for example: `service.name`, `deployment.environment`, `region`, etc. _Resources are queryable via TraceQL_.

The SSV Node sets multiple resource attributes such as `host.name`, `service.name`, and `service.version` via the OpenTelemetry SDKs. These values can also be overridden via native OpenTelemetry environment variables ([OpenTelemetry SDK Environment Variables](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/)).

For example, `service.name` by default is set to `SSV-Node`. If additional context is needed, it can be overridden via the `OTEL_SERVICE_NAME` environment variable, e.g.:

```bash
OTEL_SERVICE_NAME=ssv-node-prod-mainnet-01
```
This allows constructing more precise TraceQL queries.


## TraceQL

Below is a list of useful attributes to help troubleshoot issues related to duty execution:

- `ssv.beacon.slot`
- `ssv.beacon.epoch`
- `ssv.runner.role` (_COMMITTEE_RUNNER_, _AGGREGATOR_RUNNER_, _PROPOSER_RUNNER_, _SYNC_COMMITTEE_CONTRIBUTION_RUNNER_, _VALIDATOR_REGISTRATION_RUNNER_, _VOLUNTARY_EXIT_RUNNER_)
- `ssv.beacon.role` (_ATTESTER_, _AGGREGATOR_, _PROPOSER_, _SYNC_COMMITTEE_, _SYNC_COMMITTEE_CONTRIBUTION_, _VALIDATOR_REGISTRATION_, _VOLUNTARY_EXIT_)
- `ssv.validator.duty.id`  
  - (committee example)`COMMITTEE_1_2_3_4-e20897-s668706`  
    (Operators: 1,2,3,4 — Epoch: 20897 — Slot: 668706)  
  - (validator example)`VALIDATOR_REGISTRATION-e20888-s668436-v843156`  
    (Epoch: 20888 — Slot: 668436 — Validator Index: 843156)

### Queries

- **Fetch all traces for a specific Duty ID:**

  ```
  { resource.service.name = "SSV-Node" && span.ssv.validator.duty.id = "COMMITTEE-9_10_11_12-e20932-s669825" }
  ```

- **Fetch all traces that took longer than 30 seconds:**
  ```
  { resource.service.name = "SSV-Node" && trace:duration > 30s }
  ```

- **Fetch all Attester duties that took longer than 5 seconds:**
  ```
  { resource.service.name = “SSV-Node” && span:name = “ssv.validator.execute_committee_duty” && trace:duration > 5s }
  ```

- **Fetch all traces related to a specific Beacon slot:**
  ```
  { resource.service.name = “SSV-Node” && span.ssv.beacon.slot = 171903 }
  ```

- **Fetch traces for a specific slot where the runner performs Attester duties and successfully submitted attestations for a specific validator:**
  ```
  { resource.service.name = “SSV-Node” && span.ssv.beacon.slot = 669122 && span.ssv.runner.role = “COMMITTEE_RUNNER” }
  && { event:name = “✅ successfully submitted attestations” }
  && { event.ssv.validator.index = 843162 }
  ```

- **Fetch traces for a specific slot for the Proposer role where block proposals were successfully submitted:**
  ```
  { resource.service.name = “SSV-Node” && span.ssv.beacon.role = “PROPOSER” && span.ssv.beacon.slot=668720 }
  && { event:name = “✅ successfully submitted block proposal” }
  ```
  
- **Fetch traces for a specific slot indicating that Attester duties were fetched from the Beacon Node for a specific validator index:**
  ```
  { resource.service.name = “SSV-Node” && span:name = “ssv.duty.attester.fetch_and_store” && span.ssv.beacon.slot = 669328 && event.ssv.validator.index = 843871 }
  ```

- **Fetch traces for a specific epoch indicating that Proposer duties were fetched from the Beacon Node for a specific validator index:**
  ```
  { resource.service.name = “SSV-Node” && span:name = “ssv.duty.proposer.fetch_and_store” && span.ssv.beacon.epoch = 20929 && event.ssv.validator.index = 843871 }
  ```

## Best Practices

- Ensure that wherever you are sending traces, is reachable from the SSV node.
- Use a compatible backend, such as [Tempo](https://grafana.com/docs/tempo/latest/) to ingest traces and [Alloy](https://grafana.com/docs/alloy/latest/) to collect them and add any necessary metadata. You can also send traces directly to a compatible backend without the need for an intermediary OTel Collector / Alloy agent.
- Combine traces with metrics for a complete observability solution.
- OpenTelemetry is a standard, so you can use any compatible tool or vendor of your choice.

## Further Reading

- [OpenTelemetry Traces Documentation](https://opentelemetry.io/docs/concepts/signals/traces/)
- [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/)
- [SSV Node Configuration Reference](../../node-setup/README.md)
