// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PRC20.sol";

/**
 * @title PlusStaking
 * @dev Staking contract for the PLUS Mainnet Validator Nodes.
 * Users can delegate their PLUS tokens to active validators to earn PoV rewards.
 */
contract PlusStaking {
    PRC20 public plusToken;
    
    struct Validator {
        uint256 totalStaked;
        uint256 blocksValidated;
        bool isActive;
    }

    struct Delegator {
        uint256 amount;
        uint256 rewardDebt;
    }

    mapping(address => Validator) public validators;
    mapping(address => mapping(address => Delegator)) public delegators;

    uint256 public constant MIN_VALIDATOR_STAKE = 500_000 * 10**18;

    event Staked(address indexed user, address indexed validator, uint256 amount);
    event Unstaked(address indexed user, address indexed validator, uint256 amount);
    event ValidatorRegistered(address indexed validator);

    constructor(address _plusTokenAddress) {
        plusToken = PRC20(_plusTokenAddress);
    }

    function registerValidator() external {
        require(!validators[msg.sender].isActive, "Already active");
        require(plusToken.balanceOf(msg.sender) >= MIN_VALIDATOR_STAKE, "Insufficient balance for validator");
        
        validators[msg.sender] = Validator({
            totalStaked: 0,
            blocksValidated: 0,
            isActive: true
        });

        emit ValidatorRegistered(msg.sender);
    }

    function stake(address validatorAddr, uint256 amount) external {
        require(validators[validatorAddr].isActive, "Validator not active");
        require(amount > 0, "Cannot stake 0");

        plusToken.transferFrom(msg.sender, address(this), amount);

        delegators[validatorAddr][msg.sender].amount += amount;
        validators[validatorAddr].totalStaked += amount;

        emit Staked(msg.sender, validatorAddr, amount);
    }

    function unstake(address validatorAddr, uint256 amount) external {
        require(delegators[validatorAddr][msg.sender].amount >= amount, "Insufficient staked amount");

        delegators[validatorAddr][msg.sender].amount -= amount;
        validators[validatorAddr].totalStaked -= amount;

        plusToken.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, validatorAddr, amount);
    }
}
