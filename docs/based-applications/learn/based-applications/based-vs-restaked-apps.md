---
sidebar_label: 'Based vs. Restaked Apps'
sidebar_position: 5
---

# Based vs. Restaked Apps

Restaking and bApps approach some of the same challenges in different ways. While Restaking relies on capital delegation with slashing risks, bApps also allows the utilization of L1 validators with no slashing conditions.

The different approaches result in different economic, technical, and practical differences.

<div align="center">
| Risk | Cost | Participation model | Scale |
|------|------|-------------------|--------|
| Only on tokens | Low for L1 validators | Infinite-Sum game | All L1 validators can join risk-free |
| Cascading slashing risk for Ethereum | High for all | Zero-sum game | Bound by L1 validator risk tolerance |

*Table 1: Comparison between based and restaked applications.*
</div>



## Infinite Vs. Zero Sum Games
A zero-sum game is one in which one participant's gain is exactly balanced by another's loss, whereas an infinite-sum game allows for the possibility of creating additional value through collaboration and growth.

As with all development platforms, the overarching goal is to enable infinite-sum games—collaborative marketplaces where the addition of new "apps" or services amplifies the overall value for all participants. In such ecosystems, growth is not zero-sum but exponential: the more participants and services added, the more valuable the platform becomes for developers, users, and stakeholders alike. This vision fosters innovation, incentivizes collaboration, and ensures that participation benefits everyone involved. However, the current restaking landscape struggles to realize this vision. Instead, it often devolves into a zero-sum game where applications and services compete for finite resources, impeding growth and collaboration.


<div align="center">
<img src="/img/based-vs-restaking-1.avif" width="80%" alt="based-vs-restaking"/>
*Figure 3: illustration of an account utilizing more than 100% of its capital.*
</div>

To understand this limitation, consider the scenario where a restaker allocates 100% of their available capital to four services, as illustrated in Figure 3 (restakers are incentivized to maximize their opportunity costs by fully committing their capital). If a new service, Service #5, seeks to enter the ecosystem, the restaker faces a choice: either bring in additional capital to support the new service or reallocate funds from the existing four services. For most restakers, bringing in additional capital is unlikely due to constraints like risk appetite, liquidity, or opportunity cost. This leaves reallocation as the likely option.

However, reallocating capital means reducing support for existing services, potentially lowering the rewards from those services and introducing unnecessary friction. This creates a scenario where restakers are forced to weigh the benefits of participating in a new service against the losses incurred by reducing their stake in established ones. Consequently, new services struggle to attract the necessary initial capital to bootstrap their operations and gain traction within the ecosystem.

The result is a self-reinforcing barrier for new developers and services. Existing services, having already secured their share of restaked capital, enjoy a significant advantage, while new entrants are met with competition and resource scarcity. This dynamic undermines the fundamental aspiration of restaking as a mechanism for fostering growth and innovation. 

Restaking was envisioned as a tool to unlock collaborative value creation, enabling developers to build services that complement and enhance one another. However, under the current framework, restakers' capital allocation becomes a zero-sum game, where supporting one service necessarily comes at the expense of another. This structural limitation not only stifles innovation but also discourages participation from new developers who see the challenges of securing sufficient capital as insurmountable.

For restaking to truly deliver on its promise of infinite-sum games, the underlying mechanisms must address these issues. After considerable research into bApps, we propose a different approach to solving the bootstrapping problem. This is described in the next chapter (under "Risk Expressive Model"), which solves this issue.

## Formalizing Security
Slashable capital can increase both CoC and CtA, whereas non-slashable capital only increases CtA. In native restaking, all capital is potentially slashable, meaning it contributes to both metrics.

The core idea of bApps is to maximize capital efficiency by leveraging the existing sybil resistance provided by Ethereum validators without risking their main staked ETH. Instead, validators are only required to provide proof of their validator status, which grants them access to secure other bApps. These bApps may still require additional capital commitments from participants, which can be either slashable or non-slashable.

Shared security, as described above, introduces significant costs, including opportunity costs from alternative uses, contract risk, and slashing risk. In contrast, relying on validators for security provides a more efficient approach. Validators' core ETH remains non-slashable, reducing their risk exposure while contributing effectively to security. This flexibility allows bApps to define security parameters with reduced risk for validators. As a result, bApp economics feature a higher Cost-to-Attack (CtA), offering a compelling opportunity for validators to diversify their participation without significant slashing risk. Compared to other models like restaking, bApps provide a more predictable and stable pathway to secure emerging protocols.

<div align="center">
<img src="/img/based-vs-restaking-2.avif" width="80%" alt="based-vs-restaking"/>
*Figure 4: capital requirements: bApps Vs. Restaking*
</div>

## Economic Comparison for Protocol Builders
From the perspective of protocol builders, choosing the technology to secure their systems sufficiently requires a clear understanding of the trade-offs between based applications and other platforms, such as restaking. This section explores numerical examples of these comparisons, emphasizing the unique advantages of based security.

## Rewards for bApp Stakers
A bApp developer allocates rewards to incentivize stakers to allocate capital to the bApp, increasing the total staked capital and improving security against attacks. It also incentivizes participants to follow the protocol and earn the rewards, discouraging attacks.

