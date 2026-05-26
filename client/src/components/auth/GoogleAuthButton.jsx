import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { setToken, setUser } from "../../slices/auth";

const GoogleAuthButton = ({
  label = "Continue with Google",
  className = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        toast.error("No Google credential received");
        return;
      }

      // DEBUG
      const decoded = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );

      console.log("TOKEN AUD:", decoded.aud);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/google`,
        {
          credential: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      localStorage.setItem(
        "token",
        JSON.stringify(data.token)
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

      toast.success("Google login successful");

      navigate("/report");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Google login failed"
      );
    }
  };

  return (
    <div className={className}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          toast.error(
            "Google sign in cancelled or failed"
          );
        }}
        text="continue_with"
        shape="pill"
        theme="outline"
        size="large"
      />

      <p className="mt-2 text-center text-xs text-gray-500">
        {label}
      </p>
    </div>
  );
};

export default GoogleAuthButton;