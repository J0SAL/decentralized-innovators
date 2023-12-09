// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./TipToken.sol";
import "./EIP712MetaTransaction.sol";

contract TipOff is EIP712MetaTransaction("TipOff", "1") {
    event transferred(address sender, address receiver, uint amount);
    address payable admin;
    address approving_police;
    mapping(uint => TipToken) public tokencontractinstances;
    uint public contractsregistered = 0;

    mapping(address => string) public registeredTippers;
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

    mapping(address => uint) public userTipCount;
    mapping(address => uint) public policeTipCount;

    mapping(address => string[]) public userTipIds;
    mapping(address => string[]) public policeTipIds;

    mapping(address => mapping(string => Tipof)) public userToTips;
    mapping(address => mapping(string => Tipof)) public policeToTips;

    constructor() {
        admin = payable(msg.sender);
        approving_police = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
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
        // registeredTippers[aadharhash] = caller;
        registeredTippers[caller] = aadharhash;
        tokencontractinstances[instance].transfer_From(admin, caller, 10);
        emit transferred(admin, caller, 10);
    }

    function checkIfAlreadyRegistered() public view returns (bool) {
        return bytes(registeredTippers[msg.sender]).length > 0;
    }

    function tipoff(
        uint instance,
        string memory tipid,
        uint tipamt,
        address payable tipper,
        address police
    ) public payable {
        // require(msg.sender == approving_police, "not a police");
        Tipof memory tipdata = Tipof(tipid, 0, tipper);
        history[tipid] = tipdata;
        address contractadd = address(this);
        tokencontractinstances[instance].transfer_From(
            tipper,
            contractadd,
            tipamt
        );
        userTipCount[tipper] += 1;
        policeTipCount[police] += 1;

        userTipIds[tipper].push(tipid);
        policeTipIds[police].push(tipid);

        userToTips[tipper][tipid] = tipdata;
        policeToTips[police][tipid] = tipdata;

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

        address tipper = history[tipid].tipsender;

        userToTips[tipper][tipid].tipstatus = 2;
        policeToTips[approving_police][tipid].tipstatus = 2;
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

        userToTips[tipdata.tipsender][tipid].tipstatus = 1;
        policeToTips[approving_police][tipid].tipstatus = 1;
        history[tipid].tipstatus = 1;

        emit transferred(contractadd, tipdata.tipsender, tipamt + 1);
    }

    function getTipsByPoliceStation(
        address police
    ) public view returns (Tipof[] memory) {
        // TODO
        uint n = policeTipCount[police];

        Tipof[] memory tips = new Tipof[](n);
        for (uint i = 0; i < n; i++) {
            Tipof memory t = policeToTips[approving_police][
                policeTipIds[approving_police][i]
            ];
            tips[i] = t;
        }

        return tips;
    }

    function getTipsByUser() public view returns (Tipof[] memory) {
        // TODO
        uint n = userTipCount[msg.sender];

        Tipof[] memory tips = new Tipof[](n);
        for (uint i = 0; i < n; i++) {
            Tipof memory t = userToTips[msg.sender][userTipIds[msg.sender][i]];
            tips[i] = t;
        }

        return tips;
    }
}
