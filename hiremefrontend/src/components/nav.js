


// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import authConfig from "../api/config";
// import { Menu as MenuIcon, X, Search, User, BookOpen, Phone, Newspaper, LayoutDashboard, UserCircle2, LogOut } from "lucide-react";
// import {
//   Menu as HeadlessMenu,
//   MenuButton,
//   MenuItems,
//   MenuItem,
// } from "@headlessui/react";

// const Nav = ({ userDetails, taskId }) => {
//   console.log(userDetails, "userimage");
//   console.log(taskId, "taskId");

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const [searchTitle, setSearchTitle] = useState("");
//   console.log(searchTitle, "titleserach");

//   const [searchData, setSearchData] = useState([]);
//   console.log(searchData, "searchDatahome");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [profile,setProfiles] = useState({})
//   console.log(profile,"profile");
//   const [showSearchButton, setShowSearchButton] = useState(false);

//   const firstName = JSON.parse(localStorage.getItem("firstName"));

//   const authId = JSON.parse(localStorage.getItem("authId"))

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("authId");
//     localStorage.removeItem("firstName");
//     setIsLoggedIn(false);
//     toast.success("You have been logged out");
//     navigate("/");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchAllTask = async () => {
//       window.scrollTo(0, 0);
//       try {
//         const response = await authConfig.get("/search-on-tasks", {
//           params: { searchTitle },
//         });
//         if (response.status === 200) {
//           setSearchData(response.data.task);
//           const tasksData = response.data.task;
//           const taskId = tasksData[0];
//           if (searchTitle.length > 2) {
//             // Adjust length as needed for triggering navigation
//             navigate(`/featuredTaskDetailed/${taskId.taskCategoryId._id}`);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         // toast.error(error.response.data.message || "")
//       }
//     };

//     fetchAllTask();
//   }, [searchTitle, navigate]); // Ensure navigate is in the dependency array

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       window.scrollTo(0, 0);
//       try {
//         const response = await authConfig.get(`/found-profile/${authId}`);
//         if (response.status === 200) {
//           setProfiles(response.data.auth_profile.authProfile);
//         } else {
//           console.log("Error fetching Profile");
//         }
//       } catch (error) {
//         console.error("Error fetching Profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleSearchNavigation = () => {
//     if (searchData.length > 0) {
//       navigate(`/featuredTaskDetailed/${searchData[0].taskCategoryId._id}`);
//       setSearchTitle(""); // Clear search input after navigation
//       setSearchData([]); // Clear search data
//       setShowSearchButton(false); // Hide the button
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="flex items-center">
//               <img
//                 className="h-9 w-auto rounded-full xl:p-0 p-2"
//                 src={
//                   isLoggedIn
//                     ? "https://script.viserlab.com/metalance/assets/images/logo_icon/logo_dark.png" :"https://script.viserlab.com/metalance/assets/images/logo_icon/logo_dark.png"
//                 }
//                 alt="Logo"
//               />
             
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
//               aria-expanded={menuOpen}
//               aria-controls="mobile-menu"
//             >
//               <span className="sr-only">Open main menu</span>
//               {menuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <div className="relative rounded-md shadow-sm flex items-center bg-gray-100">
//               <div className="pointer-events-none pl-3 absolute inset-y-0 left-0 flex items-center">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className="bg-gray-100 border-none text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none py-2 pl-10 pr-4 rounded-md"
//                 type="search"
//                 placeholder="Search tasks..."
//                 value={searchTitle}
//                 onChange={(e) => setSearchTitle(e.target.value)}
//               />
//                   {showSearchButton && (
//                 <button
//                   onClick={handleSearchNavigation}
//                   className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
//                 >
//                   View Results ({searchData.length})
//                 </button>
//               )}
//             </div>
//             <Link
//               to="/"
//               className="text-gray-700 hover:bg-orange-50 hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               <BookOpen className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//               Home
//             </Link>
//             <Link
//               to="/blog"
//               className="text-gray-700 hover:bg-orange-50 hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               <Newspaper className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//               Blog
//             </Link>
//             <Link
//               to="/contact"
//               className="text-gray-700 hover:bg-orange-50 hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               <Phone className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//               Contact
//             </Link>

