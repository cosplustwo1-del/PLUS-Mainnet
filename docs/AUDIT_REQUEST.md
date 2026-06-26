# Formal Audit Request: PLUS Mainnet

## To: CertiK / Hacken Security Teams

We are formally requesting a comprehensive security audit of the PLUS Mainnet Smart Contracts and L1 Architecture before our public v1.0 Launch.

### 1. Scope of Audit

**A. Smart Contracts (EVM Layer)**
- `PRC20.sol`: Token standard for the PLUS ecosystem.
- `PlusStaking.sol`: Staking and reward distribution logic for PoV validators.
- `HybridDEX.sol`: On-chain settlement layer for the DEX (Code available upon NDA).

**B. L1 Node Architecture (Rust)**
- Review of the Proof of Velocity (PoV) consensus mechanism.
- RPC Endpoint security against DDoS and Spam attacks.
- Memory safety in the 1ms WASM matching engine.

### 2. Known Constraints
- The matching engine processes trades off-chain and settles them on-chain in batches. Auditors must review the state-root update logic.
- Validators are penalized (slashed) if they miss their 10ms propagation window. The slashing logic in the consensus layer needs deep review.

### 3. Contact
All communications regarding this audit should be directed to the CTO Office: `cto@plusmain.net`.
