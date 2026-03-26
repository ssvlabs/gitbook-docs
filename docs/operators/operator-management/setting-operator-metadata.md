---
title: Setting Operator Metadata
sidebar_position: 2
---

# Setting Operator Metadata

Make sure to connect your Web3 wallet with the WebApp. The address should be the same you used to register your operator with.

1. Browse to the [My Account page](https://app.ssv.network/operators) and **select the Operator you want to update**.

2. Click on the three vertical dots on the top-right corner. From the dropdown, **choose the _Edit Details_ option**.

![setting-operator-metadata](/img/set-operator-metadata-1.png)

3. **Fill-in the form with the information you want to edit**.

**Remember:** the more details you can provide the better, as it will help stakers making informed decision when selecting operators to manage their validator clusters.

:::warning Please note
Currently, the `Description` and `Name` parts do not allow to use symbols `, . ; :`. Please don't use them, otherwise you'll see errors when submitting the metadata.
:::

![setting-operator-metadata](/img/set-operator-metadata-2.png)

4. Once done, **click the _Sign Metadata_ button** and confirm signature.

The WebApp will ask you to provide a signature of a message. Make sure to open your Web3 wallet, if it does not automatically and confirm the transaction.

:::info Signature costs no gas
This is not a transaction and will not cost any gas, it's only needed to verify that you are the Operator owner.
:::

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/set-operator-metadata-3.png" 
    alt="Set operator metadata" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

5. **Done!**

When the message is successfully signed, the Operator metadata will have been correctly updated.

![setting-operator-metadata](/img/set-operator-metadata-4.png)