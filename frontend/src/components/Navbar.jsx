import ConnectWallet from "./ConnectWallet";


function Navbar({currentPage, setCurrentPage, isUserRegistered, isConnected}) {
    const navItem = [
        {name: 'Home', page:'home', restricted:false},
        {name:'Posts', page:'posts', restricted:true},
        {name:'Friends', page:'friends', restricted:true},
        {name:'Chat', page:'chat', restricted:true},
        {name:'Tokens', page:'tokens', restricted:true},
    ]

    const handleNavClick = (page) => {
        const item = navItems.find(item => item.page === page);
        if(item.restricted && (!isConnected || !isUserRegistered)) {
            setCurrentPage('home');
        } else {
            setCurrentPage('page')
        }
    }

    return (
         <nav className="w-full bg-blue-700 shadow-lg p-4 flex items-center justify-between flex-wrap rounded-b-xl">
      {/* Brand/Title */}
      <div className="flex items-center flex-shrink-0 text-white mr-6 mb-2 md:mb-0">
        <span className="font-semibold text-2xl tracking-tight">DApp Social Hub</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow flex justify-center order-3 md:order-2 w-full md:w-auto mt-4 md:mt-0">
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base
                ${currentPage === item.page ? 'bg-blue-500 text-white shadow-md' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Wallet Connect Button - Aligned to the right, responsive */}
      <div className="order-2 md:order-3 w-full md:w-auto flex justify-end mt-2 md:mt-0">
        <ConnectWallet />
      </div>
    </nav>
    )
}

export default Navbar;