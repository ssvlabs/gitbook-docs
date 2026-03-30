---
title: Removing an Operator
sidebar_position: 6
---

:::danger Irreversible Changes
This process is irreversible. Removed Operators cannot be reactivated or re-registered in the future. Read more in the [Learn section](/learn/network-overview/operators/offboarding).

Trying to register an Operator again with the same private key will fail. If you need a new Operator, generate a new key first.
:::

Connect the same wallet you used to register the Operator in the [Web App](https://app.ssv.network/).

1. Browse to the [My Account page](https://app.ssv.network/operators) and **select the Operator you want to update**.

![remove-operator](/img/remove-an-operator-1.png)

2. Click on the three vertical dots on the top-right corner. From the dropdown, **choose the _Remove Operator_ option**.

![remove-operator](/img/remove-an-operator-2.png)

3. **Acknowledge the warnings**

The screen provides information about the consequences of this action and asks for a confirmation by ticking a checkbox. To confirm, click on the _Remove Operator_ button.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/remove-an-operator-3.png" 
    alt="Remove an operator" 
    style={{ width: '70%', maxWidth: '800px' }}
  />
</div>

4. **Sign the transaction** to finalize removal

The Web App creates a smart contract transaction. Open your wallet if needed and confirm the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/remove-an-operator-4.png" 
    alt="Remove an operator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

5. **Done!**

Once the transaction is confirmed, the Operator is removed from SSV Network.

![remove-operator](/img/remove-an-operator-5.png)
