---
sidebar_label: 'Multi-Token Model'
sidebar_position: 3
---

# Multi-Token Model

The previous model enables bApps to assign accounts’ weights for a specific token based on their obligations and associated risks. To extend this framework to scenarios where a bApp seeks security through multiple tokens, these weights can be combined to calculate the account’s final weight, $$W_{k,i}^{final}$$ In this case, the bApp should define a combination function tailored to its specific needs. Common examples include the arithmetic mean, geometric mean, harmonic mean, or any weighted variant.

For example, suppose a bApp uses tokens $d1$ and $d2$, and considers $d1$ to be twice as important as $d2$. Then, letting $W_{k,i,d}$ to be the weight of account $k$ in bApp $i$ for the token type $d$, it could use the following weighted harmonic mean function:

<div align="center">
$$\LARGE W_{k,i}^{final} = \frac{1}{\frac{2/3}{W_{k,i,d_1}} + \frac{1/3}{W_{k,i,d_2}}}$$
</div>

In this context, the bApp should define a specific $\beta_d$ value for each token based on its risk tolerance. Also, an important observation is that, specifically for the non-slashable ETH form of capital, the participation ratio $$(p_{k,i,\text{NS}}\text{ ETH})$$ should be used instead of the weight function $$(W_{k,i,\text{NS}}\text{ ETH})$$, as this type of capital carries no inherent risk.
