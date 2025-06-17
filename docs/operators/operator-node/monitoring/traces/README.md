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

## Best Practices

- Ensure that wherever you are sending traces, is reachable from the SSV node.
- Use a compatible backend, such as [Tempo](https://grafana.com/docs/tempo/latest/) to ingest traces and [Alloy](https://grafana.com/docs/alloy/latest/) to collect them and add any necessary metadata. You can also send traces directly to a compatible backend without the need for an intermediary OTel Collector / Alloy agent.
- Combine traces with metrics for a complete observability solution.
- OpenTelemetry is a standard, so you can use any compatible tool or vendor of your choice.

## Further Reading

- [OpenTelemetry Traces Documentation](https://opentelemetry.io/docs/concepts/signals/traces/)
- [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/)
- [SSV Node Configuration Reference](../../node-setup/README.md)
