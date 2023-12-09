import IndexHeader from "../../components/Headers/IndexHeader";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useEffect } from "react";

function UserOnBoard({ web3, accounts, contract }) {
  console.log("Web3 -- ", web3);
  console.log("Accounts - ", accounts);
  console.log("Contract - ", contract);

  const [anonAadhaar] = useAnonAadhaar();
  
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.pcd);
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
              <LogInWithAnonAadhaar />
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOnBoard;
