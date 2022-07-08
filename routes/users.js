var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// ===============================/sign-up==========================

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var result = null;
  var salt = uid2(32);
  var token;
  var userFind = await userModel.findOne({
    email: req.body.email,
  });

  if (userFind != null) {
    error.push("Utilisateur déjà enregistré");
  }
  if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
    error.push("Champs vides");
  }
  if (error.length == 0) {
    var newUser = await new userModel({
      name: req.body.name,
      email: req.body.email,
      password: SHA256(req.body.password + salt).toString(encBase64),
      salt: salt,
      token: uid2(32),
    });
    var userSave = await newUser.save();

    if (userSave) {
      result = true;
      token = userSave.token;
    } else {
      result = false;
    }
  }

  res.json({ result, error, token });
});

// =============================================/sign-in======================================

router.post("/sign-in", async function (req, res, next) {
  var userFind = false;
  var error = [];
  var token;
  if (req.body.email == "" || req.body.password == "") {
    error.push("Champs vides");
  }
  if (error.length == 0) {
    var findUser = await userModel.findOne({
      email: req.body.email,
    });

    if (findUser) {
      var hash = SHA256(req.body.password + findUser.salt).toString(encBase64);
      if (hash === findUser.password) {
        userFind = true;
        token = findUser.token;
      } else {
        error.push("Password incorrect");
      }
    } else {
      error.push("Email incorrect");
    }
  }

  res.json({ userFind, error, token });
});
module.exports = router;
