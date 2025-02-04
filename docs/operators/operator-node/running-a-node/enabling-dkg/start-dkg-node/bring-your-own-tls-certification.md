---
title: Bring Your Own TLS Certification
sidebar_position: 2
---

# Bring Your Own TLS Certification

By default, the certificates will be generated automatically on the first start of DKG tool. **The following steps are not required for the correct setup**.

However, if you want to generate the certificates yourself, you can follow the steps below.

First of all, if you already started the DKG tool it did generate the certificates for you. If that is the case:

1. Stop the DKG tool with `docker stop ssv-dkg`
2. Check if there is a `ssl`directory created in the `operator-config`
3. If there is — delete it with `sudo rm -r ssl`
4. Proceed with the next steps

Navigate to the `operator-config` directory and use the following commands to create the key and certificate.

```bash
mkdir ssl
cd ssl
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout "tls.key" -out "tls.crt"
```

After that your `ssv-dkg-data` should look like that:

```bash
ssv@localhost:~/ssv-dkg# tree ssv-dkg-data
ssv-dkg-data
├── encrypted_private_key.json
├── operator.yaml
├── password
└── ssl
    ├── tls.crt
    └── tls.key

2 directories, 5 files
```

Lastly, you need to specify the path to these files using the `serverTLSCertPath` and `serverTLSCertPath` configuration parameters in your `operator.yaml` config file.
