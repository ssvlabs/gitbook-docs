# Tech Overview

SSV is a sophisticated mult&#x69;**-**&#x73;ignature wallet with a consensus layer. It is a middle layer that comes between a beacon node and a validator client. From a user’s perspective, it is just a component to plug in and take care of everything on their behalf. The main components of an SSV configuration are as follows:\


* **Distributed Key Generation**

This process generates a shared public and private key set calculated by the operators running an SSV instance. Each operator owns a single portion of the private key, ensuring that no single operator can affect or have control over the entire private key and make unilateral decisions.&#x20;

* **Shamir Secret Sharing**

This mechanism used to reconstruct a validator key using a pre-defined threshold of KeyShares. Individual KeyShares cannot be used to sign a duty, yet not all are needed if some are faulty as described by n≥3f+1.

SSV.network is able to leverage the BLS signatures - allowing for multiple signatures to be combined to recreate a validator key signature. By combining Shamir and BLS - the keys are 'broken down' to share and regrouped whenever a duty is assigned.&#x20;

* **Multi-Party Computation**

Applying secure Multi-Party Computation (MPC) to secret sharing allows the KeyShares of an SSV to be distributed amongst operators securely as well as performing decentralized computation of validator duties without reconstructing the validator key on a single device.

* **Istanbul Byzantine Fault Tolerance Consensus**

Tying it all together, the consensus layer of SSV, based on the Istanbul Byzantine Fault Tolerance (IBFT) algorithm. The algorithm randomly selects a validator node (KeyShare) responsible for block proposal and sharing the information with the other participants. Once the predefined threshold of KeyShares deems the block to be valid, it is added to the chain. As such, consensus can be reached even if some operators (up to the threshold) are faulty or not currently online.&#x20;
