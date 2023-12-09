import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { LightNodeProvider } from "@waku/react";
import App from "./App";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
const NODE_OPTIONS = { defaultBootstrap: true };
const root = ReactDOM.createRoot(document.getElementById("root"));
const app_id = process.env.REACT_APP_APP_ID || "";

ReactDOM.render(
  <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
    <BrowserRouter>
      <LightNodeProvider options={NODE_OPTIONS}>
        <App />
      </LightNodeProvider>
    </BrowserRouter>
  </AnonAadhaarProvider>,
  document.getElementById("root")
);
