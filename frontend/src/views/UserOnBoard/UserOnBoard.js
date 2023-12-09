import IndexHeader from "../../components/Headers/IndexHeader";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import {
  AnonAadhaarProvider,
  useAnonAadhaar,
  LogInWithAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useNavigate } from "react-router";
import randomstring from "randomstring";
import { sha256 } from "js-sha256";
import { useEffect } from "react";
import { getTableRowUtilityClass } from "@mui/material";
import { ERR_INVALID_RESPONSE } from "web3-errors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserOnBoard({ web3, accounts, contract }) {
  console.log("Web3 -- ", web3);
  console.log("Accounts - ", accounts);
  console.log("Contract - ", contract);

  const [anonAadhaar] = useAnonAadhaar();
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Account Verified Successfully! Tokens transferred!");

  const onboarduser = async (aadharhash) => {
    await contract.methods.onboard(0, aadharhash, accounts[0]);
  };

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar);
    if (anonAadhaar.status == "logging-in") {
      let aadharhash = sha256(randomstring.generate());
      console.log(aadharhash);

      // call the onboard function here and transfer of 10 tip tokens happen here

      onboarduser(aadharhash);

      const delay = 6000; // 5 seconds in milliseconds
      setTimeout(() => {}, delay);
      notify();
      setTimeout(() => {
        navigate("/mental");
      }, delay);
    }
  }, [anonAadhaar]);

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <IndexHeader />
        <div className="main">
          <div
            className="AnnonLogin"
            style={{
              paddingTop: 20,
            }}
          >
            <center>
              <AnonAadhaarProvider
                _appId={process.env.REACT_APP_APP_ID || ""}
                _testing={false}
              >
                <LogInWithAnonAadhaar />
                <p>{anonAadhaar?.status}</p>

                {/* Render the proof if generated and valid */}
                {anonAadhaar?.status === "logged-in" && (
                  <>
                    <p>✅ Proof is valid</p>
                    <AnonAadhaarProof
                      code={JSON.stringify(anonAadhaar.pcd, null, 2)}
                    />
                  </>
                )}
              </AnonAadhaarProvider>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOnBoard;
