import User from "../models/User.js";
import Blog from "../models/Blog.js";

const userControlles = {
  gerMyBlogs: async (req, res) => {
    try {
      const id = req.user.id;
      console.log(req.user);
      const blog = await Blog.find({ author: id }).sort({ createdAt: -1 });

      res.status(200).json(blog);
    } catch (err) {
      console.error("Error while fetching your data: ", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.params;
      const userId = req.user.id;
      console.log(
        `title: ${title},\n param id ${id} \n userID: ${userId}\n content: ${content}`
      );
      const updatePost = await Blog.findOneAndUpdate(
        {
          _id: id,
          author: userId,
        },
        { title, content },
        { new: true, runValidators: true }
      )
        .select("-__v")
        .populate("author", "fName lName");
      console.log(updatePost);
      if (!updatePost) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json({
        title: updatePost.title,
        content: updatePost.content,
        author: `${updatePost.author.fName} ${updatePost.author.lName}`,
        updatedAt: updatePost.updatedAt,
      });
    } catch (err) {
      console.error("Error while updating: ", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to update blog",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deletePost = await Blog.findOneAndDelete({
        _id: id,
        author: userId,
      });
      if (!deletePost) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found or Unauthorized" });
      }

      await User.findByIdAndUpdate(userId, {
        $pull: { blog: id },
      });
      res.status(200).json({
        success: true,
        message: "Blog deletd successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete blog",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
  myProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId)
        .populate({ path: "blog", select: "title content createdAt updatedAt" })
        .select("-__v -password")
        .lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User Data",
        data: {
          id: user._id,
          name: `${user.fName} ${user.lName}`,
          email: user.email,
          blog: user.blog || [],
        },
        stats: {
          blogCount: user.blog?.length || 0,
          lastActive: user.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .populate({
          path: "blog",
          select: "title content",
          options: { sort: { createdAt: -1 } },
        })
        .select("-__v -password")
        .lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const responseData = {
        id: user._id,
        name: `${user.fName} ${user.lName}`,
        email: user.email,
        blog: user.blog || [],
      };

      res.status(200).json({
        message: "user Data",
        success: true,
        responseData,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
};

export default userControlles;
