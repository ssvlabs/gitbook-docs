---
sidebar_label: 'Security'
sidebar_position: 4
---

# Security

This section explains the main security properties of SSV Network and DVT.

- [Key Splitting Security](/learn/security/key-splitting)
- [Audit Resources](/learn/security/audits)
- [Bug Bounty Program](/learn/security/bug-bounty)
- [Keyshares Structure](/learn/security/keyshares-structure)

## Introduction
Within Distributed Validator Technology (DVT), validators are operated in clusters of independent operators. Each operator holds a key share rather than the full validator key. For each validator duty, the cluster reaches consensus on what to sign and then a threshold of operators produces partial signatures that are aggregated into a valid BLS signature; the validator’s private key is never reconstructed at any point. 

### How it works
- The validator private key is split into ***n* key shares** using [Shamir Secret Sharing](/learn/tech-overview) (SSS) with a chosen threshold *t* (for example, 3-of-4 or 5-of-7).
- Each share is encrypted to the corresponding operator’s public key. So only that operator can recover its own share, because only the operator's private key can decrypt it.
- The resulting output contains the encrypted key shares along with the metadata required for registration on SSV Network.

### Security properties
- **Fault tolerance and uptime:** As long as ***t* of *n*** operators are online and honest, the validator continues to perform duties. A common safety rule is ***n* ≥ 3f + 1**, meaning 7 operators can tolerate 2 faults (→ 5-of-7 threshold).
- **No single point of failure:** No operator has access to the full key. Compromising fewer than *t* shares is useless.
- **Active-active redundancy without slashing:** Multiple diverse operators can co-operate on the same validator safely. Unlike naive failover, DVT’s threshold-signature flow avoids double-signing.
:::note
SSV is non-custodial and uses only the validator’s validation key, **never the withdrawal key**. On this page, when “private key” is used in the context of signing duties, it refers to the validation key.
:::
