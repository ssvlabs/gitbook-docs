---
title: Final Steps
sidebar_position: 3
---

# Final Steps

## Open port 3030❗
**Make sure to expose the port you set on your machine's firewall** (and Docker container creation command, if running on Docker). The default is **3030**.

**Otherwise**, your DKG node will not be available for stakers, as a result you will get less validators. 

## Update Operator Metadata

:::warning
To participate in DKG ceremonies without coordination and to enable others to initiate ceremonies with you via your provided endpoint, it's crucial to update your operator metadata with the correct information.
:::

Once the DKG tool is up and running, please make sure to update your operator metadata, and provide your DKG Operator endpoint, in the form of `protocol:ip:port` (if you have a domain name, instead of an `ip` that works as well).

Please head over to [the Operator User guide on how to update metadata](../../../operator-management/setting-operator-metadata.md) and follow the instructions

## Test the setup

You can test out if your DKG node is correctly setup, with these simple steps:

* fetch operator metadata from [SSV-API](https://api.ssv.network/documentation/#/v4) (e.g. `https://api.ssv.network/api/v4/<hoodi | holesky | mainnet>/operators/<OPERATOR_ID>` choosing the right network and substituting your operator ID) and get `dkg_address` from the output
* run the command:`docker run --rm "ssvlabs/ssv-dkg:latest" ping --ip <DKG_ADDRESS>` where `<DKG_ADDRESS>` is the address used in the previous step

It should tell you if the operator is online and is updated to the latest version.
