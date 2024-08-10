const express = require("express");
const router = express.Router();
const { register, login, logout, refreshtoken, test } = require("./api/auth");
const { verifyJWT } = require("../middleware/authmiddleware");

router.route("/api/auth/sign-up").post(register);
router.route("/api/auth/login").post(login);
router.route("/api/auth/logout").post(verifyJWT, logout);
router.route("/api/auth/refreshtoken").get(refreshtoken);

module.exports = router;
