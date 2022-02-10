// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Donation {
    address private owner;
    mapping(address => uint) private donators;
    address[] private donatorsList;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function makeDonation() public payable {
        if (donators[msg.sender] == 0) {
            donatorsList.push(msg.sender);
        }
        donators[msg.sender] = calcDonation(donators[msg.sender], msg.value);
    }

    function calcDonation(uint balance, uint amount) public pure returns(uint) {
        (bool success, uint newBalance) = SafeMath.tryAdd(balance, amount);

        if (success) {
            return newBalance;
        } else {
            return balance;
        }
    }

    function withdrawal(address payable _to, uint _amount) public onlyOwner {
        (bool success, ) = _to.call{value: _amount}("");
        require (success, "Failed to send Ether");
    }

    function viewDonators()  public view returns(address[] memory){
        return donatorsList;
    }

    function donationOf(address addr) public view returns(uint) {
        return donators[addr];
    }
}
