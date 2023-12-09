import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import Home from "./Anonaadhar";

const app_id = process.env.REACT_APP_APP_ID || "";
//console

function App() {
  return (
    <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AnonAadhaarProvider>
  );
}

export default App;
