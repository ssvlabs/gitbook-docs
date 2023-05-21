# Registration

After successfully running the SSV node an operator must register it to the SSV Smart contract in order to be discoverable by validators.

You can register your operator through the SSV network [web app](https://app.ssv.network) or via a transaction directly to the [smart contract](../../developers/smart-contracts/ssvnetwork.md#public-registeroperator-publickey-operatorfee)&#x20;

While registering your operator you will need to provide the following parameters:

* [Operator public key](installation.md#4.-generate-operator-keys) - Generated in the node installation process (base64 format)
* [Operator fee](../../learn/operators/#operator-fee) - The fee charged by the operator per each managed validator

{% hint style="info" %}
The wallet address used to register the operator is the only address that will hold management permissions for it.
{% endhint %}

