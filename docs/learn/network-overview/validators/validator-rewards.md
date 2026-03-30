---
sidebar_position: 2
---

# Validator Rewards

SSV Network is a non-custodial protocol, meaning stakers maintain full custody of their staking rewards.

Validators accrue two forms of rewards:

* **Consensus Layer Rewards** - Rewards earned for participating in Ethereum’s consensus mechanism. Validators earn them by performing duties such as attesting to blocks, proposing blocks, and participating in sync committees. These rewards are issued as new ETH to the validator’s balance on the Beacon Chain. They can be withdrawn partially, meaning amounts above the initial stake, at periodic intervals, or fully when the validator exits the network. Withdrawn rewards or stake are sent to the Ethereum address associated with the staker’s withdrawal credentials.
* **Execution Layer Rewards** - Rewards earned from executing transactions as part of block proposals. They include priority fees paid by users and MEV rewards. Execution layer rewards are sent directly to the Ethereum address specified by the staker as the fee recipient and can be accessed immediately.

### Fee Recipient Address and SSV

On SSV Network, stakers can set a fee recipient address to receive execution layer rewards. The specified address is used for all validators in the staker’s account. By default, the fee recipient address is the account owner address.

Each time a validator cluster performs a block proposal duty for a staker, the operators reach consensus on the validator’s fee recipient address. This ensures that even if a dishonest operator attempts to change the address, they cannot complete the duty without quorum from the validator cluster.
