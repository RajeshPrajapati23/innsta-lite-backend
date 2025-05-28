import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import postRoute from "./routes/postRoute.js";
let app = express();
let filepath = fileURLToPath(import.meta.url);
let dirpath = path.dirname(filepath);

/* 
Parses incoming requests with Content-Type: application/json
Populates req.body with the parsed JSON

Express needs middleware to:
Read the raw request stream (it's just bytes)
Parse it as JSON
Attach the result to req.body

without- req.body will be undefined for JSON requests.
*/
app.use(json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static(path.join(dirpath, "uploads")));
// ROUTING
app.use("/api", userRoute);
app.use("/api", postRoute);

app.use((err, req, res, next) => {
  // central error handling
  // when called with next(new Error("err"s))
  if (err) {
    return res
      .status(err.status || 500)
      .json({ succ: false, msg: err.message || "Something went wrong" });
  }
  next();
});

//connect mongodb server make sure it is is running on your pc
//window + r and search -> services.msc and press ok
// -> look for -> MongoDB Server (MongoDB)
// -> left side you will stop and restart server if stoped then start server

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

// NODE JS SERVER RUNNING ON PORT
app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT)
);
