const express = require("express");
const router = express.Router();
const userModel = require("../model/user");

const request = require("sync-request");
const keys = require("../codes");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
//========================================/load API=================================================
router.get("/loadApi", function (req, res, next) {
  const language = req.query.language;
  const country = req.query.country;

  let requete = request(
    "GET",
    `https://newsapi.org/v2/sources?language=${language}&country=${country}&apiKey=${keys.keyApi}`,
    {
      headers: {
        "user-agent": "morningNews",
      },
    }
  );

  const result = JSON.parse(requete.body);

  res.json({ sources: result.sources });
});
//=================================/selectSource====================================================
router.get("/selectSource", function (req, res, next) {
  const sourceid = req.query.sourceid;
  let requete = request(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${sourceid}&apiKey=${keys.keyApi}`,
    {
      headers: {
        "user-agent": "morningNews",
      },
    }
  );
  const result = JSON.parse(requete.body);

  res.json({ articles: result.articles });
});
// =======================================================/saveWishList=============================
router.post("/saveWishList", async function (req, res, next) {
  let result = false;
  let userFound = await userModel.findOne({ token: req.body.token });

  if (
    userFound !== null &&
    !userFound.articles.find(
      (article) => article.title === req.body.articletitle
    )
  ) {
    userFound.articles.push({
      title: req.body.articletitle,
      description: req.body.articledesc,
      content: req.body.articlecontent,
      urlToImage: req.body.articleimg,
      url: req.body.articleurl,
    });
    let userUpdated = await userFound.save();

    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
});
//===========================/delete article =============================================
router.delete("/deletearticle", async function (req, res, next) {
  let result = false;
  let user = await userModel.findOne({ token: req.body.token });

  if (user !== null) {
    user.articles = user.articles.filter(
      (article) => article.title !== req.body.articletitle
    );
  }

  let userUpdated = await user.save();
  if (userUpdated) {
    result = true;
  }

  res.json({ result });
});
router.get("/searcharticlesuser", async function (req, res, next) {
  let userArticles = await userModel.findOne({ token: req.query.token });

  res.json({ articles: userArticles.articles });
});
module.exports = router;
