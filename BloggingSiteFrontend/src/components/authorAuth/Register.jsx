import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../apiServices/APIService";

const Register = () => {
  const navigate = useNavigate();

  // 🔹 state backend ke fields ke exactly same
  const [registerData, setRegisterData] = useState({
    fname: "",
    lname: "",
    title: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/authors", registerData);

      alert("Author Registered Successfully 🎉");
      console.log(response.data);

      navigate("/login"); 

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Author Registration
        </h1>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={registerData.fname}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={registerData.lname}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>

        {/* Title */}
        <select
          name="title"
          value={registerData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        >
          <option value="">Select Title</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
        </select>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-red-600 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
