export interface IPOAPDrop {
    address: string; 
    baseURI: string;
    name: string;
    creatorAddress: string;
    totalClaimed: number;
    totalClaimable: number;
    creationTime: number;
    endTime ?: number;
    hasUserClaimed : boolean;
    nftAddress: string;
  }