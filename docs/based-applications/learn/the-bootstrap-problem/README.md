---
sidebar_label: 'The Bootstrap Problem'
sidebar_position: 2
---

# Cryptoeconomic Security of Proof-of-Stake Systems

To understand the Bootstrap problem, it’s necessary first to examine the key concepts used to analyze the security of a PoS system. These concepts reflect the system’s ability to deter attacks through a carefully designed set of economic incentives and penalties. A fundamental aspect of this security is the system's slashing mechanism, which penalizes validators for malicious behavior. Following definitions in the [Stakesure by Deb et al.](https://arxiv.org/abs/2401.05797), the key concepts that define the security of PoS systems include:

- **Cost-of-Corruption (CoC)**: The capital loss incurred by an attacker due to slashing penalties during an attack.

-  **Profit-from-Corruption (PfC)**: The capital gain an attacker achieves from successfully compromising the system.

- **Cost-to-Attack (CtA)**: The capital expenditure required to execute the attack.

For a PoS system to be cryptoeconomically secure, it must ensure that CoC exceeds PfC. Additionally, the system should aim for a high CtA, making it prohibitively expensive for an attacker to acquire the necessary capital to compromise the network. However, achieving these metrics is particularly challenging for new PoS systems.
