---
description: Reference formulas for calculating performance scores in SSV Network
sidebar_position: 5
---

# Performance Scoring Formulae

At a high level, duty-level scoring produces a slot-level earned score `σ` and maximum score `µ`. Slot-level aggregation feeds micro scoring, and validator-level micro scoring feeds macro scoring.

The weighted form is used only when Proposal Consensus duties are present in the measured interval. In that case, the weighting is:

- Standard Consensus: `5/8`
- Proposal Consensus: `3/8`

## Micro score

$$
\mathrm{Performance}_{micro} =
\begin{cases}
\left(\dfrac{\sum_{s \in S} \sigma_s}{\sum_{s \in S} \mu_s}\right)\times 100, & \text{If no proposal duties occurred} \\
\left(
\dfrac{5}{8}\cdot\dfrac{\sum_{s \in S_{std}} \sigma_s}{\sum_{s \in S_{std}} \mu_s}
+
\dfrac{3}{8}\cdot\dfrac{\sum_{s \in S_{prop}} \sigma_s}{\sum_{s \in S_{prop}} \mu_s}
\right)\times 100, & \text{If proposal duties did occur} \\
\end{cases}
$$

#### Legend:
* $S$ - Set of all slots evaluated for the operator
* $σ_s$ - Score earned in slot `s`
* $µ_s$ - Maximum possible score in slot `s`
* $S_{std}$ - Slots with Standard Consensus duties
* $S_{prop}$ - Slots with Proposal Consensus duties

In plain language, micro scoring is based on earned score by operator versus maximum possible score across the evaluated slots.

## Macro score

$$
\mathrm{Performance}_{macro}
=
\frac{1}{|V|}
\sum_{v \in V}
\begin{cases}
\left(\dfrac{\sum_{s \in S_v} \sigma_{v,s}}{\sum_{s \in S_v} \mu_{v,s}}\right)\times 100, & \text{if } S_{prop,v} = \varnothing \\
\left(
\dfrac{5}{8}\cdot\dfrac{\sum_{s \in S_{std,v}} \sigma_{v,s}}{\sum_{s \in S_{std,v}} \mu_{v,s}}
+
\dfrac{3}{8}\cdot\dfrac{\sum_{s \in S_{prop,v}} \sigma_{v,s}}{\sum_{s \in S_{prop,v}} \mu_{v,s}}
\right)\times 100, & \text{otherwise}
\end{cases}
$$

#### Legend:
* $V$ - Set of validators served by the operator
* $S_v$ - Set of all slots evaluated for the operator
* $S_{std,v}$ - Standard Consensus slots for validator `v`
* $S_{prop,v}$ - Proposal Consensus slots for validator `v`
* $σ_{v,s}$ - Score earned for validator `v` in slot `s`
* $µ_{v,s}$ - Maximum possible score for validator `v` in slot `s`


In plain language, macro scoring is the arithmetic mean of validator-level scores.

It is an equal average across validators served by the operator. It is not a pooled global earned-score divided by global maximum-score ratio.

Standard Consensus and Proposal Consensus are the same categories described in the [Performance](./README.md) overview. This page documents only the stable high-confidence formulas used for slot, micro, and macro scoring.
