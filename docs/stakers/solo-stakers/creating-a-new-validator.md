---
description: Creating a New Validator
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a New Validator

There are two ways to create a validator for SSV Network:
- **Vanilla key generation** - if you want to generate and hold the validator keystore yourself.
- **Distributed key generation** - if you want the validator key to be generated as distributed shares without ever creating the full validator private key in one place.

<Tabs>
  <TabItem value="vanilla" label="Vanilla Key Generation">

## Vanilla Key Generation

This flow generates standard validator files such as `keystore-m...json` and `deposit_data...json`.

### Prerequisites

- Be comfortable using the command line.
- Have 32 ETH per validator, plus extra ETH for gas.
- Prepare a secure Web3 wallet address to use as the withdrawal address.

### Generate the validator keys

The recommended tool is the Staking Deposit CLI. Follow the [EthStaker Deposit CLI guide](https://deposit-cli.ethstaker.cc/landing.html) and complete the full process in a secure environment.

At the end of the flow, you should have:
- one or more `keystore-m...json` files
- a `deposit_data...json` file

Record where these files are stored. You will need the `deposit_data` file in the next step.

:::danger Secure storage
Your mnemonic and password can be used to recover the validator keys. If they are exposed, your funds may be at risk.

Store the mnemonic and password securely. They cannot be recovered if lost.
:::

When the validator files are ready, continue to [Deposit Validator Keys](#deposit-validator-keys).

  </TabItem>
  <TabItem value="DKG" label="Distributed Key Generation">

## Distributed Key Generation

The DKG flow creates validator key shares directly with the selected SSV Network operators. The full validator private key is never assembled in one place.

This improves key security, while your owner or withdrawal address still remains the owner of the validator.

### Prerequisites

- Be comfortable using the command line.
- Have 32 ETH per validator, plus extra ETH for gas.
- Install [Docker](https://docs.docker.com/engine/install/) on the machine that will run the DKG ceremony.

### Connect to the Web App

Connect the Web3 wallet you want to use as the validator owner in the [SSV Web App](https://app.ssv.network).

1. Select **Distribute a Validator**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-1.png" 
    alt="Create a new validator" 
    style={{ width: '60%'}}
  />
</div>

2. Select **Generate new key shares**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-2.png" 
    alt="Create a new validator" 
    style={{ width: '60%'}}
  />
</div>

3. Select the operators.

Review the **Yearly Fee** before you continue. Use the filter to show **DKG-enabled operators**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-3.png" 
    alt="Create a new validator" 
    style={{ width: '100%'}}
  />
</div>

:::info Verified Operators
[Verified Operators (VOs)](/learn/network-overview/operators/verified-operators) are operators that the DAO has marked as **Verified** after KYC and ongoing service review. You can sort and filter the list by performance, yearly fee, validator count, and verified status.
:::

4. Choose **Offline**.

The DKG ceremony is run from the command line.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-4.png" 
    alt="Create a new validator" 
    style={{ width: '60%'}}
  />
</div>

5. Configure the DKG ceremony.

- Select the **DKG** option.
- Choose how many validators to generate.
- Enter and confirm the withdrawal address.
- Copy the generated command.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/dkg-ceremony-5.png" 
    alt="Create a new validator" 
    style={{ width: '80%'}}
  />
</div>

6. Run the command.

Paste the command into your terminal. After a successful ceremony, the tool generates output files in the directory where you ran the command.

Important outputs include:
- `deposit-[validator_pubkey].json`: deposit data used to activate the validator on Ethereum
- `keyshares-[validator_pubkey].json`: key shares used to register the validator on SSV Network

7. Review the next-steps checklist in the Web App.

You can close that page after you have copied the command and confirmed the generated files.

When the validator artifacts are ready, continue to [Deposit Validator Keys](#deposit-validator-keys).

## Deposit Validator Keys

The simplest way to deposit validator keys is through Ethereum Launchpad. Start on testnet first if you want to rehearse the full process.

- [Hoodi Ethereum Launchpad](https://hoodi.launchpad.ethereum.org/en/overview)
- [Mainnet Ethereum Launchpad](https://launchpad.ethereum.org/en/overview)

Follow this flow in Launchpad:
1. Read and accept the warnings.
2. Skip the execution-client selection.
3. Skip the consensus-client selection.
4. Provide the withdrawal address.
5. Enter the amount of Hoodi ETH or ETH to stake.
6. Continue to the upload step.
7. Upload the `deposit_data` file.
8. Connect your Web3 wallet.
9. Review and accept the risk warnings.
10. Submit the deposit transaction for the validators shown.

Activation can take hours or days depending on the [validator entry queue](https://www.validatorqueue.com/).

You can track validator activation on [Beaconcha.in](https://beaconcha.in/) by validator public key.

  </TabItem>
</Tabs>

## Next Steps

At this point, your validators should be generated and deposited. To register them on SSV Network, continue to [Onboarding a Validator](./distributing-a-validator).
