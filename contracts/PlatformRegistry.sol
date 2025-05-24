
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PlatformRegistry is Ownable {
    struct Platform {
        string name;
        string platformType;
        string endpoint;
        bool isActive;
        uint256 registeredAt;
        address operator;
    }

    struct AgentPlatformConnection {
        uint256 agentId;
        bytes32 platformId;
        string connectionData;
        bool isConnected;
        uint256 lastSync;
    }

    mapping(bytes32 => Platform) public platforms;
    mapping(bytes32 => AgentPlatformConnection) public connections;
    mapping(uint256 => bytes32[]) public agentConnections;

    bytes32[] public platformList;
    uint256 public platformCount;

    event PlatformRegistered(bytes32 indexed platformId, string name, string platformType);
    event AgentConnected(uint256 indexed agentId, bytes32 indexed platformId);
    event AgentDisconnected(uint256 indexed agentId, bytes32 indexed platformId);
    event ConnectionSynced(uint256 indexed agentId, bytes32 indexed platformId, uint256 timestamp);

    function registerPlatform(
        string memory _name,
        string memory _platformType,
        string memory _endpoint
    ) public returns (bytes32) {
        bytes32 platformId = keccak256(abi.encodePacked(_name, _platformType, block.timestamp));

        platforms[platformId] = Platform({
            name: _name,
            platformType: _platformType,
            endpoint: _endpoint,
            isActive: true,
            registeredAt: block.timestamp,
            operator: msg.sender
        });

        platformList.push(platformId);
        platformCount++;

        emit PlatformRegistered(platformId, _name, _platformType);

        return platformId;
    }

    function connectAgent(
        uint256 _agentId,
        bytes32 _platformId,
        string memory _connectionData
    ) public {
        require(platforms[_platformId].isActive, "Platform not active");
        
        bytes32 connectionId = keccak256(abi.encodePacked(_agentId, _platformId));

        connections[connectionId] = AgentPlatformConnection({
            agentId: _agentId,
            platformId: _platformId,
            connectionData: _connectionData,
            isConnected: true,
            lastSync: block.timestamp
        });

        agentConnections[_agentId].push(_platformId);

        emit AgentConnected(_agentId, _platformId);
    }

    function disconnectAgent(uint256 _agentId, bytes32 _platformId) public {
        bytes32 connectionId = keccak256(abi.encodePacked(_agentId, _platformId));
        
        require(connections[connectionId].isConnected, "Agent not connected");
        
        connections[connectionId].isConnected = false;

        emit AgentDisconnected(_agentId, _platformId);
    }

    function syncConnection(uint256 _agentId, bytes32 _platformId) public {
        bytes32 connectionId = keccak256(abi.encodePacked(_agentId, _platformId));
        
        require(connections[connectionId].isConnected, "Agent not connected");
        
        connections[connectionId].lastSync = block.timestamp;

        emit ConnectionSynced(_agentId, _platformId, block.timestamp);
    }

    function getPlatform(bytes32 _platformId) public view returns (Platform memory) {
        return platforms[_platformId];
    }

    function getAgentConnections(uint256 _agentId) public view returns (bytes32[] memory) {
        return agentConnections[_agentId];
    }

    function getAllPlatforms() public view returns (bytes32[] memory) {
        return platformList;
    }

    function updatePlatformStatus(bytes32 _platformId, bool _isActive) public {
        require(platforms[_platformId].operator == msg.sender || msg.sender == owner(), "Not authorized");
        platforms[_platformId].isActive = _isActive;
    }
}
