const express = require("express");
const auth = require("../middleware/auth");

const {
  register,
  login,
  updateProfile,
} = require("../controllers/profileController");
 
const router = express.Router();
 
router.route("/signup").post(register);
router.route("/login").post(auth ,login);
router.route("/users/:userId").post(auth , updateProfile);

 
module.exports = router;
