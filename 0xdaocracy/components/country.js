import React, { useState, useEffect } from 'react';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { countryDAOABI, countryDAOAddress } from '../constants/constants';

export default function country() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [isVerified, setIsVerified] = useState(false);
  const [totalStates, setTotalStates] = useState(0);
  const [states, setStates] = useState([]);

  const countryDAOContract = useContract({
    address: countryDAOAddress,
    abi: countryDAOABI,
    signerOrProvider: signer || provider,
  });

  const addState = async () => {
    try {
      const tx = await countryDAOContract.addState(
        stateID,
        stateName,
        stateAddress
      );
      await tx.wait();
      console.log(tx);
      alert(
        `Added following State: \n State ID: ${stateId} \n State Name: ${stateName} \n State Address: ${stateAddress}`
      );
      await getTotalStatesPresent();
      await fetchAllStates();
    } catch (err) {
      console.error(err);
    }
  };

  const updateState = async () => {
    try {
      const tx = await countryDAOContract.updateState(
        stateID,
        stateName,
        stateAddress
      );
      await tx.wait();
      console.log(tx);
      alert(
        `Updates following details: \n State ID: ${stateId} \n State Name: ${stateName} \n State Address: ${stateAddress}`
      );
      await getTotalStatesPresent();
      await fetchAllStates();
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalStatesPresent = async () => {
    try {
      const tx = await countryDAOContract.totalStates();
      await tx.wait();
      console.log(tx);
      setTotalStates(tx);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllStates = async () => {
    try {
      const states = [];
      for (let i = 0; i < totalStates; i++) {
        const state = await fetchStateByID(i);
        states.push(states);
      }
      setStates(proposals);
      return proposals;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStateByID = async (id) => {
    try {
      const state = await countryDAOContract.states(id);
      const parsedState = {
        stateId: state.stateId.toString(),
        stateName: state.stateName,
        stateAddress: state.stateDAO,
      };
      console.log(parsedState);
      return parsedState;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTotalStatesPresent();
    fetchAllStates();
  }, []);

  return (
    <div>
      <p>Country DAO Page goes here !</p>
    </div>
  );
}
