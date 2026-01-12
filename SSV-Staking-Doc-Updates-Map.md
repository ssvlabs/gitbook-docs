# SSV Staking Documentation Updates Map

This document maps all required documentation updates for SSV Staking (ETH clusters, cSSV staking, EB oracle system, etc.) to the specific documentation pages that need to be updated.

---

## 1. ETH Clusters & Migration

### Update all cluster lifecycle docs to ETH-first (create, fund, run)

**Pages to Update:**
- [Cluster Management Overview](https://docs.ssv.network/stakers/cluster-management) - `docs/stakers/cluster-management/README.md`
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`
- [Creating a New Validator](https://docs.ssv.network/stakers/validator-management/creating-a-new-validator) - `docs/stakers/validator-management/creating-a-new-validator.md`
- [Distributing a Validator](https://docs.ssv.network/stakers/validator-management/distributing-a-validator) - `docs/stakers/validator-management/distributing-a-validator.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- [Depositing SSV](https://docs.ssv.network/stakers/cluster-management/depositing-ssv) - `docs/stakers/cluster-management/depositing-ssv.md`
- [Payments](https://docs.ssv.network/learn/protocol-overview/tokenomics/payments) - `docs/learn/protocol-overview/tokenomics/payments.md`

### Add explicit one-way migration warning (SSV → ETH cannot revert)

**Pages to Update:**
- [Cluster Management Overview](https://docs.ssv.network/stakers/cluster-management) - `docs/stakers/cluster-management/README.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- **NEW SECTION NEEDED**: Migration Guide (create new file in `docs/stakers/cluster-management/`)

### Document migrateClusterToETH() flow step-by-step

**Pages to Update:**
- **NEW PAGE**: Migration Guide - `docs/stakers/cluster-management/migrating-to-eth-clusters.md`
- [SSVNetwork Smart Contract](https://docs.ssv.network/developers/smart-contracts/ssvnetwork) - `docs/developers/smart-contracts/ssvnetwork.md`
- [Cluster Module SDK](https://docs.ssv.network/developers/SSV-SDK/module-reference/cluster-module) - `docs/developers/SSV-SDK/module-reference/cluster-module.md`

### Add ETH funding + runway examples (remove SSV-centric assumptions)

**Pages to Update:**
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- [Staking Services Integration](https://docs.ssv.network/developers/integration-guides/staking-services) - `docs/developers/integration-guides/staking-services.md`
- [Staking Pools - Initialization](https://docs.ssv.network/developers/integration-guides/staking-pools/initialization-stage) - `docs/developers/integration-guides/staking-pools/initialization-stage.md`

### Clearly mark SSV clusters as legacy and transitional

**Pages to Update:**
- [Cluster Management Overview](https://docs.ssv.network/stakers/cluster-management) - `docs/stakers/cluster-management/README.md`
- [Clusters Overview](https://docs.ssv.network/stakers/clusters) - `docs/stakers/clusters/README.md`
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`
- [Payments](https://docs.ssv.network/learn/protocol-overview/tokenomics/payments) - `docs/learn/protocol-overview/tokenomics/payments.md`

---

## 2. Operator ETH Fees & Rules

### Update operator onboarding docs for ETH-only operators

**Pages to Update:**
- [Operator Onboarding](https://docs.ssv.network/operators/operator-onboarding) - `docs/operators/operator-onboarding/README.md`
- [Operator Registration](https://docs.ssv.network/operators/operator-management/registration) - `docs/operators/operator-management/registration.md`
- [Operators Overview](https://docs.ssv.network/operators) - `docs/operators/README.md`

### Document ETH fee defaults and DAO-defined fallback behavior

**Pages to Update:**
- [Operator Onboarding](https://docs.ssv.network/operators/operator-onboarding) - `docs/operators/operator-onboarding/README.md`
- [Operator Registration](https://docs.ssv.network/operators/operator-management/registration) - `docs/operators/operator-management/registration.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`

### Explain migration-period fee override (2× default, one-time)

**Pages to Update:**
- [Update Fee](https://docs.ssv.network/operators/operator-onboarding/update-fee) - `docs/operators/operator-onboarding/update-fee.md`
- [Updating Operator Fees](https://docs.ssv.network/operators/operator-management/updating-operator-fees) - `docs/operators/operator-management/updating-operator-fees.md`
- **NEW SECTION**: Migration-specific fee rules in operator docs

### Clarify that ETH and SSV earnings are separate balances

**Pages to Update:**
- [Withdrawing Earnings](https://docs.ssv.network/operators/operator-management/withdrawing-earnings) - `docs/operators/operator-management/withdrawing-earnings.md`
- [Operator Onboarding](https://docs.ssv.network/operators/operator-onboarding) - `docs/operators/operator-onboarding/README.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`

### Explicitly state that ETH-only operators cannot receive SSV fees

**Pages to Update:**
- [Operator Onboarding](https://docs.ssv.network/operators/operator-onboarding) - `docs/operators/operator-onboarding/README.md`
- [Operator Registration](https://docs.ssv.network/operators/operator-management/registration) - `docs/operators/operator-management/registration.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`

---

## 3. Effective Balance (vUnits) Accounting

### Add a new conceptual doc explaining vUnits and EB weighting

**Pages to Update:**
- **NEW PAGE**: vUnits and Effective Balance - `docs/learn/protocol-overview/tokenomics/effective-balance.md`
- [Tokenomics Overview](https://docs.ssv.network/learn/protocol-overview/tokenomics) - `docs/learn/protocol-overview/tokenomics/README.md`
- [Glossary](https://docs.ssv.network/learn/glossary) - `docs/learn/glossary.md`

### Document EB vs validatorCount differences (ETH vs SSV clusters)

**Pages to Update:**
- **NEW PAGE**: vUnits and Effective Balance - `docs/learn/protocol-overview/tokenomics/effective-balance.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- [Payments](https://docs.ssv.network/learn/protocol-overview/tokenomics/payments) - `docs/learn/protocol-overview/tokenomics/payments.md`

### Explain fallback behavior when EB data is missing (32 ETH default)

**Pages to Update:**
- **NEW PAGE**: vUnits and Effective Balance - `docs/learn/protocol-overview/tokenomics/effective-balance.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`

### Add examples showing fee scaling with EB (32 vs 64 vs 2048 ETH)

**Pages to Update:**
- **NEW PAGE**: vUnits and Effective Balance - `docs/learn/protocol-overview/tokenomics/effective-balance.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`

### Update any fee math references that assume 1 validator = 32 ETH

**Pages to Update:**
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- [Liquidations](https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations) - `docs/learn/protocol-overview/tokenomics/liquidations.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`
- [Staking Services Integration](https://docs.ssv.network/developers/integration-guides/staking-services) - `docs/developers/integration-guides/staking-services.md`

---

## 4. EB Oracle System (v1)

### Add EB Oracle architecture overview (why oracles exist at all)

**Pages to Update:**
- **NEW PAGE**: EB Oracle System - `docs/learn/protocol-overview/eb-oracle-system.md`
- [Protocol Overview](https://docs.ssv.network/learn/protocol-overview) - `docs/learn/protocol-overview/README.md`
- [Tech Overview](https://docs.ssv.network/learn/introduction/tech-overview) - `docs/learn/introduction/tech-overview.md`

### Document commitRoot → updateClusterBalance lifecycle

**Pages to Update:**
- **NEW PAGE**: EB Oracle System - `docs/learn/protocol-overview/eb-oracle-system.md`
- [SSVNetwork Smart Contract](https://docs.ssv.network/developers/smart-contracts/ssvnetwork) - `docs/developers/smart-contracts/ssvnetwork.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`

### Explain Merkle root + proof verification in simple terms

**Pages to Update:**
- **NEW PAGE**: EB Oracle System - `docs/learn/protocol-overview/eb-oracle-system.md`
- [Tech Overview](https://docs.ssv.network/learn/introduction/tech-overview) - `docs/learn/introduction/tech-overview.md`

### Clearly state v1 constraints: 4 fixed oracles, 75% quorum

**Pages to Update:**
- **NEW PAGE**: EB Oracle System - `docs/learn/protocol-overview/eb-oracle-system.md`
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`

### Document oracle update frequency and finality assumptions

**Pages to Update:**
- **NEW PAGE**: EB Oracle System - `docs/learn/protocol-overview/eb-oracle-system.md`
- [Tech Overview](https://docs.ssv.network/learn/introduction/tech-overview) - `docs/learn/introduction/tech-overview.md`

---

## 5. SSV Staking (cSSV + ETH Rewards)

### Add full staking user journey (stake → earn → claim → unstake)

**Pages to Update:**
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`
- **NEW PAGE**: Stake SSV - `docs/stakers/ssv-staking/stake-ssv.md`
- **NEW PAGE**: Claim Rewards - `docs/stakers/ssv-staking/claim-rewards.md`
- **NEW PAGE**: Unstake SSV - `docs/stakers/ssv-staking/unstake-ssv.md`
- [SSV Token](https://docs.ssv.network/learn/introduction/ssv-token) - `docs/learn/introduction/ssv-token.md`

### Explain cSSV non-rebasing, index-based reward model

**Pages to Update:**
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`
- [SSV Token](https://docs.ssv.network/learn/introduction/ssv-token) - `docs/learn/introduction/ssv-token.md`
- [Tokenomics Overview](https://docs.ssv.network/learn/protocol-overview/tokenomics) - `docs/learn/protocol-overview/tokenomics/README.md`
- [Glossary](https://docs.ssv.network/learn/glossary) - `docs/learn/glossary.md`

### Document ETH reward flow from clusters → staking contract

**Pages to Update:**
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`
- [Validator Rewards](https://docs.ssv.network/stakers/validators/validator-rewards) - `docs/stakers/validators/validator-rewards.md`
- [Tokenomics Overview](https://docs.ssv.network/learn/protocol-overview/tokenomics) - `docs/learn/protocol-overview/tokenomics/README.md`

### Add unstaking cooldown explanation and its implications

**Pages to Update:**
- **NEW PAGE**: Unstake SSV - `docs/stakers/ssv-staking/unstake-ssv.md`
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`
- [Glossary](https://docs.ssv.network/learn/glossary) - `docs/learn/glossary.md`

### Clarify that rewards stop accruing during cooldown

**Pages to Update:**
- **NEW PAGE**: Unstake SSV - `docs/stakers/ssv-staking/unstake-ssv.md`
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`

---

## 6. Oracle Delegation (Auto-split v1)

### Document automatic stake-weight splitting across all oracles

**Pages to Update:**
- **NEW PAGE**: Oracle Delegation - `docs/learn/protocol-overview/oracle-delegation.md`
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`

### Explicitly state that users do not choose oracles in v1

**Pages to Update:**
- **NEW PAGE**: Oracle Delegation - `docs/learn/protocol-overview/oracle-delegation.md`
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`

### Explain voting weight behavior during unstake cooldown

**Pages to Update:**
- **NEW PAGE**: Oracle Delegation - `docs/learn/protocol-overview/oracle-delegation.md`
- **NEW PAGE**: Unstake SSV - `docs/stakers/ssv-staking/unstake-ssv.md`
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`

### Set expectations for v2 (manual delegation, variable oracles)

**Pages to Update:**
- **NEW PAGE**: Oracle Delegation - `docs/learn/protocol-overview/oracle-delegation.md`
- **NEW PAGE**: EB Oracle System - `docs/learn/protocol-overview/eb-oracle-system.md`

---

## 7. Liquidation Behavior

### Document ETH cluster liquidation (EB-weighted logic)

**Pages to Update:**
- [Liquidations](https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations) - `docs/learn/protocol-overview/tokenomics/liquidations.md`
- [Liquidator Bot](https://docs.ssv.network/operators/liquidator-bot) - `docs/operators/liquidator-bot/README.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`

### Document legacy SSV cluster liquidation separately

**Pages to Update:**
- [Liquidations](https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations) - `docs/learn/protocol-overview/tokenomics/liquidations.md`
- [Liquidator Bot](https://docs.ssv.network/operators/liquidator-bot) - `docs/operators/liquidator-bot/README.md`

### Add warnings about calling the wrong liquidation path

**Pages to Update:**
- [Liquidations](https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations) - `docs/learn/protocol-overview/tokenomics/liquidations.md`
- [Liquidator Bot](https://docs.ssv.network/operators/liquidator-bot) - `docs/operators/liquidator-bot/README.md`
- [SSVNetwork Smart Contract](https://docs.ssv.network/developers/smart-contracts/ssvnetwork) - `docs/developers/smart-contracts/ssvnetwork.md`

### Update any liquidation thresholds/examples to be EB-aware

**Pages to Update:**
- [Liquidations](https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations) - `docs/learn/protocol-overview/tokenomics/liquidations.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- [Reactivation](https://docs.ssv.network/stakers/clusters/reactivation) - `docs/stakers/clusters/reactivation.md`
- [Re-activating a Cluster](https://docs.ssv.network/stakers/cluster-management/re-activating-a-cluster) - `docs/stakers/cluster-management/re-activating-a-cluster.md`

---

## 8. Incentivized Mainnet (IM) Alignment

### Update IM docs to state ETH clusters only are eligible

**Pages to Update:**
- **NEW PAGE**: Incentivized Mainnet - `docs/learn/protocol-overview/incentivized-mainnet.md`
- [Network Overview](https://docs.ssv.network/learn/introduction/network-overview) - `docs/learn/introduction/network-overview.md`
- [Operators Overview](https://docs.ssv.network/operators) - `docs/operators/README.md`

### Remove all references to off-chain EB fee deductions

**Pages to Update:**
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`
- [Operator Onboarding](https://docs.ssv.network/operators/operator-onboarding) - `docs/operators/operator-onboarding/README.md`
- [Payments](https://docs.ssv.network/learn/protocol-overview/tokenomics/payments) - `docs/learn/protocol-overview/tokenomics/payments.md`

### Document IM as a migration incentive, not a permanent system

**Pages to Update:**
- **NEW PAGE**: Incentivized Mainnet - `docs/learn/protocol-overview/incentivized-mainnet.md`
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`

### Add guidance for operators losing IM rewards on SSV clusters

**Pages to Update:**
- **NEW PAGE**: Incentivized Mainnet - `docs/learn/protocol-overview/incentivized-mainnet.md`
- [Operators Overview](https://docs.ssv.network/operators) - `docs/operators/README.md`
- [Operator Onboarding](https://docs.ssv.network/operators/operator-onboarding) - `docs/operators/operator-onboarding/README.md`

---

## 9. DAO & Governance Parameters

### Update governance docs with new ETH-related params: DEFAULT_OPERATOR_ETH_FEE, MINIMAL_OPERATOR_ETH_FEE, RewardsPeriod

**Pages to Update:**
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`
- [SSVNetworkViews Smart Contract](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews) - `docs/developers/smart-contracts/ssvnetworkviews.md`
- [SSV Subgraph Examples](https://docs.ssv.network/developers/tools/ssv-subgraph/subgraph-examples) - `docs/developers/tools/ssv-subgraph/subgraph-examples.md`

### Explain how these parameters affect staker APR and operator revenue

**Pages to Update:**
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`
- **NEW PAGE**: SSV Staking Guide - `docs/stakers/ssv-staking/README.md`

### Add references to where these values are read on-chain

**Pages to Update:**
- [SSVNetworkViews Smart Contract](https://docs.ssv.network/developers/smart-contracts/ssvnetworkviews) - `docs/developers/smart-contracts/ssvnetworkviews.md`
- [SSV Subgraph Examples](https://docs.ssv.network/developers/tools/ssv-subgraph/subgraph-examples) - `docs/developers/tools/ssv-subgraph/subgraph-examples.md`
- [Governance](https://docs.ssv.network/learn/introduction/governance) - `docs/learn/introduction/governance.md`

---

## 10. Legacy & Compatibility Notices

### Add clear "Legacy SSV Mode" labeling across relevant pages

**Pages to Update:**
- [Cluster Management Overview](https://docs.ssv.network/stakers/cluster-management) - `docs/stakers/cluster-management/README.md`
- [Clusters Overview](https://docs.ssv.network/stakers/clusters) - `docs/stakers/clusters/README.md`
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`
- [Depositing SSV](https://docs.ssv.network/stakers/cluster-management/depositing-ssv) - `docs/stakers/cluster-management/depositing-ssv.md`
- [Payments](https://docs.ssv.network/learn/protocol-overview/tokenomics/payments) - `docs/learn/protocol-overview/tokenomics/payments.md`
- [Fees](https://docs.ssv.network/learn/protocol-overview/tokenomics/fees) - `docs/learn/protocol-overview/tokenomics/fees.md`

### Add migration FAQ (what still works, what doesn't)

**Pages to Update:**
- **NEW PAGE**: Migration FAQ - `docs/stakers/cluster-management/migration-faq.md`
- [Stakers Overview](https://docs.ssv.network/stakers) - `docs/stakers/README.md`
- [Quickstart](https://docs.ssv.network/stakers/quickstart) - `docs/stakers/quickstart.md`

### Update old examples/snippets that assume SSV fees

**Pages to Update:**
- [Validator Onboarding](https://docs.ssv.network/stakers/validators/validator-onboarding) - `docs/stakers/validators/validator-onboarding.md`
- [Cluster Balance](https://docs.ssv.network/stakers/clusters/cluster-balance) - `docs/stakers/clusters/cluster-balance.md`
- [Liquidations](https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations) - `docs/learn/protocol-overview/tokenomics/liquidations.md`
- [Staking Services Integration](https://docs.ssv.network/developers/integration-guides/staking-services) - `docs/developers/integration-guides/staking-services.md`
- [Cluster Balance Script](https://docs.ssv.network/developers/code-examples-and-snippets/cluster-balance-script) - `docs/developers/code-examples-and-snippets/cluster-balance-script.md`
- All SDK examples in `docs/developers/SSV-SDK/examples/`

### Add versioning notes to avoid mixing v0 mental models with v1

**Pages to Update:**
- [Stakers Overview](https://docs.ssv.network/stakers) - `docs/stakers/README.md`
- [Operators Overview](https://docs.ssv.network/operators) - `docs/operators/README.md`
- [Developers Overview](https://docs.ssv.network/developers) - `docs/developers/README.md`
- [Protocol Overview](https://docs.ssv.network/learn/protocol-overview) - `docs/learn/protocol-overview/README.md`
- **NEW PAGE**: Version Differences Guide - `docs/learn/protocol-overview/version-differences.md`

---

## Summary of New Pages to Create

1. **Migration Guide** - `docs/stakers/cluster-management/migrating-to-eth-clusters.md`
2. **vUnits and Effective Balance** - `docs/learn/protocol-overview/tokenomics/effective-balance.md`
3. **EB Oracle System** - `docs/learn/protocol-overview/eb-oracle-system.md`
4. **SSV Staking Guide** (folder) - `docs/stakers/ssv-staking/README.md`
5. **Stake SSV** - `docs/stakers/ssv-staking/stake-ssv.md`
6. **Claim Rewards** - `docs/stakers/ssv-staking/claim-rewards.md`
7. **Unstake SSV** - `docs/stakers/ssv-staking/unstake-ssv.md`
8. **Oracle Delegation** - `docs/learn/protocol-overview/oracle-delegation.md`
9. **Incentivized Mainnet** - `docs/learn/protocol-overview/incentivized-mainnet.md`
10. **Migration FAQ** - `docs/stakers/cluster-management/migration-faq.md`
11. **Version Differences Guide** - `docs/learn/protocol-overview/version-differences.md`

---

## Summary Statistics

- **Total Tasks**: 62
- **Existing Pages to Update**: ~50 pages
- **New Pages to Create**: 11 pages
- **Primary Sections Affected**: 
  - Stakers (30 tasks)
  - Learn/Protocol Overview (18 tasks)
  - Operators (10 tasks)
  - Developers (4 tasks)

