---
title: Withdrawing ETH
sidebar_position: 3
---

# Withdrawing ETH from Cluster

You can withdraw excess ETH from your cluster balance at any time, as long as you maintain the minimum [liquidation collateral](../clusters/cluster-balance.md) required for your cluster.

### Connect your Web3 wallet to the WebApp

Make sure to connect your Web3 wallet with the WebApp, and that the address corresponds with the one you want to manage your Validators with.

:::info
**Note:** Your account is associated with your Web3 wallet.
:::

In the My Account page, select an active cluster and then click on the "Withdraw" button.

ETH_FEES_FILLER_TEXT

In the next screen, you'll be asked to enter the amount of ETH you want to withdraw. The maximum withdrawable amount is your cluster balance minus the required liquidation collateral.

ETH_FEES_FILLER_TEXT

Once you enter the amount, click on the _Withdraw_ button.

ETH_FEES_FILLER_TEXT

The page will submit a transaction to the SSV Network smart contract. Check your Web3 wallet to confirm.

ETH_FEES_FILLER_TEXT

Now, finalize the withdrawal by signing the transaction.

ETH_FEES_FILLER_TEXT

You'll be taken back to the Cluster page, where the balance will be updated, and the withdrawn ETH will be sent to your wallet.

ETH_FEES_FILLER_TEXT

:::warning Liquidation Risk
Only withdraw excess balance beyond the liquidation collateral. Withdrawing too much may put your cluster at risk of liquidation if fees accumulate faster than expected.
:::

