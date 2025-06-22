import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IDropComp } from "../../interfaces/drop";
import { ITokenAirdropClaim } from "../../interfaces/output";

// Define a type for the slice state
interface dataState {
  tokenDrops: IDropComp[] | null;
  duplicateTokendrops: IDropComp[] | null;
  merkleHash: string;
  merkleOutput: ITokenAirdropClaim[] | null;
  noOfClaimers: number;
}

// Define the initial state using that type
const initialState: dataState = {
  tokenDrops: null,
  duplicateTokendrops: null,
  merkleHash: "",
  merkleOutput: null,
  noOfClaimers: 0,
};

export const tokenDataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTokenDrops: (state, action: PayloadAction<IDropComp[] | null>) => {
      state.tokenDrops = action.payload;
    },
    setDuplicateTokenDrops: (
      state,
      action: PayloadAction<IDropComp[] | null>
    ) => {
      state.duplicateTokendrops = action.payload;
    },
    // fix the token update
    updateAllTokenDropsAfterClaim: (
      state,
      action: PayloadAction<{ contractAddress: string; amountClaimed: string }>
    ) => {
      const { contractAddress, amountClaimed } = action.payload;
      const claimedAmount = BigInt(amountClaimed);

      if (state.tokenDrops) {
        state.tokenDrops = state.tokenDrops.map((drop) => {
          if (drop.contractAddress === contractAddress) {
            return {
              ...drop,
              hasUserClaimed: true,
              totalClaims: drop.totalClaims + 1,
              totalRewardClaimed: (drop.totalRewardClaimed ?? 0n) + claimedAmount,
            };
          }
          return drop;
        });
      }

      if (state.duplicateTokendrops) {
        state.duplicateTokendrops = state.duplicateTokendrops.map((drop) => {
          if (drop.contractAddress === contractAddress) {
            return {
              ...drop,
              hasUserClaimed: true,
              totalClaims: drop.totalClaims + 1,
              totalRewardClaimed: (drop.totalRewardClaimed ?? 0n) + claimedAmount,
            };
          }
          return drop;
        });
      }
    },
    setMerkleHash: (state, action: PayloadAction<string>) => {
      state.merkleHash = action.payload;
    },
    setMerkleOutput: (
      state,
      action: PayloadAction<ITokenAirdropClaim[] | null>
    ) => {
      state.merkleOutput = action.payload;
    },
    setNoOfClaimers: (state, action: PayloadAction<number>) => {
      state.noOfClaimers = action.payload;
    },
  },
});

export const {
  setMerkleHash,
  setMerkleOutput,
  setNoOfClaimers,
  setTokenDrops,
  setDuplicateTokenDrops,
  updateAllTokenDropsAfterClaim,
} = tokenDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMerkleHash = (state: RootState) =>
  state.tokenData.merkleHash;
export const selectMerkleOutput = (state: RootState) =>
  state.tokenData.merkleOutput;
export const selectNoOfClaimers = (state: RootState) =>
  state.tokenData.noOfClaimers;
export const selectAllTokenDrops = (state: RootState) =>
  state.tokenData.tokenDrops;
export const selectAllDuplicateTokenDrops = (state: RootState) =>
  state.tokenData.duplicateTokendrops;

export default tokenDataSlice.reducer;
