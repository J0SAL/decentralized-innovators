import React, { useEffect,useState, useContext,useRef } from "react";

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
import { useHistory } from "react-router-dom";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

import axiosInstance from "../../../AxiosInstance";

function LoginPage() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [err,setErr] = useState();

  const { web3, accounts, contract } = useContext(BlockchainContext);
  const history = useHistory();

  useEffect(() => {
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
    console.log("web3", web3);
    console.log("accounts", accounts);
    console.log("contract", contract);
  }, []);

  const handleSubmit=(e)=>{
    
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('username', usernameRef.current.value);
    bodyFormData.append('password', passwordRef.current.value);
    // console.log(usernameRef.current.value,passwordRef.current.value)
    axiosInstance.post('login/',bodyFormData)
    .then((res)=>{
        // console.log(res)
        localStorage.setItem('username', usernameRef.current.value);
        localStorage.setItem('latitude', res.data.lat);
        localStorage.setItem('longitude', res.data.long);
        history.push('/dashboard')
    })
    .catch((err)=>{
        
        setErr(err.response.data)
    })
  }


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
                {err ? <h2>{err}</h2> : null}
                <Form className="form" onSubmit={handleSubmit}>
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
                        placeholder="Username"
                        type="text"
                        innerRef={usernameRef}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
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
                        placeholder="Password"
                        type="password"
                        innerRef={passwordRef}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   history.push(`/dashboard`);
                      // }}
                      size="lg"
                    >
                      Login
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
