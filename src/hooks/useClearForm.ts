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

import {
  setAirdropStart,
  setAirdropEnd,
  setAirdropEndMin,
  setClaimButtonDeactivated,
  setNftAddress,
  setNftAddressError,
  setOnlyNFTOwnersCanClaim,
  setAirdropName,
  setAirdropNameError,
} from "../store/slices/settingsSlice";

import {
  setAirdropEnd as approveEnd,
  setAirdropStart as approveStart,
  setCsvToJSONData as approveCSVtoJSON,
  setOnlyNFTOwnersCanClaim as canClaim,
} from "../store/slices/approveSlice";
import { useAppDispatch } from "../store/hooks";

export function useClearFormInput() {
  const dispatch = useAppDispatch();

  const clear = () => {
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

    dispatch(setAirdropStart(""));
    dispatch(setAirdropEnd(""));
    dispatch(setAirdropEndMin(""));
    dispatch(setClaimButtonDeactivated(false));
    dispatch(setNftAddress(""));
    dispatch(setNftAddressError(""));
    dispatch(setOnlyNFTOwnersCanClaim(false));
    dispatch(setAirdropName(""));
    dispatch(setAirdropNameError(""));

    dispatch(approveEnd(""));
    dispatch(approveStart(""));
    dispatch(approveCSVtoJSON([]));
    dispatch(canClaim(false));

    sessionStorage.removeItem("tokenAddress");
    sessionStorage.removeItem("csvData");
    sessionStorage.removeItem("settings");
  };

  return {
    clear,
  };
}
