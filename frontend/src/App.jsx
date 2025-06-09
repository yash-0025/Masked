import './App.css';
import ConnectWallet from './components/ConnectWallet';

function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Morphing neon background shapes */}
      <div className="neon-shape shape-1" />
      <div className="neon-shape shape-2" />
      <div className="neon-shape shape-3" />

      {/* Foreground Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 tracking-tight leading-tight bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Masked
        </h1>
        <p className="text-lg opacity-80 mb-10">
          A decentralized social space glowing with freedom 🌐
        </p>
        <ConnectWallet />
      </div>
    </div>
  );
}

export default App;
