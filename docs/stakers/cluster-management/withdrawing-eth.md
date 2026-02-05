---
title: Withdraw ETH
sidebar_position: 3
---

# Withdrawing ETH from Cluster

You can withdraw excess ETH from your cluster balance at any time, as long as you maintain the minimum [liquidation collateral](/stakers/clusters/cluster-balance.md) required for your cluster.

:::warning Liquidation Risk
Only withdraw excess balance beyond the liquidation collateral. Withdrawing too much may put your cluster at risk of liquidation if fees accumulate faster than expected.
:::

#### 1. Connect Web3 Wallet

Connect your Web3 wallet with the [WebApp](https://app.ssv.network/), use the same address used for validator registration.

#### 2. Choose the Cluster

In the My Account page, select an active cluster and then click on the "Withdraw" button.

![Withdraw ETH from the cluster balance](/img/withdraw-eth-2.png)

#### 3. Enter the Amount

In the next screen, you'll be asked to enter the amount of ETH you want to withdraw. If you want to withdraw everything from the cluster balance — you will have to accept Liquidation warnings.

Once you enter the amount, click on the _Withdraw_ button.

![Withdraw ETH from the cluster balance](/img/withdraw-eth-3.png)

#### 4. Sign transaction

The page will submit a transaction to the SSV Network smart contract. Finalize the withdraw from the Cluster by signing the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/deposit-eth-4.png" 
    alt="Withdraw ETH from the cluster balance" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

#### 5. Withdraw Complete

You'll be taken back to the Cluster page, where the balance will be updated with the withdrawn amount. And the withdrawn ETH will be sent to your wallet.