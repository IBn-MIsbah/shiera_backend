// src/pages/Posts.jsx
import { useState, useEffect } from "react";
import { getBlogs } from "../api/blog";
import BlogCard from "../components/BlogCard";

function Posts() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setBlogs(data.data);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
