var mongoose = require("mongoose");

var wishlistSchema = mongoose.Schema({
  title: String,
  content: String,
  desc: String,
  img: String,
  url: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
var wishlistModel = mongoose.model("article", wishlistSchema);
module.exports = wishlistModel;
