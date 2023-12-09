// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./TipToken.sol";
import "./EIP712MetaTransaction.sol";

contract TipOff is EIP712MetaTransaction("TipOff", "1") {
    event transferred(address sender, address receiver, uint amount);
    address payable admin;
    address approving_police;
    mapping(uint => TipToken) public tokencontractinstances;
    uint public contractsregistered = 0;

    mapping(string => address) public registeredTippers;
    /*
        0 - pending
        1 - approved
        2 - rejected
    */
    struct Tipof {
        string tipid;
        uint tipstatus;
        address payable tipsender;
    }

    mapping(string => Tipof) public history;
    mapping(address => Tipof[]) userToTips;
    mapping(address => Tipof[]) policeToTips;

    constructor() {
        admin = payable(msg.sender);
        approving_police = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    }

    function swapper(
        uint instance1,
        uint instance2,
        uint amounttoswap,
        address beneficiary
    ) public payable {
        tokencontractinstances[instance1].transfer_From(
            beneficiary,
            admin,
            amounttoswap
        );
        tokencontractinstances[instance2].transfer_From(
            admin,
            beneficiary,
            amounttoswap
        );
    }

    function registerNewContract(TipToken tokenContract) public payable {
        tokencontractinstances[contractsregistered] = tokenContract;
        contractsregistered += 1;
    }

    function onboard(
        uint instance,
        string memory aadharhash,
        address caller
    ) public payable {
        registeredTippers[aadharhash] = caller;
        tokencontractinstances[instance].transfer_From(admin, caller, 10);
        emit transferred(admin, caller, 10);
    }

    function checkIfAlreadyRegistered(
        string memory aadharhash
    ) public view returns (bool) {
        address walletaddress = registeredTippers[aadharhash];
        if (walletaddress == 0x0000000000000000000000000000000000000000) {
            return false;
        } else {
            return true;
        }
    }
}
