import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);

  const fetchTournaments = async () => {
    try {
      const response = await api.get("/api/tournaments");
      console.log(response.data.data);
      setTournaments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-10">Tournaments</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <div
              key={tournament._id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={tournament.bannerImage}
                alt={tournament.tournamentName}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {tournament.tournamentName}
                </h2>

                <p className="mt-3">
                  <strong>Ball:</strong> {tournament.ballType}
                </p>

                <p>
                  <strong>Overs:</strong> {tournament.overs}
                </p>

                <p>
                  <strong>Powerplay Overs:</strong> {tournament.powerplayOvers}
                </p>

                <p>
                  <strong>Ground:</strong> {tournament.grounds[0]?.groundName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TournamentsPage;
