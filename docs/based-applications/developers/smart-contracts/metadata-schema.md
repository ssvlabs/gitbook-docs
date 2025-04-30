---
sidebar_label: 'Metadata Schemas'
sidebar_position: 5
---

# Metadata Schemas

Metadata schemas are used to store the metadata of a bApp, strategy, and account.

They should be saved at a URL that can be accessed freely, such as [this.](https://raw.githubusercontent.com/taylorferran/bapp-metadata/refs/heads/main/metadata.json)

## Bapp 

Stored in the Based App Manager smart contract, as `metadataURI` for a bapp. It is a link (e.g., `http://example.com`) to a JSON file containing metadata such as the name, description, logo, etc. You can set the URI when [registering a bApp](./SSVBasedApps#registerbappbapp-tokens-sharedrisklevels-metadatauri) or [update the URI at any point in the future](./SSVBasedApps#updatebappmetadatauribapp-metadatauri).

:::info
It is important to set this correctly, as it is used to identify the bApp on interfaces such as the SSV Based App website.
:::

### Bapp schema

```json
{
    "name": "My bApp Name",
    "description": "A description for my first bApp.",
    "logo": "https://your-hosted-content.com/image.png",
    "website": "https://www.my-bapp-address.com/"
}
```

### Fields

- `name`: The name of the bApp.
- `description`: The description of the bApp.
- `logo`: The logo of the bApp.
- `website`: The website of the bApp.


## Strategy schema

```json
{
    "name": "My Strategy",
    "description": "A description about my strategy."
}
```

## Account

```json
{
    "name": "My Account",
    "logo": "https://my-hosted-account.com/image.png"
}
```