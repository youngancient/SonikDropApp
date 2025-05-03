
export const POAP_AIRDROP_ABI = [
  "function checkEligibility(bytes32[] _merkleProof) view returns (bool)",
  "function claimAirdrop(bytes32[] _merkleProof, bytes32 digest, bytes signature)",
  "function claimAirdrop(bytes32[] _merkleProof, uint256 _tokenId, bytes32 digest, bytes signature)",
  "function getPoapInfo() view returns (string _baseURI, string name, address creatorAddress, uint256 totalClaimed, uint256 totalClaimable, uint256 pectanageClaimed, uint256 _creationTime)",
  "function getPercentage(uint256 x, uint256 y) pure returns (uint256)",
  "function hasAirdropTimeEnded() view returns (bool)",
  "function updateNftRequirement(address _newNft)",
  "function toggleNftRequirement()",
  "function updateClaimTime(uint256 _claimTime)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
];
