import { useCallback, useState } from "react";
import { useTokenAirdropContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import { fetchUserByAddress } from "../../../utils/getDataFromBackend";
import { useAppKitAccount } from "@reown/appkit/react";

export const useReadTokenFunctions = (tokenDropContractAddress: string) => {
  const tokenDropContract = useTokenAirdropContract(
    true,
    tokenDropContractAddress
  );
  // check eligibility function returns (bool,number/null) -> (isEligible, gasToMint)
  const errorDecoder = ErrorDecoder.create();
  const [isChecking, setIsChecking] = useState(false);
  const {address} = useAppKitAccount();

  const checkTokenDropEligibility = useCallback(async (): Promise<{
    isEligible: boolean;
    gasToMint: bigint | null;
  }> => {
    if (!tokenDropContract) {
      toast.error("TokenDrop Contract not found");
      return { isEligible: false, gasToMint: null };
    }
    if (!address) {
      toast.error("Wallet not connected!");
      return { isEligible: false, gasToMint: null };
    }
    // get this merkleproof n amount from the backend server
    const amount = "310000000000000000000";
    const merkleProof = [
      "0xb5dedb24676b0a29ce0be50a25fa07f3dcc44b4eac2ae9516982fdc9a3c1ba34",
      "0xb78af4f822d074f3ad6e6f0021118589f4bfce1e98f23121c01cd5623ccb8d84",
    ];

    try {
      const data = await fetchUserByAddress(tokenDropContractAddress,address);
      
      setIsChecking(true);
      const isEligible = await tokenDropContract.checkEligibility(
        amount,
        merkleProof
      );
      let gasVal = null;
      console.log("===========================");
      console.log("is eligible ? -> ", isEligible);

      if (isEligible) {
        // why does this fail?
        const gas = await tokenDropContract[
          "claimAirdrop(uint256,bytes32[])"
        ].estimateGas(amount, merkleProof);
        gasVal = gas;
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
    } finally {
      setIsChecking(false);
    }
  }, [tokenDropContract]);

  return {
    checkTokenDropEligibility,
    isChecking,
  };
};
