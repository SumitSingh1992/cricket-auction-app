import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import PlayersPage from "./pages/PlayersPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import PlayerDetailsPage from "./pages/PlayerDetailsPage";
import AddGroundPage from "./pages/AddGroundPage";
import GroundsPage from "./pages/GroundsPage";
import AddTournamentPage from "./pages/AddTournamentPage";
import TournamentsPage from "./pages/TournamentsPage";
import AddTeamPage from "./pages/AddTeamPage";
import TeamsPage from "./pages/TeamsPage";
import LiveAuctionPage from "./pages/LiveAuctionPage";
import AuctionsPage from "./pages/AuctionsPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import AdminLiveAuctionPage from "./pages/AdminLiveAuctionPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register-player" element={<RegisterPage />} />

        <Route path="/players" element={<PlayersPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="/auctions" element={<AuctionsPage />} />
        <Route
          path="/create-admin"
          element={
            <ProtectedRoute>
              <CreateAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-auction"
          element={
            <ProtectedRoute>
              <CreateAuctionPage />
            </ProtectedRoute>
          }
        />

        <Route path="/grounds" element={<GroundsPage />} />
        <Route path="/add-ground" element={<AddGroundPage />} />
        <Route path="/player/:id" element={<PlayerDetailsPage />} />

        <Route path="/add-tournament" element={<AddTournamentPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />

        <Route path="/add-team" element={<AddTeamPage />} />
        <Route path="/teams" element={<TeamsPage />} />

        <Route path="/live-auction/:auctionId" element={<LiveAuctionPage />} />
        <Route
          path="/admin-live-auction/:auctionId"
          element={
            <ProtectedRoute>
              <AdminLiveAuctionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
