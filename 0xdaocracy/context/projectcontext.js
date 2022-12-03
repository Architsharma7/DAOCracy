import { useConnect, useDisconnect, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import React from "react";
import { createContext } from "react";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const { address, isConnected ,isDisconnected } = useAccount();


  useEffect(() => {
    if (isConnected === true) {
      setCurrentAccount(address);
    }
  }, [address, isConnected]);

  return(
    <ProjectContext.Provider
    value={{
        address,
    }}>
        {children}
    </ProjectContext.Provider>
  )
};

// const { connect } = useConnect({
//     connector: new InjectedConnector(),
//   });
//   const { disconnect } = useDisconnect();
//   const { address, isConnected } = useAccount();

//   return(
//     <div></div>
//   )
