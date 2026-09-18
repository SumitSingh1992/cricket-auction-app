import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function PlayersPage() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await api.get("/api/players");

      setPlayers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-10">
          Registered Players
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {players.map((player) => (
            <div
              key={player._id}
              onClick={() => navigate(`/player/${player._id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={
                    player.profilePhoto ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={player.fullName}
                  className="w-full h-72 object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Player Info on Image */}
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-3xl font-bold text-white">
                    {player.fullName}
                  </h2>

                  <p className="text-yellow-400 text-lg mt-1 font-semibold">
                    {player.role}
                  </p>
                </div>
              </div>

              {/* Player Details */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Batting</span>

                  <span className="font-bold">{player.battingStyle}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Bowling</span>

                  <span className="font-bold">{player.bowlingStyle}</span>
                </div>

                {/* CricHeroes Button */}
                {player.cricheroesProfile && (
                  <a
                    href={player.cricheroesProfile}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 inline-flex items-center justify-center w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                  >
                    View CricHeroes Profile
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;
