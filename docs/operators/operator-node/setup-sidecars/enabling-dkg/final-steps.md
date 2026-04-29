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

1. **Fetch your Operator metadata** from the [SSV API](https://api.ssv.network/documentation/#/v4) and review the published DKG fields in the response. Edit and use the URL below:

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

2. **Create an operators info JSON file** with your published DKG metadata.

<InlineEditableCodeBlock
  language="json"
  template={
  `
  [
    {
      "id": {{ID}},
      "public_key": "{{RSA_PUBLIC_KEY}}",
      "ip": "{{DKG_ADDRESS}}"
    }
  ]
  `
  }
  variables={{
    ID: '123',
    RSA_PUBLIC_KEY: 'LS0tL...',
    DKG_ADDRESS: 'https://1.2.3.4:3030',
  }}
/>

3. **Run `ping` with your operators info file**. Mount the folder that contains the file and point `--operatorsInfoPath` to it:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
  docker run --rm -v {{FOLDER_PATH}}:/ssv-dkg/data/ \  
    "ssvlabs/ssv-dkg:latest" ping \  
    --operatorsInfoPath {{OPERATOR_INFO}}
  `
  }
  variables={{
    FOLDER_PATH: '${PWD}',
    OPERATOR_INFO: './data/operators_info.json',
  }}
/>
