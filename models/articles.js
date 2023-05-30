const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const articleSchema = new Schema({
  title: String,
  description: String,
  userId:String
});
 
module.exports = mongoose.model("article", articleSchema);