The APR for slashable and non-slashable assets can reasonably be expected to be different, given that they are under different risks. Rewards would most likely reflect the above; thus, non-slashable assets' rewards are expected to be lower than those of slashable assets. 

For the following examples, the APRs for slashable and non-slashable capital are assumed to be 10% and 1.75%, respectively. In practice, the numbers may vary. The APR, or reward, is also denoted as service cost since it represents the app's expenditure to increase its attractiveness.

### Case 1: Same Rewards To User / Same Cost to bApp

As a bApp builder, it is desired to attract more stakers to participate and secure the bApp given a certain amount of rewards. Denote n as the number of 32 ETH stakers and f as the fraction required to corrupt the service. The following table shows the security the bApp can get from using a restaking ecosystem compared to SSV 2.0. 


| | Restaking | bApp | Restaking/bApp |
|-----------------|-----------|------|---------------|
| CoC (user risk) | fn∗32 | fn∗26.4 | 82.5% |
| CtA (user cost) | fn∗32 | fn∗58.4 | 182.5% |
| Total Reward (service cost) | n∗3.2 | n∗3.2 | 100% |

*Table 2: CoC/ CtA and rewards comparison between bApps and restaking*

With a bApp, some rewards are distributed to non-slashable capital contributing to CtA; others are distributed to slashable capital contributing to CoC. With the same amount of rewards, more non-slashable capital is attracted because the rewards are risk-free, while there are still some slashable stakers who take risks for higher rewards. In Table 2, we assume the bApp gets a larger amount of non-slashable stake. We reduce the amount of slashable stake to equate the cost of restaking. As a result, compared to restaking, the bApp gains 82.5% extra cost-to-attack in exchange for 17.5% cost-of-corruption under the same amount of reward distribution, effectively raising the capital barrier for attacks. The bApp owner can also account for high CtA and offer lower rewards for slashable capital, thus lowering its cost.

### Case 2: Same Slashable Stakers

Assume in either restaking or bApp, the same amount of slashable capital will be attracted to secure the application. Since non-slashable capital carries no risk, assume that an extra ETH validator is securing the bApp. The table below shows the security comparison in this situation.

| | Restaking | bApp | Restaking/bApp |
|-----------------|-----------|------|---------------|
| CoC (user risk) | fn∗32 | fn∗32 | 100% |
| CtA (user cost) | fn∗32 | fn∗64 | 200% |
| Total Reward (service cost) | n∗3.2 | n∗3.76 | 117.5% |

*Table 3: same as table 3, same slashable stakers*

In this case, the bApp is secured not only by the same CoC, but also by the additional CtA, which is doubled compared to restaking, with only 17.5% additional rewards distributed to the additional non-slashable capital.

## Security Insights
We can see that in both cases, there are trade-offs between restaking and bApp to increase CtA with decreased CoC or increased rewards, but since in bApp CtA is cheap to get, the security benefits from increased CtA outweigh the costs.

## Cascading Risks
Restaking on Ethereum carries considerable risks, particularly the concern that a large-scale slashing event triggered by an AVS could result in the exit of potentially millions of ETH from staking. Such an incident could destabilize the staking ecosystem, diminish trust, and create significant turmoil in Ethereum's stability. The ripple effects of such an event would not only impact individual stakers but could also undermine the overall network security, leading to a reduction in the number of active validators and a decrease in the network's resilience. The loss of millions of ETH from staking would have broader implications, including reduced liquidity and diminished confidence among participants who rely on staking for consistent rewards. Such a scenario underscores the inherent vulnerabilities and systemic risks associated with restaking, particularly when multiple protocols or applications are interconnected.

Conversely, with based applications, validators are always protected from such cascading penalties, providing a more secure environment for those participating in the network. This safeguard is crucial as it reduces the risks for validators, encouraging more participants to stay engaged in the staking process. Additionally, the ability to amplify staking rewards by re-utilizing validators presents a compelling opportunity to significantly improve the economics for solo and small-scale stakers. By reusing validators across different applications, participants can maximize their opportunity costs without taking on additional infrastructure costs, which is especially beneficial for those who may not have the resources of larger staking operations. This ability to leverage existing validators more effectively helps democratize access to staking rewards and levels the playing field for smaller operators.

Protocols like Lido, Rocketpool, and Ether.fi offer permissionless operator options, allowing these operators to opt-in and use their validators to secure bApps, thereby boosting their APR considerably. This flexibility enables validators to participate in multiple layers of security provision, increasing their overall yield and making staking a more attractive proposition for both new and existing participants. By allowing permissionless operators to enhance their validator utility, these protocols will foster a more decentralized and resilient network, where individual operators are empowered to take part in the broader ecosystem beyond just securing the base layer of Ethereum.

This paves the way for a new economy, making solo and small-time operators more profitable than ever and strengthening their incentives and long-term sustainability within the network. The increased profitability means that more individuals and small entities can afford to participate in staking, thus enhancing the decentralization of the network. A more decentralized validator set not only contributes to the security and robustness of Ethereum but also ensures that power is not overly concentrated in the hands of a few large entities. The emergence of this new model, driven directly by bApps' increased rewards and reduced risk, holds the potential to transform Ethereum's staking landscape, making it more inclusive, resilient, and ultimately contributing to the long-term success and stability of the entire ecosystem.