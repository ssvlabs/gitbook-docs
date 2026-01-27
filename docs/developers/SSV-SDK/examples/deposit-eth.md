---
sidebar_position: 8
---

# Deposit ETH

This page shows how to programmatically deposit ETH to a cluster on the SSV network. This executes the contract call to the smart contract to deposit ETH to the cluster.

### Deposit ETH

```typescript
import { parseEther } from 'viem';

try {
    const txnReceipt = await sdk.clusters.deposit({
        value: parseEther('0.123')
        args: {
            id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc",
        },
    },
    ).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to deposit ETH:', error);
}
```

