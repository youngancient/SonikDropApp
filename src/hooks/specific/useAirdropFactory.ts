import { useCallback, useState } from "react";
import { useTokenFactoryContract } from "../useContracts";

export const useTokenFactoryFunctions = () => {
  const tokenFactoryContract = useTokenFactoryContract(true);
    const [creationStatus, setCreationStatus] = useState<"default" | "success" | "failed">("default");
    const [isCreating, setIsCreating] = useState(false);
  const createTokenDrop = useCallback(
    (
      tokenAddress: string,
      merkleRoot: string,
      name: string,
      nftAddress: string,
      noOfClaimers: number,
      totalOutputTokens: number
    ) => {
      console.log({
        tokenAddress,
        merkleRoot,
        name,
        nftAddress,
        noOfClaimers,
        totalOutputTokens,
      });
    },
    []
  );

  return { createTokenDrop, creationStatus, isCreating };
};