//             {isLoggedIn ? (
//             <HeadlessMenu as="div" className="relative">
//             <div className="flex gap-4 items-center">
//               <MenuButton className="relative flex items-center rounded-full bg-orange-100 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
//                 <span className="sr-only">Open user menu</span>
//                 <img
//                   className="h-8 w-8 rounded-full cursor-pointer"
//                   src={profile || ""}
//                   alt="User avatar"
//                   onError={(e) => {
//                     e.target.onerror = null; // Prevent infinite loop
//                   }}
//                 />
//               </MenuButton>
//               <span className="text-gray-700 ml-2 font-medium">{firstName}</span>
//             </div>
//             <MenuItems className="absolute right-0 mt-2 w-48 z-13 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <MenuItem>
//                 {({ active }) => (
//                   <Link
//                     to="/user/dashboard"
//                     className={`${
//                       active ? "bg-gray-100" : ""
//                     } block px-4 py-2 text-sm text-gray-700 flex items-center`}
//                   >
//                     <LayoutDashboard className="inline-block h-5 w-5 mr-2 align-middle text-orange-500" />
//                     Dashboard
//                   </Link>
//                 )}
//               </MenuItem>
//               <MenuItem>
//                 {({ active }) => (
//                   <Link
//                     to="/basicInfo"
//                     className={`${
//                       active ? "bg-gray-100" : ""
//                     } block px-4 py-2 text-sm text-gray-700 flex items-center`}
//                   >
//                     <UserCircle2 className="inline-block h-5 w-5 mr-2 align-middle text-orange-500" />
//                     My Profile
//                   </Link>
//                 )}
//               </MenuItem>
//               <MenuItem>
//                 {({ active }) => (
//                   <button
//                     onClick={handleLogout}
//                     className={`${
//                       active ? "bg-gray-100" : ""
//                     } block w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center `}
//                   >
//                     <LogOut className="inline-block h-5 w-5 mr-2 align-middle text-orange-500" />
//                     Sign out
//                   </button>
//                 )}
//               </MenuItem>
//             </MenuItems>
//             </HeadlessMenu>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link
//                   to="/signUp"
//                   className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium"
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/signIn"
//                   className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
//                 >
//                   Sign In
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <div className="relative rounded-md shadow-sm mt-1">
//               <div className="pointer-events-none pl-3 absolute inset-y-0 left-0 flex items-center">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className="bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 block w-full py-2 pl-10 pr-3 rounded-md"
//                 type="search"
//                 placeholder="Search tasks..."
//                 value={searchTitle}
//                 onChange={(e) => setSearchTitle(e.target.value)}
//               />
//             </div>
//             <Link
//               to="/"
//               className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               <BookOpen className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//               Home
//             </Link>
//             <Link
//               to="/blog"
//               className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               <Newspaper className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//               Blog
//             </Link>
//             <Link
//               to="/contact"
//               className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               <Phone className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//               Contact
//             </Link>
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   to="/user/dashboard"
//                   className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   <User className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/basicInfo"
//                   className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   <User className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
//                   My Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-gray-50 hover:bg-gray-100 text-gray-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   Sign out
//                 </button>
//               </>
//             ) : (
//               <div className="mt-2">
//                 <Link
//                   to="/signUp"
//                   className="bg-orange-500 hover:bg-orange-600 text-white block w-full px-4 py-2 rounded-md text-base font-medium text-center"
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/signIn"
//                   className="bg-gray-200 hover:bg-gray-300 text-gray-700 block w-full mt-2 px-4 py-2 rounded-md text-base font-medium text-center"
//                 >
//                   Sign In
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       <Outlet/>
//     </nav>
//   );
// };

// export default Nav;







import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authConfig from "../api/config";
import {
  Menu as MenuIcon,
  X,
  Search,
  User,
  BookOpen,
  Phone,
  Newspaper,
  LayoutDashboard, // New icon for Dashboard
  UserCircle2, // New icon for Profile
  LogOut, // New icon for Sign Out
} from "lucide-react";
import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";

