import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

function TeamsPage() {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await api.get("/api/teams");

      setTeams(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-10">Teams</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition"
            >
              <div className="bg-black p-8 flex justify-center">
                <img
                  src={team.teamLogo}
                  alt={team.teamName}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white"
                />
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold text-center">
                  {team.teamName}
                </h2>

                <p className="mt-4">
                  <strong>Owner:</strong> {team.ownerName}
                </p>

                <p>
                  <strong>Tournament:</strong> {team.tournament?.tournamentName}
                </p>

                <p>
                  <strong>Players:</strong> {team.players.length}
                </p>

                <p>
                  <strong>Purse:</strong> ₹{team.purseRemaining}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
