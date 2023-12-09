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
import Switch from "@mui/material/Switch";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { POLICE_ADDRESS } from "../../assets/constants/Constants.js";

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import DarkFooter from "../../components/Footers/DarkFooter.js";

// sections for this page
import Images from "../index-sections/Images.js";

import lighthouse from "@lighthouse-web3/sdk";

const defaultTheme = createTheme();

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const [crimeLat, setCrimeLat] = useState("");
  const [crimeLong, setCrimeLong] = useState("");
  const [fileHash, setFileHash] = useState("");

  const handleCrimeLocation = (lat, long) => {
    setCrimeLat(lat);
    setCrimeLong(long);
  };

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

  const uploadFile = async (file) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(
      file,
      process.env.REACT_APP_LIGHTHOUSE_API_KEY,
      false,
      null
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
    setFileHash(output.data.Hash);
  };

  const uploadTipDataToLightHouse = async (tip) => {
    const text = JSON.stringify(tip);
    const apiKey = process.env.REACT_APP_LIGHTHOUSE_API_KEY;
    const response = await lighthouse.uploadText(text, apiKey);
    return response.data.Hash;
  };

  const submitTip = async (e) => {
    try {
      e.preventDefault();
      const tip = {};
      tip["crime_subcategory"] = subcat;
      tip["crime_description"] = tipData;
      tip["tokens_staked"] = amt;
      tip["latitude"] = latitude;
      tip["longitude"] = longitude;
      tip["rating"] = 0;
      tip["personally_witnessed_or_not"] = 1;
      tip["crime_occurrence"] = date;
      tip["crimeLat"] = crimeLat;
      tip["crimeLong"] = crimeLong;
      tip["imageFileHash"] = fileHash;
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
      let apiresponse = 2;
      if (apiresponse == 1) {
        let resp = await uploadTipDataToLightHouse(tip);

        await contract.methods
          .tipoff(0, resp, amt, accounts[0], POLICE_ADDRESS)
          .send({ from: accounts[0] });
      } else {
        spamtext();
      }
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
        <Container
          component="main"
          maxWidth="sm"
          style={{ marginTop: "100px" }}
        >
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
              onSubmit={submitTip}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel id="demo-select-small-label">
                    Crime Description
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="crimedesc"
                    name="crimedesc"
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
                    style={{ width: "400px" }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={subcat}
                    label="Crime Category"
                    onChange={(e) => {
                      setSubcat(e.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>Select the crime category</em>
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
                    control={<Switch defaultChecked />}
                    label="Have you personally witnessed the crime happening ?"
                  />
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Date of Crime Occurence"
                        onChange={(v, f) => handleDate(v, f)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="demo-select-small-label">
                  Crime Occurence Location
                </InputLabel>
                <PlacesSearchBar handleCrimeLocation={handleCrimeLocation} />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="demo-select-small-label">
                  Number of Tokens Staked
                </InputLabel>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="tokenstaked"
                  placeholder="Anything between 1 to 10"
                  name="tokenstaked"
                  onChange={(e) => {
                    setAmt(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-select-small-label">
                  Upload any Relevant Pictures
                </InputLabel>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => uploadFile(e.target.files)}
                  />
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: "20px" }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="I certify all the information is correct."
                />
              </Grid>

              <Button
                type="submit"
                style={{ width: "100px" }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Index;
