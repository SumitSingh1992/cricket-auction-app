import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import toast, { Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";

function AddTournamentPage() {
  const [grounds, setGrounds] = useState([]);

  const [bannerImage, setBannerImage] = useState(null);

  const [formData, setFormData] = useState({
    tournamentName: "",
    ballType: "Leather",
    overs: "",
    powerplayOvers: "",
    startDate: "",
    endDate: "",
    grounds: [],
  });

  const fetchGrounds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/grounds");

      setGrounds(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGroundChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      grounds: prev.grounds.includes(id)
        ? prev.grounds.filter((g) => g !== id)
        : [...prev.grounds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "grounds") {
          formData.grounds.forEach((ground) => {
            data.append("grounds", ground);
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      if (bannerImage) {
        data.append("bannerImage", bannerImage);
      }

      await axios.post("http://localhost:5000/api/tournaments/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Tournament created successfully");
    } catch (error) {
      toast.error("Failed to create tournament");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Toaster />

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Create Tournament</h1>

            <Link
              to="/add-ground"
              className="bg-black text-white px-5 py-3 rounded-xl"
            >
              + Add Ground
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="tournamentName"
              placeholder="Tournament Name"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <select
              name="ballType"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            >
              <option>Leather</option>

              <option>Tennis</option>
            </select>

            <input
              type="number"
              name="overs"
              placeholder="Overs"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="powerplayOvers"
              placeholder="Powerplay Overs"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="startDate"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="endDate"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <div>
              <label className="font-semibold block mb-3">Select Grounds</label>

              <div className="space-y-3">
                {grounds.map((ground) => (
                  <label key={ground._id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={() => handleGroundChange(ground._id)}
                    />

                    {ground.groundName}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Tournament Banner
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold"
            >
              Create Tournament
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTournamentPage;
