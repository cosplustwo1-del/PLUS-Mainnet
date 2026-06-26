// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PRC20.sol";

/**
 * @title SampleAltcoin
 * @dev Example of how easily any developer can launch their own Altcoin 
 * (Meme coin, Game token, Utility token) on the PLUS Mainnet using the PRC-20 standard.
 */
contract SampleAltcoin is PRC20 {
    
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     * 
     * To launch a new coin, a developer only needs to change 3 things:
     * 1. "Mega Metaverse Token" (Name)
     * 2. "MMT" (Symbol)
     * 3. 1_000_000_000 (Initial Supply - e.g., 1 billion tokens)
     */
    constructor() 
        PRC20("Mega Metaverse Token", "MMT", 1_000_000_000) 
    {
        // The creator of the contract immediately receives the entire initial supply.
        // From here, they can list it on the PLUS Hybrid-DEX, distribute it to users, etc.
    }

    /**
     * @dev Custom logic can be added here.
     * For example, a burn function allowing token holders to destroy their tokens.
     */
    function burn(uint256 amount) external {
        // In a real scenario, you would implement internal burn logic.
        // require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        // _burn(msg.sender, amount);
    }
}
