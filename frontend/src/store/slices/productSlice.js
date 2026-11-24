import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchProducts = createAsyncThunk("products/fetchAll", async (params = {}, { rejectWithValue }) => {
  try { const q = new URLSearchParams(params).toString(); const { data } = await API.get("/products?" + q); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message); }
});
export const fetchProductById = createAsyncThunk("products/fetchById", async (id, { rejectWithValue }) => {
  try { const { data } = await API.get("/products/" + id); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message); }
});
export const fetchFeaturedProducts = createAsyncThunk("products/fetchFeatured", async () => {
  const { data } = await API.get("/products/featured"); return data;
});
export const fetchRelatedProducts = createAsyncThunk("products/fetchRelated", async (id) => {
  const { data } = await API.get("/products/" + id + "/related"); return data;
});
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const { data } = await API.get("/products/categories"); return data;
});
export const createProduct = createAsyncThunk("products/create", async (d, { rejectWithValue }) => {
  try { const { data } = await API.post("/products", d); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message); }
});
export const updateProduct = createAsyncThunk("products/update", async ({ id, productData }, { rejectWithValue }) => {
  try { const { data } = await API.put("/products/" + id, productData); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message); }
});
export const deleteProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue }) => {
  try { await API.delete("/products/" + id); return id; }
  catch (e) { return rejectWithValue(e.response?.data?.message); }
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], featured: [], related: [], categories: [], current: null, loading: false, error: null, page: 1, pages: 1, total: 0 },
  reducers: { clearCurrentProduct(s) { s.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => { s.loading = true; })
     .addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.products; s.page = a.payload.page; s.pages = a.payload.pages; s.total = a.payload.total; })
     .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchProductById.pending, (s) => { s.loading = true; })
     .addCase(fetchProductById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload.product; })
     .addCase(fetchProductById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchFeaturedProducts.fulfilled, (s, a) => { s.featured = a.payload.products; })
     .addCase(fetchRelatedProducts.fulfilled, (s, a) => { s.related = a.payload.products; })
     .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload.categories; })
     .addCase(createProduct.fulfilled, (s, a) => { s.items.unshift(a.payload.product); })
     .addCase(updateProduct.fulfilled, (s, a) => { const i = s.items.findIndex((p) => p._id === a.payload.product._id); if (i !== -1) s.items[i] = a.payload.product; })
     .addCase(deleteProduct.fulfilled, (s, a) => { s.items = s.items.filter((p) => p._id !== a.payload); });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
