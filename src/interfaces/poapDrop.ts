export interface IPOAPDrop {
    address: string;
    baseURI: string;
    name: string;
    creatorAddress: string;
    totalClaimed: number;
    totalClaimable: number;
    percentageClaimed: number;
    creationTime: number;
    hasUserClaimed : boolean;
  }