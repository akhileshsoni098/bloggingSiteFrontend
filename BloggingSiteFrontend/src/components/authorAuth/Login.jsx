import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../apiServices/APIService";

const Login = () => {

  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit handler

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/login", logIn);

      // console.log("ResponseData", response.data.data);

      const token = response.data.data.token;
      const authorId = response.data.data.authorId;

      // setLocal storage x-api-key:token
      localStorage.setItem("x-api-key", token);
      localStorage.setItem("authorId", authorId);

      if (token) {
        window.location.href = "/home";
      }

      // will navigate  /home
    } catch (err) {
      alert(err.response?.data?.message || "Something wents wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Author Login
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={logIn.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={logIn.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          {loading ? "Login..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="text-red-600 font-semibold ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
