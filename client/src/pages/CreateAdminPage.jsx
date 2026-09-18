import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function CreateAdminPage() {
  const [admins, setAdmins] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/api/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmins(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/admin/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Admin created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      fetchAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Toaster />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Admin Management</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-black text-white px-6 py-3 rounded"
          >
            Create Admin
          </button>
        </form>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Admin List</h2>

          <div className="space-y-4">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="border p-4 rounded-lg flex justify-between"
              >
                <div>
                  <h3 className="font-bold">{admin.name}</h3>

                  <p>{admin.email}</p>
                </div>

                <span className="font-semibold text-yellow-600">
                  {admin.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdminPage;
