import jwt from "jsonwebtoken";
console.log("process.env.JWTKEY", process.env.JWTKEY);

export const verifyToken = (req, res, next) => {
  console.log("req.headers", req.headers.authorization);
  let token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(403).json({ succ: false, msg: "Unauthorized" });
  jwt.verify(token, process.env.JWTKEY, (err, user) => {
    if (err) return res.status(403).json({ succ: false, msg: "Invalid token" });
    req.user = user;
    next();
  });
};
