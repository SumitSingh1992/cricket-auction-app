import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("admin");

    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Cricket Auction</h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>

        <Link to="/register-player">Register</Link>

        <Link to="/players">Players</Link>

        <Link to="/add-ground">Add Ground</Link>
        <Link to="/grounds">Grounds</Link>

        {admin?.role === "SUPER_ADMIN" && (
          <Link to="/create-admin">Create Admin</Link>
        )}
        
        {token && (
          <>
            <Link to="/admin">Admin</Link>

            {/* <Link to="/auctions">Auctions</Link> */}
          </>
        )}

        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}

        {admin && <span className="text-yellow-400">{admin.role}</span>}
      </div>
    </nav>
  );
}

export default Navbar;
