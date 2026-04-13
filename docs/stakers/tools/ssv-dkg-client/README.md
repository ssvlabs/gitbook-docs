---
sidebar_label: 'SSV DKG Client'
sidebar_position: 4
---

# SSV DKG Client

The SSV DKG Client lets stakers create validator key shares through a distributed key generation (DKG) ceremony. In this flow, the full validator private key is never assembled in one place.

## What DKG does

Distributed key generation is a cryptographic process that allows multiple parties to create and use a shared key without any one party holding the full secret key.

For general background, see [Distributed key generation on Wikipedia](https://en.wikipedia.org/wiki/Distributed_key_generation).

## How the SSV DKG Client works

SSV DKG uses [drand's DKG protocol](https://drand.love/docs/cryptography/#setup-phase) with an initiator-based communication flow. Instead of relying on a fully decentralized peer-to-peer setup, one initiator coordinates the ceremony between the selected operators.

This coordination model is protected by signatures and signature verification throughout the ceremony. See [Security Notes](#security-notes).

## Documentation flow

Use these pages in order:

1. Read this page for the high-level model.
2. Use [Generate Key Shares](generate-key-shares) to start a new DKG ceremony.
3. Review [Ceremony Output Summary](ceremony-output-summary) to understand the generated files.
4. Use [Update Owner Nonce in Key Shares](update-owner-nonce-in-key-shares) or [Change Operator Set and Reshare Validator Key Shares](change-operator-set-and-reshare-validator-key-shares) only when you need those maintenance flows.

If you are an operator enabling DKG support, see [Enabling DKG](/operators/operator-node/setup-sidecars/enabling-dkg).

## Overview

For a DKG ceremony to succeed:
- the selected operators must be running `ssv-dkg` in operator mode
- one initiator must start the ceremony with the `init` command
- the tool exchanges the required messages until it produces validator deposit data and key shares

:::info
Threshold is calculated automatically using 3f+1 tolerance.
:::

## Flow description

1. The initiator creates and signs an `init` message, then sends it to all operators.
2. Each operator verifies the initiator signature, creates its DKG identity, and replies with a signed `exchange` message.
3. The initiator collects and verifies the responses.
4. The initiator sends a combined message back to the operators.
5. Operators start the DKG process and send signed deal bundles back to the initiator.
6. The initiator combines the deal bundles and sends them back to the operators.
7. Operators complete the DKG process and each operator ends with a share of the shared key.
8. Each operator signs the deposit root with its share, encrypts the share, and sends the result to the initiator.
9. The initiator prepares the deposit data and saves it as JSON.
10. The initiator writes `keyshares.json` and `deposit_data.json` files.
11. After deposit and SSV registration, operators perform validator duties using their shares.

## Note on DKG instance management

`ssv-dkg` can manage multiple DKG instances. It keeps up to `MaxInstances` (1024) for up to `MaxInstanceTime` (5 minutes). When a new `init` arrives, the tool first tries to remove expired instances before accepting the new one.

***

## Security Notes

:::info
The `ssv-dkg` tool has been audited. See [Audits](/learn/security/audits) for details, including the follow-up audit that covered key-share regeneration through DKG.
:::

The ceremony is secured as follows:

1. The initiator signs the `init` message with an RSA key. Operators verify that signature using the included public key.
2. Operators sign every response with their own RSA keys.
3. The initiator verifies all operator messages using the operator IDs and public keys from the operators info file.
4. Operators verify each other's messages and the initiator's signature on the combined message.
5. During the DKG protocol itself, the tool uses the BLS auth scheme with G2 signatures and G1 public keys.
