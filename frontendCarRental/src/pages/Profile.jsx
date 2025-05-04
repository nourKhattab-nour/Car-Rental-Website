import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", storedUser);
    setUser(storedUser);

    if (storedUser && storedUser.id) {
      console.log("Using user ID:", storedUser.id);
      fetchUserRentals(storedUser.id);
    } else {
      console.error(
        "No user ID found in localStorage user object:",
        storedUser
      );
    }
  }, []);

  const fetchUserRentals = async (userId) => {
    try {
      setLoading(true);
      console.log("Fetching rentals for user ID:", userId);

      const response = await fetch(
        `http://localhost:3000/api/payments/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rental history");
      }

      const data = await response.json();
      console.log("Received rental data:", data);
      setUserRentals(data.data);
    } catch (err) {
      console.error("Error fetching rentals:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRentClick = () => {
    window.location.href = "/booking";
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full py-10 bg-secondary">
        <h6 className="text-lg font-medium tracking-widest text-gray-400 uppercase">
          Welcome back
        </h6>
        <h1 className="text-2xl font-bold text-center text-white md:text-5xl">
          Your <span className="text-[#4d9fff]">Profile</span>
        </h1>
      </div>

      <div className="py-5 bg-secondary ">
        {user ? (
          <div className="container px-4 mx-auto">
            <div className="bg-[#111111] border border-gray-700 rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-white">
                Account Information
              </h2>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold text-gray-400">Email:</span>{" "}
                {user.email}
              </p>
              {user.name && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold text-gray-400">Name:</span>{" "}
                  {user.name}
                </p>
              )}
            </div>

            <h2 className="mb-6 text-2xl font-bold text-white">Your Rentals</h2>
            {loading ? (
              <div className="flex items-center justify-center p-8 border border-gray-700 rounded-lg bg-[#111111]">
                <p className="text-lg text-gray-300">Loading your rentals...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-8 border border-gray-700 rounded-lg bg-[#111111]">
                <p className="text-lg text-red-400">Error: {error}</p>
              </div>
            ) : userRentals.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userRentals.map((rental) => (
                  <div
                    key={rental._id}
                    className="p-4 border border-gray-700 rounded-lg bg-[#111111]"
                  >
                    <div className="flex items-center justify-center p-4 rounded-md b h-60">
                      <img
                        src={rental.carImage}
                        alt={rental.carName}
                        className="object-contain h-40"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold text-white">
                        {rental.carName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {rental.carCategory}
                      </p>
                      <p className="mt-2 text-sm text-gray-300">
                        <span className="text-gray-400">Status:</span>{" "}
                        {rental.status}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="text-gray-400">Payment Method:</span>{" "}
                        {rental.method}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="text-gray-400">Date:</span>{" "}
                        {new Date(rental.paymentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h2 className="text-xl font-semibold text-[#4d9fff]">
                        ${rental.amount}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border border-gray-700 rounded-lg bg-[#111111]">
                <p className="mb-6 text-lg text-center text-gray-300">
                  You haven't rented any cars yet.
                </p>
                <button
                  onClick={handleRentClick}
                  className="px-4 py-2 bg-[#4d9fff] text-white rounded-lg hover:bg-[#3a8aee] transition"
                >
                  Rent a Car
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="container flex justify-center px-4 py-10 mx-auto">
            <div className="bg-[#111111] border border-gray-700 rounded-lg p-8 text-center max-w-md">
              <h2 className="mb-4 text-2xl font-bold text-white">
                Not Logged In
              </h2>
              <p className="mb-6 text-gray-300">
                Please log in to view your profile and rental information.
              </p>
              <button className="px-4 py-2 bg-[#4d9fff] text-white rounded-lg hover:bg-[#3a8aee] transition">
                Log In
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Profile;
