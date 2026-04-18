import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../slices/auth";
import loginIllustration from "/landing-pic.webp";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/report");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-10 text-black">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              Smart City Portal
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Sign in with Google
            </h2>
            <p className="mt-2 text-gray-600">
              Use your Google account to access your dashboard securely.
            </p>
          </div>

          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <GoogleAuthButton label="This will create or sign in your account using Google." />
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            or login with email
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="relative hidden bg-blue-600 lg:block">
          <img
            src={loginIllustration}
            alt="Login illustration"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <h3 className="text-3xl font-bold">Welcome back</h3>
            <p className="mt-2 max-w-md text-white/90">
              Sign in once and continue straight to your dashboard, issue reporting, and tracking tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
