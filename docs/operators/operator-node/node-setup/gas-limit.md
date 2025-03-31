---
title: Gas Limit
unlisted: true
---

# Gas Limit Change

The default gas limit is 30M and SSV makes it configurable as long as the operator committees converge on the same value.

:::danger Attention
All operators in the committee **MUST** set the same gas limit. Otherwise, MEV registrations would fail. The validators would eventually not propose MEV blocks and instead fall back to vanilla blocks (non-MEV blocks built locally).

**Do this only on private operators, and on clusters where you either can control all the operators, or coordinate with them**.
:::

## Configuration

The SSV node registers its validators to MEV relays with a preferred gas limit. Starting from SSV version `v2.1.1` this gas limit becomes configurable:

- For `.env` use `EXPERIMENTAL_GAS_LIMIT` variable
- For `.yaml` configuration file use the following
```yaml
ValidatorOptions:
    ExperimentalGasLimit: 36000000
```

Gas limit for vanilla blocks (non-MEV blocks built locally) are set by the Execution Node  which you should ideally be set to the same value.


## Verification 

You can verify the configuration change works by querying one of the MEV relays used by the operator:

```
https://<relay-url>/relay/v1/data/validator_registration?pubkey=0x<validator-pubkey>
```

Validators are registered in a round-robin fashion once an hour, so you may have to wait this long or check more validators.