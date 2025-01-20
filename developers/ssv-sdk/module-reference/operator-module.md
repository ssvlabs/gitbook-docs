# Operator Module

This is a library which contains all the helper functions you need for working with operators on SSV.

After instantiating the SDK, you can call any of the functions in the utils library like so:

```typescript
sdk.operators.registerOperator()
```

## Function List

### `registerOperator()`

Accepts a list of addresses, fetches their nonces using subgraph, returns as a list.

Input parameters:

<table data-header-hidden><thead><tr><th></th><th width="139"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>isPrivate</td><td>bool</td><td>true/false flag of whether the operator is private</td><td>true</td></tr><tr><td>yearlyFee</td><td>bigint</td><td>The operator public key (generated as part of the node setup).</td><td>2000000000000000</td></tr><tr><td>publicKey</td><td>string</td><td>The operator public key (generated as part of the node setup).</td><td>"0xA4831B989972605A62141a667578d742927Cbef9"</td></tr></tbody></table>

Example:

```typescript
const receipt = await sdk.operators
    .registerOperator({
      args: {
        publicKey: "LS0tLS1CRUdJTiBSU0EgUFVCTElDIE..."
        yearlyFee: 100000000000000,
        isPrivate: true,
      },
    })
.then((tx) => tx.wait())
```

### `removeOperator()`

Permanently removes the operator from the network (irreversible).

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="139"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint</td><td>Operator id</td><td>4</td></tr></tbody></table>

Example:

```typescript
const receipt = await sdk.operators
    .removeOperator({
      args: {
        operatorId: 4,
      },
    })
.then((tx) => tx.wait())
```

### `withdraw()`

Withdraws an amount of SSV from a specified operator.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>string</td><td>Operator id</td><td>4</td></tr><tr><td>amount</td><td>bigint</td><td>Withdraws all SSV tokens earnings from provided operator balance to msg.sender, <strong>will fail if</strong> msg.sender is not the operator owner.</td><td>1231231231311231</td></tr></tbody></table>

Example:

```typescript
const receipt = await sdk.operators
    .withdraw({
      args: {
        operatorId: "4",
        amount: 1231231231311231,
      },
    })
.then((tx) => tx.wait())
```

### `setOperatorWhitelists()`

For a list of operators provided, set a list of whitelisted addresses which can register validators to these operators.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint[]</td><td>Operator id array</td><td>[1,2,3,4]</td></tr><tr><td>whitelisted</td><td>Hex[]</td><td>A list of ETH1 addresses to be whitelisted.</td><td>["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"]</td></tr></tbody></table>

Example:

```typescript
const receipt = await sdk.operators
    .setOperatorWhitelists({
      args: {
        operatorId: [1,2,3,4],
        whitelisted: ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"],
      },
    })
.then((tx) => tx.wait())
```

### `removeOperatorWhitelists()`

For a list of operators provided, remove a list of whitelisted addresses.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint[]</td><td>Operator id array</td><td>[1,2,3,4]</td></tr><tr><td>whitelisted</td><td>Hex[]</td><td>A list of ETH1 addresses to be removed from the whitelist.</td><td>["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"]</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .removeOperatorWhitelists({
      args: {
        operatorId: [1,2,3,4],
        whitelisted: ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"],
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `setOperatorsPrivate()`

For a list of operators provided, set their status to private.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint[]</td><td>Operator id array</td><td>[1,2,3,4]</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .setOperatorsPrivate({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `setOperatorsPublic()`

For a list of operators provided, set their status to public.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint[]</td><td>Operator id array</td><td>[1,2,3,4]</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .setOperatorsPublic({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `setOperatorWhitelistingContract()`

For a list of operators provided, set an external whitelisting contract to manage the whitelist for these operators. [Must be a valid whitelisting contract.](https://docs.ssv.network/developers/smart-contracts/external-whitelist-contract-example)

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint[]</td><td>Operator id array</td><td>[1,2,3,4]</td></tr><tr><td>whitelistingContract</td><td>string</td><td>A valid whitelisting contract address</td><td>"0xA4831B989972605A62141a667578d742927Cbef9"</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .setOperatorWhitelistingContract({
      args: {
        operatorId: [1,2,3,4],
        whitelistingContract: "0xA4831B989972605A62141a667578d742927Cbef9",
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `removeOperatorWhitelistingContract()`

For a list of operators provided, remove the whitelisting contract stored.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint[]</td><td>Operator id array</td><td>[1,2,3,4]</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .removeOperatorWhitelistingContract({
      args: {
        operatorId: [1,2,3,4],
      },
    })
.then((tx) => tx.wait())
</code></pre>

#### `declareOperatorFee()`

Initiates the first step of the operator fee update cycle - declaration of a new fee. [After specified](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews#getoperatorfeeperiods) time window operator will be able to change to the new fee with executeOperatorFee().

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint</td><td>Operator id </td><td>4</td></tr><tr><td>operatorFee</td><td>bigint</td><td>New fee (denominated as $SSV tokens per block). <em><strong>Amount must be shrinkable (divisible by 10000000)</strong></em></td><td>100000000</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .declareOperatorFee({
      args: {
        operatorId: 4,
        operatorFee: 100000000,
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `executeOperatorFee()`

Activates operator’s fee change specified in previously called declareOperatorFee(). This function needs to be called within a [certain time window](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews#getoperatorfeeperiods) following declareOperatorFee().

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint</td><td>Operator id </td><td>4</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .executeOperatorFee({
      args: {
        operatorId: 4,
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `cancelDeclaredOperatorFee()`

Cancels operator’s fee change requested in previously called declareOperatorFee().

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint</td><td>Operator id </td><td>4</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .cancelDeclaredOperatorFee({
      args: {
        operatorId: 4,
      },
    })
.then((tx) => tx.wait())
</code></pre>

### `reduceOperatorFee()`

Reduce the operator fee, does not abide by the restrictions of fee increase.

Input parameters:

<table data-header-hidden data-full-width="false"><thead><tr><th></th><th width="112"></th><th></th><th></th></tr></thead><tbody><tr><td>Input parameter</td><td>Input type</td><td>Description</td><td>Example input</td></tr><tr><td>operatorId</td><td>bigint</td><td>Operator id </td><td>4</td></tr><tr><td>fee</td><td>bigint</td><td>New fee (denominated as $SSV tokens per block). <em><strong>Amount must be shrinkable (divisible by 10000000)</strong></em></td><td>100000000</td></tr></tbody></table>

Example:

<pre class="language-typescript"><code class="lang-typescript"><strong>const receipt = await sdk.operators
</strong>    .reduceOperatorFee({
      args: {
        operatorId: 4,
        fee: 100000000, 
      },
    })
.then((tx) => tx.wait())
</code></pre>
