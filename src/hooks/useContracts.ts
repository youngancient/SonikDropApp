import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import { useAppKitNetwork } from "@reown/appkit/react";
import {
  getFactoryAddressByChain,
  getFactoryPOAPAddressByChain,
  getMulticallAddressByChain,
} from "../utils/getContractAddressByChain";
import { TOKEN_FACTORY_ABI } from "../ABI/tokenFactory";
import { TOKEN_AIRDROP_ABI } from "../ABI/tokenAirdrop";
import { POAP_FACTORY_ABI } from "../ABI/poapFactory";
import { POAP_AIRDROP_ABI } from "../ABI/poapAirdrop";
import { MULTICALL3_ABI } from "../ABI/multicall3";

export const useTokenFactoryContract = (withSigner = false) => {
  const { provider, signer } = useRunners();
  const { chainId } = useAppKitNetwork();
  return useMemo(() => {
    if (!chainId) {
      return;
    }
    const factoryAddress = getFactoryAddressByChain(chainId);

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
        return new Contract(
          airdropContractAddress,
          TOKEN_AIRDROP_ABI,
          provider
        );
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
    if (!chainId) {
      return;
    }
    const factoryAddress = getFactoryPOAPAddressByChain(chainId);

    if (withSigner) {
      if (!signer) return null;
      return new Contract(factoryAddress, POAP_FACTORY_ABI, signer);
    }
    return new Contract(factoryAddress, POAP_FACTORY_ABI, provider);
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
        return new Contract(poapContractAddress, POAP_AIRDROP_ABI, signer);
      } else {
        return new Contract(poapContractAddress, POAP_AIRDROP_ABI, provider);
      }
    } catch (error) {
      console.error("Error creating Airdrop contract:", error);
      return null;
    }
  }, [poapContractAddress, provider, signer, withSigner]);
};

export const useMulticall3Contract = (withSigner = false) => {
  const { provider, signer } = useRunners();
  const { chainId } = useAppKitNetwork();
  return useMemo(() => {
    if (!chainId) {
      return;
    }
    const factoryAddress = getMulticallAddressByChain(chainId);

    if (withSigner) {
      if (!signer) return null;
      return new Contract(factoryAddress, MULTICALL3_ABI, signer);
    }
    return new Contract(factoryAddress, MULTICALL3_ABI, provider);
  }, [chainId, provider, signer, withSigner]);
};
