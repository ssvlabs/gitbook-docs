---
title: Final Steps
sidebar_position: 3
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Final Steps

## Open port 3030❗
**Expose the port you configured on the machine firewall** and in the Docker container command if you use Docker. The default is **3030**.

Otherwise, your DKG node will not be available to Stakers and you may receive fewer validators.

## Update Operator Metadata

:::warning Update Metadata
If you do not set an externally available DKG endpoint in the metadata, **you will not participate in DKG ceremonies**.
:::

Once the DKG tool is running, update your Operator metadata and provide the DKG endpoint in the form `protocol:ip:port` (a domain name also works).

See [Setting Operator Metadata](/operators/operator-management/setting-operator-metadata) for instructions.

## Test the setup

Use these steps to test that your DKG node is set up correctly:

1. **Fetch Operator metadata** from [SSV API](https://api.ssv.network/documentation/#/v4) and get `dkg_address` from the response. Edit and use the URL below:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
https://api.ssv.network/api/v4/{{NETWORK}}/operators/{{OPERATOR_ID}}
  `
  }
  variables={{
    NETWORK: 'mainnet or hoodi',
    OPERATOR_ID: 'Operator ID'
  }}
/>
2. **Check DKG Node status**. Use the `dkg_address` from the previous step. The response should show whether the Operator is online and running the latest version. Edit the command below and run it:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
docker run --rm "ssvlabs/ssv-dkg:latest" ping --ip {{DKG_ADDRESS}}
  `
  }
  variables={{
    DKG_ADDRESS: 'dkg_address'
  }}
/>
