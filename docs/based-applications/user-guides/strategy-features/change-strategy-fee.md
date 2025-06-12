---
sidebar_label: 'Change Strategy Fee'
sidebar_position: 2
---

# Change Strategy Fee

## 1. Open Strategy page

Open the [SSV Web App My Account page](https://app.ssv.network/account/my-strategies) and click on Strategies. Click on your strategy to open it's page.

On a Strategy's page you will find "Edit Strategy" button and "Change Fee" in the dropdown list.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/change-strategy-fee-1.png" alt="" />
</div>

## 2. Set your new Fee

You will be prompted to change the Fee in the opened window.

As description says: `Reducing your strategy fee is immediate, increasing is done in a few steps`. You can only increase the Fee by 5% at a time and you will have to wait for **pending period (7 days)**.

In this example we increase the Fee from 34.97% to 39.97%, which is the maximum allowed. Once the fee is chosen click on "Request Fee Change".

<div style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
  <img src="/img/change-strategy-fee-2.png" alt="" />
</div>

## 3. Sign transaction

You will be prompted to sign a transaction for *requesting* the fee change. Sign the transaction and wait until its executed on chain.

<div style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
  <img src="/img/change-strategy-fee-3.png" alt="" />
</div>

## 4. Wait until pending period is over

On the Strategy's page you can see how much time is left until the pending period is over (7 days).

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/change-strategy-fee-4.png" alt="" />
</div>

## 5. Finalzie the Fee change

:::warning Please note 
You have to finalize the change in 1 day after the pending period is over. If you will miss that window of time, the request will be expired and you will need to start over.
:::

Once the pending period is over, you can finalize the Fee change.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/change-strategy-fee-5.png" alt="" />
</div>

Click on the green arrow next to the new fee % and a window will pop up. 

<div style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
  <img src="/img/change-strategy-fee-6.png" alt="" />
</div>

## 6. Sign transaction and Verify the changes

You will be prompted to sign a transaction for *finalizing* the fee change. Sign the transaction and wait until its executed on chain.

Once the transaction is executed, you will be redirected to the Strategy's page where you can see the updated Fee.