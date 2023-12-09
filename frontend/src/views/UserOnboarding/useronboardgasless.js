import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Biconomy } from "@biconomy/mexa";
import Web3 from "web3";
let sigUtil = require("eth-sig-util");
const { config } = require("./config");

const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "verifyingContract", type: "address" },
  { name: "salt", type: "bytes32" },
];
//{ name: "chainId", type: "uint256" },
const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" },
  { name: "functionSignature", type: "bytes" },
];

let domainData = {
  name: "TipOff",
  version: "1",
  verifyingContract: config.contract.address,
  salt: "0x" + (80001).toString(16).padStart(64, "0"),
};

let web3;
let walletweb3;
let contract;

function Useronboardgasless() {
  const [aadharhash, setAadharhash] = useState("abc123");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [metaTxEnabled, setMetaTxEnabled] = useState(true);
  useEffect(() => {
    console.log("Initialized");
    const init = async () => {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        // Ethereum user detected. You can now use the provider.
        const provider = window["ethereum"];
        await provider.enable();
        if (provider.networkVersion === "80001") {
          domainData.chainId = 80001;

          const biconomy = new Biconomy(provider, {
            apiKey: "pC7UHry1O.eceed70e-7dbe-4a63-b2f5-e24c947dcef4",
            debug: true,
          });
          web3 = new Web3(biconomy);
          walletweb3 = new Web3(provider);
          biconomy
            .onEvent(biconomy.READY, () => {
              console.log("Mexa is ready!");
              // Initialize your dapp here like getting user accounts etc
              contract = new web3.eth.Contract(
                config.contract.abi,
                config.contract.address
              );
              setSelectedAddress(provider.selectedAddress);

              provider.on("accountsChanged", function (accounts) {
                setSelectedAddress(accounts[0]);
              });
            })
            .onEvent(biconomy.ERROR, (error, message) => {
              // Handle error while initializing mexa
            });
        } else {
          showErrorMessage("Please change the network in metamask to Polygon");
        }
      } else {
        showErrorMessage("Metamask not installed");
      }
    };
    init();
  }, []);

  const onaadharhashChange = (event) => {
    setAadharhash(event.target.value);
  };

  const onSubmit = async (event) => {
    if (aadharhash !== "" && contract) {
      if (metaTxEnabled) {
        console.log("Sending meta transaction");
        let userAddress = selectedAddress;
        let nonce = await contract.methods.getNonce(userAddress).call();
        console.log("Aadhar hash=", aadharhash);
        let functionSignature = contract.methods
          .onboard(0, aadharhash.toString(), selectedAddress)
          .encodeABI();
        let message = {};
        message.nonce = parseInt(nonce);
        message.from = userAddress;
        message.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
          types: {
            EIP712Domain: domainType,
            MetaTransaction: metaTransactionType,
          },
          domain: domainData,
          primaryType: "MetaTransaction",
          message: message,
        });
        console.log(domainData);
        console.log(userAddress);
        web3.eth.currentProvider.send(
          {
            jsonrpc: "2.0",
            id: 999999999999,
            method: "eth_signTypedData_v4",
            params: [userAddress, dataToSign],
          },
          function (error, response) {
            console.info(`User signature is ${response.result}`);
            if (error || (response && response.error)) {
              showErrorMessage("Could not get user signature");
            } else if (response && response.result) {
              let { r, s, v } = getSignatureParameters(response.result);
              console.log(userAddress);
              console.log(JSON.stringify(message));
              console.log(message);
              console.log(getSignatureParameters(response.result));

              const recovered = sigUtil.recoverTypedSignature_v4({
                data: JSON.parse(dataToSign),
                sig: response.result,
              });
              console.log(`Recovered ${recovered}`);
              sendTransaction(userAddress, functionSignature, r, s, v);
            }
          }
        );
      } else {
        console.log("Sending normal transaction");
        contract.methods
          .onboard(0, aadharhash.toString(), selectedAddress)
          .send({ from: selectedAddress })
          .on("transactionHash", function (hash) {
            showInfoMessage(`Transaction sent to blockchain with hash ${hash}`);
          })
          .once("confirmation", function (confirmationNumber, receipt) {
            showSuccessMessage("Transaction confirmed");
          });
      }
    } else {
      showErrorMessage("Please enter the quote");
    }
  };

  const getSignatureParameters = (signature) => {
    if (!web3.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v,
    };
  };

  const showErrorMessage = (message) => {
    NotificationManager.error(message, "Error", 5000);
  };

  const showSuccessMessage = (message) => {
    NotificationManager.success(message, "Message", 3000);
  };

  const showInfoMessage = (message) => {
    NotificationManager.info(message, "Info", 3000);
  };

  const sendTransaction = async (userAddress, functionData, r, s, v) => {
    if (web3 && contract) {
      try {
        let gasLimit = await contract.methods
          .executeMetaTransaction(userAddress, functionData, r, s, v)
          .estimateGas({ from: userAddress });
        let gasPrice = await web3.eth.getGasPrice();
        console.log(gasLimit);
        console.log(gasPrice);
        let tx = contract.methods
          .executeMetaTransaction(userAddress, functionData, r, s, v)
          .send({
            from: userAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
          });

        tx.on("transactionHash", function (hash) {
          console.log(`Transaction hash is ${hash}`);
          showInfoMessage(`Transaction sent by relayer with hash ${hash}`);
        }).once("confirmation", function (confirmationNumber, receipt) {
          console.log(receipt);
          showSuccessMessage("Transaction confirmed on chain");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="Useronboardgasless">
      <section>
        <div>
          <h1>
            <font color="white">Enter Aadhar Hash </font>
          </h1>
        </div>
      </section>
      <section>
        <div>
          <div>
            <input
              type="text"
              placeholder="AadharHash"
              onChange={onaadharhashChange}
              value={aadharhash}
            />
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </section>
      <NotificationContainer />
    </div>
  );
}

export default Useronboardgasless;
