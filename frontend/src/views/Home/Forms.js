import React, { useState, useContext, useEffect } from "react";
// react plugin used to create switch buttons
// import Switch from "react-bootstrap-switch";
// plugin that creates slider
// import Slider from "nouislider";
import Datetime from "react-datetime";
import { checkTip } from "./FormsApi.js";
import PlacesSearchBar from "../PlacesSearchBar/PlacesSearchBar.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// reactstrap components
// import {
//   Label,
//   FormGroup,
//   Input,
//   Form,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Row,
//   Col,
//   Button,
//   ButtonGroup,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   Alert,
// } from "reactstrap";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlockchainContext from "../../context/BlockChainContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import DarkFooter from "../../components/Footers/DarkFooter.js";

// sections for this page
import Images from "../index-sections/Images.js";

const defaultTheme = createTheme();

function Index() {
  const { web3, accounts, contract } = useContext(BlockchainContext);

  const [leftFocus, setLeftFocus] = React.useState(false);
  const [rightFocus, setRightFocus] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [amt, setAmt] = useState(null);
  const [tipData, setTipData] = useState("");
  const [subcat, setSubcat] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState(new Date());

  let navigate = useNavigate();

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  useEffect(() => {
    console.log("web3", web3);
    console.log("accounts", accounts);
    console.log("contract", contract);
  }, []);

  const notify = () =>
    toast.success("Your tip has been successfully submitted!");

  // const loading = ()=>{
  //   toast.
  // }

  const spamtext = () => {
    toast.warning(
      "The crime description text does not seem to be correct! Try Again"
    );
  };

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
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const handleDate = (value, formattedValue) => {
    setDate(moment(value).format("YYYY-MM-DD HH:mm"));
  };

  const submitTip = async () => {
    try {
      // const tipid = 1; //only till now, but after django will generate
      console.log("Amount of token to stake=", amt);
      const tip = {};
      tip["crime_subcategory"] = subcat;
      tip["crime_description"] = tipData;
      tip["tokens_staked"] = amt;
      tip["latitude"] = latitude;
      tip["longitude"] = longitude;
      tip["rating"] = 0;
      tip["personally_witnessed_or_not"] = 1;
      tip["crime_occurrence"] = date;
      // tip["walletaddresshash"] = accounts[0];
      toast.loading("Submitting!", { closeOnClick: true });
      // axios
      //   .post("http://localhost:8000/tip_data/", {
      //     data: JSON.stringify(tip),
      //   })
      //   .then(async (response) => {
      //     // return response.data.ID;
      //     if (response.data.message) {
      //       spamtext();
      //       await sleep(5050);
      //       navigate.push("/home");
      //     } else {
      //       console.log("response data ID : ", response.data.ID);
      //       await contract.methods
      //         .tipoff(0, response.data.ID, amt, accounts[0])
      //         .send({ from: accounts[0] })
      //         .then(async (result) => {
      //           // alert("Tip submitted successfully");
      //           notify();
      //           await sleep(5050);
      //           navigate.push("/home");
      //           console.log("this us the result : ", result);
      //         });
      //     }
      //   });
      console.log("Final Tip submitted : ", tip);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <IndexNavbar />
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

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Electronic Form to Submit Tips
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="crimedesc"
                    label="Crime Description"
                    name="crimedesc"
                    autoComplete="Crime Description"
                    placeholder="Give a description of the crime you witnessed..."
                    onChange={(e) => {
                      setTipData(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-select-small-label">
                    Crime Category
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={subcat}
                    label="Crime Category"
                    onChange={(e) => {
                      setSubcat(e.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Rape"}>Rape</MenuItem>
                    <MenuItem value={"Money Laundering"}>
                      Money Laundering
                    </MenuItem>
                    <MenuItem value={"Murder"}>Murder</MenuItem>
                    <MenuItem value={"Drug Trafficking"}>
                      Drug Trafficking
                    </MenuItem>
                    <MenuItem value={"Acid Attacks"}>Acid Attacks</MenuItem>
                    <MenuItem value={"Human Trafficking"}>
                      Human Trafficking
                    </MenuItem>
                    <MenuItem value={"Bribery"}>Bribery</MenuItem>
                    <MenuItem value={"Child Labour"}>Child Labour</MenuItem>
                    <MenuItem value={"Smuggling"}>Smuggling</MenuItem>
                    <MenuItem value={"Tax Fraud"}>Tax Fraud</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>

      <div className="wrapper">
        {/* <IndexHeader /> */}
        <div className="main">
          <div className="section section-basic" id="basic-elements">
            <Container>
              <div className="space-70"></div>
              <div id="inputs" class="electronic-form">
                <h4 style={{ fontWeight: "bolder" }}>
                  Electronic Form to Submit Tips
                </h4>
                <div class="electronic-form-inputs">
                  <Row>
                    <Form>
                      <FormGroup>
                        <label htmlFor="exampleFormControlTextarea1">
                          Crime Description
                        </label>
                        <Input
                          id="exampleFormControlTextarea1"
                          rows="2"
                          type="textarea"
                          placeholder="Give a description of the crime you witnessed..."
                          onChange={(e) => {
                            setTipData(e.target.value);
                          }}
                        ></Input>
                      </FormGroup>

                      {/* <label>Pick the Crime Category</label> */}

                      <UncontrolledDropdown>
                        <ButtonGroup>
                          <Button color="primary" type="button">
                            Crime Category
                          </Button>
                          <DropdownToggle
                            aria-expanded={false}
                            aria-haspopup={true}
                            caret
                            className="dropdown-toggle-split"
                            color="primary"
                            data-toggle="dropdown"
                            type="button"
                          >
                            <span className="sr-only">Crime Category</span>
                          </DropdownToggle>
                        </ButtonGroup>
                        <DropdownMenu aria-labelledby="dropdownMenuButton">
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Rape")}
                          >
                            Rape
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Money Laundering")}
                          >
                            Money Laundering
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Murder")}
                          >
                            Murder
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Drug Trafficking")}
                          >
                            Drug Trafficking
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Acid Attacks")}
                          >
                            Acid Attacks
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Human Trafficking")}
                          >
                            Human Trafficking
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Bribery")}
                          >
                            Bribery
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Child Labour")}
                          >
                            Child Labour
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Smuggling")}
                          >
                            Smuggling
                          </DropdownItem>
                          <DropdownItem
                            // href="#pablo"
                            onClick={(e) => setSubcat("Tax Fraud")}
                          >
                            Tax Fraud
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>

                      <FormGroup>
                        <label>Personally Witnessed?</label>
                        <br></br>
                        <Switch
                          offColor=""
                          offText=""
                          onColor="orangered"
                          onText=""
                        ></Switch>
                      </FormGroup>

                      <FormGroup>
                        <label>Date of Crime</label>
                        <Datetime
                          inputProps={{
                            placeholder: "Datetime Picker Here",
                          }}
                          value={date}
                          onChange={(v, f) => handleDate(v, f)}
                        />
                      </FormGroup>

                      {/* <FormGroup>
                      <label>Nearest Police Station</label>

                      <Input
                        defaultValue=""
                        placeholder="Eg. Borivali West"
                        type="text"
                      ></Input>
                    </FormGroup> */}

                      <FormGroup>
                        <label>Crime Location</label>

                        <PlacesSearchBar />
                      </FormGroup>

                      <FormGroup>
                        <label>No of Tokens at Stake</label>

                        <Input
                          defaultValue=""
                          placeholder="Anything between 1 to 10"
                          type="text"
                          onChange={(event) => setAmt(event.target.value)}
                        ></Input>
                      </FormGroup>

                      {/* <FormGroup>
                      <label>Upload the Image</label>
                      <br></br>
                      <ButtonGroup>
                        <Button color="primary" type="button">
                          Select File
                        </Button>
                        <DropdownToggle
                          aria-expanded={false}
                          aria-haspopup={true}
                          caret
                          className="dropdown-toggle-split"
                          color="primary"
                          data-toggle="dropdown"
                          type="button"
                        >
                          <span className="sr-only">Crime Category</span>
                        </DropdownToggle>
                        <Input
                          type="file"
                          defaultValue=""
                          value={selectedFile}
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        ></Input>
                      </ButtonGroup>
                    </FormGroup> */}

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"></Input>
                          <span className="form-check-sign"></span>I certify all
                          the information are correct.
                        </Label>
                      </FormGroup>
                      <Button
                        color="primary"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          submitTip();
                        }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Row>
                </div>
              </div>
              {/* <Row id="checkRadios">
                <Col lg="3" sm="6">
                  <p className="category">Sliders</p>
                  <div className="slider" id="sliderRegular"></div>
                  <br></br>
                  <div
                    className="slider slider-primary"
                    id="sliderDouble"
                  ></div>
                </Col>
              </Row> */}
            </Container>
          </div>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
