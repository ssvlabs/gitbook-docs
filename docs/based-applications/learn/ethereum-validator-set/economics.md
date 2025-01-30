---
sidebar_label: 'Economics'
sidebar_position: 3
---

# Economics

Ethereum staking involves validators locking up ETH to secure the network, earn rewards, and validate transactions. The economics of staking revolve around several types of rewards: consensus rewards, transaction fees, and Maximum Extractable Value (MEV). Consensus rewards are earned by validators who propose and attest to blocks, ensuring the security of the blockchain. Transaction fees, or gas fees, are distributed to validators for including transactions in their proposed blocks. These fees can vary significantly, depending on network congestion. 

Additionally, MEV opportunities arise when validators profit from ordering transactions within a block in a way that maximizes revenue—often by relying on arbitrage or liquidations. MEV extraction has become a significant aspect of staking economics. The introduction of MEV-Boost has enabled validators to access MEV opportunities more efficiently by collaborating with third-party block builders.

The broader staking ecosystem has also been shaped by liquidity concerns and solutions like liquid staking derivatives (e.g., stETH or rETH), which provide stakers with tokens representing their staked assets, allowing them to retain liquidity and participate in DeFi. The rise of liquid staking has contributed to an increase in total ETH staked, with over 30% of the total supply now participating in staking by late 2024.

Beyond standard validator rewards, additional incentives enhance the decentralization and robustness of the staking ecosystem. Platforms like ssv.network have launched incentivized mainnet programs to promote DVT adoption. Participants earn extra rewards for adopting distributed infrastructure, ultimately benefiting Ethereum's security by supporting diverse validator operations. Such initiatives not only contribute to the increased participation but also enhance the stability of the Ethereum network.

Penalties are an essential mechanism in Ethereum staking to maintain security and integrity by penalizing improper validator behavior. Penalties are predefined and depend on various factors such as performance and correlation. Penalties become increasingly severe when multiple validators engage in similar offenses simultaneously, thereby enhancing the network's resilience against collusion or widespread downtime. By enforcing clear slashing rules, Ethereum ensures validator accountability and incentivizes honest participation.

**Slashing penalty per validator vs share of the network slashed in the 36 days surrounding the slashing event (with an empty exit queue).**

<div align="center">
![Economics](/img/economics-1.png)
*Figure 1: Ethereum slashable percentage as a function of aggregated slashed validators*
</div>
