import { useCallback, useState } from "react";
import { useTokenFactoryContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { stripLeadingZeros } from "../../../utils/helpers";

export const useTokenFactoryFunctions = () => {
  const tokenFactoryContract = useTokenFactoryContract(true);
  const [creationStatus, setCreationStatus] = useState<
    "default" | "success" | "failed"
  >("default");
  const [isCreating, setIsCreating] = useState(false);

  const createTokenDrop = useCallback(
    async (
      tokenAddress: string,
      merkleRoot: string,
      name: string,
      nftAddress: string,
      noOfClaimers: number,
      totalOutputTokens: bigint
    ): Promise<{
      success: boolean;
      transactionHash: string | null;
      deployedAirdropContractAddress: string | null;
    }> => {
      if (!tokenFactoryContract) {
        toast.error("Token Factory Contract not found");
        return {
          success: false,
          transactionHash: null,
          deployedAirdropContractAddress: null,
        };
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
            gasLimit: 2000000,
          }
        );

        const reciept = await tx.wait();
        if (reciept.status === 1) {
          toast.success("Creation Successful!");
          // Find the emitted event with the new contract's address
          const eventLogs = reciept.logs;

          if (!eventLogs) {
            console.log("Deployment event not found.");
            return {
              success: false,
              transactionHash: null,
              deployedAirdropContractAddress: null,
            };
          }
          const deployedContractAddress = eventLogs[0].topics[2];
          setCreationStatus("success");
          return {
            success: true,
            transactionHash: tx.hash,
            deployedAirdropContractAddress: stripLeadingZeros(
              deployedContractAddress
            ),
          };
        }
      } catch (error) {
        console.log(error);
        toast.error("failed to create drop");
        setCreationStatus("failed");
        return {
          success: false,
          transactionHash: null,
          deployedAirdropContractAddress: null,
        };
      } finally {
        setIsCreating(false);
      }
      return {
        success: false,
        transactionHash: null,
        deployedAirdropContractAddress: null,
      };
    },
    [tokenFactoryContract]
  );

  return {
    createTokenDrop,
    creationStatus,
    isCreating,
  };
};
