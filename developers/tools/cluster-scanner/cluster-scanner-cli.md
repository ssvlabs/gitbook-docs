# Cluster Scanner CLI

The `Cluster Scanner CLI` tool is a command-line interface that retrieves the latest snapshot for a provided cluster.

### Installation

Prerequisites _- this tool requires_ [_NodeJS_](https://nodejs.org/en/download/) _installed on your machine._

1. Clone the cluster repo

```ini
 git clone https://github.com/ssvlabs/cluster-scanner.git
```

2. Navigate to repo `cluster-scanner`

<pre class="language-ini"><code class="lang-ini"><strong>cd cluster-scanner
</strong></code></pre>

3. Run yarn

<pre class="language-ini"><code class="lang-ini"><strong>yarn
</strong></code></pre>

### &#x20;Arguments

You can use **`yarn cli --help`** to see all arguments.&#x20;

| Argument                       | Type   | Description                                                               |
| ------------------------------ | ------ | ------------------------------------------------------------------------- |
| `--node-url (-n)`              | string | ETH1 (execution client) node endpoint URL                                 |
| --`ssv-contract-address (-ca)` | string | SSV contract address (reference)                                          |
| --`owner-address (-oa)`        | string | The cluster owner address (in the SSV contract)                           |
| --`operator-ids (-oids)`       | int    | Comma-separated list of operator IDs. The amount must be 3f+1 compatible. |

**Run**

{% code overflow="wrap" %}
```
yarn cli -n <ETH1_NODE_ENDPOINT_URL> -ca <SSV_CONTRACT_ADDRESS> -oa <CLUSTER_OWNER_ADDRESS> -oids <OPERATOR1_ID, OPERATOR2_ID, OPERATOR3_ID, OPERATOR4_ID>
```
{% endcode %}

**Output**

The cluster snapshot breakdown and the cluster object in transaction payload format.

**Example:**

```bash
{
  "block": 8508854,
  "cluster snapshot": {
    "validatorCount": "1",
    "networkFee": "0",
    "networkFeeIndex": "0",
    "index": "0",
    "balance": "1000000000000",
    "active": true
  },
  "cluster": [
    "1",
    "0",
    "0",
    "1000000000000",
    true
  ]
}
```
