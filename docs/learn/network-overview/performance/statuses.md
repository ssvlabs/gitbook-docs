---
description: Understanding network participant statuses
sidebar_position: 2
---

# Statuses

Participant status is a monitoring signal for whether network members are currently active in SSV Network.

<div style={{ textAlign: 'center' }}>
  <img src="/img/statuses-1.png" alt="Statuses" />
</div>

The status can be either **active** or **inactive**. It is derived from duty attendance and refers to status within SSV Network, not on the **Beacon Chain**. In short, it indicates recent participation in SSV duties.

All participants are regarded as "active" unless the cases below apply:

* **Validator** - its operators carried out no duties in the last 10 epochs.
* **Operator** - has not carried out any duties for the previous 10 epochs for the majority of their validators.
