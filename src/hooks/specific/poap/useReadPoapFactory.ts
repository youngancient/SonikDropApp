import { useAppKitAccount } from "@reown/appkit/react";
import {
  useMulticall3Contract,
  usePOAPFactoryContract,
} from "../../useContracts";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { POAP_AIRDROP_ABI } from "../../../ABI/poapAirdrop";
import { ICall, IResult } from "../../../interfaces/multicall";
import { IPOAPDrop } from "../../../interfaces/poapDrop";
import { ErrorDecoder } from "ethers-decode-error";

export const useReadPoapFactoryFunctions = () => {
  const poapFactoryContract = usePOAPFactoryContract();
  const { address } = useAppKitAccount();
  const multicall3Contract = useMulticall3Contract();
  const errorDecoder = ErrorDecoder.create();

  // state
  const [allPoapDropsAddresses, setAllPoapDropsAddresses] = useState<
    string[] | null
  >(null);

  const [allOwnerPoapDropsAddresses, setAllOwnerPoapDropsAddresses] = useState<
    string[] | null
  >(null);

  const [allPoapDropsDetails, setAllPoapDropsDetails] = useState<
    IPOAPDrop[] | null
  >(null);

  const [allOwnerPoapDropsDetails, setAllOwnerPoapDropsDetails] = useState<
    IPOAPDrop[] | null
  >(null);

  // loading state
  const [isLoadingOwnerPoapDrops, setLoadingOwnerPoapDrops] = useState(false);
  const [isLoadingAllPoapDrops, setLoadingAllPoapDrops] = useState(false);

  //  functions
  const getOwnerPoapDrops = useCallback(async () => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return;
    }
    const ownerDropsAddresses =
      await poapFactoryContract.getOwnerSonikPoapClones(address);
    setAllOwnerPoapDropsAddresses(ownerDropsAddresses);
  }, [poapFactoryContract]);

  const getAllPoapDrops = useCallback(async () => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return;
    }
    const allDropAddresses = await poapFactoryContract.getAllSonikPoapClones();
    setAllPoapDropsAddresses(allDropAddresses);
  }, [poapFactoryContract]);

  const fetchPoapDropDetails = useCallback(
    async (
      dropAddresses: string[],
      setLoading: (state: boolean) => void
    ): Promise<IPOAPDrop[]> => {
      if (!multicall3Contract) {
        toast.error("Multicall3 Contract not found");
        return [];
      }
      setLoading(true);
      try {
        const iface = new ethers.Interface(POAP_AIRDROP_ABI);

        const calls: ICall[] = dropAddresses.map(
          (addr: string): ICall => ({
            target: addr,
            callData: iface.encodeFunctionData("getPoapInfo", [address]),
          })
        );

        const results = await multicall3Contract.tryAggregate.staticCall(
          true,
          calls
        );

        const decoded: (IPOAPDrop | null)[] = results.map(
          (res: IResult, idx: number): IPOAPDrop | null => {
            if (!res.success) {
              console.warn(`Call failed for address: ${dropAddresses[idx]}`);
              return null;
            }

            const [
              baseURI,
              name,
              creatorAddress,
              totalClaimed,
              totalClaimable,
              creationTime,
              endTime,
              hasUserClaimed,
              nftAddress,
            ] = iface.decodeFunctionResult("getPoapInfo", res.returnData);

            return {
              address: dropAddresses[idx],
              baseURI,
              name,
              creatorAddress,
              totalClaimed: Number(totalClaimed),
              totalClaimable: Number(totalClaimable),
              creationTime: Number(creationTime),
              endTime:
                Number(creationTime) != Number(endTime)
                  ? Number(endTime)
                  : undefined,
              hasUserClaimed,
              nftAddress:
                ethers.ZeroAddress != nftAddress ? nftAddress : undefined,
            };
          }
        );
        return decoded.filter((drop): drop is IPOAPDrop => drop !== null);
      } catch (error) {
        const decodedError = await errorDecoder.decode(error);
        toast.error(decodedError.reason);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [multicall3Contract, address]
  );

  const getOwnerPoapDropsDetails = useCallback(async (): Promise<
    IPOAPDrop[]
  > => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return [];
    }

    const ownerDropAddresses =
      await poapFactoryContract.getOwnerSonikPoapClones(address);
    const drops = await fetchPoapDropDetails(
      ownerDropAddresses,
      setLoadingOwnerPoapDrops
    );
    setAllOwnerPoapDropsDetails(drops);
    return drops;
  }, [poapFactoryContract]);

  const getAllPoapDropsDetails = useCallback(async (): Promise<IPOAPDrop[]> => {
    if (!poapFactoryContract) {
      toast.error("Poap Factory Contract not found");
      return [];
    }

    const allDropAddresses = await poapFactoryContract.getAllSonikPoapClones();
    const drops = await fetchPoapDropDetails(
      allDropAddresses,
      setLoadingAllPoapDrops
    );
    setAllPoapDropsDetails(drops);
    return drops;
  }, [poapFactoryContract]);

  return {
    getOwnerPoapDrops,
    getAllPoapDrops,
    getAllPoapDropsDetails,
    getOwnerPoapDropsDetails,
    allPoapDropsAddresses,
    allOwnerPoapDropsAddresses,
    allPoapDropsDetails,
    allOwnerPoapDropsDetails,
    isLoadingOwnerPoapDrops,
    isLoadingAllPoapDrops,
    setAllPoapDropsDetails,
  };
};
