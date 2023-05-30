const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const profileSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("profile", profileSchema);
