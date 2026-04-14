---
title: Configuring a Permissioned Operator
sidebar_position: 5
---

# Configuring a Permissioned Operator

### Introduction
**There are 3 independent permissioned settings**:

* [Set operator status, Public or Private](#updating-your-operator-status)
* [Assign whitelisted addresses](#addingremoving-authorized-addresses)
* [External smart contract to control whitelisted addresses](#adding-an-external-contract)

For example, you can set whitelisted addresses _before_ changing the Operator status to Private. For more background, [see use cases](/learn/network-overview/operators/permissioned-operators#use-cases).

---

Connect the Web3 wallet you used to register the Operator in the [Web App](https://app.ssv.network/).

1. Browse to the [My Account page](https://app.ssv.network/operators) and **select the Operator you want to update**.

![config-operator](/img/configure-a-permissioned-operator-1.png)

2. Click the three vertical dots in the top-right corner, then choose **_Permission Settings_**.

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

In this example, the Operator is being changed to Private.

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

After the transaction is confirmed, the new setting is live.

To change the Operator back to Public, follow the same steps and turn the toggle off.

### Adding/Removing Authorized addresses

3. **Click on the _Authorized Addresses_ option** from the Permission Settings list

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-3.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

4. **Enter an address to whitelist**

The example shows how to add one authorized address to the Operator. When ready, click **"Add Address"** and confirm the transaction in your wallet.

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

You can also add your own whitelisting contract to manage authorized addresses. **The contract must [follow these specifications]**(/developers/smart-contracts/external-whitelist-contract-example).

3. **Click on the _External Contract_ option** from the Permission Settings list

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-3.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

4. **Enter your whitelisting contract**

Enter a valid whitelisting contract address and click save.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-8.png" 
    alt="Switch to private" 
    style={{ width: '80%', maxWidth: '800px' }}
  />
</div>

5. **Sign the transaction**

You will be prompted to sign the transaction in your wallet. The change is saved to the SSV Network contract.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/configure-a-permissioned-operator-7.png" 
    alt="Switch to private" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>
