# Monitoring

This page will outline how to monitor an SSV Node using Grafana and Prometheus.

### Pre-requisites

Make sure your node is exposing a `/metrics` and `/health` endpoints. This is done via node configuration, as explained in the [Installation guide](../installation.md#metrics-configuration-optional).

This guide will not go into the details of setting up and running Prometheus or Grafana. For this, we recommend visiting their related documentations:

[Prometheus docs](https://prometheus.io/docs/introduction/overview/)

[Grafana docs](https://grafana.com/docs/)

For Grafana, specifically, [Grafana Cloud](https://grafana.com/docs/grafana-cloud/) is a viable solution, especially for beginners.

### Prometheus

In a sample configuration, where only one SSV node Docker container is running, named `ssv-node`:

```bash
ssv@ssv-node:~|⇒ docker ps
CONTAINER ID   IMAGE                                  COMMAND                  CREATED       STATUS          PORTS                                                                                                        NAMES
b91c93801c40   bloxstaking/ssv-node-unstable:latest   "make BUILD_PATH=/go…"   2 weeks ago   Up 51 minutes   5000/tcp, 0.0.0.0:13001->13001/tcp, 4000/udp, 5678/tcp, 0.0.0.0:12001->12001/udp, 0.0.0.0:15000->15000/tcp   ssv_node
```

Then the config file template above should become:

```yaml
global:
  scrape_interval:     10s
  evaluation_interval: 10s

scrape_configs:
  - job_name: ssv
    metrics_path: /metrics
    static_configs:
      - targets:
        # change the targets according to your setup
        # - <container_name>:<metrics_port>
        - ssv-node:15000
  - job_name: ssv_health
    metrics_path: /health
    static_configs:
      - targets:
        - ssv-node:15000
```

And to launch the Prometheus service as a Docker container as well ([using the official Docker image, as shown here](https://hub.docker.com/r/prom/prometheus)), use this command, where `/path/to/prometheus.yml` is the path and filename of the configuration file itself:

```bash
docker run \
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

### Grafana monitoring

After successfully configuring a Prometheus service, and [adding it as a data source to Grafana](https://grafana.com/docs/grafana/latest/datasources/prometheus/configure-prometheus-data-source/) (read [here for Grafana Cloud](https://grafana.com/docs/grafana-cloud/connect-externally-hosted/data-sources/prometheus/configure-prometheus-data-source/)), a Grafana dashboard can be created.

Below, an example of two dashboards, respectively monitoring the SSV Node and the performance of an Operator:

{% file src="../../../.gitbook/assets/node-dashboard.json" %}

{% file src="../../../.gitbook/assets/operator-performance.json" %}

{% hint style="warning" %}
It is very important **NOT** to use each JSON template "as is". They should be used as templates, and apply a few important changes to before importing them in Grafana:

* search for the `templating` section and edit the value options for the `instance` variable to reflect the Prometheus service configuration (the `targets` variables in the configuration file, which relate to, the node container names, for example)
* identify all of the `datasource` object instances in the file as shown below, and change the uuid to the one related to the Prometheus datasource added to Grafana.

```json
"datasource": {
  "type": "prometheus",
  "uid": "bffb3e8b-7fb7-44ce-bf8e-e6bb0d93c445"
},
```
{% endhint %}
