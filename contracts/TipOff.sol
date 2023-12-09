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

    function tipoff(
        uint instance,
        string memory tipid,
        uint tipamt,
        address payable tipper,
        address police
    ) public payable {
        require(msg.sender == approving_police, "not a police"); // temp
        Tipof memory tipdata = Tipof(tipid, 0, tipper);
        history[tipid] = tipdata;
        address contractadd = address(this);
        tokencontractinstances[instance].transfer_From(
            tipper,
            contractadd,
            tipamt
        );
        userToTips[tipper].push(tipdata);
        policeToTips[police].push(tipdata);
        emit transferred(tipper, contractadd, tipamt);
    }

    function rejectTip(
        uint instance,
        string memory tipid,
        uint tipamt
    ) public payable {
        require(msg.sender == approving_police, "not a police");
        address contractadd = address(this);
        tokencontractinstances[instance].transfer_From(
            contractadd,
            admin,
            tipamt
        );

        history[tipid].tipstatus = 2;
        emit transferred(contractadd, admin, tipamt);
    }

    function approveTip(
        uint instance,
        string memory tipid,
        uint tipamt
    ) public payable {
        require(msg.sender == approving_police, "not a police");
        Tipof memory tipdata = history[tipid];
        address contractadd = address(this);

        tokencontractinstances[instance].transfer_From(
            contractadd,
            tipdata.tipsender,
            tipamt + 1
        );

        history[tipid].tipstatus = 1;
        emit transferred(contractadd, tipdata.tipsender, tipamt + 1);
    }

    function getTipsByPoliceStation(
        address police
    ) public view returns (Tipof[] memory) {
        // TODO
        Tipof[] memory tips = userToTips[police];
        return tips;
    }

    function getTipsByUser() public view returns (Tipof[] memory) {
        // TODO
        Tipof[] memory tips = userToTips[msg.sender];
        return tips;
    }
}
