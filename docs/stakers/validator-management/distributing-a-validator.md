---
description: Migrating a validator
title: Migrating a validator
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migrating a validator

In order to distribute a validator you'll need — its keys, have made the deposit to the Deposit Contract to activate it, and own the necessary amount of SSV tokens to cover operational costs.

:::note Don't have validator keys?
To learn how to create a new set of validator keys and activate them, [please refer to this guide](creating-a-new-validator.md).
:::

### Connect your Web3 wallet to WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

:::info Owner account
**Your account is associated with your Web3 wallet**. This wallet will be the owner, so having access to it is vital. It can only be changed by removing validator and register using a new wallet.
:::

<Tabs>
  <TabItem value="new-accounts" label="New Accounts">

  When creating a new account, you are presented with the option of _**Distribute Validator**_ or _**Join as an Operator**_.

  Select _Distribute a Validator_.

  ![Distribute a validator](/img/distributing-a-val-1.avif)

  </TabItem>
  <TabItem value="existing-accounts" label="Existing Accounts">

  In the My Account page, click on Add Cluster to create a new one.

  ![Distribute a validator](/img/distributing-a-val-2.avif)

  Alternatively, you can [onboard additional validators to an **existing cluster**](../cluster-management/adding-validator-to-existing-cluster.md).

  </TabItem>
</Tabs>  

#### Ethereum validator disclaimer

Accept the disclaimer by clicking _Next_ if you have all the pre-requisites.

![Distribute a validator](/img/distributing-a-val-3.avif)

### Select operators

Now, select four [(alternatively 7, 10, or 13)](/docs/stakers/validators/validator-onboarding.md#operators-selection-) operators to manage your validator. Please note the **Yearly Fee** for the setup you created before hitting the Next button.

:::info Verified Operators
**Important:** [Verified Operators (VOs)](/docs/operators/operator-onboarding/verified-operators.md) are operators that have been granted the **Verified** status by the DAO for completing KYC and providing consistent high-quality service. You can sort the operator list by their daily performance, yearly fee, and # of validators they manage. You can also filter to view only Verified Operators.
:::

![Distribute a validator](/img/distributing-a-val-4.avif)

### Key splitting

The next screen will allow you to generate KeyShares for your validator key(s).
- On Testnet, this can be done Online, directly on the WebApp, or Offline, on your computer.
- On Mainnet, only the Offline option is available.

:::warning Keep your keys safe!
To avoid losing your keystores to an attacker, follow these best practices:
- Split the keys on an offline machine. Ideally, on an "air-gapped" hardware;
- Use Secure Vaults to store your keystores, mnemonic, and password (e.g. AWS KMS, HashiCorp Vault);
- If you have a key-management service, use firewall/whitelisting rules and disable unused APIs.
:::

![Distribute a validator](/img/distributing-a-val-5.avif)

<Tabs>
  <TabItem value="offline" label="Offline Key Splitting">

    Offline key splitting is the most secure option, although less convenient, as it requires running a command line tool. For more information, refer to the specific [User Guide on how to use the ssv-keys CLI tool](../tools/ssv-keys-cli.md).

    ![Distribute a validator](/img/distributing-a-val-8.avif)


    If the Offline option was selected, please follow the indications and upload the generated `keyshares-[DATE]-[TIME].json` file in the following screen.

    ![Distribute a validator](/img/distributing-a-val-9.avif)

    Once uploaded, if successfully validated, advance to the next screen clicking Next.

    ![Distribute a validator](/img/distributing-a-val-10.avif)

  </TabItem>
  <TabItem value="online" label="Online Key Splitting">

    Online key splitting presents a convenient option, especially for those not familiar with the console, or command line clients.

    This is not considered safe and is only available on testnet for testing purposes.

    :::warning Keep your keys safe
    Please never perform a Online key splitting on testnet, with a private key that you intend to use on mainnet.
    :::

    ![Distribute a validator](/img/distributing-a-val-6.avif)

    If the Online option is chosen, the next screen allows you to upload the Validator key (file named keystore) and enter the password to decrypt it.

    ![Distribute a validator](/img/distributing-a-val-7.avif)

  </TabItem>
</Tabs>  

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

:::info Two transactions
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

**Congratulations! You're all set! 🥳**

Allow a couple of epochs to pass for the validator status to change to Active on [the Explorer page](https://explorer.ssv.network/).
