# Payments

{% hint style="warning" %}
This section and the documents under it have not been updated to V3 testnet
{% endhint %}

Payments are facilitated by maintaining an account balance in the ssv network smart contract, which keeps a balance sheet for all network participants.

Accounts created when registering validators and operators to the network are accessible and owned by the wallet address that transmitted the transaction. This means that the address is the account’s owner, enabling it to manage its balance and its chosen validators/operators.

All account balances are pooled in the SSV network smart contract to enable the calculation of payment flows between network participants. The flows are maintained by keeping track of each user’s accumulated deposits, withdrawals, revenue, and expenses which forms their account balance.

Balance components are calculated by a set of formulas (outlined below) every time an event occurs that influences that user’s account. Each time such an event occurs the components of the balance are calculated retroactively up to the current state and a new snapshot is taken to be used for future calculations.

![Contract payment flow](<../../../.gitbook/assets/pasted\_image\_0111 (1).jpg>)

The account balance consists of 4 variables and is calculated by:

$$
balance = d +  r - e - w
$$

* Legend
  * d - deposits&#x20;
  * r - revenue&#x20;
  * e - expenses&#x20;
  * w - withdrawals

### Deposits & Withdrawals

The net transfers of deposits and withdrawals made to the user account balance.

### **Revenue**

Earnings received by operators as payment from stakers for operating their validators.

* Revenue is calculated by the sum of earnings from all the operators of the account:

$$
revenue = \sum(e_{operators})
$$

* Earnings for each operator are calculated by:

$$
e_{operator}= e_p + (b-b_p) * f * v
$$

* Legend
  * $$e_p$$​ - previously accumulated earnings
  * $$b$$  - current block
  * $$b_p$$​ - previous block
  * $$f$$ - fee​ ($SSV per block)
  * $$v$$​ - # of validators that the operator manages

Earnings are calculated for each operator by keeping track of their accumulated earnings ($$e_p$$) every time an operator fee changes ($$f$$) or when gaining or losing a validator ($$v$$).

### Expenses

Expenses come in the form of payments made to operators for managing their validators and network fees paid to the network.

* Expenses are calculated by the sum of payments to operators in addition to accrued network fees:

$$
expenses =  \sum(p_{operators}) + p_{network}
$$

**Indexes: Operator and Network Fees**

Indexes help keep track of payments in relation to ongoing fee updates from the network and its operators.

Indexes are stored separately for both operator and network fee changes and represent a curve of accumulated fee changes over time.

![Operator Index from block 100 (registration) to block 200, presenting 4 fee updates](https://lh6.googleusercontent.com/PLTYTJiTeIM791Gw0\_xeTMAVzu8aaTxV05FlFYaEMAVnkKCgrEyrjTVuuxL\_GynmyDINcTeQJUlP01M\_IPunBSLufYGgO1OD2M\_dQ3VeNOB2VNuX3RJR9pu5ug5EcYRW-HPh7HALlxlHuehPSQ)

* Indexes are calculated by:

$$
index =index_p + (b - b_p) * f
$$

* Legend
  * $$index_p$$​ - previous index
  * $$b$$​ - current block
  * $$b_p$$​ - previous block
  * $$f$$ - fee ($SSV per block)
    * Operator index - operator fee
    * Network fee index - protocol fee

Indexes are calculated by keeping track of the accumulation of fees over time ($$index_p$$) every time the network or an operator changes their fee ($$f$$).

**Indexes in Payments**

Each account on the network stores an operator and network index from the time an operator (and the network) starts managing their validators. Referencing the current $$index$$ of the operator in relation to the previous index ($$index_p$$) - during the payment calculations - enables the contract to determine account expenses in isolation. This is done to exclude it from the other network participants' activity (e.g. frequent fee changes), allowing the calculation to be accomplished in an isolated manner which optimizes contract execution performance and cost.

#### Payments

* Payment per each operator is calculated by:

$$
p_{operator}=p_p + (i-i_p) * v
$$

* Legend
  * $$p_p$$ - previously accumulated payments
  * $$i$$ - current operator index
  * $$i_p$$ - previous operator index
  * ​$$v$$ - # of validators operators for the user (specific operator)

Payments are calculated for each operator by keeping track of it’s accumulated payments ($$p_p$$) every time an account changes its validators count ($$v$$) with the operator.

* Network payment per each account is calculated by:

$$
p_{network} =p_p + (i - i_p) * v
$$

* Legend
  * $$p_p$$ - previous accumulated network fees
  * $$i$$ - current network fee index
  * $$i_p$$ - previous network fee index
  * $$v$$ - # of validators operator for the user (across all operators)

Network fees are calculated for each account by keeping track of it’s accumulated network fees($$p_p$$) every time an account onboards a new validator to the network, or leaves it ($$v$$).

#### **Indexes Scenario Example**

![](https://lh6.googleusercontent.com/ScxeO0Cq4zyXCr3XCf3Lxb0qa5JlTj8mQrNKQP8l8D0MmbW5jaq0UuSjhmT01-UZqNd4h\_qQHwvOB1PVK4P22rRlAFh6sVRFCBSRwLOuOoQxMOwY07D9D1Nmc47uGc6h6AumlQXvdL5g2jUfWQ)

* Bob has registered a validator to the network to be managed by Alice the operator at block 120:
  * $$p _{alice} = 0$$ , $$p_p$$ --> 0 , $$i_p$$ --> 200 , $$v$$ --> 1
* At block 140, Bob has registered an additional validator to be managed by Alice:
  * $$p _{alice} = 0 + (800 - 200) * 1 = 600$$ , $$p_p$$ --> 600 , $$i_p$$ --> 800 , $$v$$ --> 2
* At block 180, Bob chose to replace Alice with Eve to manage his validators - the total payments Bob has made to Alice thus far is 3000:
  * $$p_{alice} = 600 + (2000 - 800) * 2 = 3000$$ , $$p_p$$ --> 3000 , $$i_p$$ --> 2000 , $$v$$ --> 0

#### Network Fees

Fees accrued to the protocol treasury from validators for using the network.

* Network fees are calculated by:

$$
Network \; Fees= NF_p + (b-b_p) * f * v
$$

* Legend
  * $$NF_p$$ - previous accumulated fees
  * $$b$$ - current block
  * $$b_b$$ - previous block
  * $$f$$ - fee ($SSV per block)
  * $$v$$ - # of validators in the network

Fees are maintained for the whole network by keeping track of it’s accumulated fees ($$NF_p$$) every time the network fee changes ($$f$$) or when the network gains or loses a validator ($$v$$).
