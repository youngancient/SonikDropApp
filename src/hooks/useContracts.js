import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import FACTORY_ABI from "../ABI/factory.json";
import AIRDROP_ABI from "../ABI/airdrop.json";


export const useFactoryContract = (withSigner = false) => {
    const { readOnlyProvider, signer } = useRunners();

    return useMemo(() => {
        if (withSigner) {
            if (!signer) return null;
            return new Contract(
                import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
                FACTORY_ABI,
                signer
            );
        }
        return new Contract(
            import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
            FACTORY_ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};

export const useAidropContract = (withSigner = false, airdropContractAddress) => {
    const { readOnlyProvider, signer } = useRunners();

    return useMemo(() => {
        if (withSigner) {
            if (!signer) return null;
            return new Contract(
                airdropContractAddress,
                AIRDROP_ABI,
                signer
            );
        }
        return new Contract(
            airdropContractAddress,
            AIRDROP_ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};