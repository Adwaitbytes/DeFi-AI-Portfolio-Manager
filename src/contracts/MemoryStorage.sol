
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MemoryStorage is Ownable, ReentrancyGuard {
    struct MemoryReference {
        bytes32 agentId;
        string memoryType;
        string contentHash;
        string greenfieldPath;
        uint256 timestamp;
        uint8 importance;
        bool encrypted;
        address owner;
    }

    mapping(bytes32 => MemoryReference) public memories;
    mapping(bytes32 => bytes32[]) public agentMemoryRefs;
    mapping(address => bytes32[]) public userMemoryRefs;
    
    uint256 public totalMemories;
    uint256 public storageReward = 1000000000000000; // 0.001 ETH reward for storing memories
    
    event MemoryStored(bytes32 indexed memoryId, bytes32 indexed agentId, address indexed owner);
    event MemoryUpdated(bytes32 indexed memoryId, uint256 timestamp);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor() {}

    function storeMemory(
        bytes32 _agentId,
        string memory _memoryType,
        string memory _contentHash,
        string memory _greenfieldPath,
        uint8 _importance,
        bool _encrypted
    ) external nonReentrant returns (bytes32) {
        require(_importance >= 1 && _importance <= 10, "Invalid importance level");
        require(bytes(_contentHash).length > 0, "Content hash cannot be empty");
        
        bytes32 memoryId = keccak256(abi.encodePacked(
            _agentId,
            _contentHash,
            block.timestamp,
            msg.sender
        ));
        
        memories[memoryId] = MemoryReference({
            agentId: _agentId,
            memoryType: _memoryType,
            contentHash: _contentHash,
            greenfieldPath: _greenfieldPath,
            timestamp: block.timestamp,
            importance: _importance,
            encrypted: _encrypted,
            owner: msg.sender
        });
        
        agentMemoryRefs[_agentId].push(memoryId);
        userMemoryRefs[msg.sender].push(memoryId);
        totalMemories++;
        
        // Reward users for storing important memories
        if (_importance >= 8 && address(this).balance >= storageReward) {
            payable(msg.sender).transfer(storageReward);
            emit RewardClaimed(msg.sender, storageReward);
        }
        
        emit MemoryStored(memoryId, _agentId, msg.sender);
        return memoryId;
    }

    function getMemory(bytes32 _memoryId) external view returns (MemoryReference memory) {
        return memories[_memoryId];
    }

    function getAgentMemories(bytes32 _agentId) external view returns (bytes32[] memory) {
        return agentMemoryRefs[_agentId];
    }

    function getUserMemories(address _user) external view returns (bytes32[] memory) {
        return userMemoryRefs[_user];
    }

    function updateMemoryImportance(bytes32 _memoryId, uint8 _newImportance) external {
        require(memories[_memoryId].owner == msg.sender, "Not memory owner");
        require(_newImportance >= 1 && _newImportance <= 10, "Invalid importance level");
        
        memories[_memoryId].importance = _newImportance;
        emit MemoryUpdated(_memoryId, block.timestamp);
    }

    function getMemoriesByImportance(bytes32 _agentId, uint8 _minImportance) 
        external view returns (bytes32[] memory) {
        bytes32[] memory allMemories = agentMemoryRefs[_agentId];
        bytes32[] memory importantMemories = new bytes32[](allMemories.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < allMemories.length; i++) {
            if (memories[allMemories[i]].importance >= _minImportance) {
                importantMemories[count] = allMemories[i];
                count++;
            }
        }
        
        // Resize array to actual count
        bytes32[] memory result = new bytes32[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = importantMemories[i];
        }
        
        return result;
    }

    function setStorageReward(uint256 _newReward) external onlyOwner {
        storageReward = _newReward;
    }

    function fundContract() external payable {
        // Allow funding the contract for rewards
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    function getMemoryCount(bytes32 _agentId) external view returns (uint256) {
        return agentMemoryRefs[_agentId].length;
    }
}
