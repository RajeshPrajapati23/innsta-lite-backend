import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegistCon = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ succ: false, msg: "All fields are required" });
    }

    const isUserExist = await Users.findOne({ username });
    if (isUserExist) {
      return res.status(400).json({ succ: false, msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({ username, password: hashedPassword });
    await user.save();

    return res.status(201).json({ succ: true, msg: "Registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ succ: false, msg: "Server error" });
  }
};
export const userLoginCon = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ succ: false, msg: "All fields are required" });
    }

    const user = await Users.findOne({ username });
    console.log("user", user);

    if (!user) {
      return res.status(400).json({ succ: false, msg: "username not found" });
    }
    // match password
    let ispassMatch = await bcrypt.compare(password, user.password);
    console.log("ispassMatch", ispassMatch);

    if (!ispassMatch) {
      return res.status(400).json({ succ: false, msg: "Invalid password" });
    }

    let token = jwt.sign({ id: user._id }, process.env.JWTKEY, {
      expiresIn: "1d",
    });
    console.log("token", token);

    return res.status(201).json({
      succ: true,
      token,
      username,
      msg: "Login successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ succ: false, msg: "Server error" });
  }
};
