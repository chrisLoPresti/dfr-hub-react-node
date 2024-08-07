const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  const accessToken = req.cookies["dfr_hub_auth_token"];
  //   const refreshToken = req.cookies["dfr_hub_refresh_token"];
  try {
    // Look for the token in cookies or headers
    // If there's no token, deny access with a 401 Unauthorized status
    if (!accessToken) {
      return res.status(401).json({ message: "No permission" });
    }

    // Check if the token is valid using a secret key
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Get the user linked to the token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // If the user isn't found, deny access with a 404 Not Found status
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user info to the request for further use
    req.user = user;
    next();
  } catch (error) {
    // Handle any errors during token verification with a 500 Internal Server Error status
    return res.status(500).json({ message: error.message });
  }
};
