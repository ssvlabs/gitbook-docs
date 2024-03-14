# Removing a validator

### Connect your Web3 wallet to the WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

{% hint style="info" %}
**Note:** Your account is associated with your Web3 wallet.
{% endhint %}

In the My Account page, select an active cluster:

<figure><img src="../../.gitbook/assets/removing_validator1.png" alt=""><figcaption></figcaption></figure>

In the Cluster page, **tap the gear icon** next to the validator you want to remove and select "Remove Validator".

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-13 at 13.23.09 (1).png" alt=""><figcaption></figcaption></figure>

### Bulk remove

{% hint style="success" %}
The latest SSV Smart Contract updates added support for [_bulk operations_](../../developers/smart-contracts/ssvnetwork.md#bulkremovevalidator-publickey-operatorids-cluster), and the SSV WebApp has been upgraded to include the ability to perform bulk operations on multiple validators at a time.

This makes it possible to remove multiple validators in a single transaction.
{% endhint %}

Alternatively, if a cluster is managing more than one validator, it is possible to select multiple validators at once, using the _Actions_ dropdown on top of the validators table, and selecting _Remove validators_.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-13 at 13.54.57.png" alt=""><figcaption></figcaption></figure>

In the following screen, select the validators you want to remove from ssv.network, based on their public key. When ready, press the _Next_ button.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-13 at 13.55.05.png" alt=""><figcaption></figcaption></figure>

### Inactivity penalties warning

The following screen alerts you of the implications of removing the validator from the cluster.

{% hint style="warning" %}
This will cause the validator to go offline. It is advised to have an alternative validator setup ready to continue operating outside ssv.network, [as explained here](../../learn/stakers/validators/validator-offboarding.md).

Removing the validator is **NOT** reversible, the validator will have to be registered anew on the ssv.network, should you intend to join again.

Please read the text carefully and understand the implications of removing your validator from the network.
{% endhint %}

When you are ready, check the box and click the Remove Validator button.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-13 at 13.55.14.png" alt=""><figcaption></figcaption></figure>

### Sign the confirmation

Now, finalize the validator removal by signing the transaction.

<figure><img src="../../.gitbook/assets/removing_validator4.png" alt="" width="206"><figcaption></figcaption></figure>

You will need to confirm the transaction in your web3 wallet.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-13 at 13.55.41.png" alt=""><figcaption></figcaption></figure>

Once the transaction has been signed and confirmed by the network, your validator will have been successfully removed from the cluster and no longer handled by operators on the SSV network.\
