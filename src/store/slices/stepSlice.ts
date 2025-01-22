import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type stepTypes = "prepare" | "settings" | "approve";

// Define a type for the slice state
interface CounterState {
  value: stepTypes;
  backStack: Array<stepTypes>;
  hasSigned: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: "prepare",
  backStack: [],
  hasSigned: false,
};

export const stepSlice = createSlice({
  name: "step",
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
    clearBack: (state) => {
      state.backStack = [];
    },
    setHasSigned:(state) =>{
      state.hasSigned = true;
    }
  },
});

export const { setStep, goBack, clearBack, setHasSigned } = stepSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStep = (state: RootState) => state.step.value;
export const selectBackStack = (state: RootState) => state.step.backStack;
export const selectHasSigned = (state: RootState) => state.step.hasSigned;

export default stepSlice.reducer;
