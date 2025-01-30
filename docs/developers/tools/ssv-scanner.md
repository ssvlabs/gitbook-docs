---
sidebar_label: 'SSV Scanner'
sidebar_position: 3
---

# SSV Scanner SDK

The SSV Scanner SDK enables users to retrieve events data from the SSV network [contract](https://docs.ssv.network/developers/smart-contracts).

The tool is used for retrieving **cluster snapshots** and **registration nonce** which are required as inputs for SSV tooling and smart contract transactions.

## Cluster Snapshots

Cluster snapshots are objects containing data of clusters in the SSV network.

Clusters are unique to each account and are defined by the combination of the validator's **owner address** and **operator ids** which were selected to manage it during registration.

Cluster snapshots are required for SSV contract transactions with cluster related functions which require the **cluster object** as input:

* [registerValidator()](../smart-contracts/ssvnetwork.md#registervalidatorpublickey-operatorids-shares-amount-cluster)
* [removeValidator()](../smart-contracts/ssvnetwork#removevalidatorpublickey-operatorids-cluster)
* [deposit()](../smart-contracts/ssvnetwork.md#depositowner-operatorids-amount-cluster)
* [withdraw()](../smart-contracts/ssvnetwork.md#withdrawoperatorids-amount-cluster)
* [getBalance()](../smart-contracts/ssvnetworkviews.md#getbalance-owner-operatorids-cluster)
* [reactivate()](../smart-contracts/ssvnetwork.md#reactivateoperatorids-amount-cluster)
* [isLiquidated()](../smart-contracts/ssvnetworkviews.md#isliquidated-owner-operatorids-cluster)
* [isLiquidatable()](../smart-contracts/ssvnetworkviews.md#isliquidatable-owner-operatorids-cluster)
* [liquidate()](../smart-contracts/ssvnetwork.md#liquidateowner-operatorids-cluster)

Cluster snapshots are updated after each transaction with a cluster related function, and will emit a new **cluster object** (the latest snapshot) which will be required for making the succeeding transaction.

The SSV Scanner tool returns only the **latest snapshot** for a provided cluster.

:::info
Please note that alternatively, instead of using this tool, you could just save the **cluster object** emitted in the event after each transaction, and use it as the input for the succeeding cluster related contract transaction.
:::

## Registration Nonce

The registration nonce is a sequence number that represents the number of validators an account (**owner address**) has registered to the SSV network.

The registration nonce increments after each validator registration and does not decrease when a validator is removed.

The registration nonce is required as input for the [SSV Keys](../ssv-key-distributor/) tool, which outputs the **sharesData** payload required for the [validator registration](https://docs.ssv.network/developers/smart-contracts/ssvnetwork#registervalidatorpublickey-operatorids-shares-amount-cluster) transaction in the SSV contract.

:::info
Please note that alternatively, instead of using this tool to retrieve the **registration nonce**, you could just keep track of the number of validator registrations you have made and use it as the input for the succeeding validator registrations.
:::

## Installation

The SSV Keys library is distributed as a Javascript package, and it can be directly installed with the `npm` command (or `yarn`, if you prefer) using the repository's URL:

```bash
npm i https://github.com/ssvlabs/ssv-scanner.git
```

:::info
The library is not yet maintained in a stable manner on npmjs.com so for the time being, it is advised to use repository's URL, until this documentation page is updated to indicate otherwise.
:::

## Import library

The two main components of the `ssv-keys` library are the `SSVKeys` and `KeyShares` objects. Onche the library has been intstalled, they can be imported like so:

```javascript
import { ClusterScanner, NonceScanner } from 'ssv-scanner';
```

## Usage

The usage of SSV scanner SDK is rather simple. Given a set of parameters, some generic (node URL, contract Address), some specific (owner address, operator IDs), the tool offers two objects a developer can interact with: `ClusterScanner` and `NonceScanner`.

`ClusterScanner` is able to extract the snapshot of the cluster, including the number of validators in it, information about the network fee, the operator's fees, its balance and if it's active or not.

`NonceScanner` can be used to verify how many times a certain address (the cluster owner) has registered a validator on SSV network, by invoking the `registerValidator()` function of the SSV smart contract (see [the smart contracts](../../smart-contracts/) page for the correct address). This counter is called "nonce".

This information is not only useful, but necessary for the validator key splitting ceremony. As such, this is used

## Example

```javascript
import { ClusterScanner, NonceScanner } from 'ssv-scanner';

async function main() {
  // these parameters should be known in advance
  const params = {
    nodeUrl: '', // this can be an Infura, or Alchemy node, necessary to query the blockchain
    contractAddress: '', // this is the address of SSV smart contract
    ownerAddress: '', // this is the wallet address of the cluster owner
    operatorIds: [], // this is a list of operator IDs chosen by the owner for their cluster
  }

  // ClusterScanner is initialized with the given parameters
  const clusterScanner = new ClusterScanner(params);
  // and when run, it returns the Cluster Snapshot
  const result = await clusterScanner.run(params.operatorIds);
  console.log(JSON.stringify({
    'block': result.payload.Block,
    'cluster snapshot': result.cluster,
    'cluster': Object.values(result.cluster)
  }, null, '  '));

  const nonceScanner = new NonceScanner(params);
  const nextNonce = await nonceScanner.run();
  console.log('Next Nonce:', nextNonce);
}

void main();
```

Here's an example of the printed output:

```json
{
  "block": 9450944,
  "cluster snapshot": {
    "validatorCount": "1",
    "networkFeeIndex": "0",
    "index": "32010897120",
    "active": true,
    "balance": "5000000000000000000"
  },
  "cluster": [
    "1",
    "0",
    "32010897120",
    true,
    "5000000000000000000"
  ]
}
```
