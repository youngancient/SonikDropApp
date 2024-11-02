import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICSV } from "../../interfaces/CSVInterface";

// Define a type for the slice state
interface approveState {
  csvToJSONData: ICSV[];
  onlyNFTOwnersCanClaim: boolean;
  airdropStart: string;
  airdropEnd: string;
}

// Define the initial state using that type
const initialState: approveState = {
  csvToJSONData: [],
  onlyNFTOwnersCanClaim: false,
  airdropStart: "",
  airdropEnd: "",
};

export const approveSlice = createSlice({
  name: "approve",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCsvToJSONData: (state, action: PayloadAction<ICSV[]>) => {
      state.csvToJSONData = action.payload;
    },
    setOnlyNFTOwnersCanClaim: (state, action: PayloadAction<boolean>) => {
      state.onlyNFTOwnersCanClaim = action.payload;
    },
    setAirdropStart: (state, action: PayloadAction<string>) => {
      state.airdropEnd = action.payload;
    },
    setAirdropEnd: (state, action: PayloadAction<string>) => {
      state.airdropEnd = action.payload;
    }
  },
});

export const {
  setAirdropEnd,
  setAirdropStart,
  setOnlyNFTOwnersCanClaim,
  setCsvToJSONData
} = approveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCsvToJSONData = (state: RootState) => state.approve.csvToJSONData;
export const selectAirdropStart = (state: RootState) =>
  state.approve.airdropStart;
export const selectAirdropEnd = (state: RootState) =>
  state.approve.airdropEnd;
export const selectOnlyNFTOwnersCanClaim = (state: RootState) =>
  state.approve.onlyNFTOwnersCanClaim;

export default approveSlice.reducer;
