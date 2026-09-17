const express = require("express");
const cors = require("cors");
const playerRoutes = require("./routes/playerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const groundRoutes = require("./routes/groundRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const teamRoutes = require("./routes/teamRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const liveAuctionRoutes = require("./routes/liveAuctionRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/players", playerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/grounds", groundRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/live-auction", liveAuctionRoutes);
app.use("/api/public", publicRoutes);

module.exports = app;
