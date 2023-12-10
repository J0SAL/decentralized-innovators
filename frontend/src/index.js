import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { BrowserRouter } from "react-router-dom";
import { LightNodeProvider } from "@waku/react";
const NODE_OPTIONS = { defaultBootstrap: true };

const app_id = process.env.REACT_APP_APP_ID || "";

ReactDOM.render(
  <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AnonAadhaarProvider>,
  document.getElementById("root")
);
