---
sidebar_position: 9
---

# Withdraw SSV

This page shows how to programmatically withdraw SSV from a cluster on the SSV network.

### Withdraw SSV

```typescript
import { parseEther } from 'viem';

try {
    const txnReceipt = await sdk.clusters.withdraw({
        args: {
            id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc",
            amount: parseEther('30'),
        },
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to withdraw SSV:', error);
}
```

