import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface UserState {
  id: string;
  name: string;
  email: string;
  token: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  loading: "idle",
  error: null,
};

export const logoutUser = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  await api.post("/auth/logout");
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { email: string; password: string }) => {
    console.log("login user form userslice accessed");
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
            user: { id: string; name: string; email: string };
          }>
        ) => {
          state.token = action.payload.token;
          state.id = action.payload.user.id;
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.loading = "succeeded";
        }
      )
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: { id: string; name: string; email: string };
          }>
        ) => {
          state.id = action.payload.user.id;
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.loading = "succeeded";
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.id = "";
        state.name = "";
        state.email = "";
        state.token = null;
        state.loading = "idle";
      });
  },
});

export default userSlice.reducer;
