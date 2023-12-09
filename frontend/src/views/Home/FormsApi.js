import axios from "axios";
let check;
let tipid;
export function checkTip(tip) {
  axios
    .post("http://localhost:8000/tip_data/", {
      data: JSON.stringify(tip),
    })
    .then((response) => {
      // return response.data.ID;
      console.log("response data ID : ", response.data.ID);
      return response.data.ID;
    })
    // .then((response) => {
    //   axios
    //     .post("http://localhost:8000/spam_not_spam_crime/", {
    //       data: tip["crime_description"],
    //     })
    //     .then((response) => {
    //       check = response.data.Class;
    //       // console.log("this is check : ", check);
    //       // console.log("this is tipid : ", tipid);
    //       return { check: check, tipid: tipid };
    //     })
    //     .catch((err) => console.log(err));
    // })
    .catch((err) => console.log(err));

  //   const url = `http://localhost:8000/tip_data/`;
  //   return fetch(url, {
  //     mode: "no-cors",
  //     credentials: "same-origin",
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(tip),
  //   })
  //     .then((response) => {
  //       if (response.status === 201) {
  //         return response.json();
  //       } else {
  //         console.error(response.error);
  //       }
  //     })
  //     .catch((e) => console.error(JSON.stringify(e)));
}
