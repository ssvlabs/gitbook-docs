---
title: Hardware Requirements
sidebar_position: 2
---
# Hardware Requirements
:::info Please note
The specs are in **addition** to what you already have for Execution and Consensus nodes
:::

💻 Machine running Ubuntu (preferably LTS 22.04) 

🎛️ 2 cores

⚡️ 2GB RAM

📀 20GB storage (10GB minimum)

🧮 IOPS > 8K

## Execution and Consensus Requirements
Please check your clients' documentation for the hardware requirements. Usually Consensus documentation describes requirements for both Execution and Consensus clients:
* [Prysm](https://docs.prylabs.network/docs/install/install-with-script#step-1-review-prerequisites-and-best-practices)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/installation.html?highlight=hardware#recommended-system-requirements)
* [Teku](https://docs.teku.consensys.io/get-started/system-requirements)
* [Nimbus](https://nimbus.guide/hardware.html)
* [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/quick-start-custom-guide#hardware-requirements)

## Hardware usage reference
For your reference, we checked resource usage depending on # of managed validators.

Tests were done on *Testnet*, so Mainnet will require slighthly more resources.

### SSV node

![Resource usage by SSV node depending on number of validators](/img/table_SSV.png)

### Execution and Consensus nodes

![Resource usage by Execution and Consensus nodes depending on number of validators](/img/table_ELCL.png)