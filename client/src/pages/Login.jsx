import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../slices/auth";
import loginIllustration from "/landing-pic.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="flex bg-white shadow-lg rounded-2xl overflow-hidden max-w-4xl w-full">
        {/* Left side - Login form */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          <h2 className="text-gray-700 text-xl md:text-2xl font-bold text-center">
            Login to your account
          </h2>

          {error && (
            <p className="text-red-500 text-xs md:text-sm text-center">{error}</p>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 md:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              className="flex-1 py-1.5 md:py-2 bg-red-500 text-white rounded-lg text-sm md:text-base"
            >
              Google
            </button>
            <button
              type="button"
              className="flex-1 py-1.5 md:py-2 bg-blue-500 text-white rounded-lg text-sm md:text-base"
            >
              Facebook
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm md:text-base">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </div>

        {/* Right side - Full Cover Background Image */}
        <div className="hidden md:flex flex-1 relative bg-blue-500">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;