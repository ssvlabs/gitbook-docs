---
title: Remove Validators
sidebar_position: 2
---

# Remove Validators

:::warning Please note
**If the validator is removed before [exiting](exiting-a-validator)**, it can't be exited via SSV Network. In such case, the validator will have to be exited via [Ethereum Launchpad Actions](https://launchpad.ethereum.org/en/validator-actions) or by running a traditional validator stack and have it sign an exit message.
:::

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

1. In the [My Account page](https://app.ssv.network/clusters), **select an active cluster**.

![remove-validator](/img/remove-a-validator-1.png)

2. In the Cluster page, **tap the Actions button** on top of the validators table **and select "Remove Validator"**.

![remove-validator](/img/remove-a-validator-2.png)

3. In the following screen, **select the validators you want to remove** from ssv.network, based on their public key. When ready, press the _Next_ button.

![remove-validator](/img/remove-a-validator-3.png)

4. **Acknowledge inactivity penalties warning**.

Please read the text carefully and understand the implications of removing your validator from the network.
:::danger
Removal will cause the validator to go offline. It is advised to have an alternative validator setup ready to continue operating outside ssv.network, as explained [in the Learn section](/learn/network-overview/validators/validator-offboarding).

Removing the validator is **NOT** reversible, the validator will have to be registered anew on the ssv.network, should you intend to join again.
:::
When you are ready, check the box and click the "Remove Validator" button.

![remove-validator](/img/remove-a-validator-4.png)

5. Now, **sign the confirmation** to finalize the validator removal.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/remove-a-validator-5.png" 
    alt="Remove a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

6. **Done!**

Once the transaction has been signed and confirmed by the network, your validator will have been successfully removed from the cluster and no longer handled by operators on the SSV network.