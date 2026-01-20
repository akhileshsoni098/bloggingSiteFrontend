import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../apiServices/APIService";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // logout helper
  const logOut = () => {
    localStorage.removeItem("x-api-key");
    localStorage.removeItem("authorId");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await API.get("/profile");
        if (!mounted) return;
        setUser(res?.data?.data || null);
      } catch (err) {
        console.log("profile fetch err:", err);
        if (!mounted) return;
        // invalid token → force logout
        logOut();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []); // run once on mount

  // while fetching, show small placeholder so Navbar won't jump
  if (loading) return <div className="text-gray-600">...</div>;

  if (!user) return <div className="text-gray-600">Guest</div>;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 font-semibold text-gray-700 hover:text-red-600"
        aria-expanded={open}
      >
        <span className="text-sm">
          {user.title} {user.fname} {user.lname}
        </span>
        <span className="text-sm">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
          {/* NOTE: navigate without state — ProfileCardData will fetch if needed */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profiledata");
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/your-blogs");
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Your Blogs
          </button>

          <button
            onClick={() => {
              setOpen(false);
              logOut();
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
