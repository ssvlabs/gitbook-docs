# Register Validator

This page shows how to progmatically register a validator to the SSV network. Assuming you already have generated a valid keyshare.&#x20;

### Register Validator

```typescript
import { parseEther } from 'viem';

try {
    const txnReceipt = await sdk.clusters.registerValidators({
        args: {
            keyshares: keysharesPayload,
            depositAmount: parseEther('30'),
        },
    }).then(tx => tx.wait());

    console.log('Transaction receipt:', txnReceipt);
} catch (error) {
    logErrorToFile(error);
    console.error('Failed to register validators:', error);
}
```

