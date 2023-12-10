// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import LandingPage from "./views/examples/LandingPage.js";
// import LoginPage from "views/examples/LoginPage.js";
// import ProfilePage from "views/examples/ProfilePage.js";
// import GovPortal from "views/GovPortal/GovPortal.js";
import Forms from "./views/Home/Forms.js";
import Home from "./views/Home/Home.js";
import Mental from "./views/Home/Mental.js";
// import Deposits from "views/Dashboard/Deposits";

import Index from "./views/Index.js";
// import NucleoIcons from "views/NucleoIcons.js";
// import PlacesSearchBar from "views/PlacesSearchBar/PlacesSearchBar";
import Web3, { ERR_INVALID_RESPONSE } from "web3";
import TipOff from "./abis/TipOff.json";
import BlockchainContext from "./context/BlockChainContext";
import Waku from "./views/Waku/Waku.js";

import { AnonAadhaarProvider } from "anon-aadhaar-react";
import UserOnBoard from "./views/UserOnBoard/UserOnBoard.js";
import { POLICE_ADDRESS } from "./assets/constants/Constants.js";
import Dashboard from "./views/Dashboard/Dashboard.js";
// import { gasless } from "./etherspot/gasless.js";
// import Map from "./views/Mao/Map-1.js";

const getWeb3 = async () => {
  let tempWeb3 = undefined;
  if (window.ethereum) {
    tempWeb3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      console.log("temp1 ", tempWeb3);
      // console.log(web3.eth.getAccounts());
      // Acccounts now exposed
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (tempWeb3) {
    tempWeb3 = new Web3(tempWeb3.currentProvider);
    console.log("temp2", tempWeb3);
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }

  return tempWeb3;
};

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState();
  const [redirectToOnboard, setUserOnboard] = useState();
  const [policeAccess, setPoliceAccess] = useState(false);

  const navigate = useNavigate();
  const app_id = process.env.REACT_APP_APP_ID || "";
  const crimeData = {
    crime_data: [
      {
        crime_subcategory: "Assault",
        latitude: 19.079,
        longitude: 72.8777,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1169,
        longitude: 72.9082,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1453,
        longitude: 72.9217,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.112,
        longitude: 72.9082,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0049,
        longitude: 72.8422,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1177,
        longitude: 72.8441,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1741,
        longitude: 72.8608,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0526,
        longitude: 72.8338,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0169,
        longitude: 72.8553,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1184,
        longitude: 72.8701,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0193,
        longitude: 72.8326,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0766,
        longitude: 72.8213,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0499,
        longitude: 72.8827,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0184,
        longitude: 72.8884,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0497,
        longitude: 72.9362,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.036,
        longitude: 72.8708,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0263,
        longitude: 72.8321,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0426,
        longitude: 72.8147,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.0727,
        longitude: 72.9022,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.084,
        longitude: 72.8969,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1312,
        longitude: 72.9117,
      },
      {
        crime_subcategory: "Robbery",
        latitude: 19.0866,
        longitude: 72.9074,
      },
      {
        crime_subcategory: "Burglary",
        latitude: 19.1178,
        longitude: 72.8504,
      },
      {
        crime_subcategory: "Drug Offense",
        latitude: 19.0633,
        longitude: 72.8678,
      },
      {
        crime_subcategory: "Fraud",
        latitude: 19.0221,
        longitude: 72.8477,
      },
      {
        crime_subcategory: "Theft",
        latitude: 19.0576,
        longitude: 72.8311,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1738,
        longitude: 72.9447,
      },
      {
        crime_subcategory: "Murder",
        latitude: 19.0729,
        longitude: 72.9083,
      },
      {
        crime_subcategory: "Kidnapping",
        latitude: 19.1275,
        longitude: 72.8495,
      },
      {
        crime_subcategory: "Cybercrime",
        latitude: 19.0067,
        longitude: 72.8335,
      },
      {
        crime_subcategory: "Sexual Offense",
        latitude: 19.0461,
        longitude: 72.8765,
      },
      {
        crime_subcategory: "Vandalism",
        latitude: 19.0654,
        longitude: 72.8917,
      },
      {
        crime_subcategory: "Pickpocketing",
        latitude: 19.1302,
        longitude: 72.9352,
      },
      {
        crime_subcategory: "Fraud",
        latitude: 19.0041,
        longitude: 72.8891,
      },
      {
        crime_subcategory: "Theft",
        latitude: 19.0625,
        longitude: 72.8373,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.164,
        longitude: 72.8212,
      },
      {
        crime_subcategory: "Drug Offense",
        latitude: 19.0836,
        longitude: 72.8489,
      },
      {
        crime_subcategory: "Robbery",
        latitude: 19.0382,
        longitude: 72.935,
      },
      {
        crime_subcategory: "Burglary",
        latitude: 19.0998,
        longitude: 72.8892,
      },
      {
        crime_subcategory: "Sexual Offense",
        latitude: 19.0192,
        longitude: 72.8584,
      },
      {
        crime_subcategory: "Vandalism",
        latitude: 19.0547,
        longitude: 72.8126,
      },
      {
        crime_subcategory: "Robbery",
        latitude: 19.0854,
        longitude: 72.9156,
      },
      {
        crime_subcategory: "Burglary",
        latitude: 19.0423,
        longitude: 72.9214,
      },
      {
        crime_subcategory: "Drug Offense",
        latitude: 19.1007,
        longitude: 72.8781,
      },
      {
        crime_subcategory: "Fraud",
        latitude: 19.0542,
        longitude: 72.8456,
      },
      {
        crime_subcategory: "Theft",
        latitude: 19.1196,
        longitude: 72.8489,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.053,
        longitude: 72.9337,
      },
      {
        crime_subcategory: "Murder",
        latitude: 19.0247,
        longitude: 72.8539,
      },
      {
        crime_subcategory: "Kidnapping",
        latitude: 19.1381,
        longitude: 72.8423,
      },
      {
        crime_subcategory: "Cybercrime",
        latitude: 19.0045,
        longitude: 72.8258,
      },
      {
        crime_subcategory: "Sexual Offense",
        latitude: 19.0419,
        longitude: 72.8708,
      },
      {
        crime_subcategory: "Vandalism",
        latitude: 19.1062,
        longitude: 72.9022,
      },
      {
        crime_subcategory: "Pickpocketing",
        latitude: 19.0598,
        longitude: 72.9187,
      },
      {
        crime_subcategory: "Fraud",
        latitude: 19.0097,
        longitude: 72.8954,
      },
      {
        crime_subcategory: "Theft",
        latitude: 19.0734,
        longitude: 72.8651,
      },
      {
        crime_subcategory: "Assault",
        latitude: 19.1609,
        longitude: 72.9328,
      },
      {
        crime_subcategory: "Drug Offense",
        latitude: 19.0776,
        longitude: 72.849,
      },
      {
        crime_subcategory: "Robbery",
        latitude: 19.0346,
        longitude: 72.9123,
      },
      {
        crime_subcategory: "Burglary",
        latitude: 19.1129,
        longitude: 72.9042,
      },
      {
        crime_subcategory: "Sexual Offense",
        latitude: 19.0137,
        longitude: 72.8785,
      },
      {
        crime_subcategory: "Vandalism",
        latitude: 19.0469,
        longitude: 72.8005,
      },
    ],
  };

  const init = async () => {
    // load web3
    const tempWeb3 = await getWeb3();
    // loadBlockchainData
    const tempAccounts = await tempWeb3.eth.getAccounts();
    const networkId = await tempWeb3.eth.net.getId();

    let TipOffcon;

    const listener = (accs) => {
      setAccounts(accs);
    };

    window.ethereum.on("accountsChanged", listener);

    console.log("tempWeb3", tempWeb3);
    console.log("tempWeb3", tempAccounts);
    console.log("networkId", networkId);

    const networkdata = TipOff.networks[networkId];
    if (networkdata) {
      const abi = TipOff.abi;
      TipOffcon = new tempWeb3.eth.Contract(abi, networkdata.address);

      setContract(TipOffcon);
      setWeb3(tempWeb3);
      setAccounts(tempAccounts);
    }
  };

  const checkIfuserAlreadyregistered = async () => {
    let res = await contract?.methods.checkIfAlreadyRegistered().call();
    console.log("check user : ", res);
    return res;
  };

  //extend thi useeffec and set state
  useEffect(() => {
    // (async () => {
    //   if (accounts.length) {
    //     if (accounts[0] === POLICE_ADDRESS) {
    //       navigate("/police-dashboard");
    //       return;
    //     } else if (await checkIfuserAlreadyregistered()) {
    //       navigate("/mental");
    //       return;
    //     } else {
    //       navigate("/user-onboard");
    //     }
    //   }
    // })();
    // gasless(accounts[0]);
  }, [accounts]);

  useEffect(() => {
    init();
  }, []);

  console.log("contract address : ", contract?._address);
  console.log("account address: ", accounts[0]);
  return (
    <BlockchainContext.Provider value={{ web3, accounts, contract }}>
      <Routes>
        <Route
          path="/index"
          element={
            <Index web3={web3} accounts={accounts} contract={contract} />
          }
        />
        <Route
          path="/form"
          element={
            <Forms web3={web3} accounts={accounts} contract={contract} />
          }
        />

        {/* <Route
            path="/nucleo-icons"
            render={(props) => <NucleoIcons {...props} />}
          /> */}
        <Route path="/landing-page" element={<LandingPage />} />

        <Route
          path="/user-onboard"
          element={
            <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
              <UserOnBoard
                web3={web3}
                accounts={accounts}
                contract={contract}
              />
            </AnonAadhaarProvider>
          }
        />

        <Route
          path="/police-dashboard"
          element={
            <Dashboard
              policeAccess={policeAccess}
              web3={web3}
              accounts={accounts}
              contract={contract}
            />
          }
          action={(account) => {
            init();
            setPoliceAccess(true);
          }} //here check if user registred
        />

        <Route
          path="/chat"
          element={
            <Waku topicAddress={"xyz123"} userAddressProp={accounts[0]} />
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <Dashboard
              policeAccess={false}
              web3={web3}
              accounts={accounts}
              contract={contract}
            />
          }
        />

        {/* <Route
            path="/login-page"
            render={(props) => <LoginPage {...props} />}
          /> */}

        {/* <Route
            path="/govportal"
            render={(props) => <GovPortal {...props} />}
          /> */}

        <Route path="/mental" element={<Mental />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Forms />} />

        {/* <Route
            path="/user-login-page"
            render={(props) => <UserLoginPage {...props} />}
          /> */}

        {/* <Route
            path="/crime-hotspot"
            render={(props) => <Map crimeData={crimeData} />}
          /> */}

        {/* <Route
            path="/police-login-page"
            render={(props) => <PoliceLoginPage {...props} />}
          /> */}

        {/* <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          /> */}

        {/* <Route path="/placessearchbar" component={PlacesSearchBar} /> */}

        <Route from="/" to="/home" />
      </Routes>
    </BlockchainContext.Provider>
  );
};

export default App;
