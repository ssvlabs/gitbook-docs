---
title: Removing a validator
sidebar_position: 7
---

# Removing a validator

### Connect your Web3 wallet to the WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

In the My Account page, select an active cluster:

![remove-validator](/img/remove-a-validator-1.avif)

In the Cluster page, **tap the gear icon** next to the validator you want to remove and select "Remove Validator".

![remove-validator](/img/remove-a-validator-2.webp)

### Bulk remove

:::success
The latest SSV Smart Contract updates added support for [_bulk operations_](../../developers/smart-contracts/ssvnetwork.md#bulkremovevalidatorpublickey-operatorids-cluster), and the SSV WebApp has been upgraded to include the ability to perform bulk operations on multiple validators at a time.

This makes it possible to remove multiple validators in a single transaction.
:::

Alternatively, if a cluster is managing more than one validator, it is possible to select multiple validators at once, using the _Actions_ dropdown on top of the validators table, and selecting _Remove validators_.

![remove-validator](/img/remove-a-validator-3.webp)

In the following screen, select the validators you want to remove from ssv.network, based on their public key. When ready, press the _Next_ button.

![remove-validator](/img/remove-a-validator-4.webp)

### Inactivity penalties warning

The following screen alerts you of the implications of removing the validator from the cluster.

:::warning
This will cause the validator to go offline. It is advised to have an alternative validator setup ready to continue operating outside ssv.network, [as explained here](/stakers/validators/validator-offboarding).

Removing the validator is **NOT** reversible, the validator will have to be registered anew on the ssv.network, should you intend to join again.

Please read the text carefully and understand the implications of removing your validator from the network.
:::

When you are ready, check the box and click the Remove Validator button.

![remove-validator](/img/remove-a-validator-5.webp)

### Sign the confirmation

Now, finalize the validator removal by signing the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/remove-a-validator-6.png" 
    alt="Remove a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

You will need to confirm the transaction in your web3 wallet.

![remove-validator](/img/remove-a-validator-7.webp)

Once the transaction has been signed and confirmed by the network, your validator will have been successfully removed from the cluster and no longer handled by operators on the SSV network.
