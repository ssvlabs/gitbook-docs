---
sidebar_label: 'Formalizing'
sidebar_position: 2
---

# Formalizing

Formalizing
Let's define:

- $Vk{i}$ number of validators assigned to service $i$ by account $k$.

- $V{i}$ total number of validators in service $i$.

- $Ok,{i}$ obligation for account $k$ in service $i$ (i.e. the slashable capital from account $k$ available for service $i$).

- $C{i}$ total obligation (slashable capital) in service $i$.

- $O_k = \sum_{i\in\text{Services}} O_{k,i}$ total obligation for account $k$.

- $assets{k}$ total slashable assets of account $k$.

-  $r_k = \frac{O_k}{\text{assets}_k}$ obligation ratio for account $k$.

Note that we can have $r{k} > 1$, which means that $O_k > \text{assets}_k$ and the account has some slashable capital that is associated with more than one service.

The weight of an account k in a bApp is denoted by $W_i,k$, defined as a value in [0,1] (or [0%,100%]). Usually, it would be defined by some participation ratio, such as $$p_{k,i} = \frac{O_{k,i}}{C_i}$$ (the fraction of slashable capital participation), or $$v_{k,i} = \frac{V_{k,i}}{V_i}$$ (the fraction of validators). For flexibility, the bApp can define the function that best suits its needs.

However, to take the account's risk into consideration, we can adjust the weight by combining the participation ratio $p_{k,i}$, with the account's risk, $r_k$, in the following way:

<div align="center">
$$W_{i,k} = c \times p_{k,i} \times e^{-\beta \times \max(1,r_k)}$$
</div>

where $\beta$ is a hyperparameter that the bApp can adjust according to its security necessities, and $C$ is a normalization constant which can be computed by:

<div align="center">
$c = \left(\sum_{k\in\text{Accounts}} p_{k,i} \times e^{-\beta \times \max(1,r_k)}\right)^{-1}$
</div>


We take $max(1,r_k)$ to avoid the issue in which $r_k \rightarrow 0$ artificially increases the voting power of an account with almost no obligation and risk.

[A numerical example of this model is provided in Appendix A1.](/based-applications/learn/appendix)