// src/components/BlogCard.jsx
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* <div className="flex-shrink-0 h-48 bg-gray-200 overflow-hidden">
        {blog.image && (
          <img className="h-full w-full object-cover" src={blog.image} alt="" />
        )}
      </div> */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-600">
            {blog.category || "General"}
          </p>
          <a href={`/post/${blog.id}`} className="block mt-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {blog.title}
            </h3>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">
              {blog.content}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {blog.author?.charAt(0) || "A"}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {blog.author || "Anonymous"}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString()}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{blog.readTime || "5 min"} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
