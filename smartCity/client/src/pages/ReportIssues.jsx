import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const ReportIssues = () => {
  const [formData, setFormData] = useState({
    category: "",
    desc: "",
    attachment: null,
    location: { latitude: "", longitude: "" },
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [markerPosition, setMarkerPosition] = useState({ latitude: 20.5937, longitude: 78.9629 });
  const mapRef = useRef(null);
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    setMessage("");
  };

  const handleLocationUpdate = (latitude, longitude) => {
    setFormData((prev) => ({ ...prev, location: { latitude, longitude } }));
    setMarkerPosition({ latitude, longitude });
    if (mapRef.current) {
      mapRef.current.flyTo([latitude, longitude], 15);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => handleLocationUpdate(position.coords.latitude, position.coords.longitude),
        (error) => setMessage(`Location error: ${error.message}`)
      );
    } else {
      setMessage("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.location.latitude || !formData.location.longitude) {
      setMessage("Please provide a location using the map or GPS.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("category", formData.category);
      data.append("desc", formData.desc);
      if (formData.attachment) data.append("attachment", formData.attachment);
      data.append("latitude", formData.location.latitude);
      data.append("longitude", formData.location.longitude);

      await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/issues/createIssue`, data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setMessage("Issue reported successfully!");
      setFormData({ category: "", desc: "", attachment: null, location: { latitude: "", longitude: "" } });
      setMarkerPosition({ latitude: 20.5937, longitude: 78.9629 });
    } catch (error) {
      setMessage(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  function LocationMarker() {
    const map = useMap();

    useMapEvents({
      click(e) {
        handleLocationUpdate(e.latlng.lat, e.latlng.lng);
      },
    });

    useEffect(() => {
      if (markerPosition) {
        map.flyTo([markerPosition.latitude, markerPosition.longitude], 15);
      }
    }, [markerPosition, map]);

    return (
      <Marker
        position={[markerPosition.latitude, markerPosition.longitude]}
        icon={new L.Icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4 md:p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl text-black border border-blue-200 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Report an Issue</h2>
          {message && <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block font-medium text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded-md bg-blue-50">
              <option value="">Select a category</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Power Outage">Power Outage</option>
              <option value="Garbage Collection">Garbage Collection</option>
              <option value="Other">Other</option>
            </select>

            <label className="block font-medium text-gray-700">Description</label>
            <textarea name="desc" value={formData.desc} onChange={handleChange} required className="w-full p-2 border rounded-md bg-blue-50" rows="4" placeholder="Describe the issue..." />

            <label className="block font-medium text-gray-700">Attachment (Optional)</label>
            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md bg-blue-50" />

            <div className="w-full block md:hidden md:w-1/2 p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Location</h3>
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-64 md:h-72">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
          <button type="button" onClick={handleGetLocation} className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Get Current Location</button>
        </div>

            <button type="submit" disabled={loading} className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition">
              {loading ? "Submitting..." : "Submit Issue"}
            </button>
          </form>
        </div>

        <div className="w-full hidden md:block md:w-1/2 p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Location</h3>
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-64 md:h-72">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
          <button onClick={handleGetLocation} className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Get Current Location</button>
        </div>
      </div>
    </div>
  );
};

export default ReportIssues;
