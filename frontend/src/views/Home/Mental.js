import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import DarkFooter from "../../components/Footers/DarkFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Container,
  Modal,
  Row,
  Col,
  Alert,
} from "reactstrap";
// sections for this page

const Mental = () => {
  const [modal, setModal] = useState(false);
  const [img, setImg] = useState(false);
  const [imgSrc, setImgSrc] = useState();
  const [alert, setAlert] = useState(false);
  const [imgarr, setImgarr] = useState([]);
  const [showopt, setShowopt] = useState(false);
  const [dumarr1, setDumarr1] = useState([]);
  const [dumarr2, setDumarr2] = useState([]);
  const [dumarr3, setDumarr3] = useState([]);
  const [disparr, setDisparr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const dummy = (arr) => {
    console.log(arr);
    setShowopt(true);
    setImgarr(arr);
    setDumarr1([arr[3], arr[1], arr[0], arr[2]]);
    setDumarr2([arr[1], arr[3], arr[2], arr[0]]);
    setDumarr3([arr[2], arr[1], arr[0], arr[3]]);
    var fin = [0, 1, 2, 3];
    fin.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setDisparr(fin);
  };

  const startSlides = () => {
    let count = 0;
    const arr = [];
    let id = setInterval(slideshow, 3000);
    setModal(true);
    function slideshow() {
      let num = Math.floor(Math.random() * 30);
      if (count == 4) {
        clearInterval(id);
        setModal(false);
        setImg(false);
        dummy(arr);
      } else {
        count += 1;
        setImg(true);
        setImgSrc(`https://picsum.photos/id/${num}/500/400`);
        arr.push(`https://picsum.photos/id/${num}/500/400`);
      }
    }
  };

  const rightChoice = () => {
    navigate("/form");
  };

  const wrongChoice = () => {
    setAlert(true);
    navigate("/home");
  };

  const Optiona = (props) => (
    <Row className="pt-4">
      <Col className="ml-auto mr-auto" md="6" xl="2">
        <img className="rounded img-raised" src={props.dumarr1[0]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr1[1]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr1[2]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr1[3]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <Button
          color="primary"
          type="submit"
          onClick={wrongChoice}
          style={{ fontSize: "20px" }}
        >
          Select
        </Button>
      </Col>
    </Row>
  );

  const Optionb = (props) => (
    <Row className="pt-4">
      <Col className="ml-auto mr-auto" md="6" xl="2">
        <img className="rounded img-raised" src={props.dumarr2[0]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr2[1]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr2[2]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr2[3]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <Button
          color="primary"
          type="submit"
          onClick={wrongChoice}
          style={{ fontSize: "20px" }}
        >
          Select
        </Button>
      </Col>
    </Row>
  );

  const Optionc = (props) => (
    <Row className="pt-4">
      <Col className="ml-auto mr-auto" md="6" xl="2">
        <img className="rounded img-raised" src={props.dumarr3[0]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr3[1]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr3[2]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.dumarr3[3]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <Button
          color="primary"
          type="submit"
          onClick={wrongChoice}
          style={{ fontSize: "20px" }}
        >
          Select
        </Button>
      </Col>
    </Row>
  );

  const Optiond = (props) => (
    <Row className="pt-4">
      <Col className="ml-auto mr-auto" md="6" xl="2">
        <img className="rounded img-raised" src={props.imgarr[0]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.imgarr[1]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.imgarr[2]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <img className="rounded img-raised" src={props.imgarr[3]} />
      </Col>
      <Col className="ml-auto mr-auto" md="10" xl="2">
        <Button
          color="primary"
          type="submit"
          onClick={rightChoice}
          style={{ fontSize: "20px" }}
        >
          Select
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <div className="section section-basic" id="basic-elements">
            <Container>
              <div className="space-100"></div>

              {alert ? <Alert color="danger">Wrong choice!</Alert> : null}

              {!showopt ? (
                <Card className="text-center">
                  {/* <CardHeader className="mt-2">Featured</CardHeader> */}
                  <CardBody>
                    <CardTitle tag="h3">Image Slideshow Captcha</CardTitle>
                    <CardText style={{ fontWeight: "bold" }}>
                      On clicking the start button, a bunch of images will popup
                      on the screen. Remember the order of the slideshow.
                      <br />
                      Click the button when ready.
                    </CardText>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={startSlides}
                      style={{ fontSize: "20px" }}
                    >
                      Start
                    </Button>
                  </CardBody>
                  {/* <CardFooter className="text-muted mb-2">2 days ago</CardFooter> */}
                </Card>
              ) : (
                <>
                  <h2>Now Select the Correct Option :</h2>
                  <Row>
                    {disparr.map((item, index) => {
                      if (item == 0) {
                        return <Optiona key={index} dumarr1={dumarr1} />;
                      } else if (item == 1) {
                        return <Optionb key={index} dumarr2={dumarr2} />;
                      } else if (item == 2) {
                        return <Optionc key={index} dumarr3={dumarr3} />;
                      } else if (item == 3) {
                        return <Optiond key={index} imgarr={imgarr} />;
                      }
                    })}

                    {/* <Optionc dumarr3={dumarr3}/> */}
                  </Row>
                </>
              )}

              <Modal isOpen={modal} toggle={() => setModal(false)}>
                <div className="modal-header">
                  <h4 className="modal-title" id="exampleModalPopoversLabel">
                    Image
                  </h4>
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {img ? <img src={imgSrc} /> : null}
                </div>
              </Modal>
            </Container>
          </div>
        </div>
        <DarkFooter />
      </div>
    </>
  );
};

export default Mental;
