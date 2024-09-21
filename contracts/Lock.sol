// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MultiSig {
    address[] public approvers;
    mapping(address => bool) public approved;
    uint8 public approvalsCount;
    uint8 public requiredApprovals = 3;

    event ActionApproved(address approver);

    constructor() {
    
        approvers = [

            0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, // Approver 1
            0x90F79bf6EB2c4f870365E785982E1f101E93b906, // Approver 2
            0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65  // Approver 3
        ];
    }

    modifier onlyApprovers() {
        require(isApprover(msg.sender), "Not an approver");
        _;
    }

    function isApprover(address _address) public view returns (bool) {
        for (uint i = 0; i < approvers.length; i++) {
            if (approvers[i] == _address) return true;
        }
        return false;
    }

    function approveAction() public onlyApprovers {
        require(!approved[msg.sender], "Already approved");
        approved[msg.sender] = true;
        approvalsCount++;

        emit ActionApproved(msg.sender);
    }

    function executeAction() public view returns (bool) {
        return approvalsCount >= requiredApprovals;
    }
}
