// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'

// const OtherNav = () => {
//     return (
//         <div className='flex justify-evenly w-[80%] bg-[#f8f9fa] m-auto items-center p-4 mt-6'>
//             <div>
//             <ul className="flex items-center gap-10">
//                     <li><NavLink to="/user/dashboard" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Dashboard</NavLink></li>
//                     <li><NavLink to="/user/gigs" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Gigs</NavLink></li>
//                     <li><NavLink to="/user/projects" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Orders</NavLink></li>
//                     <li><NavLink to="/user/task" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Project</NavLink></li>
//                     <li><NavLink to="/user/Messages" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Messages</NavLink></li>
//                     <li><NavLink to="/user/deposit" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Deposit</NavLink></li>
//                     <li><NavLink to="/user/Withdraw" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Withdraws</NavLink></li>
//                     <li><NavLink to="/user/transaction" className={({ isActive }) => isActive ? "text-[#e0740e] font-bold" : "text-[#000000b3] font-medium"}>Transactions</NavLink></li>
//                 </ul>
//             </div>
//             {/* <div>
//                 <button type='submit' className='font-semibold bg-[[#f78318]] mr-[55px] w-[70%] text-white p-[8px] rounded-[8px]'>Create Gigs</button>

//             </div> */}
//         </div>
//     )
// }

// export default OtherNav


// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'

// const OtherNav = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)

//     // Toggle the menu visibility
//     const toggleMenu = () => setIsMenuOpen(prev => !prev)

//     return (
//         <div className='flex justify-evenly w-[80%] bg-[#f8f9fa] m-auto items-center p-4 mt-6'>
//             <div className='w-full md:w-[auto]'>
                
//                 <button
//                     onClick={toggleMenu}
//                     className='font-semibold bg-[[#f78318]] text-white p-2 rounded-[8px] md:hidden'
//                 >
//                     {isMenuOpen ? 'Close Menu' : 'Open Menu'}
//                 </button>

//                 {/* Menu */}
//                 <div className={`md:block ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
//                     <ul className="flex flex-col md:flex-row items-center xl:gap-10 gap-5">
//                         <li>
//                             <NavLink
//                                 to="/user/dashboard"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Dashboard
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/user/gigs"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Gigs
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/user/projects"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Orders
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/user/task"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Project
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/user/Messages"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Messages
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/user/deposit"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Deposit
//                             </NavLink>
//                         </li>
//                         {/* <li>
//                             <NavLink
//                                 to="/user/Withdraw"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Withdraws
//                             </NavLink>
//                         </li> */}
//                         <li>
//                             <NavLink
//                                 to="/user/transaction"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-[#e0740e] font-bold' : 'text-[#000000b3] font-medium'
//                                 }
//                             >
//                                 Transactions
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default OtherNav


import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaTasks,
  FaBriefcase,
  FaShoppingCart,
  FaEnvelope,
  FaWallet,
  FaExchangeAlt,
} from 'react-icons/fa';

const OtherNav = () => {
  // Restore scroll position when component mounts
  useEffect(() => {
    const nav = document.querySelector(".scrollbar-hide");
    const savedScroll = sessionStorage.getItem("nav-scroll");
    if (nav && savedScroll) {
      nav.scrollLeft = parseInt(savedScroll);
    }
  }, []);

  // Save scroll position before navigation
  const handleNavClick = (e) => {
    const nav = document.querySelector(".scrollbar-hide");
    if (nav) {
      sessionStorage.setItem("nav-scroll", nav.scrollLeft);
    }
  };

  return (
    <div className="bg-white shadow-md py-3 border-t-1 border-neutral-200">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          <ul className="flex items-center space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
            <NavLink
              to="/user/dashboard"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaHome className="text-lg" /> <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/user/gigs"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaBriefcase className="text-lg" /> <span>Gigs</span>
            </NavLink>

            <NavLink
              to="/user/projects"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaShoppingCart className="text-lg" /> <span>Orders</span>
            </NavLink>

            <NavLink
              to="/user/task"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaTasks className="text-lg" /> <span>Project</span>
            </NavLink>

            <NavLink
              to="/user/Messages"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaEnvelope className="text-lg" /> <span>Messages</span>
            </NavLink>

            <NavLink
              to="/user/deposit"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaWallet className="text-lg" /> <span>Deposit</span>
            </NavLink>

            <NavLink
              to="/user/transaction"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-[#f78318] font-semibold border-b-2 border-[#f78318] pb-1 flex items-center gap-2"
                  : "text-gray-700 font-medium hover:text-[#f78318] transition-colors flex items-center gap-2"
              }
            >
              <FaExchangeAlt className="text-lg" /> <span>Transactions</span>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OtherNav;
