
export const TOKEN_AIRDROP_ABI = [
    // Views
    "function airdropEndTime() view returns (uint256)",
    "function hasUserClaimedAirdrop(address user) view returns (bool claimed)",
    "function getContractBalance() view returns (uint256)",
    "function hasAirdropTimeEnded() view returns (bool)",
    "function checkEligibility(uint256 _amount, bytes32[] _merkleProof) view returns (bool)",
    "function name() view returns (string)",
    "function merkleRoot() view returns (bytes32)",
    "function tokenAddress() view returns (address)",
    "function owner() view returns (address)",
  
    // Write
    "function claimAirdrop(uint256 _amount, bytes32[] _merkleProof, bytes32 digest, bytes signature)",
    "function claimAirdrop(uint256 _amount, bytes32[] _merkleProof, uint256 _tokenId, bytes32 digest, bytes signature)",
    "function withdrawLeftOverToken()",
    "function fundAirdrop(uint256 _amount)",
    "function updateNftRequirement(address _newNft)",
    "function turnOffNftRequirement()",
    "function updateClaimTime(uint256 _claimTime)",
  
    // Events
    "event AirdropClaimed(address indexed claimer, uint256 amount)",
    "event AirdropTokenDeposited(address indexed owner, uint256 amount)",
    "event WithdrawalSuccessful(address indexed caller, uint256 amount)",
    "event NftRequirementUpdated(address indexed caller, uint256 timestamp, address nftAddress)",
    "event NftRequirementToggled(address indexed caller, uint256 timestamp)",
    "event ClaimTimeUpdated(address indexed caller, uint256 newEndTime)"
  ];
  