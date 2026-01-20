import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../apiServices/APIService";

const ProfileCardData = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialUser = state?.user ?? null;

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(initialUser ? false : true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if we already have user from navigation state, no need to fetch
    if (user) return;

    let mounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await API.get("/profile");
        if (!mounted) return;
        setUser(res?.data?.data || null);
      } catch (err) {
        console.log("ProfileCardData fetch error:", err);
        if (!mounted) return;
        setError("Failed to load profile. Please login again.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-700 mb-4">No author data found.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // render profile UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Profile Details
        </h2>

        <div className="h-px bg-gray-200 mb-6" />

        <div className="space-y-4 text-lg">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="font-medium text-red-600">
              {user.title} {user.fname} {user.lname}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Email</span>
            <span className="font-medium text-blue-600">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Account Type</span>
            <span className="font-medium text-green-600">Author</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardData;
