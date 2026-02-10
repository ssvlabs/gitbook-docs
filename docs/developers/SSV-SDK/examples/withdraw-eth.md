---
sidebar_position: 9
---

# Withdraw ETH

This page shows how to programmatically withdraw ETH from a cluster on the SSV network.

### Withdraw ETH

```typescript
import { parseEther } from 'viem';

try {
    const txnReceipt = await sdk.clusters.withdraw({
        args: {
            id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc",
            amount: parseEther('0.123'),
        },
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to withdraw ETH:', error);
}
```

