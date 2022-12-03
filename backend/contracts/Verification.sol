// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/*
Contract Verification:
    This is the contract which will allow users to get whitelisted.
    Users once whitelisted will be able to mint the NFT's based on the location they belong.
*/

contract Verification is Ownable {
    // Total number of addresses whitelisted till now
    uint256 public numberOfAddresses;

    // Mapping to get the addresses whitelisted
    mapping(address => bool) whitelistedAddresses;

    function isWhitelisted(address _address) public view returns (bool) {
        return whitelistedAddresses[_address];
    }

    // Fucntion will map the address as true if adress is not whitelisted yet.
    // @param: address to be whitelisted
    function addAddressToWhitelist(address _address) public {
        require(!whitelistedAddresses[_address], "Adress already whitelisted!");
        whitelistedAddresses[_address] = true;
        numberOfAddresses = numberOfAddresses + 1;
    }

    // Function will be accessible to the owner of the contract only,
    // which will allow owner to remove the address if the NFT minted for the account has been burned
    // @param: address to be removed , boolean as true if NFT is burnt
    function removeAddressFromWhitelist(
        address _address,
        bool burnedNFT
    ) public onlyOwner {
        require(whitelistedAddresses[_address], "Address is not whitelist!");
        require(
            burnedNFT,
            "Please burn the NFT minted by address, before removing address"
        );
        delete whitelistedAddresses[_address];
        numberOfAddresses = numberOfAddresses - 1;
    }
}
