import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/add-tournament"
            className="bg-white p-8 rounded-xl text-center text-2xl font-bold"
          >
            Create Tournament
          </Link>
          <Link
            to="/tournaments"
            className="bg-white p-8 rounded-xl text-center text-2xl font-bold"
          >
            View Tournaments
          </Link>
          <Link
            to="/add-team"
            className="bg-white p-8 rounded-xl text-center text-2xl font-bold"
          >
            Add Team
          </Link>
          <Link
            to="/teams"
            className="bg-white shadow-lg p-8 rounded-xl text-center text-2xl font-bold"
          >
            View Teams
          </Link>
          <Link
            to="/add-ground"
            className="bg-white p-8 rounded-xl text-center text-2xl font-bold"
          >
            Add Ground
          </Link>
          <Link
            to="/grounds"
            className="bg-white shadow-lg p-8 rounded-xl text-center text-2xl font-bold"
          >
            View Grounds
          </Link>

          <Link
            to="/players"
            className="bg-white shadow-lg p-8 rounded-xl text-center text-2xl font-bold"
          >
            View Players
          </Link>

          <Link
            to="/create-auction"
            className="bg-white shadow-lg p-8 rounded-xl text-center text-2xl font-bold"
          >
            Create Auction
          </Link>
          <Link
            to="/auctions"
            className="bg-white shadow-lg p-8 rounded-xl text-center text-2xl font-bold"
          >
            Start Auction
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
