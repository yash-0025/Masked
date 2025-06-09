import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="text-white">
      {isConnected ? (
        <div>
          <p>Wallet Connected!</p>
          <button>Disconnect Wallet</button>
        </div>
      ) : (
        <div>
          <button>Connect Metamask</button>
          <button>Connect WalletConnect</button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
