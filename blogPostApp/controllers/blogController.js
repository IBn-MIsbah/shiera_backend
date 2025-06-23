import Blog from "../models/Blog.js";
import User from "../models/User.js";

const blogController = {
  createBlog: async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        res.status(400).json({ message: "Title is and content are required" });
      }

      const newBlog = await Blog.create({
        title,
        content,
        author: req.user.id,
      });

      await User.findByIdAndUpdate(req.user.id, {
        $push: { blog: newBlog._id },
      });
      res
        .status(201)
        .json({ message: "Blog created successfully.", blog: newBlog });
    } catch (err) {
      console.error("Error while creating Blog: ", err.message);
      res
        .status(500)
        .json({ message: "Error creating a Blog", error: err.message });
    }
  },
  viewBlog: async (req, res) => {
    try {
      const blogs = await Blog.find()
        .populate("author", "fName lName")
        .select("-__v");

      const formatBlog = blogs.map((blog) => ({
        id: blog._id,
        title: blog.title,
        content: blog.content,
        author: `${blog.author.fName} ${blog.author.lName}`,
        createdAt: blog.createdAt,
      }));

      res.status(200).json(formatBlog);
    } catch (err) {
      console.error("Error while getting blogs: ", err.message);
      res.status(500).json({
        success: false,
        message: "Server error while fetching blogs",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
  singleBlog: async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findById(id).populate(
        "author",
        "fName lName blog"
      );

      if (!blog) {
        res.status(404).json({ message: "Blog does not exit!" });
      }

      res.status(200).json({
        id: blog._id,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
        author: {
          id: blog._id,
          name: `${blog.author.fName} ${blog.author.lName}`,
        },
      });
    } catch (err) {
      console.error("Error while fetching post: ", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default blogController;
