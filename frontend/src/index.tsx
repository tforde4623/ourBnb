import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Favicon from 'react-favicon';

import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import "./index.css";
import App from "./App";

// tmp test (change types obviously)
declare global {
  interface Window {
    csrfFetch: any,
    store: any,
    sessionActions: any
  }
}

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Favicon url='./favicon.ico?'/>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
