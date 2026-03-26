---
description: How to run a node
sidebar_position: 7
---

# Running a Node

The only essential guide is the [**Automatic SSV Node Setup**](/operators/operator-node/node-setup). There are other setup options avaialble:
- The same setup can be recreated manually with the [Manual Node setup page](/operators/operator-node/node-setup/manual-setup).
- There is an alternative SSV client called Anchor, developed by Sigma Prime. [Official documentation for Anchor](https://anchor-book.sigmaprime.io/running_node.html).
- SSV Node setup is also available using [eth-docker](https://eth-docker.net/Support/SSV/), [Stereum Launcher](https://stereum.net/), and [Dappnode](https://docs.dappnode.io/docs/user/staking/ethereum/dvt-technologies/ssv-network/).


Other guides in this section are optional, still we recommend checking them out. Each section explained briefly:
### [**Setup SSV Node**](/operators/operator-node/node-setup)
Everything you need for a successful setup and best performance.
    * [Hardware Requirements](/operators/operator-node/node-setup/hardware-requirements) - to make sure your hardware is sufficient.
    * [Best Practices](/operators/operator-node/node-setup/best-practices) - tips for better performance of your setup.
    * [*Node Configuration Reference*](/operators/operator-node/node-setup/node-configuration-reference) - *(optional)* reference of SSV's node config.
    * [*Manual Node Setup*](/operators/operator-node/node-setup/manual-setup) - *(optional)* alternative setup guide with manual installation.
### [**Setup Sidecars**](/operators/operator-node/setup-sidecars)
Sidecars that are mostly aimed to increase your chances of getting more validators.
    * [Enable DKG](/operators/operator-node/setup-sidecars/enabling-dkg/) - to participate in DKG ceremonies and get more validators.
    * [Configure MEV](/operators/operator-node/setup-sidecars/configuring-mev) - to increase rewards for block proposals.
    * [Configure Primev](/operators/operator-node/setup-sidecars/configuring-primev) - alternative to MEV, includes Pre-confirmations.
    * [Configure Commit-Boost](/operators/operator-node/setup-sidecars/configuring-commit-boost) - alternative to MEV, includes Pre-confirmations.
    * [*Configure SSV Remote Signer*](/operators/operator-node/setup-sidecars/remote-signer) - *(optional)* separates the key management functions from the SSV node.
### [**Monitoring**](/operators/operator-node/monitoring)
One of the best practices is to run a monitoring setup, helps with diagnostics and spotting issues.
    * [Dashboard Runbook](/operators/operator-node/monitoring/dashboard-runbook) - install our Grafana dashboard and learn how to use it.
    * [*Metrics Index*](/operators/operator-node/monitoring/metrics-index) - *(optional)* learn about SSV metrics in detail.
### [**Maintenance**](/operators/operator-node/maintenance)
Everything you need when having issues with your node.
    * [Troubleshooting](/operators/operator-node/maintenance/troubleshooting) - identify and fix issues with your setup.
    * [Common Errors](/operators/operator-node/maintenance/common-errors) - learn about most common errors you might see in your logs.
    * [*Node Migration*](/operators/operator-node/maintenance/node-migration) - *(optional)* guide on how to migrate an SSV Node.
    * [*DKG Node Migration*](/operators/operator-node/maintenance/dkg-operator-migration) - *(optional)* guide on how to migrate DKG Node.