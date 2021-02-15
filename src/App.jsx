import React from "react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import SimpleReactLightbox from 'simple-react-lightbox';

import "./config/ReactotronConfig";

import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import "./global.css";

import Routes from "./routes";
import history from "./services/history";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <SimpleReactLightbox>
          <Routes />
          <ToastContainer autoClose={5000} position="top-center" />
          </SimpleReactLightbox>
      </Router>
    </Provider>
  );
}
