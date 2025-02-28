---
title: Dashboard Runbook
sidebar_position: 2
---

import Link from '@docusaurus/Link';

# Dashboard Runbook

<Link 
  to="/img/SSV-Operational-dashboard.json"
  target="_blank"
  download
  className="button button--primary button--lg"
>
  Download SSV Operational Dashboard
</Link>

<br />
<br />

:::info
The dashboards cover many of the subsystems that make up the SSV node, which may seem a bit overwhelming at first; however, we will try to simplify the processes that we use to diagnose issues as well as things to look out for.
:::

In this section, we go over what things to look out for and how to monitor them. Not all of the metrics/panels may be useful for the end user to monitor in production, but they may aid in diagnosing issues either at an infrastructure level or client level.

### P2P Discovery <a href="#p2p-discovery" id="p2p-discovery"></a>

**Description:** Handles the discovery of new peers on the network, scoring them, and connecting to them where relevant. Generally, you don't need to worry about high rejection rates, as this is a normal part of the discovery process.

**Key Metrics to Monitor:**

* `ssv_p2p_discovery_peers_total`: Total discovered peers.
* `ssv_p2p_discovery_peers_accepted_total`: Accepted peers during discovery.
* `ssv_p2p_discovery_peers_rejected_total`: Rejected peers (with `ssv_p2p_discovery_rejection_reason`).

**Things to Watch For:**

* **Overall Low Rates:** If you see low rates, it means that your node is not discovering any peers.

**Recommendations:**

* Verify firewall and network configurations/security groups.

***

### P2P Peers <a href="#p2p-peers" id="p2p-peers"></a>

**Description:** Tracks and manages active connections, including their direction (inbound/outbound), versions, and subnet distributions.

**Key Metrics to Monitor:**

* `ssv_p2p_connections_connected_total`: Total connected peers.
* `ssv_p2p_connections_disconnected_total`: Total disconnected peers.
* `ssv_p2p_connections_active`: Number of active connections.

**Things to Watch For:**

* **Frequent Disconnects:** This may indicate network instability or misconfiguration.
* **Low Overall Connections:** If your node is connected to very few peers, it will struggle to propagate messages through peer-to-peer communication, which may impact the performance of the validators that your node manages.
* **Low Inbound/Outbound Connections:** If your node has low inbound connections, it means other peers in the network may not be able to discover and communicate with your node. The same goes for outbound connections; it may signal outbound connection issues.

**Recommendations:**

* Verify firewall and network configurations/security groups.

***

### P2P Traffic <a href="#p2p-traffic" id="p2p-traffic"></a>

**Description:** Manages inbound and outbound messages, stream requests, and responses. When running an exporter node, you will only see inbound messages, as outbound messages are only considered those that the node itself broadcasts.

**Key Metrics to Monitor:**

* `ssv_p2p_messages_in_total`: Total inbound messages.
* `ssv_p2p_messages_out_total`: Total outbound messages.

**Things to Watch For:**

* **Low Rates:** If your node is not receiving any inbound messages, it could mean it's not participating in the network.

**Recommendations:**

* Review network configurations, firewall rules, and security groups where relevant.

***

### P2P Message Validation <a href="#p2p-message-validation" id="p2p-message-validation"></a>

**Description:** This component is responsible for validating that messages are correct and meet a set of rules. This is an important component, as your node will only relay messages to other peers when the message is valid.

**Key Metrics to Monitor:**

* `ssv_p2p_message_validations_accepted_total`: Successfully validated messages.
* `ssv_p2p_message_validations_duration_seconds_bucket`: Validation duration.

**Things to Watch For:**

* **Increased Validation Times:** If your node is taking longer than usual to validate messages, it may warrant further investigation.
* **Ignored/Rejected Messages:** If your node is rejecting or ignoring a lot of messages, you can take a look at the reason label to investigate further.

***

### Duty Scheduler <a href="#duty-scheduler" id="duty-scheduler"></a>

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

### Event Syncer <a href="#event-syncer" id="event-syncer"></a>

**Description:** This component is responsible for processing events from the SSV network Ethereum smart contract. Among other things, it signals the SSV node w,hich validators it should manage on behalf of other users.

**Key Metrics to Monitor:**

* `ssv_event_syncer_handler_last_processed_block`: Last processed block.

**Things to Watch For:**

* **Stalled Block Processing:** The processed block should always be increasing, if it's not, it may indicate that the node is not processing events correctly.

**Recommendations:**

* Check SSV node logs for errors, as well as the Ethereum client logs.

***

### Runners <a href="#runners" id="runners"></a>

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

### Validator <a href="#validator" id="validator"></a>

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

### QBFT Consensus Instance <a href="#qbft-consensus-instance" id="qbft-consensus-instance"></a>

**Description:** Handles QBFT consensus instances. This allows more granular information over a full consensus instance and allows one to see the duration of each stage (commit, prepare, proposal) and consensus round.

**Key Metrics to Monitor:**

* `ssv_validator_stage_duration_seconds_bucket`: Duration of each validator stage.

***

### Ethereum Clients <a href="#ethereum-clients" id="ethereum-clients"></a>

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