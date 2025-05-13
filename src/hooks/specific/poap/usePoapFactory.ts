import { useCallback, useState } from "react";
import { usePOAPFactoryContract } from "../../useContracts";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { stripLeadingZeros } from "../../../utils/helpers";
import { ErrorDecoder } from "ethers-decode-error";

export const usePoapFactoryFunctions = () => {
  const poapFactoryContract = usePOAPFactoryContract(true);
  const [creationStatus, setCreationStatus] = useState<
    "default" | "success" | "failed"
  >("default");
  const [isCreating, setIsCreating] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [deployedPoapDropContractAddress, setDeployedPoapContractAddress] =
    useState("0x");

  const [isEstimating, setIsEstimating] = useState(false);
  const errorDecoder = ErrorDecoder.create();

  const createPoapDrop = useCallback(
    async (
      merkleRoot: string,
      name: string,
      symbol: string,
      baseURI: string,
      nftAddress: string,
      noOfClaimers: number
    ) => {
      if (!poapFactoryContract) {
        toast.error("Poap Factory Contract not found");
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
        ](name, symbol, baseURI, merkleRoot, nftAddressClone, noOfClaimers, {
          gasLimit: 2000000,
        });
        setTransactionHash(tx.hash);

        const reciept = await tx.wait();
        if (reciept.status === 1) {
          toast.success("Creation Successful!");
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
          return true;
        }
      } catch (error) {
        const decodedError = await errorDecoder.decode(error);
        console.log(decodedError);
        toast.error("failed to create drop");
        setCreationStatus("failed");
        return false;
      } finally {
        setIsCreating(false);
      }
    },
    [poapFactoryContract]
  );

  const estimateCreatePoapGas = useCallback(
    async (
      merkleRoot: string,
      name: string,
      symbol: string,
      baseURI: string,
      nftAddress: string,
      noOfClaimers: number
    ):Promise<bigint | null> => {
      if (!poapFactoryContract) {
        toast.error("Poap Factory Contract not found");
        return null;
      }
      try {
        setIsEstimating(true);
        // construct transaction
        console.log("estimating drop...");

        let nftAddressClone = nftAddress;
        if (nftAddress == "") {
          nftAddressClone = ethers.ZeroAddress;
        }
        // console.log({name});
        const gas = await poapFactoryContract[
          "createSonikPoap(string,string,string,bytes32,address,uint256)"
        ].estimateGas(
          name,
          symbol,
          baseURI,
          merkleRoot,
          nftAddressClone,
          noOfClaimers
        );
        return gas;
      } catch (error) {
        console.log(error);
        toast.error("failed to estimate gas");
        return null;
      } finally {
        setIsEstimating(false);
      }
    },
    [poapFactoryContract]
  );
  return {
    createPoapDrop,
    creationStatus,
    isCreating,
    transactionHash,
    deployedPoapDropContractAddress,
    estimateCreatePoapGas,
    isEstimating,
    poapFactoryContract,
  };
};
