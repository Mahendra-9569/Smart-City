import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [addressMap, setAddressMap] = useState({});
  const [addressLoading, setAddressLoading] = useState({});

  const API_BASE = import.meta.env.VITE_APP_SERVER_URL;

  const normalizeStatus = (status = "") => {
    const value = String(status).trim().toLowerCase();
    if (value === "pending") return "Pending";
    if (value === "in progress" || value === "in-progress") return "In Progress";
    if (value === "resolved") return "Resolved";
    return status || "Pending";
  };

  const getCoordinates = (issue) => {
    const lat =
      issue?.location?.latitude ??
      issue?.location?.lat ??
      issue?.lat ??
      issue?.latitude ??
      null;

    const lng =
      issue?.location?.longitude ??
      issue?.location?.lng ??
      issue?.lng ??
      issue?.longitude ??
      null;

    return {
      lat: lat !== null ? Number(lat) : null,
      lng: lng !== null ? Number(lng) : null,
    };
  };

  const fetchAddressForIssue = async (issue) => {
    const { lat, lng } = getCoordinates(issue);

    if (lat === null || lng === null || Number.isNaN(lat) || Number.isNaN(lng)) {
      setAddressMap((prev) => ({
        ...prev,
        [issue._id]: "Location not available",
      }));
      return;
    }

    setAddressLoading((prev) => ({ ...prev, [issue._id]: true }));

    try {
      const response = await axios.get(`${API_BASE}/issues/get-address`, {
        params: { lat, lng },
      });

      console.log(`Address response for issue ${issue._id}:`, response?.data);

      const address =
        response?.data?.address ||
        response?.data?.full?.display_name ||
        "Address not found";

      setAddressMap((prev) => ({
        ...prev,
        [issue._id]: address,
      }));
    } catch (error) {
      console.log(error);
      setAddressMap((prev) => ({
        ...prev,
        [issue._id]: "Address not found",
      }));
    } finally {
      setAddressLoading((prev) => ({ ...prev, [issue._id]: false }));
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${API_BASE}/issues/getAllIssues`);
        const data = response?.data?.data || [];
        setIssues(data);
        data.forEach((issue) => fetchAddressForIssue(issue));
      } catch (error) {
        console.log(error);
        toast.error("Error fetching issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [API_BASE]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_BASE}/issues/${id}`, { status });

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id ? { ...issue, status } : issue
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
    }
  };

  const handleDeleteIssue = async (id) => {
    const confirmed = window.confirm(
      "This issue is resolved. Do you want to delete it?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE}/issues/${id}`);
      setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== id));
      toast.success("Issue deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting issue");
    }
  };

  const filteredIssues = useMemo(() => {
    if (filter === "All") return issues;
    return issues.filter((issue) => normalizeStatus(issue.status) === filter);
  }, [issues, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 p-4 sm:p-6 text-[#000000]">
      <ToastContainer />
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
          Admin Panel - Track Issues
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <label className="text-lg font-semibold text-gray-700">
            Filter by Status:
          </label>
          <select
            className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="p-2 sm:p-4 text-left">Category</th>
                  <th className="p-2 sm:p-4 text-left">Description</th>
                  <th className="p-2 sm:p-4 text-left">User Email</th>
                  <th className="p-2 sm:p-4 text-left">Location</th>
                  <th className="p-2 sm:p-4 text-left">Status</th>
                  <th className="p-2 sm:p-4 text-left">Attachment</th>
                  <th className="p-2 sm:p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300">
                {filteredIssues.map((issue, index) => {
                  const status = normalizeStatus(issue.status);
                  const { lat, lng } = getCoordinates(issue);
                  const address = addressMap[issue._id];
                  const description = issue.desc || issue.description || "No description provided";
                  const email = issue.user?.email || issue.email || "Unknown";
                  const attachment = issue.attachment || issue.image || issue.photo;

                  return (
                    <tr
                      key={issue._id}
                      className={`hover:bg-blue-100 transition-all duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-2 sm:p-4 font-medium">{issue.category}</td>
                      <td className="p-2 sm:p-4 text-gray-700">{description}</td>
                      <td className="p-2 sm:p-4 text-gray-500">
                        {email}
                      </td>

                      <td className="p-2 sm:p-4 text-gray-700">
                        {addressLoading[issue._id]
                          ? "Resolving address..."
                          : address || "Address not found"}
                      </td>

                      <td className="p-2 sm:p-4">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold whitespace-nowrap ${
                            status === "Pending"
                              ? "bg-yellow-500"
                              : status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="p-2 sm:p-4 text-center">
                        {attachment ? (
                          <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={attachment}
                              alt="Attachment"
                              className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-md mx-auto"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400">No Attachment</span>
                        )}
                      </td>

                      <td className="p-2 sm:p-4">
                        <div className="flex flex-col gap-2">
                          <select
                            className="border p-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-xs sm:text-sm"
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(issue._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          {status === "Resolved" && (
                            <button
                              type="button"
                              onClick={() => handleDeleteIssue(issue._id)}
                              className="rounded-lg bg-red-500 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;