import React, { useState, useEffect } from 'react';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { nftMintingABI, nftMintingAddress } from '../constants/constant';

export default function NFTMinting() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [isVerified, setIsVerified] = useState(false);
  const [stateId, setStateId] = useState(0);
  const [totalStates, setTotalStates] = useState(0);
  const [updatedStateCount, setUpdatedStateCount] = useState(0);
  const [updatedNFTURI, setUpdatedNFTURI] = useState(0);

  const nftMintingContract = useContract({
    address: nftMintingAddress,
    abi: nftMintingABI,
    signerOrProvider: signer || provider,
  });

  const getTotalStateCount = async () => {
    try {
      const tx = await nftMintingContract.stateCount();
      await tx.wait();
      setTotalStates(tx);
      console.log(tx);
      alert(`There are ${tx} states.`);
    } catch (err) {
      console.error(err);
    }
  };

  const mintForState = async () => {
    try {
      for (i = 1; i <= totalStates; i++) {
        if ((await nftMintingContract.balanceOf(msg.sender, i)) == 0) {
          `Already Own NFT for state number ${i}. Please burn it and try again!`;
        }
      }
      const tx = await nftMintingContract.mintForState(stateId);
      await tx.wait();
      console.log(tx);
      alert('NFT Minted for State.');
    } catch (err) {
      console.error(err);
    }
  };

  const mintForCountry = async () => {
    try {
      if ((await nftMintingContract.balanceOf(msg.sender, 0)) == 0) {
        const tx = await nftMintingContract.mintForCountry();
        await tx.wait();
        console.log(tx);
        alert('NFT Minted for Country.');
      } else {
        alert(`Already own the country NFT.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStateCount = async () => {
    try {
      const tx = await nftMintingContract.upadteStateCount(updatedStateCount);
      await tx.wait();
      console.log(tx);
      alert(`Updated the States count to: ${updateStateCount}`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateNFTURI = async () => {
    try {
      const tx = await nftMintingContract.setURI(updatedNFTURI);
      await tx.wait();
      console.log(tx);
      alert(`Updated the States count to: ${updatedNFTURI}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isVerified) {
      mintForCountry();
    }
  }, [isConnected, isVerified]);

  return <div></div>;
}
