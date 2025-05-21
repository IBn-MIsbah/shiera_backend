import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.urlencoded({ extends: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, (err) => {
  if (err) throw err;
  console.error(`server active on http://localhost:${port}/`);
});
