---
sidebar_position: 4
---

# External Whitelist Contract example

When [configuring a permissioned Operator](../../operators/operator-management/configuring-a-permissioned-operator), we have the option to set an external whitelising contract to manage this whitelist. To work correctly with the SSV network contract, it must meet certain specifications.&#x20;

### What is a valid Whitelisting Contract?&#x20;

The operators can choose to whitelist an external contract with custom logic to manage authorized addresses externally. To be used in SSV contracts, it needs to implement the [ISSVWhitelistingContract](https://github.com/ssvlabs/ssv-network/blob/v1.2.0/contracts/interfaces/external/ISSVWhitelistingContract.sol) interface, that requires to implement the `isWhitelisted(address account, uint256 operatorId)` function. This function is called in the register validator process, that must return `true/false` to indicate if the caller (`msg.sender`) is whitelisted for the operator.

To check if a contract is a valid whitelisting contract, use the function in the [SSVNetworkViews](ssvnetworkviews.md) contract: [`isWhitelistingContract()`](ssvnetworkviews.md#iswhitelistingcontractcontractaddress)

To check if an account is whitelisted in a whitelisting contract, use the function in the [SSVNetworkViews](ssvnetworkviews.md) contract: [`isAddressWhitelistedInWhitelistingContract()`](ssvnetworkviews.md#isaddresswhitelistedinwhitelistingcontractaddresstocheck-operatorid-whitelistingcontract)

### Example contract


```javascript
// SPDX-License-Identifier: GPL-3.0-or-later pragma solidity 0.8.24;
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
interface ISSVWhitelistingContract { 
    /// @notice Checks if the caller is whitelisted 
    /// @param account The account that is being checked for whitelisting 
    /// @param operatorId The SSV Operator Id which is being checked function
    isWhitelisted(address account, uint256 operatorId) external view returns (bool); 
}
contract WhitelistingContract is ISSVWhitelistingContract, ERC165 {
    mapping(address => bool) public whitelisted;

    function setWhitelistedAddress(address account) external {
        whitelisted[account] = true;
    }
    
    function removeWhitelistedAddress(address account) external {
        whitelisted[account] = false;
    }
    
    function isWhitelisted(address account, uint256) external view override returns (bool) {
        return whitelisted[account];
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(ISSVWhitelistingContract).interfaceId || super.supportsInterface(interfaceId);
    }
}
```
