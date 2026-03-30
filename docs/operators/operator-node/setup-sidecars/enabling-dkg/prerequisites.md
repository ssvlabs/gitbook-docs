---
title: Prerequisites
sidebar_position: 1
---

# Prerequisites

## Minimum requirements

The minimum requirement is an AWS `t3.small` or an equivalent machine dedicated to DKG.
The recommended requirement is an AWS `t3.medium` or higher ([AWS instance types](https://aws.amazon.com/ec2/instance-types/)).

Minimum docker resource allocations:

```yaml
deploy:
  resources:
    limits:
      cpus: "1"
      memory: 500M
```

:::info Please Note
Compute requirements increase with the number of validators being created at the same time.
An idle DKG node uses very few resources.
:::

## Prerequisites

To participate successfully in DKG ceremonies initiated by Stakers, prepare the following:

* **Operator ID** - the ID of your operator within the SSV network.
* **Operator key pair**
  * **Public Key** - the public key of the operator 
  * **Private Key** - the Operator private key as a password-encrypted file (if you only have a raw private key, follow [this migration guide](/operators/operator-node/maintenance/troubleshooting/#faq) to encrypt it)
* **Machine endpoint** - the endpoint (`protocol:ip:port`, for example `https://my-dkg.com:3030`) of the machine that will run `ssv-dkg` (you can use a domain name instead of an IP)

:::warning
You **must use the same private and public keys** as your SSV Operator when running `ssv-dkg`. Using a different key will prevent the DKG ceremony from completing successfully.
:::
