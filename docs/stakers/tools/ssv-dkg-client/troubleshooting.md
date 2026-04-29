---
sidebar_label: 'Troubleshooting'
sidebar_position: 7
---

# Troubleshooting

Use this page for common `ssv-dkg` ceremony failures.

## Stable ceremony failure code

Treat `CEREMONY_FAILED` as the stable generic ceremony failure code.

- The operator may intentionally sanitize or redact the underlying internal error
- When you see it, verify inputs, operator metadata, and healthchecks first

## Common failures

### Symptom: `CEREMONY_FAILED`

**Likely cause**

- the operator rejected the ceremony during validation
- the underlying operator-side error was sanitized before being returned

**What to verify next**

- operator metadata is current
- operator endpoints match the operator RSA public keys in your operators info file
- the same operator set passes `ssv-dkg ping`
- `ping` uses the same operators info file you plan to use for the ceremony
- all operators are on a current `ssv-dkg` version

### Symptom: healthcheck signature validation fails

**Likely cause**

- the endpoint in your operators info file does not belong to the RSA public key you supplied
- the operator metadata is stale

**What to verify next**

- re-source operator metadata from a current source
- compare the operator ID, endpoint, and RSA public key together
- rerun `ping` using the exact operators info file you will use in the ceremony

### Symptom: ceremony fails before it fully starts

**Likely cause**

- stale or incomplete operator metadata
- mismatched operator IDs and endpoints
- an operator is offline or no longer serving DKG at that address

**What to verify next**

- each operator endpoint is reachable
- each endpoint returns a valid signed healthcheck response
- each operator ID exists in the operators info file only once

### Symptom: timeout-driven failure

Example:

```bash
2023-10-11T16:36:26.745937Z     FATAL   dkg-initiator   😥 Failed to initiate DKG ceremony:     {"error": "Post \"http://79.44.117.213:3030/init\": dial tcp 79.44.117.213:3030: i/o timeout"}
```

**Likely cause**

- the initiator cannot reach one of the selected operators
- the operator is overloaded or too slow to answer within the stricter timeout window

**What to verify next**

- operator endpoint reachability from the initiator host
- TLS configuration and CA certificates
- whether the operator host is online and healthy
- whether retrying with a different operator set is necessary

### Symptom: cleanup-driven failure or missing instance

**Likely cause**

- the operator cleaned up a stalled or expired ceremony instance
- the ceremony took too long between phases and the instance timed out

**What to verify next**

- restart the ceremony from the beginning
- avoid long delays between init and later ceremony phases
- check whether operators were slow, overloaded, or temporarily unavailable

If a ceremony stalls long enough, the operator may remove the instance and later messages will no longer match an active ceremony.

### Symptom: `[ERROR] failed to validate ceremony proof`

```bash
2025-02-18T11:46:49.637474Z	FATAL	dkg-initiator	😥 Failed to initiate DKG ceremony: 	{"error": "failed to validate ceremony proof: invalid proof validator pubkey"}
```

**Likely cause**

- a previous ceremony artifact does not match the validator or operator set you are trying to use
- operator performance or hardware constraints caused proof validation to fail during the ceremony

**What to verify next**

- the `proofs.json` file came from the correct validator and ceremony
- the operator set matches the proof set you are using
- operator and initiator hardware meet the [DKG requirements](/operators/operator-node/setup-sidecars/enabling-dkg/prerequisites)

### Symptom: `[ERROR] invalid URI for request`

```bash
2023-10-11T16:29:47.226138Z     FATAL   dkg-initiator   😥 Failed to load operators:    {"error": "invalid operator URL parse \"80.181.85.114:3030\": invalid URI for request"}
```

**Likely cause**

- an operator endpoint is malformed

**What to verify next**

- every endpoint includes the correct scheme and host
- the operators info JSON was not manually edited incorrectly

### Symptom: `[ERROR] connection refused`

```bash
2023-10-13T15:21:54.597429Z     FATAL   dkg-initiator   😥 Failed to initiate DKG ceremony:     {"error": "Post \"http://80.181.85.114:3030/init\": dial tcp 80.181.85.114:3030: connect: connection refused"}
```

**Likely cause**

- the operator host is reachable, but the DKG service is not accepting connections

**What to verify next**

- the operator still exposes the DKG endpoint
- the endpoint port is correct
- the operator is not down or restarting

### Symptom: `[ERROR] Please provide either operator info string or path`

```bash
2023-10-18T12:14:52.667985Z     FATAL   dkg-initiator   😥 Please provide either operator info string or path, not both
```

**Likely cause**

- you supplied both `operatorsInfo` and `operatorsInfoPath`

**What to verify next**

- keep only one of those inputs in your YAML file or command

## Practical recovery checklist

When a ceremony fails, check these in order:

1. rerun `ssv-dkg ping` using the same operators info file you plan to use for the ceremony
2. confirm that file still contains the correct operator IDs, endpoints, and RSA public keys
3. refresh operator metadata from a current source
4. confirm the operator IDs, endpoints, and RSA public keys still match
5. confirm `proofs.json` belongs to the validator and operator set you expect
6. retry with healthy operators if a timeout or connectivity issue persists
