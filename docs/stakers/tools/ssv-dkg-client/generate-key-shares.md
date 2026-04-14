---
sidebar_label: 'Generate Key Shares'
sidebar_position: 4
---

# Generate Key Shares

:::warning
Use the latest `ssv-dkg` release. Version `v3.0.0` introduced major changes, fixes, and breaking updates.
:::

Use this page when you want to start a new DKG ceremony and generate validator key shares.

## Before you begin

Make sure you already have:
- the selected operator IDs and operator information file
- the required command or YAML configuration details from [Commands and Config](/stakers/tools/ssv-dkg-client/commands-and-config)
- a machine with Docker installed, if you plan to use the Docker flow

If you have not prepared the operator information yet, go back to [Operators Data](operators-data).

## Run the `init` command

To start a DKG ceremony, use the `init` command. Example with Docker:

```bash
docker run --rm -v <PATH_TO_FOLDER_WITH_CONFIG_FILES>:/ssv-dkg/data/ \
    -it "ssvlabs/ssv-dkg:latest" init --configPath ./data/config/config.yaml
```

:::info
Running the tool as a Docker image is usually the simplest option and only requires Docker.
:::

## Example YAML configuration

```yaml
validators: 10
operatorIDs: [1, 2, 3, 4]
withdrawAddress: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
owner: 0xaA184b86B4cdb747F4A3BF6e6FCd5e27c1d92c5a
nonce: 0
tlsInsecure: true 
network: "hoodi"
operatorsInfoPath: /data/initiator/operators_info.json
```

For more detail:
- see [Commands and Config](/stakers/tools/ssv-dkg-client/commands-and-config) for YAML configuration and the `--configPath` flag
- see the same page for the binary flow if you do not want to use Docker
- see the same page for the full list of command-line flags

## Output and next step

After a successful ceremony, the tool writes a `ceremony-...` output folder with deposit data, key shares, and proof files.

Review [Ceremony Output Summary](ceremony-output-summary) to understand those artifacts before you continue.
