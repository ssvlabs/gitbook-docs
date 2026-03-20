---
description: Solo-Stakers
sidebar_position: 6
---

# Solo-Stakers

![Stakers Diagram](/img/stakers-readme-1.png)

Stakers on SSV network come in various forms. Yet all of the groups supply the required capital to enable validators on the beacon chain. Capital providers must pay a fee in ETH to their chosen operators for managing their validator(s).

To gain more understanding of how onboarding to SSV works conceptually and technically, check out [SSV Network Overview](/learn/network-overview/) and [Security Overview](/learn/security) pages. 

## How to integrate with SSV

### Prerequisites
- **Security:** An offline/air‑gapped environment for all private key operations.
- **Wallet:** On‑chain wallet with sufficient ETH to register validators, cover network fees, and liquidation collateral.
- **Access:** Administrative access to your current validator setup; you must be able to shut it down during migration.

### Next Steps

***Optionally***, you can run your own SSV operator(s) to manage your and other validator(s). In this case, follow the [Setup Operators](#setup-operators) part and come back here once done.

The next step depends on whether you have validator keys or not. Choose the right option for your case:
- [I don't have validator key(s)](./creating-a-new-validator)
- [I have generated key(s), but yet to deposit them with ETH](/stakers/solo-stakers/creating-a-new-validator.md#deposit-validator-keys)
- [I have generated and deposited validator key(s)](/stakers/solo-stakers/distributing-a-validator)

### *Setup Operators*

**This step is optional**. Before proceeding, it's required to have machine(s) with synced EL + CL clients.

:::info Testnet Dry Run
Before proceeding on Mainnet, we recommend to perform the entire migration flow on the SSV Testnet (Hoodi). This ensures that your infrastructure, processes, and key handling are validated in a safe environment. 
- [Hoodi SSV Faucet](https://faucet.ssv.network/connect)
- [Hoodi Documentation](/developers/testnet)
:::

You will find detailed step-by-step instructions in the linked guides:
1. **Deploy SSV Nodes**

You can deploy one or many operators to manage your validators. If you wish to manage the whole cluster - you will need to deploy at least four individual SSV nodes.

*Recommended:* [SSV-Stack for a fast, easy installation](/operators/operator-node/node-setup#process-overview). On first start, it generates a random password and private key files.   
*Alternative:* manual install [following the official guide](/operators/operator-node/node-setup/manual-setup).

2. **Configure Monitoring**

*Recommended:* SSV-Stack provisions monitoring (Prometheus + Grafana) by default. Access it by http://localhost:3000. You can [find more details here](https://github.com/ssvlabs/ssv-stack/blob/main/README).   
*Alternative:* For manual setup, we assume you know how to deploy Grafana and Prometheus. Our official Grafana dashboard JSON can be [downloaded here](/operators/operator-node/monitoring/dashboard-runbook).

3. **Configure MEV**

MEV settings are primarily on the consensus client. Follow your CL’s MEV guide [alongside SSV’s MEV guide](/operators/operator-node/setup-sidecars/configuring-mev).

4. **Register Operators**

[Repeat this Operator Registration flow](/operators/operator-management/registration) once per every node you deployed. Use the public keys derived from each node’s generated private key files.
- Set operator fee.
- Set operator metadata.
- Description and logo.

If you want to have a private cluster:
- Set private permissions.
- Mark all operators as private.
- Whitelist the wallet address you’ll use for validator onboarding.

5. **Backup Operator Secrets**

[Securely back up](/operators/operator-node/maintenance/node-migration#node-backup) operator key and password files.
:::warning Critical
Losing either file will permanently disable the related operator. If enough operators in a cluster are lost, validators will be offline which will require to repeat the migration process.
:::

6. **Ongoing Maintenance**

[Keep node(s) current](/operators/operator-node/maintenance/troubleshooting#faq) with new SSV releases.
If you encounter issues, consult the [Troubleshooting guide](/operators/operator-node/maintenance/troubleshooting) or reach out to our team.