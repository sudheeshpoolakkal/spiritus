import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './App.jsx';

import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state/index.js";
import { Provider } from "react-redux";

const store = configureStore({
    reducer: {
        global: globalReducer,
    },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
