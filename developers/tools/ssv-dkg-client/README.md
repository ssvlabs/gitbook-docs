# SSV DKG Client

### What is Distributed Key Generation (DKG)

Distributed Key Generation is a cryptographic process that aims to solve the problem of coordinating `N` parties to cryptographically sign and verify signatures without relying on Trusted Third Parties. The process is demonstrated to be successful in computing a key pair in the presence of a number `T` attackers in a decentralized network. To do so, this algorithm generates a public key, and a secret key of which no single party knows, but has some share of. The involvement of many parties requires Distributed key generation to ensure secrecy in the presence of malicious contributions to the key calculation.

For more information about DKG in general, [please visit this page](https://en.wikipedia.org/wiki/Distributed_key_generation).

### SSV-DKG Client

SSV DKG leverages [drand's DKG protocol](https://drand.love/docs/cryptography/#setup-phase) implementation, which traditionally relies on a peer-to-peer network for operator communication. \
\
The `ssv-dkg` introduces a communication layer centered around an Initiator figure to facilitate inter-operator communication, eliminating the reliance on a fully decentralized network. \
\
To mitigate potential centralization risks and malicious actors, the system employs a robust mechanism of signatures and signature verifications, as elaborated in the [Security notes](./#security-notes) section.

Through the `ssv-dkg` client, stakers can initiate DKG ceremonies to generate new BLS key pairs for Ethereum validators and the key shares required for SSV network registration.

## Overview

In order for the DKG protocol to execute successfully:

* all the chosen Operators must be running the `ssv-dkg` tool as _Operators_
* separately, an _Initiator_ (one of the Operators, or a separate entity), starts the DKG ceremony by running the `ssv-dkg` tool with the `init` parameter
* the tool automatically exchange data between the interested parties, as outlined in the Architecture section, until the key shares are created

For details on how to run the tool as an Operator, please head over to [this sub-page containing the related instructions](../../../operator-user-guides/operator-node/installation/enabling-dkg/).

Similarly, head over to [this other sub-page ](generate-key-shares.md)for instructions on how to launch the tool as the Initiator of the DKG ceremony.

{% hint style="success" %}
**NOTE:** Threshold is computed automatically using 3f+1 tolerance.
{% endhint %}

## Flow Description

1. The Initiator creates an initiation (`init`) message, signs it and sends it to all Operators
2. Upon receiving initiation message, the Operators check Initiator message signature and create their own DKG identity:

* new DKG secrets created
* if a new `init` message with ID \[24]byte is received and at least 5 minutes have passed from the last `init` message with the same ID, the DKG instance is recreated
* `Exchange` signed message containing the DKG identity is created
* Operator replies to `init` message with the created `Exchange` message

3. The Initiator collects all responses into one combined message and verifies signatures
4. The Initiator sends back the combined message to all Operators
5. Each Operator receives combined `exchange` message and starts the DKG process, responding back to Initiator with a signed `dkg` deal bundle
6. The Initiator packs the deal bundles together and sends them back to all Operators
7. Operators process `dkg` bundles and finish the DKG protocol of creating a shared key. After DKG process is finished each Operator has a share of the shared key which can be used for signing
8. Each Operator signs a deposit root, using its share of the shared key, then encrypts the share with the initial RSA key and sends it to the Initiator
9. Initiator receives all messages from Operators with signatures/encrypted shares and prepares the deposit data with a signature and save it as JSON file
10. Initiator prepares a `keyshares.json` and a `deposit_data.json` file to register to SSV contract, and activate the validator(s) on the beacon chain, respectively.
11. After the deposit is successful and validator has registered to SSV contract, SSV Node Operators will accomplish validator duties using their share of the distributes key(s)

### Note on DKG instance management

A `ssv-dkg` can handle multiple DKG instances, it saves up to `MaxInstances` (1024) up to `MaxInstanceTime` (5 minutes). If a new `Init` arrives the `ssv-dkg` tries to clean instances older than `MaxInstanceTime` from the list. If any of them are found, they are removed and the incoming is added, otherwise it responds with an error, saying that the maximum number of instances is already running.

***

## Security Notes

{% hint style="info" %}
The `ssv-dkg` tool has recently been audited, you can find more details about it [on the Security page](../../security.md#audit-resources).
{% endhint %}

It is important to briefly explain how the communication between DKG ceremony Initiator and Operators is secured:

1. Initiator is using RSA key (2048 bits) to sign `init` message sent to Operators. Upon receiving the signature, Operators verify it using public key included in the `init` message. If the signature is valid, Operators store this pub key for further verification of messages coming from the Initiator(s).
2. Operators are using RSA key (SSV Operator key - 2048 bits) to sign every message sent back to Initiator.
3. Initiator verifies every incoming message from any Operator using ID and Public Key provided by Operators' info file, then Initiator creates a combined message and signs it.
4. Operators verify each of the messages from other Operators participating in the ceremony and verifies Initiator's signature of the combined message.
5. During the DKG protocol execution, the BLS auth scheme is used - G2 for its signature space and G1 for its public keys
