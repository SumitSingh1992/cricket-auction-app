import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

function LiveAuctionViewerPage() {
  const { auctionId } = useParams();

  const [liveAuction, setLiveAuction] = useState(null);

  const [incrementAmount, setIncrementAmount] = useState(0);

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
    fetchLiveAuction();

    const interval = setInterval(() => {
      fetchLiveAuction();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* HEADER */}
      <div className="bg-yellow-500 text-black text-center py-4 text-4xl font-bold shadow-lg">
        LIVE AUCTION
      </div>

      {liveAuction?.status === "Completed" ? (
        <div className="flex items-center justify-center min-h-[80vh] p-6">
          <div className="bg-black rounded-3xl p-10 text-center w-full max-w-4xl">
            <h1 className="text-6xl lg:text-8xl font-bold text-red-500">
              AUCTION ENDED
            </h1>

            <p className="text-2xl lg:text-4xl mt-8 text-gray-300">
              Thank You For Watching
            </p>
          </div>
        </div>
      ) : liveAuction?.currentPlayer ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-6">
          {/* PLAYER */}
          <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-5 lg:p-8">
              {/* PLAYER IMAGE */}
              <img
                src={liveAuction.currentPlayer.profilePhoto}
                className="
            w-40 h-40
            lg:w-52 lg:h-52
            rounded-full
            object-cover
            border-4 border-yellow-500
            shadow-lg
          "
              />

              {/* PLAYER INFO */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold break-words">
                  {liveAuction.currentPlayer.fullName}
                </h1>

                <p className="text-2xl lg:text-3xl text-yellow-400 mt-3">
                  {liveAuction.currentPlayer.role}
                </p>

                {/* CURRENT BID */}
                <div className="mt-8">
                  <div className="text-2xl lg:text-3xl">Current Bid</div>

                  <div className="text-6xl lg:text-8xl font-bold text-green-400 mt-3 break-all">
                    ₹{liveAuction.currentBid}
                  </div>

                  <div className="text-xl lg:text-2xl mt-4 text-yellow-300">
                    Increment: ₹{incrementAmount}
                  </div>
                </div>

                {/* LEADING TEAM */}
                <div className="mt-8">
                  <div className="text-xl lg:text-2xl">Leading Team</div>

                  <div className="text-3xl lg:text-5xl font-bold text-yellow-400 mt-2 break-words">
                    {liveAuction?.currentBidTeam?.teamName || "No Bids Yet"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TEAMS */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Teams</h2>

            {Array.isArray(liveAuction?.auction?.teams) &&
              liveAuction.auction.teams.map((team) => (
                <div
                  key={team._id}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    liveAuction?.currentBidTeam?._id === team._id
                      ? "bg-yellow-500 text-black scale-105"
                      : "bg-black"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={team.teamLogo}
                      className="
                    w-16 h-16
                    lg:w-20 lg:h-20
                    rounded-full
                    object-cover
                  "
                    />

                    <div className="flex-1">
                      <h2 className="text-xl lg:text-2xl font-bold break-words">
                        {team.teamName}
                      </h2>

                      <p className="text-sm lg:text-lg">
                        Purse: ₹{team.purseRemaining}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : liveAuction?.lastSoldPlayer ? (
        <div className="flex items-center justify-center min-h-[80vh] p-6">
          <div className="bg-black rounded-3xl p-10 text-center w-full max-w-4xl">
            <img
              src={liveAuction.lastSoldPlayer.profilePhoto}
              className="w-52 h-52 rounded-full object-cover mx-auto border-4 border-yellow-500"
            />

            <h1 className="text-6xl font-bold mt-8">
              {liveAuction.lastSoldPlayer.fullName}
            </h1>

            {liveAuction.lastAuctionStatus === "SOLD" ? (
              <>
                <div className="text-5xl text-green-400 font-bold mt-6">
                  SOLD
                </div>

                <div className="text-4xl text-yellow-400 mt-4">
                  {liveAuction.lastSoldTeam?.teamName}
                </div>

                <div className="text-6xl font-bold text-green-300 mt-6">
                  ₹{liveAuction.lastSoldAmount}
                </div>
              </>
            ) : (
              <div className="text-6xl text-red-500 font-bold mt-8">UNSOLD</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[80vh] text-3xl lg:text-6xl font-bold text-center px-4">
          Waiting For Auction To Start
        </div>
      )}
    </div>
  );
}

export default LiveAuctionViewerPage;
