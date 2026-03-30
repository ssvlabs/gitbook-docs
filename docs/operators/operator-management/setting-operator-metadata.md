---
title: Setting Operator Metadata
sidebar_position: 2
---

# Setting Operator Metadata

Connect the same wallet you used to register the Operator in the [Web App](https://app.ssv.network/).

1. Browse to the [My Account page](https://app.ssv.network/operators) and **select the Operator you want to update**.

2. Click on the three vertical dots on the top-right corner. From the dropdown, **choose the _Edit Details_ option**.

![setting-operator-metadata](/img/set-operator-metadata-1.png)

3. **Fill in the details you want to update**.

More complete metadata helps Stakers make informed decisions when choosing Operators for their validator clusters.

:::warning Please note
The `Description` and `Name` fields currently do not allow the symbols `, . ; :`. Do not use them, or the metadata submission will fail.
:::

![setting-operator-metadata](/img/set-operator-metadata-2.png)

4. Once done, **click the _Sign Metadata_ button** and confirm signature.

The Web App asks you to sign a message. Open your wallet if it does not open automatically and confirm the signature.

:::note Signature costs no gas
This is not a transaction and does not cost gas. It only proves that you are the Operator owner.
:::

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/set-operator-metadata-3.png" 
    alt="Set operator metadata" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

5. **Done!**

Once the message is signed, the Operator metadata is updated.

![setting-operator-metadata](/img/set-operator-metadata-4.png)
