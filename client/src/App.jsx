import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/auth/PrivateRoute";
import OpenRoute from "./components/auth/OpenRoute";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Chatbot from "./components/common/Chatbot";
import { useSelector } from "react-redux";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ContactUs = lazy(() => import("./pages/Contactus"));
const ReportIssues = lazy(() => import("./pages/ReportIssues"));
const TrackProgress = lazy(() => import("./pages/TrackProgress"));

function App() {
  const user=useSelector((state)=>state.auth.user)
  return (
    <Router>
      <div className="bg-[#C8E4F4] text-black min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow">
          {/* Suspense for Lazy Loading */}
          <Suspense fallback={<div className="w-full h-full flex justify-center items-center text-center text-3xl ">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
              <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Private Routes */}
              <Route path="/report" element={<PrivateRoute><ReportIssues /></PrivateRoute>} />
              <Route path="/track" element={<PrivateRoute><TrackProgress /></PrivateRoute>} />
            </Routes>
          </Suspense>
        </div>

        {user!=null?<Chatbot/>:<></>}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
