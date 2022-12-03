// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

interface INFTMinting {
    function balanceOf(
        address _address,
        uint256 _id
    ) external view returns (uint256);
}

import "@openzeppelin/contracts/access/Ownable.sol";

contract StateDAO is Ownable {
    string public stateName;
    uint256 public stateId;
    INFTMinting nftMinting;
    uint256 public totalNumberOfProposals;
    uint256 public votingPeriod = 60 seconds;
    uint256 public totalChild;

    enum Vote {
        Yes, // Yes = 0
        No // No = 1
    }

    struct Proposal {
        address proposedBy;
        string proposalType;
        string proposalTitle;
        uint256 timestamp;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 deadline;
        bool executed;
        mapping(address => bool) voters;
    }

    struct Child {
        uint256 childId;
        string chldName;
        address childDAO;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Child) public children;

    constructor(
        string memory _stateName,
        uint256 _stateId,
        address _nftMinting
    ) {
        stateName = _stateName;
        stateId = _stateId;
        nftMinting = INFTMinting(_nftMinting);
    }

    /* Modifiers */
    modifier isMemberOfState() {
        require(
            nftMinting.balanceOf(msg.sender, stateId) == 1,
            "Not the member of this state."
        );
        _;
    }

    modifier isProposalActive(uint256 proposalId) {
        require(proposals[proposalId].deadline >= block.timestamp);
        _;
    }

    modifier isProposalEnded(uint256 proposalId) {
        require(proposals[proposalId].deadline <= block.timestamp);
        _;
    }

    /* Functions */

    /*
        Function addState:
        This function will allow the owner(representative) of the DAO,
        to add the state.
    */
    function addChild(
        uint256 _childId,
        string memory _childName,
        address _childAddress
    ) public onlyOwner returns (uint256) {
        uint256 childId = totalChild;
        children[childId] = Child(_childId, _childName, _childAddress);
        totalChild += 1;
        return childId;
    }

    /*
        Function removeState:
        This function will allow the owner(representative) of the DAO,
        to remive the state. 
    */
    function removeState(uint256 _childId) public onlyOwner {
        delete children[_childId];
        totalChild -= 1;
    }

    /*
        Function createProposal:
        Allows the member of the state to create a proposal.
        It takes two parametes type of proposal and title of proposal.
    */
    function createProposal(
        string memory typeOfProposal,
        string memory proposalTitle
    ) public isMemberOfState returns (uint256) {
        uint256 proposalId = totalNumberOfProposals;
        Proposal storage proposal = proposals[proposalId];
        proposal.proposedBy = msg.sender;
        proposal.proposalType = typeOfProposal;
        proposal.proposalTitle = proposalTitle;
        proposal.timestamp = block.timestamp;
        proposal.deadline = block.timestamp + votingPeriod;
        totalNumberOfProposals += 1;
        return proposalId;
    }

    /*
        Function voteOnProposal: 
        Allows the member of state to vote on any active proposal.
    */
    function vote(
        uint256 proposalId,
        Vote _vote
    ) public isMemberOfState isProposalActive(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        uint256 numVotes = 0;
        address voter = msg.sender;
        if (proposal.voters[voter] == false) {
            numVotes = 1;
            proposal.voters[voter] = true;
        }
        require(numVotes == 1, "Already Voted");

        if (_vote == Vote.Yes) {
            proposal.yayVotes += 1;
        } else proposal.nayVotes += 1;
    }

    /*
        Function executeProposal:
        Allows the owner of state to execute the proposal.
    */
    function executeProposal(
        uint256 proposalId
    ) public isProposalEnded(proposalId) onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(
            !(keccak256(abi.encodePacked(proposal.proposalType)) ==
                keccak256(abi.encodePacked("ELECTION"))),
            "Proposal is for election!"
        );
        if (proposal.yayVotes > proposal.nayVotes) {
            proposal.executed = true;
        }
    }

    /*
        Function executeElectionResult:
        Allows the owner to execute the owner to execute the result of the elections.
    */
    function executeElectionResult(
        address _newOwner,
        uint256 _proposalId
    ) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            keccak256(abi.encodePacked(proposal.proposalType)) ==
                keccak256(abi.encodePacked("ELECTION")),
            "Proposal is not of election!"
        );
        transferOwnership(_newOwner);
        proposal.executed = true;
    }

    /* 
        Function setStateName: Allows the owner of the user to change the state name.
    */
    function setStateName(string memory _stateName) public onlyOwner {
        stateName = _stateName;
    }

    /*
        Function updateVotingPeriod: Can be used to update the voting period by owner.
        Test in remix
    */
    function updateVotingPeriod(
        uint256 _days,
        uint256 _hours,
        uint256 _minutes
    ) public {
        votingPeriod = _days * 86400 + _hours * 3600 + _minutes * 60;
    }
}
