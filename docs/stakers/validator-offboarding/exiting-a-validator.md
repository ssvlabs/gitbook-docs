---
title: Exit Validators
sidebar_position: 1
---

# Exit Validators

:::warning Exit before removal
If you remove a validator first, you can no longer trigger the exit through SSV Network. In that case, you must exit it through [Ethereum Launchpad Actions](https://launchpad.ethereum.org/en/validator-actions) or by running another validator setup that can sign the exit message.
:::

#### 1. Connect your wallet

Connect the Web3 wallet that owns the cluster in the [Web App](https://app.ssv.network/).

#### 2. Open the cluster

On the [My Account page](https://app.ssv.network/clusters), select the active cluster.

![exit-validator](/img/exit-a-validator-1.png)

#### 3. Start the exit flow

On the cluster page, click **Actions** and select **Exit validators**.

![exit-validator](/img/exit-a-validator-2.png)

#### 4. Select the validators

Select the validators you want to exit by public key, then click **Next**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/exit-a-validator-3.png" 
    alt="Exit a validator" 
    style={{ width: '70%', maxWidth: '600px' }}
  />
</div>

#### 5. Review the warning and summary

:::warning
Exiting a validator tells Ethereum that you want to stop validating permanently and withdraw the staked principal once withdrawals are available.

After you submit the exit, the validator enters the Ethereum exit queue. Queue time depends on network conditions and may range from hours to days. Until the exit is fully processed, keep the validator active and keep the cluster funded so the validator can continue performing normally.
:::

This action sends a transaction to the [SSV Network smart contract](/developers/smart-contracts/ssvnetwork#exitvalidatorpublickey-operatorids). The selected operators then coordinate to sign and submit the voluntary exit on behalf of the validator owner.

![exit-validator](/img/exit-a-validator-4.png)

#### 6. Sign the transaction

Sign the transaction to confirm the exit request.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/exit-a-validator-5.png" 
    alt="Exit a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

#### 7. Wait for the exit to complete

After the transaction is confirmed, the validator is scheduled for exit on Ethereum.

Once the validator has fully exited, it will stop receiving duties. At that point, you can safely continue to [Remove Validators](removing-a-validator) without causing avoidable penalties.

The 32 ETH stake becomes withdrawable after the validator completes the exit and withdrawal process on Ethereum.
