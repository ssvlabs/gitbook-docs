---
title: Hardware Requirements
sidebar_position: 2
---
# Hardware Requirements
:::info Please note
These specs are **in addition** to what you already need for Execution and Consensus nodes.
:::

💻 Machine running Ubuntu (preferably LTS 22.04) 

🎛️ 2 cores

⚡️ 2GB RAM

📀 20GB storage (10GB minimum)

🧮 IOPS > 8K

## Execution and Consensus Requirements
Check your clients' documentation for hardware requirements. In many cases, the Consensus client documentation also covers Execution requirements:
* [Prysm](https://docs.prylabs.network/docs/install/install-with-script#step-1-review-prerequisites-and-best-practices)
* [Lighthouse](https://lighthouse-book.sigmaprime.io/installation.html?highlight=hardware#recommended-system-requirements)
* [Teku](https://docs.teku.consensys.io/get-started/system-requirements)
* [Nimbus](https://nimbus.guide/hardware.html)
* [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/quick-start-custom-guide#hardware-requirements)

## Hardware usage reference
For reference, we measured resource usage based on the number of managed validators.

Tests were run on *testnet*, so Mainnet will require slightly more resources.

### SSV node

![Resource usage by SSV node depending on number of validators](/img/table_SSV.png)

### Execution and Consensus nodes

![Resource usage by Execution and Consensus nodes depending on number of validators](/img/table_ELCL.png)

## Best Practices

Hardware is only part of the picture. See [**Best Practices**](./best-practices) for additional guidance.
