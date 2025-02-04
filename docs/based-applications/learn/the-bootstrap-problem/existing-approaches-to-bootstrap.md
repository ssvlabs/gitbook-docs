---
sidebar_label: 'Existing Approaches to Bootstrap'
sidebar_position: 3
---

# Existing Approaches to Bootstrap

To address the bootstrap problem, existing proof-of-stake (PoS) systems typically rely on two primary approaches: gathering resources independently or utilizing restaking. While both approaches aim to establish a secure validator set and ensure network functionality, they come with inherent challenges and trade-offs.

# 1. Gathering Resources Independently 
The first and most straightforward approach is for the PoS network to independently gather the necessary resources to bootstrap its validator set. This involves attracting stakers who are willing to lock up their assets to secure the network. However, as previously discussed, this method is fraught with difficulties, particularly for new or smaller systems:

- **Attracting Stakers**: Convincing participants to stake their assets in a nascent system is a significant hurdle. Stakers must perceive the system as both secure and economically rewarding enough to justify the risks associated with staking, including slashing penalties and price volatility of the staked assets.

- **Management Complexity**: The network must manage the onboarding, monitoring, and incentivization of validators, which requires substantial operational resources and expertise. This is particularly challenging for smaller teams or projects with limited funding.

- **Centralization Risks**: A smaller or poorly distributed validator set can lead to vulnerabilities such as centralization or collusion, which affects the network’s security and resilience.

# 2. Restaking 
Restaking has emerged as an alternative approach, where existing stakers from one PoS system, such as Ethereum, reuse their staked assets to secure additional applications. While this model offers some advantages over independent resource gathering—particularly by leveraging an already established and distributed validator set, it also comes with some downsides:

- **Yielding Withdrawal Credentials**: For native restaking, participants must hand over access to their Ethereum stake to a 3rd party contract. This levies risk. It also locks participation to a single restaking platform.

- **Shared Risks**: Restaking involves sharing both capital and risks across multiple systems. The staked assets are slashable for the security of all the applications they are restaked to. This means that a failure or attack on one platform could cascade across others, jeopardizing the security of multiple systems simultaneously.

- **High Costs**: Validators participating in restaking take on increased risks and, therefore, demand higher rewards to compensate for the potential loss of their restaked assets. This increases the cost for new applications to secure their systems.

In summary, while restaking offers better access to capital and a more manageable way to bootstrap security compared to independent resource gathering, it still introduces risks. These trade-offs highlight the limitations of current approaches and the need for more secure, efficient, and scalable solutions to address the bootstrap problem for new PoS systems.