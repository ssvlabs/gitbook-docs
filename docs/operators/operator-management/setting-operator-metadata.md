---
title: Setting Operator metadata
sidebar_position: 2
---

### Connect your Web3 wallet to WebApp.

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Operators with.

:::info Note
**Note:** Your account is associated with your Web3 wallet.
:::

Once connected, browse to the _My Account_ page and select the Operator you want to update from the _Operator Dashboard_.

![setting-operator-metadata](/img/set-operator-metadata-1.avif)

Then, on the _Operator Details_ screen, click on the three vertical dots on the top-right corner.

![setting-operator-metadata](/img/set-operator-metadata-2.avif)

From the dropdown, choose the _Edit Details_ option.

![setting-operator-metadata](/img/set-operator-metadata-3.avif)

In the following screen, fill-in the form with the information you want to edit.

Remember: the more details you can provide the better, as it will help stakers making informed decision when selecting operators to manage their validator clusters.

:::warning Please note
Currently, the `Description` and `Name` parts do not allow to use symbols `, . ; :`. Please don't use them, otherwise you'll see errors when submitting the metadata.
:::

![setting-operator-metadata](/img/set-operator-metadata-4.avif)
When you are done, click the _Update_ button, the WebApp will ask you to provide a signature of a message.

Make sure to open your Web3 wallet, if it does not automatically and confirm the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/set-operator-metadata-5.png" 
    alt="Set operator metadata" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

:::info
This is not a transaction and will not cost any gas, it's only needed to verify that you are the Operator owner.
:::

When the message is successfully signed, the Operator metadata will have been correctly updated.
