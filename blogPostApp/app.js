import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

// local moduels
import DB from "./config/dbconn.js"; //Database moduel
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
import userRoute from "./routes/userRoute.js";

// Database connection
DB.db();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`API Server is running on http://localhost:${port}`);
});
