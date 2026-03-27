---
description: Register Validators
sidebar_position: 4
---

# Register Validators

## Prerequisites

Before you register validators, make sure you have:
- enough ETH in the owner wallet to cover fees, collateral, and gas; see [Calculate Costs](calculate-costs)
- the operator IDs for the selected operator set
- the correct `keyshares.json` file
- your previous validator setup turned off

:::danger Slashing warning
Before you register validators, stop the previous validator setup and wait 2-3 epochs to confirm there are no successful attestations. Registering while another setup is still active can cause slashing.
:::

## Register validators

#### 1. Open the Web App

1. Go to the [SSV Web App](https://app.ssv.network).
2. Connect your wallet.
3. For a new cluster, go to **My Account** → **Validators** → **Add Cluster**.
4. For an existing cluster, open the cluster and click **Add Validator**.

#### 2. Upload key shares

1. Select **I already have key shares**.
2. Upload your key shares file.
3. Confirm that the operator IDs match your recorded values.
4. Check the validator count before you continue.

The Web App supports up to **80 validators per registration transaction**. If your file includes more than 80 validators, upload the same file again in multiple batches until all validators are registered.

- **500 validators** = 7 batches total (6 × 80 and 1 × 20)
- **1,000 validators** = 13 batches total (12 × 80 and 1 × 40)

#### 3. Fund and register the first batch

Approve the ETH funding amount and sign the registration transaction for the first batch.

#### 4. Verify the first batch before continuing

After the first 80 validators are registered, pause and confirm that:
- the validators started attesting again
- no unexpected errors appear in your monitoring tools
- the operator set, validator count, and cluster funding look correct

This check helps you catch a bad file, wrong operator IDs, or an operational issue before you submit the remaining batches.

#### 5. Repeat until all validators are registered

Continue uploading and registering batches until the full set is complete. When you are done, click **Manage Validators** to review the final state.

## Set the fee recipient address

By default, the owner address receives execution-layer rewards from block proposals.

If you need a different destination address, follow [Set Fee Recipient](/stakers/cluster-management/setting-fee-recipient-address).

## Monitor validators

After onboarding, monitor validator performance and cluster health:
- [SSV Explorer](https://explorer.ssv.network/mainnet/overview)
- [MonitorSSV](https://monitorssv.xyz/)

:::info Note
Attestations may take up to 3 epochs to appear after registration.
:::

## Next Steps

Your validators are now registered on SSV Network.

Continue with [Post-Onboarding Checks](/stakers/validator-onboarding/post-onboarding).
