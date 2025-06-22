import { useCallback, useState } from "react";
import { useTokenAirdropContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import { fetchUserByAddress } from "../../../utils/getDataFromBackend";
import { useAppKitAccount } from "@reown/appkit/react";
import { ITokenClaimDetails } from "../../../interfaces/tokenUserClaimDetails";

export const useReadTokenFunctions = (tokenDropContractAddress: string) => {
  const tokenDropContract = useTokenAirdropContract(
    true,
    tokenDropContractAddress
  );
  // check eligibility function returns (bool,number/null) -> (isEligible, gasToMint)
  const errorDecoder = ErrorDecoder.create();
  const [isChecking, setIsChecking] = useState(false);
  const { address } = useAppKitAccount();

  const checkTokenDropEligibility = useCallback(async (): Promise<{
    isEligible: boolean;
    gasToMint: bigint | null;
    claimDetails: ITokenClaimDetails | null;
  }> => {
    if (!tokenDropContract) {
      toast.error("TokenDrop Contract not found");
      return { isEligible: false, gasToMint: null, claimDetails: null };
    }
    if (!address) {
      toast.error("Wallet not connected!");
      return { isEligible: false, gasToMint: null, claimDetails: null };
    }
    try {
      setIsChecking(true);
      //@note get merkleproof n amount from the backend server
      const data = await fetchUserByAddress(tokenDropContractAddress, address);
      const amount = data.amount.toString();
      const merkleProof = data.proofs;

      const isEligible = await tokenDropContract.checkEligibility(
        amount,
        merkleProof
      );
      let gasVal = null;
      console.log("===========================");
      console.log("is eligible ? -> ", isEligible);

      if (isEligible) {
        console.log("got here!");
        // why does this fail?
        const gas = await tokenDropContract[
          "claimAirdrop(uint256,bytes32[])"
        ].estimateGas(amount, merkleProof);
        gasVal = gas;
      }
      return {
        isEligible,
        gasToMint: gasVal,
        claimDetails: {
          amount,
          proof: merkleProof,
        },
      };
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      console.error("Eligibility check failed:", decodedError);
      toast.error("Eligibility check failed");
      return { isEligible: false, gasToMint: null, claimDetails: null };
    } finally {
      setIsChecking(false);
    }
  }, [tokenDropContract]);

  return {
    checkTokenDropEligibility,
    isChecking,
  };
};
