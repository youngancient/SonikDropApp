import { useCallback, useState } from "react";
import { usePOAPFactoryContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { stripLeadingZeros } from "../../../utils/helpers";

export const usePoapFactoryFunctions = () => {
  const poapFactoryContract = usePOAPFactoryContract(true);
  const [creationStatus, setCreationStatus] = useState<
    "default" | "success" | "failed"
  >("default");
  const [isCreating, setIsCreating] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [deployedAirdropContractAddress, setDeployedPoapContractAddress] =
    useState("0x");
  

  const createTokenDrop = useCallback(
    async (
      merkleRoot: string,
      name: string,
      symbol : string,
      baseURI : string,
      nftAddress: string,
      noOfClaimers: number,
    ) => {
      if (!poapFactoryContract) {
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
        // console.log({name});
        const tx = await poapFactoryContract[
          "createSonikPoap(string,string,string,bytes32,address,uint256)"
        ](
          name,
          symbol,
          baseURI,
          merkleRoot,
          nftAddressClone,
          noOfClaimers,
          {
            gasLimit: 2000000,
          }
        );
        setTransactionHash(tx.hash);

        const reciept = await tx.wait();
        if (reciept.status === 1) {
          toast.success("Creation Successful!");
          console.log(reciept);
          // Find the emitted event with the new contract's address
          const eventLogs = reciept.logs;

          if (eventLogs) {
            const deployedContractAddress = eventLogs[0].topics[3];
            setDeployedPoapContractAddress(
              stripLeadingZeros(deployedContractAddress)
            );
          } else {
            console.log("Deployment event not found.");
          }
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
    [poapFactoryContract]
  );
  
  return {
    createTokenDrop,
    creationStatus,
    isCreating,
    transactionHash,
    deployedAirdropContractAddress,
  };
};
