---
title: Metrics Index
sidebar_position: 2
---

This document outlines the metrics instrumented in the SSV node (upstream dependencies not included), including their types, descriptions, and labels. They can help you build your own dashboards.

### Table of Contents

* [otel\_scope\_info](metrics-index.md#otel_scope_info)
* [ssv\_cl\_request\_duration\_seconds\_bucket](metrics-index.md#ssv_cl_request_duration_seconds_bucket)
* [ssv\_cl\_request\_duration\_seconds\_count](metrics-index.md#ssv_cl_request_duration_seconds_count)
* [ssv\_cl\_request\_duration\_seconds\_sum](metrics-index.md#ssv_cl_request_duration_seconds_sum)
* [ssv\_cl\_sync\_distance](metrics-index.md#ssv_cl_sync_distance)
* [ssv\_cl\_sync\_status](metrics-index.md#ssv_cl_sync_status)
* [ssv\_duty\_scheduler\_executions\_total](metrics-index.md#ssv_duty_scheduler_executions_total)
* [ssv\_duty\_scheduler\_slot\_ticker\_delay\_duration\_seconds\_bucket](metrics-index.md#ssv_duty_scheduler_slot_ticker_delay_duration_seconds_bucket)
* [ssv\_duty\_scheduler\_slot\_ticker\_delay\_duration\_seconds\_count](metrics-index.md#ssv_duty_scheduler_slot_ticker_delay_duration_seconds_count)
* [ssv\_duty\_scheduler\_slot\_ticker\_delay\_duration\_seconds\_sum](metrics-index.md#ssv_duty_scheduler_slot_ticker_delay_duration_seconds_sum)
* [ssv\_el\_request\_duration\_seconds\_bucket](metrics-index.md#ssv_el_request_duration_seconds_bucket)
* [ssv\_el\_request\_duration\_seconds\_count](metrics-index.md#ssv_el_request_duration_seconds_count)
* [ssv\_el\_request\_duration\_seconds\_sum](metrics-index.md#ssv_el_request_duration_seconds_sum)
* [ssv\_el\_sync\_distance](metrics-index.md#ssv_el_sync_distance)
* [ssv\_el\_sync\_last\_processed\_block](metrics-index.md#ssv_el_sync_last_processed_block)
* [ssv\_el\_sync\_status](metrics-index.md#ssv_el_sync_status)
* [ssv\_event\_syncer\_handler\_last\_processed\_block](metrics-index.md#ssv_event_syncer_handler_last_processed_block)
* [ssv\_p2p\_connections\_active](metrics-index.md#ssv_p2p_connections_active)
* [ssv\_p2p\_connections\_connected\_total](metrics-index.md#ssv_p2p_connections_connected_total)
* [ssv\_p2p\_connections\_disconnected\_total](metrics-index.md#ssv_p2p_connections_disconnected_total)
* [ssv\_p2p\_discovery\_peers\_accepted\_total](metrics-index.md#ssv_p2p_discovery_peers_accepted_total)
* [ssv\_p2p\_discovery\_peers\_skipped\_total](metrics-index.md#ssv_p2p_discovery_peers_skipped_total)
* [ssv\_p2p\_discovery\_peers\_total](metrics-index.md#ssv_p2p_discovery_peers_total)
* [ssv\_p2p\_message\_validations\_accepted\_total](metrics-index.md#ssv_p2p_message_validations_accepted_total)
* [ssv\_p2p\_message\_validations\_duration\_seconds\_bucket](metrics-index.md#ssv_p2p_message_validations_duration_seconds_bucket)
* [ssv\_p2p\_message\_validations\_duration\_seconds\_count](metrics-index.md#ssv_p2p_message_validations_duration_seconds_count)
* [ssv\_p2p\_message\_validations\_duration\_seconds\_sum](metrics-index.md#ssv_p2p_message_validations_duration_seconds_sum)
* [ssv\_p2p\_message\_validations\_total](metrics-index.md#ssv_p2p_message_validations_total)
* [ssv\_p2p\_messages\_in\_total](metrics-index.md#ssv_p2p_messages_in_total)
* [ssv\_p2p\_messages\_out\_total](metrics-index.md#ssv_p2p_messages_out_total)
* [ssv\_p2p\_peers\_connected](metrics-index.md#ssv_p2p_peers_connected)
* [ssv\_p2p\_peers\_per\_topic](metrics-index.md#ssv_p2p_peers_per_topic)
* [ssv\_p2p\_peers\_per\_version](metrics-index.md#ssv_p2p_peers_per_version)
* [ssv\_p2p\_stream\_requests\_sent\_total](metrics-index.md#ssv_p2p_stream_requests_sent_total)
* [ssv\_p2p\_stream\_responses\_received\_total](metrics-index.md#ssv_p2p_stream_responses_received_total)
* [ssv\_runner\_consensus\_duration\_seconds\_bucket](metrics-index.md#ssv_runner_consensus_duration_seconds_bucket)
* [ssv\_runner\_consensus\_duration\_seconds\_count](metrics-index.md#ssv_runner_consensus_duration_seconds_count)
* [ssv\_runner\_consensus\_duration\_seconds\_sum](metrics-index.md#ssv_runner_consensus_duration_seconds_sum)
* [ssv\_runner\_duty\_duration\_seconds\_bucket](metrics-index.md#ssv_runner_duty_duration_seconds_bucket)
* [ssv\_runner\_duty\_duration\_seconds\_count](metrics-index.md#ssv_runner_duty_duration_seconds_count)
* [ssv\_runner\_duty\_duration\_seconds\_sum](metrics-index.md#ssv_runner_duty_duration_seconds_sum)
* [ssv\_runner\_post\_consensus\_duration\_seconds\_bucket](metrics-index.md#ssv_runner_post_consensus_duration_seconds_bucket)
* [ssv\_runner\_post\_consensus\_duration\_seconds\_count](metrics-index.md#ssv_runner_post_consensus_duration_seconds_count)
* [ssv\_runner\_post\_consensus\_duration\_seconds\_sum](metrics-index.md#ssv_runner_post_consensus_duration_seconds_sum)
* [ssv\_runner\_pre\_consensus\_duration\_seconds\_bucket](metrics-index.md#ssv_runner_pre_consensus_duration_seconds_bucket)
* [ssv\_runner\_pre\_consensus\_duration\_seconds\_count](metrics-index.md#ssv_runner_pre_consensus_duration_seconds_count)
* [ssv\_runner\_pre\_consensus\_duration\_seconds\_sum](metrics-index.md#ssv_runner_pre_consensus_duration_seconds_sum)
* [ssv\_runner\_submissions](metrics-index.md#ssv_runner_submissions)
* [ssv\_validator\_duty\_rounds\_changed\_total](metrics-index.md#ssv_validator_duty_rounds_changed_total)
* [ssv\_validator\_stage\_duration\_seconds\_bucket](metrics-index.md#ssv_validator_stage_duration_seconds_bucket)
* [ssv\_validator\_stage\_duration\_seconds\_count](metrics-index.md#ssv_validator_stage_duration_seconds_count)
* [ssv\_validator\_stage\_duration\_seconds\_sum](metrics-index.md#ssv_validator_stage_duration_seconds_sum)
* [ssv\_validator\_validators\_per\_status](metrics-index.md#ssv_validator_validators_per_status)

***

#### `otel_scope_info`

**Type:** gauge

**Description:** Instrumentation Scope metadata

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_cl_request_duration_seconds_bucket`

**Type:** histogram

**Description:** consensus client request duration in seconds

**Labels:**

* `http_request_method`
* `http_route_name`
* `le`
* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_cl_request_duration_seconds_count`

**Type:** histogram

**Description:** consensus client request duration in seconds

**Labels:**

* `http_request_method`
* `http_route_name`
* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_cl_request_duration_seconds_sum`

**Type:** histogram

**Description:** consensus client request duration in seconds

**Labels:**

* `http_request_method`
* `http_route_name`
* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_cl_sync_distance`

**Type:** gauge

**Description:** consensus client syncing distance which is a delta between highest and current blocks

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_cl_sync_status`

**Type:** gauge

**Description:** beacon node status

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`
* `ssv_cl_sync_status`

***

#### `ssv_duty_scheduler_executions_total`

**Type:** counter

**Description:** total number of duties executed by scheduler

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_beacon_role`

***

#### `ssv_duty_scheduler_slot_ticker_delay_duration_seconds_bucket`

**Type:** histogram

**Description:** delay of the slot ticker in seconds

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_duty_scheduler_slot_ticker_delay_duration_seconds_count`

**Type:** histogram

**Description:** delay of the slot ticker in seconds

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_duty_scheduler_slot_ticker_delay_duration_seconds_sum`

**Type:** histogram

**Description:** delay of the slot ticker in seconds

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_el_request_duration_seconds_bucket`

**Type:** histogram

**Description:** execution client request duration in seconds

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_el_request_duration_seconds_count`

**Type:** histogram

**Description:** execution client request duration in seconds

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_el_request_duration_seconds_sum`

**Type:** histogram

**Description:** execution client request duration in seconds

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_el_sync_distance`

**Type:** gauge

**Description:** execution client sync distance which is a delta between highest and current blocks

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_el_sync_last_processed_block`

**Type:** gauge

**Description:** last processed block by execution client

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`

***

#### `ssv_el_sync_status`

**Type:** gauge

**Description:** execution client sync status

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `server_address`
* `ssv_el_status`

***

#### `ssv_event_syncer_handler_last_processed_block`

**Type:** gauge

**Description:** last processed block by event handler

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_connections_active`

**Type:** gauge

**Description:** number of active connections

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_connection_direction`

***

#### `ssv_p2p_connections_connected_total`

**Type:** counter

**Description:** total number of connected peers

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_connection_direction`

***

#### `ssv_p2p_connections_disconnected_total`

**Type:** counter

**Description:** total number of disconnected peers

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_connection_direction`

***

#### `ssv_p2p_discovery_peers_accepted_total`

**Type:** counter

**Description:** total number of peers accepted during discovery

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_discovery_peers_skipped_total`

**Type:** counter

**Description:** total number of peers skipped during discovery

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_discovery_skip_reason`

***

#### `ssv_p2p_discovery_peers_total`

**Type:** counter

**Description:** total number of peers discovered

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_message_validations_accepted_total`

**Type:** counter

**Description:** total number of messages successfully validated and accepted

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_p2p_message_validations_duration_seconds_bucket`

**Type:** histogram

**Description:** message validation duration

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_message_validations_duration_seconds_count`

**Type:** histogram

**Description:** message validation duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_message_validations_duration_seconds_sum`

**Type:** histogram

**Description:** message validation duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_message_validations_total`

**Type:** counter

**Description:** total number of messages validated

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_messages_in_total`

**Type:** counter

**Description:** total number of inbound messages

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_message_type`

***

#### `ssv_p2p_messages_out_total`

**Type:** counter

**Description:** total number of outbound(broadcasted) messages

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_peers_connected`

**Type:** gauge

**Description:** number of connected peers

**Labels:**

* `otel_scope_name`
* `otel_scope_version`

***

#### `ssv_p2p_peers_per_topic`

**Type:** gauge

**Description:** number of connected peers per topic

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_topic_name`

***

#### `ssv_p2p_peers_per_version`

**Type:** gauge

**Description:** number of connected peers per node version

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_node_version`

***

#### `ssv_p2p_stream_requests_sent_total`

**Type:** counter

**Description:** total number of stream requests sent

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_protocol_id`

***

#### `ssv_p2p_stream_responses_received_total`

**Type:** counter

**Description:** total number of stream responses received(as response to initiated by us request)

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_p2p_protocol_id`

***

#### ssv_runner_consensus_duration_seconds_bucket

**Type:** histogram

**Description:** consensus duration

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_consensus_duration_seconds_count`

**Type:** histogram

**Description:** consensus duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_consensus_duration_seconds_sum`

**Type:** histogram

**Description:** consensus duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_duty_duration_seconds_bucket`

**Type:** histogram

**Description:** duty duration

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`
* `ssv_beacon_role`
* `ssv_validator_duty_round`

***

#### `ssv_runner_duty_duration_seconds_count`

**Type:** histogram

**Description:** duty duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_beacon_role`
* `ssv_validator_duty_round`

***

#### `ssv_runner_duty_duration_seconds_sum`

**Type:** histogram

**Description:** duty duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_beacon_role`
* `ssv_validator_duty_round`

***

#### `ssv_runner_post_consensus_duration_seconds_bucket`

**Type:** histogram

**Description:** post consensus duration

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_post_consensus_duration_seconds_count`

**Type:** histogram

**Description:** post consensus duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_post_consensus_duration_seconds_sum`

**Type:** histogram

**Description:** post consensus duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_pre_consensus_duration_seconds_bucket`

**Type:** histogram

**Description:** pre consensus duration

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_pre_consensus_duration_seconds_count`

**Type:** histogram

**Description:** pre consensus duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_pre_consensus_duration_seconds_sum`

**Type:** histogram

**Description:** pre consensus duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`

***

#### `ssv_runner_submissions`

**Type:** gauge

**Description:** number of duty submissions

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_beacon_role`

***

#### `ssv_validator_duty_rounds_changed_total`

**Type:** counter

**Description:** number of round changes per duty, with their reasons

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_validator_duty_round`
* `ssv_validator_duty_round_change_reason`

***

#### `ssv_validator_stage_duration_seconds_bucket`

**Type:** histogram

**Description:** validator stage(proposal, prepare, commit) duration

**Labels:**

* `le`
* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`
* `ssv_validator_duty_round`
* `ssv_validator_stage`

***

#### `ssv_validator_stage_duration_seconds_count`

**Type:** histogram

**Description:** validator stage(proposal, prepare, commit) duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`
* `ssv_validator_duty_round`
* `ssv_validator_stage`

***

#### `ssv_validator_stage_duration_seconds_sum`

**Type:** histogram

**Description:** validator stage(proposal, prepare, commit) duration

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_runner_role`
* `ssv_validator_duty_round`
* `ssv_validator_stage`


***

#### `ssv_validator_validators_per_status`

**Type:** gauge

**Description:** total number of validators by status

**Labels:**

* `otel_scope_name`
* `otel_scope_version`
* `ssv_validator_status`

***
