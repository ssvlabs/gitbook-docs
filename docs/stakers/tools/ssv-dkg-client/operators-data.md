---
sidebar_label: 'Operators Data'
sidebar_position: 1
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Operators Data

Every `ssv-dkg` ceremony requires operator data supplied by the initiator. The tool does not discover this data for you.

The operator data must match the operator's current published DKG metadata, securing all ssv-dkg operations.

## Required operator data

For each selected operator, provide:

- the operator ID
- the operator RSA public key
- the operator DKG endpoint URL

## Recommended sources

Source operator data from current SSV-managed or operator-published data sources, such as:

- [SSV Explorer](https://explorer.ssv.network/)
- [SSV API](https://api.ssv.network/documentation/#/v4)

Avoid manually assembled endpoint lists unless you have independently verified that the DKG metadata is current.

## Provide the data as JSON

You can pass operator data directly or store it in a JSON file. Store this data in an operators info JSON file if you plan to reuse it across validation and ceremony commands. The same file can be passed to `ssv-dkg ping` with `--operatorsInfoPath` and later to `init`, `reshare`, or related commands.

In this JSON, the `ip` field stores the full DKG endpoint URL, even though the field name suggests a literal IP address.

**Edit the example below and copy it to your local file:**


<InlineEditableCodeBlock
  language="json"
  template={
  `
[
    {
      "id": {{ID1}},
      "public_key": "{{PUBLIC_KEY}}",
      "ip": "{{IP}}"
    },
    {
      "id": {{ID2}},
      "public_key": "{{PUBLIC_KEY}}",
      "ip": "{{IP}}"
    },
    {
      "id": {{ID3}},
      "public_key": "{{PUBLIC_KEY}}",
      "ip": "{{IP}}"
    },
    {
      "id": {{ID4}},
      "public_key": "{{PUBLIC_KEY}}",
      "ip": "{{IP}}"
    }
]
  `
  }
  variables={{
    PUBLIC_KEY: 'LS0tL...',
    IP: 'https://1.2.3.4:3030',
    ID1 : '1',
    ID2 : '2',
    ID3 : '3',
    ID4 : '4',
  }}
/>