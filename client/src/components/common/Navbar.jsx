import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const name = user?.name || "User";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    } catch (error) {
    
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(setToken(null));
      dispatch(setUser(null));
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">

        <button onClick={() => navigate("/")} className="text-xl font-bold text-gray-900">
          SMART CITY
        </button>

        <div className="hidden lg:flex items-center space-x-6">
          <button onClick={() => navigate("/")} className="hover:text-blue-500">Home</button>
          <button onClick={() => navigate("/report")} className="hover:text-blue-500">Report Issue</button>
          <button onClick={() => navigate("/track")} className="hover:text-blue-500">Track Status</button>
          <button onClick={() => navigate("/contact")} className="hover:text-blue-500">Contact Us</button>
        </div>

        <div className="hidden lg:flex items-center space-x-4 relative">
          {!token ? (
            <>
              <button onClick={() => navigate("/login")} className="hover:text-blue-500">
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />

              {isProfileOpen && (
                <div className="absolute right-0 top-14 w-48 bg-white shadow-lg rounded-lg border z-50">
                  <div className="p-3 border-b">
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <button onClick={() => navigate("/")} className="block py-2">Home</button>
          <button onClick={() => navigate("/report")} className="block py-2">Report Issue</button>
          <button onClick={() => navigate("/track")} className="block py-2">Track Status</button>
          <button onClick={() => navigate("/contact")} className="block py-2">Contact</button>

          {!token ? (
            <>
              <button onClick={() => navigate("/login")} className="block py-2">Login</button>
              <button onClick={() => navigate("/signup")} className="block py-2">Signup</button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 py-3">
                <img src={avatarUrl} className="w-10 h-10 rounded-full" />
                <span>{name}</span>
              </div>
              <button onClick={logoutHandler} className="block py-2 text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;