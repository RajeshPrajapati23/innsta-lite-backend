import Post from "../models/Post.js";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
export const postAddCon = async (req, res, next) => {
  console.log(req.headers);
  if (!req.file) {
    const error = new Error("Image is required");
    error.status = 400; // Custom status code
    return next(error);
  }
  let uploadpath = path.join(path.resolve(), "uploads/" + req.file.filename);
  console.log("uploadpath", uploadpath);

  const { title } = req.body;
  if (!title) {
    fs.unlinkSync(uploadpath);
    return res.status(400).json({ succ: false, msg: "Title required" });
  }

  let post = new Post({
    title,
    author: req.user.id,
    image: "uploads/" + req.file.filename,
  });
  await post.save();
  res.status(201).json({ succ: true, msg: "Created successfully" });
};

export const postGet = (req,res)=>{
  let posts = Post.fi
}