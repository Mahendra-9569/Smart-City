import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user=useSelector((state)=>state.auth.user);
  const name=user?.name;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(setToken(null));
    localStorage.removeItem('user');
    dispatch(setUser(null));
    navigate('/login');
  };

  const navigateAndCloseMenu = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full  bg-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={()=>navigate("/")} className="text-xl font-bold text-gray-900">SMART CITY</button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="hover:text-blue-500 transition" onClick={() => navigate("/")}>Home</button>
          <button className="hover:text-blue-500 transition" onClick={() => navigate("/report")}>Report Issue</button>
          <button className="hover:text-blue-500 transition" onClick={() => navigate("/track")}>Track Status</button>
          <button className="hover:text-blue-500 transition" onClick={() => navigate("/contact")}>Contact Us</button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {!token ? (
            <>
              <button className="text-gray-600 hover:text-blue-500 transition" onClick={() => navigate("/login")}>
                Log In
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>

            <img className="rounded-full w-10 h-10" src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt="Avatar" />

            
            <button
              className="px-4 py-2 bg-black text-white  rounded-md hover:bg-gray-200 hover:text-black  transition"
              onClick={logoutHandler}
            >
              Log Out
            </button>
            
            </>
            
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 sm:px-6 border-t border-gray-200">
          <div className="flex flex-col space-y-2 mt-2">
            <button
              className="px-4 py-2 text-left hover:bg-gray-100 rounded-md transition"
              onClick={() => navigateAndCloseMenu("/")}
            >
              Home
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100 rounded-md transition"
              onClick={() => navigateAndCloseMenu("/report")}
            >
              Report Issue
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100 rounded-md transition"
              onClick={() => navigateAndCloseMenu("/track")}
            >
              Track Status
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100 rounded-md transition"
              onClick={() => navigateAndCloseMenu("/contact")}
            >
              Contact Us
            </button>

            <div className="border-t border-gray-200 pt-4 mt-2">
              {!token ? (
                <>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition"
                    onClick={() => navigateAndCloseMenu("/login")}
                  >
                    Log In
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition"
                    onClick={() => navigateAndCloseMenu("/signup")}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
               <>
               <img className="flex justify-center  items-center ml-5 rounded-full w-10 h-10" src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt="Avatar" />

                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-300 rounded-md transition"
                  onClick={() => {
                    logoutHandler();
                    setIsMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
               </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;