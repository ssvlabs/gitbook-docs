---
sidebar_label: 'Edit Metadata'
sidebar_position: 4
---

# Edit Metadata

## 1. Open Strategy page

Open the [SSV Web App My Account page](https://app.ssv.network/account/my-strategies) and click on Strategies. Click on your strategy to open it's page.

On a Strategy's page you will find "Edit Strategy" button and "Edit Metadata" in the dropdown list.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/strategy-edit-metadata-1.png" alt="" />
</div>

## 2. Provide Metadata

Metadata for your Strategy and your Account will have to be set with `.json` files.

Here is how the example metadata file for Strategy looks like:
```json
{
    "name": "My Strategy",
    "description": "A description about my strategy."
}
```

And for the Account metadata we used:
```json
{
    "name": "My Account",
    "logo": "https://my-hosted-account.com/image.png"
}
```

Once you provided URI to those files, you will see that information on the page. After you verified the information, click on "Update".

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/strategy-edit-metadata-2.png" alt="" />
</div>

## 3. Sign transaction

You will be prompted to sign a transaction to edit the metadata of your Strategy/Account. Confirm the transaction and wait for it's execution on chain.

<div style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
  <img src="/img/strategy-edit-metadata-3.png" alt="" />
</div>

## 4. Verify changes

You will be redirected back to your Strategy's page, you can check the updated metadata in the top portion of the page.