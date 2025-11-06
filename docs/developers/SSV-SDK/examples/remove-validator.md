---
sidebar_position: 6
---

# Remove Validator

This page shows how to programmatically remove validators from a cluster on the SSV network.

### Remove Validator

```typescript
try {
    const txnReceipt = await sdk.clusters.removeValidators({
        args: {
            id: "ee8881d3c979203025996773ef8a13cb4aac57076e22638dd6ed9b17adcdabfc",
            publicKeys: [
                "0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e86",
                "0x820fd0519c75f74c8be9f21f185406919721dad0c624464538e2eaa323d77d3eb3ef27a039e8779de6cfa649a5484e87"
            ],
        },
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to remove validators:', error);
}
```

