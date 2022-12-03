// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/* 
   Interface of WhiteList contract to let the whitelissted/Verified contrats,
   to mint the NFT.
 */
interface IWhitelist {
    function isWhitelisted(address) external view returns (bool);
}

/* 
    NFTMinting Contract: Allows people to mint the NFT based on there location.
*/
contract NFTMinting is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    bool public _paused;
    uint256 public stateCount;

    // Whitelist contract instance
    IWhitelist whiteList;

    // Modifier: It will used to pause the contract during emergency
    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract currently paused");
        _;
    }

    /*
        id:
            0 => Country NFT
            1 => State1 NFT 
            2 => State2 NFT 
            3 => State3 NFT 
            
    */
    constructor(
        address _whitelistedAddresses
    )
        ERC1155(
            "https://gateway.pinata.cloud/ipfs/Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/{id}.json"
        )
    {
        whiteList = IWhitelist(_whitelistedAddresses);
    }

    /* 
        Function SetURI can be used if the OLD URI needs to be updated.
    */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /*
        Function updateStateCount will be used by the owner to set the count of current states.
        Will be automating in future.
     */
    function upadteStateCount(uint256 _stateCount) public onlyOwner {
        stateCount = _stateCount;
    }

    /*
     Function mint takes id of the token to be minted,
     here the id will be used to mint the NFT based on location.
     EG: 1 for MP, 2 for MH, 3 for Karnataka etc...

     @SAURABH @ARCHIT @PRATHAMESH 
     We can check the balance of the address in frontend itself.
     We can run a for loop and check if the address has already,
     minted the address for anyone of the location. 
     If not then only allow to mint. 
     Else prompt with message that 
     "You already have NFT for <location name> state. 
      Please burn it incase you need to change the DAO."

    Before Mintitng make sure that State exist?

    */
    function mintForState(uint256 id) public onlyWhenNotPaused {
        require(whiteList.isWhitelisted(msg.sender), "Address not verified!");
        require(id > 0, "Invalid token ID!");
        require(id <= stateCount, "Invalid token ID!");
        for (uint256 i = 1; i <= stateCount; i++) {
            require(
                balanceOf(msg.sender, i) == 0,
                "Already Own NFT. Please burn it and try again!"
            );
        }
        _mint(msg.sender, id, 1, "");
    }

    /*
    Function mint for Country, should be triggred automatically 
    if the user does not already owns a Country NFT.
    We can do this in front-end itself.
    */
    function mintForCountry() public onlyWhenNotPaused {
        require(whiteList.isWhitelisted(msg.sender), "Address not verified!");
        require(balanceOf(msg.sender, 0) == 0, "Already have the Country NFT.");
        _mint(msg.sender, 0, 1, "");
    }

    /*
        Function _beforeTokenTransfer: 
            This function will make the NFT's soul-bound i.e Non-Tranferable
    */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) onlyWhenNotPaused {
        require(
            from == address(0) || to == address(0),
            "You cannot transfer the Tokens."
        );
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    receive() external payable {}

    fallback() external payable {}
}
