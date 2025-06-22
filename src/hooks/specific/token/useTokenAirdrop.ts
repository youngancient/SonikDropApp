import { ErrorDecoder } from "ethers-decode-error";
import { useTokenAirdropContract } from "../../useContracts";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { ITokenClaimDetails } from "../../../interfaces/tokenUserClaimDetails";

export const useTokenDropFunctions = (tokenDropContractAddress: string) => {
  const tokenDropContract = useTokenAirdropContract(
    true,
    tokenDropContractAddress
  );
  const errorDecoder = ErrorDecoder.create();

  const [isClaiming, setIsClaiming] = useState(false);

  const claimTokenDrop = useCallback(async (tokenUserClaimDetails : ITokenClaimDetails): Promise<{
    success: boolean;
    transactionHash: string | null;
    amountClaimed: string | null;
  }> => {
    if (!tokenDropContract) {
      toast.error("TokenDrop Contract not found");
      return { success: false, transactionHash: null, amountClaimed: null };
    }

    //@note get this merkleproof and amount from the backend server (using the contract address and user address)

    try {
      setIsClaiming(true);
      
      const tx = await tokenDropContract["claimAirdrop(uint256,bytes32[])"](
        tokenUserClaimDetails.amount,
        tokenUserClaimDetails.proof
      );

      const reciept = await tx.wait();
      return {
        success: reciept.status === 1,
        transactionHash: tx.hash,
        amountClaimed: tokenUserClaimDetails.amount,
      };
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      console.error("Claim failed:", decodedError);
      toast.error("Claim failed");
      return { success: false, transactionHash: null, amountClaimed: null };
    } finally {
      setIsClaiming(false);
    }
  }, [tokenDropContract]);

  return {
    claimTokenDrop,
    isClaiming,
  };
};
