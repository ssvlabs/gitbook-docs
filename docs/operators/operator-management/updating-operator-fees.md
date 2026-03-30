---
title: Updating Operator Fees
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Updating Operator Fees

Connect the same wallet you used to register the Operator in the [Web App](https://app.ssv.network/).

1. Browse to the [My Account page](https://app.ssv.network/operators) and **select the Operator you want to update**.

![update-fee](/img/update-operator-fees-1.png)

2. **Click on the _Update Fee_ button** at the bottom left.

![update-fee](/img/update-operator-fees-2.png)

**At this point, you can either** increase the fee or decrease the fee.

<Tabs>
  <TabItem value="increase" label="Increasing Operator fee">

### Increasing Operator fee

3. **Enter a new fee** and click _Next_.

**Please note:** The protocol [limits fee increases](/learn/network-overview/operators/update-fee). You can click _Max Fee_ to use the current limit.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-3.png" 
    alt="Declare fee update" 
    style={{ width: '60%', maxWidth: '700px' }}
  />
</div>

4. **Acknowledge the procedure's steps**

The procedure is divided in three steps:
* Fee update declaration
* Waiting period
* Fee update execution

5. **Click on _Declare Fee_**.

This step declares the new fee.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-4.png" 
    alt="Declare fee update" 
    style={{ width: '60%', maxWidth: '700px' }}
  />
</div>

6. **Sign the transaction** to declare new fee.

You need to submit and confirm a transaction to declare the fee update.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-5.png" 
    alt="Declare fee update" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

7. **Waiting period**.

Then a waiting period gives all validators using this Operator time to learn about the fee update.

You can cancel the fee update at any time, but you must wait for the waiting period to end before you can _Execute_.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-6.png" 
    alt="Declare fee update" 
    style={{ width: '60%', maxWidth: '600px' }}
  />
</div>

8. **Execute fee update**.

**After the waiting period ends**, return to this page and confirm the _Execution_ of the fee update.

  </TabItem>
  <TabItem value="Decrease" label="Decreasing Operator fee">

### Decreasing Operator fee

There are no protocol limits on decreasing the Operator fee because it benefits Stakers. **Please note** that if the fee is reduced to 0, it can never be increased again.

3. **Enter the new fee** and click _Next_.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-7.png" 
    alt="Declare fee update" 
    style={{ width: '60%', maxWidth: '600px' }}
  />
</div>

4. Read the summary and **click on the _Update Fee_ button**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-8.png" 
    alt="Declare fee update" 
    style={{ width: '60%', maxWidth: '600px' }}
  />
</div>

5. **Sign the transaction**.

When you click _Update Fee_, the Web App creates a smart contract transaction. Open your wallet if needed and confirm the transaction.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-9.png" 
    alt="Declare fee update" 
    style={{ width: '40%', maxWidth: '500px' }}
  />
</div>

6. **Done!**

Once the transaction is confirmed, the change takes effect. 

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/update-operator-fees-10.png" 
    alt="Declare fee update" 
    style={{ width: '60%', maxWidth: '600px' }}
  />
</div>

  </TabItem>
</Tabs>
