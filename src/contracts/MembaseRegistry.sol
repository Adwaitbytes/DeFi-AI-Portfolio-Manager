
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MembaseRegistry is Ownable, ReentrancyGuard {
    struct Agent {
        string name;
        string personality;
        string avatar;
        address owner;
        uint256 createdAt;
        uint256 lastActive;
        bool isActive;
        string greenfieldBucket;
    }

    struct Memory {
        string memoryType;
        string contentHash;
        string greenfieldPath;
        uint256 timestamp;
        uint8 importance;
        bool encrypted;
    }

    mapping(bytes32 => Agent) public agents;
    mapping(bytes32 => Memory[]) public agentMemories;
    mapping(address => bytes32[]) public userAgents;
    
    uint256 public totalAgents;
    uint256 public registrationFee = 0.01 ether;
    
    event AgentRegistered(bytes32 indexed agentId, address indexed owner, string name);
    event MemoryAdded(bytes32 indexed agentId, uint256 memoryIndex, string memoryType);
    event AgentUpdated(bytes32 indexed agentId, uint256 lastActive);

    constructor() {}

    function registerAgent(
        string memory _name,
        string memory _personality,
        string memory _avatar,
        string memory _greenfieldBucket
    ) external payable nonReentrant {
        require(msg.value >= registrationFee, "Insufficient registration fee");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        bytes32 agentId = keccak256(abi.encodePacked(msg.sender, _name, block.timestamp));
        
        agents[agentId] = Agent({
            name: _name,
            personality: _personality,
            avatar: _avatar,
            owner: msg.sender,
            createdAt: block.timestamp,
            lastActive: block.timestamp,
            isActive: true,
            greenfieldBucket: _greenfieldBucket
        });
        
        userAgents[msg.sender].push(agentId);
        totalAgents++;
        
        emit AgentRegistered(agentId, msg.sender, _name);
    }

    function addMemory(
        bytes32 _agentId,
        string memory _memoryType,
        string memory _contentHash,
        string memory _greenfieldPath,
        uint8 _importance,
        bool _encrypted
    ) external {
        require(agents[_agentId].owner == msg.sender, "Not agent owner");
        require(agents[_agentId].isActive, "Agent not active");
        require(_importance >= 1 && _importance <= 10, "Invalid importance level");
        
        Memory memory newMemory = Memory({
            memoryType: _memoryType,
            contentHash: _contentHash,
            greenfieldPath: _greenfieldPath,
            timestamp: block.timestamp,
            importance: _importance,
            encrypted: _encrypted
        });
        
        agentMemories[_agentId].push(newMemory);
        agents[_agentId].lastActive = block.timestamp;
        
        emit MemoryAdded(_agentId, agentMemories[_agentId].length - 1, _memoryType);
        emit AgentUpdated(_agentId, block.timestamp);
    }

    function getAgent(bytes32 _agentId) external view returns (Agent memory) {
        return agents[_agentId];
    }

    function getAgentMemories(bytes32 _agentId) external view returns (Memory[] memory) {
        return agentMemories[_agentId];
    }

    function getUserAgents(address _user) external view returns (bytes32[] memory) {
        return userAgents[_user];
    }

    function updateAgentActivity(bytes32 _agentId) external {
        require(agents[_agentId].owner == msg.sender, "Not agent owner");
        agents[_agentId].lastActive = block.timestamp;
        emit AgentUpdated(_agentId, block.timestamp);
    }

    function deactivateAgent(bytes32 _agentId) external {
        require(agents[_agentId].owner == msg.sender, "Not agent owner");
        agents[_agentId].isActive = false;
    }

    function setRegistrationFee(uint256 _newFee) external onlyOwner {
        registrationFee = _newFee;
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    function getMemoryCount(bytes32 _agentId) external view returns (uint256) {
        return agentMemories[_agentId].length;
    }
}
