---
title: Bring Your Own TLS Certificate
sidebar_position: 2
---

# Bring Your Own TLS Certificate

:::info Note
By default, certificates are generated automatically the first time the DKG tool starts. **The steps below are optional.**
:::

If you want to generate the certificates yourself, follow the steps below.

If you already started the DKG tool, it already generated certificates for you. In that case:

1. Stop the DKG tool with `docker stop ssv-dkg`
2. Check if there is a `ssl` directory created in the `operator-config`
3. If there is — delete it with `sudo rm -r ssl`
4. Proceed with the next steps

Navigate to the `operator-config` directory and use the following commands to create the key and certificate.

```bash
mkdir ssl
cd ssl
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout "tls.key" -out "tls.crt"
```

After that, `ssv-dkg-data` should look like this:

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

Finally, set the file paths in `operator.yaml` using `serverTLSCertPath` and `serverTLSKeyPath`.
