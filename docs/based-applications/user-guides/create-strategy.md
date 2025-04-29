---
sidebar_label: 'Create a Strategy'
sidebar_position: 1
---

# How to Create a Strategy 

Strategies are used to secure Based Applications, the most common use cases of bApps [are described on this page](../learn/based-applications/use-cases.md).

Strategies are often created by node operators that want to engage with bApps and earn rewards for securing them. You can read more [about the Rewards for securing bApps](../learn/ssv2.0-a-based-applications-protocol/ultra-sound-ssv/rewards.md).

## 1. Go to Strategies page

Navigate to the [SSV Webapp](https://app.stage.ssv.network/account/my-delegations), login with your chosen wallet and click on Strategies.

This page will display a list of the Strategies you already created. 

<div style={{ textAlign: 'center' }}>
  <img src="/img/create-strategy-1.png" alt="" />
</div>

## 2. Create Strategy

Once you clicked on "Create Strategy" you will see a list of available bApps you can choose from. 

In this example, we will skip this step and choose "I'll do it later" on the bottom of the page.

<div style={{ textAlign: 'center' }}>
  <img src="/img/create-strategy-2.png" alt="" />
</div>

## 3. Set Fee and Obligations

You will be prompted to set the Obligations and the Fees for your strategy. If you did not choose any bApp on the previous step, the Obligations step will be skipped and you will go to the "Set Fee" stage.

Enter an amount for your Fee, and click the Continue button.

<div style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
  <img src="/img/create-strategy-3.png" alt="" />
</div>

## 4. Provide Metadata

Metadata for your Strategy and your Account will have to be set with `.json` files.

Here is how the example metadata file for Strategy looks like:
```json
{
    "name": "My Strategy",
    "description": "A description about my strategy."
}
```

And for the Account metadata we used:
```json
{
    "name": "My Account",
    "logo": "https://my-hosted-account.com/image.png"
}
```

Once you provided URI to those files, you will see that information on the page.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/create-strategy-4.png" alt="" />
</div>

After you verified the information, click on Continue.

## 5. Sign transactions

To create your Strategy you will need to sign 2 transactions.

The first one is to register your Strategy.

<div style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
  <img src="/img/create-strategy-5.png" alt="" />
</div>

After the first one is completed, another pop-up will appear to sign Registration of your Account Metadata. 

<div style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
  <img src="/img/create-strategy-6.png" alt="" />
</div>


## 6. Check the created Strategy

Once both of the transactions are completed, you will be redirected to the page of your newly created Strategy.

You can now [Deposit Funds to your strategy](./deposit-to-strategy.md).