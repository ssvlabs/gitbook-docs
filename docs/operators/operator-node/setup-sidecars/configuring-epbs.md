---
title: Configuring ePBS (Gloas)
sidebar_position: 3
---

This guide explains how block building changes with the Glamsterdam upgrade and what Operators need to do. Glamsterdam introduces **ePBS** (enshrined Proposer-Builder Separation, [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)), activated on the consensus layer by the **Gloas** fork. SSV Node supports it starting from version `v2.5.0`.

:::warning Fork schedule
* **Hoodi** - epoch `132352`, on **October 26, 2026 at 17:42:48 UTC**.
* **Mainnet** - not scheduled yet.

See the [Ethereum Foundation announcement](https://blog.ethereum.org/en/2026/10/16/glamsterdam-hoodi-announcement) for details.
:::

**TL;DR:** Upgrade your clients and SSV Node before the fork. ePBS works out of the box with no configuration. Direct builder connections are optional.

On a high level, the process consists of 3 steps:
1. [Upgrade your nodes](#upgrade-your-nodes)
2. [Check the default behavior](#default-behavior)
3. [*Configure direct builder connections (optional)*](#direct-builder-connections-optional)

## What changes with ePBS

**Before the fork**, block building happens outside the Ethereum protocol, as described in [Configuring MEV](./configuring-mev):
* Builders send their blocks and bids to **relays**. Your Beacon client queries them through an MEV client (e.g. MEV-Boost or Commit-Boost).
* The proposer signs a **blinded block** (header only), and the relay reveals the full block.
* SSV Node regularly submits **validator registrations** to the relays, with the fee recipient and gas limit of each validator.

**After the fork**, the builder market is part of the protocol itself:
* Builders publish **bids** on the network. The proposer's block commits to a bid, and the protocol enforces the payment to the proposer.
* The builder reveals the execution payload (the block's transactions) separately. A **Payload Timeliness Committee (PTC)** attests that it arrived on time.
* If no bid is worth more than a locally built block, the cluster **builds the block itself** (self-build). Self-build is always available as a fallback.
* **Proposer preferences** replace validator registrations. SSV Node broadcasts the fee recipient and gas limit ahead of each upcoming proposal, so builders can bid accordingly.

| | Before the fork | After the fork |
| --- | --- | --- |
| Where bids come from | Relays, through an MEV client | Builders' bids on the network, plus optional [direct builders](#direct-builder-connections-optional) |
| Trust between proposer and builder | Relays act as trusted intermediaries | The protocol enforces the payment |
| Fee recipient and gas limit sent to builders | Validator registrations | Proposer preferences |
| Operator configuration | MEV enabled in the Beacon client, relays in the MEV client | None required |

SSV Node runs all the new duties (PTC attestations, proposer preferences, Gloas block proposals) automatically.

## Upgrade your nodes

1. Upgrade your Execution and Beacon clients to releases that support Glamsterdam. The supported versions are listed in the [Ethereum Foundation announcement](https://blog.ethereum.org/en/2026/10/16/glamsterdam-hoodi-announcement).
2. If you run multiple Beacon nodes, upgrade **all** of them.
3. Upgrade SSV Node to `v2.5.0` or later, and restart it **after** all Beacon nodes are upgraded:

```bash
docker pull ssvlabs/ssv-node:latest
```

:::danger Upgrade order matters
SSV Node reads the fork schedule **only once, at startup**, from the first Beacon node that connects. If a Beacon node later announces a fork that SSV Node doesn't know about, SSV Node logs an error. If the fork is 2 epochs away or less, SSV Node **shuts down on purpose**, because with an outdated fork schedule it would fail every duty after the fork.

It shuts down again on every restart while the Beacon node it reads the schedule from still lacks the fork. As that can be any of them, upgrade all Beacon nodes first, then restart SSV Node.
:::

## Default behavior

You don't need to configure anything for ePBS. Without any configuration, SSV Node asks the Beacon node for the most profitable option: the best bid from builders on the network, or a locally built block. If anything fails or no builder is available, the cluster builds the block itself.

Keep the following in mind:
* **Existing MEV setups stop being used at the fork.** In-protocol ePBS replaces the relay-based flow and validator registrations. [Configuring MEV](./configuring-mev) still applies until a network reaches the fork.
* **Gas limit still has to match across the cluster.** Proposer preferences are signed by the cluster, so all Operators in a cluster **must** use the same gas limit, as before. See [Gas Limit](/operators/operator-node/node-setup/gas-limit).

## Direct builder connections (optional)

On top of the builders' bids on the network, a cluster can connect directly to specific builders. SSV Node then passes authenticated bid requests for those builders to its Beacon node and, ahead of each proposal, submits builder preferences (the `MaxExecutionPayment` cap) to them through the Beacon node. This is an opt-in enhancement: if a builder is unavailable or anything fails, the cluster falls back to the default flow.

:::danger All Operators must use identical configuration
The builder authenticates the cluster with one signature over the `AuthData` of each builder, produced by the Operators together. **Every Operator of every cluster that shares a validator MUST configure the identical builder list** - all Operators, not just a quorum.

If the `AuthData` of a builder differs between Operators, that builder is **silently disabled** for the affected proposals. Proposals still succeed through bids on the network or self-build, so watch the [build source metric](#monitoring) rather than failed proposals.

Only set this up on clusters where you control all Operators, or coordinate with them.
:::

### Configuration

The `Builders` block can be set **only in the YAML configuration file**; there are no environment variables for it. The [SSV Stack setup](/operators/operator-node/node-setup/) configures the node through `ssv.env`, so to use direct builders follow the [Manual Node Setup](/operators/operator-node/node-setup/manual-setup) with a `config.yaml` file.

Add the block at the top level of your `config.yaml`:

```yaml
Builders:
  MinBid: 0                        # floor for bids on the network, and default for entries; 0 = no floor
  BuilderBoostFactor: 100          # multiplier % for builder bids, and default for entries; 0 = always local, 100 = neutral
  Entries:
    - URL: "https://builder.example.com"
      # AuthData: "0x..."          # omit to default to the URL's hostname
      # BuilderPubKeys: ["0x..."]  # optionally pin the builder's bid-signing key(s); empty = any
      # MaxExecutionPayment: 0     # cap on trusted execution-layer payment
      # MinBid: 0                  # optional; inherits the top-level MinBid
      # BuilderBoostFactor: 100    # optional; inherits the top-level BuilderBoostFactor
```

All amounts are in Gwei. Up to **8** entries are allowed. If the `Builders` block is invalid, SSV Node **will not start** and reports an `invalid Builders configuration` error.

| Field | Description |
| --- | --- |
| `MinBid` | Minimum bid accepted from builders on the network. Also the default for entries that don't set their own. `0` means no minimum. |
| `BuilderBoostFactor` | Percentage multiplier applied to builder bids when compared with a locally built block. Also the default for entries that don't set their own. `100` is neutral (most profitable wins), `0` always prefers a locally built block. |
| `Entries[].URL` | URL of the builder. Required. |
| `Entries[].AuthData` | Hex-encoded token agreed with the builder. Defaults to the hostname of `URL`. |
| `Entries[].BuilderPubKeys` | Optional list of public keys that bids from this builder must be signed with. Empty accepts any. |
| `Entries[].MaxExecutionPayment` | Maximum execution-layer payment trusted from this builder, sent to the builder ahead of the proposal. |
| `Entries[].MinBid` | Minimum bid for this builder. Inherits the top-level `MinBid` if omitted. |
| `Entries[].BuilderBoostFactor` | Multiplier for this builder. Inherits the top-level `BuilderBoostFactor` if omitted. |

:::info AuthData default
When `AuthData` is omitted, it defaults to the lowercase hostname of `URL`, ignoring scheme, port, and path. So URLs that differ only in a trailing slash, letter case, port, or path still produce the same `AuthData`. For edge cases (internationalized hostnames, IPv6 zones, several builders on one host), see the [SSV Node documentation on GitHub](https://github.com/ssvlabs/ssv/blob/v2.5.0/docs/EXTERNAL_BUILDERS.md).
:::

`MinBid`, `BuilderBoostFactor`, and `MaxExecutionPayment` are not part of the signature, so a mismatch doesn't disable a builder. However, the cluster's bid selection would then depend on which Operator leads the proposal, so keep them identical too.

Direct builder entries, `MinBid`, and the per-entry settings require a Beacon node that supports the new block production request ([beacon-APIs#630](https://github.com/ethereum/beacon-APIs/pull/630)). With an older Beacon node, only the top-level `BuilderBoostFactor` applies.

### Prefer locally built blocks

To always prefer a locally built block over builder bids (unless it isn't viable), set only the top-level knob, without any entries:

```yaml
Builders:
  BuilderBoostFactor: 0
```

## Proposer delay

`ProposerDelayEPBS` (`PROPOSER_DELAY_EPBS`) is the post-fork counterpart of `ProposerDelay`. It sets how long the Operator leading a proposal waits before requesting the block, which can result in higher bids. It applies from the Gloas fork on, while `ProposerDelay` applies before it.

It is disabled by default (`0`) and capped at `1s`, with no option to exceed it.

## Proposer round timeout

Starting from `v2.5.0`, the QBFT round budget for block proposals is `1.5s` (previously `2s`), so that a round change still fits before the earlier attestation deadline introduced by Glamsterdam. This change applies on all networks, regardless of the fork.

`LegacyProposerRoundTimeout` (`LEGACY_PROPOSER_ROUND_TIMEOUT`) restores `2s`. It is an emergency rollback only: it **must** be set identically across all Operators of every shared cluster, and takes effect only once at most *f* Operators of a cluster still use `1.5s`.

## Remote signer limitations

:::warning SSV Remote Signer
Web3Signer doesn't support the new Gloas signing types yet. From the Gloas fork on, an Operator using the [SSV Remote Signer](./remote-signer) fails these duties: Gloas block proposals (including the self-build execution payload), Gloas aggregation, PTC attestations, proposer preferences, and builder authentication.

The cluster still completes them as long as no more than *f* of its Operators use SSV Remote Signer (e.g. 1 out of 4).
:::

If `Builders` entries are configured together with SSV Remote Signer, SSV Node logs a warning at startup and ignores the entries. The top-level `MinBid` and `BuilderBoostFactor` are kept.

## Monitoring

The `ssv_runner_proposal_build_source_total` metric counts the Gloas block proposals successfully submitted by your node. Its `ssv_validator_duty_build_source` label is `builder` (the block commits to a builder's bid) or `local` (self-build). Use it to check whether proposals use builder bids, especially after configuring [direct builders](#direct-builder-connections-optional).

For technical details, see the [SSV Node documentation on GitHub](https://github.com/ssvlabs/ssv/blob/v2.5.0/docs/EXTERNAL_BUILDERS.md) and the [v2.5.0 release notes](https://github.com/ssvlabs/ssv/releases/tag/v2.5.0).