const Nav = ({ userDetails, taskId,profileImage  }) => {
  console.log(userDetails, "userimage");
  console.log(taskId, "taskId");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  console.log(searchTitle, "titleserach");

  const [searchData, setSearchData] = useState([]);
  console.log(searchData, "searchDatahome");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const [profile, setProfiles] = useState({});
  console.log(profile, "profile123");

  // const proimage = JSON.parse(localStorage.getItem("image"));
  const firstName = JSON.parse(localStorage.getItem("firstName"));
  const authId = JSON.parse(localStorage.getItem("authId"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authId");
    localStorage.removeItem("firstName");
    setIsLoggedIn(false);
    toast.success("You have been logged out");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const response = await authConfig.get("/search-on-tasks", {
          params: { searchTitle },
        });
        if (response.status === 200) {
          const tasks = response.data.task;
          setSearchData(tasks);
          setShowSearchButton(tasks.length > 0 && searchTitle.length > 2);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // toast.error(error.response.data.message || "")
      }
    };

    if (searchTitle.length > 0) {
      fetchAllTask();
    } else {
      setSearchData([]);
      setShowSearchButton(false);
    }
  }, [searchTitle]);

  const handleSearchNavigation = () => {
    if (searchData.length > 0) {
      navigate(`/featuredTaskDetailed/${searchData[0].taskCategoryId._id}`,{state:{searchData}});
      setSearchTitle(""); // Clear search input after navigation
      setSearchData([]); // Clear search data
      setShowSearchButton(false); // Hide the button
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authConfig.get(`/found-profile/${authId}`);
        if (response.status === 200) {
          setProfiles(response.data.auth_profile.authProfile);
        } else {
          console.log("Error fetching Profile");
        }
      } catch (error) {
        console.error("Error fetching Profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-9 w-auto rounded-full xl:p-0 p-2"
                src={
                  isLoggedIn
                    ? "https://script.viserlab.com/metalance/assets/images/logo_icon/logo_dark.png"
                    : "https://script.viserlab.com/metalance/assets/images/logo_icon/logo_dark.png"
                }
                alt="Logo"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative rounded-md shadow-sm flex items-center bg-gray-100">
              <div className="pointer-events-none pl-3 absolute inset-y-0 left-0 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="bg-gray-100 border-none text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none py-2 pl-10 pr-4 rounded-md"
                type="search"
                placeholder="Search tasks..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              {showSearchButton && (
                <button
                  onClick={handleSearchNavigation}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                >
                  View Results ({searchData.length})
                </button>
              )}
            </div>
            <Link
              to="/"
              className="text-gray-700 hover:bg-orange-50 hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium"
            >
              <BookOpen className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
              Home
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:bg-orange-50 hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Newspaper className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:bg-orange-50 hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Phone className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
              Contact
            </Link>

            {isLoggedIn ? (
              <HeadlessMenu as="div" className="relative">
                <div className="flex gap-4 items-center">
                  <MenuButton className="relative flex items-center rounded-full bg-orange-100 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={profile}
                      alt="User avatar"
                    />
                  </MenuButton>
                  <span className="text-gray-700 ml-2 font-medium">{firstName}</span>
                </div>
                <MenuItems className="absolute right-0 z-13 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/user/dashboard"
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 flex items-center`}
                      >
                        <LayoutDashboard className="inline-block h-5 w-5 mr-2 align-middle text-orange-500" />
                        Dashboard
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/basicInfo"
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 flex items-center`}
                      >
                        <UserCircle2 className="inline-block h-5 w-5 mr-2 align-middle text-orange-500" />
                        My Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center`}
                      >
                        <LogOut className="inline-block h-5 w-5 mr-2 align-middle text-orange-500" />
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </HeadlessMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signUp"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Sign Up
                </Link>
                <Link
                  to="/signIn"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="relative px-2 pt-2 pb-3 space-y-1 sm:px-3 z-30">
            <div className="relative rounded-md shadow-sm mt-1 flex">
              <div className="pointer-events-none pl-3 absolute inset-y-0 left-0 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 block w-full py-2 pl-10 pr-3 rounded-md"
                type="search"
                placeholder="Search tasks..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              {showSearchButton && (
                <button
                  onClick={handleSearchNavigation}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 ml-2"
                >
                  View ({searchData.length})
                </button>
              )}
            </div>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)} 
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <BookOpen className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
              Home
            </Link>
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)} 
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Newspaper className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)} 
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Phone className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/user/dashboard"
                  onClick={() => setMenuOpen(false)} 
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <LayoutDashboard className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
                  Dashboard
                </Link>
                <Link
                  to="/basicInfo"
                  onClick={() => setMenuOpen(false)} 
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <UserCircle2 className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-center"
                >
                  <LogOut className="inline-block h-5 w-5 mr-1 align-middle text-orange-500" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="mt-2">
                <Link
                  to="/signUp"
                  className="bg-orange-500 hover:bg-orange-600 text-white block w-full px-4 py-2 rounded-md text-base font-medium text-center flex items-center justify-center"
                >
                  Sign Up
                </Link>
                <Link
                  to="/signIn"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 block w-full mt-2 px-4 py-2 rounded-md text-base font-medium text-center flex items-center justify-center"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <Outlet/>
    </nav>
  );
};

export default Nav;