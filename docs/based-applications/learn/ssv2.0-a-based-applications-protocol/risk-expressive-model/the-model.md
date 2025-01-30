---
sidebar_label: 'The Model'
sidebar_position: 1
---

# The Model

In the based application model, operators participate in bApps using a Risk Expressive Model (REM), where opting into a bApp implies a commitment that comes with certain obligations. These obligations introduce a risk of future capital slashing if specific conditions or performance standards are not met. This model makes operators financially accountable for the reliability and efficiency of the bApps they provide to the network.

Each bApp an operator opts into increases the level of responsibility and, consequently, the risk it poses to the bApps in which it participates. This means that as operators take on more bApps, they face greater risk of financial penalties, making it essential for them to balance their participation in bApps with the risk they are willing to assume.

A scoring mechanism is integral to this process as it configures the weight of operators based on their level of risk. The weight represents an operator's influence within the network, and the scoring mechanism dynamically adjusts this weight to reflect the amount of risk each operator has taken on. By doing so, the system encourages responsible behavior among operators, ensuring that those who take on higher obligations (and therefore more risk) have their influence properly calibrated. This not only maintains fairness but also helps protect the overall stability of the network.

Different bApps within the network can tailor their risk configurations to match their needs by utilizing a configurable β parameter. Smaller bApps, which may face challenges in attracting sufficient capital, might adopt a more lenient risk approach, represented by a lower β value in the risk graph. This lower β value implies a greater appetite for risk, making these bApps more accessible to operators by enabling them to opt-in to more bApps and maintain more of their weight in each one. On the other hand, larger, more established bApps that have significant capital may choose to set a higher β value. A higher β indicates a preference for attracting operators who can commit to stringent performance requirements and who are comfortable assuming more obligations, thus signaling a lower tolerance for risk. Additionally, a bApp can assign distinct β values to each token it utilizes, allowing it to fine-tune its risk tolerance based on the role and significance of each token.

<div align="center">
![](/img/the-model-1.avif)
*Figure 5: illustration of an account utilizing more than 100% of its capital.*
</div>

This Risk Expressive Model allows the network to balance capital allocation and security needs effectively across various bApp types. By enabling bApps to adjust their risk levels using β values, the model ensures that both small and large bApps can attract suitable operators while maintaining a consistent level of reliability and accountability across the ecosystem. The Risk Expressive Model, in conjunction with the scoring mechanism, provides a structured yet adaptive approach that motivates operators to engage meaningfully while being mindful of their obligations and the associated risks. This ultimately fosters a robust and resilient environment where operators are encouraged to contribute responsibly, ensuring the long-term stability and efficiency of the network.

<div align="center">
![](/img/the-model-2.avif)
*Figure 6: operator weight as a function of its risk,r(k), and β.*
</div>
