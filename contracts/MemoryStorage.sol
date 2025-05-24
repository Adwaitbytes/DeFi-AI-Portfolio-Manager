
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MemoryStorage is Ownable {
    struct Memory {
        uint256 agentId;
        string memoryType;
        string encryptedContent;
        bytes32 contentHash;
        uint256 timestamp;
        uint8 importance;
        bool isActive;
    }

    mapping(bytes32 => Memory) public memories;
    mapping(uint256 => bytes32[]) public agentMemories;
    mapping(address => bool) public authorizedAgents;

    uint256 public memoryCount;
    uint256 public storagePrice = 0.001 ether; // Cost to store memory

    event MemoryStored(bytes32 indexed memoryId, uint256 indexed agentId, string memoryType);
    event MemoryDeleted(bytes32 indexed memoryId, uint256 indexed agentId);
    event AgentAuthorized(address indexed agentContract, bool authorized);

    modifier onlyAuthorizedAgent() {
        require(authorizedAgents[msg.sender], "Not authorized agent contract");
        _;
    }

    function authorizeAgent(address _agentContract, bool _authorized) public onlyOwner {
        authorizedAgents[_agentContract] = _authorized;
        emit AgentAuthorized(_agentContract, _authorized);
    }

    function storeMemory(
        uint256 _agentId,
        string memory _memoryType,
        string memory _encryptedContent,
        uint8 _importance
    ) public payable returns (bytes32) {
        require(msg.value >= storagePrice, "Insufficient payment");
        require(_importance >= 1 && _importance <= 10, "Invalid importance level");

        bytes32 contentHash = keccak256(abi.encodePacked(_encryptedContent));
        bytes32 memoryId = keccak256(abi.encodePacked(_agentId, block.timestamp, memoryCount));

        memories[memoryId] = Memory({
            agentId: _agentId,
            memoryType: _memoryType,
            encryptedContent: _encryptedContent,
            contentHash: contentHash,
            timestamp: block.timestamp,
            importance: _importance,
            isActive: true
        });

        agentMemories[_agentId].push(memoryId);
        memoryCount++;

        emit MemoryStored(memoryId, _agentId, _memoryType);

        return memoryId;
    }

    function getMemory(bytes32 _memoryId) public view returns (Memory memory) {
        return memories[_memoryId];
    }

    function getAgentMemories(uint256 _agentId) public view returns (bytes32[] memory) {
        return agentMemories[_agentId];
    }

    function deleteMemory(bytes32 _memoryId) public onlyAuthorizedAgent {
        require(memories[_memoryId].isActive, "Memory already deleted");
        
        memories[_memoryId].isActive = false;
        emit MemoryDeleted(_memoryId, memories[_memoryId].agentId);
    }

    function updateStoragePrice(uint256 _newPrice) public onlyOwner {
        storagePrice = _newPrice;
    }

    function withdrawFunds() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function verifyMemoryIntegrity(bytes32 _memoryId) public view returns (bool) {
        Memory memory mem = memories[_memoryId];
        bytes32 computedHash = keccak256(abi.encodePacked(mem.encryptedContent));
        return computedHash == mem.contentHash;
    }
}
