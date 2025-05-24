
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BitAgentProtocol is Ownable, ReentrancyGuard {
    struct Platform {
        string name;
        string endpoint;
        bool isActive;
        uint256 lastSync;
        address verifier;
    }

    struct SyncRecord {
        bytes32 agentId;
        string platformId;
        string dataHash;
        uint256 timestamp;
        bool verified;
    }

    mapping(string => Platform) public platforms;
    mapping(bytes32 => mapping(string => SyncRecord)) public syncRecords;
    mapping(bytes32 => string[]) public agentPlatforms;
    
    string[] public platformList;
    uint256 public syncFee = 5000000000000000; // 0.005 ETH
    
    event PlatformRegistered(string indexed platformId, string name);
    event AgentSynced(bytes32 indexed agentId, string platformId, string dataHash);
    event SyncVerified(bytes32 indexed agentId, string platformId, address verifier);

    constructor() {
        // Register default platforms
        registerPlatform("web", "Web Interface", address(this));
        registerPlatform("discord", "Discord Bot", address(this));
        registerPlatform("telegram", "Telegram Bot", address(this));
        registerPlatform("browser", "Browser Extension", address(this));
        registerPlatform("mobile", "Mobile App", address(this));
    }

    function registerPlatform(
        string memory _platformId,
        string memory _name,
        address _verifier
    ) public onlyOwner {
        require(bytes(_platformId).length > 0, "Platform ID cannot be empty");
        require(bytes(_name).length > 0, "Platform name cannot be empty");
        
        platforms[_platformId] = Platform({
            name: _name,
            endpoint: "",
            isActive: true,
            lastSync: block.timestamp,
            verifier: _verifier
        });
        
        platformList.push(_platformId);
        emit PlatformRegistered(_platformId, _name);
    }

    function syncAgent(
        bytes32 _agentId,
        string memory _platformId,
        string memory _dataHash
    ) external payable nonReentrant {
        require(msg.value >= syncFee, "Insufficient sync fee");
        require(platforms[_platformId].isActive, "Platform not active");
        require(bytes(_dataHash).length > 0, "Data hash cannot be empty");
        
        SyncRecord storage record = syncRecords[_agentId][_platformId];
        
        if (bytes(record.dataHash).length == 0) {
            // First sync for this agent-platform combination
            agentPlatforms[_agentId].push(_platformId);
        }
        
        record.agentId = _agentId;
        record.platformId = _platformId;
        record.dataHash = _dataHash;
        record.timestamp = block.timestamp;
        record.verified = false;
        
        platforms[_platformId].lastSync = block.timestamp;
        
        emit AgentSynced(_agentId, _platformId, _dataHash);
    }

    function verifySync(
        bytes32 _agentId,
        string memory _platformId
    ) external {
        require(
            platforms[_platformId].verifier == msg.sender || owner() == msg.sender,
            "Not authorized to verify"
        );
        
        SyncRecord storage record = syncRecords[_agentId][_platformId];
        require(bytes(record.dataHash).length > 0, "Sync record not found");
        
        record.verified = true;
        emit SyncVerified(_agentId, _platformId, msg.sender);
    }

    function getAgentPlatforms(bytes32 _agentId) external view returns (string[] memory) {
        return agentPlatforms[_agentId];
    }

    function getSyncRecord(bytes32 _agentId, string memory _platformId) 
        external view returns (SyncRecord memory) {
        return syncRecords[_agentId][_platformId];
    }

    function getAllPlatforms() external view returns (string[] memory) {
        return platformList;
    }

    function getPlatform(string memory _platformId) external view returns (Platform memory) {
        return platforms[_platformId];
    }

    function updatePlatformEndpoint(string memory _platformId, string memory _endpoint) 
        external onlyOwner {
        require(platforms[_platformId].isActive, "Platform not found");
        platforms[_platformId].endpoint = _endpoint;
    }

    function deactivatePlatform(string memory _platformId) external onlyOwner {
        platforms[_platformId].isActive = false;
    }

    function setSyncFee(uint256 _newFee) external onlyOwner {
        syncFee = _newFee;
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    function getLastSyncTime(bytes32 _agentId, string memory _platformId) 
        external view returns (uint256) {
        return syncRecords[_agentId][_platformId].timestamp;
    }

    function isPlatformSynced(bytes32 _agentId, string memory _platformId) 
        external view returns (bool) {
        return bytes(syncRecords[_agentId][_platformId].dataHash).length > 0;
    }
}
