import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    // 👉 later you can connect API / email service here
    console.log("Contact Form Data:", form);

    alert("Thanks for contacting! I will get back to you soon.");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 uppercase">
          Contact Me
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Let’s connect and build something great 🚀
        </p>

        {/* Divider */}
        <div className="h-1 w-20 bg-red-600 mx-auto my-6 rounded"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project or query..."
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Prefer email? Reach me at{" "}
          <span className="text-red-600 font-medium">
            akhileshsoni098@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
