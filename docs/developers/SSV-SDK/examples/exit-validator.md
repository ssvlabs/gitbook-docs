---
sidebar_position: 7
---

# Exit Validator

This page shows how to programmatically exit a validator from the SSV network. This prompts SSV nodes to sign a voluntary exit of the validator.

### Exit Validator

```typescript
try {
    const txnReceipt = await sdk.clusters.exitValidators({
        args: {
            publicKeys: ["0xA4831B989972605A62141a667578d742927Cbef9", "0xA4831B989972605A62141a667578d742927Cbef8"],
            operatorIds: [1, 2, 3, 4],
        },
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    console.error('Failed to exit validators:', error);
}
```

