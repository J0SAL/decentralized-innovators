import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axiosInstance from "../../AxiosInstance";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#051367",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// function createData(sub, desc, wit, occur, created, score) {
//   return { sub, desc, wit, occur, created, score };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function Orders() {
  const [subcat, setSubcat] = useState("");
  const [occur, setOccur] = useState("");
  const [tips, setTips] = useState([]);

  const handleChangesubcat = (event) => {
    setSubcat(event.target.value);
  };

  const handleChangeoccur = (event) => {
    setOccur(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const form = new FormData();
    form.append("latitude", localStorage.getItem("latitude"));
    form.append("longitude", localStorage.getItem("longitude"));
    form.append("filter", "no");
    // axiosInstance.post("gettips/", form).then((res) => {
    //   console.log(res);
    //   setTips(res.data);
    // });

    const mockSetData = [
      {
        crime_subcategory: "Murder",
        crime_description: "Suspect held neighbour at gunpoint",
        tokens_staked: 5,
        latitude: 34.0522,
        longitude: -118.2437,
        rating: 0,
        personally_witnessed_or_not: 1,
        crime_occurrence: "2023-01-15T14:30:00Z",
        crimeLat: 34.0522,
        crimeLong: -118.2437,
        imageFileHash: "abc123def456ghi789",
      },
      {
        crime_subcategory: "Drug Trafficking",
        crime_description: "Drug Dealing",
        tokens_staked: 3,
        latitude: 78,
        longitude: 60,
        rating: 0,
        personally_witnessed_or_not: 1,
        crime_occurrence: "2023-12-10T12:00:00Z",
        crimeLat: 34.0522,
        crimeLong: -118.2437,
        imageFileHash: "abc123def456ghi789",
      },
    ];

    setTips(mockSetData);
  }, []);

  const handleFilter = async () => {
    setTips([]);
    const form = new FormData();
    form.append("filter", "yes");
    if (subcat) form.append("subcat", subcat);
    else form.append("subcat", "no");

    if (occur) form.append("occur", occur);
    else form.append("occur", "no");
    // axiosInstance.post("gettips/", form).then((res) => {
    //   console.log(res);
    //   setTips(res.data);
    // });
  };

  const handleApprove = (key) => {
    console.log(key);
    const form = new FormData();
    form.append("pk", key);
    // axiosInstance.put("gettips/", form).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <TableContainer component={Paper}>
      <div>
        <FormControl sx={{ m: 3, minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-helper-label"
            style={{ fontFamily: "Montserrat" }}
          >
            Crime Subcategory
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={subcat}
            label="Category"
            onChange={handleChangesubcat}
            style={{ fontFamily: "Montserrat" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Rape"}>Rape</MenuItem>
            <MenuItem value={"Money Laundering"}>Money Laundering</MenuItem>
            <MenuItem value={"Murder"}>Murder</MenuItem>
            <MenuItem value={"Drug Trafficking"}>Drug Trafficking</MenuItem>
            <MenuItem value={"Acid Attacks"}>Acid Attacks</MenuItem>
            <MenuItem value={"Human Trafficking"}>Human Trafficking</MenuItem>
            <MenuItem value={"Bribery"}>Bribery</MenuItem>
            <MenuItem value={"Child Labour"}>Child Labour</MenuItem>
            <MenuItem value={"Smuggling"}>Smuggling</MenuItem>
            <MenuItem value={"Tax Fraud"}>Tax Fraud</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 3, minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-helper-label"
            style={{ fontFamily: "Montserrat" }}
          >
            Solved
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={occur}
            label="Occurence"
            onChange={handleChangeoccur}
            style={{ fontFamily: "Montserrat" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"True"}>Yes</MenuItem>
            <MenuItem value={"False"}>No</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" sx={{ mt: 4 }} onClick={handleFilter}>
          Filter
        </Button>
      </div>

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ fontFamily: "Montserrat" }}>
              Crime Subcategory
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Description
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Personally Witnessed
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Crime Occurence
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Tip Created
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Tip Score
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Solved
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Approve
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontFamily: "Montserrat" }}>
              Chat
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tips
            ? tips.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.crime_subcategory}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.crime_description}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.personally_witnessed_or_not ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.crime_occurrence}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.tip_creation_timestamp}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.crime_score}
                  </StyledTableCell>

                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {row.solved_or_not ? "Yes" : "No"}
                  </StyledTableCell>

                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    <Checkbox
                      onClick={(e) => handleApprove(row.id)}
                      {...label}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    <Button
                      onClick={() => navigate("/chat")}
                      style={{
                        color: "white",
                        backgroundColor: "#051367",
                      }}
                    >
                      {"Chat"}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
