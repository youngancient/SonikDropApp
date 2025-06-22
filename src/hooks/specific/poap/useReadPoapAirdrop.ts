import { useCallback, useState } from "react";
import { usePOAPDropContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import { fetchUserByAddress } from "../../../utils/getDataFromBackend";
import { useAppKitAccount } from "@reown/appkit/react";

export const useReadPoapFunctions = (poapContractAddress: string) => {
  const poapDropContract = usePOAPDropContract(true, poapContractAddress);
  // check eligibility function returns (bool,number/null) -> (isEligible, gasToMint)
  const errorDecoder = ErrorDecoder.create();
  const [isChecking, setIsChecking] = useState(false);
  const {address} = useAppKitAccount();

  const checkEligibility = useCallback(async (): Promise<{
    isEligible: boolean;
    gasToMint: bigint | null;
    claimDetails : string[] | null;
  }> => {
    if (!poapDropContract) {
      toast.error("PoapDrop Contract not found");
      return { isEligible: false, gasToMint: null, claimDetails : null };
    }
    if (!address) {
      toast.error("Wallet not connected!");
      return { isEligible: false, gasToMint: null, claimDetails : null  };
    }
    
    // get this merkleproof from the backend server

    try {
      setIsChecking(true);

      const data = await fetchUserByAddress(poapContractAddress,address);
      console.log(data);
      const merkleProof = data.proofs;

      const isEligible = await poapDropContract.checkEligibility(merkleProof);
      let gasVal = null;
      console.log("===========================");
      console.log("is eligible ? -> ", isEligible);

      if (isEligible) {
        // why does this fail?
        const gas = await poapDropContract[
          "claimAirdrop(bytes32[])"
        ].estimateGas(merkleProof);
        gasVal = gas;
      }
      return {
        isEligible,
        gasToMint: gasVal,
        claimDetails : merkleProof 
      };
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      console.error("Eligibility check failed:", decodedError);
      toast.error("Eligibility check failed");
      return { isEligible: false, gasToMint: null , claimDetails : null };
    } finally {
      setIsChecking(false);
    }
  }, [poapDropContract]);

  return {
    checkEligibility,
    isChecking,
  };
};
