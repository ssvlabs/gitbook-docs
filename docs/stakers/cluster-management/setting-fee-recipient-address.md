---
sidebar_position: 3
---

# Set Fee Recipient

:::warning Applies to all validators in the account
This updates the fee recipient address for execution-layer block rewards across all validators owned by this account.
:::

By default, execution-layer rewards are sent to the owner address. For more context, see [Validator Rewards](/learn/network-overview/validators/validator-rewards).

#### 1. Connect your wallet

Connect the Web3 wallet that owns the validators in the [Web App](https://app.ssv.network/).

#### 2. Open the fee address settings

On the [Clusters page](https://app.ssv.network/clusters), click **Fee Address**.

![Distribute a validator](/img/fee-recipient-1.png)

#### 3. Enter the address

Enter the new destination wallet address and click **Update**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/fee-recipient-2.png" 
    alt="Set fee recipient" 
    style={{ width: '70%', maxWidth: '700px' }}
  />
</div>

#### 4. Sign the transaction

Sign the transaction to apply the change.

After the transaction is confirmed, the new fee recipient address is used for block proposal rewards for all validators in the account.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/fee-recipient-3.png" 
    alt="Set fee recipient" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>
