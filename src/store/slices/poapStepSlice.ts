import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IAirdropList } from "../../interfaces/CSVInterface";

export type stepTypes = "prepare" | "settings" | "approve";

// Define a type for the slice state
interface CounterState {
  value: stepTypes;
  backStack: Array<stepTypes>;
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
}

// Define the initial state using that type
const initialState: CounterState = {
  value: "prepare",
  backStack: [],

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
};

export const poapStepSlice = createSlice({
  name: "poapstep",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStep: (state, action: PayloadAction<stepTypes>) => {
      console.log("set step payload", action.payload);
      state.value = action.payload;
      state.backStack.push(action.payload);
    },
    goBack: (state) => {
      const stepToGoBackTo = state.backStack.pop();

      if (stepToGoBackTo == "approve") {
        state.value = "settings";
      } else if (stepToGoBackTo == "settings") {
        state.value = "prepare";
      } else {
        state.value = "prepare";
      }
    },
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
  },
});

export const { setStep, goBack } = poapStepSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStep = (state: RootState) => state.step.value;
export const selectBackStack = (state: RootState) => state.step.backStack;

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

export default poapStepSlice.reducer;
