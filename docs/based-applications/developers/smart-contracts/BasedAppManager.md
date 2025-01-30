---
sidebar_position: 1
---

# BasedAppManager

The BasedAppManager contract is the main contract for operations and management.

[Based Applications Contracts Repository](https://github.com/ssvlabs/based-applications/)

## Operator Methods 

### **`registerOperator(publicKey, operatorFee, setPrivate)`**

Description: Registers a new operator (key) with a set fee, **fails if** fee is less than the minimal fee.

| **Parameter** | **Type**                             | **Description**                                                                                                                                                                                     |
| ------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey     | bytes                                | The operator public key (generated as part of the node setup).                                                                                                                                      |
| operatorFee   | uint256(casted to uint64) | The fee charged by the operator (denominated as $SSV tokens per block)                                                                                                                              |
| setPrivate    | bool                                 | A flag to set the operator to private or public during registration. Calls the [**`setOperatorsPrivateUnchecked`**](ssvnetwork.md#setoperatorsprivateuncheckedoperatorids)function if set to true. |

Events:

* `OperatorAdded(uint64 indexed operatorId, address indexed owner, bytes publicKey, uint256 fee)`
* `OperatorPrivacyStatusUpdated(uint64[] operatorIds, bool toPrivate)`
