import { useAppDispatch } from "../store/hooks";
import {
  setCsvToJSONData,
  setAirdropMakerList,
  setInvalidAirdropAddresses,
  setCsvData,
  setCsvDataError,
  setEligibleParticipantAddress,
  setEligibleParticipantAmount,
  setPowerValue,
  setShowCSVMaker,
  setTokenAddress,
  setTokenAddressError,

} from "../store/slices/prepareSlice";

export function useClearPoapFormInput() {
  const dispatch = useAppDispatch();

  const clearPoap = () => {
    dispatch(setCsvToJSONData([]));
    dispatch(setInvalidAirdropAddresses([]));
    dispatch(setAirdropMakerList([]));
    dispatch(setShowCSVMaker(false));
    dispatch(setCsvData(""));
    dispatch(setCsvDataError(""));
    dispatch(setEligibleParticipantAddress(""));
    dispatch(setEligibleParticipantAmount(""));
    dispatch(setPowerValue(""));
    dispatch(setTokenAddress(""));
    dispatch(setTokenAddressError(""));

    sessionStorage.removeItem("csvData");
    sessionStorage.removeItem("poapEventDetails");
  };

  return {
    clearPoap,
  };
}
