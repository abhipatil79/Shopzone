import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const createOrder = createAsyncThunk("orders/create", async (d, { rejectWithValue }) => {
  try { const { data } = await API.post("/orders", d); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message); }
});
export const payOrder = createAsyncThunk("orders/pay", async (id) => { const { data } = await API.post("/orders/" + id + "/pay"); return data; });
export const confirmPayment = createAsyncThunk("orders/confirm", async ({ orderId, paymentIntentId }) => {
  const { data } = await API.put("/orders/" + orderId + "/confirm", { paymentIntentId }); return data;
});
export const fetchMyOrders = createAsyncThunk("orders/fetchMine", async () => { const { data } = await API.get("/orders/mine"); return data; });
export const fetchOrderById = createAsyncThunk("orders/fetchById", async (id) => { const { data } = await API.get("/orders/" + id); return data; });
export const fetchAllOrders = createAsyncThunk("orders/fetchAll", async (params = {}) => {
  const q = new URLSearchParams(params).toString(); const { data } = await API.get("/orders?" + q); return data;
});
export const updateOrderStatus = createAsyncThunk("orders/updateStatus", async ({ id, status }) => {
  const { data } = await API.put("/orders/" + id + "/status", { status }); return data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], current: null, loading: false, error: null, page: 1, pages: 1 },
  reducers: { clearCurrentOrder(s) { s.current = null; } },
  extraReducers: (b) => {
    b.addCase(createOrder.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createOrder.fulfilled, (s, a) => { s.loading = false; s.current = a.payload.order; })
     .addCase(createOrder.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchMyOrders.pending, (s) => { s.loading = true; })
     .addCase(fetchMyOrders.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.orders; })
     .addCase(fetchMyOrders.rejected, (s) => { s.loading = false; })
     .addCase(fetchOrderById.pending, (s) => { s.loading = true; })
     .addCase(fetchOrderById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload.order; })
     .addCase(fetchOrderById.rejected, (s) => { s.loading = false; })
     .addCase(fetchAllOrders.fulfilled, (s, a) => { s.items = a.payload.orders; s.page = a.payload.page; s.pages = a.payload.pages; })
     .addCase(payOrder.fulfilled, (s, a) => { if (a.payload.order) s.current = a.payload.order; })
     .addCase(confirmPayment.fulfilled, (s, a) => { s.current = a.payload.order; })
     .addCase(updateOrderStatus.fulfilled, (s, a) => { s.current = a.payload.order; const i = s.items.findIndex((o) => o._id === a.payload.order._id); if (i !== -1) s.items[i] = a.payload.order; });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
