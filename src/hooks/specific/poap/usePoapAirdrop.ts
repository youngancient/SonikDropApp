import { ErrorDecoder } from "ethers-decode-error";
import { usePOAPDropContract } from "../../useContracts";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";

export const usePoapDropFunctions = (poapContractAddress: string) => {
  const poapDropContract = usePOAPDropContract(true, poapContractAddress);
  const errorDecoder = ErrorDecoder.create();

  const [isMinting, setIsMinting] = useState(false);

  const mintPoap = useCallback(async (userPoapClaim : string[]): Promise<{
    success: boolean;
    transactionHash: string | null;
  }> => {
    if (!poapDropContract) {
      toast.error("PoapDrop Contract not found");
      return { success: false, transactionHash: null };
    }

    // @note get this merkleproof from the backend server (using the contract address and user address)

    try {
      setIsMinting(true);
      console.log("got here", userPoapClaim);
      const tx = await poapDropContract["claimAirdrop(bytes32[])"](userPoapClaim);

      const reciept = await tx.wait();
      return { success: reciept.status === 1, transactionHash: tx.hash };
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      console.error("Mint failed:", decodedError);
      toast.error("Mint failed");
      return { success: false, transactionHash: null };
    } finally {
      setIsMinting(false);
    }
  }, [poapDropContract]);

  return {
    mintPoap,
    isMinting,
  };
};
