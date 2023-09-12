# Initialization Stage

{% hint style="warning" %}
This section and the documents under it have not been updated to V3 testnet
{% endhint %}

The first stage, referred to as the “initialization ceremony”, is responsible for the initial configuration of the pools’ validators. This is done by generating and distributing the validator keys into KeyShares and constructing the pool’s validator registry for later use. This includes bootstrapping funds to the staking pool with the required SSV balance to cover the operational costs.

The ceremony is initially performed in advance, but could also be iterated upon when required, e.g., when demand exceeds supply and additional validators are needed.

The ceremony is performed in 5 steps:

![](<../../../.gitbook/assets/image (21).png>)

### 1. Validator Key Generation

For ssv.network Operators to operate your validator(s), you must supply them with your validator keys.

If you do not have validator keys, they can be generated using Ethereum’s official [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli) tool via the [Ethereum launchpad](https://prater.launchpad.ethereum.org/en/).

{% hint style="info" %}
As an alternative, you can generate validator keys utilizing existing DKG protocols ([reference](https://github.com/ZenGo-X/awesome-tss)). An SSV tailored implementation is currently under [development](https://github.com/bloxapp/ssv-spec/tree/main/dkg) ([SIP](https://docs.google.com/document/d/1TRVUHjFyxINWW2H9FYLNL2pQoLy6gmvaI62KL\_4cREQ/edit))
{% endhint %}

The tool will output a set of **keystore files** for each of the validators and a **deposit file** that aggregates the required deposit data for their activation on the beacon chain.

* The **keystore file** will be required to extract your validator key in the 3rd step - “validator key distribution”.
* From the **deposit file** you must extract and store the following data in your pool’s validator registry for each of your validators during the 4th step - “validator registry setup”:
  * pubkey
  * signature
  * deposit\_data_\__root

**Deposit File Output Example**

```json
{
    "pubkey":"91e420634c5c23af7e64627a25431f19e2a6e04d928b43874d044877dd66173972d3bba37a42deb5b738cb29f0e7cd4d",
    "withdrawal_credentials":"0069787b5530667af880f987f583774d78b4eb2ac323fb9f41b05540a6566c04",
    "amount":32000000000,
    "signature":"8993a06d7a166703a85639c1ec55e0b41bdb1bdccad4f1ad8e20140233d1593fd50e2b47092e71d242d723e164e2fd6710e12086a47bc7dd8dd8fa6eb755663c47ae6893deea99f25765178d9bb73175506d953c2ab63939ed142e8d535b38bf",
    "deposit_message_root":"02db1b65b35bf0bfbd66540d076da577cbaee85a6c638966dee353ebe346564f",
    "deposit_data_root":"1cdb5da72d7e3126eb28fa02e8a8a49bce19216053063f35f9226f2bc085100b",
    "fork_version":"00001020",
    "eth2_network_name":"prater",
    "deposit_cli_version":"1.2.0"
}
```

### **2. Pool Operators Selection**

You can select your preferred pool operators from the list of ssv.network operators.

Operators must be chosen in batches of 4 for each of your validators. The same group of operators can be used for all of your validators, or you can utilize different groups to increase diversification.

For each chosen operator, the pool manager must fetch their network assigned **id** and its corresponding **key**.

* **Operator ids** will be required when storing your validator data in their pool's validator registry for each of their validators during the 4th step - “validator registry setup”.
* **Operator ids & keys** will be required to distribute your validator keys into KeyShares during the 3rd step - “validator key distribution”.

The complete operator registry of the network and their corresponding **ids/keys** can be viewed via the network’s [explorer](https://explorer.ssv.network/operators) or the [SSV API](https://api.ssv.network/documentation/#/).

![r page in ssv.network explorer](https://lh3.googleusercontent.com/CHHcIl7\_W0IdPfoXDSHiJT-hwOLkQosukFAnbVLqyHXVaopHoAV74EMi7BrP4SQCaGN10D-V6sOLXqbW6A2b0r90IqVuoRhNJRG2ZH9VH-uu-o3rMR9itnffair5l2JQVZRLb-ljz-G2pF98og)

### 3. Validator Key Distribution

To assign validator operation to the selected operators, the pool’s validator(s) keys must be distributed into corresponding KeyShares.

To do this, gather the **keystore files** you generated during the 1st step - “validator key generation” and the **operator ids & keys** fetched during the 2nd step - “pool operators selection”. Then use the [SSV Key Distributor](../../tools/ssv-key-distributor/) tools to extract your validator’s key and distribute them to KeyShares.

The tools will output the following set of variables which are required to store in your pool’s validators registry for each of your validators during the 4th step - “validator registry setup”:

* validatorPublicKey
* sharePublicKeys
* shareEncrypted

### 4. Validators Registry Setup

In order to maintain and add validators to your pool according to user demand, a registry of validators needs to be created. You must construct a registry of your pool validators within your staking pool contract for them to be programmatically activated as new stakers ETH deposits are pooled.

For each of your future pool validators, you must store the following data:

* **Validator public key** - provided in the validator **keystore and deposit files** generated during the 1st step - “validator key generation” and also by the “SSV Key Distributor” tool during the 3rd step - “validator key distribution”.&#x20;
* **Signature** - provided in the **deposit file** generated during the 1st step - “validator key generation”.
* **Deposit data root** - provided in the **deposit file** generated during the 1st step - “validator key generation”.
* **Operator ids** - fetched during the 2nd step - “pool operators selection”.
* **Validator public shares** - provided by the “SSV Key Distributor” tool during the 3rd step - “validator key distribution” (sharePublicKeys).
* **Validator encrypted shares** - provided by the “SSV Key Distributor” tool during the 3rd step - “validator key distribution” (shareEncrypted).

### 5. Operational Balance Funding

The pool manager contract must be funded with a sufficient ETH and SSV balance to cover its validators’ **future** registration to the beacon chain (deposits) and operational costs on the ssv network (see [validator funding](../../../learn/stakers/validators/validator-onboarding.md#\_kumpogh364aq)).

With each validator activation (outlined below during the [operation stage](operation-stage.md)), a portion of these funds will be deposited to cover its expenses.

A validator’s operational costs can be affected by market conditions, resulting in fee changes over time. This means that the cost must be calculated on the fly to ensure operational costs are covered for all validators.

Pool managers should always keep track of validator demand to ensure the manager contract holds a sufficient balance to deposit from, guaranteeing the operation of future validators.

Please note that you could always deposit more balance to your account or withdraw as you see fit.
