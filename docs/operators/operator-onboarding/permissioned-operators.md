---
description: Understanding permissioned operators in the SSV network
sidebar_position: 5
---

# Permissioned Operators

### What are Permissioned Operators?

Permissioned Operators (also known as "Private") are Operators that have selected to authorize only a list of wallet addresses to register validators to them. There are multiple reasons why an Operator would want this, and various reasons why they would **not** want to choose this option, and why this disabled by default.

:::tip New feature
The latest version of the SSVNetworks smart contract adds the ability to set multiple whitelisted addresses to multiple operators in bulk. Information on how to do this via the webapp can be found [here](./operator-management/configuring-a-permissioned-operator).
:::

#### How to identify Permissioned Operators

When an Operator owner chooses to identify their Operator as Permissioned, **any smart contract transaction to register a validator with such Operator will fail**, if the sender of the transaction is not included in the list of whitelisted addresses.

To facilitate Operator selection and avoid wasting ETH in gas fees for failed transactions, [the ssv.network WebApp](https://app.ssv.network/) identifies Permissioned Operators with a padlock icon, next to the Operator logo.

![permissioned-operator](/img/permissioned-operators-1.png)

Similarly, the [SSV Explorer](https://explorer.ssv.network/operators/1) also shows the padlock icon next to the Operator logo of Permissioned Operators.

![permissioned-operator](/img/permissioned-operators-2.avif)

#### SSV Subgraph&#x20;

SSV also provide a subgraph to easily look up information on permissioned Operators, this tracks all the events surrounding whitelisting and means we can check which operators are private, and which addresses are whitelisted per operator. You can find out more details on how to use the subgraph [**here**](../../developers/tools/ssv-subgraph/)**.**

One last way to verify this is to use the [SSV Network Views smart contract](../../developers/smart-contracts/ssvnetworkviews.md#getoperatorbyid-operatorid).

#### Use Cases

Since setting an operator as Permissioned Operator has the consequence of renouncing from potentially being chosen by public customers to operate their validators, let's talk about the upsides, and why one would choose to do so. The main use cases for a Permissioned Operator are:

* using SSV network exclusively for coordinating one's own private infrastructure
* operating a staking service with discounts or alternative fee structure

This is possibly why Permissioned Operators are the preferred configuration of many [Staking Services](../../developers/integration-guides/staking-services.md).

Operators have to choose an Operator Fee when registering to ssv.network, **this fee will be the same for everyone** registering validators to the selected Operator.

Let's use the example of someone building a Staking Service: for privacy, compliance, customer request or any other similar reasons, they might plan on running their own Operators, and decide they are going to **only** distribute validators to clusters composed **exclusively** of such Operators. In this scenario, this service would have to pay Operator Fees to themselves, which obviously quite strange.

The team could elect to reduce Operator Fees to 0, but this would mean that **everyone on ssv.network** could benefit from this, and register validators to such Operators without paying any Operator Fees. To counter this, the team might choose to turn their Operators into Permissioned Operators, and add the wallet addresses responsible for registering customer validators as the only addresses authorized.

In practical terms, this means renouncing the potential profits from public customers choosing their Operator and paying Operator fees, but if the team projects that the service fees paid to the Staking Service and the convenience of not paying Operator fees will outweigh the potential missed revenue, then this is the right choice for them.

### How to become a Permissioned Operator?

The **`setOperatorMultipleWhitelists`** smart contract function allows to whitelist a set of addresses to a number of different with the permission to register validators to the specified operators.

Conveniently, [the ssv.network WebApp](https://app.ssv.network/) offers a way to interact with the smart contract through a UI, and you can get guidance on the process [on this page in this documentation](../../operator-user-guides/operator-management/configuring-a-permissioned-operator.md).

:::info
It's important to note that configuring Permissioned Operator only affects **future validator registrations**.

If any number of validators have already been registered to various clusters that include a certain Operator, configuring this Operator to become a Permissioned Operator **will not** cause these validators to stop working.
:::
