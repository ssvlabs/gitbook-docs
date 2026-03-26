---
sidebar_position: 4
---

# Set Fee Recipient

The default setting for all validators in a given account is to send execution layer rewards to the owner address. This page explains how to change this.

For more information on this topic, please refer to [the dedicated learning page](/learn/network-overview/validators/validator-rewards).

:::warning Please Note
This procedure will set the fee recipient address for **block proposal rewards for validators in all your clusters**.
:::

1. **Connect Web3 Wallet**

Connect your Web3 wallet with the [WebApp](https://app.ssv.network/). Use the address you registered your validators with.

2. In the Validator Clusters dashboard under My Account page, **click on the Fee Address button**:

![Distribute a validator](/img/fee-recipient-1.avif)

3. **Click on the pencil icon** next to the address:

![Distribute a validator](/img/fee-recipient-2.avif)

4. **Enter the address of the wallet**, then click _Update_

This address will receive rewards for all your validators.

![Distribute a validator](/img/fee-recipient-3.avif)

5. **Sign the transaction**

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/fee-recipient-4.png" 
    alt="Distribute a validator" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

Once the transaction has been signed and confirmed by the network, the fee recipient address for block proposal rewards will be correctly set for all your validators.
