import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../Service/AuthService";

const initialState: any = {
  isFetching: false,
  error: "",
  isError: false,
  profile:{},
};


// Signup thunks
export const signup: any = createAsyncThunk(
    "auth/signup",
    async (data: { username: string;email:string; password: string }, thunkAPI) => {
      const response = await AuthService.signup(data.username,data.email, data.password);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  // Login thunks
export const login: any = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    const response = await AuthService.login(data.email, data.password);
    if (response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.message);
    }
  }
);


export const userProfile: any = createAsyncThunk(
  "auth/profile",
  async (data: { email: string }, thunkAPI) => {
    const response = await AuthService.userProfile(data.email);
    if (response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.message);
    }
  }
);


export const logout: any = createAsyncThunk("logout", async (_, thunkAPI) => {
  const data = await AuthService.logout();

  if (data) return data;
  else return thunkAPI.rejectWithValue("Error on getting all users");
});



  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      clearState: (state) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.profile={}
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      builder
        .addCase(signup.pending, (state) => {
          state.isFetching = true;
          state.isError = false;
        })
        .addCase(signup.fulfilled, (state, action) => {
          state.isFetching = false;
          state.isError = false;
          state.error = "";
        })
        .addCase(signup.rejected, (state, action) => {
          state.isFetching = false;
          state.isError = true;
          state.error = action.payload as string;
        })
        builder
        .addCase(userProfile.pending, (state) => {
          state.isFetching = true;
          state.isError = false;
        })
        .addCase(userProfile.fulfilled, (state, action) => {
          state.isFetching = false;
          state.isError = false;
          state.error = "";
          state.profile = action?.payload?.user;
        })
        .addCase(userProfile.rejected, (state, action) => {
          state.isFetching = false;
          state.isError = true;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearState } = userSlice.actions;
  
  export default userSlice;