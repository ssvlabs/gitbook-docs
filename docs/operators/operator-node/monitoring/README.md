---
title: Monitoring
sidebar_position: 3
---

## Introduction

This section explains how to monitor an SSV Node.

SSV Node exposes [OpenTelemetry](https://opentelemetry.io/) metrics, with [Prometheus](https://prometheus.io/) as the default exporter. You can use [Grafana](https://grafana.com/docs/) to explore dashboards. We recommend separate monitoring for your Execution and Beacon nodes so you have full visibility across the stack.

This section is intended as a practical starting point for self-service diagnosis.

## Requirements

The provided dashboards use the `pod` label to template panels. This is useful when you run more than one SSV Node because it lets you view metrics for each node separately.

The example below shows a Prometheus configuration that scrapes metrics from your SSV Node. Prometheus does not add a `pod` label by default, so you need to add it yourself. Prometheus does add an `instance` label by default.

The example includes two commented options for setting `pod`:

```yaml
global:
  scrape_interval:     10s
  evaluation_interval: 10s

scrape_configs:
  - job_name: ssv
    metrics_path: /metrics
    static_configs:
      - targets:
          - "localhost:15000"
    relabel_configs:
      ## Two options to choose from:
      ## 1. If you want a static name, perhaps because you are running
      ## multiple instances of ssv-node, or want to set a specific name, uncomment these:
      # - target_label: pod
      #   replacement: ssv-node-1

      ## 2. This will use the host specified in the targets list by uncommenting the following lines
      # - source_labels: [__address__]
      #   target_label: pod
```

## Monitoring Setup

There are several ways to set up monitoring for SSV Node. The most common options are below.

### Running the sample repository

The easiest option is to use the sample repository. It is based on Docker Compose and sets up SSV Node, Prometheus, and Grafana for you. Follow the [Node Installation Guide](/operators/operator-node/node-setup/) and see the [repository README](https://github.com/ssvlabs/ssv-stack/blob/main) for additional details.

After the stack is running, open Grafana at [http://localhost:3000](http://localhost:3000/).

If Grafana is running on a remote server, expose **3000 TCP** and open `http://<your-public-ip>:3000` in your browser.

Sign in with `admin` / `admin`. You can change the password later. In **Dashboards**, look for the `SSV Operational` dashboard. If the node is not yet registered on SSV Network or is not managing validators, some panels may be empty.

### Using an existing monitoring stack

If you already run Prometheus and Grafana, the setup is straightforward. Make sure Prometheus scrapes metrics from your SSV Node on `MetricsAPIPort` (`15000` by default in the node configuration).

The dashboards expect a `pod` label. If you are not running on Kubernetes, adjust the queries or relabeling to match the labels in your environment.

### Kubernetes

If you run SSV Node on Kubernetes, make sure Prometheus scrapes metrics from it. A common option is [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack).

Because Kubernetes is dynamic, a `ServiceMonitor` or `PodMonitor` is usually the best way to scrape metrics. `kube-prometheus-stack` adds the `pod` label by default, so the dashboards should work without extra changes.

See the [Prometheus Operator documentation](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/api) for details.

## Using Dashboard

If you run your own Grafana instance, Grafana is usually available on port `3000`, for example `http://1.2.3.4:3000`. In that case, expose **3000 TCP** so you can reach the dashboard.

Alternatively, you can use [Grafana Cloud](https://grafana.com/products/cloud/) and connect it to your Prometheus instance. In that case, expose **9090 TCP** so Grafana Cloud can reach Prometheus.

### Download Dashboard

Download the `.json` dashboard file from the top of the [Dashboard Runbook](dashboard-runbook).

### Metrics Index

All dashboard metrics are documented on the [Metrics Index page](metrics-index).

## Quick note on Prometheus and Grafana

### Interpreting Rates

Some panels in the default dashboard can look confusing at first. For example, why does a peer count show `34.7` instead of a whole number?

This usually comes from the Prometheus `rate()` function. `rate()` calculates how quickly a metric changes over a time interval and reports that value per second.

For example, `rate(ssv_network_peers_connected[1m])` calculates the peer connection rate over the last minute and displays it as a per-second value. We sometimes multiply that by 60 to show a per-minute rate. That is why some panels display decimals for values that are otherwise whole numbers.

### Calculating Rates

Rates are useful, but they require a time interval. Rather than hardcoding intervals in dashboards, we use `__rate_interval` across the dashboards. See [Grafana's post](https://grafana.com/blog/2020/09/28/new-in-grafana-7.2-__rate_interval-for-prometheus-rate-queries-that-just-work/) for background.

This means your Grafana Prometheus data source should match Prometheus's scrape interval. You can change this in the Grafana UI under the Prometheus data source settings and `Interval behaviour`. If those values do not match, rate calculations may be wrong and dashboards may display incorrectly.

The default Prometheus scrape interval is 1 minute, while the default Prometheus data source interval in Grafana is 15 seconds.

## Alerts

[Here are some example alerts](https://github.com/ssvlabs/ssv-stack/blob/main/prometheus/alert-rules.yml). Use them as a starting point only. Actual alerts should reflect your own infrastructure.

In general, define alerts from top to bottom:

- Infrastructure level: CPU, RAM, I/O, uptime
- Ethereum clients
- SSV client

## Traces

SSV Node supports distributed tracing through OpenTelemetry. Traces provide deeper visibility into node operations and can help diagnose performance issues. See the [Traces guide](./traces) for setup and configuration details.
