---
description: Understanding network participant statuses
sidebar_position: 2
---

# Statuses

The status of network participants serves as a monitoring metric for the activity and functionality of the network members.

<div style={{ textAlign: 'center' }}>
  <img src="/img/statuses-1.png" alt="Statuses" />
</div>

The status, which can be either **'active'** or **'inactive,'** is derived from the operator's attendance of duties and refers to their status within the ssv network, not **the beacon chain.**

All participants are regarded as "active" unless the cases below apply:

* **Validator** - its operators carried out no duties in the last 10 epochs.
* **Operator** - has not carried out any duties for the previous 10 epochs for the majority of his validators.
