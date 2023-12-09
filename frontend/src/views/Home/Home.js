import React from "react";

import Datetime from "react-datetime";
// reactstrap components
import {
  Button,
  FormGroup,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  DropdownItem,
} from "reactstrap";

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import DarkFooter from "../../components/Footers/DarkFooter.js";
import { useNavigate } from "react-router";

// sections for this page
import Images from "../index-sections/Images.js";

function Index() {
  const [modal1, setModal1] = React.useState(true);
  const [modal2, setModal2] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <Images /> */}
          <div className="section">
            <Container>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="title"
              >
                Electronic Tip Form
              </h1>
              <Modal
                className="modal-lg"
                modalClassName="bd-example-modal-lg"
                isOpen={modal1}
                toggle={() => setModal1(false)}
              >
                <div className="modal-header align-self-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setModal1(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Warning</h4>
                </div>
                <DropdownItem divider />

                <ModalBody>
                  <blockquote
                    style={{
                      backgroundColor: "#FADBD8",
                      borderWidth: "0px",
                    }}
                    className="blockquote"
                  >
                    <p
                      style={{
                        color: "black",
                        borderWidth: "0px",
                        fontFamily: "bold",
                      }}
                      className="mb-0"
                    >
                      You are about to access an Indian Government website.
                    </p>
                  </blockquote>
                  <blockquote
                    style={{
                      backgroundColor: "#F9E79F",
                      borderWidth: "0px",
                    }}
                    className="blockquote"
                  >
                    <p
                      style={{
                        color: "black",
                        borderWidth: "0px",
                        fontFamily: "bold",
                      }}
                      className="mb-0"
                    >
                      I understand that repeatedly submitting tips that lack
                      investigative value may lead to them being overlooked.
                    </p>
                  </blockquote>
                  {/* <blockquote
                    style={{
                      backgroundColor: "#F9E79F",
                      borderWidth: "0px",
                    }}
                    className="blockquote"
                  >
                    <p
                      style={{
                        color: "black",
                        borderWidth: "0px",
                        fontFamily: "bold",
                      }}
                      className="mb-0"
                    >
                      I understand that repeatedly providing tips with no
                      investigative value will result in my tips not being
                      considered.
                    </p>
                  </blockquote> */}
                </ModalBody>
                <div className="modal-footer">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => {
                      setModal1(false);
                      setModal2(true);
                    }}
                  >
                    I Agree
                  </Button>
                  <Button color="default" type="button">
                    I do not Agree
                  </Button>
                </div>
              </Modal>
              <Modal
                className="modal-lg"
                modalClassName="bd-example-modal-lg"
                isOpen={modal2}
                toggle={() => setModal2(false)}
              >
                <div className="modal-header align-self-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setModal2(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Warning</h4>
                </div>
                <DropdownItem divider />

                <ModalBody>
                  <blockquote
                    style={{
                      backgroundColor: "#FADBD8",
                      borderWidth: "0px",
                    }}
                    className="blockquote"
                  >
                    <p
                      style={{
                        color: "black",
                        borderWidth: "0px",
                        fontFamily: "bold",
                      }}
                      className="mb-0"
                    >
                      This website should not be used to report emergencies or
                      immediate threat to life.
                    </p>
                    <br />
                    <p
                      style={{
                        color: "black",
                        borderWidth: "0px",
                        fontFamily: "bold",
                      }}
                      className="mb-0"
                    >
                      For emergencies or immediate threat to life, call 100
                    </p>
                  </blockquote>
                </ModalBody>
                <div className="modal-footer">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => setModal2(false)}
                  >
                    I agree
                  </Button>
                  <Button color="default" type="button">
                    I do not agree
                  </Button>
                </div>
              </Modal>
              <h3 className="title">Note</h3>
              <blockquote className="blockquote ">
                <blockquote
                  style={{
                    backgroundColor: "#FADBD8",
                    borderWidth: "0px",
                  }}
                  className="blockquote"
                >
                  <p
                    style={{
                      color: "black",
                      borderWidth: "0px",
                      fontFamily: "bold",
                    }}
                    className="mb-0"
                  >
                    If this is an emergency, call 100. Do not submit this form.
                  </p>
                </blockquote>
                <blockquote className="blockquote ">
                  <p
                    style={{
                      color: "black",
                      borderWidth: "0px",
                      fontFamily: "bold",
                    }}
                    className="mb-0"
                  >
                    <ul>
                      {/* <li>
                        lease submit a tip.
                      </li> */}
                      <li>Be specific while providing information.</li>
                      <li>Submit your information only once.</li>
                    </ul>
                  </p>
                </blockquote>
              </blockquote>
              <div
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  display: "flex",
                }}
              >
                <Button
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/mental`);
                  }}
                >
                  Next
                </Button>
              </div>
            </Container>
          </div>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
