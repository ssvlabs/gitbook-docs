---
title: Update Operators
sidebar_position: 5
---

# Update Operators

:::warning Collusion risk
**Do not replace more than 2 operators in the same validator flow** unless you fully understand the risk. Existing shares remain valid as long as the signing threshold is met. Such a limit reduces the chance of unsafe overlap between old and new operator sets.
:::

The correct procedure depends on what validator files you still have:

- [You have the validator keystore](#1-you-have-the-validator-keystore)
- [You have DKG-generated files](#2-you-have-dkg-artifacts)
- [You have neither](#3-you-have-neither)

If you are unsure about any step, ask in the [SSV Network Discord](https://discord.gg/5vT22pRBrf).

### You have the validator keystore

Use this path if you still have the validator `keystore-*.json` file and access to the owner wallet used for registration in SSV Network.

#### Procedure
1. Confirm that you have the correct keystore file for the validator you want to move. In the JSON file, look for the validator `pubkey` to confirm.
2. [Remove the validator](/stakers/validator-offboarding/removing-a-validator) from the current cluster.
3. Generate new key shares for the new operator set.
4. Register the validator again by following the onboarding flow for [staking providers](/stakers/validator-onboarding) or [solo stakers](/stakers/solo-stakers/distributing-a-validator).

:::warning Sequence matters
This is a remove-and-register flow. You can generate new keyshares as the first step, but do not register the validator into the new cluster until you removed the validator.
:::

### You have DKG artifacts

Use this path if the validator was created through DKG and you still have the ceremony output, specifically `proofs.json`.

#### Before you start
If you have several ceremony folders, open each candidate `proofs.json` file and confirm the validator public key at the start of the file.

:::danger Upload the correct `proofs.json`
The Web App does not verify that the uploaded `proofs.json` belongs to the validator you selected. Uploading the wrong file can lead you through the wrong reshare flow. Verify the validator public key before you upload anything.
:::

#### Procedure
1. **Open your [clusters in the Web App](https://app.ssv.network/clusters)**.
2. **Select the cluster that contains the validator**.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-1.png" alt="Select a cluster" />
</div>

3. **Start the reshare flow:**
   - For the whole cluster, click **Actions** → **Reshare**.
   - For one validator, use **Reshare** on that validator row.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-2.png" alt="Start cluster reshare" />
</div>

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-7.png" alt="Start validator reshare" />
</div>

4. **Upload the correct `proofs.json` file**.

<div style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-3.png" alt="Upload proofs file" />
</div>

5. **Select the new operators**, and click **Next**.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-4.png" alt="Choose new operators" />
</div>

6. **Sign the ownership message in your wallet**. This signature does not cost gas.

<div style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-5.png" alt="Sign ownership message" />
</div>

7. **Run the reshare command exactly as shown in the Web App.** Run it from a directory that contains the `proofs.json` file you uploaded.

   To avoid mixing old and new artifacts, it is safer to copy the original `proofs.json` into a separate working directory first. The command creates a new `ceremony-...` output folder there.

<div style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-6.png" alt="Run reshare command" />
</div>

8. **After the command finishes successfully, click DKG Ceremony initiated**.

9. **Remove the validator or validators from the current cluster**. 

    The Web App opens a separate tab for the removal flow. Complete the removal transaction there, then come back and click **My Validator Has Been Removed**.

<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-8.png" alt="Remove validators" />
</div>

10. **Register the validator again**. Upload the `keyshares.json` file from the newly created `ceremony-...` folder.

    If the page does not load correctly after you click **Back**, continue with [Register Validators](/stakers/validator-onboarding/register-validators) or the solo-staker flow at [Validator Registration](/stakers/solo-stakers/distributing-a-validator#register-the-validator).


<div style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
  <img src="/img/reshare-guide-9.png" alt="Register new keyshares" />
</div>

11. **Review the new cluster summary**. Fund the cluster if needed, and sign the registration transaction.

:::warning Do not upload the old `keyshares.json`
Use the `keyshares.json` from the new ceremony output only. Uploading the old file will not register the validator with the updated operator set.
:::


### You have neither

If you no longer have the keystore and you also do not have the DKG artifacts, you cannot safely update the operator set in place.

Your remaining option is to [offboard the validator](/stakers/validator-offboarding), assuming you control the withdrawal address.

After the validator exits and you recover the ETH, generate a new validator, store the required files securely, and onboard it again with the operator set you want.