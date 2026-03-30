---
description: How the SSV Liquidator bot works
sidebar_position: 9
---

# Liquidator Bot

The SSV Liquidator bot executes [liquidations](/learn/tokenomics/liquidations) on SSV Network [clusters](/learn/network-overview/clusters/) that do not hold enough balance to pay their [operational fees](/learn/tokenomics/fees).

The Liquidator bot performs two main processes:

### 1. Syncing network contract data
Every minute, the Liquidator bot pulls recent balance-related events from the SSV Network contract. It maps all clusters and calculates the potential liquidation block for each one.


#### Liquidator bot cluster mapping example
```
OWNER                                          OPERATORIDS     BALANCE     BURNRATE     STATUS      LIQUIDATIONBLOCKNUMBER     BALANCETOBLOCKNUMBER     UPDATED
0x5cC0DdE14E7256340CC820415a6022a7d1c93A35     1,2,3,4                                   Running                                                        2 weeks ago
0xcEEfd323DD28a8d9514EDDfeC45a6c81800A7D49     5,6,7,8                                   Running                                                        2 weeks ago
0xd2DBd02e4efe087d7d195de828b9Dd25f19A89C9     9,10,11,12                                Running                                                        2 weeks ago
0xbBbd6371b6530eD95986174Fa238792606584848     13,14,15,16                               Running                                                        2 weeks ago
```

### 2. Liquidating accounts
Once a cluster reaches its potential liquidation block, the Liquidator bot calls [liquidate()](/developers/smart-contracts/ssvnetwork#liquidateowner-operatorids-cluster) on the network contract. If it submits the first successful transaction, the cluster is liquidated and the SSV collateral is sent to the wallet that performed the liquidation.

## [Installation](installation)
