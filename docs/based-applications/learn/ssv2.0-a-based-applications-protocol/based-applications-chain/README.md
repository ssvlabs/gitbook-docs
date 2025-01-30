---
sidebar_label: 'Based Applications Chain'
sidebar_position: 1
---

# Based Applications Chain

In its current [form](https://alonmuroch-65570.medium.com/rationalizing-dvt-cluster-formation-5c5440a4b39d), the ssv.network uses Ethereum as a coordination layer for: registry management and settlement. Based applications require a similar level of coordination to effectively track which operators have opted-in to support a given bApp. This coordination ensures operators are correctly assigned to roles and duties within the bApp's operational framework. One option is to continue building on Ethereum as a coordination layer. This approach introduces 3 main limitations:

Scale: Both DVT and future bApp transactions will include significant amounts of data, which are required to be posted as calldata (requires persistence). EVMs have [calldata limitations](https://github.com/ethereum/go-ethereum/blob/5065e6c9356276e8fa877536ab82f25fb9fa5c86/core/txpool/legacypool/legacypool.go#L52-L56) that prevent operations at scale

Cost: Because of the reliance on calldata, gas costs for simple DVT operations are high (even with batch transactions)

Multi-Chain: The 2 above limitations could be reduced significantly by using Ethereum L2s. However, that will further harm the feasibility of ssv.network being a multi-chain protocol as a heavier dependency will be made on a specific chain.

To solve all 3 of the limitations above, a dedicated, based-applications chain (bApps chain) needs to be built. Such a chain will encompass all current DVT operations and all future bApp operations, while remaining significantly "lighter" than Ethereum and offering cheaper transactions. Such a dedicated chain will be credibly neutral to enable the extension of the ssv.network to multiple L1s.