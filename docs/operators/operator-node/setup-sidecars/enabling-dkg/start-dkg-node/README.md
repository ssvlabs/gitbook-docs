---
title: Start DKG Node
sidebar_position: 2
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start DKG Node

We recommend running the tool with `docker compose`. It is the simplest option and only requires Docker. A Docker image is published with every release.

## SSV Stack
If you chose to set up your SSV Node with the [SSV Stack repository](/operators/operator-node/node-setup/#install-ssv-node-stack),
you can start the DKG node in three steps:
1. Edit configuration file `./dkg-data/operator.yaml`
    - `operatorID` - the ID of your operator
    - `ethEndpointURL` - HTTP Address of your Execution node endpoint


2. Run the command `docker compose --profile dkg up -d`


      - Make sure you're running from `ssv-stack` directory
3. Go to [**Final Steps**](/operators/operator-node/setup-sidecars/enabling-dkg/final-steps)

## Manual Configuration

All of the necessary configuration information can be provided via command line parameters, but a YAML config file is often the most convenient way, thus it's what this documentation page will be discussing.

A simple approach is to keep all required files in one folder, for example `ssv-dkg-data`, together with `operator.yaml`.

The final result should look like so:

```bash
ssv@localhost:~/# tree ssv-dkg-data
ssv-dkg-data
├── encrypted_private_key.json
├── operator.yaml
└── password

1 directories, 3 files
```

An example `operator.yaml` file is shown below. Update the highlighted values before you use it:

<InlineEditableCodeBlock
  language="yaml"
  template={
  `
  privKey: ./data/encrypted_private_key.json
  privKeyPassword: ./data/password
  operatorID: {{YOUR_OPERATOR_ID}}
  port: 3030
  logLevel: info
  logFormat: json
  logLevelFormat: capitalColor
  logFilePath: ./data/debug.log
  outputPath: ./data/output
  ethEndpointURL: {{ethEndpointURL}} #HTTP Address of Execution Node, needed for Multisig validator owner addresses
  # serverTLSCertPath: ./data/ssl/tls.crt #Only enable if manually generated TLS certificate
  # serverTLSKeyPath: ./data/ssl/tls.key #Only enable if manually generated TLS key
  `
  }
  variables={{
    YOUR_OPERATOR_ID: 'YOUR_OPERATOR_ID',
    ethEndpointURL: 'http://ethnodeURL:8545'
  }}
/>

:::info
In the config above, `./data/` refers to the container's shared volume created by Docker through `-v` or `volumes`. **You do not need to create the `data` directory yourself.**
:::

## Start SSV-DKG Node

<Tabs>
<TabItem value="docker-compose" label="docker compose">
To start and manage the DKG tool, we recommend `docker compose`.

This section assumes that all the necessary files (`encrypted_private_key.json`, `operator.yaml`, `password`) are under the same folder. Edit the highlighted value with the actual path:

<InlineEditableCodeBlock
  language="yaml"
  template={
  `
  services:
    ssv-dkg:
      image: ssvlabs/ssv-dkg:latest
      pull_policy: always
      restart: "unless-stopped"
      container_name: ssv-dkg
      volumes:
        - {{PATH_TO_FOLDER_WITH_CONFIG_FILE}}:/ssv-dkg/data
      ports:
        - 3030:3030/tcp
      command:
        ["start-operator", "--configPath", "./data/operator.yaml"]
      networks:
        - [local-docker]
  `
  }
  variables={{
    PATH_TO_FOLDER_WITH_CONFIG_FILE: './folder_with_config_file'
  }}
/>

You can, of course, change the configuration above to one that suits you better, just be mindful about changing the path references in the docker command **and** in the `operator.yaml` file as well. The two need to be consistent with each other.

To launch the container, run:

```bash
docker compose up
```
- This keeps the terminal attached so you can review logs during startup.
- If everything looks good, use `docker compose up -d`.
</TabItem>

<TabItem value="docker-run" label="docker run">
If all required files (`encrypted_private_key.json`, `operator.yaml`, `password`) are in the same folder, replace the path below with the real one:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
  docker run --restart unless-stopped --name ssv-dkg -p 3030:3030 -v {{PATH_TO_FOLDER_WITH_CONFIG_FILE}}:/ssv-dkg/data -it "ssvlabs/ssv-dkg:latest" start-operator --configPath ./data/operator.yaml
  `
  }
  variables={{
    PATH_TO_FOLDER_WITH_CONFIG_FILE: './path_to_config_file'
  }}
/>

You can, of course, change the configuration above to one that suits you better, just be mindful about changing the path references in the docker command **and** in the `operator.yaml` file as well. The two need to be consistent with each other.

This keeps the terminal attached so you can review logs during startup.

If everything looks good, add `-d` right after `docker run`.
</TabItem>

<TabItem value="build-source" label="Build from source">
A prerequisite for this is to have `go` version 1.22 installed on the system, and an optional requirement is to have the `make` tool installed as well (alternatively you could run the corresponding command defined in the `Makefile`).

#### Clone repository

Clone the `ssv-dkg` repository in your local machine:

```bash
git clone git@github.com:ssvlabs/ssv-dkg.git
```

#### Build

From the project's root folder, run the following command:

```bash
make install
```

#### SSL certificate

Running the DKG tool as a Docker container automatically creates and manages the TLS certificate. If you build from source, you need to do this yourself.

But don't worry, the [`entry-point.sh`](https://github.com/ssvlabs/ssv-dkg/blob/main/entry-point.sh) script in the repository is what is used by the Docker container, you could use that as an example for how to create an SSL certificate for your DKG node. For example:

```bash
mkdir ssl
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout "tls.key" -out "tls.crt" -subj "/C=CN/ST=GD/L=SZ/O=localhost, Inc./CN=localhost"
```

#### Launch with command line parameters

To run the DKG tool as an operator, you can launch the following command with the appropriate values to each parameter:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
  ssv-dkg start-operator \ 
          --privKey ./operator-config/encrypted_private_key.json  \ 
          --privKeyPassword ./operator-config/password \ 
          --operatorID {{YOUR_OPERATOR_ID}} \ 
          --port 3030 \  
          --logLevel info \ 
          --logFormat json \ 
          --logLevelFormat capitalColor \ 
          --logFilePath ./operator-config/debug.log \ 
          --outputPath ./operator-config/output \ 
          --serverTLSCertPath ./operator-config/ssl/tls.crt \ 
          --serverTLSKeyPath ./operator-config/ssl/tls.key \ 
          --ethEndpointURL {{ethEndpointURL}}
  `
  }
  variables={{
    YOUR_OPERATOR_ID: 'YOUR_OPERATOR_ID',
    ethEndpointURL: 'http://ethnodeURL:8545'
  }}
