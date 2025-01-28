---
description: Distributing a validator
sidebar_position: 2
---

# Distributing a validator

### Connect your Web3 wallet to WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

#### New accounts

When creating a new account, you are presented with the option of _**Distribute Validator**_ or _**Join as an Operator**_.

Select _Distribute a Validator_.

![Distribute a validator](/img/distributing-a-val-1.avif)

#### Existing accounts

In the My Account page, click on Add Cluster to create a new one.

![Distribute a validator](/img/distributing-a-val-2.avif)

Alternatively, you can [onboard additional validators to an existing cluster](../cluster-management/adding-validator-to-existing-cluster.md).

:::info
In this case, you will not need to select operators, so you can skip the next step.

You'll simply be asked how do you want to handle operational costs, in regards to your balance.
:::

#### Ethereum validator disclaimer

In order to run a validator, you'll need to be in possession of its keys, have made the deposit to the Deposit Contract to activate it, and own the necessary amount of SSV tokens to cover operational costs.

:::info
To learn how to create a new set of validator keys and activate them, [please refer to this guide](creating-a-new-validator.md).
:::

Accept the disclaimer by clicking Next if you have all the pre-requisites.

![Distribute a validator](/img/distributing-a-val-3.avif)

### Select operators

Now, select four operators to manage your validator. Please note the **Yearly Fee** for the setup you created before hitting the Next button.

:::info
**Important:** Verified Operators (VOs) are operators that have been granted the **Verified** status by the DAO for completing KYC and providing consistent high-quality service. You can sort the operator list by their daily performance, yearly fee, and # of validators they manage. You can also filter to view only Verified Operators.
:::

![Distribute a validator](/img/distributing-a-val-4.avif)

### Key splitting

The next screen will allow you to generate KeyShares for your validator key. On testnet, this can be done Online, directly on the WebApp, or Offline, on your computer.

On mainnet, only the Offline option is available.

![Distribute a validator](/img/distributing-a-val-5.avif)

#### Online Key Splitting

Online key splitting presents a convenient option, especially for those not familiar with the console, or command line clients.

This is not considered safe and is only available on testnet for testing purposes.

:::warning
Please never perform a Online key splitting on testnet, with a private key that you intend to use on mainnet.
:::

![Distribute a validator](/img/distributing-a-val-6.avif)

If the Online option is chosen, the next screen allows you to upload the Validator key (file named keystore) and enter the password to decrypt it.

![Distribute a validator](/img/distributing-a-val-7.avif)

#### Offline Key Splitting

Offline key splitting is the most secure option, although less convenient, as it requires running a command line tool. For more information, refer to the specific [User Guide on how to use the ssv-keys CLI tool](../tools/ssv-keys-cli.md).

:::success
The latest SSV Smart Contract updates added support for [_bulk operations_](../../developers/smart-contracts/ssvnetwork.md#bulkregistervalidator-publickey-operatorids-shares-amount-cluster), and the latest release of`ssv-keys` has been made compatible with bulk operations. With version 1.1.0 (and above), it is possible to generate keyshares for multiple keystores in a single operation.
:::

![Distribute a validator](/img/distributing-a-val-8.avif)


If the Offline option was selected, please follow the indications and upload the generated `keyshares-[DATE]-[TIME].json` file in the following screen.

![Distribute a validator](/img/distributing-a-val-9.avif)

Once uploaded, if successfully validated, advance to the next screen clicking Next.

![Distribute a validator](/img/distributing-a-val-10.avif)

:::success
The SSV WebApp has been upgraded to include the ability to process `keyshares` files that contain multiple validator KeyShares.

This makes it possible to distribute multiple validators in a single transaction, thanks to the latest updates to the SSV Smart Contract.
:::

### Validator operational runway

You can select the operational runway period of your validator, in accordance with the **Yearly Fee** of previously selected operators. This will dictate the initial amount of SSV to be deposited in the cluster, but it can always be managed later.

![Distribute a validator](/img/distributing-a-val-11.avif)

**Please read carefully and understand how fees are managed and the risks of account** [**liquidation**](../../learn/glossary.md#liquidation) **if your account balance falls below the** [**Threshold Balance**](../../learn/glossary.md#liquidation-collateral)**.**

![Distribute a validator](/img/distributing-a-val-12.avif)

### Slashing warning

The following screen alerts you of the potential dangers of registering a validator on the SSV network, if the same set of validator keys is also being used by other consensus and validator clients.

Please make sure to stop any other running validator setup, if you have any.

![Distribute a validator](/img/distributing-a-val-13.avif)

### Validator summary

The next screen presents a summary of your validator setup.

![Distribute a validator](/img/distributing-a-val-14.avif)


By clicking on Register validator(s), you'll be proposed to sign transactions to confirm your choice and transfer the SSV balance necessary to cover for the operational costs.

:::info
**Note:** If this is the first time you are registering a validator to ssv.network, you will be required to make two transactions - one to approve the SSV smart contract and another one to register the validator.
:::

### SSV Balance deposit

Now, finalize the validator registration by signing the transaction and adding SSV tokens to your account balance.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/img/distributing-a-val-15.png" alt="Distribute a validator" />
</div>

You will need to confirm the transaction in your web3 wallet.

![Distribute a validator](/img/distributing-a-val-16.avif)

Once the transaction has been signed and confirmed by the network, you'll be presented with the summary screen.

![Distribute a validator](/img/distributing-a-val-17.avif)

**Congratulations! You're all set!🥳**

