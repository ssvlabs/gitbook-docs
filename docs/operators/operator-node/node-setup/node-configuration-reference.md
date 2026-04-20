---
title: Node Configuration Reference
sidebar_position: 8
---

:::danger Caution
The configuration options below are intended for advanced users who understand their impact.

The parameters used in the [automatic installation guide](/operators/operator-node/node-setup/) and [manual installation guide](/operators/operator-node/node-setup/manual-setup) are sufficient for most users.

Please exercise extreme care and discretion when modifying these settings, as any incorrect changes may result in unintended consequences or system instability.
:::

## Configuration Reference

The table below lists all available node configuration options.


| YAML                                            | ENV                            | Default          | Description                                                                                                                                          |
| ----------------------------------------------- | ------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| global                                          |                                |                  |                                                                                                                                                      |
| global.LogLevel                                 | LOG\_LEVEL                     | info             | Defines logger's log level                                                                                                                           |
| global.LogFormat                                | LOG\_FORMAT                    | console          | Defines logger's encoding, valid values are 'json' and 'console' (default)                                                                          |
| global.LogLevelFormat                           | LOG\_LEVEL\_FORMAT             | capitalColor     | Defines logger's level format, valid values are 'capitalColor' (default), 'capital' or 'lowercase'                                                 |
| global.LogFilePath                              | LOG\_FILE\_PATH                | ./data/debug.log | File path to write logs to                                                                                                                           |
| global.LogFileSize                              | LOG\_FILE\_SIZE                | 500              | Maximum log file size in megabytes before rotation                                                                                                   |
| global.LogFileBackups                           | LOG\_FILE\_BACKUPS             | 3                | Number of rotated log files to keep                                                                                                                  |
| db                                              |                                |                  |                                                                                                                                                      |
| db.Path                                         | DB\_PATH                       | ./data/db/       | Database storage directory path                                                                                                                      |
| db.Reporting                                    | DB\_REPORTING                  | false            | Enable database size reporting                                                                                                                       |
| db.GCInterval                                   | DB\_GC\_INTERVAL               | 6m               | Interval between garbage collection runs (0 to disable)                                                                                              |
| ssv                                             |                                |                  |                                                                                                                                                      |
| ssv.Network                                     | NETWORK                        | mainnet          | Network is the network of this node                                                                                                                  |
| ssv.ValidatorOptions                            |                                |                  |                                                                                                                                                      |
| ssv.ValidatorOptions.SignatureCollectionTimeout | SIGNATURE\_COLLECTION\_TIMEOUT | 5s               | Timeout for signature collection after consensus                                                                                                     |
| ssv.ValidatorOptions.MetadataUpdateInterval     | METADATA\_UPDATE\_INTERVAL     | 12m              | Interval for updating validator metadata                                                                                                             |
| ssv.ValidatorOptions.HistorySyncBatchSize       | HISTORY\_SYNC\_BATCH\_SIZE     | 25               | Maximum number of messages to sync in a single batch                                                                                                 |
| ssv.ValidatorOptions.MinimumPeers               | MINIMUM\_PEERS                 | 2                | Minimum number of peers required for sync                                                                                                            |
| ssv.ValidatorOptions.FullNode                   | FULLNODE                       | false            | Store complete message history instead of just latest messages                                                                                       |
| ssv.ValidatorOptions.MsgWorkersCount            | MSG\_WORKERS\_COUNT            | 256              | Number of message processing workers                                                                                                                 |
| ssv.ValidatorOptions.MsgWorkerBufferSize        | MSG\_WORKER\_BUFFER\_SIZE      | 65536            | Size of message worker queue buffer                                                                                                                  |
| ssv.ValidatorOptions.ExperimentalGasLimit       | EXPERIMENTAL\_GAS\_LIMIT       |                  | Gas limit for MEV block proposals; it must match across the committee or MEV will fail. [Carefully read this doc](/operators/operator-node/node-setup/gas-limit) before adjusting. |
| eth1                                            |                                |                  |                                                                                                                                                      |
| eth1.ETH1Addr                                   | ETH\_1\_ADDR                   |                  | Execution client WebSocket URL(s). Multiple clients are supported via semicolon-separated URLs (for example, `ws://localhost:8546;ws://localhost:8547`) |
| eth1.ETH1ConnectionTimeout                      | ETH\_1\_CONNECTION\_TIMEOUT    | 10s              | Timeout for execution client requests                                                                                                                |
| eth1.ETH1SyncDistanceTolerance                  | ETH\_1\_SYNC\_DISTANCE\_TOLERANCE | 5           | Maximum number of blocks behind head considered in-sync                                                                                              |
| eth2                                            |                                |                  |                                                                                                                                                      |
| eth2.BeaconNodeAddr                             | BEACON\_NODE\_ADDR             |                  | Beacon node URL(s). Multiple nodes are supported via semicolon-separated URLs (for example, `http://localhost:5052;http://localhost:5053`)        |
| eth2.SyncDistanceTolerance                      | BEACON\_SYNC\_DISTANCE\_TOLERANCE | 4          | Maximum number of slots behind head considered in-sync                                                                                               |
| eth2.WithWeightedAttestationData                | WITH\_WEIGHTED\_ATTESTATION\_DATA | false       | Enable attestation data scoring across multiple beacon nodes                                                                                         |
| p2p                                             |                                |                  |                                                                                                                                                      |
| p2p.Bootnodes                                   | BOOTNODES                      |                  | Bootnodes to use for discovery (semicolon-separated ENRs, for example, `enr:-abc123;enr:-def456`)                                                  |
| p2p.Discovery                                   | P2P\_DISCOVERY                 | discv5           | Discovery protocol to use (`discv5`, `mdns`)                                                                                                         |
| p2p.TrustedPeers                                | TRUSTED\_PEERS                 |                  | List of peer IDs to always connect to                                                                                                                |
| p2p.TcpPort                                     | TCP\_PORT                      | 13001            | TCP port for P2P transport                                                                                                                           |
| p2p.UdpPort                                     | UDP\_PORT                      | 12001            | UDP port for discovery                                                                                                                               |
| p2p.HostAddress                                 | HOST\_ADDRESS                  |                  | External IP address for discovery (mutually exclusive with `HostDNS`)                                                                                |
| p2p.HostDNS                                     | HOST\_DNS                      |                  | External DNS name for discovery (mutually exclusive with `HostAddress`)                                                                              |
| p2p.RequestTimeout                              | P2P\_REQUEST\_TIMEOUT          | 10s              | Timeout for P2P requests                                                                                                                             |
| p2p.MaxBatchResponse                            | P2P\_MAX\_BATCH\_RESPONSE      | 25               | Maximum number of objects returned in a batch response                                                                                               |
| p2p.MaxPeers                                    | P2P\_MAX\_PEERS                | 60               | Maximum number of connected peers                                                                                                                    |
| p2p.DynamicMaxPeers                             | P2P\_DYNAMIC\_MAX\_PEERS       | true             | Automatically adjust `MaxPeers` based on committee count                                                                                             |
| p2p.DynamicMaxPeersLimit                        | P2P\_DYNAMIC\_MAX\_PEERS\_LIMIT | 150         | Upper limit for `MaxPeers` when `DynamicMaxPeers` is enabled                                                                                         |
| p2p.TopicMaxPeers                               | P2P\_TOPIC\_MAX\_PEERS         | 10               | Maximum peers per pubsub topic                                                                                                                       |
| p2p.Subnets                                     | SUBNETS                        |                  | Hex string (32 characters) representing 128 subnets to join on startup. Each bit corresponds to a subnet: `1` means join, `0` means skip.         |
| p2p.PubSubScoring                               | PUBSUB\_SCORING                | true             | Enable pubsub peer scoring                                                                                                                           |
| p2p.PubSubTrace                                 | PUBSUB\_TRACE                  |                  | Enable pubsub debug tracing in logs                                                                                                                  |
| p2p.DiscoveryTrace                              | DISCOVERY\_TRACE               |                  | Enable discovery debug tracing in logs                                                                                                               |
| p2p.PubsubMsgCacheTTL                           | PUBSUB\_MSG\_CACHE\_TTL        |                  | Duration to remember a message ID as seen                                                                                                            |
| p2p.PubsubOutQueueSize                          | PUBSUB\_OUT\_Q\_SIZE           |                  | Size of the outbound pubsub message queue                                                                                                            |
| p2p.PubsubValidationQueueSize                   | PUBSUB\_VAL\_Q\_SIZE           |                  | Size of the pubsub validation queue                                                                                                                  |
| p2p.PubsubValidateThrottle                      | PUBSUB\_VAL\_THROTTLE          |                  | Number of goroutines for pubsub message validation                                                                                                   |
| p2p.DisableIPRateLimit                          | DISABLE\_IP\_RATE\_LIMIT       |                  | Disable IP-based rate limiting                                                                                                                       |
| KeyStore                                        |                                |                  |                                                                                                                                                      |
| KeyStore.PrivateKeyFile                         | PRIVATE\_KEY\_FILE             |                  | Path to operator private key file                                                                                                                    |
| KeyStore.PasswordFile                           | PASSWORD\_FILE                 |                  | Path to password file for private key decryption                                                                                                     |                                                                                             |
| OperatorPrivateKey                              | OPERATOR\_KEY                  |                  | Operator private key for contract event decryption                                                                                                   |
| MetricsAPIPort                                  | METRICS\_API\_PORT             |                  | Port for metrics API server                                                                                                                          |
| EnableTraces                                    | ENABLE\_TRACES                 |                  | Enable Open Telemetry traces                                                                                                                         |
| EnableProfile                                   | ENABLE\_PROFILE                |                  | Enable Go profiling tools                                                                                                                            |
| NetworkPrivateKey                               | NETWORK\_PRIVATE\_KEY          |                  | Private key for P2P network identity                                                                                                                 |
| WebSocketAPIPort                                | WS\_API\_PORT                  |                  | Port for WebSocket API server                                                                                                                        |
| WithPing                                        | WITH\_PING                     |                  | Enable WebSocket ping messages                                                                                                                       |
| SSVAPIPort                                      | SSV\_API\_PORT                 |                  | Port for SSV API server                                                                                                                              |
| LocalEventsPath                                 | EVENTS\_PATH                   |                  | Path to local events file                                                                                                                            |
| Graffiti                                        | GRAFFITI                       | ssv.network      | Custom graffiti for block proposals                                                                                                                  |
| EnableDoppelgangerProtection                    | ENABLE\_DOPPELGANGER\_PROTECTION |                  | Enable doppelganger protection for validators                                                                                                        |
| ProposerDelay                                   | PROPOSER\_DELAY                |                  | Duration to wait out before requesting Ethereum block to propose if this Operator is proposer-duty Leader (for example, `300ms`). Read [our GitHub doc page](https://github.com/ssvlabs/ssv/blob/main/docs/MEV_CONSIDERATIONS.md#getting-started-with-mev-configuration) for details. |
| AllowDangerousProposerDelay                     | ALLOW\_DANGEROUS\_PROPOSER\_DELAY |                  | Allow `ProposerDelay` values higher than `1s` (dangerous, may cause missed block proposals)                                                         |
| SSVSignerConfig                                 |                                |                  |                                                                                                                                                      |
| SSVSignerConfig.Endpoint                        | ENDPOINT                       |                  | Endpoint of ssv-signer. It must be a correct URL                                                                                                     |
| SSVSignerConfig.RequestTimeout                  | REQUEST\_TIMEOUT               | 10s              | Request timeout for ssv-signer                                                                                                                       |
| SSVSignerConfig.KeystoreFile                    | KEYSTORE\_FILE                 |                  | Path to ssv-signer client keystore file                                                                                                              |
| SSVSignerConfig.KeystorePasswordFile            | KEYSTORE\_PASSWORD\_FILE      |                  | Path to file containing the password for client keystore file                                                                                        |
| SSVSignerConfig.ServerCertFile                  | SERVER\_CERT\_FILE            |                  | Path to trusted server certificate file for ssv-signer  

## API Methods Reference

When SSV Node is configured with `SSVAPIPort`, you can call several API methods. For example: `curl http://localhost:16000/v1/node/health`.

Available methods are listed below:

| Method    | Output description          |
| ------------------------------------------  | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `/v1/node/health`         | Output will post information peers (inbound and outbound), and addresses used for P2P communication. [Described in details here](/docs/operators/operator-node/maintenance/troubleshooting.md#ssv-node-health-endpoint).                               |
|  `/v1/node/identity`      | Prints out your `peer_id`, p2p addresses, subnets the node participates in, version of the node.                                   |
|  `/v1/node/peers`       | Prints out infromation about current peers: id, addresses, direction, subnets, peer's node version.                                  |
|  `/v1/node/topics`         | Prints an array of all peers' ids, and also separate arrays for peers split by topic.                                 |
|  `/v1/validators`         | Prints information about **all** validators on the network.                                  |
