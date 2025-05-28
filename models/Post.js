import mongoose from "mongoose";

let postSchema = new mongoose.Schema({
  image: { type: String, require: true },
  title: { type: String, require: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
    index: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        index: true,
      },
    },
  ],
});

export default mongoose.model("Post", postSchema);
