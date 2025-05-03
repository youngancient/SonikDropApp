import { useCallback } from "react";
import { useTokenFactoryContract } from "../../useContracts";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";

export const useReadTokenFactoryFunctions = () => {
  const tokenFactoryContract = useTokenFactoryContract();
  const { address } = useAppKitAccount();

  const getOwnerTokenDrops = useCallback(async () => {
    console.log("token factory -> ", tokenFactoryContract);

    if (!tokenFactoryContract) {
      toast.error("Contract not found");
      return;
    }
    const drops = await tokenFactoryContract.getOwnerSonikDropClones(address);
    console.log(drops);
  }, [tokenFactoryContract]);

  return { getOwnerTokenDrops };
};
