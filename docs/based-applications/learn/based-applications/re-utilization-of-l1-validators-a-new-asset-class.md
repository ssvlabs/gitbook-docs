---
sidebar_label: 'Re-utilization of L1 Validators: A New Asset Class'
sidebar_position: 1
---

# Re-utilization of L1 Validators: A New Asset Class

Ethereum’s validator set represents a robust and decentralized network of stakers. Its inherent security comes from the fact that each validator deposits 32 ETH as collateral to participate in securing the chain. This high capital requirement ensures that validators are both financially invested and aligned with the network’s integrity. Such trustworthiness creates a stable backbone for additional use cases beyond Ethereum Layer 1.

Based applications extend the utility of Ethereum validators by using the validator as an entity (validation keys only). This means the principal (32 ETH) is never at risk of slashing, and withdrawal credentials are managed by the staker outside of ssv.network. While traditional models often rely on slashable collateral to enforce honesty, bApps instead leverage the substantial amount of non-slashable capital gained from the highly incentivized adoption of Ethereum validators.

By adopting validators’ non-slashable capital, bApps unlock a new asset class. Validators can simultaneously participate in multiple decentralized applications, earning additional rewards without risking their 32 ETH. This re-utilization avoids duplicative validator networks and reduces the operational and financial overhead for applications that need robust security guarantees.

One of the most valuable properties of the Ethereum validator set is its inherent Sybil resistance, a fundamental security requirement for decentralized networks. A Sybil attack occurs when an adversary creates numerous fake identities or nodes to overwhelm a network, disrupting its consensus or compromising its integrity. Ethereum's PoS mechanism counters this threat by requiring validators to stake at least 32 ETH, creating a significant economic barrier.

As Sybil-resistant identities, Ethereum validators are not only indispensable to Ethereum’s own security but also present a valuable resource for safeguarding other decentralized systems. By leveraging the trust and decentralization of Ethereum’s validator ecosystem, bApps enhance their own security models, paving the way for innovative interoperability and shared security solutions.

Smaller or emerging decentralized bApps, which may lack the economic foundation to secure their networks effectively, can bootstrap with Ethereum’s validator set. The bApps can leverage Ethereum’s robust validator ecosystem, where Ethereum validators opt-in to perform duties on other systems. 

This approach allows other networks to inherit Ethereum's trusted Sybil-resistant properties without needing to establish their own independent validator base. By relying on the staked ETH that underpins Ethereum, these chains gain access to a globally distributed and highly secure validator network. This reduces risks associated with small or vulnerable validator sets.

<div align="center">
![reutilization](/img/reutilization-1.avif)
*Figure 2: Withdrawal vs. Validation keys for Bootstrapping services*
</div>
