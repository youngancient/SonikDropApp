import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IDropComp } from "../../interfaces/drop";
import { IPoapAirdropClaim } from "../../interfaces/output";

// Define a type for the slice state
interface dataState {
  poapDrops: IDropComp[] | null;
  duplicatePoapdrops: IDropComp[] | null;
  merkleOutput: IPoapAirdropClaim[] | null;
  merkleHash: string;
  noOfClaimers: number;
}

// Define the initial state using that type
const initialState: dataState = {
  poapDrops: null,
  duplicatePoapdrops: null,
  merkleOutput: null,
  merkleHash: "",
  noOfClaimers: 0,
};

export const poapDataSlice = createSlice({
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
              totalRewardClaimed: BigInt(drop.totalClaims) + BigInt(1), // since it's 1 mint per user, totalClaims == totalRewardClaimed
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
              totalRewardClaimed: BigInt(drop.totalClaims) + BigInt(1),
            };
          }
          return drop;
        });
      }
    },
    setPoapMerkleHash: (state, action: PayloadAction<string>) => {
      state.merkleHash = action.payload;
    },
    setPoapMerkleOutput: (
      state,
      action: PayloadAction<IPoapAirdropClaim[] | null>
    ) => {
      state.merkleOutput = action.payload;
    },
    setNoOfPoapClaimers: (state, action: PayloadAction<number>) => {
      state.noOfClaimers = action.payload;
    },
  },
});

export const {
  setPOAPDrops,
  setDuplicatePOAPDrops,
  updateAllPoapsAfterClaim,
  setPoapMerkleHash,
  setPoapMerkleOutput,
  setNoOfPoapClaimers,
} = poapDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllPoapDrops = (state: RootState) =>
  state.poapData.poapDrops;
export const selectAllDuplicatePoapDrops = (state: RootState) =>
  state.poapData.duplicatePoapdrops;
export const selectPoapMerkleHash = (state: RootState) =>
  state.poapData.merkleHash;

export const selectPoapMerkleOutput = (state: RootState) =>
  state.poapData.merkleOutput;

export const selectNoOfPoapClaimers = (state: RootState) =>
  state.poapData.noOfClaimers;

export default poapDataSlice.reducer;
