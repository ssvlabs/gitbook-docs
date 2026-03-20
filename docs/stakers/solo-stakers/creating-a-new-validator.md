---
description: Creating a New Validator
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a New Validator

## Introduction 

There are two ways to generate a new Validator:

- [**Vanilla Key Generation**](#vanilla-key-generation)

This way of key generation will result in `keystore` or validator key generation. The upside is increased control, since you will posses the key to your validator(s). This factor also increases chances of key theft, since security management can be tricky and if done incorrectly - can result in lost validator(s).

- [**Distributed Key Generation**](#distributed-key-generation)

This way of key generation will result in a new validator generated and distributed to SSV network operators. Since no validator key is generated in the process, this increases security of the operations. Your owner/withdrawal address will still be the owner of the generated validator(s).

## Vanilla Key Generation

### Prerequisites

* Confidence using the command line, and command line interfaces;
* ETH (or Hoodi ETH): 32 + ~0.1 for gas fees to activate the validator keys;
* Web3 wallet address that is secure enough to set as the withdrawal address for your validators.

### Generation Process

The best way to generate new validator key is by using Staking Deposit CLI tool. **Follow** [**EthStaker's official documentation**](https://deposit-cli.ethstaker.cc/landing.html) to finish this procedure in a secure way.

This process should result in generation of `keystore-m` and `deposit_data` files. Take note of their location, `deposit_data` will be needed during the next step.

:::danger Secure Storage
**Mnemonic phrase and password can be used to generate your validator(s), putting your funds at risk**. 

Make sure to store the mnemonic phrase and its password in a secure environment. This data cannot be recovered.
:::

Now that validator(s) were generated, you can **[Deposit Validator Keys](#deposit-validator-keys) to activate them**.

## Distributed Key Generation

Distributed Key Generation (DKG) ceremony described below allows to generate a set of KeyShares by directly communicating with the SSV Operators they have chosen. With this operation, the actual validator key is never created and no one will be able to have the full validator key in its entirety, just its parts, assigned to each chosen Operator.

### Prerequisites

* Confidence using the command line, and command line interfaces.
* ETH (or Hoodi ETH): 32 + ~0.1 for gas fees to activate the validator keys.
* [Docker installed](https://docs.docker.com/engine/install/) on the computer running the DKG Ceremony.

### Connect to the [Web App](https://app.ssv.network/)

Connect your Web3 wallet with [the SSV WebApp](https://app.ssv.network/). The address should be the one you want to manage your Validators with.

1. Select **Distribute a Validator** in the main menu.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-1.png" 
    alt="Deposit SSV" 
    style={{ width: '70%'}}
  />
</div>

2. Select **Generate new key shares**

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-2.png" 
    alt="Deposit SSV" 
    style={{ width: '70%'}}
  />
</div>

3. **Select operators**

Now, select operators to manage your validator. Please note the **Yearly Fee** for the setup you created before hitting the Next button.

Please make sure to use the _Filter_ button to **select DKG-enabled Operators**, like in the screenshot below:

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-3.png" 
    alt="Deposit SSV" 
    style={{ width: '100%'}}
  />
</div>

:::info Verified Operators
**Important:** Verified Operators (VOs) are operators that have been granted the **Verified** status by the DAO for completing KYC and providing consistent high-quality service. You can sort the operator list by their daily performance, yearly fee, and # of validators they manage. You can also filter to view only Verified Operators.
:::

4. Choose **Offline** option
DKG Ceremony can only be done via a command on a terminal.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-4.png" 
    alt="Deposit SSV" 
    style={{ width: '60%'}}
  />
</div>

5. **Key splitting**

- Select DKG option
- Choose the # of validators you wish to generate
- Set and Confirm the Withdrawal Address
- Copy the command that appeared in the last box

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-6.png" 
    alt="Deposit SSV" 
    style={{ width: '80%'}}
  />
</div>

Paste the copied command in your command line and generate the keys. Several files should be generated and placed in the directory where the command was launched from:

* `deposit-[validator_pubkey].json` -  this file contains the deposit data necessary activate the validator
* `keyshares-[validator_pubkey].json` - this file contains the keyshares necessary to [register the validator on the ssv.network](distributing-a-validator)

6. Following screen will show a checklist of next steps. You can safely close that page, if you can't keep it open.

Now that validator(s) were generated, you can **[Deposit Validator Keys](#deposit-validator-keys) to activate them**.

## Deposit Validator Keys

The simplest way to deposit keys is by using Ethereum Launchpad, links to it are below. **We recommend starting with Testnet** to ensure the process is clear, before using your actual funds:
- [Hoodi (Testnet) Ethereum Launchpad](https://hoodi.launchpad.ethereum.org/en/overview)
- [Mainnet Ethereum Launchpad](https://launchpad.ethereum.org/en/overview)

Steps to follow when using the Launchpad:
1. Read thoroughly each of the advisories and confirm;
2. Skip choice of Execution client;
3. Skip choice of Consensus client;
4. Provide your withdrawal address;
5. Type the amount of HoodiETH (or ETH) you want to stake;
6. Skip the rest of the page, press "Continue";
7. Upload your `deposit_data` file;
8. Connect your Web3 Wallet;
9. Read and acknowledge all of the associated risks warnings;
10. Proceed with depositing the validators in the list.

The deposit process itself will take from hours to days, depending on the [current entry queue](https://www.validatorqueue.com/).

You can track your validator's activation on the [BeaconCha.in website](https://beaconcha.in/), using your validator's pubkey.

## Next Steps

At this point, you should have your validators generated and deposited. To register your validators to SSV Network, follow the [**Onboarding a Validator**](./distributing-a-validator) page.