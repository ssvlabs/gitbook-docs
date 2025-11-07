# SSV Documentation Repository

## 📖 Overview

SSV (Secret Shared Validators) is a decentralized infrastructure that enables secure, fault-tolerant, and non-custodial staking on Ethereum. This documentation aims to provide:

- **Getting Started Guides** for developers, stakers, and operators.
- **Technical Documentation** covering the SSV protocol, SDK, and Based Applications.
- **Deployment Instructions** for setting up an SSV validator or operator.
- **FAQ and Troubleshooting** to assist users in resolving common issues.

## 🚀 Running the Documentation Locally

The documentation is built using [Docusaurus](https://docusaurus.io/), a modern static site generator optimized for technical documentation.

### Prerequisites
Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Installation and Running Locally

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/ssvlabs/gitbook-docs.git
cd ssv-docs

# Install dependencies
yarn install  # or npm install
```

To start a local development server with hot-reloading:

```bash
yarn start  # or npm run start
```

This will launch the documentation site in your default browser, typically available at `http://localhost:3000/`.

To build the static site for deployment:

```bash
yarn build  # or npm run build
```

## 🛠 Contributing

We welcome contributions to improve the documentation! Follow these steps to contribute:

### 1. Fork & Clone
Fork this repository and clone it to your local machine:

```bash
git clone https://github.com/your-username/ssv-docs.git
cd ssv-docs
```

### 2. Create a Branch
Create a new branch for your changes:

```bash
git checkout -b feature/update-docs
```

### 3. Make Changes
- Edit the relevant Markdown (`.md`) files inside the `docs/` directory.
- If modifying the sidebar or navigation, update `sidebars.js`.
- Ensure proper formatting and clarity.

### 4. Commit & Push
Commit your changes and push to your fork:

```bash
git add .
git commit -m "Update documentation on X feature"
git push origin feature/update-docs
```

### 5. Open a Pull Request
Go to the original repository and submit a pull request with a clear description of your changes.

## 📢 Community & Support
For any questions, feel free to reach out:

- Join the [SSV Network Discord](https://discord.gg/5vT22pRBrf)
- Open an issue on this repo

Thank you for contributing to SSV Docs! 🚀
