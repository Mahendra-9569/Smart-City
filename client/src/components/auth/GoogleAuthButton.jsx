import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToken, setUser } from "../../slices/auth";

const GoogleAuthButton = ({ label = "Continue with Google", className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        toast.error("Google sign-in did not return a credential.");
        return;
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/google`,
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
      toast.success("Signed in with Google");
      navigate("/report");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign-in failed");
    }
  };
   

  
  return (
    <div className={className}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google sign-in was cancelled or failed.")}
        text="continue_with"
        shape="pill"
        theme="outline"
        size="large"
        logo_alignment="left"
      />
      <p className="mt-2 text-center text-xs text-gray-500">{label}</p>
    </div>
  );
};
export default GoogleAuthButton;
