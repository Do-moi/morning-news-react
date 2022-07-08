var mongoose = require("mongoose");
var keys = require("../codes");
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(keys.keyMongodb, options, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("++++++++++++++ connection ok +++++++++++++++++");
  }
});
