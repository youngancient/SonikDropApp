import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import TOKEN_FACTORY_ABI from "../ABI/tokenFactory.json";
import TOKEN_AIRDROP_ABI from "../ABI/tokenAirdrop.json";

import { useAppKitNetwork } from "@reown/appkit/react";
import { kaiaTestNetwork } from "../connection";

export const useTokenFactoryContract = (withSigner = false) => {
  const { provider, signer } = useRunners();
  const { chainId } = useAppKitNetwork();
  return useMemo(() => {
    const factoryAddress =
      chainId === kaiaTestNetwork.id
        ? import.meta.env.VITE_KAIA_TOKEN_FACTORY_CONTRACT_ADDRESS
        : import.meta.env.VITE_TOKEN_FACTORY_CONTRACT_ADDRESS;

    if (withSigner) {
      if (!signer) return null;
      return new Contract(factoryAddress, TOKEN_FACTORY_ABI, signer);
    }
    return new Contract(factoryAddress, TOKEN_FACTORY_ABI, provider);
  }, [chainId, provider, signer, withSigner]);
};

export const useTokenAirdropContract = (
  withSigner = false,
  airdropContractAddress: string
) => {
  const { provider, signer } = useRunners();

  return useMemo(() => {
    if (!airdropContractAddress) {
      // console.log("Token address not yet available");
      return null;
    }

    try {
      if (withSigner) {
        if (!signer) return null;
        return new Contract(airdropContractAddress, TOKEN_AIRDROP_ABI, signer);
      } else {
        return new Contract(airdropContractAddress, TOKEN_AIRDROP_ABI, provider);
      }
    } catch (error) {
      console.error("Error creating Airdrop contract:", error);
      return null;
    }
  }, [airdropContractAddress, provider, signer, withSigner]);
};

export const usePOAPFactoryContract = (withSigner = false) => {
  const { provider, signer } = useRunners();
  const { chainId } = useAppKitNetwork();
  return useMemo(() => {
    const factoryAddress =
      chainId === kaiaTestNetwork.id
        ? import.meta.env.VITE_KAIA_POAP_FACTORY_CONTRACT_ADDRESS
        : import.meta.env.VITE_POAP_FACTORY_CONTRACT_ADDRESS;

    if (withSigner) {
      if (!signer) return null;
      return new Contract(factoryAddress, TOKEN_FACTORY_ABI, signer);
    }
    return new Contract(factoryAddress, TOKEN_FACTORY_ABI, provider);
  }, [chainId, provider, signer, withSigner]);
};

export const usePOAPDropContract = (
  withSigner = false,
  poapContractAddress: string
) => {
  const { provider, signer } = useRunners();

  return useMemo(() => {
    if (!poapContractAddress) {
      // console.log("Token address not yet available");
      return null;
    }

    try {
      if (withSigner) {
        if (!signer) return null;
        return new Contract(poapContractAddress, TOKEN_AIRDROP_ABI, signer);
      } else {
        return new Contract(poapContractAddress, TOKEN_AIRDROP_ABI, provider);
      }
    } catch (error) {
      console.error("Error creating Airdrop contract:", error);
      return null;
    }
  }, [poapContractAddress, provider, signer, withSigner]);
};
