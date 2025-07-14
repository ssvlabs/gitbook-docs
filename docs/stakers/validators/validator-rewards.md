---
sidebar_position: 2
---

# Validator Rewards

ssv.network is a non-custodial protocol, meaning stakers maintain full custody over their staking rewards.

Validators accrue two forms of rewards:

* **Consensus Layer Rewards** - These are rewards earned for participating in the Ethereum network's consensus mechanism. Validators earn these rewards by performing duties such as attesting to blocks, proposing blocks, and participating in sync committees. These rewards are issued as new ETH to the validator's balance on the Beacon Chain. They can be withdrawn in two ways: partially (any amount above the initial 32 ETH stake) at periodic intervals, or fully (the entire stake) when the validator exits the network. The withdrawn rewards or stake are sent to the Ethereum address associated with the staker's withdrawal credentials.
* **Execution layer rewards** - These are rewards earned for executing transactions on the Ethereum network as part of block proposals. They include priority fees (fees paid by users for their transactions to be included) and MEV rewards (rewards for arranging transactions in a way that benefits the validator). Execution layer rewards are sent directly to the Ethereum address specified by the staker as their fee recipient address, and can be accessed immediately.

### Fee Recipient Address and SSV

On ssv.network, stakers have the option to set a fee recipient address to receive their execution layer rewards. The specified address is used for all the validators in the staker's account (at default, the fee recipient address is set to the account owner-address)

Each time the operators of a validator cluster performs a block proposal duty for a staker, they reach consensus that the validator's fee recipient address is the one set by the staker. This ensures that even if a dishonest operator attempts to change the address, they would not be able to perform the duty without the quorum of the operators in the validator cluster.