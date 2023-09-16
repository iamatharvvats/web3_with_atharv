// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeadmansSwitch {
    address public own_address;
    uint256 public lastblock;

    constructor() {
        own_address = msg.sender;
        lastblock = block.number;
    }

    modifier onlyownercancall() {
        require(msg.sender == own_address, "Only the owner can call this function");
        _;
    }

    function still_alive() public onlyownercancall {
        lastblock = block.number;
    }

    function checking_lastblock() public view returns (bool) {
        return block.number - lastblock <= 10;
    }

    function transferBalance(address payable recipient) public onlyownercancall {
        require(!checking_lastblock(), "Still alive, cannot transfer funds yet");
        selfdestruct(recipient);
    }
}
