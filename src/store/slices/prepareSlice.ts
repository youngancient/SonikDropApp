import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IAirdropList } from "../../interfaces/CSVInterface";
import { ITokenDetails } from "../../hooks/specific/useERC20";

// Define a type for the slice state
interface prepareState {
  tokenAddress: string;
  csvData: string;
  csvToJSONData: any[];
  tokenAddressError: string;
  csvDataError: string;
  invalidAirdropAddresses: string[];
  showCSVMaker: boolean;
  airdropMakerList: IAirdropList[];
  eligibleParticipantAddress: string;
  eligibleParticipantAmount: string;
  powerValue: string;
  tokenDetail : ITokenDetails | null ;
  
}

// Define the initial state using that type
const initialState: prepareState = {
  tokenAddress: "",
  csvData: "",
  csvToJSONData: [],
  tokenAddressError: "",
  csvDataError: "",
  invalidAirdropAddresses: [],
  showCSVMaker: false,
  airdropMakerList: [],
  eligibleParticipantAddress: "",
  eligibleParticipantAmount: "",
  powerValue: "",
  tokenDetail: null,
};

export const prepareSlice = createSlice({
  name: "prepare",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTokenAddress: (state, action: PayloadAction<string>) => {
      state.tokenAddress = action.payload;
    },
    setCsvData: (state, action: PayloadAction<string>) => {
      state.csvData = action.payload;
    },
    setCsvToJSONData: (state, action: PayloadAction<any[]>) => {
      state.csvToJSONData = action.payload;
    },
    setTokenAddressError: (state, action: PayloadAction<string>) => {
      state.tokenAddressError = action.payload;
    },
    setCsvDataError: (state, action: PayloadAction<string>) => {
      state.csvDataError = action.payload;
    },
    setInvalidAirdropAddresses: (state, action: PayloadAction<string[]>) => {
      state.invalidAirdropAddresses = action.payload;
    },
    setShowCSVMaker: (state, action: PayloadAction<boolean>) => {
      state.showCSVMaker = action.payload;
    },
    setAirdropMakerList: (state, action: PayloadAction<IAirdropList[]>) => {
      state.airdropMakerList = action.payload;
    },
    setEligibleParticipantAddress: (state, action: PayloadAction<string>) => {
      state.eligibleParticipantAddress = action.payload;
    },
    setEligibleParticipantAmount: (state, action: PayloadAction<string>) => {
      state.eligibleParticipantAmount = action.payload;
    },
    setPowerValue: (state, action: PayloadAction<string>) => {
      state.powerValue = action.payload;
    },
    setTokenDetail: (state, action: PayloadAction<ITokenDetails | null>) => {
      state.tokenDetail = action.payload;
    },

  },
});

export const {
    setAirdropMakerList,
    setCsvData,
    setCsvDataError,
    setCsvToJSONData,
    setEligibleParticipantAddress,
    setEligibleParticipantAmount,
    setInvalidAirdropAddresses,
    setPowerValue,
    setShowCSVMaker,
    setTokenAddress,
    setTokenAddressError,
    setTokenDetail,
} = prepareSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAirdropMakerList = (state: RootState) => state.prepare.airdropMakerList;
export const selectCsvData = (state: RootState) => state.prepare.csvData;
export const selectTokenAddress = (state: RootState) => state.prepare.tokenAddress; 
export const selectCsvToJSONData = (state: RootState) => state.prepare.csvToJSONData;
export const selectTokenAddressError = (state: RootState) => state.prepare.tokenAddressError;
export const selectCsvDataError = (state: RootState) => state.prepare.csvDataError;
export const selectInvalidAirdropAddresses = (state: RootState) => state.prepare.invalidAirdropAddresses;
export const selectShowCSVMaker = (state: RootState) => state.prepare.showCSVMaker;
export const selectEligibleParticipantAddress = (state: RootState) => state.prepare.eligibleParticipantAddress;
export const selectEligibleParticipantAmount = (state: RootState) => state.prepare.eligibleParticipantAmount;
export const selectPowerValue = (state: RootState) => state.prepare.powerValue;
export const selectTokenDetail = (state: RootState) => state.prepare.tokenDetail;


export default prepareSlice.reducer;
