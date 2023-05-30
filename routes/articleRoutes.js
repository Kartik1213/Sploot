const express = require("express");
const auth = require("../middleware/auth");

const {
  createArticle,
  getArticles,
} = require("../controllers/articleController");
 
const router = express.Router();
 
router.route("/users/:userId/articles").post(auth ,createArticle);
router.route("/articles").get(auth , getArticles);
 
module.exports = router;
