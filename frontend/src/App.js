import logo from "./logo.svg";
import "./App.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const app_id = process.env.REACT_APP_APP_ID || "";

function App() {
  return (
    <AnonAadhaarProvider _appId={app_id} _testing={false}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </AnonAadhaarProvider>
  );
}

export default App;
