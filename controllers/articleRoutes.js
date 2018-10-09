var express = require("express");
var request = require("request");
// Scrapping Tools
var cheerio = require("cheerio");
// Models
var db = require("../models");

// Router
var router = express.Router();

// ==========================================
// ROUTES FOR SCRAPPING LOGIC
// ==========================================
router.get("/scrape", function (req, res) {

  db.Article.remove({}).then(function () {

  request("https://www.blogto.com/", function (err, response, html) {
    var $ = cheerio.load(html);

      // grab part of thumbnail that has title and link 
      $("a.article-thumbnail-link").each(function (i, element) {

        var result = {};

        console.log("Starting scraping");

        // retrieve title and link of every article 
        result.title = $(element).attr("title");
        result.link = $(element).attr("href");

        // Create the  list group to contain the articles and add the article content for each
        var $articleList = $("<ul>");
        $articleList.addClass("list-group");

        // Add the newly created element to the DOM
        $("#article-section").append($articleList);

        // create new entry in Article model 
        var entry = new db.Article(result);

        // save new entry 
        entry.save(function (err, doc) {
          if (err) {
            console.log(`Error in logging new article entry: ${err}`);
          } else {
            console.log(`Entry has been saved: ${doc}`);
          }
        });
      });
      // reload homepage to display newly scrapped articles
      res.redirect("/");
    });
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


// SAVE ARTICLE
// ==========================================
// router.post("/save/:id", function (req, res) {
//   db.Article.findOneAndUpdate({
//       "_id": req.params.id
//     }, {
//       "saved": true
//     })
//     .exec(function (err, data) {
//       if (err) {
//         console.log(`Error in post: ${err}`);
//       }
//       // Log result
//       else {
//         console.log(`Successfully Saved: ${data}`);
//         res.json(data);
//       }
//     });
// });


// SAVING ARTICLES

// ==========================================
// LOGIC FOR SAVING ARTICLES
// ==========================================
router.post("/save/:id", function (req, res) {

  console.log(`Saving Article: ${req.body.title}`)

  db.Article.findOneAndUpdate({
      "_id": req.params.id
    }, {
      "saved": true
    })
    .exec(function (err, data) {
      if (err) {
        console.log(`Error in post: ${err}`);
      }
      else {
        console.log(`Successfully Saved: ${data}`);
        res.json(data);
      }
    });
});

// CREATING NOTE
// ==========================================
router.post("/notes/:id", function (req, res) {
  // create note
  var newNote = new Note(req.body);

  newNote.save(function (err, newNote) {
    if (err) {
      console.log(`Error saving new note: ${err}`);
    } else {
      console.log(`Successfully posted new note: ${newNote}`);
      // display note in modal
      
    }
  });
});

// POPULATING NOTES
// ==========================================
router.get("/articles/:id", function (req, res) {
  db.Article.findOne({
      "_id": req.params.id
    }).populate("notes")
    .exec(function (err, data) {
      if (err) {
        console.log(`Error saving article: ${err}`);
      } else {
        console.log(`Successfully saved article: ${data}`);
        res.json(data);
      }
    });
});

// DELETE NOTE
// ==========================================
router.post("/unsave/:id", function (req, res) {

  db.Article.findOneAndUpdate({
      "_id": req.params.id,
      "saved": false
    })
    .exec(function (err, data) {
      if (err) {
        console.log(`Error saving article: ${err}`);
      } else {
        console.log(`Router - Article Removed: ${data}`);
      }
      res.redirect("/saved");
    });
});


module.exports = router;