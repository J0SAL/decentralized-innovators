import IndexHeader from "../../components/Headers/IndexHeader";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import {
  AnonAadhaarProvider,
  useAnonAadhaar,
  LogInWithAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useEffect } from "react";

function UserOnBoard({ web3, accounts, contract }) {
  console.log("Web3 -- ", web3);
  console.log("Accounts - ", accounts);
  console.log("Contract - ", contract);

  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
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
