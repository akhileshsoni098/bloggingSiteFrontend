import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../apiServices/APIService";

const CreateAndUpdateBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const isUpdate = Boolean(blogId);

  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    tags: [],
    category: "",
    subcategory: [],
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);

  // ================== FETCH BLOG ONLY FOR UPDATE ==================
  useEffect(() => {
    if (!isUpdate) return; // create mode → no fetch

    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/blog/${blogId}`);
        const data = res?.data?.data;

        if (data) {
          setBlogData({
            title: data.title || "",
            body: data.body || "",
            tags: Array.isArray(data.tags) ? data.tags : [],
            category: data.category || "",
            subcategory: Array.isArray(data.subcategory)
              ? data.subcategory
              : [],
            isPublished: Boolean(data.isPublished),
          });
        }
      } catch (err) {
        console.log("fetch blog error:", err);
        navigate("/your-blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, isUpdate, navigate]);

  // ================== INPUT CHANGE ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  // ================== SUBMIT (ONLY HERE UPDATE / CREATE) ==================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdate) {
        // 🔥 UPDATE happens ONLY here
        const res = await API.put(`/blogs/${blogId}`, {
          ...blogData,
          tags: Array.isArray(blogData.tags) ? blogData.tags : [],
          subcategory: Array.isArray(blogData.subcategory)
            ? blogData.subcategory
            : [],
        });

        const updated = res?.data?.data;
        if (updated) {
          setBlogData({
            title: updated.title || "",
            body: updated.body || "",
            tags: Array.isArray(updated.tags) ? updated.tags : [],
            category: updated.category || "",
            subcategory: Array.isArray(updated.subcategory)
              ? updated.subcategory
              : [],
            isPublished: Boolean(updated.isPublished),
          });
        }

        alert("Blog updated successfully ✅");
      } else {
        // 🔥 CREATE
        const res = await API.post("/blogs", blogData);
        const created = res?.data?.data;

        if (created?._id) {
          // convert create → update mode (without history stacking)
          navigate(`/updateBlog/${created._id}`, { replace: true });
        }

        alert("Blog created successfully ✅");
      }
    } catch (err) {
      console.log("submit error:", err);
      alert("Operation failed ❌");
    }
  };

  // ================== LOADING UI ==================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {isUpdate ? "Update Blog" : "Create Blog"}
        </h1>

        <input
          name="title"
          value={blogData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          name="body"
          value={blogData.body}
          onChange={handleChange}
          placeholder="Blog Body"
          rows={5}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="category"
          value={blogData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          value={blogData.tags.join(",")}
          onChange={(e) =>
            setBlogData({
              ...blogData,
              tags: e.target.value
                ? e.target.value.split(",").map((t) => t.trim())
                : [],
            })
          }
          placeholder="Tags (comma separated)"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          value={blogData.subcategory.join(",")}
          onChange={(e) =>
            setBlogData({
              ...blogData,
              subcategory: e.target.value
                ? e.target.value.split(",").map((s) => s.trim())
                : [],
            })
          }
          placeholder="Subcategory (comma separated)"
          className="w-full border p-3 rounded mb-4"
        />

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={blogData.isPublished}
            onChange={(e) =>
              setBlogData({
                ...blogData,
                isPublished: e.target.checked,
              })
            }
            className="w-5 h-5"
          />
          <label className="text-gray-700 font-medium">Publish Blog</label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700"
          >
            {isUpdate ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAndUpdateBlog;
