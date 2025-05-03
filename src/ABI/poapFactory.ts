
export const POAP_FACTORY_ABI = [
  "function createSonikPoap(string _name, string _symbol, string _baseURI, bytes32 _merkleRoot, address _nftAddress, uint256 _claimTime, uint256 _noOfClaimers) external",
  "function createSonikPoap(string _name, string _symbol, string _baseURI, bytes32 _merkleRoot, address _nftAddress, uint256 _claimTime, uint256 _noOfClaimers, bool _isCollection) external",
  "function createSonikPoap(string _name, string _symbol, string _baseURI, bytes32 _merkleRoot, address _nftAddress, uint256 _noOfClaimers) external",
  "function createSonikPoap(string _name, string _symbol, string _baseURI, bytes32 _merkleRoot, uint256 _noOfClaimers) external",
  "function getOwnerSonikPoapClones(address _owner) external view returns (address[])",
  "function getAllSonikPoapClones() external view returns (address[])",
];
