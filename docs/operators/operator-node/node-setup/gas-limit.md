---
title: Gas Limit
unlisted: true
---

# Gas Limit Change

Recently, Ethereum community suggested an increase in Gas Limit to 36M (see https://pumpthegas.org). 

The default gas limit is 30M and recent SSV release makes it configurable as long as the operator committees converge on the same value.

:::danger Attention
All operators in the committee **MUST** set the same gas limit, otherwise MEV registrations would fail and the validators would eventually not propose MEV blocks and instead fall back to local non-MEV blocks.

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

Gas limit for local blocks (non-MEV) are set by the Execution Node  which you should ideally be set to the same value.


## Verification 

You can verify the configuration change works by querying one of the MEV relays used by the operator:

```
https://<relay-url>/relay/v1/data/validator_registration?pubkey=0x<validator-pubkey>
```

Validators are registered in a round-robin fashion once an hour, so you may have to wait this long or check more validators.