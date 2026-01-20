import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../apiServices/APIService";

const GetBlog = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // fetch author reliably
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch logged-in author from server (token based)
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get("/profile"); // backend should return current author
        setUser(res?.data?.data || null);
      } catch (err) {
        console.log("fetch profile err:", err);
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  // fetch blogs when user available
  useEffect(() => {
    if (!user?._id) {
      setBlogs([]);
      setLoading(false);
      return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/blogs?authorId=${user._id}`);
        setBlogs(res?.data?.data || []);
      } catch (err) {
        console.log("fetch blogs err:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [user]);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading blogs...</p>
      </div>
    );
  }

  // If no user (not logged-in), show friendly message and link to login
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">
            You are not logged in.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Delete blog
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await API.delete(`/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
    } catch (err) {
      console.log(err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          {user.fname}&apos;s Blogs
        </h1>

        <button
          onClick={() => navigate(`/createBlog`)}
          className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          + Create Blog
        </button>
      </div>

      {/* Empty state */}
      {blogs.length === 0 ? (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Blogs Created Yet
          </h2>
          <p className="text-gray-500 mt-2">
            Create your first blog and start sharing your knowledge.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                By{" "}
                <span className="font-semibold text-gray-700">
                  {blog.authorId?.title} {blog.authorId?.fname} {blog.authorId?.lname}
                </span>
              </p>

              <p className="text-gray-600 mb-4 line-clamp-3">{blog.body}</p>

              <div className="mb-3 text-sm">
                <span className="font-semibold text-gray-600">Category:</span>{" "}
                <span className="text-blue-600">{blog.category}</span>
              </div>

              {Array.isArray(blog.subcategory) && blog.subcategory.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {blog.subcategory.map((sub, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}

              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-500">
                  {new Date(blog.publishedAt || blog.createdAt).toDateString()}
                </span>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/updateBlog/${blog._id}`)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetBlog;
