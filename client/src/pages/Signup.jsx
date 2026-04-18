import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/signup`, {
        email,
        password,
        name,
      });

      console.log("Signup Successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="flex w-full max-w-3xl h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section - Image */}
        <div
          style={{
            backgroundImage: "url('/landing-pic.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
          className="hidden md:flex flex-col justify-center items-start w-2/5 p-6 text-white"
        ></div>

        {/* Right Section - Signup Form */}
        <div className="w-full md:w-3/5 p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">Create an account</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create account
            </button>
          </form>

          <button className="w-full py-2 bg-gray-100 text-gray-900 rounded-lg border flex items-center justify-center hover:bg-gray-200 mt-3">
            <img
              src="https://img.icons8.com/color/20/000000/google-logo.png"
              alt="Google logo"
              className="mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-gray-500 mt-3">
            Already have an account? <a href="/login" className="text-blue-500">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
