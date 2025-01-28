---
description: Understanding performance metrics in the SSV network
sidebar_position: 5
---

# Performance

The operator performance metric serves as a technical scoring system for operators in the ssv network.

The performance score is derived from the attendance/completion of operator duties in the consensus layer of the network (signing decided messages with the rest of the validator's operators cluster). It's calculated by the percentage of attended duties within a specific time frame.

### Macro and micro scoring

Performance scoring can be segmented by macro (operator) and micro (validator) levels - a user can see the operator's performance score for each validator or across all of their validators.

e.g. **Alice** the operator missed 24 duties in the last 24 hours for **validator #1**, while missing only 12 duties in the same time-frame for **validator #2**, will show the following 24 hours performance scoring:

* Performance per **validator #1** (micro) - 90% ((240-24)/240)
* Performance per **validator #2** (micro) - 95% ((240-12)/240)
* Performance of **Alice** (macro) - 92.5% (((240 * (# of validators) - 36)) / (240 * (# of validators)))

### Network Explorer

Operator's scores and performance can be viewed in corresponding operator pages and also per each validator at:

* [SSV Network Explorer](https://explorer.ssv.network)
* [SSV Scan](https://ssvscan.io/)
