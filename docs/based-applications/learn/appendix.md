---
sidebar_label: 'Appendix'
sidebar_position: 8
---

# Appendix

A1 - Risk Expressive Model - Numerical Example

Let's consider a bApp that defined $\beta = 2$ and has 3 participants with 
obligations $o_1 = 10$, $o_2 = 20$, and $o_3 = 30$, and with risks $r_1 = 1\%$, $r_2 = 100\%$, and 
$r_3 = 200\%$. The total obligation in the bApp is $10 + 20 + 30 = 60$, and, thus, 
$p_1 = 1/6$, $p_2 = 2/6$, and $p_3 = 3/6$.

First, we compute the normalization factor $C$:

$$
C = \left(\frac{1}{6} e^{P \cdot \max(1, 0.01)} + \frac{2}{6} e^{P \cdot \max(1,1)} + \frac{3}{6} e^{P \cdot \max(1,2)}\right) - I
$$

$$
\approx 13.02
$$

Then, we can compute the weight for each participant:

$$W_1 = c \times \frac{1}{6} \times e^{-\beta \times \max(1,0.01)} = 13.02 \times \frac{1}{6} \times e^{-2} \approx 29.4\%$$

$$W_2 = c \times \frac{2}{6} \times e^{-\beta \times \max(1,1)} = 13.02 \times \frac{2}{6} \times e^{-2} \approx 58.7\%$$

$$W_3 = c \times \frac{3}{6} \times e^{-\beta \times \max(1,2)} = 13.02 \times \frac{3}{6} \times e^{-4} \approx 11.9\%$$

Note that, even though account 3 has , its higher risk dropped its weight to 11.9%.