---
title: Configuring a Permissioned Operator
sidebar_position: 5
---

# Configuring a Permissioned Operator

### Introduction
**There are 3 independent settings** of a permissioned operator: 

* [Set operator status, Public or Private](#updating-your-operator-status)
* [Assign whitelisted addresses](#addingremoving-authorized-addresses)
* [External smart contract to control whitelisted addresses](#adding-an-external-contract)

For example, one can set whitelisted addresses _before_ changing the operator status to be private. You can read more about [Use Cases in our Learn section](/learn/network-overview/operators/permissioned-operators#use-cases).

---

Make sure to connect your Web3 wallet with [the WebApp](https://app.ssv.network/). The address should be the same you used to register your operator with.

1. Browse to the [My Account page](https://app.ssv.network/operators) and **select the Operator you want to update**.

![config-operator](/img/configure-a-permissioned-operator-1.png)

2. Click on the three vertical dots on the top-right corner, from the dropdown, **choose the _Permission Settings_**.

![config-operator](/img/configure-a-permissioned-operator-2.png)

### Updating your Operator Status

3. **Choose _Operator Status_** from the list.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-3.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>
4. **Switch your Operator Status**

In our example, we will be switching the operator to Private.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-4.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

5. **Sign the transaction**

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-5.png" 
    alt="Switch to private" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

6. **Done!**

Once the transaction is signed, you will only need to wait for the blockchain to validate it, and the settings will be live.

To change your operator status back to public, follow the same steps and turn the flag off again.

### Adding/Removing Authorized addresses

3. **Click on the _Authorized Addresses_ option** from the Permission Settings list

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-3.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

4. **Input an Address to whitelist**

Here we're adding one authorized addresses to this operator. **Once done, click "Add Address"** to sign the transaction with your web3 wallet.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-6.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

5. **Sign the transaction**

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-7.png" 
    alt="Switch to private" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

### Adding an External Contract

SSV also gives you the option to add your own whitelisting contract for managing authorized addresses. **This contract must follow [certain specifcations which can be found here]**(/developers/smart-contracts/external-whitelist-contract-example).

3. **Click on the _External Contract_ option** from the Permission Settings list

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-3.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

4. **Input your whitelisting contract**

Enter a valid whitelisting contract address, click save, and 

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-8.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

5. **Sign the transaction**

You will be prompted to sign the transaction with your Web3 wallet. This will be saved to the SSV Network contract.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-7.png" 
    alt="Switch to private" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>