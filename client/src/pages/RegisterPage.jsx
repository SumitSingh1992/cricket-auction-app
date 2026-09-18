import { useForm } from "react-hook-form";
import api from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);

      formData.append("mobileNumber", data.mobileNumber);

      formData.append("role", data.role);

      formData.append("battingStyle", data.battingStyle);

      formData.append("bowlingStyle", data.bowlingStyle);

      formData.append("cricheroesProfile", data.cricheroesProfile);

      formData.append("profilePhoto", data.profilePhoto[0]);

      await api.post("/api/players/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Player registered successfully");

      reset();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center">
        <Toaster />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Player Registration
          </h1>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Upload Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("profilePhoto")}
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              placeholder="Full Name"
              className="w-full border p-3 rounded"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("mobileNumber", {
                required: "Mobile number is required",

                pattern: {
                  value: /^[0-9]{10}$/,

                  message: "Enter valid 10 digit mobile number",
                },
              })}
              placeholder="Mobile Number"
              className="w-full border p-3 rounded"
            />

            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <select
              {...register("role", {
                required: "Please select role",
              })}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Role</option>

              <option value="All Rounder">All Rounder</option>

              <option value="Batter">Batter</option>

              <option value="Bowler">Bowler</option>

              <option value="Batter + Keeper">Batter + Keeper</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className="mb-4">
            <select
              {...register("battingStyle", {
                required: "Please select batting style",
              })}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Batting Style</option>

              <option value="Right Hand Bat">Right Hand Bat</option>

              <option value="Left Hand Bat">Left Hand Bat</option>
            </select>
            {errors.battingStyle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.battingStyle.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <select
              {...register("bowlingStyle", {
                required: "Please select bowling style",
              })}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Bowling Style</option>

              <option value="None">None</option>

              <option value="Right Arm Medium">Right Arm Medium</option>

              <option value="Left Arm Medium">Left Arm Medium</option>

              <option value="Right Arm Spinner">Right Arm Spinner</option>

              <option value="Left Arm Spinner">Left Arm Spinner</option>
            </select>
            {errors.bowlingStyle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bowlingStyle.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              CricHeroes Profile URL
            </label>

            <input
              type="text"
              placeholder="Paste CricHeroes profile link"
              className="w-full border p-3 rounded"
              {...register("cricheroesProfile")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Continue To Payment
          </button>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Register Player
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
