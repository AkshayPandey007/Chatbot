import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/Auth.slice";
import chatSlice from "./Features/Chat.Slice";


// Configure Store Here
const Store = configureStore({
  reducer: {
    user:userSlice.reducer,
    chat:chatSlice.reducer
  },
  devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
