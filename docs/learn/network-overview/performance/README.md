---
description: Understanding performance metrics in SSV Network
sidebar_position: 4
---

# Performance

The operator performance metric is a technical scoring system for operators in SSV Network.

The performance score is derived from operator participation in the network’s consensus duties, such as signing decided messages with the rest of a validator’s operator cluster. It is calculated as the percentage of duties attended within a given time frame.

### Macro and micro scoring

Performance can be measured at the macro level (operator) and micro level (validator). Users can view an operator’s score for each validator or across all validators they manage.

e.g. **Alice** the operator missed 24 duties in the last 24 hours for **validator #1**, while missing only 12 duties in the same time-frame for **validator #2**, will show the following 24 hours performance scoring:

* Performance per **validator #1** (micro) - 90% ((240-24)/240)
* Performance per **validator #2** (micro) - 95% ((240-12)/240)
* Performance of **Alice** (macro) - 92.5% (((240 * (# of validators) - 36)) / (240 * (# of validators)))

### Network Explorer

Operator scores can be viewed on operator pages and per validator through the following tools:

* [SSV Network Explorer](https://explorer.ssv.network)
* [SSV Scan](https://ssvscan.io/)
