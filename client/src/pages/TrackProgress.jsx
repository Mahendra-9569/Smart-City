import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIssues } from "../slices/issue";
import { FaExclamationCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";

const TrackProgress = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);
  const issues = useSelector((state) => state.issue.issues);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/issues/getIssues`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setIssues(response.data.data));
      } catch (error) {
        console.log(error);
        setError("Failed to fetch complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [token]); // ✅ Remove `issues` to avoid infinite re-renders

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Track Your Complaints</h2>
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <p className="text-center text-gray-600 flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Loading complaints...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 flex items-center justify-center">
            <FaExclamationCircle className="mr-2" /> {error}
          </p>
        ) : Array.isArray(issues) && issues.length > 0 ? (
          <div className="space-y-6">
            {issues.map((complaint) => {
              const progressBarColor =
                complaint.status === "Pending"
                  ? "bg-yellow-500"
                  : complaint.status === "In Progress"
                  ? "bg-blue-500"
                  : "bg-green-500";

              return (
                <div
                  key={complaint._id}
                  className="border p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-gray-100"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                    {complaint.status === "Resolved" ? (
                      <FaCheckCircle className="text-green-600 mr-2" />
                    ) : complaint.status === "In Progress" ? (
                      <FaSpinner className="text-blue-500 animate-spin mr-2" />
                    ) : (
                      <FaExclamationCircle className="text-yellow-500 mr-2" />
                    )}
                    {complaint.category}
                  </h3>
                  <p className="text-gray-600 mt-2">{complaint.desc}</p>
                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium transition duration-300 ${
                        complaint.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : complaint.status === "In Progress"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <div className="w-full bg-gray-300 h-3 rounded-full mt-4 overflow-hidden relative shadow-inner">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${progressBarColor}`}
                      style={{
                        width:
                          complaint.status === "Pending"
                            ? "20%"
                            : complaint.status === "In Progress"
                            ? "60%"
                            : "100%",
                        minWidth: "5%",
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-600 flex flex-col items-center">
            <img src="/empty.svg" alt="No Data" className="w-40 h-40 mb-4" />
            <p>No complaints found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackProgress;
