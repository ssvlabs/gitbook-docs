# Creating a new validator

This guide shows how to create a new set of validator keys for the Goerli testnet. For Ethereum mainnet, simply change Launchpad configuration from the page's dropdown menu, and refer to this [Deposit Contract](https://etherscan.io/address/0x00000000219ab540356cBB839Cbe05303d7705Fa) on mainnet, instead.

The official [Staking Launchpad](https://goerli.launchpad.ethereum.org/en/) allows developers to create a new validator via the web interface, but the procedure on the Web UI can be hardly integrated in an automated process.

What's more important, the Launchpad procedure includes steps related to the Execution client and Consensus client. These are not unnecessary and the steps should be skipped.

{% hint style="info" %}
When joining the SSV network, you will not need to run the validator yourself, as Node Operators of the SSV networks will be running the clients on your behalf.
{% endhint %}

The essential steps to create a new validator are only these two:

1. Generate validator keys
2. Activate previously generated keys

For this reason, an alternative and shorter route to the Launchpad is to use the [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli) and the [Staking Deposit Contract](https://goerli.etherscan.io/address/0xff50ed3d0ec03ac01d4c79aad74928bff48a7b2b).

### Prerequisites

* Confidence using the command line, and command line interfaces
* Goerli ETH: 32 + \~0.1 for gas fees to activate the validator keys

### Generate validator keys

Head over to the official [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli) project page of the Ethereum organization on GitHub. The README contains instructions to use the software, but the quickest (and suggested) way remains to use the pre-built binaries.

1. Browse to the [Releases](https://github.com/ethereum/staking-deposit-cli/releases) page, then download and extract the correct binary for your Operating System.
2. Inside the folder there should be a `deposit` binary. This should be executed from a terminal and has 2 commands, depending on your configuration:
   1. Run the `./deposit new-mnemonic` if you need to create keys from a new mnemonic phrase.
   2. Run the `./deposit existing-mnemonic` if you want to generate keys from an existing mnemonic phrase

There are additional arguments to be provided to change language, reference chain, create multiple validator keys at once, or provide an address for withdrawing staking rewards.

Here’s the command used to create one set of validator keys for the goerli testnet, providing the address to withdraw staking rewards (you must have ownership of such address):

{% code overflow="wrap" %}
```bash
./deposit new-mnemonic --num_validators 1  --chain goerli  --execution_address [YOUR_ETHEREUM_WALLET_ADDRESS]
```
{% endcode %}

At this point you should open the terminal of your Operating System, type the command above, with the correct values and parameters, according to your configuration.

The procedure is interactive and it will ask you to store the mnemonic phrase, as well as to provide a password for the validator keys. At the end of it, the CLI will tell you where the keys have been stored (usually under a `validator_keys` subfolder of the current folder).

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption><p>When the keys are finally created, you should be  with a similar screen</p></figcaption></figure>

{% hint style="danger" %}
**Make sure to store and preserve the mnemonic phrase and the key passphrase in a secure environment, as they contain sensitive data that cannot be recovered otherwise.**
{% endhint %}

Take note of the keys location, you’ll need the file named `deposit_data-[TIMESTAMP].json` in the next step.

### Activate validator keys

To activate the validator keys you must deposit the 32 ETH (or testETH) to the Deposit Contract on chain. There are two options to do so:

1. Directly interacting with the [Staking Deposit Contract](https://goerli.etherscan.io/address/0xff50ed3d0ec03ac01d4c79aad74928bff48a7b2b#writeContract)
2. Using the official [Staking Launchpad](https://goerli.launchpad.ethereum.org/en/), and GUI

#### Activate via Staking Deposit Smart Contract

A quick way to send transactions to the Staking Deposit Contract is to visit the [Staking Deposit Contract](https://goerli.etherscan.io/address/0xff50ed3d0ec03ac01d4c79aad74928bff48a7b2b) page on Etherscan, and browse the _Contract_ tab, then select the _Write Contract_ option.

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption><p>Göerli Staking Deposit Contract page on Etherscan</p></figcaption></figure>

This page lists all the smart contract’s functions, and offers a form, where each field represents one of the arguments of the contract’s method in question.

In order to activate the validator keys, you need to call the `deposit` function via a transaction, providing:

* `deposit`
* `pubkey`
* `withdrawal_credentials`
* `signature`
* `deposit_data_root`

All the necessary information can be found in the `deposit_data-[TIMESTAMP].json` file, resulting from the _Generate validator keys_ step. Just copy the value related to the correct key (e.g.: `32000000000` from the `amount` key in the `deposit` field) from the JSON file to the web page and fill the form.

Here's an example:

```json
[
  {
    "pubkey": "a3aa18ed18253ea97873edfa09022d445d954a3704b2250a8f4f119e73f5b91186d72ac65f38737731cf260fdf6692c8",
    "withdrawal_credentials": "010000000000000000000000a1a66cc5d309f19fb2fda2b7601b223053d0f7f3",
    "amount": 32000000000,
    "signature": "a45a4062e8f0dc270302b50f7837ef033ada3ad33f9c992cd7c5d5b88dd157c4d060b475ab4a8cf1a54e43deb72788a20793eb29fd431d21cad9904dcff3fce4d4aef37005f8ff9cfdb8aeedcae10548e600b0ba82f4d257f86fa433fad270f2",
    "deposit_message_root": "ad4fa095269b01c07a9b3c094a4e3a6dd9d4e3f41fb4d487a153d70173f63da9",
    "deposit_data_root": "25ed6d60350928f2f9529d7dbbac2bc52e7c8eadd50bf7f52d21867314fcb8a4",
    "fork_version": "00001020",
    "network_name": "goerli",
    "deposit_cli_version": "2.5.0"
  }
]
```

To perform the transaction via the UI, it’s necessary to connect your Web3 wallet, by clicking on the _Connect to Web3_ button, sign in with the wallet of your choice (e.g. Metamask), and finally click on the _Write_ button and accept the transaction from the wallet to make it go through.

{% hint style="info" %}
Alternatively, the smart contract transaction can be generated via SDKs such as `ethers.js` and `web.js`. This should be how you would want to integrate SSV in the DApp you’ll be building, for example.
{% endhint %}

#### Activate via official Staking Launchpad

If you don’t trust performing the transaction via Etherscan's Beta functionality, or simply prefer a more official route, you can visit the [Staking Launchpad](https://goerli.launchpad.ethereum.org/en/) and access the full procedure to create a new validator, by clicking _Become a Validator_.

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption><p>Staking Launchpad Advisories</p></figcaption></figure>

This is a summary of the procedure itself:

1. Accept Advisories
2. Select an Execution Client
3. Select a Consensus Client
4. Generate Keys
5. Upload deposit data
6. Connect wallet
7. Deposit transaction

As mentioned at the start, the launchpad has a rigid procedure, and some steps are not relevant in this context. Nonetheless, in order to get to the _“Deposit transaction”_ step needed to activate the validator keys, it is necessary to go through each one of them.

Just know that:

* you will not need to choose or run neither an Execution nor a Consensus client, because the operators SSV network will do that for you, ensuring active-active redundancy, redundancy and client diversity
* you already have generated your validator keys (in the previous step)

For this reason, you’ll have to choose something to advance, but the choices made in steps 1–4 are essentially irrelevant for the purpose of this guide.

Once you get to this screen:

<figure><img src="../../.gitbook/assets/image (4).png" alt=""><figcaption><p>On this page on Staking Launchpad, it is possible to upload deposit data and generate the deposit transaction</p></figcaption></figure>

Upload the `deposit_data-[TIMESTAMP].json` file, select _Continue_ on this page and on the next one and accept the transaction on your wallet when requested.
