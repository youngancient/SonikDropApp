import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import ERC20_ABI from "../ABI/erc20.json";

export const useERC20Contract = (
  withSigner = false,
  tokenContractAddress: string
) => {
  const { readOnlyProvider, signer } = useRunners();

  return useMemo(() => {
    if (!tokenContractAddress) {
      // console.log("Token address not yet available");
      return null;
    }

    try {
      if (withSigner) {
        if (!signer) return null;
        return new Contract(tokenContractAddress, ERC20_ABI, signer);
      } else {
        return new Contract(tokenContractAddress, ERC20_ABI, readOnlyProvider);
      }
    } catch (error) {
      console.error("Error creating ERC20 contract:", error);
      return null;
    }
  }, [tokenContractAddress, withSigner, signer, readOnlyProvider]);
};
