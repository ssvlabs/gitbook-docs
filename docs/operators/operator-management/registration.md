---
title: Registering an Operator
sidebar_position: 1
---

[After successfully running an SSV node](/operators/operator-node/node-setup), an operator must register it to the SSV Network in order to be discoverable by validators. You can register your operator through the SSV network [web app](https://app.ssv.network) or via a transaction directly to the [smart contract](/developers/smart-contracts/ssvnetwork#registeroperatorpublickey-fee-setprivate)

### Prerequisites

While registering your operator you will need to provide the following parameters:

* [Operator public key](/operators/operator-node/node-setup) - Part of the private key, generated in the node installation process
* [Operator fee](/learn/tokenomics/fees) - The fee charged by the operator per each managed validator

## Registering an Operator on the WebApp

:::info Owner Wallet
The wallet address used to register the operator is the only address that will hold management permissions for it.
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

3. **Provide Public key**
Input the Operator's public key (can be found at the end of private key file) and provide a confirmation of the Operator owner address.

:::warning Double check key and address
**Operator key and owner address can not be changed**. Please verify once more that the owner address correspond to the wallet address you want to manage your operators with.
:::

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-2.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '650px' }}
  />
</div>

Additionally, you should **choose between Public and Private** operator modes. [Refer to this page to learn](/learn/network-overview/operators/permissioned-operators#what-are-permissioned-operators) more about these statuses.

4. **Set the Operator Fee**

Know that it will be possible to update the Operator fees later, [with limitations imposed by the protocol, to protect stakers](/learn/network-overview/operators/update-fee). For more information about fees in general, please [head over to the related page](/learn/tokenomics/fees).

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-3.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '650px' }}
  />
</div>

5. **Confirm operator details**

This confirmation screen presents a recap of the information input so far. Double check everything and click _Register Operator_ when ready.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-4.png" 
    alt="Register an operator" 
    style={{ width: '70%', maxWidth: '700px' }}
  />
</div>

6. **Sign the transaction** to finalize registration

The WebApp will update, waiting for the transaction to be confirmed by the network.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-5.png" 
    alt="Register an operator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

7. **Done!**

Congratulations, your Operator is successfully registered, and stakers could now choose it to operate their validators.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-6.png" 
    alt="Register an operator" 
    style={{ width: '80%', maxWidth: '650px' }}
  />
</div>