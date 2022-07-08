let mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  urlToImage: String,
  url: String,
});
let userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  salt: String,
  token: String,
  articles: [articleSchema],
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
