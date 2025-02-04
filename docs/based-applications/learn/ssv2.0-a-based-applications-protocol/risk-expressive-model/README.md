---
sidebar_label: 'Risk Expressive Model'
sidebar_position: 1
---

# Risk Expressive Model

Restaking models identify “unique stake” as slashable capital allocated to a single (and specific) bApp. In practice, that means that a user with 100 units of capital can only allocate up to 100 of those units as unique slashable capital. Further examination of this model reveals it to be a [zero-sum-game](https://en.wikipedia.org/wiki/Zero-sum_game) model in which any new bApp requiring operators to allocate unique capital comes at the cost of some other bApp.

The Risk Expressive model described below addresses this capital inefficiency.