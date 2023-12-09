// import lighthouse from "@lighthouse-web3/sdk";
// import React, { useState } from "react";

// // Sample response
// // {
// //   data: {
// //     Name: 'shikamaru',
// //     Hash: 'QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8',
// //     Size: '91'
// //   }
// // }

// const UploadTipData = () => {
//   const [tipdesc, setTipDesc] = useState("");
//   const [tipdate, setTipDate] = useState("");

//   const handleDescriptionChange = (event) => {
//     setTipDesc(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setTipDate(event.target.value);
//   };

//   const submitForm = async () => {
//     const apiKey = "dad6d995.4823dbcdd2df4626ae09473c4dfba268";
//     const name = "tip1"; //Optional
//     const text = { description: tipdesc, date: tipdate };

//     const response = await lighthouse.uploadText(
//       JSON.stringify(text),
//       apiKey,
//       name
//     );

//     console.log(response);
//   };

//   const showAllUploads = async () => {
//     /*
//         @param {string} apiKey - Your API key.
//         @param {number} [pageNo=1] - The page number for pagination, defaults to 1.
//       */
//     const response = await lighthouse.getUploads(
//       "dad6d995.4823dbcdd2df4626ae09473c4dfba268"
//     );
//     console.log(response);

//     /* Sample response
//         {
//           data: {
//             fileList: [
//               {
//                 publicKey: '0x4e6d5be93ab7c1f75e30dd5a7f574f42f675eed3',
//                 fileName: 'sample.txt',
//                 mimeType: 'text/plain',
//                 txHash: '',
//                 status: 'queued',
//                 createdAt: 1691087810426,
//                 fileSizeInBytes: '14',
//                 cid: 'QmQK9V46b4vpNUd7pe7EcCqihBEmcSLH4NVNWukLJhGzgN',
//                 id: '1b2623bd-64ca-4434-8619-24c9a1eca840',
//                 lastUpdate: 1691087810426,
//                 encryption: false
//               }
//             ]
//           }
//         }
//       */
//   };

//   return (
//     <>
//       <div>UploadTipData</div>
//       <p>Enter Crime Description</p>
//       <input type="text" onChange={handleDescriptionChange} value={tipdesc} />

//       <p>Enter Crime date</p>
//       <input type="text" onChange={handleDateChange} value={tipdate} />

//       <button onClick={showAllUploads}>Submit</button>
//     </>
//   );
// };

// export default UploadTipData;

import React, { useEffect } from "react";
import axios from "axios";

const UploadTipData = () => {
  useEffect(() => {
    const apiUrl =
      "https://gateway.lighthouse.storage/ipfs/QmW9eHRyqYu6FEVmEY3bSgzdaUHq7tMUra3ds7mdKu7RvK";
    axios
      .get(apiUrl, { headers: {} })
      .then((response) => {
        // Assuming the text content is in the 'data' property
        const textContent = response.data;
        console.log(response);

        console.log(textContent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  return <div>UploadTipData</div>;
};

export default UploadTipData;
