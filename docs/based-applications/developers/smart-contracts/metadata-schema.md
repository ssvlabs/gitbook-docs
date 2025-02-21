---
sidebar_label: 'Metadata Schema'
sidebar_position: 5
---

# Metadata Schema

The metadata schema is used to store the metadata of the bApp.

It is stored in the Based App Manager smart contract, as `metadataURI` for a bapp. It is a link (e.g., `http://example.com`) to a JSON file containing metadata such as the name, description, logo, etc. You can set the URI when [registering a bApp](./BasedAppManager#registerbappbapp-tokens-sharedrisklevels-metadatauri) or [update the URI at any point in the future](./BasedAppManager#updatebappmetadatauribapp-metadatauri).

:::info
It is important to set this correctly, as it is used to identify the bApp on interfaces such as the SSV Based App website.
:::

It is a JSON object that contains the following fields:

```json
{
    "name": "J-Oracle",
    "description": "J-Oracle delivers secure data feeds and real-world connectivity for blockchains and beyond.",
    "logo": "https://raw.githubusercontent.com/jordanssv/metadata/refs/heads/main/JO.png"
    "website": "https://www.joracle.io/",
}
```

## Fields

- `name`: The name of the bApp.
- `description`: The description of the bApp.
- `logo`: The logo of the bApp.
- `website`: The website of the bApp.