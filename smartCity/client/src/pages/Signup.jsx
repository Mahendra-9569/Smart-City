import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/signup`,
        { email, password, name },
        { withCredentials: true }
      );
      navigate("/report");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-10 text-black">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        <div
          className="hidden bg-cover bg-center lg:block"
          style={{ backgroundImage: "url('/landing-pic.webp')" }}
        />

        <div className="p-6 md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              Create account
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Join the Smart City portal
            </h2>
            <p className="mt-2 text-gray-600">
              Prefer Google? Use the button below. Otherwise, create a local account.
            </p>
          </div>

          {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <GoogleAuthButton label="Google sign-in will log you in immediately and create the user if needed." />
          </div>

          <div className="my-5 flex items-center gap-3 text-sm text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            or sign up with email
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
