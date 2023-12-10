// index.js or index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LightNodeProvider } from "@waku/react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
const NODE_OPTIONS = { defaultBootstrap: true };
// Ensure the root element exists in your HTML file
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found in the document");
}

const app_id = process.env.REACT_APP_APP_ID || "";

// Use createRoot from "react-dom/client"
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
        <LightNodeProvider options={NODE_OPTIONS}>
          <App />
        </LightNodeProvider>
      </AnonAadhaarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
