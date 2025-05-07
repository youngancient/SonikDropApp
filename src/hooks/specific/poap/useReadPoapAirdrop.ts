import { useCallback } from "react";
import { usePOAPDropContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";

export const useReadPoapFunctions = (poapContractAddress: string) => {
  const poapDropContract = usePOAPDropContract(true, poapContractAddress);
  // check eligibility function returns (bool,number/null) -> (isEligible, gasToMint)
  const errorDecoder = ErrorDecoder.create();

  const checkEligibility = useCallback(async (): Promise<{
    isEligible: boolean;
    gasToMint: bigint | null;
  }> => {
    if (!poapDropContract) {
      toast.error("PoapDrop Contract not found");
      return { isEligible: false, gasToMint: null };
    }

    // get this merkleproof from the backend server
    const merkleProof = [
      '0x708e7cb9a75ffb24191120fba1c3001faa9078147150c6f2747569edbadee751',
      '0x8cdd6608c14a222369d97956b504f94500a33c673fd156f8f2da7f980260c91c',
      '0x79ec436321e0ee4d3657f6b4c44573e6af12266adc6fdb29f3f7de915ce4975d'
    ];


    try {
      const isEligible = await poapDropContract.checkEligibility(merkleProof);
      let gasVal = null;
      console.log("===========================");
      console.log("is eligible ? -> ", isEligible);

      if (isEligible){
        // why does this fail?
        const gas = await poapDropContract["claimAirdrop(bytes32[])"].estimateGas(
          merkleProof
        );
        gasVal = gas;
        console.log("gas ", Number(gasVal));
      }
      return {
        isEligible,
        gasToMint: gasVal,
      };
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      console.error("Eligibility check failed:", decodedError);
      toast.error("Eligibility check failed");
      return { isEligible: false, gasToMint: null };
    }
  }, [poapDropContract]);

  return {
    checkEligibility,
  };
};
