// src/pages/PostDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/blog";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  console.log("post detail id: ", id);
  useEffect(() => {
    async function fetchPost() {
      const response = await getBlogById(id);
      setPost(response.data);
    }
    fetchPost();
  }, [id]);

  if (!post) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to all posts
      </button>

      {/* Article Header */}
      <header className="mb-10">
        <div className="flex items-center space-x-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {post.category || "General"}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-500">
              {Math.ceil(post.content.length / 1000)} min read •{" "}
              {post.views || 0} views
            </p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100">
          <div className="whitespace-pre-line text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Buttons */}
      {/* <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4"> */}
      {/* <div className="flex space-x-4"> */}
      {/* <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span>Like</span>
          </button> */}
      {/* <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>Comment</span>
          </button> */}
      {/* </div> */}

      {/* <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span>Save</span>
        </button> */}
      {/* </div> */}

      {/* Author Bio */}
      {/* <section className="mt-16 p-6 sm:p-8 bg-gray-50 rounded-xl">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-shrink-0 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Written by {post.author.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {post.author.bio || "The author has not added a bio yet."}
            </p>
            <div className="flex space-x-4">
              {post.author.twitter && (
                <a
                  href={post.author.twitter}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
              {post.author.website && (
                <a
                  href={post.author.website}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <span className="sr-only">Website</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section> */}

      {/* Related Posts */}
      {/* <section className="mt-16"> */}
      {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">More to read</h2> */}
      {/* <div className="grid gap-6 sm:grid-cols-2"> */}
      {/* Example related posts - replace with actual data */}
      {/* {relatedPosts.map((post) => (
            <article key={post.id} className="group">
              <a href={`/post/${post.id}`} className="block">
                <div className="aspect-w-16 aspect-h-9 mb-4 rounded-xl bg-gray-100 overflow-hidden">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()} •{" "}
                  {Math.ceil(post.content.length / 1000)} min read
                </p>
              </a>
            </article>
          ))} */}
    </div>
    // </section>
    // </div>
  );
}

export default PostDetail;
