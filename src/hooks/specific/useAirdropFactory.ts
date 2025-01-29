import { useCallback, useState } from "react";
import { useTokenFactoryContract } from "../useContracts";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export const useTokenFactoryFunctions = () => {
  const tokenFactoryContract = useTokenFactoryContract(true);
  const [creationStatus, setCreationStatus] = useState<
    "default" | "success" | "failed"
  >("default");
  const [isCreating, setIsCreating] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>("");

  const createTokenDrop = useCallback(
    async (
      tokenAddress: string,
      merkleRoot: string,
      name: string,
      nftAddress: string,
      noOfClaimers: number,
      totalOutputTokens: bigint
    ) => {
      if (!tokenFactoryContract) {
        toast.error("Contract not found");
        return;
      }
      try {
        setIsCreating(true);
        // construct transaction
        console.log("creating drop...");
        let nftAddressClone = nftAddress;
        if (nftAddress == "") {
          nftAddressClone = ethers.ZeroAddress;
        }
        const tx = await tokenFactoryContract[
          "createSonikDrop(address,bytes32,string,address,uint256,uint256)"
        ](
          tokenAddress,
          merkleRoot,
          name,
          nftAddressClone,
          noOfClaimers,
          totalOutputTokens,
          {
            gasLimit: 1000000,
          }
        );
        setTransactionHash(tx.hash);

        const reciept = await tx.wait();
        if (reciept.status === 1) {    
          toast.success("Creation Successful!");
          console.log(reciept);
          setCreationStatus("success");
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error("failed to create drop");
        setCreationStatus("failed");
      } finally {
        setIsCreating(false);
      }
    },
    [tokenFactoryContract]
  );

  return { createTokenDrop, creationStatus, isCreating,transactionHash };
};
