---
description: Understanding performance metrics in SSV Network
sidebar_position: 4
---

# Performance

Performance measures how well operators fulfill actual consensus responsibilities for the validators they help run.

The score is duty-aware and role-aware. It reflects what happened during consensus for each evaluated slot, including multiple rounds within a slot, rather than treating performance as a simple percentage of duties attended.

In plain language, the consensus flow is:

`leader* -> prepares -> commits -> pre-consensus** -> post-consensus`

- For each duty, there is only one randomly chosen `leader`.
- `pre-consensus` applies only to Aggregator, Sync Committee, and Proposer duties.

## Scored duties

Each scored step contributes a fixed weight when it is completed:

| Duty step | Score |
| --- | --- |
| leader | 4 if completed, else 0 |
| prepares | 1 if completed, else 0 |
| commits | 1 if completed, else 0 |
| pre-consensus | 1 if completed, else 0 |
| post-consensus | 1 if achieved, else 0 |

Leadership and proposal-related work carry more weight because they have greater responsibility and impact on consensus outcomes.

## Duty categories

Performance is evaluated across these duty categories:

- **Attestation**
- **Aggregator**
- **Sync Committee**
- **Block Proposal**

Committee, Aggregator, and Sync Committee are **Standard Consensus** duties. Proposer is a **Proposal Consensus** duty.

When both kinds of duties occur in the measured period, the final score combines them as follows:

- **Standard Consensus Duties**: `5/8`
- **Proposal Consensus Duties**: `3/8`

If no proposal duties occurred during the measured period, the score is based entirely on Standard Consensus duties.

## Micro and macro scoring

See [Performance Scoring Formulae page](formulae) for more details. Also, [Statuses page](statuses) shows how these scores appear in the Explorer. 

Below is an explanation in plain-english.

### Micro score

The micro score is the performance score for a specific validator or committee context, depending on what is being viewed.

It is based on the score earned versus the maximum possible score across the evaluated slots. If proposal duties exist in that period, the result combines Standard Consensus and Proposal Consensus performance using the `5/8` and `3/8` weights.

### Macro score

The macro score is the operator-level score.

It is calculated as the arithmetic mean of validator-specific performance scores. It is not one pooled ratio across all duties for all validators.

### Network Explorer

Operator scores can be viewed on operator pages and per validator in the following tools:

* [SSV Network Explorer](https://explorer.ssv.network)
* [SSV Scan](https://ssvscan.io/)
