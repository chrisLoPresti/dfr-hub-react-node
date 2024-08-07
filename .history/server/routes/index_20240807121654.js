const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  refreshAccessToken,
  test,
} = require("./api/auth");
const { verifyJWT } = require("../middleware/authmiddleware");

router.route("/api/auth/sign-up").post(register);
router.route("/api/auth/login").post(login);
router.route("/api/auth/logout").post(verifyJWT, logout);
router.route("/api/auth/refresh-token").post(refreshAccessToken);

module.exports = router;
