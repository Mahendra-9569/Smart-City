import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    location: { lat: 29.2197, lng: 79.5126 },
  });

  const [markerPosition, setMarkerPosition] = useState(formData.location);

  const mapContainerStyle = { width: "100%", height: "200px", borderRadius: "12px" };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Message sent successfully!");

    setFormData({ email: "", message: "", location: { lat: 29.2197, lng: 79.5126 } });
    setMarkerPosition({ lat: 29.2197, lng: 79.5126 });
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
        setMarkerPosition(newPosition);
        setFormData((prev) => ({ ...prev, location: newPosition }));
      },
    });

    return markerPosition ? (
      <Marker
        position={[markerPosition.lat, markerPosition.lng]}
        icon={new L.Icon({
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    ) : null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f5] p-4 md:p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 md:p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact us</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">📧 help@smart.city</p>
              <p>We will reach back to you shortly</p>
            </div>
            <div>
              <p className="font-semibold">📞 +91 1234567890</p>
              <p>Available between 9am to 5pm</p>
            </div>
            <div>
              <p className="font-semibold">📍 Head office</p>
              <p>Somewhere near you</p>
            </div>
          </div>

          <div className="mt-6">
            <MapContainer
              center={markerPosition}
              zoom={13}
              style={mapContainerStyle}
              className="w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 w-full p-3 border rounded-lg"
              placeholder="Message goes in here..."
              rows="4"
              required
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" required className="mr-2" />
            <p>
              I agree to <a href="#" className="text-blue-500">Privacy Policy</a> and{" "}
              <a href="#" className="text-blue-500">Terms of Conditions</a>.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;