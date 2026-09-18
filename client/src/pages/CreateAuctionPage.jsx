import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function CreateAuctionPage() {
  const [tournaments, setTournaments] = useState([]);

  const [teams, setTeams] = useState([]);

  const [players, setPlayers] = useState([]);

  const [selectedTeams, setSelectedTeams] = useState([]);

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const [tournament, setTournament] = useState("");

  const [bidRules, setBidRules] = useState([
    {
      threshold: 0,
      incrementBy: 500,
    },
  ]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tournamentsRes, teamsRes, playersRes] = await Promise.all([
        api.get("/api/tournaments"),
        api.get("/api/teams"),
        api.get("/api/players"),
      ]);

      setTournaments(tournamentsRes.data.data);

      setTeams(teamsRes.data.data);

      setPlayers(playersRes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelection = (id, state, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    try {
      await api.post("/api/auctions/create", {
        tournament,
        teams: selectedTeams,
        players: selectedPlayers,
        bidRules,
      });

      toast.success("Auction created successfully");
    } catch (error) {
      toast.error("Failed to create auction");
    }
  };

  const addRule = () => {
    setBidRules([
      ...bidRules,

      {
        threshold: 0,
        incrementBy: 0,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Toaster />

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8">Create Auction</h1>

          <div className="space-y-8">
            <select
              className="w-full border p-3 rounded-xl"
              onChange={(e) => setTournament(e.target.value)}
            >
              <option value="">Select Tournament</option>

              {tournaments.map((tournament) => (
                <option key={tournament._id} value={tournament._id}>
                  {tournament.tournamentName}
                </option>
              ))}
            </select>

            {/* Teams */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Teams</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {teams.map((team) => (
                  <div
                    key={team._id}
                    onClick={() =>
                      toggleSelection(team._id, selectedTeams, setSelectedTeams)
                    }
                    className={`p-4 rounded-xl border cursor-pointer ${
                      selectedTeams.includes(team._id)
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {team.teamName}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Bid Rules</h2>

                <button
                  type="button"
                  onClick={addRule}
                  className="bg-black text-white px-4 py-2 rounded-xl"
                >
                  + Add Rule
                </button>
              </div>

              <div className="space-y-4">
                {bidRules.map((rule, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Threshold"
                      value={rule.threshold}
                      onChange={(e) => {
                        const updated = [...bidRules];

                        updated[index].threshold = e.target.value;

                        setBidRules(updated);
                      }}
                      className="border p-3 rounded-xl"
                    />

                    <input
                      type="number"
                      placeholder="Increment By"
                      value={rule.incrementBy}
                      onChange={(e) => {
                        const updated = [...bidRules];

                        updated[index].incrementBy = e.target.value;

                        setBidRules(updated);
                      }}
                      className="border p-3 rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-4 rounded-xl font-bold"
            >
              Create Auction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAuctionPage;
