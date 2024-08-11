const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  refreshtoken,
  validate,
} = require("./api/auth");
const { getmarkers } = require("./api/markers");
const { verifyJWT } = require("../middleware/authmiddleware");

router.route("/api/auth/sign-up").post(register);
router.route("/api/auth/login").post(login);
router.route("/api/auth/logout").post(logout);
router.route("/api/auth/refreshtoken").get(refreshtoken);
router.route("/api/auth/validate").get(validate);
router.route("/api/markers/getmarkers").get(verifyJWT, getmarkers);

module.exports = router;
