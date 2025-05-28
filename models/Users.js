import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Username is required!"],
      unique: true,
      index: true, //WITH:MongoDB uses the index tree to find matching entries quickly. WITHOUT:it reads every document in the collection to find matches.
    },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
