# Monitoring

This page will outline how to monitor an SSV Node using Grafana and Prometheus.

### Pre-requisites

Make sure your node is exposing a `/metrics` and `/health` endpoints. This is done via node configuration, as explained in the [Installation guide](../installation.md#metrics-configuration-optional).

This guide will not go into the details of setting up and running Prometheus or Grafana. For this, we recommend visiting their related documentations:

[Prometheus docs](https://prometheus.io/docs/introduction/overview/)

[Grafana docs](https://grafana.com/docs/)

For Grafana, specifically, [Grafana Cloud](https://grafana.com/docs/grafana-cloud/) is a viable solution, especially for beginners.

### Prometheus

In a typical setup, where only one SSV node Docker container is running, Prometheus should be configured with a file like this:

{% code title="prometheus.yml" lineNumbers="true" %}
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
        # if running prometheus from source, or as executable:
        # - <container_name>:15000 (i.e.: ssv_node:15000, check with docker ps command)
        # if running prometheus as docker container:
        - host.docker.internal:15000
  - job_name: ssv_health
    metrics_path: /health
    static_configs:
      - targets:
        # change the targets according to your setup
        # if running prometheus from source, or as executable:
        # - <container_name>:15000 (i.e.: ssv_node:15000, check with docker ps command)
        # if running prometheus as docker container:
        - host.docker.internal:15000

```
{% endcode %}

And to launch the Prometheus service as a Docker container as well ([using the official Docker image, as shown here](https://hub.docker.com/r/prom/prometheus)), use this command, where `/path/to/prometheus.yml` is the path and filename of the configuration file itself:

```bash
docker run \
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

{% hint style="info" %}
If you are not running Prometheus as a Docker container, but as an executable, change the \`targets\` in the config file to reflect the correct networking connections. In the case where the SSV Node container is called `ssv_node` the targets should look like this:

```yaml
      - targets:
        - ssv_node:15000
```

Use the `docker ps` command to verify the name of the SSV Node container.
{% endhint %}

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
