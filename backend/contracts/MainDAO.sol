// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MainDAO is Ownable {
    string public countryName;
    uint256 public totalStates;
    struct State {
        uint256 stateId;
        string stateName;
        address stateDAO;
    }

    mapping(uint256 => State) public states;

    /*
        Constructor to set the Country Name during deployment.
    */
    constructor(string memory _countryName) {
        countryName = _countryName;
    }

    /*
        Function addState:
        This function will allow the owner(representative) of the DAO,
        to add the state.
    */
    function addState(
        uint256 _stateId,
        string memory _stateName,
        address _stateAddress
    ) public onlyOwner returns (uint256) {
        uint256 stateId = totalStates;
        states[stateId] = State(_stateId, _stateName, _stateAddress);
        totalStates += 1;
        return stateId;
    }

    /*
        Function updateState:
        This function will allow the owner(representative) of the DAO,
        to update the state. 
    */
    function updateState(
        uint256 _stateId,
        string memory _stateName,
        address _stateAddress
    ) public onlyOwner {
        states[_stateId] = State(_stateId, _stateName, _stateAddress);
    }
}
