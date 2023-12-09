import tipOffabijson from "../../abis/TipOff.json";
let config = {};
//5777 for ganache, 80001 for polygon mumbai testnet
const contractaddress = tipOffabijson.networks["11155111"].address;

config.contract = {
  address: contractaddress,
  abi: tipOffabijson.abi,
};

module.exports = { config };
