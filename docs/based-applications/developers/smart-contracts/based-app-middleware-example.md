---
sidebar_label: 'Based App Middleware Example'
sidebar_position: 2
unlisted: true
---

# BasedAppMiddleware

Services that want to [integrate with SSV's Based Application framework](/based-applications/developers/) need to develop a smart contract for the services' task that are going to be handled by operators, and register it. To work correctly with the [Based Application Manager contract](../smart-contracts/BasedAppManager.md), this must meet certain specifications.

## What is a valid `BAppMiddleware` Contract?

 To be used in the context of the Based Application Manager, services need to develop a smart contract that implements a specific interface, called `IBAppMiddleware`.

## Example contract

In this example contract we inherit both `BasedAppCore` and `BasedAppWhitelisted`.

```javascript
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.28;

import {BasedAppCore} from "@ssv/src/middleware/modules/core/BasedAppCore.sol";
import {BasedAppWhitelisted} from "@ssv/src/middleware/modules/BasedAppWhitelisted.sol";

contract WhitelistExample is BasedAppCore, BasedAppWhitelisted {
    constructor(address _basedAppManager, address owner) BasedAppCore(_basedAppManager, owner) {
        isWhitelisted[owner] = true;
    }

    function addWhitelisted(address account) external override onlyOwner {
        if (isWhitelisted[account]) revert AlreadyWhitelisted();
        if (account == address(0)) revert ZeroAddress();
        isWhitelisted[account] = true;
    }

    function removeWhitelisted(address account) external override onlyOwner {
        if (!isWhitelisted[account]) revert NotWhitelisted();
        delete isWhitelisted[account];
    }

    function optInToBApp(
        uint32, /*strategyId*/
        address[] calldata, /*tokens*/
        uint32[] calldata, /*obligationPercentages*/
        bytes calldata /*data*/
    ) external view override onlySSVBasedAppManager returns (bool success) {
        if (!isWhitelisted[msg.sender]) revert NonWhitelistedCaller();
        return true;
    }
}
```
