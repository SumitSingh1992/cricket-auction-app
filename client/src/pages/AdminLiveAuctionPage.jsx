import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminLiveAuctionPage() {
  const { auctionId } = useParams();

  const [players, setPlayers] = useState([]);

  const [liveAuction, setLiveAuction] = useState(null);

  const [incrementAmount, setIncrementAmount] = useState(0);

  const navigate = useNavigate();
  const fetchPlayers = async () => {
    try {
      const response = await api.get("/api/players");

      setPlayers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLiveAuction = async () => {
    try {
      const response = await api.get(
        `/api/live-auction/${auctionId}`,
      );

      setLiveAuction(response.data.data);

      const auctionData = response.data.data;

      if (auctionData?.auction?.bidRules) {
        const increment = getIncrementAmount(
          auctionData.currentBid,
          auctionData.auction.bidRules,
        );

        setIncrementAmount(increment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayers();

    fetchLiveAuction();
  }, []);

  const handleStartPlayer = async (playerId) => {
    try {
      const response = await api.post("/api/live-auction/start-player", {
        auctionId,
        playerId,
      });

      setLiveAuction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBid = async (teamId) => {
    try {
      const response = await api.post("/api/live-auction/bid", {
        auctionId,
        teamId,
      },
      );

      setLiveAuction(response.data.data);

      const auctionData = response.data.data;

      if (auctionData?.auction?.bidRules) {
        const increment = getIncrementAmount(
          auctionData.currentBid,
          auctionData.auction.bidRules,
        );

        setIncrementAmount(increment);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSold = async () => {
    try {
      const response = await api.post("/api/live-auction/sell", {
        auctionId,
      });

      setLiveAuction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsold = async () => {
    try {
      const response = await api.post("/api/live-auction/unsold", {
        auctionId,
      });

      setLiveAuction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncrementAmount = (currentBid, rules) => {
    let increment = 0;

    const sorted = [...rules].sort((a, b) => a.threshold - b.threshold);

    sorted.forEach((rule) => {
      if (currentBid >= rule.threshold) {
        increment = rule.incrementBy;
      }
    });

    return increment;
  };

  const handleDecrementBid = async () => {
    try {
      const response = await api.post("/api/live-auction/decrement-bid", {
        auctionId,
      });

      setLiveAuction(response.data.data);

      const auctionData = response.data.data;

      if (auctionData?.auction?.bidRules) {
        const increment = getIncrementAmount(
          auctionData.currentBid,
          auctionData.auction.bidRules,
        );

        setIncrementAmount(increment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEndAuction = async () => {
    try {
      await api.post("/api/live-auction/end-auction", {
        auctionId,
      });

      alert("Auction Ended Successfully");

      navigate("/auctions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="grid grid-cols-4 gap-5 p-5">
        {/* PLAYERS */}
        <div className="bg-black rounded-2xl p-4 h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold mb-5">Players</h2>

          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player._id}
                onClick={() => handleStartPlayer(player._id)}
                className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-yellow-500 hover:text-black"
              >
                {player.fullName}
              </div>
            ))}
          </div>
        </div>

        {/* CURRENT PLAYER */}
        <div className="col-span-2 bg-black rounded-2xl overflow-hidden">
          {liveAuction?.currentPlayer ? (
            <>
              <img
                src={liveAuction.currentPlayer.profilePhoto}
                className="w-full h-[450px] object-cover"
              />

              <div className="p-6">
                <h1 className="text-5xl font-bold">
                  {liveAuction.currentPlayer.fullName}
                </h1>

                <p className="text-2xl text-yellow-400 mt-3">
                  {liveAuction.currentPlayer.role}
                </p>

                <div className="mt-8">
                  <div className="text-2xl">Current Bid</div>

                  <div className="text-6xl font-bold text-green-400">
                    ₹{liveAuction.currentBid}
                  </div>

                  <div className="mt-3 text-xl text-yellow-400">
                    Increment: ₹{incrementAmount}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleDecrementBid}
                    className="bg-yellow-500 text-black px-8 py-4 rounded-xl text-2xl font-bold"
                  >
                    - Undo Bid
                  </button>

                  <button
                    onClick={handleSold}
                    className="bg-green-600 px-8 py-4 rounded-xl text-2xl font-bold"
                  >
                    SOLD
                  </button>

                  <button
                    onClick={handleUnsold}
                    className="bg-red-600 px-8 py-4 rounded-xl text-2xl font-bold"
                  >
                    UNSOLD
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-4xl">
              Select Player
            </div>
          )}
        </div>

        {/* TEAMS */}
        <div className="space-y-4">
          {Array.isArray(liveAuction?.auction?.teams) &&
            liveAuction?.auction?.teams?.map((team) => (
              <div key={team._id} className="bg-black p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <img src={team.teamLogo} className="w-16 h-16 rounded-full" />

                  <div>
                    <h2 className="text-2xl font-bold">{team.teamName}</h2>

                    <p>Purse: ₹{team.purseRemaining}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleBid(team._id)}
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl mt-4 text-xl font-bold"
                >
                  + ₹{incrementAmount}
                </button>
              </div>
            ))}
        </div>

        <button
          onClick={handleEndAuction}
          className="bg-red-700 px-8 py-4 rounded-xl text-2xl font-bold"
        >
          END AUCTION
        </button>
      </div>
    </div>
  );
}

export default AdminLiveAuctionPage;
