---
sidebar_label: 'Based App Interface'
sidebar_position: 2
---

# BasedApp Interface

Services that want to [integrate with SSV's Based Application framework](/based-applications/developers/) need to develop a smart contract, and register it to the [Based Application Manager contract](../smart-contracts/SSVBasedApps.md). To be accepted by the Based Application Manager contract, this must meet certain specifications.

## What is a valid `BasedApp` Contract?

 To be used in the context of the Based Application Manager, services need to develop a smart contract that implements a specific interface, called `IBasedApp`.

```javascript
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.28;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IBasedApp is IERC165 {
    function registerBApp(address[] calldata tokens, uint32[] calldata sharedRiskLevels, string calldata metadataURI) external;

    function optInToBApp(
        uint32 strategyId,
        address[] calldata tokens,
        uint32[] calldata obligationPercentages,
        bytes calldata data
    ) external returns (bool);

    function addTokensToBApp(address[] calldata tokens, uint32[] calldata sharedRiskLevels) external;

    function updateBAppTokens(address[] calldata tokens, uint32[] calldata sharedRiskLevels) external;

    function updateBAppMetadataURI(string calldata metadataURI) external;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

This because the `registerBApp` function allows BApp managers to call it from their own contract, and forward the call to the Based Application Manager contract.
Vice versa, the `optInToBApp` function is needed when a Strategy opts in to this BApp: whenever this happens, the Based Application Manager contract is going to forward the call to this function, allowing the BApp to be notified.

BApp developers can customize the logic of these two functions as they see fit.
