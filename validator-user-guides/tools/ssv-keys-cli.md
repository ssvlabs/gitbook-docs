# SSV-Keys CLI

The `SSV Keys CLI` tool is a command-line interface that splits a validator key to a predefined threshold of shares.

## Video tutorial

A tutorial on using SSV Keys tool was recorded by a member of SSV community. Take a look at it if you think a video would be useful:

{% embed url="https://youtu.be/yZ7utgFGuno" %}

## Installation

{% tabs %}
{% tab title="Executable" %}
1. Navigate to the [SSV GitHub](https://github.com/bloxapp/ssv-keys/releases/tag/v1.0.1) releases section
2. Download the native executable for your operating system:
   * `ssv-keys-lin` - for Ubuntu Linux
   * `ssv-keys-mac` - for macOS
   * `ssv-keys.exe` - for Windows
3. Run file via terminal
{% endtab %}

{% tab title="yarn" %}
```sh
1 git clone https://github.com/bloxapp/ssv-keys.git --branch=v1.0.1
2 cd ssv-keys
3 yarn
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Please note that If your operating system prevents you from running the executable you can open it from the file manager (Finder in case of macOS), right-click on it, and click the Open menu. Once opened, click the **open** or **allow** button when you are asked to do so. After this go back to the console and try to run it again.a
{% endhint %}

### Command arguments

You can use **`shares --help`** to see all arguments. Note that if there are missing arguments that the CLI needs, it will ask you for them.

<table><thead><tr><th width="277">Argument</th><th width="122.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>--keystore (-ks)</code></td><td>string</td><td>The validator keystore file path</td></tr><tr><td><code>--password (-ps)</code></td><td>string</td><td>The keystore file encryption password</td></tr><tr><td><code>--operators-ids (-oids)</code></td><td>int</td><td>Comma-separated list of operator IDs. The amount must be 3f+1 compatible.</td></tr><tr><td><code>--operators-keys (-oks)</code></td><td>string</td><td><p>Comma-separated list of operator keys (same sequence as operator ids). </p><p>The amount must be 3f+1 compatible.</p></td></tr><tr><td><code>--owner-address (-oa)</code></td><td>string</td><td>The cluster owner address (in the SSV contract)</td></tr><tr><td><code>--owner-nonce (-on)</code></td><td>int</td><td>The validator registration nonce of the account (owner address) within the SSV contract (increments after each validator registration), obtained using the ssv-scanner tool.</td></tr><tr><td><code>--output-folder (-of)</code></td><td>string</td><td>Target folder path to output the key shares file</td></tr></tbody></table>

**Run**

{% tabs %}
{% tab title="Executable" %}
1. Run the Executable file through terminal `./ssv-keys`
   1. `./ssv-keys-mac` (Mac)
   2. `ssv-keys.exe` (Windows)
2. Follow the instructions

#### Executable example

```bash
./ssv-keys-mac \
--operator-keys=<OPERATOR1_KEY,OPERATOR2_KEY,OPERATOR3_KEY,OPERATOR4_KEY> \
--operator-ids=<OPERATOR1_ID, OPERATOR2_ID, OPERATOR3_ID, OPERATOR4_ID> \
--owner-address=<CLUSTER_OWNER_ADDRESS> --owner-nonce=<OWNER_NONCE>
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn cli shares --keystore=<KEYSTORE_FILE_FILE> \
--password=<FILE_PASSWORD> \
--operator-ids=<OPERATOR1_ID,OPERATOR2_ID, OPERATOR3_ID, OPERATOR4_ID> \
--operator-keys=<OPERATOR1_KEY, OPERATOR2_KEY, OPERATOR3_KEY, OPERATOR4_KEY> \
--owner-address=<OWNER_ADDRESS> --owner-nonce=<OWNER_REGISTRATION_NONCE) \
--output-folder=<TARGET_FILE_PATH> 
```
{% endtab %}
{% endtabs %}

**Output**

A json file will be generated with the shares and the transaction payload required for validator registration ([registerValidator()](broken-reference)).

**Example:**

{% code title="keyshares-20230305_044622.json" %}
```json
{
  "version": "v4",
  "createdAt": "2023-05-30T14:44:08.498Z",
  "data": {
    "publicKey": "0x8ad8857ca00986ec2619961fb159bea47463f19d77c60e37fb6f9277420c8bdfe9bde37e51cbe90a7c127a4ead9f86cb",
    "operators": [
      {
        "id": 29,
        "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBNDNQbkNpTzN4cEhLa3ZuQkJJbWYKWCtRb09BS0xvSmNOR2lNL2cwcHJFV01lVFhkdEVkUHRYRzlXNXBZYTBkOGszUnE3aHM2QjN5Slh2VXVKRktxRgpIUWROZUFib0xveE9Pd1hlaGo4Sm5iR2Rtb3czeEVaSm5JczlzODhGMnBEV3F1OTNTdUYvaDhKMFEvbjF1cHdVCnU4YTNnSW9HMDFXVzdtc25aVmJ1bEEvQXBNaEZ6SjdFUTA4TnFHYW1DcU1MMzl4SHNmS2t5Z1lYY21ORGdZZHAKT0RvZGNSeTZTTjY0U29Gd3JQT3hvKzBKeGJCL1FlNjNNMDc1Y3B6TzhhMkdKTzVNd1ZZakNaZ0tiTW9DNDZCcwpKbkkvU3c5aWgwVkRNUW1LRFRiZ3hVTE5ZY1JRdE8ybHBsUm5rRlVmaGtFT2lYOXV1SHpJOEhsVnVxOE9IZUI5CldRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
      },
      {
        "id": 30,
        "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBMC9zbTE3cUpFRGNDNG13OHhvNDQKZ1NuaUVXeGQ4L0hHSXllU2hZNWpDajJNajA5em1Dd3F1UU1CalVlalBJb1p2VG0wM1dtVlVPaWRBZ2tzY3V0cAp5UXVRL3JaZ3FzVXhjZDBUamQwN2FhRzVwNGQ2ZjF0ajhNcXkrMjFENjcvcmxKaGZaZVcyNFIzY2dNSTJFWWNKCitud0gzZVFISXgzcGNlWjNlZGVhOU5SRlNYd245MWplaWVmbkgxMEtCc3hxTE1EaVk1MGQxRitpNjVJMUY0aEQKRHpVVHpTMHJLQXNzdU1VR1Z5QlczMVdxK0V6MVBKR0Rka2NXZVBDVy8rd1RlTmovV2xWU2M1SXY0TzJSR2xyeApLRndpRmw1dUdBbVRvRHJRa1ltcVFxeGlldzkrUUovdUN3ZlRQeExvWS9BWlowMjU3eFB1b2F5N1JhOC9qMytaCmF3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
      },
      {
        "id": 31,
        "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBMFBXV0RBbE11L2JYMXFPN0lpREcKdHI0QjRkZkJpb2RiWWJnbXA5Wld5ZFJXYnRpbjR2elUyTFlnaGdoTnAvdkE0Qmg5WDFjbWhacjNQaEFiT3BSSApqZld4RVJiRGJxcVZtUGZSaU5Wa3FhUk9XLzg5R3VZZytQdjBwTTBrbTdJb3dIS1k3WVpHMkRiK3FpV25rTnplClJJTloyUi80RXg2L2xBUGpZMFhHeWJ5NVFhb0tLMWRsY1JFQ3JYU2RrRFBRWFkwam1DWjhYZ3ROOHJhQ1RvSmUKRTgwWUk5NVFPdkFhWG5SYldqekg3SjNYTnFGb3pNbXdya2VBUUh3YUNkaWl3WEFHdlVWWjkyTk9NbmQwOThlZQorVll5b0R3THBrbWIrTFFJa2drOFRTeTJKc2d0THk1N2o4aU9QNitCV0RDN25XVVUrMzUwL3VWOFVXL2FGK3NDCkh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
      },
      {
        "id": 32,
        "operatorKey": "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdFAyMW42Z0IxYmdUMWFkb3RzY2oKdGVRZXNPZEZRZDdKUDh6VVdWY0ZwOHdReS8rZ1lVVXNOVHhZZDFDK1d1WXRncHcxTmdHZDYyYVNFVWtBZ0Y0Uwp4VjdsVkU0WmhzYU5Ic3QzVGorOWltOFFPU3hqUnlHVzZzRzJUMkRaOTc2ekRoMjdUWmJCN1l4c2ovNUpTdVBDCkhQSTIzTlJEYVM0Wkd1TW5IVjVxdHN5a25GRERyQytZK2w5OG9XRGYvbnBUVkYvQ3NkQUw3bEpTR3Q2WlQya2gKMkFEV2VTNmkwcXIwaEZJblJYMld3dmx3aHZpUlhJYVZ6cHJXTkxpZEYyWWFvWkJwbWs3dm9ReVp6dUNHekRqdQpPQzBSakdsZzIya1g0UzMwZUVXRTV0dVZEZXdNcjNvZ0NmR0owQTJGM0w3QjlsRUU4WnlzbVlmVG9KQlM1VU9OCkJ3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
      }
    ]
  },
  "payload": {
    "publicKey": "0x8ad8857ca00986ec2619961fb159bea47463f19d77c60e37fb6f9277420c8bdfe9bde37e51cbe90a7c127a4ead9f86cb",
    "operatorIds": [
      29,
      30,
      31,
      32
    ],
    "sharesData": "0x8e1f1761e7ab0224af98d3a58d417c43deb996edb81d46dfeedfa04ad36c3c9c104424d6bcfc9a12862c9e00c9c623cb17c7be89a1f75c85c25f16749ea3a0a0c79bb3ed30857dfeefbeba80225d6a1d1dc86ca47b1d20f8eaf4f24b866696b782b7eec212d9388bd55868dc50729e5a22ebf7343a7cc4c5191ef9bf381eb7f9b805e92a359f7c71598e0ed12f730390acf9be7b22af4bec63a36604255f456bfc559f04ba8421092a2d45b199d7ecc3820ebf9e94f961ff52ff1bcb7b00e6bda785bfad38c720cee5c057b26d870d918ec46fd65e551e4faa400d8b81c7cd22f4cfbd1fe5cf27b4e6d864dd5375e7da97e4208bcbede92f8002cb1008ed8c046314d9d3189c30d6458d2dc29d097699c8dc17f72401bfd99abb588091d2439d7cd077f067b994cb9d8687de4ac7c99bb450aca1e6f6d23500f84eaeb49864363740fd107db808f91b6a0dce597c6224b7632a0952d57783e95c95990af462faa0eb530e4b20aaaf74e7e50a1e603fb23e1989afacfedd95c8a9bb228f96004b33cf047d6f837dbd833b7eadd7bee34cf3c1956b7fdc06c571b44635c0c098954254e9f3a2602c09df5b626ede2829ffa951e36f46cf33e6c93073d8bee420cb817fb94474e5b670c46cad60e6b50cfb6d0bcadee462dde68c3a77646b3af9ec8d411603b4fe458efbcf875a457f04427a0cc1e3397894cd4e4dc9bdbe0e88076a9d6624d9d18a7c01a893e371347fc4d855a1a4011c9d4923ce721287d2fa370c3fafac24060b1e9ebdeb7b1d2d22ff09c73350211ea57404521b577007f3ddf9050846f07dd1f751c8703794e69c091383deb433fdef61570b85eb8a3ca012d7d96a9f2d91456a8ae37664cedea7d9ec2c4b90449d4cdae135a5dbc74e1ded9f4ed1adf7bf3320ff5289ac3497dbf68d86c3cf98c16b0963796abefc1bd01ba74f4cd5a4b1c4092c83d0a4e1a151c7e40591548964b85833eccbaab8917f3ad55bef9d87074f8aff29c21ea2b9e8251c8fb9eda5fc1c6ec813bd2f0060cdb29eee836b260946805ae4ce0bf7186302054b9f463328a643315bebb306d5eb933d5187ac25bab80a41862221f56c2d4914cbbc5041766d1c64374d00042b333fa4be3c92d0cff27316f8700fa488313af41b3865fbff86c11904b49fc486ff075da45ffd4f7eb1c472ac8cff2815eab3af2274d378efa4d8340e7a74570510f05b6cfabb03b5fbe0ac9dabaf9c4c28f8a36fe4ea6811b24b27fdfdbc5d5a65b50496fe5265f36624477a69bf5349607a7b364509b6eb656983e9f45bfbc0c1621dd91661c863047078c34f6c41947811ae927e3d77317b775882749b3ed44601471c1c6a459b6a625d2b097eed7aec5b2ea8db37e8f3705b5a3c1d9f9bbd87f47af96ba70f68465aea53911e29b87f53a9dcb79c3ba837a42db3e2b0cab002d4418d012bc0956530cce54ea1e5d3a818e3ba19d282c5c2f95bc8a7832273d0f02e7a61ff739f2829b013d2b4973745d20a30bb01a96def88e5ea2e91fffd3040309074e7d2688faba670df28c256790ae17213261d70b841ecf9b7ddffefb10a2f08cc696b4813d98d7128242c8c136ce2ba545506329dc071bcb1393fed40c012049b6137d1189ba70e935ed5a8a35302efa6f0e82a7419591be9bbc61da551d9ca79e88e30472db86722ae799fd2c37eb8ba9023e6d0762701dde11cab97ad199418160aff7ee062c3ceed05ded621395b2e29dd0a54f0c0dc31f097360b11fc6b0c1362616d6450a3881ea34149c5be7ceaafce18cb62a1f1be3b984c9a937d31b7ba8714493239afa017e6145dc160d30ba6fd846b6f19f51d9f79c4fa9f",
    "ownerAddress": "0xb64923DA2c1A9907AdC63617d882D824033a091c",
    "ownerNonce": 1
  }
}
```
{% endcode %}
