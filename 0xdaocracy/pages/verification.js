import React ,{ useState, useEffect } from "react";
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { verificationABI, verificationAddress } from '../constants/constant';

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

   const VerifyAddress = async () => {
    try {
      const tx = await verificationContract.addAddressToWhitelist(address);
      await tx.wait();
      console.log(tx);
      alert('Citizen Verified !');
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
    checkIfVerified();
  }, [isConnected]);

  return (
    <div>
      <p>Hey This is where people will be verified.</p>
      <div>
        <button className="bg-white text-black" onClick={VerifyAddress}> Verify Yourself</button>
      </div>
    </div>
  );
}
