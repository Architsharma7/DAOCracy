import React ,{ useState, useEffect } from "react";
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { verificationABI, verificationAddress } from '../constants/constant';
import { useRouter } from 'next/router';

export default function Verification () {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [isVerified, setIsVerified] = useState(false);

  const verificationContract = useContract({
    address: verificationAddress,
    abi: verificationABI,
    signerOrProvider: signer || provider,
  });

  let router= useRouter();

   const VerifyAddress = async () => {
    try {
      const tx = await verificationContract.addAddressToWhitelist(address);
      await tx.wait();
      console.log(tx);
      alert('Citizen Verified !');
      setIsVerified(true);
      if(isVerified === true){
        router.push('/nftminting')
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

  // useEffect(() => {
  //   checkIfVerified();
  // }, [isConnected]);

  return (
    <div>
      <div className="flex justify-center mt-20 text-5xl font-semibold">
        <p>The New Form of Governance</p>
      </div>
      <div className="flex justify-center mt-20">
      <button className="bg-white text-black flex justify-center flex-col py-2 px-4 rounded-lg" onClick={VerifyAddress}> Verify Yourself</button>
      </div>
    </div>
  );
}

{/*  */}