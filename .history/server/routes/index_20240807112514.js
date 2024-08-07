const express = require("express");
const router = express.Router();
const { register, login, logout } = require("./api/auth");
router.route("/api/auth/sign-up").post(register);
router.route("/api/auth/login").post(login);
router.route("/api/auth/logout").post(verifyJWT, logout);

module.exports = router;
