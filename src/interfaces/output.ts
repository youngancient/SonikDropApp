export interface IPoapAirdropClaim {
  address: string;
  proofs: string[];
}

export interface ITokenAirdropClaim extends IPoapAirdropClaim {
  amount: string;
}
