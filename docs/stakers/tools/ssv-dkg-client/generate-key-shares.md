---
sidebar_label: 'Generate Key Shares'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Generate Key Shares

## Prerequisites

- [**Operator Data**](operators-data): the selected operator IDs and a current operators info file with DKG metadata
- [**Command or Config**](commands-and-config): the required command or YAML configuration details
- [**Installation**](/stakers/tools/ssv-dkg-client#installation): a machine with Docker installed OR ssv-dkg built locally from source

Outdated or incomplete operator metadata can block ceremony startup. A stale endpoint, missing RSA public key, or mismatched DKG metadata can cause validation to fail before the ceremony begins.

### Check operator health

Run a healthcheck using the same operators info JSON file you plan to use for the ceremony:

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{CONFIG_FOLDER_PATH}}:/ssv-dkg/data/ \ 
  -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" ping \ 
  --operatorsInfoPath {{OPERATORS_INFO}}
`}
  variables={{
    CONFIG_FOLDER_PATH: '${PWD}',
    DKG_VERSION: 'latest',
    OPERATORS_INFO: './data/operators_info.json',
  }}
/>

If signed healthchecks fail, fix the operator metadata in your operators info file first. The ceremony will not start successfully with stale or mismatched operator identity data.

## Generate Key Shares

<Tabs>
<TabItem value="yaml" label="YAML configuration">

Use the [YAML configuration created on the previous step](commands-and-config). Edit the following command and run in your CLI:

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{CONFIG_FOLDER_PATH}}:/ssv-dkg/data/ \ 
    -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" init \ 
    --configPath {{CONFIG_PATH}}
`}
  variables={{
    CONFIG_FOLDER_PATH: '${PWD}',
    CONFIG_PATH: './data/config.yaml',
    DKG_VERSION: 'latest',
  }}
/>

</TabItem>

<TabItem value="flags" label="Command-line flags">

To start a DKG ceremony, run the `init` command below.

Example with `--compounding` enabled:

<InlineEditableCodeBlock
  language="bash"
  template={`
docker run --rm -v {{HOST_PATH}}:/ssv-dkg/data/ -it "ssvlabs/ssv-dkg:{{DKG_VERSION}}" init \ 
  --owner {{OWNER_ADDRESS}} \ 
  --nonce {{OWNER_NONCE}} \ 
  --withdrawAddress {{WITHDRAWAL_ADDRESS}} \ 
  --compounding \ 
  --operatorIDs {{OPERATOR_IDS_LIST}} \ 
  --operatorsInfoPath ./data/config/operators_info.json \ 
  --network {{NETWORK}} \ 
  --tlsInsecure \ 
  --validators {{VALIDATORS}} \ 
  --outputPath ./data/output
`}
  variables={{
    HOST_PATH: '${PWD}',
    DKG_VERSION: 'latest',
    OWNER_ADDRESS: '0x...',
    OWNER_NONCE: '0',
    WITHDRAWAL_ADDRESS: '0x...',
    OPERATOR_IDS_LIST: '[1,2,3,4]',
    VALIDATORS: '1',
    AMOUNT: '32000000000',
    NETWORK: 'hoodi',
  }}
/>

</TabItem>
</Tabs>

**If the ceremony does not start check out the [Troubleshooting Section](troubleshooting)**.
## Output and Next Steps

- With key shares generated, you can [Register your validators](/stakers/solo-stakers/distributing-a-validator) to SSV Network.
- After a successful ceremony, the tool writes a `ceremony-...` output folder with deposit data, key shares, and proof files.
- Review [Ceremony Output Summary](ceremony-output-summary) to understand ceremony artifacts.

:::warning Backup Output Files
Securely save output files on a separate device. They might be needed later, if you need to [Change Operator Set](change-operator-set-and-reshare-validator-key-shares) or [Update Owner Nonce](update-owner-nonce-in-key-shares).
:::
