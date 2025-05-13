import { configureStore } from "@reduxjs/toolkit";
import stepSlice from "./slices/stepSlice";
import prepareSlice from "./slices/prepareSlice";
import settingsSlice from "./slices/settingsSlice";
import approveSlice from "./slices/approveSlice";
import poapStepSlice from "./slices/poapStepSlice";
import preparePoapSlice from "./slices/preparePoapSlice";
import poapDataSlice from "./slices/poapDropDataSlice";
import tokenDataSlice from "./slices/tokenDropDataSlice";
// ...

export const store = configureStore({
  reducer: {
    step: stepSlice,
    prepare: prepareSlice,
    settings: settingsSlice,
    approve: approveSlice,
    poap: poapStepSlice,
    preparePoap: preparePoapSlice,
    poapData: poapDataSlice,
    tokenData: tokenDataSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
