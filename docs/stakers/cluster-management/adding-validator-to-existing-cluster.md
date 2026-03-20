---
title: Add More Validators
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add More Validators 

Make sure to connect your Web3 address/wallet with [the WebApp](https://app.ssv.network/). Use the address you registered your validators with.

1. [**In the Clusters page**](https://app.ssv.network/clusters), **select an active cluster** and then click on the "**Add Validator +**" button.

![add-validator-to-cluster](/img/add-validator-to-cluster-1.png)

2. **Generate KeyShares** via SSV Keys CLI command or other means. If unsure, refer to [this step-by-step guide](/stakers/validator-onboarding/split-keys).

![add-validator-to-cluster](/img/add-validator-to-cluster-6.avif)

<details>

<summary>**Key Splitting on Testnet**</summary>

On Testnet, this can be done Online, directly on the WebApp, or Offline on your computer.

![add-validator-to-cluster](/img/add-validator-to-cluster-3.avif)

:::warning Online Splitting
**Online splitting is not considered safe** and is only available on testnet for testing purposes.

Please never perform a Online key splitting on testnet, with a private key that you intend to use on mainnet.
:::

If the Online option is chosen, the next screen allows you to upload the Validator key (file named keystore) and enter the password to decrypt it.

![add-validator-to-cluster](/img/add-validator-to-cluster-5.avif)

</details>


3. **Upload the generated `keyshares-[DATE]-[TIME].json` file**.

![add-validator-to-cluster](/img/add-validator-to-cluster-7.avif)

4. **If the upload is successful click on "Next".**

   If you see an error such as "Keyshares are invalid", most often it is caused by incorrect nonce. Try to generate KeyShares once again, refer to [this step-by-step guide](/stakers/validator-onboarding/split-keys).

![Distribute a validator](/img/distributing-a-val-10.png)

5. **Effective Balance Warnings.**

Read the warning on the page, input your Effective Balance and proceed to the next step.
    ![Distribute a validator](/img/distributing-a-val-EB.png)

6. **Validator Operational Runway**

You can select the operational runway period of your validator, in accordance with the **Yearly Fee** of previously selected operators. This will dictate the initial amount of ETH to be deposited in the cluster, but it can always be managed later.

![Distribute a validator](/img/distributing-a-val-11.png)
![Distribute a validator](/img/distributing-a-val-12.png)

7. **Summary of your validator setup.**
 
Confirm everything is correct and click on "Register Validator". 

![Distribute a validator](/img/distributing-a-val-14.png)

8. **Adding ETH to cluster balance.**

Now, finalize the validator registration by signing the transaction and adding ETH to your cluster balance. You will need to confirm the transaction in your web3 wallet.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/distributing-a-val-16.png" 
    alt="Distribute a validator" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>


9. **Congratulations! You're all set!🥳**

Once the transaction has been signed and confirmed by the network, you'll be presented with the summary screen.

![Distribute a validator](/img/distributing-a-val-17.png)