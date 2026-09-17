import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="relative h-[90vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
          alt="Cricket"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative text-center text-white px-6">
          <h1 className="text-6xl font-bold mb-6">
            Cricket Premier League Auction
          </h1>

          <p className="text-2xl mb-8">
            Register yourself and get ready for the mega auction
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register-player"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold"
            >
              Register Now
            </Link>

            <Link
              to="/players"
              className="border border-white px-6 py-3 rounded-lg font-bold"
            >
              View Players
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage