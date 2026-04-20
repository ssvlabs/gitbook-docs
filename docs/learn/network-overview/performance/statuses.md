---
description: Understanding network participant statuses
sidebar_position: 2
---

# Statuses

### Operator Statuses

The status of an **Operator** can be either **Active**, **Inactive**, or **No Validators**. In short, it indicates recent participation in SSV duties. 

Operator is Inactive if it has not carried out any duties for the previous 10 epochs for the majority of their validators.

### Validator Statuses

The status of a **Validator** is derived from Beacon Chain state of the validator. The possible statuses are:
- **Not Deposited**
- **Pending** Deposit
- **Active**
- **Inactive**
- **Exiting**
- **Exited**
- **Slashed**

## Macro Score

On operator's page the performance is calculated per all managed validators. The graph shows how the performance fluctuates over time.

<div style={{ textAlign: 'center' }}>
  <img src="/img/statuses-2.png" alt="Macro Score" />
</div>

## Micro Score

On validator's page the performance is calculated per duties for this specific validator. 

<div style={{ textAlign: 'center' }}>
  <img src="/img/statuses-3.png" alt="Micro Score" />
</div>

## Duty Breakdown

On validator's page, each duty has a breakdown of operators participation in the duty. 

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    src="/img/statuses-4.png" 
    alt="Duty Breakdown" 
    style={{ width: '50%', maxWidth: '500px' }}
  />
</div>
