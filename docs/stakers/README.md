---
sidebar_label: 'Quickstart'
sidebar_position: 1
---

# Quickstart

:::info Please note
This page is for staking providers, pools, and similar services.

**If you are an individual ETH holder, follow [Solo-Stakers](/stakers/solo-stakers) instead**.
:::

![Stakers Diagram](/img/stakers-readme-1.png)

SSV Network lets stakers run validators through distributed operators. Stakers fund validators and pay operator and network fees in ETH.

For more context, see [SSV Network Overview](/learn/network-overview) and [Security Overview](/developers/security).

## How to integrate with SSV Network

### Overview

At a high level, the process has four steps:
1. Set up SSV nodes
2. Register operators on SSV Network.
3. Split validator keys.
4. Register the generated key shares.

### Prerequisites

- **Infrastructure:** Machines with synced execution-layer and consensus-layer clients.
- **Security:** An offline or air-gapped environment for private key operations.
- **Access:** Administrative access to your current validator setup, so you can shut it down during migration.
- **Wallet:** An on-chain wallet with enough ETH for fees, collateral, and gas.

:::note Testnet dry run
Before you use mainnet, run the full process on SSV testnet (Hoodi). This helps you validate your infrastructure, procedures, and key handling in a safer environment.
- [Hoodi SSV Faucet](https://faucet.ssv.network/connect)
- [Hoodi documentation](/developers/testnet)
:::

### Step 1: Set up SSV nodes

Deploy the SSV nodes that will operate your validators.

1. **Deploy SSV nodes**

   Deploy one full setup per node. Supported cluster sizes are 4, 7, 10, and 13 operators.

   *Recommended:* [SSV-Stack, quick setup](/operators/operator-node/node-setup#process-overview). It will generate a random password and private key files on first start.  
   *Alternative:* [Manual setup](/operators/operator-node/node-setup/manual-setup).

2. **Configure monitoring**

   *Recommended:* SSV-Stack includes Prometheus and Grafana. The default local address is `http://localhost:3000`. More details are in the [SSV-Stack README](https://github.com/ssvlabs/ssv-stack/blob/main/README).  
   *Alternative:* For manual setups, deploy your own Grafana and Prometheus. Downnload our [Grafana dashboard JSON](/operators/operator-node/monitoring/dashboard-runbook).

3. **Configure MEV**

   MEV settings are mainly handled on the consensus client. Follow [our MEV boost setup guide](/operators/operator-node/setup-sidecars/configuring-mev).

### Step 2: Register operators on SSV Network

1. **Register each operator**

   Follow [Operator Registration](/operators/operator-management/registration) once for each node you deployed. Use the public key derived from each node's private key files.

2. **Set operator details**

   - [Set private permissions and whitelisted addresses](/operators/operator-management/configuring-a-permissioned-operator).
   - [Add operator metadata](/operators/operator-management/setting-operator-metadata).

4. **Back up operator secrets**

   [Back up](/operators/operator-node/maintenance/node-migration#node-backup) the operator key files and password files.

   :::warning Critical
   Losing either file permanently disables that operator. If too many operators are offline, validators in the cluster will go offline, and you will have to repeat the migration process.
   :::

5. **Maintain the nodes**

   Keep nodes updated with [new SSV releases](https://github.com/ssvlabs/ssv/releases). If you run into issues, use the [Troubleshooting guide](/operators/operator-node/maintenance/troubleshooting).

### Validator Onboarding

**Steps 3 and 4:** follow the [Validator Onboarding](/stakers/validator-onboarding) for key splitting and validator registration.