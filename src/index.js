import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import store from "./store/";
import RouteHandler from "./routes/";
import './index.css';

render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouteHandler />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);