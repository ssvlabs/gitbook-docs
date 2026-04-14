---
description: Understanding permissioned operators in SSV Network
sidebar_position: 3
---

# Permissioned Operators

## What are Permissioned Operators?

Permissioned Operators (also known as "private") are operators that authorize only a defined list of wallet addresses to register validators with them. There are several reasons an operator may want this option, and several reasons they may prefer not to use it, which is why it is disabled by default.

### How to become a Permissioned Operator?

The **`setOperatorMultipleWhitelists`** smart contract function allows a set of addresses to be whitelisted across multiple operators, granting those addresses permission to register validators with the specified operators.

The [Web App](https://app.ssv.network/) also provides a UI for interacting with the smart contract. You can find guidance for the process in [this documentation page](/operators/operator-management/configuring-a-permissioned-operator).

:::info
Configuring a Permissioned Operator affects only **future validator registrations**.

If any number of validators have already been registered to various clusters that include a certain Operator, configuring this Operator to become a Permissioned Operator **will not** cause these validators to stop working.
:::

### How to identify Permissioned Operators

When an operator owner configures their operator as permissioned, **any smart contract transaction that tries to register a validator with that operator will fail** if the sender address is not included in the whitelist.

To help with operator selection and avoid wasted gas on failed transactions, the [Web App](https://app.ssv.network/) identifies permissioned operators with a padlock icon next to the operator logo.

![permissioned-operator](/img/permissioned-operators-1.png)

Similarly, the [SSV Explorer](https://explorer.ssv.network/operators/1) also shows the padlock icon next to the Operator logo of Permissioned Operators.

![permissioned-operator](/img/permissioned-operators-2.avif)

### SSV Subgraph 

SSV also provides a subgraph that makes it easier to look up information about permissioned operators. It tracks the events related to whitelisting, so you can check which operators are private and which addresses are whitelisted for each operator. You can find more details in the [subgraph documentation](/developers/api/ssv-subgraph).

One last way to verify this is to use the [SSV Network Views smart contract](/developers/smart-contracts/ssvnetworkviews#getoperatorbyidoperatorid).

### Use Cases

Because making an operator permissioned means giving up the chance to be selected by public users, it is useful to understand the main reasons for doing so. Common use cases for a permissioned operator include:

* using SSV Network exclusively to coordinate private infrastructure
* operating a staking service with discounts or an alternative fee structure

This is possibly why Permissioned Operators are the preferred configuration of many [Staking Services](/developers/integration-guides).

Operators choose an operator fee when registering on SSV Network, and **that fee is the same for everyone** who registers validators with that operator.

For example, a staking service may choose to run its own operators for privacy, compliance, customer, or operational reasons, and may decide to distribute validators only to clusters composed exclusively of those operators. In that case, the service would otherwise end up paying operator fees to itself.

The team could set operator fees to 0, but that would mean **anyone on SSV Network** could register validators with those operators without paying operator fees. To prevent that, the team could make the operators permissioned and authorize only the wallet addresses used to register customer validators.

In practical terms, this means giving up potential revenue from public users in exchange for a more controlled setup. For some services, that tradeoff is worthwhile.
