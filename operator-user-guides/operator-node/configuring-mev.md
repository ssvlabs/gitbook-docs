# Configuring MEV

{% hint style="danger" %}
**VERY IMPORTANT**



Until further notice, we advise everyone to **refrain from using a Prysm endpoint for Mainnet operators** as its not MEV compatible.



A [bug in Prysm Beacon node](https://github.com/prysmaticlabs/prysm/issues/12103) is causing operators using such endpoint in their SSV Node to miss MEV rewards.
{% endhint %}

This guide outlines the necessary steps required to configure MEV within your SSV node to enable operators to participate in proposing MEV blocks for the validators they manage.

## Prerequisite: Enable MEV in Beacon Client <a href="#prerequisite-enable-mev-in-beacon-client" id="prerequisite-enable-mev-in-beacon-client"></a>

Enable MEV by connecting to the [Builders API](https://github.com/ethereum/builder-specs) from your Beacon client.

This integration will grant you access to a network of block builders, who collaborate with MEV searchers to produce the most valuable blocks that validators can propose.

Follow the setup guidelines for configuring MEV on your preferred client:

* ​[Prysm](https://docs.prylabs.network/docs/advanced/builder)​
* ​[Teku](https://docs.teku.consensys.net/how-to/configure/use-proposer-config-file)​
* ​[Lighthouse](https://lighthouse-book.sigmaprime.io/builders.html?highlight=mev#maximal-extractable-value-mev)​
* ​[Nimbus](https://nimbus.guide/external-block-builder.html)​

{% hint style="info" %}
For reference, the [ETHStaker](https://github.com/eth-educators/ethstaker-guides/blob/main/MEV-relay-list.md) community provides a list of MEV relays and their corresponding endpoints.
{% endhint %}

## How to enable MEV in SSV node <a href="#how-to-enable-mev-in-ssv-node" id="how-to-enable-mev-in-ssv-node"></a>

Update the `config.yaml` file in the SSV node to enable MEV for your operator:

```
ssv:
    ValidatorOptions:
        BuilderProposals: true
```

Once the config flag has been updated, rebuild the container and restart the node as outlined in the [Installation guide](https://app.gitbook.com/o/-Mb7OC5dRdirWgUB-coa/s/5j2wcf1k37MM5iWhtP7i/run-a-node/installation-guide).

{% hint style="warning" %}
It is very important to ensure that Beacon client have been set up with MEV before changing the SSV node configuration to enable it. Failing to do so could result in missed blocks for the validators your operator manages.
{% endhint %}

## Considerations for MEV Relays Selection

In ssv.network, every time a validator is assigned a block proposal, one operator within its cluster is selected to propose the block. Given that MEV-enabled blocks are broadcasted through relays, only operators supporting the chosen relay can broadcast it to the network.

Consequently, a greater correlation between the relays supported by operators in a cluster enhances the number of operators capable of broadcasting the block proposal, ultimately enhancing the liveness of the proposal duty.

* **Full Relay Correlation**: When all operator nodes support the same relays, each node can both sign and broadcast the block, enhancing liveness beyond the industry standard.
* **Partial Relay Correlation**: In cases where overlap is lacking, only the operator responsible for proposing the block will broadcast the task. This aligns with the standard liveness of non-DVT validators.
* **Minimal or No MEV Support**: If certain cluster operators do not enable MEV (when the count of MEV-enabled operators falls below quorum), consensus might not be reached for the task. This could lead to the block proposal not being executed at all.
* **No MEV Support**: In instances where a non-MEV operator proposes the block, the proposal would proceed but without any MEV rewards.

Therefore, it is recommended to support as many relays as possible in your operator setup. The more correlation among supported relays, the higher the liveness for block proposal duties and the greater favorability among stakers during operator selection. This approach minimizes the chances of missed proposals or non-MEV blocks in edge cases, ensuring optimal network performance and alignment with staker expectations.

## Showcase Supported Relays

It's crucial for the network to display the relays supported by operators. The availability of this information aids the network's stability by enabling stakers to use it when considering how to form their clusters, thereby preventing the problems highlighted earlier. Additionally, this practice enhances the operator's likelihood of being selected by stakers.

To showcase the relays your operator supports to the network, it's essential to include them in your operator metadata.

### How to show supported relays in operator metadata

1. Head over to the [Operators Dashboard](https://beta.app.ssv.network/my-account/operators-dashboard) in the SSV webapp:

<figure><img src="https://lh3.googleusercontent.com/NOuXjRbIeCEX_L5WJYfPjwwX8mmOA-uroFSJfhD1K3nBPWVY3SEtMzYVG8HXPsPyM_b-hvsG0vKdVVilJpOOfvG-l-0UPvLRVbvCPVppCz3PvZwO7YKcTJQuJY8u4Efhlb31JL-AQa9W70kLo9b1I4Q" alt=""><figcaption><p>Operators Dashboard</p></figcaption></figure>

2. Navigate to the operator page and click the Edit Details:

<figure><img src="https://lh6.googleusercontent.com/ECwA7aSxHSQvJrXMcRErKPm5ihsDGg3St7kE7Lq0wXCfvQHctnvTz4RVqJM-j5XUt3hoj6N4vbMGuEQXFCNorMqyHTLfRv1owwU85qRfNC3137pyahGY-fgAX5ignQkLAHu7JXxunnaXd3bEDZbEkFU" alt=""><figcaption><p>Operator Page</p></figcaption></figure>

3. Choose from the “MEV relays” list and click Update when done.

<figure><img src="https://lh3.googleusercontent.com/HmyzYpsP5gWAuDSclvE1bxnvWKzB3ujX_FGkX92pPMaPFmAJrrMGbwIf1rQs9GQS6TLAtJPzI8I5uqqpDsmmdp4vtB5mH6jeXuBJevK_h99y-nUEw7akJBroAVCA7siYyvCEaRfXiqNEpvPvdzXkK8g" alt=""><figcaption><p>Edit Metadata Interface</p></figcaption></figure>

4. Sign the signature request from the Web3 wallet used to sign-in (Metamask, in this case). This is needed to confirm ownership, it is not an actual on-chain transaction (no gas fees required).

<figure><img src="https://lh6.googleusercontent.com/mjMuwFbxRtQ3CmFpWA09b_z8EB-FZxrSW1WLQrOBRDaljQziCp2GpGAGZwMRsMQdw3HR7xM6OboSO0ynNzDjmX2f-1X1_kjh7k4oSc_EwJztwmRo4lWrYLlDnAPu1v7jaZPS0j9Mnv2AP92v2LMKfnY" alt=""><figcaption><p>Signature Request</p></figcaption></figure>

5. Success! The new operator metadata should be set and will be visible to everyone in the network.
