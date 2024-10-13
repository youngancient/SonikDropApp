import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import ABI from "../ABI/proposal.json";


const useContract = (withSigner = false) => {
    const { readOnlyProvider, signer } = useRunners();

    return useMemo(() => {
        if (withSigner) {
            if (!signer) return null;
            return new Contract(
                import.meta.env.VITE_CONTRACT_ADDRESS,
                ABI,
                signer
            );
        }
        return new Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,
            ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};

export default useContract;
