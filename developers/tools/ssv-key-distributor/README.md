# SSV Keys

The SSV Keys tools enable users to split a validator key into a predefined threshold of shares via [Shamir-Secret-Sharing (SSS)](https://en.wikipedia.org/wiki/Shamir's\_Secret\_Sharing), and encrypts them with a set of operator keys.

The **shares** are used during [validator registration](../../smart-contracts/ssvnetwork.md#public-registervalidator-publickey-operatorids-shares-amount-cluster) through the SSV smart contract in order to facilitate their distribution from stakers to operators.

{% hint style="info" %}
Please note that **shares** can be shared publicly since only assigned operators are able to decrypt them.
{% endhint %}

