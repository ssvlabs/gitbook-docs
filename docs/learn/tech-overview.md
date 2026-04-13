---
sidebar_position: 3
---

# Tech Overview

SSV can be thought of as a multi-signature system with a consensus layer. It sits between a beacon node and a validator client. From a user’s perspective, it is a component that handles distributed validator operation on their behalf. The main components of an SSV setup are:

### **Distributed Key Generation**

This process generates a shared public/private key set across the operators running an SSV instance. Each operator holds only one portion of the private key, ensuring that no single operator can control the full key or make unilateral decisions.

### **Shamir Secret Sharing**

This mechanism reconstructs validator signatures using a predefined threshold of key shares. Individual key shares cannot be used to sign a duty on their own, and not all shares are required if some operators are faulty, as described by n≥3f+1.

SSV Network leverages BLS signatures, which allow multiple partial signatures to be combined into a valid validator signature. By combining Shamir Secret Sharing and BLS, the validator key can be split for distribution and used collaboratively whenever a duty is assigned.

### **Multi-Party Computation**

Applying secure Multi-Party Computation (MPC) to secret sharing allows key shares to be distributed securely among operators and enables decentralized computation of validator duties without reconstructing the validator key on a single device.

### **Istanbul Byzantine Fault Tolerance Consensus**

Tying it all together, SSV uses a consensus layer based on the Istanbul Byzantine Fault Tolerance (IBFT) algorithm. For each validator duty, the cluster agrees on the duty data to be signed. A designated participant proposes the message, the other operators verify it, and once the required threshold is reached, the cluster can proceed to sign. This allows the cluster to keep operating even if some operators are faulty or temporarily offline.

## Specs

You can find SSV protocol specs in the following repositories:
- [SSV Spec](https://github.com/ssvlabs/ssv-spec)
- [P2P Spec](https://github.com/ssvlabs/ssv-spec/tree/main/p2p)
