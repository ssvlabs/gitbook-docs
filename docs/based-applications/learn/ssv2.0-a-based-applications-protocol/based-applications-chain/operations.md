---
sidebar_label: 'Operations'
sidebar_position: 4
---

# Operations

Validator management is a continuous process done by the bApps chain to ensure only active L1 validators can participate in securing bApps. An L1 validator's initial onboarding consists of registering to the chain (recommended to be run as a DVT cluster). Once registered, the chain can continuously verify the validator is deposited and active. Active validators can then be used to secure based applications, directly using their key or via some proxy key.

The application registry is responsible for synchronizing all bApp users on the current state of applications, their operators, and their respective weights for tasks. The registry is the cornerstone of each bApp; it’s the deterministic state each bApp has to have for its consensus to be secure.

The coordination itself must be deterministic. At any point in time, all validators in the network should be aware of which peers have opted in, their respective weight, and the rules of consensus. Deterministic coordination ensures reliability, consistency, and a predictable state that all participants can trust, laying the foundation for seamless interactions between validators and bApps.