import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function GroundsPage() {
  const [grounds, setGrounds] = useState([]);

  const fetchGrounds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/grounds");

      setGrounds(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-10">
          Tournament Grounds
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {grounds.map((ground) => (
            <div
              key={ground._id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={ground.photos[0]}
                alt={ground.groundName}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">{ground.groundName}</h2>

                <p className="mt-3">
                  <strong>Owner:</strong> {ground.ownerManager}
                </p>

                <p>
                  <strong>Location:</strong> {ground.location}
                </p>

                <p>
                  <strong>Contact:</strong> {ground.contactName}
                </p>

                {ground.googleMapsLink && (
                  <a
                    href={ground.googleMapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-xl"
                  >
                    Open Map
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroundsPage;
