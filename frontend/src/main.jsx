import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { store } from "./store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 3000, style: { background: "#131921", color: "#fff", fontSize: "14px" } }} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
