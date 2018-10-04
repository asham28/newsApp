
// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
//Scrapping Tools
const request = require("request");
const cheerio = require("cheerio");
//Database: mongo
const mongoose = require("mongoose"); 
const mongojs = require("mongojs");
mongoose.Promise = Promise;

//Controller Routes
const htmlRoutes = require("./controllers/htmlRoutes.js"); 
const articleRoutes = require("./controllers/articleRoutes.js"); 

// Modules for Comment and Articles 
// =============================================================
var Article = require("./models/Article.js"); 
var Note = require("./models/Note.js"); 


// Initialize Express
// =============================================================
var app = express();
var port = process.env.PORT || 3000;


// Use morgan logger for logging requests
// =============================================================
app.use(logger("dev"));

// Initialize Body Parser
// =============================================================
app.use(bodyParser.urlencoded({
  extended: false
}));


// Initialize Handlebars
// =============================================================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routing 
// =============================================================
app.use("/", htmlRoutes); 
app.use("/", articleRoutes); 


// SERVE STATIC IMAGES
// =============================================================
app.use(express.static("public"));


// CONNECT TO MONGODB
mongoose.connect("mongodb://localhost/3000", { useNewUrlParser: true });


// current URL string parser is deprecated, and will be removed in a future version. 
// To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

// DATABASE AND MONGOJS CONFIGURATION 
// =============================================================

var URI = process.env.MONGODB_URI || "mongodb://localhost/newsApp"; 
mongoose.connect(URI);
var db = mongoose.connection;

// ERROR MESSAGE FOR DB CONNECTION 
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// SUCCESS MESSAGE FOR DB CONNECTION 
db.once("open", function(){
  console.log("Mongoose connection successful.")
}); 

/* -/-/-/-/-/-/-/-/-/-/-/-/- */
/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});

