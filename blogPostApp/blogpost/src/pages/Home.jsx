import { useState, useEffect } from "react";
import { getAllBlogs } from "../api/blog";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("latest"); // 'latest', 'popular', or 'all'

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs
    .filter((blog) => {
      // Search functionality
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      // Filter functionality
      if (filter === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filter === "popular") {
        // Assuming you have a 'likes' or 'views' field
        return (b.likes || 0) - (a.likes || 0);
      }
      return 0;
    });

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Discover Stories
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Read, share, and connect with our community of writers
          </p>
        </div>

        {/* Functional Search and Filter */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                filter === "latest"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("latest")}
            >
              Latest
            </button>
            <button
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                filter === "popular"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("popular")}
            >
              Popular
            </button>
            <button
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                filter === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </div>
        </div>

        {/* Blog grid - now showing filtered results */}
        {filteredBlogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No articles found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Simple Pagination - Add your pagination logic here */}
        <div className="mt-12 flex justify-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
