# Permissioned Operators

### What are Permissioned Operators?

Permissioned Operators (also known as "Private") are Operators that have selected to authorize only one specific wallet address to register validators to them. There are multiple reasons why an Operator would want this, and various reasons why they would **not** want to choose this option, and why this disabled by default.

#### How to identify Permissioned Operators

When an Operator owner chooses to identify their Operator as Permissioned, **any smart contract transaction to register a validator with such Operator will fail**, if the sender of the transaction is not the whitelisted address.

To facilitate Operator selection and avoid wasting ETH in gas fees for failed transactions, [the ssv.network WebApp](https://app.ssv.network/) identifies Permissioned Operators with a padlock icon, next to the Operator logo.

<figure><img src="../../.gitbook/assets/Screenshot 2024-02-14 at 11.38.56.png" alt=""><figcaption></figcaption></figure>

Similarly, the [SSV Explorer](https://explorer.ssv.network/operators/1) also shows the padlock icon next to the Operator logo of Permissioned Operators.

<figure><img src="../../.gitbook/assets/Screenshot 2024-02-20 at 11.03.56.png" alt=""><figcaption></figcaption></figure>

One last way to verify this is to use the [SSV Network Views smart contract](../../developers/smart-contracts/), which provides this information in the `isPrivate` and `whitelisted` fields returned by the [`getOperatorById` function](../../developers/smart-contracts/ssvnetworkviews.md#getoperatorbyid-operatorid).

#### Use Cases

Since setting an operator as Permissioned Operator has the consequence of renouncing from potentially being chosen by public customers to operate their validators, let's talk about the upsides, and why one would choose to do so. The main use cases for a Permissioned Operator are:

* using SSV network exclusively for coordinating one's own private infrastructure
* operating a staking service with discounts or alternative fee structure

This is possibly why Permissioned Operators are the preferred configuration of many [Staking Services](../../developers/integration-guides/staking-services.md).

Operators have to choose an Operator Fee when registering to ssv.network, **this fee will be the same for everyone** registering validators to the selected Operator.

Let's use the example of someone building a Staking Service: for privacy, compliance, customer request or any other similar reasons, they might plan on running their own Operators, and decide they are going to **only** distribute validators to clusters composed **exclusively** of such Operators. In this scenario, this service would have to pay Operator Fees to themselves, which obviously quite strange.

The team could elect to reduce Operator Fees to 0, but this would mean that **everyone on ssv.network** could benefit from this, and register validators to such Operators without paying any Operator Fees. To counter this, the team might choose to turn their Operators into Permissioned Operators, and add the wallet address responsible for registering customer validators as the only address authorized.

In practical terms, this means renouncing the potential profits from public customers choosing their Operator and paying Operator fees, but if the team projects that the service fees paid to the Staking Service and the convenience of not paying Operator fees will outweigh the potential missed revenue, then this is the right choice for them.

### How to become a Permissioned Operator?

The **`setOperatorWhitelist`** smart contract function allows to whitelist the only address with the permission to register validators to the specified operator.

Conveniently, [the ssv.network WebApp](https://app.ssv.network/) offers a way to interact with the smart contract through a UI, and you can get guidance on the process [on this page in this documentation](../../operator-user-guides/operator-management/configuring-a-permissioned-operator.md).

{% hint style="info" %}
It's important to note that configuring a Permissioned Operator only affects **future validator registrations**.

If any number of validators have already been registered to various clusters that include a certain Operator, configuring this Operator to become a Permissioned Operator **will not** cause these validators to stop working.
{% endhint %}
