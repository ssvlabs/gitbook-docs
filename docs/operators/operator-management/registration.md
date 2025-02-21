---
title: Registering an Operator
sidebar_position: 1
---

:::warning
For information on how to set up and run an SSV Node, please [visit the dedicated page](/operators/operator-node/node-setup).
:::

After successfully running an SSV node, an operator must register it to the SSV Network in order to be discoverable by validators.

You can register your operator through the SSV network [web app](https://app.ssv.network) or via a transaction directly to the [smart contract](/developers/smart-contracts/ssvnetwork.md#registeroperatorpublickey-operatorfee-setprivate)

While registering your operator you will need to provide the following parameters:

* [Operator public key](/operators/operator-node/node-setup) - Generated in the node installation process (base64 format)
* [Operator fee](../../learn/protocol-overview/tokenomics/fees) - The fee charged by the operator per each managed validator

:::info
The wallet address used to register the operator is the only address that will hold management permissions for it.
:::

## Registering an Operator on the WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Operators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

If you are connecting for the first time, you should see a screen like the image below:

![register-operator](/img/register-an-operator-1.avif)

Please select _Join as Operator._

In the following screen, select _Register Operator_ (just make sure [that you followed the guide on Node setup](/operators/operator-node/node-setup) and that your SSV Node is running).

![register-operator](/img/register-an-operator-11.avif)

The next screen will ask you to input the Operator's public key (refer to [the Node setup guide](/operators/operator-node/node-setup) for key generation) and provide a confirmation of the Operator owner address.

Here you will also have to choose whether your Operator status is either [public or private](/operators/operator-onboarding/permissioned-operators).

:::warning
Please verify once more that the owner address correspond to the wallet address you want to manage your operators with.
:::

Click _Next_ when ready.

![register-operator](/img/register-an-operator-2.png)

In the following screen, shown below, you are being asked to set the Operator Fee.

For more information about fees, please [head over to the related page](../../learn/protocol-overview/tokenomics/fees). Just know that it will be possible to update the Operator fees later, [with limitations imposed by the protocol, to protect stakers](/operators/operator-onboarding/update-fee), for a guide on how to do that, head over to [the dedicated page](/operators/operator-management/updating-operator-fees).

Enter a number and click _Next_ when ready.

![register-operator](/img/register-an-operator-3.avif)

This confirmation screen presents a recap of the information input so far. Double check everything and click _Register Operator_ when ready.

![register-operator](/img/register-an-operator-4.avif)

The WebApp will generate a blockchain transaction, make sure to open your Web3 wallet, if it does not automatically and confirm the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/register-an-operator-5.png" 
    alt="Register an operator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

The WebApp will update, waiting for the transaction to be confirmed by the network.

![register-operator](/img/register-an-operator-6.avif)

Congratulations, your Operator is successfully registered, and stakers could now choose it to operate their validators.

![register-operator](/img/register-an-operator-7.avif)