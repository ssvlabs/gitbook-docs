# Cluster Balance Calculation

The script below calculates the balance of a cluster on the SSV network. This calculation can be made useful by adding it to cluster balance monitoring tool/automation of your own.

Details on the formulas used can be found in the documentation page related to [Cluster Balance](/stakers/clusters/cluster-balance).

The core calculation function that computes and prints the cluster balance:

```typescript
try {
    const { balance, operationalRunway } = await sdk.utils.getClusterBalance({
        args: {
            operatorIds: [1, 2, 3, 4],
        },
    });

    console.log('Cluster balance result:', {
        balance: balance.toString(),
        operationalRunway: operationalRunway.toString(),
    });
} catch (error) {
    console.error('Failed to get cluster balance:', error);
}
```