# SSV Keys CLI

The `SSV Keys CLI` tool is a command-line interface that splits a validator key to a predefined threshold of shares.

### Installation

{% tabs %}
{% tab title="Executable" %}
1. Navigate to the [SSV GitHub](https://github.com/ssvlabs/ssv-keys/releases/latest) releases section
2. Download the native executable for your operating system:
   * `ssv-keys-lin` - for Ubuntu Linux
   * `ssv-keys-mac` - for macOS
   * `ssv-keys.exe` - for Windows
3. Run file via terminal
{% endtab %}

{% tab title="yarn" %}
Clone the keys repo

<pre class="language-sh"><code class="lang-sh"><strong>git clone https://github.com/ssvlabs/ssv-keys.git --branch=v0.0.18
</strong></code></pre>

Navigate to repo `ssv-keys`

<pre class="language-sh"><code class="lang-sh"><strong>cd ssv-keys
</strong></code></pre>

Run yarn

<pre class="language-sh"><code class="lang-sh"><strong>yarn
</strong></code></pre>
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Please note that If your operating system prevents you from running the executable you can open it from the file manager (Finder in case of macOS), right-click on it, and click the Open menu. Once opened, click the **open** or **allow** button when you are asked to do so. After this go back to the console and try to run it again.
{% endhint %}

### `shares` Arguments

You can use **`shares --help`** to see all arguments. Note that if there are missing arguments that the CLI needs, it will ask you for them.

| Argument           | Type   | Description                                                                                         |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| `--keystore`       | string | The validator keystore file path                                                                    |
| `--password`       | string | The keystore file encryption password                                                               |
| `--operators-ids`  | int    | Operators unique identifier on the ssv.network                                                      |
| `--operators-keys` | string | Operators public keys                                                                               |
| `--version`        | int    | The version of the tool (default = v3), e.g. use “2” for v2 contracts compatible version (optional) |
| `--output-folder`  | string | Target folder path to output the key shares file                                                    |

**Run**

{% tabs %}
{% tab title="Executable" %}
1. Run the Executable file through terminal `./ssv-keys`
2. Follow the instructions
{% endtab %}

{% tab title="yarn" %}
```
yarn cli shares --keystore=<KEYSTORE_FILE_FILE> --password=<FILE_PASSWORD> --operator-ids=<OPERATOR1_ID,OPERATOR2_ID, OPERATOR3_ID, OPERATOR4_ID> --operator-keys=<OPERATOR1_KEY, OPERATOR2_KEY, OPERATOR3_KEY, OPERATOR4_KEY> --output-folder=<TARGET_FILE_PATH> 
```
{% endtab %}
{% endtabs %}

**Output**

A json file will be generated with the shares and the transaction payload required for validator registration ([registerValidator()](../../smart-contracts/ssvnetwork.md#public-registervalidator-publickey-operatorids-shares-amount-cluster)).

**Example:**

{% code title="keyshares-20230305_044622.json" %}
```json
{
 "version": "v3",
 "data": {
   "publicKey": "0xb7dd6a82a54215abf4028269c1b7t600a0d9d40571a8a0fd6828d9bbed47ba543e584d70e5c657ce03c4c4a12c2b1143",
   "operators": [
     {
       "id": 1,
       "publicKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBN2pXcExremd2TXdvRzhNdEVyUjIKRGhUMk11dElmYUd0VmxMeDVWK2g4amwrdnlxT1YvcmxKREVlQy9HMzVpV0M0WEU3RnFKUVc1QmpvQWZ1TXhQegpRQzZ6MEE1b1I3enRuWHU2c0V3TkhJSFh3REFITHlTdVdQM3BGYlo0Qnc5b1FZTUJmbVNsL3hXR0syVnN3aVhkCkNFcUZKRmdNUFk3NlJQY0o2R2dkTWcrWVRRWVVFamlRTjFpdmJKZjRWaUpCRTcrbVNteFZNNTAzVmlyQWZndkIKenBndTNzdHZIdHpRV1Z2eHJ0NTR0Rm9DMHRmWE1RRXNSU0VtTVRoVkhocVorZTJCOC9kTWQ2R1FodnE5ZXR1RQphQkxoSlpFUXlpMklpUU02Ulg2a01vZGdGUmcvemttTFZXQ0VITzEzaFV5Rkoxang1L0M5bEIyU2VENW9jd1h4CmJRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
     },
     {
       "id": 2,
       "publicKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBcjZXc09kMzJZVStPeVowVVZtUlYKQkhEREtLM2U1OTRpUzV2dHRLMVJiMlVYd3YwNGZKcGd4L1NQWmlqUmE0eFdmc3ZsaTMxeHg1c2srMlh6OTJ1VQo5TlE4OGRlL0YxemJtanQwM25wWjhaS253cm1LOXZURE9PZFY4M1RiMUNYTzFhb3J2eVM1MERiZTlSbHE2SGNDCnVuTTRaQnk0SHdvZ2pBZjY2YTFCc085eGx2Rjc0UEgrRTJ0Q1k0ZVYwL1M4VFdHbjh4R0dITW5GT0l1UmRMUTAKemMvQ0pPVjBIK1daSEVEZTcyNU8wR1AwTXV0QmNHZWE1R3A4ckZwWHkvMDFBdmlXajBnMDdqMFR1M0hZN0dlSwovZVNTL1hWOGJURG44M0ZQbE54WHdyVml3czl0cGxzTFMxeUxSN0xxT2NYYVl4NHRLY3FrVTQ0UFhmem9UeC9BCmh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
     },
     {
       "id": 3,
       "publicKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdVIzV0hmU1lhWlE0NjkxenR0aTYKZlBBcExqa29LcysrQS90QWdSVXdHbEhXYm5iNjJPVU4ra0tTUU53VWlNMFRwWGdOVHVSNGpjdWdKa1NTRlRSRAp5WEwvSXRpbzlFZHE3aEhRQ3BEQ0xCVFNYRlNtMjJrNlNRbllGeWs3UVNndnoyQW9mOXJ6YVdBQmVmUkZPdUs5CnFWT00rbzhnRnFwcXlQRnRJRy9CVS9Fb1l2M0FNU1A5UWJCTXRXSkIvcTd2QStZMUFrZEJiYUNuaGFkK1FUWGwKY1VkSzRabHZ1NVdFWkxLdC9OMlU1RGQwaFh4RXBuRlo3L01SNVRnRVl2NFl3aUpHeWNyRTFKWGVSU2MrM21DWQpKekVzYjJPWTBTZE83YjBMcWdqM2hVa0RtcEdVS2NoQlQyaGw0NWJ5ak4valZjUW1rb29lYUgzSCt2R2IvNzhVCkV3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
     },
     {
       "id": 4,
       "publicKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBb3pVaGFzSG9HeE1YS3pUbzgrSHcKWGV0enJtWENYOTdteXBpaHhjL2wxSEllSVVwV2V3NkFNMzlPd1JQZ2VVMFZ3QmQ2NHZhbzZsTTNaQWxTdVZlMgpablN0T01JckJTWGVsYkc0b1BrRG5xZkNNbGJma1RNRlhXVFowdE1IdGJwVkU3N2o0aEpxaUI3ZU13YitwNXUxClovNmVxWjZmRWRnODI5MzN3ZUhhVWNzd2ZJQmhYNlNaUjNlMkJvRUJ2bHljNE5ENEFoNVFaZjMrRWpxSit5dHYKc3hiRm5MNUpLWWhjSlc4YmtCdzNoM2VreUYyY2I2eUE3M3dsTzZhWklaRWJ4QkE0WDl4WjhMSFBaNHJYWG9GbwpoMVFCd1IxOUVhemF5b0h1TmJkWGpBbU9hc1ViT0ttNFJBdk9ya1FwZ1I4S0J4NGMzczk0OFlidTBJRktQb0NICkJ3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
     }
   ],
   "shares": {
     "publicKeys": [
       "0x8c1c39201c9369f8d2b9518acfc42668d9fa4f3fd10d0f0ae86e09ce9df426663bebe35b3e3cbc1a4aa5d5bdbb4ddc9e",
       "0xaec0884aa3106ce9e0c88fb547008c3f69d2034361d703d6b5aeb81d7163c921b25f675f3f5a1cdd2a7d2ede4de4d375",
       "0x9451bd07c51792d307194cadd9fba98ffaa270a056a55a8d4527f0ec43a8f6ec12b599b41d606c7d3789490e67e38d3b",
       "0xa4bc3e8946cf35f5e784b943bae0e360170265b9ebc84b59f8ccdff62a5502459f8cbb2486d6df5199bd9403b6930a02"
     ],
     "encryptedKeys": [
       "euiSJsCKYsajR0wdcCMhldp0wUfZTclQ6O5vvBYcXFWMZzfiCiNh9ADfqHQs0hWGXG6TvcNp6luvf/D/dbgE0LnU3qunWr4Qeir2QF3tUsP2AEo/32KvHF56xzSSLV/nKOycses+6CLGPaU8nQshLXxWu91QxZdirS2K5fLH+p1+QNFIHl7i6U+cFhnfqkzImyOX3IqE+hTmA8QBZAyPVvp4Bt/W3n4H1Czyo7NtK77Kv+ES/7Uz81BfeXqQC0jmyWxV7oJpFURFpKL3xGisRyUxCXbfzzaMkkQBxF+VJ71kr0eeNUEmN8FDJVzObbAcJbO8OftAXs46XasL7Hq2SA==",
       "Nxc7kx6edLM8GwmwYXNHMx9UDbfvt5DHDwdL0mQzr1gBLjD9nJHiL9ne8ZdcnHCZOBXjZzzFATV4ji8oUBHvrXEanz1c/aZLZNyMK0fI4CnKkBvpD5RFsq/ovJTSYP765jWAi715zFjgesZ11lyEslzEEZZCglxd4Zvf3t/97QynGWGqfqVxWlnnqz+PO5cF1DzdMX3/txjwjmlOjj/EY36Zzw+cHY8Iz15aBv/ZI0MfJ787xefnUbHcCzKloaFb0/USFzJVQIB2wPPLtMagZjJ2ISmlIzYvb5NS/CyPzbKZSCP2huMkptu2Bw8Bef5755zW6mfrU2V+2oUO4VrCBA==",
       "Gl2if+JhOIPUHFFN4gZSX2Q0WK5IFtti5dh/h+7NeIyZk6FNr5NO+eXSPN8EFvq8m+FpwEJwosOZAOzgMmBxf/MUy+hS6d7p3ixjlUppy3vvbicoe7laTd6RHN28T4unHdgkUvKVLPeQjrSgynvjV6i9FxLlzwghfBfkGnH1CKFRuJX5trIuIlqB6IiPdUepQ/1Zbq6vuaqjgbwSQe3F64vBBLv3PjC0fj2fLAow5vsBH+lP2T5eahYeALK0oIUvxKwY+9zABe86yjFGtiPyPh0YCJ7w7KukHfaZJKcggdIErNjWBHGvnbsPra0qA4TtC63D+S3kHxYFhp0cwGetqg==",
       "P9AGXZkgNd4p7urg0vEq6DsFXcbJLbAFnYm18WOMlSlWQDXeR7gLZ79h2XCJdleVPOSsyTCsAY9+aQySsN0edaOgKauFY3g/pMf0n/5ZXu1vfSsTodXv8c62zl/Yq7IjRi9NnAJel0sDEr5je186QVjJp/PiOATYaeK6q+X2d1jXBIa3qxvVN7tPS4oSDkw+u2+xlzs6GxeTxnebKq9A/+wgoyFt6fJRl4eg4HhD3yvCv8R/Y9a/NygMMGtcoBWyxH4Hed6+6ec7pZGhtyMaigb2dCSP4+6AuokZGHZv6K6IgrtAJt+Da/LLb2oryLcC5oQ6Cg6Qa1TKWXuYA66FHQ=="
     ]
   }
 },
 "payload": {
   "readable": {
     "publicKey": "0xb7dd6a82a54215abf4028269v1b7e600a0d9d40571a8a0fd6828d9bbed47ba543e584d70e5c657ce03c4c4a12c2b1143",
     "operatorIds": [
       1,
       2,
       3,
       4
     ],
     "shares": "0x01828c1c39201c9369f8d2b9518acfc42668d9fa4f3fd10d0f0ae86e09ce9df426663bebe35b3e3cbc1a4aa5d5bdbb4ddc9eaec0884aa3106ce9e0c88fb547008c3f69d2034361d703d6b5aeb81d7163c921b25f675f3f5a1cdd2a7d2ede4de4d3759451bd07c51792d307194cadd9fba98ffaa270a056a55a8d4527f0ec43a8f6ec12b599b41d606c7d3789490e67e38d3ba4bc3e8946cf35f5e784b943bae0e360170265b9ebc84b59f8ccdff62a5502459f8cbb2486d6df5199bd9403b6930a027ae89226c08a62c6a3474c1d70232195da74c147d94dc950e8ee6fbc161c5c558c6737e20a2361f400dfa8742cd215865c6e93bdc369ea5baf7ff0ff75b804d0b9d4deaba75abe107a2af6405ded52c3f6004a3fdf62af1c5e7ac734922d5fe728ec9cb1eb3ee822c63da53c9d0b212d7c56bbdd50c59762ad2d8ae5f2c7fa9d7e40d1481e5ee2e94f9c1619dfaa4cc89b2397dc8a84fa14e603c401640c8f56fa7806dfd6de7e07d42cf2a3b36d2bbecabfe112ffb533f3505f797a900b48e6c96c55ee8269154445a4a2f7c468ac4725310976dfcf368c924401c45f9527bd64af479e35412637c143255cce6db01c25b3bc39fb405ece3a5dab0bec7ab64837173b931e9e74b33c1b09b0617347331f540db7efb790c70f074bd26433af58012e30fd9c91e22fd9def1975c9c70993815e3673cc50135788e2f285011efad711a9f3d5cfda64b64dc8c2b47c8e029ca901be90f9445b2afe8bc94d260fefae635808bbd79cc58e07ac675d65c84b25cc4119642825c5de19bdfdedffded0ca71961aa7ea5715a59e7ab3f8f3b9705d43cdd317dffb718f08e694e8e3fc4637e99cf0f9c1d8f08cf5e5a06ffd923431f27bf3bc5e7e751b1dc0b32a5a1a15bd3f512173255408076c0f3cbb4c6a06632762129a523362f6f9352fc2c8fcdb2994823f686e324a6dbb6070f0179fe7be79cd6ea67eb53657eda850ee15ac2041a5da27fe2613883d41c514de206525f643458ae4816db62e5d87f87eecd788c9993a14daf934ef9e5d23cdf0416fabc9be169c04270a2c39900ece03260717ff314cbe852e9dee9de2c63954a69cb7bef6e27287bb95a4dde911cddbc4f8ba71dd82452f2952cf7908eb4a0ca7be357a8bd1712e5cf08217c17e41a71f508a151b895f9b6b22e225a81e8888f7547a943fd596eaeafb9aaa381bc1241edc5eb8bc104bbf73e30b47e3d9f2c0a30e6fb011fe94fd93e5e6a161e00b2b4a0852fc4ac18fbdcc005ef3aca3146b623f23e1d18089ef0ecaba41df69924a72081d204acd8d60471af9dbb0fadad2a0384ed0badc3f92de41f1605869d1cc067adaa3fd0065d992035de29eeeae0d2f12ae83b055dc6c92db0059d89b5f1638c9529564035de47b80b67bf61d970897657953ce4acc930ac018f7e690c92b0dd1e75a3a029ab8563783fa4c7f49ffe595eed6f7d2b13a1d5eff1ceb6ce5fd8abb223462f4d9c025e974b0312be637b5f3a4158c9a7f3e23804d869e2baabe5f67758d70486b7ab1bd537bb4f4b8a120e4c3ebb6fb1973b3a1b1793c6779b2aaf40ffec20a3216de9f2519787a0e07843df2bc2bfc47f63d6bf37280c306b5ca015b2c47e0779debee9e73ba591a1b7231a8a06f674248fe3ee80ba891918766fe8ae8882bb4026df836bf2cb6f6a2bc8b702e6843a0a0e906b54ca597b9803ae851d",
     "amount": "Amount of SSV tokens to be deposited to your validator's cluster balance (mandatory only for 1st validator in a cluster)",
     "cluster": "The latest cluster snapshot data, obtained using the cluster-scanner tool. If this is the cluster's 1st validator then use - {0,0,0,0,0,false}"
   }
 },
 "createdAt": "2023-03-05T14:46:22.094Z"
}

```
{% endcode %}
