import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [liveAuctionId, setLiveAuctionId] = useState(null);
  const [isAuctionLive, setIsAuctionLive] = useState(false);

  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  const fetchAuctions = async () => {
    try {
      const response = await api.get("/api/auctions");

      setAuctions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLiveAuction = async () => {
    try {
      const response = await api.get("/api/public/live-auction");

      if (response.data.live) {
        setIsAuctionLive(true);

        setLiveAuctionId(response.data.auctionId);
      } else {
        setIsAuctionLive(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuctions();

    fetchLiveAuction();

    const handleFocus = () => {
      fetchLiveAuction();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-10">Auctions</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <div
              key={auction._id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-3xl font-bold">
                {auction.tournament?.tournamentName}
              </h2>

              <div className="mt-5 space-y-2">
                <p>
                  <strong>Teams:</strong> {auction.teams?.length}
                </p>

                <p>
                  <strong>Players:</strong> {auction.players?.length}
                </p>

                <p>
                  <strong>Status:</strong> {auction.status}
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={() => navigate(`/admin-live-auction/${auction._id}`)}
                  className="w-full bg-black text-white py-3 rounded-xl mt-6 font-bold"
                >
                  Start Auction
                </button>
              )}

              {isAuctionLive ? (
                <button
                  onClick={() => navigate(`/live-auction/${liveAuctionId}`)}
                  className="w-full bg-red-600 text-white py-3 rounded-xl mt-6 font-bold animate-pulse"
                >
                  WATCH LIVE AUCTION
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-500 text-white py-3 rounded-xl mt-6 font-bold cursor-not-allowed"
                >
                  Auction Not Started Yet
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuctionsPage;
