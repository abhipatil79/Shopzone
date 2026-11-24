import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchCart = createAsyncThunk("cart/fetch", async () => { const { data } = await API.get("/cart"); return data; });
export const addToCart = createAsyncThunk("cart/add", async ({ productId, quantity }) => { const { data } = await API.post("/cart", { productId, quantity }); return data; });
export const updateCartItem = createAsyncThunk("cart/update", async ({ productId, quantity }) => { const { data } = await API.put("/cart/" + productId, { quantity }); return data; });
export const removeFromCart = createAsyncThunk("cart/remove", async (productId) => { const { data } = await API.delete("/cart/" + productId); return data; });
export const clearCart = createAsyncThunk("cart/clear", async () => { await API.delete("/cart"); return []; });

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: false, error: null },
  reducers: { resetCart(s) { s.items = []; } },
  extraReducers: (b) => {
    const set = (s, a) => { s.loading = false; s.items = a.payload.cart?.items || a.payload || []; };
    b.addCase(fetchCart.pending, (s) => { s.loading = true; })
     .addCase(fetchCart.fulfilled, set)
     .addCase(fetchCart.rejected, (s) => { s.loading = false; })
     .addCase(addToCart.fulfilled, set)
     .addCase(updateCartItem.fulfilled, set)
     .addCase(removeFromCart.fulfilled, set)
     .addCase(clearCart.fulfilled, (s) => { s.items = []; });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
