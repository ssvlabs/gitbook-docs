---
title: Remove Validators
sidebar_position: 2
---

# Remove Validators

:::warning Exit first
If you remove a validator before it has been [exited](exiting-a-validator), you cannot exit it later through SSV Network. In that case, you must use [Ethereum Launchpad Actions](https://launchpad.ethereum.org/en/validator-actions) or another validator setup that can sign the exit message.
:::

#### 1. Connect your wallet

Connect the Web3 wallet that owns the cluster in the [Web App](https://app.ssv.network/).

#### 2. Open the cluster

Connect the owner Web3 wallet in the Web App and open the active cluster from the [My Account page](https://app.ssv.network/clusters).

![remove-validator](/img/remove-a-validator-1.png)

#### 3. Start the removal flow

On the cluster page, click **Actions** and select **Remove Validator**.

![remove-validator](/img/remove-a-validator-2.png)

#### 4. Select the validators

Select the validators you want to remove by public key, then click **Next**.

![remove-validator](/img/remove-a-validator-3.png)

#### 5. Review the warning

:::danger
Removing a validator makes it go offline on SSV Network immediately. Removal is not reversible. To use the validator on SSV Network again later, you must register it again.

If the validator has **not** fully exited yet, removing it early can leave it offline while it is still active on Ethereum, which can lead to penalties.
:::

If you are ready, acknowledge the warning and click **Remove Validator**.

![remove-validator](/img/remove-a-validator-4.png)

#### 6. Sign the transaction

Sign the transaction to confirm removal.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/remove-a-validator-5.png" 
    alt="Remove a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

#### 7. Confirm the result

After the transaction is confirmed, the validator is removed from the cluster and is no longer handled by operators on SSV Network.
