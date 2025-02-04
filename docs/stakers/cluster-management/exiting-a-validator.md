---
title: Exiting a validator
sidebar_position: 5
---

# Exiting a validator

### Connect your Web3 wallet to the WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

In the My Account page, select an active cluster:

![exit-validator](/img/exit-a-validator-1.avif)

In the Cluster page, **tap the gear icon** next to the validator you want to remove and select "Exit Validator".

:::danger
Remember: to exit a validator through the SSV protocol, the validator has to be registered to the ssv.network.

If the validator is removed first, the following operations won't be possible, and the validator will have to be exited by running a traditional validator stack and have it sign an exit message.
:::

![exit-validator](/img/exit-a-validator-2.avif)
### Bulk exit

:::success
The latest SSV Smart Contract updates added support for [_bulk operations_](../../developers/smart-contracts/ssvnetwork.md#bulkexitvalidatorpublickey-operatorids), and the SSV WebApp has been upgraded to include the ability to perform bulk operations on multiple validators at a time.

This makes it possible to exit multiple validators in a single transaction.
:::

Alternatively, if a cluster is managing more than one validator, it is possible to select multiple validators at once, using the _Actions_ dropdown on top of the validators table, and selecting _Exit validators_.

![exit-validator](/img/exit-a-validator-3.avif)

In the following screen, select the validators you want to exit, based on their public key. When ready, press the _Next_ button.

![exit-validator](/img/exit-a-validator-4.avif)

### Summary and confirmation

:::warning
Exiting your validator signals to the network that you wish to permanently cease your validator's participation in the Beacon Chain and retrieve your 32 ETH stake principal.

Initiating an exit places your validator in the exit queue. The duration in the queue depends on the number of validators already waiting. During this period, your validator must remain active, so it is crucial to maintain your validator's performance and keep it registered with the SSV network until it has fully exited.
:::

This operation will generate a transaction to the [SSV Network smart contract](../../developers/smart-contracts/ssvnetwork.md#exitvalidatorpublickey-operatorids), and will make sure that the operators in the cluster will sign and execute a voluntary exit of the specified validator(s), on behalf of the validator owner.

![exit-validator](/img/exit-a-validator-5.avif)

In case of multiple validators, this screen will look like this:

![exit-validator](/img/exit-a-validator-6.avif)

### Transaction signature

Now, finalize the validator exit by signing the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/exit-a-validator-7.png" 
    alt="Exit a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

You will need to confirm the transaction in your web3 wallet.

Once the transaction has been signed and confirmed by the network, your validator will have been successfully exited from the beacon chain.

In a short time, dictated by the lenght of the exit queue on the beacon chain (this can vary from a few hours to a few days) it will no longer be considered for validator duties, and can be safely removed from SSV network, without incurring in penalties.

The 32 ETH stake will be available for withdrawal after a short period of time after this.
