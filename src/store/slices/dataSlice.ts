import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IDropComp } from "../../interfaces/drop";

// Define a type for the slice state
interface dataState {
  poapDrops: IDropComp[] | null;
  duplicatePoapdrops: IDropComp[] | null;
}

// Define the initial state using that type
const initialState: dataState = {
  poapDrops: null,
  duplicatePoapdrops: null,
};

export const dataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPOAPDrops: (state, action: PayloadAction<IDropComp[] | null>) => {
      state.poapDrops = action.payload;
    },
    setDuplicatePOAPDrops: (
      state,
      action: PayloadAction<IDropComp[] | null>
    ) => {
      state.duplicatePoapdrops = action.payload;
    },
    updateAllPoapsAfterClaim: (state, action: PayloadAction<string>) => {
      const contractAddress = action.payload;

      if (state.poapDrops) {
        state.poapDrops = state.poapDrops.map((drop) => {
          if (drop.contractAddress === contractAddress) {
            return {
              ...drop,
              hasUserClaimed: true,
              totalClaims: drop.totalClaims + 1,
              totalRewardClaimed: drop.totalClaims + 1, // since it's 1 mint per user, totalClaims == totalRewardClaimed
            };
          }
          return drop;
        });
      }

      if (state.duplicatePoapdrops) {
        state.duplicatePoapdrops = state.duplicatePoapdrops.map((drop) => {
          if (drop.contractAddress === contractAddress) {
            return {
              ...drop,
              hasUserClaimed: true,
              totalClaims: drop.totalClaims + 1,
              totalRewardClaimed: drop.totalClaims + 1,
            };
          }
          return drop;
        });
      }
    },
  },
});

export const { setPOAPDrops, setDuplicatePOAPDrops, updateAllPoapsAfterClaim } =
  dataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllPoapDrops = (state: RootState) => state.data.poapDrops;
export const selectAllDuplicatePoapDrops = (state: RootState) =>
  state.data.duplicatePoapdrops;

export default dataSlice.reducer;
