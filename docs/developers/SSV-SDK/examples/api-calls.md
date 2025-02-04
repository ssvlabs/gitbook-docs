---
sidebar_position: 2
---

# API calls

This page will show how to use the API module to do various calls. The API module is used to get data such as the Account Nonce, or Cluster Snapshot, both are covered on this page.&#x20;

For the full list of functions you can check the [API Module Reference](../module-reference/api-module.md).

### Get Nonce&#x20;

``` typescript
 const ownerNonce = await sdk.api.getOwnerNonce({ 
        owner: "0xA4831B989972605A62141a667578d742927Cbef9" 
    })
    
    console.log(ownerNonce)
}
```

### Get Cluster Snapshot

```typescript
import { createClusterId } from '@ssv-labs/ssv-sdk/utils'

async function main() {

  const ownerAddress = "0xA4831B989972605A62141a667578d742927Cbef9"
  const operatorIds = [242, 686, 707, 736]

  const clusterID = createClusterId(ownerAddress, operatorIds)

    const clusterSnapshot = await sdk.api.getClusterSnapshot({ 
        id: clusterID
    })
    console.log(clusterSnapshot)
}
```

