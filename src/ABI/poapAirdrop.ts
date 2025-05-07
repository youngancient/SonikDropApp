export const POAP_AIRDROP_ABI = [
  "function checkEligibility(bytes32[] _merkleProof) view returns (bool)",
  "function claimAirdrop(bytes32[] _merkleProof)",
  "function claimAirdrop(bytes32[] _merkleProof, uint256 _tokenId)",
  "function getPoapInfo(address user) view returns (string _baseURI, string name, address creatorAddress, uint256 totalClaimed, uint256 totalClaimable, uint256 _creationTime, uint256 _endTime, bool _hasUserClaimedAirdrop, address _nftAddress)",
  "function getPercentage(uint256 x, uint256 y) pure returns (uint256)",
  "function hasAirdropTimeEnded() view returns (bool)",
  "function updateNftRequirement(address _newNft)",
  "function toggleNftRequirement()",
  "function updateClaimTime(uint256 _claimTime)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
];
