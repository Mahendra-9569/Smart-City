import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
        <App />
        <Toaster position="top-center" />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);