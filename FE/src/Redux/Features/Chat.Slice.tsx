import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatService from "../Service/ChatService";


const initialState: any = {
  isFetching: false,
  error: "",
  isError: false,
  chatsData:[],
  isDeleted:false,
  isLoading:false,
};


export const newchat: any = createAsyncThunk(
    "new/chat",
    async (data: { email: string; message: string }, thunkAPI) => {
      const response = await ChatService.newchat(data.email, data.message);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  export const getAllChat: any = createAsyncThunk(
    "get/allChat",
    async (data: { email: string }, thunkAPI) => {
      const response = await ChatService.getAllChat(data.email);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );

  export const deleteAllChat: any = createAsyncThunk(
    "chat/delete",
    async (data: { email: string }, thunkAPI) => {
      const response = await ChatService.deleteAllChat(data.email);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );

  const chatSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      clearState: (state) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.chatsData=[];
        state.isDeleted=false
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(newchat.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(newchat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(newchat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      });
        builder
        .addCase(getAllChat.pending, (state) => {
          state.isFetching = true;
          state.isError = false;
        })
        .addCase(getAllChat.fulfilled, (state, action) => {
          state.isFetching = false;
          state.isError = false;
          state.error = "";
          state.chatsData = action?.payload?.chats;
        })
        .addCase(getAllChat.rejected, (state, action) => {
          state.isFetching = false;
          state.isError = true;
          state.error = action.payload as string;
        });
        builder
        .addCase(deleteAllChat.pending, (state) => {
          state.isFetching = true;
          state.isError = false;
        })
        .addCase(deleteAllChat.fulfilled, (state, action) => {
          state.isFetching = false;
          state.isError = false;
          state.error = "";
          console.log(action)
          if(action?.payload?.message==="OK")
          {
          state.chatsData=[]
          state.isDeleted=true
          }
        })
        .addCase(deleteAllChat.rejected, (state, action) => {
          state.isFetching = false;
          state.isError = true;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearState } = chatSlice.actions;
  
  export default chatSlice;