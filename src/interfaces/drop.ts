export interface IDropComp {
  name: string;
  creator: string; //address
  creationDate: string;
  endDate ?: string;
  totalRewardPool: string;
  totalRewardClaimed: string;
  totalParticipants: number;
  totalClaims: number;
  nftAddress?: string;
  isEditable?: boolean;
  hasUserClaimed ?: boolean;
  baseURI?: string;
  contractAddress: string;
  tokenContractAddress ?: string;
}