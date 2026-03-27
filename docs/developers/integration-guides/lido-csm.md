---
sidebar_position: 4
---

import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Lido CSM

Lido's Community Staking Module (CSM) lets community stakers run validators through Lido in a permissionless way. You can combine it with SSV Network to add DVT to CSM.

This guide walks through how to create validator keys, register them on SSV Network with SSV operators, and post the bond through CSM to activate the validator.

:::info
This page has been written for mainnet CSM. **If you want to try it on testnet first** you can use these parameters for the withdrawal and execution layer addresses:

* Lido CSM testnet page: [https://csm.testnet.fi/](https://csm.testnet.fi/)
* Lido Withdrawal Vault on Hoodi: [`0x4473dCDDbf77679A643BdB654dbd86D67F8d32f2`](https://hoodi.etherscan.io/address/0x4473dCDDbf77679A643BdB654dbd86D67F8d32f2)
* Lido Execution Layer Rewards Vault on Hoodi: [`0x9b108015fe433F173696Af3Aa0CF7CDb3E104258`](https://hoodi.etherscan.io/address/0x9b108015fe433F173696Af3Aa0CF7CDb3E104258)
:::

### Key conditions for validators registered to CSM

Lido requires a bond, but Lido handles the validator deposit and activation. Because of this:

* **You must set the withdrawal address to** [**the Lido Withdrawal Vault**](https://etherscan.io/address/0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f).
* **You must [set the fee recipient address](/stakers/cluster-management/setting-fee-recipient-address) to** [**the Lido Execution Layer Rewards Vault**](https://etherscan.io/address/0x388C818CA8B9251b393131C08a736A67ccB19297).

These two conditions are necessary and cannot be omitted.


Changing the fee recipient in SSV applies to **all validators owned by that account**. If you already have CSM validators, or plan to register validators outside CSM later, use a separate account. Otherwise, you will effectively **send execution rewards to Lido** instead of keeping them yourself.


### Prerequisites 

* More than 2 ETH for the CSM bond and transaction gas.
* SSV tokens to register your validator on SSV Network.
* A new account or wallet that does not already have validators registered with SSV, because you need to set the fee recipient to Lido's address.

### 1. Creating validator keys

Validator keys for the CSM module are created the same way as any other validator keys, with one important difference: **you must set the withdrawal address to** [**the Lido Withdrawal Vault**](https://etherscan.io/address/0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f).

For this step, follow the [validator key generation guide](/stakers/solo-stakers/creating-a-new-validator), and make sure the withdrawal address is set to:

```
0xB9D7934878B5FB9610B3fE8A5e441e8fad7E293f
```

You only need to generate the keys at this stage, not activate them. Follow the process until both the `deposit` and `keystore` JSON files have been generated and saved locally.



Make sure you keep the keystore password you used to generate these keys.


### 2. Register the validator with SSV

To register your validator with SSV Network, follow [the related guide in this documentation](/stakers/solo-stakers/distributing-a-validator). The process is the same for a CSM validator. Have your keystore file and password ready.

Move to the next step once your validator is registered to a cluster.


### 3. Set the Fee Recipient 

As noted above, Lido requires every validator registered to CSM to use the Lido Execution Layer Rewards Vault as the fee recipient.

This setting applies at the account level. If you do not want other non-CSM validators to be affected, stop here and use a different account.

Once the cluster is in place, set the fee recipient in the web app. Open the cluster management tab, then use the "Fee Address" button in the top-right corner to set the fee address.


In the following screen, set the address to this value:

```
0x388C818CA8B9251b393131C08a736A67ccB19297
```

Enter the address, click **Update**, and sign the transaction with your wallet.


### 4. Deposit bond on Lido CSM 

The final step is to deposit the 2 ETH bond to Lido together with the validator deposit data so the validator enters the activation queue. Lido supplies the 32 ETH required for activation.

Browse to [https://csm.lido.fi/](https://csm.lido.fi/) and connect your wallet.

At this point, you will need the `deposit.json` file [generated in step 1](#1-creating-validator-keys).

Open the file, copy its contents, and paste them into the **Upload deposit data** field.


Then click **Submit** and sign the transaction to deposit 2 ETH.


Once the transaction is complete, go to the **View Keys** section of the CSM website to confirm it succeeded.


This completes the process. You now need to wait for your validator to be activated, which may take time depending on the queue size.

#### Validator activation queue

To check your validator status, use the following link and replace the placeholder with the validator public key you want to monitor:

<InlineEditableCodeBlock
  template='
  https://beaconcha.in/validator/{{VALIDATOR_PUBKEY}}
  '
  variables={{
    VALIDATOR_PUBKEY: '0x...',
  }}
/>

Once the validator is activated, the SSV operators you selected in step 2 will perform validator duties for you.
