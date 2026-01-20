import React from "react";
import { Link, useNavigate } from "react-router-dom";
import isLogIn from "../checkLogin/isLogIn";

const Home = () => {
  const navigate = useNavigate();


  const isLoggedIn = isLogIn();

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-[90vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643)",
        }}
      >
        <div className="bg-black/60 w-full min-h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Share Your <span className="text-red-500">Stories</span>
              <br />
              With The World
            </h1>
            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              A modern blogging platform where authors write, publish and
              inspire millions with meaningful content.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                // to="/register"
                onClick={() =>
                  isLoggedIn ? navigate("/createBlog") : navigate("/register")
                }
                className="bg-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
              >
                Start Writing
              </button>
              <Link
                to="/blogs"
                className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition"
              >
                Explore Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED BLOGS ================= */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Featured Blogs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                  alt="blog"
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    The Art of Writing Meaningful Blogs
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    Learn how to express ideas clearly and connect with readers.
                  </p>
                  <Link
                    to="/blogs"
                    className="inline-block mt-4 text-red-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Our Platform?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            <div>
              <h3 className="text-xl font-semibold text-red-600">
                Clean Writing Experience
              </h3>
              <p className="text-gray-600 mt-2">
                Focus on writing without distractions using our minimal editor.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-600">
                Secure & Author Based
              </h3>
              <p className="text-gray-600 mt-2">
                JWT based authentication and author-only blog control.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-600">
                Grow Your Audience
              </h3>
              <p className="text-gray-600 mt-2">
                Publish blogs and reach readers across categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-red-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Become an Author?</h2>
        <p className="mt-3 text-lg">Join today and start sharing your ideas.</p>
        <Link
          to="/register"
          className="inline-block mt-6 bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Create Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
