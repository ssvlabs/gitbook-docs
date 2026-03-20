---
description: Post-Onboarding Checks
sidebar_position: 5
---

#  Post-Onboarding Checks
After activation, verify everything is operating normally:
- **Attestation Resumption:** Confirm validators are attesting (can take up to ~3 epochs).
- **Funding Top-up:** Set reminders at least 14 days before depletion (How‑to: [Deposit ETH guide](/stakers/cluster-management/depositing-eth)).
- **Backups:** Secure operator password and private key files separately and offline (How‑to: [Backup Node guide](/operators/operator-node/maintenance/node-migration.md#node-backup)).
- **Monitoring:** [Use dashboards](/operators/operator-node/monitoring/dashboard-runbook) and logs for proactive health checks.

---

### Handling Issues
In case you encountered issues during Onboarding, you will need to rollback to your Previous Setup:
- Remove Onboarded Keys (How‑to: [Remove Validators guide](/stakers/validator-offboarding/removing-a-validator)).
- Restore Originals: Re-import keystores into your previous setup to keep validator duties uninterrupted.
- Restart Validators: Ensure services resume attestations normally.
- Validation: Check monitoring dashboards and logs. 
- Attempt Onboarding: Once the issue is fixed, get back to [the Register Validators guide](register-validators).
- *OR Remove Operators*: If the rollback is permanent, remove operators (How‑to: [Remove Operator guide](/operators/operator-management/removing-an-operator)).