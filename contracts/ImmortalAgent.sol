
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ImmortalAgent is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Agent {
        string name;
        string personality;
        string avatar;
        uint256 createdAt;
        uint256 memoryCount;
        bool isActive;
        address creator;
    }

    mapping(uint256 => Agent) public agents;
    mapping(address => uint256[]) public userAgents;
    
    event AgentCreated(uint256 indexed tokenId, address indexed creator, string name);
    event AgentUpdated(uint256 indexed tokenId, string name, string personality);
    event AgentActivated(uint256 indexed tokenId, bool isActive);

    constructor() ERC721("ImmortalAgent", "IAGENT") {}

    function createAgent(
        string memory _name,
        string memory _personality,
        string memory _avatar
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);

        agents[newTokenId] = Agent({
            name: _name,
            personality: _personality,
            avatar: _avatar,
            createdAt: block.timestamp,
            memoryCount: 0,
            isActive: true,
            creator: msg.sender
        });

        userAgents[msg.sender].push(newTokenId);

        emit AgentCreated(newTokenId, msg.sender, _name);

        return newTokenId;
    }

    function updateAgent(
        uint256 _tokenId,
        string memory _name,
        string memory _personality
    ) public {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        
        agents[_tokenId].name = _name;
        agents[_tokenId].personality = _personality;

        emit AgentUpdated(_tokenId, _name, _personality);
    }

    function toggleAgentActive(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        
        agents[_tokenId].isActive = !agents[_tokenId].isActive;

        emit AgentActivated(_tokenId, agents[_tokenId].isActive);
    }

    function incrementMemoryCount(uint256 _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        agents[_tokenId].memoryCount++;
    }

    function getAgent(uint256 _tokenId) public view returns (Agent memory) {
        return agents[_tokenId];
    }

    function getUserAgents(address _user) public view returns (uint256[] memory) {
        return userAgents[_user];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
