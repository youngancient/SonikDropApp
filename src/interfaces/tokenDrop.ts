export interface ITokenDrop {
  address: string;
  name: string;
  creatorAddress: string;
  totalClaimed: number;
  totalClaimable: number;
  totalClaimedtoken: bigint;
  totalClaimabletoken: bigint;
  creationTime: number;
  endTime?: number;
  hasOwnerWithdrawn: boolean;
  hasUserClaimedAirdrop: boolean;
  nftAddress: string;
  tokenContractAddress : string;
}
