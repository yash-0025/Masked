import { useState, useRef, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const metamaskConnector = injected();
  const walletConnectConnector = walletConnect({
    projectId: import.meta.env.VITE_WALLET_PROJECT_ID,
  });

  const shorten = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-300 hover:to-cyan-400 transition-all"
      >
        {isConnected ? shorten(address) : "Connect Wallet"}
        <svg
          className="ml-2 w-4 h-4 transform transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-gray-900 border border-gray-700 ring-1 ring-black ring-opacity-5 transition">
          <div className="py-2 text-white text-sm">
            {isConnected ? (
              <button
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-xl transition"
              >
                Disconnect
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    connect({ connector: metamaskConnector });
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-xl transition"
                >
                  Connect MetaMask
                </button>
                <button
                  onClick={() => {
                    connect({ connector: walletConnectConnector });
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-xl transition"
                >
                  Connect WalletConnect
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
