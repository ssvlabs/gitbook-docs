---
title: Update Operators
sidebar_position: 5
---

# Update Operators

:::warning Collusion risks
Please do not change more than 2 operators in a cluster. Each set of **generated shares will always be valid** when their signing threshold is met (e.g. 3/4). To reduce the risks, it is advised to not change more than 2 of the validator's managing operators when changing its cluster.
:::

First of all, it's important to verify how the validator was generated. Depending on that fact, your steps will differ:
1. [**Validators with Keystore**](#1-validators-with-keystore) — follow if you have the `keystore.....json` file of your validator.
2. [**DKG-generated Validators**](#2-dkg-generated-validators) — follow if you have the `ceremony-YYYY-MM-DD...` folder with `keyshares` and `proofs` for your validators.
3. [**I don't have neither**](#3-i-dont-have-neither)

## 1. **Validators with Keystore**
If you have multiple keystore files, you can verify them by checking its contents. Near the ending of file you will see `"pubkey"` with public key of the validator. It can be tricky to read JSON file, you can use tools like online JSON formatter or offline Code editors (e.g. VS Code).

Once you've identified the correct `keystore` file, you can follow two guides below:
1. [Remove the validator(s)](./removing-a-validator.md)
2. [Distribute your validator(s)](../validator-management/distributing-a-validator.md)

## 2. **DKG-generated Validators**
If you have multiple ceremony folders, you should verify the one you need. Open `proofs.json` file and at the very beginning there will be `"validator":"..."` with the public key of validator. That way you can ensure you're using the correct ceremony.

Once you verified that the correct data in `ceremony-YYYY-MM-DD...`, you can follow the steps below:
#### 1. Open your [clusters in the Web App](https://app.ssv.network/clusters)
#### 2. Choose the cluster you want to change
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-1.png" alt="" />
</div>

#### 3. Click on `Actions` -> `Reshare`
You can change the operator set for all validators in the cluster that way.  
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-2.png" alt="" />
</div>

**Or** if you want to change operator set of one validator - you can choose to `Reshare` that one specifically.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-7.png" alt="" />
</div>

#### 4. Provide `proofs.json` of your validator(s)
You can find it in the mentioned `ceremony-YYYY-MM-DD...` folder. Please make sure you're using the correct `proofs.json` file, because Web App is not verifying the file you're uploading.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-3.png" alt="" />
</div>

#### 5. Choose new operators
Remove checkmark from the operator you want to change and choose the new one from the list.
Once you've chosen the new operator set for your cluster, just click `Next`.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-4.png" alt="" />
</div>

#### 6. Provide signature to verify your ownership
Once you click `Sign` your wallet will prompt you to sign a message. The signature does not cost you gas.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-5.png" alt="" />
</div>

#### 7. Run the reshare command
To run the command you will need Docker installed on your machine. As mentioned on the instructions, you will need to run the command from directory with `proofs.json` in it. 

You can copy your proofs to a separate directory, to not mix the new ceremony with the previous one. The output of the command will be a different `ceremony-...` folder.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-6.png" alt="" />
</div>
Once this is done just click on `DKG Ceremony initiated`.

#### 8. Remove validator(s)
Click on `Remove Selected Validator` and a separate tab will be created. Choose the validators you want to change operators for and click on `Next`. You will be prompted to sign a transaction to remove the validators. 

Please read the description carefully and remove the validators by signing the transaction.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-8.png" alt="" />
</div>
Once this is done, come back to the previous tab and click on `My Validator Has Been Removed`.

#### 9. Register validator(s)
Click on `Register validator` and upload the `keyshares.json` file from your newly created `ceremony-....` folder.

You will be shown your newly created cluster with updated set of operators. You will also be prompted to fund the balance of new cluster. After clicking through all of the steps, you will see the `Register Validator` page and be prompted to sign the transaction.
<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-9.png" alt="" />
</div>

Please note if you click on `Back` your page *might not* load properly. In that case, you can continue by following the [validator onboarding guide](../validator-management/dkg-ceremony.md#existing-accounts).

## 3. **I don't have neither**
If you can't find neither of the mentioned files — the only option is to [exit the validator](./exiting-a-validator.md) (assuming you have access to the Withdrawal address). 

Once the validator is exited and you received your ETH, you can generate your validator keys again, store them securely, and choose new operators for your cluster.

If you are unsure about any of the steps mentioned in this guide, you can ask for assistance from [our Discord community](https://discord.gg/5vT22pRBrf).