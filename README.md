# Carbon Credit Tracker

## Introduction

This project is a decentralized application (DApp) on the Midnight Network for tracking carbon credits securely and privately using Zero-Knowledge (ZK) proofs. It enables users to record and retire carbon credits.

## Prerequisites

- Node.js v22+
- Docker Desktop
- Midnight Compact Compiler (v0.5.1)

## Project Structure

- `contract/`: The Compact smart contract and its generated outputs.
- `api/`: The TypeScript API for interacting with the deployed contract.
- `carbon-credit-cli/`: A CLI application to interact with the contract (deploy, join, record, retire).
- `carbon-credit-ui/`: A React frontend for the carbon credit tracker.

## Setup and Build

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build --workspaces
   ```

## Deployment

### Standalone (Local) Mode

Deploy and interact with the contract on a local Midnight node using Docker:

```bash
cd carbon-credit-cli
npm run standalone
```

Select `1. Deploy a new carbon credit tracker contract` and follow the prompts.

#### Standalone Deployed Contract Address
`62d4828f79c82b63c9a329a6c706c9ee2297a977226d1ba20ba174ba22fc3497`

### Preprod Remote Mode

Deploy to the public Midnight Preprod testnet:

```bash
cd carbon-credit-cli
npm run preprod-remote
```

Select `1. Deploy a new carbon credit tracker contract` and follow the prompts.

## Usage

### Using the CLI
To interact with an existing contract, start the CLI:
```bash
cd carbon-credit-cli
npm run standalone
```
Select `2. Join an existing carbon credit tracker contract` and provide the deployed address:
```
62d4828f79c82b63c9a329a6c706c9ee2297a977226d1ba20ba174ba22fc3497
```

### Using the UI
Start the frontend development server:
```bash
cd carbon-credit-ui
npm run dev
```
