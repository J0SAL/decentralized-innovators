import lighthouse from "@lighthouse-web3/sdk";
import React, { useState } from "react";

// Sample response
// {
//   data: {
//     Name: 'shikamaru',
//     Hash: 'QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8',
//     Size: '91'
//   }
// }

const UploadTipData = () => {
  const [tipdesc, setTipDesc] = useState("");
  const [tipdate, setTipDate] = useState("");

  const handleDescriptionChange = (event) => {
    setTipDesc(event.target.value);
  };

  const handleDateChange = (event) => {
    setTipDate(event.target.value);
  };

  const submitForm = async () => {
    const apiKey = "dad6d995.4823dbcdd2df4626ae09473c4dfba268";
    const name = "tip1"; //Optional
    const text = { description: tipdesc, date: tipdate };

    const response = await lighthouse.uploadText(text, apiKey, name);

    console.log(response);
  };

  return (
    <>
      <div>UploadTipData</div>
      <p>Enter Crime Description</p>
      <input type="text" onChange={handleDescriptionChange} value={tipdesc} />

      <p>Enter Crime date</p>
      <input type="text" onChange={handleDateChange} value={tipdate} />

      <button onClick={submitForm}>Submit</button>
    </>
  );
};

export default UploadTipData;
