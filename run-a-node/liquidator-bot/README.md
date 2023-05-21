# Liquidator Bot

The SSV Liquidator bot executes [liquidations](../../learn/protocol-overview/tokenomics/liquidations.md) on ssv.network [clusters](../../learn/stakers/clusters/) that do not hold enough balance to pay for their [operational fees](../../learn/protocol-overview/tokenomics/fees.md)

The liquidator bot performs 2 main processes:

1. **Syncing network contract data**\
   Every minute the liquidator bot pulls recent balance-determining events for the SSV networks contract and maps all of the network's clusters on the liquidator level to calculate the potential block for liquidation for each cluster in the network\


Liquidator bot cluster mapping example

```
OWNER                                          OPERATORIDS     BALANCE     BURNRATE     STATUS      LIQUIDATIONBLOCKNUMBER     BALANCETOBLOCKNUMBER     UPDATED
0x5cC0DdE14E7256340CC820415a6022a7d1c93A35     1,2,3,4                                   Running                                                        2 weeks ago
0xcEEfd323DD28a8d9514EDDfeC45a6c81800A7D49     5,6,7,8                                   Running                                                        2 weeks ago
0xd2DBd02e4efe087d7d195de828b9Dd25f19A89C9     9,10,11,12                                Running                                                        2 weeks ago
0xbBbd6371b6530eD95986174Fa238792606584848     13,14,15,16                               Running                                                        2 weeks ago
```

2. **Liquidating accounts** \
   Once the potential liquidation block is reached the liquidator bot will call the [liquidate()](../../developers/smart-contracts/ssvnetwork.md#public-liquidate-owner-operatorids-cluster) function in the network contract, if the bot was the first to successfully pass the transaction the cluster will be liquidated and its SSV collateral will be sent to the wallet address which performed the liquidation &#x20;

