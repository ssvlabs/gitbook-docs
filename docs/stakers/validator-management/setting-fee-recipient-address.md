# Setting fee recipient address

### Connect your Web3 wallet to WebApp.

The default setting for all validators in a given account is to send execution layer rewards to the owner address. This page explains how to change this.

:::danger
This procedure will set the fee recipient address for block proposal rewards **for all your validators**.
:::

For more information on this topic, please refer to [the dedicated learning page](../../stakers/validators/validator-rewards.md).

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

In the Validator Clusters dashboard under My Account page, click on the Fee Address button:

![Distribute a validator](/img/fee-recipient-1.avif)

In the next screen, click on the pencil icon next to the address:

![Distribute a validator](/img/fee-recipient-2.avif)

Enter the address of the wallet you want to receive rewards for all your validators, then click on Update:

![Distribute a validator](/img/fee-recipient-3.avif)

Confirm and sign the transaction from your Web3 wallet (Metamask in the example):

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/fee-recipient-4.png" 
    alt="Distribute a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

Once the transaction has been signed and confirmed by the network, the fee recipient address for block proposal rewards will be correctly set for all your validators.
