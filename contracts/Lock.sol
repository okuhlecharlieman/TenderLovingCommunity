// contracts/MultiSig.sol
pragma solidity ^0.8.0;

contract MultiSig {
    address[] public approvers;
    mapping(address => bool) public approved;
    uint8 public approvalsCount;
    uint8 public requiredApprovals = 3;

    event ActionApproved(address approver);

    constructor(address[] memory _approvers) {
        approvers = _approvers;
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
