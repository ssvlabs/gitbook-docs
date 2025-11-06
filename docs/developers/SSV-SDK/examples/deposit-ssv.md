---
sidebar_position: 8
---

# Deposit SSV

This page shows how to programmatically deposit SSV to a cluster on the SSV network. This executes the contract call to the SSV smart contract to deposit SSV to the cluster.

### Deposit SSV

```typescript
import { parseEther } from 'viem';

try {
    const txnReceipt = await sdk.clusters.deposit({
        args: {
            id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc",
            amount: parseEther('30'),
        },
    }, {
        approve: true, // Automatically triggers token approval transaction if the allowance is lower than the deposit amount
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to deposit SSV:', error);
}
```

