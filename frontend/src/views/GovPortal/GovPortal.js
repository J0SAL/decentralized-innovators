import React, { Component } from "react";

import TipToken from "../../abis/TipToken.json";

import Web3 from "web3";

export default class GovPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiptoken: null,
      contractaddress: "",
    };

    //this.onFind = this.onFind.bind(this);
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        console.log(window.web3);
        //console.log(web3.eth.getAccounts());
        // Acccounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log(window.web3);
      // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    window.ethereum.on(
      "accountsChanged",
      function (accounts) {
        // Time to reload your interface with accounts[0]!
        alert("Account changed");
        this.setState({ account: accounts[0] });
      }.bind(this)
    );

    //console.log(web3);
    console.log(accounts);
    //
    const networkId = await web3.eth.net.getId();
    const networkdata = TipToken.networks[networkId];
    if (networkdata) {
      const tiptoken = new web3.eth.Contract(TipToken.abi, networkdata.address);

      this.setState({ tiptoken });
      console.log("TipToken=", this.state.tiptoken);
    }
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Gov Portal</h1>
        <form>
          <input
            type="text"
            value={this.state.contractaddress}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
