import React, { useState, useEffect } from 'react';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import {
  verificationABI,
  verificationAddress,
  nftMintingABI,
  nftMintingAddress,
} from '../constants/constant';
import { useRouter } from 'next/router';

export default function Verification() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [isVerified, setIsVerified] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const verificationContract = useContract({
    address: verificationAddress,
    abi: verificationABI,
    signerOrProvider: signer || provider,
  });

  const nftMintingContract = useContract({
    address: nftMintingAddress,
    abi: nftMintingABI,
    signerOrProvider: signer || provider,
  });

  let router = useRouter();

  const VerifyAddress = async () => {
    try {
      const tx2 = await verificationContract.isWhitelisted(address);
      // await tx2.wait();
      if (tx2) {
        redirect();
      } else {
        const tx = await verificationContract.addAddressToWhitelist(address);
        await tx.wait();
        console.log(tx);
        alert('Citizen Verified !');
        setIsVerified(true);
        const tx1 = await nftMintingContract.mintForCountry();
        await tx1.wait();
        console.log(tx1);
        alert('Minted NFT for Country!');
        setIsMinted(true);
        if (isVerified) {
          router.push('/nftminting');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Only Owner can view this button.
  const removeVerifiedAddress = async () => {
    try {
      const tx = await verificationContract.removeAddressFromWhitelist(address);
      await tx.wait();
      console.log(tx);
      alert('Citizen Removed !');
    } catch (err) {
      console.error(err);
    }
  };

  // Button will be visible to all.
  // Need to get the string to pass it to the user.
  const checkIfVerified = async () => {
    try {
      const tx = await verificationContract.isWhitelisted(address);
      await tx.wait();
      console.log(tx);
      if (tx) {
        setIsVerified(true);
        alert('Citizen Found');
      } else {
        setIsVerified(false);
        alert('Citizen not found');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    renderButton();
  }, []);

  function redirect() {
    router.push('/nftminting');
  }

  const renderButton = () => {
    if (isMinted) {
      return (
        <button
          className="bg-white text-black flex justify-center flex-col py-2 px-4 rounded-lg"
          onClick={redirect}
        >
          {' '}
          Dashboard
        </button>
      );
    } else {
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-20 text-5xl font-semibold">
        <h1>The New Form of Governance</h1>
      </div>
      <div className="flex justify-center mt-20">
        <button
          className="bg-white text-black flex justify-center flex-col py-2 px-4 rounded-lg"
          onClick={VerifyAddress}
        >
          {' '}
          Verify Yourself
        </button>
      </div>
    </div>
  );
}

{
  /*  */
}