/>

Parameter reference:

<table><thead><tr><th width="307">Argument</th><th width="144.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--privKey</code></td><td>string</td><td>Path to private key of ssv operator</td></tr><tr><td><code>--port</code></td><td>int</td><td>Port for listening messages (default: <code>3030</code>)</td></tr><tr><td><code>--privKeyPassword</code></td><td>string</td><td>Path to password file to decrypt the key</td></tr><tr><td><code>--operatorID</code></td><td>int</td><td>An integer, representing the ID of the operator, registered on the SSV network</td></tr><tr><td><code>--logLevel</code></td><td>debug | info | warning | error | critical</td><td>Logger's log level (default: <code>debug</code>)</td></tr><tr><td><code>--logFormat</code></td><td>json | console</td><td>Logger's encoding (default: <code>json</code>)</td></tr><tr><td><code>--logLevelFormat</code></td><td>capitalColor | capital | lowercase</td><td>Logger's level format (default: <code>capitalColor</code>)</td></tr><tr><td><code>--logFilePath</code></td><td>string</td><td>Path to file where logs should be written (default: <code>./data/debug.log</code>)</td></tr><tr><td><code>--outputPath</code></td><td>string</td><td>Path to store results (default <code>./output</code>)</td></tr><tr><td><code>--serverTLSCertPath</code></td><td>string</td><td>Path to server TLS certificate (default: <code>./ssl/tls.crt</code>)</td></tr><tr><td><code>--serverTLSKeyPath</code></td><td>string</td><td>Path to server TLS private key (default: <code>./ssl/tls.key</code>)</td></tr><tr><td><code>--ethEndpointURL</code></td><td>string</td><td>Ethereum node endpoint URL (default: <code>http://127.0.0.1:8545</code>)</td></tr></tbody></table>

#### Launch with YAML config file

It is also possible to use YAML configuration file, just as it was shown in the [Configuration section above](#manual-configuration).

Then the tool can be launched from the root folder, by running this command:

```sh
ssv-dkg start-operator --configPath ./operator-config/operator.yaml
```

If the `--configPath` parameter is not provided, `ssv-dkg` will be looking for a file named `config.yaml` in `./config/` folder at the same root as the binary (i.e. `./config/config.yaml`)
</TabItem>
</Tabs>

## What's next?
Once you finish this page, go to [**Final Steps**](/operators/operator-node/setup-sidecars/enabling-dkg/final-steps).
