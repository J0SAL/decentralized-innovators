import React, { useEffect, useState, useContext } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import BlockchainContext from "../../../context/BlockChainContext";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import Base64 from "crypto-js/enc-base64";
import SHA256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const { web3, accounts, contract } = useContext(BlockchainContext);
  const [alreadytipper, setAlreadytipper] = useState(false);
  const [aadhar, setAadhar] = React.useState();
  const [opt, setOtp] = React.useState();
  const [status, setStatus] = useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(() => {
    async function getData() {
      console.log("1web3", web3);
      console.log("1accounts", accounts);
      console.log("1contract", contract);
      const status = await contract.methods
        .checkIfAlreadyRegistered("abcd")
        .call();
      const contractss = await contract.methods.contractsregistered().call();
      console.log("registed=", contractss);
      console.log("status=", status);
      if (status === false) {
        console.log("Not a registered tipper");
        setStatus(false);
      } else {
        console.log("Registered tipper");
        setStatus(true);
      }
    }

    getData();
  }, [accounts, contract, web3]);

  const onboard = async () => {
    try {
      console.log("AAdhar", aadhar);
      console.log("onboard status=", status);
      const aadharhash = SHA256(aadhar);
      //console.log(SHA256(aadhar));

      //
      console.log("Current Account=", accounts[0]);
      const baseAadharhash = Base64.stringify(aadharhash);
      console.log("aadharhash=", baseAadharhash);
      var cipherAadhar = CryptoJS.AES.encrypt(
        baseAadharhash,
        "secret"
      ).toString();

      if (status === false) {
        await contract.methods
          .onboard(0, cipherAadhar, accounts[0])
          .send({ from: accounts[0] })
          .then((result) => {
            alert("User onboarded");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <IndexNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/police.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      {/* <img
                        alt="..."
                        src={require("assets/img/now-logo.png").default}
                      ></img> */}
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Aadhar.."
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        onChange={(event) => setAadhar(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="OTP.."
                        type="text"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        onChange={(event) => setOtp(event.target.value)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        onboard();
                      }}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
