
export const TOKEN_FACTORY_ABI = [
    // createSonikDrop with NFT gating
    "function createSonikDrop(address _tokenAddress, bytes32 _merkleRoot, string _name, address _nftAddress, uint256 _noOfClaimers, uint256 _totalOutputTokens) external returns (address)",
  
    // createSonikDrop without NFT gating
    "function createSonikDrop(address _tokenAddress, bytes32 _merkleRoot, string _name, uint256 _noOfClaimers, uint256 _totalOutputTokens) external returns (address)",
  
    // view functions
    "function getOwnerSonikDropClones(address _owner) external view returns (address[] memory)",
    "function getAllSonikDropClones() external view returns (address[] memory)",
  
    // events (optional for listening in frontend)
    "event SonikCloneCreated(address indexed creator, uint256 timestamp, address indexed clone)"
  ];
  