import React, { useEffect, useState } from "react";
import API from "../../apiServices/APIService";
import { useNavigate } from "react-router-dom";

const GetPublicBlog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI filters (typing only)
  const [filters, setFilters] = useState({
    category: "",
    tags: "",
    subcategory: "",
  });

  // Applied filters (API trigger)
  const [appliedFilters, setAppliedFilters] = useState({});

  // ================= FETCH PUBLIC BLOGS =================
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams(appliedFilters).toString();
        const res = await API.get(`/public/blogs?${query}`);

        setBlogs(res?.data?.data || []);
      } catch (err) {
        console.log(err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [appliedFilters]);

  // ================= APPLY FILTER =================
  const handleApplyFilter = () => {
    const cleaned = Object.fromEntries(
      Object.entries(filters)
        .map(([k, v]) => [k, v.trim()])
        .filter(([_, v]) => v !== "")
    );

    setAppliedFilters(cleaned); // 🔥 ONLY place API triggers
  };

  // ================= CLEAR FILTER =================
  const handleClearFilter = () => {
    setFilters({ category: "", tags: "", subcategory: "" });
    setAppliedFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* ================= FILTER UI ================= */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-lg shadow mb-8 grid md:grid-cols-5 gap-4">
        <input
          value={filters.category}
          placeholder="Category"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        />

        <input
          value={filters.tags}
          placeholder="Tags (nodejs, mongodb)"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, tags: e.target.value })
          }
        />

        <input
          value={filters.subcategory}
          placeholder="Subcategory"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, subcategory: e.target.value })
          }
        />

        <button
          onClick={handleApplyFilter}
          className="bg-red-600 text-white rounded font-semibold hover:bg-red-700"
        >
          Apply
        </button>

        <button
          onClick={handleClearFilter}
          className="bg-gray-200 rounded font-medium hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {/* ================= BLOG LIST ================= */}
      {loading ? (
        <div className="flex justify-center mt-20">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          No blogs found
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold mb-2 uppercase">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                By {blog.authorId?.fname} {blog.authorId?.lname}
              </p>

              <p className="text-gray-700 mb-3">
                {blog.body.slice(0, 150)}...
                <span
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="text-red-600 font-semibold cursor-pointer ml-1"
                >
                  Read more
                </span>
              </p>

              <div className="text-sm text-blue-600">
                Category: {blog.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetPublicBlog;
