import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IAirdropList } from "../../interfaces/CSVInterface";

// Define a type for the slice state
interface preparePoapState {

  csvData: string;
  csvToJSONData: any[];
  csvDataError: string;
  invalidAirdropAddresses: string[];
  showCSVMaker: boolean;
  airdropMakerList: IAirdropList[];
  eligibleParticipantAddress: string;
  eligibleParticipantAmount: string;
  powerValue: string;
}

// Define the initial state using that type
const initialState: preparePoapState = {
  csvData: "",
  csvToJSONData: [],
  csvDataError: "",
  invalidAirdropAddresses: [],
  showCSVMaker: false,
  airdropMakerList: [],
  eligibleParticipantAddress: "",
  eligibleParticipantAmount: "",
  powerValue: "",
};

export const preparePoapSlice = createSlice({
  name: "prepare",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`

    setCsvData: (state, action: PayloadAction<string>) => {
      state.csvData = action.payload;
    },
    setCsvToJSONData: (state, action: PayloadAction<any[]>) => {
      state.csvToJSONData = action.payload;
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
    }
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
} = preparePoapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAirdropMakerList = (state: RootState) => state.prepare.airdropMakerList;
export const selectCsvData = (state: RootState) => state.prepare.csvData;
export const selectCsvToJSONData = (state: RootState) => state.prepare.csvToJSONData;
export const selectCsvDataError = (state: RootState) => state.prepare.csvDataError;
export const selectInvalidAirdropAddresses = (state: RootState) => state.prepare.invalidAirdropAddresses;
export const selectShowCSVMaker = (state: RootState) => state.prepare.showCSVMaker;
export const selectEligibleParticipantAddress = (state: RootState) => state.prepare.eligibleParticipantAddress;
export const selectEligibleParticipantAmount = (state: RootState) => state.prepare.eligibleParticipantAmount;
export const selectPowerValue = (state: RootState) => state.prepare.powerValue;

export default preparePoapSlice.reducer;
