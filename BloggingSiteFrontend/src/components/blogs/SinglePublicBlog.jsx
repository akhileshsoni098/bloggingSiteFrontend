import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../apiServices/APIService";

const SinglePublicBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blog/${blogId}`);
        setBlog(res.data.data);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    fetchBlog();
  }, [blogId, navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-4xl mx-auto">
      {/* ===== Title ===== */}
      <h1 className="text-4xl font-bold mb-3 uppercase text-gray-900">
        {blog.title}
      </h1>

      {/* ===== Author & Date ===== */}
      <div className="text-sm text-gray-500 mb-6">
        <span>
          By{" "}
          <span className="font-semibold text-gray-700">
            {blog.authorId?.fname} {blog.authorId?.lname}
          </span>
        </span>
        {" • "}
        <span>
          {blog.publishedAt
            ? new Date(blog.publishedAt).toDateString()
            : "Unpublished"}
        </span>
      </div>

      {/* ===== Category ===== */}
      {blog.category && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-600">Category:</span>{" "}
          <span className="text-blue-600 font-medium">{blog.category}</span>
        </div>
      )}

      {/* ===== Subcategory ===== */}
      {Array.isArray(blog.subcategory) && blog.subcategory.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
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

      {/* ===== Body ===== */}
      <p className="text-lg leading-relaxed text-gray-800 mb-8">{blog.body}</p>

      {/* ===== Tags ===== */}
      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ===== Back Button ===== */}
      <button
        onClick={() => navigate(-1)}
        className="text-red-600 font-semibold hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default SinglePublicBlog;
