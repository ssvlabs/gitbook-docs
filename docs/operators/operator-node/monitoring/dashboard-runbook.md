---
title: Dashboard Runbook
sidebar_position: 1
---

import Link from '@docusaurus/Link';

# Dashboard Runbook

<Link 
  to="/files/SSV-Operational-dashboard.json"
  target="_blank"
  download
  className="button button--primary button--lg"
>
  Download SSV Operational Dashboard
</Link>

<br />
<br />

:::info
The dashboards cover many SSV Node subsystems. That can feel overwhelming at first, so this page focuses on what to watch and how to use the panels for diagnosis.
:::

This page explains what to look for and how to interpret it. Not every panel is equally useful in production, but many of them help when diagnosing infrastructure or client issues.

### P2P Discovery 

**Description:** Handles discovery of new peers, peer scoring, and connection attempts. High rejection rates are often normal during discovery.

**Key Metrics to Monitor:**

* `ssv_p2p_discovery_peers_total`: Total discovered peers.
* `ssv_p2p_discovery_peers_accepted_total`: Accepted peers during discovery.
* `ssv_p2p_discovery_peers_rejected_total`: Rejected peers (with `ssv_p2p_discovery_rejection_reason`).

**Things to Watch For:**

* **Overall low rates:** If rates stay low, the node may not be discovering peers.

**Recommendations:**

* Verify firewall rules, network configuration, and security groups.

***

### P2P Peers

**Description:** Tracks active connections, including direction (inbound or outbound), versions, and subnet distribution.

**Key Metrics to Monitor:**

* `ssv_p2p_connections_connected_total`: Total connected peers.
* `ssv_p2p_connections_disconnected_total`: Total disconnected peers.
* `ssv_p2p_connections_active`: Number of active connections.

**Things to Watch For:**

* **Frequent Disconnects:** This may indicate network instability or misconfiguration.
* **Low overall connections:** If your node has very few peers, it may struggle to propagate messages, which can hurt validator performance.
* **Low inbound or outbound connections:** Low inbound connections may mean peers cannot discover your node. Low outbound connections may indicate connection issues on your side.

**Recommendations:**

* Verify firewall and network configurations/security groups.

***

### P2P Traffic

**Description:** Manages inbound and outbound messages, stream requests, and responses. When running an exporter node, you will only see inbound messages, as outbound messages are only considered those that the node itself broadcasts.

**Key Metrics to Monitor:**

* `ssv_p2p_messages_in_total`: Total inbound messages.
* `ssv_p2p_messages_out_total`: Total outbound messages.

**Things to Watch For:**

* **Low Rates:** If your node is not receiving any inbound messages, it could mean it's not participating in the network.

**Recommendations:**

* Review network configurations, firewall rules, and security groups where relevant.

***

### P2P Message Validation

**Description:** This component is responsible for validating that messages are correct and meet a set of rules. This is an important component, as your node will only relay messages to other peers when the message is valid.

**Key Metrics to Monitor:**

* `ssv_p2p_message_validations_accepted_total`: Successfully validated messages.
* `ssv_p2p_message_validations_duration_seconds_bucket`: Validation duration.

**Things to Watch For:**

* **Increased Validation Times:** If your node is taking longer than usual to validate messages, it may warrant further investigation.
* **Ignored/Rejected Messages:** If your node is rejecting or ignoring a lot of messages, you can take a look at the reason label to investigate further.

***

### Duty Scheduler

**Description:** This component is responsible for scheduling and coordinating the Ethereum duties that your node will perform.

**Key Metrics to Monitor:**

* `ssv_duty_scheduler_executions_total`: Total duties executed.
* `ssv_duty_scheduler_slot_ticker_delay_duration_seconds_bucket`: Slot ticker delay duration.

**Things to Watch For:**

* **High Slot Delays:** This may lead to late executions. Within a heatmap, if you see peaks of high delays, it may indicate that your node is not performing duties on time.
* **Irregular Execution Counts:** Verify that duties can be plotted as a regular pattern through the use of `rate()`, if not, it may indicate that there are blips in the scheduling of duties.

**Recommendations:**

* Check that the Ethereum clients are healthy and that the latency to the clients is low.

***

### Event Syncer

**Description:** This component is responsible for processing events from the SSV network Ethereum smart contract. Among other things, it signals the SSV node w,hich validators it should manage on behalf of other users.

**Key Metrics to Monitor:**

* `ssv_event_syncer_handler_last_processed_block`: Last processed block.

**Things to Watch For:**

* **Stalled Block Processing:** The processed block should always be increasing, if it's not, it may indicate that the node is not processing events correctly.

**Recommendations:**

* Check SSV node logs for errors, as well as the Ethereum client logs.

***

### Runners

**Description:** Handles various stages of validator operations, including pre-consensus, consensus, and post-consensus. This section should help you visualize how much time is taken on each stage of a validator's duty lifecycle.

**Key Metrics to Monitor:**

* `ssv_validator_pre_consensus_duration_seconds_bucket`: Pre-consensus duration.
* `ssv_validator_consensus_duration_seconds_bucket`: Consensus duration.
* `ssv_validator_post_consensus_duration_seconds_bucket`: Post-consensus duration.

**Things to Watch For:**

* **Prolonged Durations:** If you notice that your duties are taking longer than usual, it may indicate degraded performance in the stack. For example, if the full cycle of a `PROPOSAL` duty is taking longer than usual, it may be worth looking into MEV-Boost or the beacon node to investigate further.

**Recommendations:**

* Verify that Ethereum clients are in sync and healthy.
* Consideration of third-party software for block production and the associated latency.

***

### Validator

**Description:** Tracks validator logic, including statuses, errors, and duty submissions.

**Key Metrics to Monitor:**

* `ssv_validator_validators_per_status`: Validators by status.
* `ssv_validator_submissions`: Number of submissions per role.

**Things to Watch For:**

* **Unexpected Status Changes:** If slashing were to happen, this is how you would be notified.
* **Low Submission Counts:** Since each validator needs to attest in a given epoch, we can assume that you need to submit the same number of attestations as validators an operator manages. If you see a discrepancy, it may be worth investigating.
* **Failed Submissions:** If you see a lot of failed submissions, it may be worth investigating the reason why. The metric `ssv_validator_submissions_failed_total` will also tell about failures per role.

**Recommendations:**

* Verify that Ethereum clients are in sync and healthy.

***

### QBFT Consensus Instance

**Description:** Handles QBFT consensus instances. This allows more granular information over a full consensus instance and allows one to see the duration of each stage (commit, prepare, proposal) and consensus round.

**Key Metrics to Monitor:**

* `ssv_validator_stage_duration_seconds_bucket`: Duration of each validator stage.

***

### Ethereum Clients

**Description:** Monitors interactions and synchronization with Consensus and Execution Layer clients.

**Key Metrics to Monitor:**

* **Consensus Layer:**
  * `ssv_cl_sync_distance`: Sync distance.
  * `ssv_cl_sync_status`: Sync status.
* **Execution Layer:**
  * `ssv_el_sync_distance`: Sync distance.
  * `ssv_el_sync_status`: Sync status.

**Things to Watch For:**

* **Long Sync Distances:** Indicates the node is lagging behind the head of the chain.
* **Slow Responses:** Suggests performance issues with the clients.

**Recommendations:**

* Ensure Ethereum clients are running optimally.
* Ensure your clients have their ports open and all relevant firewall rules are set for appropriate discovery.
