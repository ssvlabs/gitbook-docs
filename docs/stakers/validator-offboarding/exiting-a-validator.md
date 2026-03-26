---
title: Exit Validators
sidebar_position: 1
---

# Exit Validators

:::warning Please note
If the validator is removed first, the following operations won't be possible. In such case, the validator will have to be exited via [Ethereum Launchpad Actions](https://launchpad.ethereum.org/en/validator-actions) or by running a traditional validator stack and have it sign an exit message.
:::

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

1. In the [My Account page](https://app.ssv.network/clusters), **select an active cluster**.

![exit-validator](/img/exit-a-validator-1.png)

2. In the Cluster page, **tap the Actions button** on top of the validators table **and select Exit validators**.

![exit-validator](/img/exit-a-validator-2.png)

3. In the following screen, s**elect the validators you want to exit**, based on their public key. When ready, press the _Next_ button.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/exit-a-validator-3.png" 
    alt="Exit a validator" 
    style={{ width: '70%', maxWidth: '600px' }}
  />
</div>

4. **Summary and confirmation**.

:::warning
Exiting your validator signals to the network that you wish to **permanently cease your validator's participation** in the Beacon Chain and retrieve your 32 ETH stake principal.

Initiating an exit places your validator in the exit queue. The duration in the queue depends on the number of validators already waiting. During this period, your validator must remain active, so it is crucial to maintain your validator's performance and keep it registered with the SSV network until it has fully exited.
:::

This operation will generate a transaction to the [SSV Network smart contract](/developers/smart-contracts/ssvnetwork.md#exitvalidatorpublickey-operatorids), and will make sure that the operators in the cluster will sign and execute a voluntary exit of the specified validator(s), on behalf of the validator owner.

![exit-validator](/img/exit-a-validator-4.png)

5. Now, **sign the transaction** to finalize the validator exit.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/exit-a-validator-5.png" 
    alt="Exit a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

6. Await the validator exit queue.

Once the transaction has been signed and confirmed by the network, **your validator will be successfully scheduled to be exited from the beacon chain**.

In a short time, dictated by the lenght of the exit queue on the beacon chain (this can vary from a few hours to a few days) it will no longer be considered for validator duties, and can be safely [removed from SSV network](removing-a-validator), without incurring in penalties.

The 32 ETH stake will be available for withdrawal after a short period of time after this.
