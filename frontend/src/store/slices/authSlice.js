import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const registerUser = createAsyncThunk("auth/register", async (d, { rejectWithValue }) => {
  try { const { data } = await API.post("/auth/register", d); localStorage.setItem("token", data.token); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || "Registration failed"); }
});
export const loginUser = createAsyncThunk("auth/login", async (d, { rejectWithValue }) => {
  try { const { data } = await API.post("/auth/login", d); localStorage.setItem("token", data.token); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || "Login failed"); }
});
export const loadUser = createAsyncThunk("auth/loadUser", async (_, { rejectWithValue }) => {
  try { const { data } = await API.get("/auth/me"); return data; }
  catch (e) { localStorage.removeItem("token"); return rejectWithValue("Session expired"); }
});
export const updateProfile = createAsyncThunk("auth/updateProfile", async (d, { rejectWithValue }) => {
  try { const { data } = await API.put("/auth/profile", d); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || "Update failed"); }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem("token"), loading: false, error: null },
  reducers: {
    logout(s) { localStorage.removeItem("token"); s.user = null; s.token = null; },
    clearError(s) { s.error = null; },
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(registerUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.token = a.payload.token; })
     .addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(loginUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.token = a.payload.token; })
     .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(loadUser.pending, (s) => { s.loading = true; })
     .addCase(loadUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; })
     .addCase(loadUser.rejected, (s) => { s.loading = false; s.user = null; s.token = null; })
     .addCase(updateProfile.fulfilled, (s, a) => { s.user = a.payload.user; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
