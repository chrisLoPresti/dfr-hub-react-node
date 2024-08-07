const express = require("express");
const router = express.Router();
const { register, login } = require("./api/auth");
router.route("/api/auth/sign-up").post(register);
router.route("/api/auth/login").post(login);

module.exports = router;
