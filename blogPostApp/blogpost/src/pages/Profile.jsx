import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/user";
import { deleteBlog } from "../api/blog";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("one");
      navigate("/login"); // Redirect if no token
      return;
    }

    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        console.log("profile: ", response);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error.message === "Please login again") {
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/login");
        }
      }
    }

    fetchUser();
  }, [navigate]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlog(postId);
        // Refresh the user data after deletion
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your account and blog posts
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-500">Blog Posts</p>
                <p className="text-xl font-bold text-blue-600">
                  {user.blog.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Blog Posts
            </h2>
            <Link
              to="/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              + New Post
            </Link>
          </div>

          {user.blog.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 mb-4">
                You haven't written any posts yet
              </p>
              <Link
                to="/create"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {user.blog.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md overflow-idden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/post/${post._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Read Post →
                      </Link>
                      <div className="flex space-x-2">
                        <Link
                          to={`/edit-post/${post._id}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                        >
                          Edit Post
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
