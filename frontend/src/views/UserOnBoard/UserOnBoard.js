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
    console.log("Heyy Onboard: ", aadharhash);

    console.log("accounts: ", accounts);

    try {
      let res0 = await contract.methods
        .registerNewContract("0x08D2B6999a4A71052323592B615643D4240D7e79")
        .send({ from: accounts[0] });

      let res = await contract.methods
        .onboard(0, aadharhash, accounts[0])
        .send({ from: accounts[0] });

      console.log("onboard: ", res);
    } catch (error) {
      console.error("Error during onboard: ", error);
    }
  };

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar);
    if (anonAadhaar.status == "logging-in") {
      let aadharhash = sha256(randomstring.generate());
      console.log("aadhar hash", aadharhash);

      // call the onboard function here and transfer of 10 tip tokens happen here

      onboarduser(aadharhash);

      const delay = 9000; // 9 seconds in milliseconds
      setTimeout(() => {
        notify();
      }, delay);

      setTimeout(() => {
        navigate("/mental");
      }, 1000);
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
              <LogInWithAnonAadhaar
                nullifierSeed={79517171215162240188220389730247835}
                fieldsToReveal={["revealGender"]}
              />
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOnBoard;
