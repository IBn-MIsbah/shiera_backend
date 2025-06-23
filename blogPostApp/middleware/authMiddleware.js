import jwt from "jsonwebtoken";

const auth = {
  protect: (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET || "1234567890");
      req.user = decode;
      next();
    } catch (err) {
      console.error("Error: ", err.message);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  },
};
export default auth;
