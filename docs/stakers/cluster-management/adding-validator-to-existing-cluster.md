---
title: Add More Validators
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add More Validators

#### 1. Connect your wallet

Connect the Web3 wallet that owns the cluster in the [Web App](https://app.ssv.network/).

#### 2. Open the cluster

On the [Clusters page](https://app.ssv.network/clusters), select the active cluster and click **Add Validator +**.

![add-validator-to-cluster](/img/add-validator-to-cluster-1.png)

#### 3. Generate key shares

Generate validator key shares with SSV-Keys CLI or another supported method. If needed, follow [Split Keys](/stakers/validator-onboarding/split-keys).

![add-validator-to-cluster](/img/add-validator-to-cluster-6.avif)

<details>

<summary>**Key splitting on testnet**</summary>

On testnet, you can split keys online in the Web App or offline on your own machine.

![add-validator-to-cluster](/img/add-validator-to-cluster-3.avif)

:::warning Online splitting
Online splitting is not safe for production use and is available only on testnet.

Never use online splitting with a private key you plan to use on mainnet.
:::

If you choose the online flow, upload the validator keystore and enter its password on the next screen.

![add-validator-to-cluster](/img/add-validator-to-cluster-5.avif)

</details>

#### 4. Upload the key shares file

Upload the generated `keyshares-[DATE]-[TIME].json` file.

![add-validator-to-cluster](/img/add-validator-to-cluster-7.avif)

#### 5. Validate the upload

If the upload succeeds, click **Next**.

If you get an error such as `Keyshares are invalid`, the most common cause is an incorrect nonce. Generate the key shares again and follow [Split Keys](/stakers/validator-onboarding/split-keys).

![Distribute a validator](/img/distributing-a-val-10.png)

#### 6. Enter the effective balance

Read the warning, enter the effective balance, and continue.

![Distribute a validator](/img/distributing-a-val-EB.png)

#### 7. Choose the operational runway

Choose the runway based on the selected operators' yearly fee. This determines how much ETH to add to the cluster now.

![Distribute a validator](/img/distributing-a-val-11.png)
![Distribute a validator](/img/distributing-a-val-12.png)

#### 8. Review the summary

Review the validator setup and click **Register Validator**.

![Distribute a validator](/img/distributing-a-val-14.png)

#### 9. Sign and fund the cluster

Sign the transaction to register the validator and add ETH to the cluster balance.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/distributing-a-val-16.png" 
    alt="Distribute a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>

#### 10. Confirm completion

After the transaction is confirmed, the Web App shows the updated summary screen.

![Distribute a validator](/img/distributing-a-val-17.png)
