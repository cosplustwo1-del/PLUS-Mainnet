# PLUS Node Client (Rust)

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.9.1--beta-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Language](https://img.shields.io/badge/language-Rust-orange)

Welcome to the official repository for the **PLUS Mainnet Core Node**.

## ⚠️ Notice: Private Beta Phase

Currently, the PLUS Mainnet is operating in a **Closed Private Beta** to ensure maximum network stability, finalize our High-Frequency Trading (HFT) optimizations, and complete the ongoing CertiK smart contract and architecture audits.

To prevent potential zero-day exploits and protect our proprietary **1ms Matching Engine**, the source code in this repository is **temporarily private**.

Only the technical specifications and build instructions are provided here for the community and our institutional staking partners.

**The full source code will be made open-source upon the official Mainnet v1.0 Launch.**

---

## 🚀 About PLUS Node

PLUS Node is the core implementation of the PLUS blockchain, written in highly-optimized Rust. It is designed to handle extremely high throughput for on-chain orderbooks and decentralized perpetual futures trading.

### Key Features
- **PoV (Proof of Velocity)** Consensus Algorithm
- **Sub-10ms** Block Finality
- **100,000+ TPS** measured in private devnet
- Native integration with the Hybrid-DEX Matching Engine
- 100% EVM (Ethereum Virtual Machine) Compatible

## 🔧 Hardware Requirements for Validators

To run a PLUS Validator Node, we recommend the following minimum hardware specifications:

- **CPU**: 16-Core / 32-Thread (e.g., AMD Ryzen 9 or Intel Core i9)
- **RAM**: 64GB DDR5
- **Storage**: 2TB NVMe SSD (Gen4 recommended for I/O speed)
- **Network**: 1 Gbps symmetric fiber connection

## 📦 Build Instructions (For Private Beta Partners)

If you have been granted access to the private repository, you can build the node from source:

```bash
# 1. Clone the private repository (Access required)
git clone https://github.com/plus-network/plus-node-client-private.git
cd plus-node-client-private

# 2. Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup update stable

# 3. Build the node in release mode
cargo build --release

# 4. Start the node
./target/release/plus-node --chain mainnet --validator --name "My-Node-Name"
```

## 🌐 RPC API

The PLUS Node exposes a standard JSON-RPC interface fully compatible with Ethereum's Web3 API. 
Default port: `8545`

Example Query:
```bash
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545
```

## 🔒 Security & Audits

The architecture and proprietary matching engine are currently undergoing rigorous security audits by Tier-1 auditing firms. Audit reports will be linked here once finalized.
