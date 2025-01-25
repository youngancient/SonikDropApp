import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface settingsState {
  airDropName: string;
  airDropNameError: string;
  nftAddress: string;
  nftAddressError: string;
  claimButtonDeactivated: boolean;
  airdropStart: string;
  airdropEndMin: string;
  airdropEnd: string;
  onlyNFTOwnersCanClaim: boolean;
}

// Define the initial state using that type
const initialState: settingsState = {
  airDropName: "",
  airDropNameError: "",
  nftAddress: "",
  nftAddressError: "",
  claimButtonDeactivated: false,
  airdropStart: "",
  airdropEndMin: "",
  airdropEnd: "",

  onlyNFTOwnersCanClaim: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAirdropName: (state, action: PayloadAction<string>) => {
      state.airDropName = action.payload;
    },
    setAirdropNameError: (state, action: PayloadAction<string>) => {
      state.airDropNameError = action.payload;
    },
    setNftAddress: (state, action: PayloadAction<string>) => {
      state.nftAddress = action.payload;
    },
    setNftAddressError: (state, action: PayloadAction<string>) => {
      state.nftAddressError = action.payload;
    },
    setClaimButtonDeactivated: (state, action: PayloadAction<boolean>) => {
      state.claimButtonDeactivated = action.payload;
    },
    setAirdropStart: (state, action: PayloadAction<string>) => {
      state.airdropStart = action.payload;
    },
    setAirdropEnd: (state, action: PayloadAction<string>) => {
      state.airdropEnd = action.payload;
    },
    setAirdropEndMin: (state, action: PayloadAction<string>) => {
      state.airdropEndMin = action.payload;
    },
    setOnlyNFTOwnersCanClaim: (state, action: PayloadAction<boolean>) => {
      state.onlyNFTOwnersCanClaim = action.payload;
    },
  },
});

export const {
  setNftAddressError,
  setAirdropEnd,
  setAirdropStart,
  setClaimButtonDeactivated,
  setNftAddress,
  setOnlyNFTOwnersCanClaim,
  setAirdropEndMin,
  setAirdropName,
  setAirdropNameError,
} = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAirDropName = (state: RootState) =>
  state.settings.airDropName;
export const selectAirDropNameError = (state: RootState) =>
  state.settings.airDropNameError;
export const selectNftAddress = (state: RootState) => state.settings.nftAddress;
export const selectNftAddressError = (state: RootState) =>
  state.settings.nftAddressError;
export const selectClaimButtonDeactivated = (state: RootState) =>
  state.settings.claimButtonDeactivated;
export const selectAirdropStart = (state: RootState) =>
  state.settings.airdropStart;
export const selectAirdropEndMin = (state: RootState) =>
  state.settings.airdropEndMin;
export const selectAirdropEnd = (state: RootState) => state.settings.airdropEnd;
export const selectOnlyNFTOwnersCanClaim = (state: RootState) =>
  state.settings.onlyNFTOwnersCanClaim;

export default settingsSlice.reducer;
