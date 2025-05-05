import { useAppKitAccount } from "@reown/appkit/react";
import {
  useMulticall3Contract,
  usePOAPFactoryContract,
} from "../../useContracts";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { ethers } from "ethers";
import { POAP_AIRDROP_ABI } from "../../../ABI/poapAirdrop";
import { ICall, IResult } from "../../../interfaces/multicall";
import { IPOAPDecodedResult } from "../../../interfaces/poapDrop";
import { ErrorDecoder } from "ethers-decode-error";

export const useReadPoapFactoryFunctions = () => {
  const poapFactoryContract = usePOAPFactoryContract();
  const { address } = useAppKitAccount();
  const multicall3Contract = useMulticall3Contract();
  const errorDecoder = ErrorDecoder.create();

  const getOwnerPoapDrops = useCallback(async () => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return;
    }
    const drops = await poapFactoryContract.getOwnerSonikPoapClones(address);
    console.log("all owner drops -> ", drops);
  }, [poapFactoryContract]);

  const getAllPoapDrops = useCallback(async () => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return;
    }
    const allDropAddresses = await poapFactoryContract.getAllSonikPoapClones();

    console.log("all POAP addresses -> ", allDropAddresses);
  }, [poapFactoryContract]);

  const getAllPoapDropsDetails = useCallback(async () => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return;
    }

    if (!multicall3Contract) {
      toast.error("Multicall3 Contract not found");
      return;
    }

    console.log("multicall3-> ", multicall3Contract);

    try {
      const allDropAddresses =
        await poapFactoryContract.getAllSonikPoapClones();

      const iface = new ethers.Interface(POAP_AIRDROP_ABI);

      const calls: ICall[] = allDropAddresses.map(
        (addr: string): ICall => ({
          target: addr,
          callData: iface.encodeFunctionData("getPoapInfo", [address]),
        })
      );

      const results = await multicall3Contract.tryAggregate.staticCall(
        true,
        calls
      );
      const decoded: (IPOAPDecodedResult | null)[] = results.map(
        (res: IResult, idx: number): IPOAPDecodedResult | null => {
          if (!res.success) {
            console.warn(`Call failed for address: ${allDropAddresses[idx]}`);
            return null;
          }

          const [
            baseURI,
            name,
            creatorAddress,
            totalClaimed,
            totalClaimable,
            percentageClaimed,
            creationTime,
            hasUserClaimed,
          ] = iface.decodeFunctionResult("getPoapInfo", res.returnData);

          return {
            address: allDropAddresses[idx],
            baseURI,
            name,
            creatorAddress,
            totalClaimed: totalClaimed.toString(),
            totalClaimable: totalClaimable.toString(),
            percentageClaimed: percentageClaimed.toString(),
            creationTime: Number(creationTime),
            hasUserClaimed,
          };
        }
      );

      console.log(decoded);
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      console.log(decodedError.reason);
    }
  }, [poapFactoryContract]);

  return { getOwnerPoapDrops, getAllPoapDrops, getAllPoapDropsDetails };
};
