import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function AddGroundPage() {
  const [formData, setFormData] = useState({
    groundName: "",
    contactName: "",
    contactMobile: "",
    ownerManager: "",
    location: "",
    googleMapsLink: "",
  });

  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      for (let i = 0; i < photos.length; i++) {
        data.append("photos", photos[i]);
      }

      await api.post("/api/grounds/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ground added successfully");

      setFormData({
        groundName: "",
        contactName: "",
        contactMobile: "",
        ownerManager: "",
        location: "",
        googleMapsLink: "",
      });

      setPhotos([]);
    } catch (error) {
      toast.error("Failed to add ground");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Toaster />

      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Register Ground
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="groundName"
              placeholder="Ground Name"
              value={formData.groundName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="contactName"
              placeholder="Contact Name"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="contactMobile"
              placeholder="Contact Mobile"
              value={formData.contactMobile}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="ownerManager"
              placeholder="Owner / Manager"
              value={formData.ownerManager}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Ground Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="googleMapsLink"
              placeholder="Google Maps Link"
              value={formData.googleMapsLink}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <div>
              <label className="block mb-2 font-semibold">
                Upload Ground Photos
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setPhotos(e.target.files)}
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              Register Ground
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddGroundPage;
