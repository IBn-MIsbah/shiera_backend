// src/api/blog.js
import axios from "./axios";

export async function getBlogs() {
  const response = await axios.get("/blog/blogs");
  return response.data;
}

export async function createBlog(blogData) {
  const response = await axios.post("/blog/new-blog", blogData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export async function getAllBlogs() {
  const response = await axios.get("/blog/blogs");
  return response.data;
}
export async function getBlogById(id) {
  const response = await axios.get(`/blog/blog/${id}`);
  return response.data;
}
export async function deleteBlog(id) {
  const response = await axios.delete(`/blog/delete/${id}`);
  return response.data;
}
export async function updateBlog(id) {
  const response = await axios.put(`/blog/update/${id}`);
  return response.data;
}
