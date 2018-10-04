var express = require("express");
var request = require("request");
// Scrapping Tools
var cheerio = require("cheerio");
// Models
var db = require("../models");

// var Note = require("../models/note.js");
// var Article = require("../models/article.js");
// Router
var router = express.Router();


// ROUTES FOR SCRAPPING LOGIC
// ==========================================

router.get("/scrape", function (req, res) {

    db.Article.remove({});

  request("https://www.blogto.com/", function (err, response, html) {
    var $ = cheerio.load(html);

    // db.Article.remove();

    // grab part of thumbnail that has title and link 
    $("a.article-thumbnail-link").each(function (i, element) {

      var result = {};

      console.log("Starting scraping");

      // retrieve title and link of every article 
      result.title = $(element).attr("title");
      result.link = $(element).attr("href");

      // testing
      // console.log(`
      //   Title: ${title}
      //   Link: ${link}`)

      // create new entry in Article model 
      var entry = new db.Article(result);

      // save new entry 
      entry.save(function (err, doc) {
        if (err) {
          console.log(`Error in logging new article entry: ${err}`)
        } else {
          console.log(`Entry has been saved: ${doc}`)
        }
      });

    });
    // reload homepage to display newly scrapped articles
    res.redirect("/");
  });
});


// Retrive Articles from DB
router.get("/articles", function (req, res) {
  db.Article.find({})
    .exec(function (err, data) {
      if (err) {
        console.log(`Error in retrieving articles: ${err}`)
      } else {
        console.log(`Articles have been retrieved.`)
        res.json(data);
      }
    });
});


// Save an article
router.post("/save/:id", function (req, res) {
  db.Article.findOneAndUpdate({
      "_id": req.params.id
    }, {
      "saved": true
    })
    .exec(function (err, data) {
      if (err) {
        console.log(`Error in post: ${err}`);
      }
      // Log result
      else {
        console.log(`Successfully Saved: ${data}`);
        res.json(data);
      }
    });
});












module.exports = router;