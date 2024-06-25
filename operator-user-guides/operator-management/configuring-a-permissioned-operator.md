# Configuring a permissioned Operator

{% hint style="warning" %}
It is important to note that these properties are independent to each other: &#x20;

* Operator status
* Assigned whitelisted addresses&#x20;
* External whitelist contract

For example, we can set whitelisted addresses before changing the operator status to be private.&#x20;
{% endhint %}

### Connect your Web3 wallet to WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Operators with.

{% hint style="info" %}
**Note:** Your account is associated with your Web3 wallet.
{% endhint %}

### Updating your Operator Status

Once connected, browse to the _My Account_ page and select the Operator you want to update from the _Operator Dashboard_.

<figure><img src="../../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>

Then, on the _Operator Details_ screen, click on the three vertical dots on the top-right corner, from the dropdown, choose the _Access Settings_ option.

<figure><img src="../../.gitbook/assets/image (32).png" alt=""><figcaption></figcaption></figure>

In the following screen, you will see options to change the status of your operator, add authorized addresses, and set an external whitelisting contract to manage these addresses.

<figure><img src="../../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

Let's start by changing the status of our operator to private, start by clicking on the Operator Status option which will bring you to the following screen:

<figure><img src="../../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

After clicking Switch to Private, you will be prompted to sign a transaction with your Web3 wallet.

<div data-full-width="true">

<figure><img src="../../.gitbook/assets/image (35).png" alt="" width="352"><figcaption></figcaption></figure>

</div>

Once the transaction is signed, you will only need to wait for the blockchain to validate it, and the settings will be live.

To change your operator status back to public, follow the same steps and turn the flag off again.

### Adding/Removing Authorized addresses

Here we will whitelist some addresses for this specific operator. Start by clicking on the Authorized Addresses option, which will bring you to the following screen:

<figure><img src="../../.gitbook/assets/image (36).png" alt=""><figcaption></figcaption></figure>

Here we're adding two authorized addresses to this operator, simply add valid Ethereum addresses then click "Add and Save" to sign the transaction with your web3 wallet.

<figure><img src="../../.gitbook/assets/image (37).png" alt="" width="352"><figcaption></figcaption></figure>

### Adding an External Contract&#x20;

SSV also gives you the option to add your own whitelisting contract for managing authorized addresses. This contract must follow certain specifcations [which can be found here](../../developers/smart-contracts/external-whitelist-contract-example.md)**.** &#x20;

To ensure this contract is compliant, when it is deployed you can verify it is valid with the SSV Network read contract by calling `isWhitelisingContract()` with the contract address as the parameter.

After clicking the External Contract option, you will be brought to the following screen:

<figure><img src="../../.gitbook/assets/image (40).png" alt=""><figcaption></figcaption></figure>

Enter a valid whitelisting contract address, click save, and you will be prompted to sign the transaction with your Web3 wallet.

<figure><img src="../../.gitbook/assets/image (41).png" alt=""><figcaption></figcaption></figure>

This will be saved to the SSV Network contract.
