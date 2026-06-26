# PLUS Mainnet Architecture

## 1. Introduction
PLUS Mainnet is a high-performance Layer 1 blockchain specifically engineered for High-Frequency Trading (HFT) and decentralized exchanges (DEX). It achieves sub-10ms finality through its proprietary Proof of Velocity (PoV) consensus algorithm.

## 2. Core Components

### 2.1 The 1ms Matching Engine
Unlike traditional AMMs (Automated Market Makers) that rely on liquidity pools and suffer from impermanent loss, PLUS Mainnet features a native, on-chain Central Limit Order Book (CLOB). 
- The matching engine operates in a specialized WASM environment.
- It processes incoming orders in batches every 1 millisecond.
- Only fully matched trades are persisted to the global state tree, drastically reducing state bloat.

### 2.2 Proof of Velocity (PoV) Consensus
PoV is an evolution of DPoS (Delegated Proof of Stake). Validators are selected not just by their stake, but by their *velocity*—the speed and reliability with which they propose and validate blocks.
- **Epochs**: Re-election of the top 21 active validators occurs every 24 hours.
- **Slashing**: Validators failing to propagate blocks within the 10ms window are instantly penalized and removed from the active set.

### 2.3 Hybrid State Architecture
- **Settlement Layer**: 100% EVM compatible. Runs standard Solidity smart contracts (like the PRC20 standard).
- **Execution Layer**: A bespoke Rust-based environment optimized solely for the CLOB matching engine.

## 3. Network Topology
- **Core Nodes**: 21 Active Validators globally distributed (AWS, GCP, Bare Metal).
- **RPC Nodes**: Horizontally scaled read-only nodes providing WebSocket and HTTP RPC access for dApps and the PLUS Explorer.
- **Archive Nodes**: Store the full historical state of the blockchain since Genesis.

## 4. Security Considerations
- Memory-safe implementation in Rust.
- Continuous monitoring of the Mempool to prevent Front-Running and MEV (Miner Extractable Value) attacks. The order of transactions is enforced by cryptographic VDFs (Verifiable Delay Functions).
