import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function AddTeamPage() {
  const [tournaments, setTournaments] = useState([]);

  const [teamLogo, setTeamLogo] = useState(null);

  const [formData, setFormData] = useState({
    teamName: "",
    ownerName: "",
    tournament: "",
    purseRemaining: "",
  });

  const fetchTournaments = async () => {
    try {
      const response = await api.get("/api/tournaments");

      setTournaments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

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

      if (teamLogo) {
        data.append("teamLogo", teamLogo);
      }

      await api.post("/api/teams/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Team created successfully");
    } catch (error) {
      toast.error("Failed to create team");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Toaster />

      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Create Team</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="teamName"
              placeholder="Team Name"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="purseRemaining"
              placeholder="Team Purse"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

            <select
              name="tournament"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
              required
            >
              <option value="">Select Tournament</option>

              {tournaments.map((tournament) => (
                <option key={tournament._id} value={tournament._id}>
                  {tournament.tournamentName}
                </option>
              ))}
            </select>

            <div>
              <label className="font-semibold block mb-2">Team Logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setTeamLogo(e.target.files[0])}
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold"
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeamPage;
