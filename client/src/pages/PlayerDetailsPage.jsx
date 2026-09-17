import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function PlayerDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Player CricHeroes Profile</h1>

        <iframe
          src="https://cricheroes.com/player-profile/10868100/merson-sandeep/matches"
          title="CricHeroes"
          width="100%"
          height="800px"
          className="rounded-xl border"
        />
      </div>
    </div>
  );
}

export default PlayerDetailsPage;
