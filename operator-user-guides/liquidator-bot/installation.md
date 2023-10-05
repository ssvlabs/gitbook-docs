# Installation

### Prerequisites

* [x] Wallet on the Goerli testnet funded with sufficient GoETH for transaction gas fees&#x20;
* [x] Execution layer node end-point
* [x] Reliable internet connection&#x20;

### Installation

```git
git clone https://github.com/bloxapp/ssv-liquidator.git
cd ssv-liquidator
yarn install
yarn cli --help
```

{% hint style="info" %}
This installation requires NodeJS on your machine.
{% endhint %}

### Arguments

<table><thead><tr><th width="230.29247910863506">Parameter</th><th width="466.2">Description</th></tr></thead><tbody><tr><td><code>--node-url</code></td><td>The Ethereum execution node end-point</td></tr><tr><td><code>--private-key</code></td><td>Private key of the liquidator's wallet</td></tr><tr><td><code>--ssv-token-address</code></td><td>SSV token <a href="../../developers/testnet.md">contract</a> address</td></tr><tr><td><code>--ssv-network-address</code></td><td>The ssv.network <a href="../../developers/smart-contracts/ssvnetwork.md">contract</a> address</td></tr><tr><td><code>--ssv-network-views</code></td><td>The ssv.network views <a href="../../developers/smart-contracts/ssvnetworkviews.md">contract</a> address</td></tr><tr><td><code>--gas-price</code></td><td><p>Gas price heuristic according to the median gas price suggested by web3 gas price oracle: </p><ul><li>Low (*0.1) </li><li>Med (*0.2) </li><li>High (*0.3)</li></ul></td></tr></tbody></table>

### Run

The liquidator bot could be initiated with arguments in the `yarn cli` command or by using the .env variables.

{% tabs %}
{% tab title="CLI" %}
```
yarn cli --node-url=eth.infra.com --private-key=a70478942bf... --ssv-network-address=0x425890f2a5g... --ssv-network-views-address=0x425890f2a5g... --gas-price=slow --ssv-token-address=0x425890f2a5g84hw94...
```
{% endtab %}

{% tab title=".ENV variables" %}


```bash
yarn cli
NODE_URL=eth.infra.com  
SSV_NETWORK_ADDRESS=0x425890f2a5g...  
SSV_NETWORK_VIEWS_ADDRESS=0x425890f2a5g...  
SSV_TOKEN_ADDRESS=0x425890f2a5g84hw94...  
ACCOUNT_PRIVATE_KEY=a70478942bf...  
GAS_PRICE=medium  
HIDE_TABLE=false

```
{% endtab %}
{% endtabs %}
