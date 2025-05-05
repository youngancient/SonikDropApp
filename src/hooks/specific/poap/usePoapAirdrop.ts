import { usePOAPDropContract } from "../../useContracts";

export const usePoapDropFunctions = (poapContractAddress: string) => {
    const poapDropContract = usePOAPDropContract(true,poapContractAddress)
};