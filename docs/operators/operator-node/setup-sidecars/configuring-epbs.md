---
title: Configuring ePBS (Gloas)
sidebar_position: 3
---

The Glamsterdam upgrade introduces **ePBS** (enshrined Proposer-Builder Separation, [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)), activated on the consensus layer by the **Gloas** fork. With ePBS, the exchange between block proposers and builders becomes part of the Ethereum protocol. SSV Node supports it starting from version `v2.5.0`.

Upgrade your Execution and Beacon clients and SSV Node before the Gloas fork. ePBS works without any configuration. Connections to specific builders or relays are optional and intended for advanced setups.

## Fork schedule

| Network | Gloas fork |
| --- | --- |
| Sepolia | Activated on October 6, 2026 at 13:53:36 UTC |
| Hoodi | Epoch `132352`, on October 26, 2026 at 17:42:48 UTC |
| Mainnet | Not scheduled yet |

## Upgrade your nodes

1. Upgrade your Execution and Beacon clients to releases that support Glamsterdam, as listed in the [Ethereum Foundation announcement](https://blog.ethereum.org/en/2026/10/16/glamsterdam-hoodi-announcement). If you run multiple Beacon nodes, upgrade **all** of them.
2. Upgrade SSV Node to `v2.5.0` or later, and restart it **after** all Beacon nodes are upgraded. See [How do I update my node?](/operators/operator-node/maintenance/troubleshooting#faq) for the steps.

:::danger Upgrade order matters
SSV Node reads the fork schedule only once, at startup, from the first Beacon node that connects. If a Beacon node later schedules a fork (such as Gloas) that SSV Node didn't start with, SSV Node logs an error, and **shuts down on purpose** when the fork is 2 epochs away or less.

It shuts down again on every restart until the Beacon node it reads the schedule from supports the fork.
:::

## What changes

From the Gloas fork on, block building works as follows:
* Builders publish bids on the network, and the proposer's block commits to one of them. The protocol handles the payment to the proposer.
* The builder reveals the block's transactions separately, and a **Payload Timeliness Committee (PTC)** attests that they arrived on time.
* If no bid is worth more than a locally built block, or no bid is available, the block is built locally.
* **Proposer preferences** replace validator registrations. They carry each validator's fee recipient and gas limit, and are signed by the cluster. All Operators in a cluster must therefore still use the same [gas limit](/operators/operator-node/node-setup/gas-limit).

The relay flow described in [Configuring MEV](./configuring-mev), based on validator registrations and blinded blocks, applies until a network reaches the Gloas fork. Relays can still be used after the fork, see [Using relays after Gloas](#using-relays-after-gloas). SSV Node runs the new duties automatically.

## Direct builder connections (optional)

In addition to the bids on the network, a cluster can request bids directly from specific builders or relays. These requests are authenticated by the cluster and sent through the Beacon node. If a builder is unavailable or a request fails, the default flow described above is used.

:::warning Identical configuration required
**Every Operator of every cluster that shares a validator MUST configure the identical `Builders` block.**

The cluster authenticates to each builder with a signature that the Operators produce together. If a builder's `AuthData` differs between Operators, that builder is **silently disabled**: proposals still succeed, but without its bids. The other settings don't disable a builder, but they should match as well, so that bid selection doesn't depend on which Operator leads the proposal.

Only set this up on clusters where you control all Operators, or coordinate with them.
:::

The `Builders` block can be set **only in the YAML configuration file**; there are no environment variables for it. The [SSV Stack setup](/operators/operator-node/node-setup/) configures the node through `ssv.env`, so to use `Builders` entries follow the [Manual Node Setup](/operators/operator-node/node-setup/manual-setup) with a `config.yaml` file.

Add the block at the top level of your `config.yaml`:

```yaml
Builders:
  MinBid: 0                        # minimum accepted bid in Gwei, 0 = no minimum
  BuilderBoostFactor: 100          # weight of builder bids vs. a local block in %, 0 = always local
  Entries:
    - URL: "https://builder.example.com"
      # AuthData: "0x..."          # token agreed with the builder, defaults to the URL's hostname
      # BuilderPubKeys: ["0x..."]  # accept only bids signed with these keys, empty = any
      # MaxExecutionPayment: 0     # maximum execution-layer payment trusted from this builder, in Gwei
      # MinBid: 0                  # overrides the top-level MinBid for this builder
      # BuilderBoostFactor: 100    # overrides the top-level BuilderBoostFactor for this builder
```

Keep in mind:
* Up to **8** entries are allowed. If the `Builders` block is invalid, SSV Node **will not start** and reports an `invalid Builders configuration` error.
* Direct builders and `MinBid` require a Beacon node that implements the `produceBlockV4` POST request ([beacon-APIs#630](https://github.com/ethereum/beacon-APIs/pull/630)). With an older Beacon node, only the top-level `BuilderBoostFactor` applies.
* To always prefer a locally built block, set only `BuilderBoostFactor: 0`, without `Entries`.
* To check whether proposals use builder bids, watch the `ssv_runner_proposal_build_source_total` metric. Its `ssv_validator_duty_build_source` label is `builder` or `local`.

For the `AuthData` defaults and other technical details, see the [SSV Node documentation on GitHub](https://github.com/ssvlabs/ssv/blob/v2.5.0/docs/EXTERNAL_BUILDERS.md).

### Using relays after Gloas

After the Gloas fork, relays that support the Gloas builder API connect through `Builders` entries, with the same requirements as any other entry. If you route through MEV-Boost or Commit-Boost, use a version that supports the Gloas builder API. As of October 2026, MEV-Boost support is not released yet ([mev-boost#914](https://github.com/flashbots/mev-boost/pull/914)), and Commit-Boost supports it starting from the `v0.12.0-rc1` pre-release.

To connect to a relay directly, set its URL. `AuthData` then defaults to the relay's hostname:

```yaml
Builders:
  Entries:
    - URL: "https://relay.example.com"
```

To route through MEV-Boost or Commit-Boost, add one entry per relay. Set `URL` to your MEV-Boost or Commit-Boost instance, and `AuthData` to the hex of the relay's hostname, or of the value configured for that relay there:

```yaml
Builders:
  Entries:
    - URL: "http://mev-boost:18550"
      AuthData: "0x72656c61792e6578616d706c652e636f6d"   # hex of "relay.example.com"
```

Without an explicit `AuthData`, it would default to the MEV-Boost or Commit-Boost hostname, which doesn't identify the relay.

* `URL` must be reachable from your Beacon nodes, which send the requests. SSV Node doesn't contact relays directly.
* `AuthData` must be hex (`0x...`).
* `MaxExecutionPayment` caps the part of a bid that is paid outside the protocol and relies on trust in the relay. If it is omitted or `0`, only the part paid by the protocol counts when bids are compared.

## Proposer delay

`ProposerDelayEPBS` (`PROPOSER_DELAY_EPBS`) replaces `ProposerDelay` from the Gloas fork on. It sets how long the Operator leading a proposal waits before requesting the block.

It is disabled by default (`0`) and capped at `1s`: a higher value prevents SSV Node from starting. Only adjust it after validating your setup on a network that has reached the Gloas fork.

## Remote signer limitations

As of SSV Node `v2.5.0`, Web3Signer doesn't support the new Gloas signing types. From the Gloas fork on, an Operator using [SSV Remote Signer](./remote-signer) fails these duties: Gloas block proposals (including the execution payload), Gloas aggregation, PTC attestations, proposer preferences, and builder authentication.

The cluster still completes them as long as no more than *f* of its Operators use SSV Remote Signer (e.g. 1 out of 4).

If `Builders` entries are configured together with SSV Remote Signer, SSV Node logs a warning at startup and ignores the entries.

For more details, see the [SSV Node v2.5.0 release notes](https://github.com/ssvlabs/ssv/releases/tag/v2.5.0).
