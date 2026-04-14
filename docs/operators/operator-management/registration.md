---
title: Registering an Operator
sidebar_position: 1
---

[After successfully running an SSV Node](/operators/operator-node/node-setup), you must register your Operator on SSV Network before validators can discover it. You can register through the [Web App](https://app.ssv.network) or by sending a transaction directly to the [smart contract](/developers/smart-contracts/ssvnetwork#registeroperatorpublickey-fee-setprivate).

### Prerequisites

To register your Operator, prepare the following:

* [Operator public key](/operators/operator-node/node-setup) - generated during node installation
* [Operator fee](/learn/tokenomics/fees) - the fee charged per every 32 ETH managed

## Registering an Operator on the Web App

:::warning Double check key and address
**The Operator key and owner address cannot be changed**. Verify that the owner address matches the wallet you want to use to manage this Operator.
:::

1. In the [My Account page](https://app.ssv.network/clusters), **choose "Register Operator"**

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-1.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '700px' }}
  />
</div>

2. Select **Join as Operator**.

3. **Provide the public key**
Enter the Operator public key, which you can find in the private key file, and confirm the Operator owner address.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-2.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '650px' }}
  />
</div>

Also choose whether the Operator should be **Public** or **Private**. To learn more, see [permissioned operators](/learn/network-overview/operators/permissioned-operators#what-are-permissioned-operators).

4. **Set the Operator Fee**

You can update the Operator fee later, subject to [protocol limits that protect Stakers](/learn/network-overview/operators/update-fee).

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-3.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '650px' }}
  />
</div>

5. **Confirm operator details**

This screen shows a summary of the details you entered. **Review everything**, then click _Register Operator_.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-4.png" 
    alt="Register an operator" 
    style={{ width: '70%', maxWidth: '700px' }}
  />
</div>

6. **Sign the transaction** to finalize registration

The Web App updates while the network confirms the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-5.png" 
    alt="Register an operator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

7. **Done!**

Your Operator is now registered and can be selected by Stakers.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-6.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '650px' }}
  />
</div>
