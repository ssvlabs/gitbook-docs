---
title: Configuring a permissioned Operator
sidebar_position: 4
---

:::warning
It is important to note that these properties are independent to each other: 

* Operator status
* Assigned whitelisted addresses 
* External whitelist contract

For example, we can set whitelisted addresses before changing the operator status to be private. 
:::

### Connect your Web3 wallet to WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Operators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

### Updating your Operator Status

Once connected, browse to the _My Account_ page and select the Operator you want to update from the _Operator Dashboard_.

![config-operator](/img/configure-a-permissioned-operator-1.avif)

Then, on the _Operator Details_ screen, click on the three vertical dots on the top-right corner, from the dropdown, choose the _Access Settings_ option.

![config-operator](/img/configure-a-permissioned-operator-2.avif)

In the following screen, you will see options to change the status of your operator, add authorized addresses, and set an external whitelisting contract to manage these addresses.

![config-operator](/img/configure-a-permissioned-operator-3.avif)


Let's start by changing the status of our operator to private, start by clicking on the Operator Status option which will bring you to the following screen:

![config-operator](/img/configure-a-permissioned-operator-4.avif)

After clicking Switch to Private, you will be prompted to sign a transaction with your Web3 wallet.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-5.png" 
    alt="Switch to private" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>


Once the transaction is signed, you will only need to wait for the blockchain to validate it, and the settings will be live.

To change your operator status back to public, follow the same steps and turn the flag off again.

### Adding/Removing Authorized addresses

Here we will whitelist some addresses for this specific operator. Start by clicking on the Authorized Addresses option, which will bring you to the following screen:

![config-operator](/img/configure-a-permissioned-operator-6.avif)

Here we're adding two authorized addresses to this operator, simply add valid Ethereum addresses then click "Add and Save" to sign the transaction with your web3 wallet.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-7.png" 
    alt="Switch to private" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

### Adding an External Contract

SSV also gives you the option to add your own whitelisting contract for managing authorized addresses. This contract must follow certain specifcations [which can be found here](../../developers/smart-contracts/external-whitelist-contract-example.md).

To ensure this contract is compliant, when it is deployed you can verify it is valid with the SSV Network read contract by calling `isWhitelisingContract()` with the contract address as the parameter.

After clicking the External Contract option, you will be brought to the following screen:

![config-operator](/img/configure-a-permissioned-operator-8.avif)

Enter a valid whitelisting contract address, click save, and you will be prompted to sign the transaction with your Web3 wallet.

![config-operator](/img/configure-a-permissioned-operator-9.avif)

This will be saved to the SSV Network contract.
