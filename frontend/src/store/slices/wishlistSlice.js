import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => { const { data } = await API.get("/users/wishlist"); return data; });
export const toggleWishlistItem = createAsyncThunk("wishlist/toggle", async (productId) => { const { data } = await API.post("/users/wishlist", { productId }); return data; });

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loading: false },
  reducers: { resetWishlist(s) { s.items = []; } },
  extraReducers: (b) => {
    b.addCase(fetchWishlist.pending, (s) => { s.loading = true; })
     .addCase(fetchWishlist.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.wishlist; })
     .addCase(fetchWishlist.rejected, (s) => { s.loading = false; })
     .addCase(toggleWishlistItem.fulfilled, (s, a) => { s.items = a.payload.wishlist; });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
