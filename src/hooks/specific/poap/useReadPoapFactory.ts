import { useAppKitAccount } from "@reown/appkit/react";
import { usePOAPFactoryContract } from "../../useContracts";
import { toast } from "react-toastify";
import { useCallback } from "react";

export const useReadPoapFactoryFunctions = () => {
  const poapFactoryContract = usePOAPFactoryContract();
  const { address } = useAppKitAccount();

  const getOwnerPoapDrops = useCallback(async () => {
    console.log("token factory -> ", poapFactoryContract);

    if (!poapFactoryContract) {
      toast.error("Contract not found");
      return;
    }
    const drops = await poapFactoryContract.getOwnerSonikPoapClones(address);
    console.log("====================================");
    console.log("all owner drops -> ", drops);
  }, [poapFactoryContract]);

  const getAllPoapDrops = useCallback(async () => {
    if (!poapFactoryContract) {
      toast.error("Contract not found");
      return;
    }
    const allDropAddresses = await poapFactoryContract.getAllSonikPoapClones();
    console.log("====================================");

    console.log("all POAP addresses -> ", allDropAddresses);
  }, [poapFactoryContract]);

  return { getOwnerPoapDrops, getAllPoapDrops };
};
