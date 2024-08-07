const express = require("express");
const router = express.Router();
const { register } = require("./api/auth");
router.route("/api/auth/sign-up").post(register);
module.exports = router;
