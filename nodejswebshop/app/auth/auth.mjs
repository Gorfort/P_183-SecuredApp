// auth.mjs
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};
