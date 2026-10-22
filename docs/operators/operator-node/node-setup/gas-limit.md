---
title: Gas Limit
---

# Gas Limit Change

The default gas limit is 36M and SSV makes it configurable as long as the operator committees converge on the same value.

:::danger Warning
**Do this only on private operators, and on clusters where you either can control all the operators, or coordinate with them**.

All operators in the cluster **MUST** set the same gas limit. Otherwise, MEV registrations would fail. The validators would eventually not propose MEV blocks and instead fall back to vanilla blocks (non-MEV blocks built locally).

This still applies after the Gloas fork: proposer preferences, which carry the gas limit from then on, are signed by the cluster too. If not enough operators set the same value, the cluster can't produce a valid signature for them.
:::

## Configuration

The SSV node registers its validators to MEV relays with a preferred gas limit. From the [Gloas fork](/operators/operator-node/setup-sidecars/configuring-epbs) on, validator registrations stop, and the SSV node publishes the same gas limit in **proposer preferences** (through its Beacon node) instead.

Starting from SSV version `v2.1.1` this gas limit becomes configurable:

- For `.env` use `EXPERIMENTAL_GAS_LIMIT` variable
- For `.yaml` configuration file use the following
```yaml
ValidatorOptions:
    ExperimentalGasLimit: 45000000
```

Gas limit for vanilla blocks (non-MEV blocks built locally) are set by the Execution Node  which you should ideally be set to the same value.


## Verification 

Before the Gloas fork, you can verify the configuration change works by querying one of the MEV relays used by the operator:

```
https://<relay-url>/relay/v1/data/validator_registration?pubkey=0x<validator-pubkey>
```

Validators are registered in a round-robin fashion once an hour, so you may have to wait this long or check more validators.

After the Gloas fork, relays no longer receive validator registrations. Check that all operators in the cluster use the same `ExperimentalGasLimit` value instead.
